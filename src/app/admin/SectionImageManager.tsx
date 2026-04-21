"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ImageCropModal from "@/components/ImageCropModal";

async function normalizeFile(file: File): Promise<File> {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.heic$/i.test(file.name) ||
    /\.heif$/i.test(file.name);
  if (!isHeic) return file;
  const heic2any = (await import("heic2any")).default;
  const blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 }) as Blob;
  return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" });
}

const BUCKET = "images";

interface SectionImageManagerProps {
  folder: string;
  title: string;
  aspect: number;
  aspectLabel: string;
  maxImages?: number;
  /** When provided, enables slot-based mode: one fixed slot per label. */
  slotLabels?: string[];
  /** Fallback images shown when no Supabase images are uploaded (currently active on site). */
  fallbackImages?: string[];
}

type SlotFile = { name: string; url: string } | null;

function parseSlotIndex(name: string): number | null {
  const m = name.match(/^slot-(\d+)-\d+\.webp$/);
  return m ? parseInt(m[1], 10) : null;
}

function parseRemovedSlotIndex(name: string): number | null {
  const m = name.match(/^slot-(\d+)-removed\.flag$/);
  return m ? parseInt(m[1], 10) : null;
}

export default function SectionImageManager({
  folder,
  title,
  aspect,
  aspectLabel,
  maxImages = 0,
  slotLabels,
  fallbackImages,
}: SectionImageManagerProps) {
  const slotMode = !!slotLabels && slotLabels.length > 0;
  const slotCount = slotLabels?.length ?? 0;

  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [allCleared, setAllCleared] = useState(false);
  const [slots, setSlots] = useState<SlotFile[]>(
    slotMode ? Array(slotCount).fill(null) : []
  );
  const [removedSlots, setRemovedSlots] = useState<boolean[]>(
    slotMode ? Array(slotCount).fill(false) : []
  );
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [replaceTarget, setReplaceTarget] = useState<string | null>(null);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);

  const fetchImages = useCallback(async () => {
    const { data, error } = await supabase.storage.from(BUCKET).list(folder, {
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      console.error(`[${folder}] Fetch error:`, error);
      setLoading(false);
      return;
    }

    const files = (data || [])
      .filter((f) => !f.id?.startsWith(".") && f.name !== ".emptyFolderPlaceholder");

    if (slotMode) {
      const next: SlotFile[] = Array(slotCount).fill(null);
      const nextRemoved: boolean[] = Array(slotCount).fill(false);
      for (const f of files) {
        const removedIndex = parseRemovedSlotIndex(f.name);
        if (removedIndex !== null && removedIndex >= 0 && removedIndex < slotCount) {
          nextRemoved[removedIndex] = true;
          continue;
        }
        const i = parseSlotIndex(f.name);
        if (i !== null && i >= 0 && i < slotCount) {
          next[i] = {
            name: f.name,
            url: supabase.storage.from(BUCKET).getPublicUrl(`${folder}/${f.name}`).data.publicUrl,
          };
        }
      }
      setSlots(next);
      setRemovedSlots(nextRemoved);
    } else {
      const hasCleared = files.some((f) => f.name === "all-removed.flag");
      const imageFiles = files.filter((f) => !f.name.endsWith(".flag"));
      setAllCleared(hasCleared && imageFiles.length === 0);
      setImages(
        imageFiles.map((f) => ({
          name: f.name,
          url: supabase.storage.from(BUCKET).getPublicUrl(`${folder}/${f.name}`).data.publicUrl,
        }))
      );
    }
    setLoading(false);
  }, [folder, slotMode, slotCount]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  async function openCrop(file: File, opts?: { replaceOld?: string; slotIndex?: number }) {
    setUploading(true);
    const normalized = await normalizeFile(file).catch(() => file);
    setUploading(false);
    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
      setReplaceTarget(opts?.replaceOld ?? null);
      setTargetSlot(opts?.slotIndex ?? null);
    };
    reader.readAsDataURL(normalized);
  }

  function closeCrop() {
    setCropSrc(null);
    setReplaceTarget(null);
    setTargetSlot(null);
  }

  async function handleCropped(blob: Blob) {
    const oldReplace = replaceTarget;
    const slotIndex = targetSlot;
    closeCrop();
    setUploading(true);

    try {
      if (oldReplace) {
        await supabase.storage.from(BUCKET).remove([`${folder}/${oldReplace}`]);
      }
      if (slotIndex !== null) {
        await supabase.storage.from(BUCKET).remove([`${folder}/slot-${slotIndex}-removed.flag`]);
      }
      if (slotIndex === null) {
        await supabase.storage.from(BUCKET).remove([`${folder}/all-removed.flag`]);
      }

      const fileName =
        slotIndex !== null
          ? `slot-${slotIndex}-${Date.now()}.webp`
          : `${Date.now()}.webp`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${folder}/${fileName}`, blob, { contentType: "image/webp" });

      if (error) {
        alert("Upload failed: " + error.message);
      } else {
        await fetchImages();
      }
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    }

    setUploading(false);
  }

  async function handleDelete(name: string) {
    if (!confirm("Delete this image?")) return;

    const { error } = await supabase.storage.from(BUCKET).remove([`${folder}/${name}`]);

    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      await fetchImages();
    }
  }

  async function handleDeleteSlot(slot: SlotFile, slotIndex: number, hasLocalFallback: boolean) {
    if (!confirm("Delete this image?")) return;
    setUploading(true);

    try {
      if (slot) {
        const { error } = await supabase.storage.from(BUCKET).remove([`${folder}/${slot.name}`]);
        if (error) throw new Error(error.message);

        if (hasLocalFallback) {
          await supabase.storage.from(BUCKET).remove([`${folder}/slot-${slotIndex}-removed.flag`]);
        }
      } else if (hasLocalFallback) {
        const marker = new Blob(["removed"], { type: "text/plain" });
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(`${folder}/slot-${slotIndex}-removed.flag`, marker, {
            contentType: "text/plain",
            upsert: true,
          });
        if (error) throw new Error(error.message);
      }

      await fetchImages();
    } catch (err) {
      alert("Delete failed: " + (err as Error).message);
    }

    setUploading(false);
  }

  async function handleClearFallbacks() {
    if (!confirm("Remove all default images? The section will show no images until you upload new ones.")) return;
    setUploading(true);
    try {
      const marker = new Blob(["removed"], { type: "text/plain" });
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${folder}/all-removed.flag`, marker, { contentType: "text/plain", upsert: true });
      if (error) throw new Error(error.message);
      await fetchImages();
    } catch (err) {
      alert("Failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  const atLimit = !slotMode && maxImages > 0 && images.length >= maxImages;
  const filledCount = slotMode
    ? slots.reduce((count, slot, i) => {
        const hasFallback = !!fallbackImages?.[i] && !removedSlots[i];
        return count + (slot || hasFallback ? 1 : 0);
      }, 0)
    : images.length;
  const totalCount = slotMode ? slotCount : images.length;

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {loading
              ? "..."
              : slotMode
                ? `${filledCount}/${totalCount} filled`
                : allCleared
                  ? "0 images"
                  : images.length === 0 && fallbackImages && fallbackImages.length > 0
                    ? `${fallbackImages.length} default${fallbackImages.length !== 1 ? "s" : ""}`
                    : `${images.length} image${images.length !== 1 ? "s" : ""}`}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${collapsed ? "" : "rotate-180"}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {!collapsed && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          {slotMode ? (
            loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {slotLabels!.map((label, i) => {
                  const slot = slots[i];
                  const fallback = fallbackImages?.[i] || "";
                  const hasLocalFallback = !!fallback;
                  const hasFallback = hasLocalFallback && !removedSlots[i];
                  const hasVisual = !!slot || hasFallback;
                  return (
                    <div
                      key={i}
                      className="group rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="bg-blue-50 border-b border-blue-100 px-2.5 py-2 text-xs font-semibold text-blue-900">
                        {i + 1}. {label}
                      </div>
                      <div className="relative aspect-video bg-gray-100">
                        {slot ? (
                          <Image
                            src={slot.url}
                            alt={label}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : hasFallback ? (
                          <>
                            <Image
                              src={fallback}
                              alt={label}
                              fill
                              className="object-cover opacity-80"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <span className="absolute top-1 left-1 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-tight">
                              Default
                            </span>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                        {hasVisual && (
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                            <label className="bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors text-center cursor-pointer">
                              Replace
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    openCrop(file, slot ? { replaceOld: slot.name, slotIndex: i } : { slotIndex: i });
                                  }
                                  e.target.value = "";
                                }}
                                disabled={uploading}
                                className="hidden"
                              />
                            </label>
                            <button
                              onClick={() => handleDeleteSlot(slot, i, hasLocalFallback)}
                              className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        {!hasVisual && (
                          <label className="block bg-blue-600 text-white py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors text-center cursor-pointer">
                            {uploading ? "Uploading..." : "Upload"}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) openCrop(file, { slotIndex: i });
                                e.target.value = "";
                              }}
                              disabled={uploading}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <>
              {!atLimit && (
                <div className="mb-4">
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) openCrop(file);
                        e.target.value = "";
                      }}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {maxImages > 0 && (
                    <span className="text-xs text-gray-400 ml-3">
                      {images.length}/{maxImages} slots used
                    </span>
                  )}
                </div>
              )}

              {loading ? (
                <p className="text-gray-400 text-sm">Loading...</p>
              ) : images.length === 0 && !allCleared && fallbackImages && fallbackImages.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-600 font-semibold">
                      Currently showing default images — upload to replace, or delete to clear them.
                    </p>
                    <button
                      onClick={handleClearFallbacks}
                      disabled={uploading}
                      className="ml-3 text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded font-semibold hover:bg-red-200 transition-colors flex-shrink-0"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {fallbackImages.map((src, i) => (
                      <div key={i} className="group rounded-lg border border-amber-200 overflow-hidden">
                        <div className="relative aspect-video bg-gray-100">
                          <Image
                            src={src}
                            alt={`Default ${i + 1}`}
                            fill
                            className="object-cover opacity-80"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <span className="absolute top-1 left-1 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-tight">
                            Default
                          </span>
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                            <label className="bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors text-center cursor-pointer">
                              Replace
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) openCrop(file);
                                  e.target.value = "";
                                }}
                                disabled={uploading}
                                className="hidden"
                              />
                            </label>
                            <button
                              onClick={handleClearFallbacks}
                              disabled={uploading}
                              className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : images.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-400 text-sm">No images</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.name}
                      className="rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="relative aspect-video bg-gray-100">
                        <Image
                          src={image.url}
                          alt={image.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-500 truncate mb-2">{image.name}</p>
                        <div className="flex gap-1.5">
                          <label className="flex-1 bg-amber-100 text-amber-700 py-1 rounded text-xs font-medium hover:bg-amber-200 transition-colors text-center cursor-pointer">
                            Replace
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) openCrop(file, { replaceOld: image.name });
                                e.target.value = "";
                              }}
                              className="hidden"
                            />
                          </label>
                          <button
                            onClick={() => handleDelete(image.name)}
                            className="flex-1 bg-red-100 text-red-700 py-1 rounded text-xs font-medium hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          aspect={aspect}
          aspectLabel={aspectLabel}
          onConfirm={handleCropped}
          onCancel={closeCrop}
        />
      )}
    </div>
  );
}
