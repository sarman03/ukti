"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ImageCropModal from "@/components/ImageCropModal";

const BUCKET = "images";

interface SectionImageManagerProps {
  /** Folder path inside the bucket, e.g. "hero" or "about" */
  folder: string;
  /** Display title */
  title: string;
  /** Crop aspect ratio */
  aspect: number;
  /** Label shown in crop modal */
  aspectLabel: string;
  /** Max number of images allowed (0 = unlimited) */
  maxImages?: number;
}

export default function SectionImageManager({
  folder,
  title,
  aspect,
  aspectLabel,
  maxImages = 0,
}: SectionImageManagerProps) {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [replaceTarget, setReplaceTarget] = useState<string | null>(null);

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
      .filter((f) => !f.id?.startsWith(".") && f.name !== ".emptyFolderPlaceholder")
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(`${folder}/${f.name}`).data.publicUrl,
      }));

    setImages(files);
    setLoading(false);
  }, [folder]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function openCrop(file: File, replaceOld?: string) {
    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
      setReplaceTarget(replaceOld ?? null);
    };
    reader.readAsDataURL(file);
  }

  function closeCrop() {
    setCropSrc(null);
    setReplaceTarget(null);
  }

  async function handleCropped(blob: Blob) {
    const oldReplace = replaceTarget;
    closeCrop();
    setUploading(true);

    try {
      if (oldReplace) {
        await supabase.storage.from(BUCKET).remove([`${folder}/${oldReplace}`]);
      }

      const fileName = `${Date.now()}.webp`;

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

  const atLimit = maxImages > 0 && images.length >= maxImages;

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      {/* Collapsible header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {loading ? "..." : images.length} image{images.length !== 1 ? "s" : ""}
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
          {/* Upload button */}
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
          ) : images.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-400 text-sm">No images yet</p>
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
                            if (file) openCrop(file, image.name);
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
