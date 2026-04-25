"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ImageCropModal from "@/components/ImageCropModal";
import { useToast, useConfirm, ToastContainer, ConfirmDialog } from "./AdminUI";

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
  slotLabels?: string[];
  fallbackImages?: string[];
  allowReorder?: boolean;
}

type SlotFile = { name: string; url: string } | null;

type OrderedItem =
  | { kind: "upload"; name: string; url: string }
  | { kind: "default"; fallbackIndex: number; src: string };

function parseSlotIndex(name: string): number | null {
  const m = name.match(/^slot-(\d+)-\d+\.webp$/);
  return m ? parseInt(m[1], 10) : null;
}

function parseRemovedSlotIndex(name: string): number | null {
  const m = name.match(/^slot-(\d+)-removed\.flag$/);
  return m ? parseInt(m[1], 10) : null;
}

const GripIcon = () => (
  <div className="absolute top-1 right-1 bg-black/40 rounded p-0.5 pointer-events-none">
    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  </div>
);

export default function SectionImageManager({
  folder,
  title,
  aspect,
  aspectLabel,
  maxImages = 0,
  slotLabels,
  fallbackImages,
  allowReorder = false,
}: SectionImageManagerProps) {
  const slotMode = !!slotLabels && slotLabels.length > 0;
  const slotCount = slotLabels?.length ?? 0;

  // Slot-mode state
  const [slots, setSlots] = useState<SlotFile[]>(slotMode ? Array(slotCount).fill(null) : []);
  const [removedSlots, setRemovedSlots] = useState<boolean[]>(slotMode ? Array(slotCount).fill(false) : []);

  // Non-slot state
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [allCleared, setAllCleared] = useState(false);
  const [removedFallbacks, setRemovedFallbacks] = useState<boolean[]>([]);

  // Unified ordered list (allowReorder mode only)
  const [unifiedOrder, setUnifiedOrder] = useState<OrderedItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [replaceTarget, setReplaceTarget] = useState<string | null>(null);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);
  const [targetFallbackIndex, setTargetFallbackIndex] = useState<number | null>(null);

  const { toasts, toast, dismiss } = useToast();
  const { confirm, confirmState, closeConfirm } = useConfirm();

  const fetchImages = useCallback(async () => {
    const { data, error } = await supabase.storage.from(BUCKET).list(folder, {
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      console.error(`[${folder}] Fetch error:`, error);
      setLoading(false);
      return;
    }

    const files = (data || []).filter(
      (f) => !f.id?.startsWith(".") && f.name !== ".emptyFolderPlaceholder"
    );

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
          const url = supabase.storage.from(BUCKET).getPublicUrl(`${folder}/${f.name}`).data.publicUrl;
          console.log(`[${folder}] slot ${i} → ${url}`);
          next[i] = { name: f.name, url };
        }
      }
      console.log(`[${folder}] all files:`, files.map(f => f.name));
      setSlots(next);
      setRemovedSlots(nextRemoved);
    } else {
      const nextRemoved = Array(fallbackImages?.length ?? 0).fill(false);
      for (const f of files) {
        const m = f.name.match(/^fallback-(\d+)-removed\.flag$/);
        if (!m) continue;
        const idx = parseInt(m[1], 10);
        if (idx >= 0 && idx < nextRemoved.length) nextRemoved[idx] = true;
      }

      const hasCleared = files.some((f) => f.name === "all-removed.flag");
      const orderEntry = files.find((f) => f.name === "order.json");
      const imageFiles = files.filter((f) => !f.name.endsWith(".flag") && f.name !== "order.json");

      const uploadMap: Record<string, string> = {};
      for (const f of imageFiles) {
        uploadMap[f.name] = supabase.storage
          .from(BUCKET)
          .getPublicUrl(`${folder}/${f.name}`).data.publicUrl;
      }
      const uploadItems: { name: string; url: string }[] = imageFiles.map((f) => ({
        name: f.name,
        url: uploadMap[f.name],
      }));

      if (allowReorder) {
        const defaultItems = (fallbackImages ?? [])
          .map((src, i) => ({ kind: "default" as const, fallbackIndex: i, src }))
          .filter((_, i) => !nextRemoved[i] && !hasCleared);

        const uploadOrderItems = uploadItems.map((u) => ({
          kind: "upload" as const,
          name: u.name,
          url: u.url,
        }));

        let unified: OrderedItem[] = [...defaultItems, ...uploadOrderItems];

        if (orderEntry) {
          try {
            const { data: orderBlob } = await supabase.storage
              .from(BUCKET)
              .download(`${folder}/order.json`);
            if (orderBlob) {
              const keys: string[] = JSON.parse(await orderBlob.text());
              const ordered: OrderedItem[] = [];
              for (const key of keys) {
                if (key.startsWith("fallback-")) {
                  const idx = parseInt(key.replace("fallback-", ""), 10);
                  const item = defaultItems.find((d) => d.fallbackIndex === idx);
                  if (item) ordered.push(item);
                } else {
                  const item = uploadOrderItems.find((u) => u.name === key);
                  if (item) ordered.push(item);
                }
              }
              // Append anything not yet in the saved order
              for (const d of defaultItems) {
                if (!ordered.some((x) => x.kind === "default" && x.fallbackIndex === d.fallbackIndex))
                  ordered.push(d);
              }
              for (const u of uploadOrderItems) {
                if (!ordered.some((x) => x.kind === "upload" && x.name === u.name))
                  ordered.push(u);
              }
              unified = ordered;
            }
          } catch { /* keep default order */ }
        }

        setUnifiedOrder(unified);
        setAllCleared(hasCleared);
        setRemovedFallbacks(nextRemoved);
        setImages(uploadItems);
      } else {
        // Non-reorder mode: apply upload-only ordering
        let orderedFiles = imageFiles;
        if (orderEntry) {
          try {
            const { data: orderBlob } = await supabase.storage
              .from(BUCKET)
              .download(`${folder}/order.json`);
            if (orderBlob) {
              const order: string[] = JSON.parse(await orderBlob.text());
              orderedFiles = [...imageFiles].sort((a, b) => {
                const ai = order.indexOf(a.name);
                const bi = order.indexOf(b.name);
                if (ai === -1 && bi === -1) return 0;
                if (ai === -1) return 1;
                if (bi === -1) return -1;
                return ai - bi;
              });
            }
          } catch { /* keep original */ }
        }

        setAllCleared(hasCleared && imageFiles.length === 0);
        setRemovedFallbacks(nextRemoved);
        setImages(orderedFiles.map((f) => ({ name: f.name, url: uploadMap[f.name] })));
      }
    }
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder, slotMode, slotCount, fallbackImages?.length, allowReorder]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // ── Crop helpers ──────────────────────────────────────────────────────────

  async function openCrop(
    file: File,
    opts?: { replaceOld?: string; slotIndex?: number; fallbackIndex?: number }
  ) {
    setUploading(true);
    const normalized = await normalizeFile(file).catch(() => file);
    setUploading(false);
    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
      setReplaceTarget(opts?.replaceOld ?? null);
      setTargetSlot(opts?.slotIndex ?? null);
      setTargetFallbackIndex(opts?.fallbackIndex ?? null);
    };
    reader.readAsDataURL(normalized);
  }

  function closeCrop() {
    setCropSrc(null);
    setReplaceTarget(null);
    setTargetSlot(null);
    setTargetFallbackIndex(null);
  }

  async function handleCropped(blob: Blob) {
    const oldReplace = replaceTarget;
    const slotIndex = targetSlot;
    const fallbackIndex = targetFallbackIndex;
    closeCrop();
    setUploading(true);

    try {
      if (oldReplace) {
        await supabase.storage.from(BUCKET).remove([`${folder}/${oldReplace}`]);
      }
      if (slotIndex !== null) {
        await supabase.storage.from(BUCKET).remove([`${folder}/slot-${slotIndex}-removed.flag`]);
      }
      if (slotIndex === null && fallbackIndex === null && !allowReorder) {
        await supabase.storage.from(BUCKET).remove([`${folder}/all-removed.flag`]);
      }
      if (fallbackIndex !== null) {
        const marker = new Blob(["removed"], { type: "text/plain" });
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(`${folder}/fallback-${fallbackIndex}-removed.flag`, marker, {
            contentType: "text/plain",
            upsert: true,
          });
        if (error) throw new Error(error.message);
      }

      const fileName =
        slotIndex !== null
          ? `slot-${slotIndex}-${Date.now()}.webp`
          : `${Date.now()}.webp`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${folder}/${fileName}`, blob, { contentType: "image/webp" });

      if (error) {
        toast.error("Upload failed: " + error.message);
      } else {
        toast.success("Image uploaded successfully.");

        if (allowReorder && slotIndex === null) {
          const newUpload: OrderedItem = {
            kind: "upload",
            name: fileName,
            url: supabase.storage.from(BUCKET).getPublicUrl(`${folder}/${fileName}`).data.publicUrl,
          };
          let newOrder: OrderedItem[];
          if (fallbackIndex !== null) {
            // Replace the default card with the new upload in the same position
            newOrder = unifiedOrder.map((item) =>
              item.kind === "default" && item.fallbackIndex === fallbackIndex ? newUpload : item
            );
          } else if (oldReplace) {
            newOrder = unifiedOrder.map((item) =>
              item.kind === "upload" && item.name === oldReplace ? newUpload : item
            );
          } else {
            newOrder = [...unifiedOrder, newUpload];
          }
          setUnifiedOrder(newOrder);
          await saveUnifiedOrder(newOrder);
        }
        await fetchImages();
      }
    } catch (err) {
      toast.error("Upload failed: " + (err as Error).message);
    }

    setUploading(false);
  }

  // ── Delete handlers ───────────────────────────────────────────────────────

  async function handleDelete(name: string) {
    const ok = await confirm("Delete this image?", { confirmLabel: "Delete" });
    if (!ok) return;
    const { error } = await supabase.storage.from(BUCKET).remove([`${folder}/${name}`]);
    if (error) {
      toast.error("Delete failed: " + error.message);
    } else {
      toast.success("Image deleted.");
      await saveOrder(images.filter((img) => img.name !== name).map((img) => img.name));
      await fetchImages();
    }
  }

  async function handleDeleteUnified(item: OrderedItem) {
    const ok = await confirm("Delete this image?", { confirmLabel: "Delete" });
    if (!ok) return;
    setUploading(true);
    try {
      if (item.kind === "upload") {
        const { error } = await supabase.storage.from(BUCKET).remove([`${folder}/${item.name}`]);
        if (error) throw new Error(error.message);
      } else {
        const marker = new Blob(["removed"], { type: "text/plain" });
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(`${folder}/fallback-${item.fallbackIndex}-removed.flag`, marker, {
            contentType: "text/plain",
            upsert: true,
          });
        if (error) throw new Error(error.message);
      }
      const newOrder = unifiedOrder.filter((x) =>
        item.kind === "upload"
          ? !(x.kind === "upload" && x.name === item.name)
          : !(x.kind === "default" && x.fallbackIndex === item.fallbackIndex)
      );
      setUnifiedOrder(newOrder);
      await saveUnifiedOrder(newOrder);
      toast.success("Image deleted.");
      await fetchImages();
    } catch (err) {
      toast.error("Delete failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  async function handleDeleteSlot(slot: SlotFile, slotIndex: number, hasLocalFallback: boolean) {
    const ok = await confirm("Delete this image?", { confirmLabel: "Delete" });
    if (!ok) return;
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
      toast.success("Image deleted.");
      await fetchImages();
    } catch (err) {
      toast.error("Delete failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  async function handleClearFallbacks() {
    const ok = await confirm("Clear all default images?", {
      detail: "The section will show no images until you upload new ones.",
      confirmLabel: "Clear all",
    });
    if (!ok) return;
    setUploading(true);
    try {
      const marker = new Blob(["removed"], { type: "text/plain" });
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${folder}/all-removed.flag`, marker, { contentType: "text/plain", upsert: true });
      if (error) throw new Error(error.message);
      toast.success("Default images cleared.");
      await fetchImages();
    } catch (err) {
      toast.error("Failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  async function handleDeleteFallback(index: number) {
    const ok = await confirm("Delete this default image?", { confirmLabel: "Delete" });
    if (!ok) return;
    setUploading(true);
    try {
      const marker = new Blob(["removed"], { type: "text/plain" });
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${folder}/fallback-${index}-removed.flag`, marker, {
          contentType: "text/plain",
          upsert: true,
        });
      if (error) throw new Error(error.message);
      toast.success("Default image removed.");
      await fetchImages();
    } catch (err) {
      toast.error("Delete failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  async function handleRestoreFallbacks() {
    if (!fallbackImages?.length) return;
    setUploading(true);
    try {
      const toRemove = [
        `${folder}/all-removed.flag`,
        ...fallbackImages.map((_, i) => `${folder}/fallback-${i}-removed.flag`),
      ];
      await supabase.storage.from(BUCKET).remove(toRemove);
      toast.success("Default images restored.");
      await fetchImages();
    } catch (err) {
      toast.error("Failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  // ── Order persistence ─────────────────────────────────────────────────────

  async function saveOrder(names: string[]) {
    const blob = new Blob([JSON.stringify(names)], { type: "application/json" });
    await supabase.storage
      .from(BUCKET)
      .upload(`${folder}/order.json`, blob, { contentType: "application/json", upsert: true });
  }

  async function saveUnifiedOrder(items: OrderedItem[]) {
    const keys = items.map((item) =>
      item.kind === "default" ? `fallback-${item.fallbackIndex}` : item.name
    );
    const blob = new Blob([JSON.stringify(keys)], { type: "application/json" });
    await supabase.storage
      .from(BUCKET)
      .upload(`${folder}/order.json`, blob, { contentType: "application/json", upsert: true });
  }

  async function handleReorder(from: number, to: number) {
    if (from === to) return;
    if (allowReorder) {
      const next = [...unifiedOrder];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      setUnifiedOrder(next);
      await saveUnifiedOrder(next);
    } else {
      const next = [...images];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      setImages(next);
      await saveOrder(next.map((img) => img.name));
    }
  }

  // ── Derived display values ────────────────────────────────────────────────

  const atLimit = !slotMode && maxImages > 0 && images.length >= maxImages;
  const visibleFallbacks = (fallbackImages ?? [])
    .map((src, i) => ({ src, index: i }))
    .filter(({ index }) => !removedFallbacks[index]);

  const filledCount = slotMode
    ? slots.reduce((count, slot, i) => {
        const hasFallback = !!fallbackImages?.[i] && !removedSlots[i];
        return count + (slot || hasFallback ? 1 : 0);
      }, 0)
    : images.length;
  const totalCount = slotMode ? slotCount : images.length;

  const badgeLabel = loading
    ? "..."
    : slotMode
      ? `${filledCount}/${totalCount} filled`
      : (() => {
          const uploadCount = images.length;
          const defaultCount = allowReorder
            ? unifiedOrder.filter((x) => x.kind === "default").length
            : visibleFallbacks.length;
          if (allCleared && uploadCount === 0 && !allowReorder) return "0 images";
          if (uploadCount === 0 && defaultCount === 0) return "0 images";
          if (uploadCount === 0) return `${defaultCount} default${defaultCount !== 1 ? "s" : ""}`;
          if (defaultCount === 0) return `${uploadCount} image${uploadCount !== 1 ? "s" : ""}`;
          return `${uploadCount} uploaded, ${defaultCount} default${defaultCount !== 1 ? "s" : ""}`;
        })();

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {badgeLabel}
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
            // ── Slot mode ──────────────────────────────────────────────────
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
                    <div key={i} className="group rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-blue-50 border-b border-blue-100 px-2.5 py-2 text-xs font-semibold text-blue-900">
                        {i + 1}. {label}
                      </div>
                      <div className="relative aspect-video bg-gray-100">
                        {slot ? (
                          <Image src={slot.url} alt={label} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                        ) : hasFallback ? (
                          <>
                            <Image src={fallback} alt={label} fill className="object-cover opacity-80" sizes="(max-width: 768px) 50vw, 25vw" />
                            <span className="absolute top-1 left-1 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-tight">Default</span>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">No image</div>
                        )}
                        {hasVisual && (
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                            <label className="bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors text-center cursor-pointer">
                              Replace
                              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) openCrop(f, slot ? { replaceOld: slot.name, slotIndex: i } : { slotIndex: i }); e.target.value = ""; }} disabled={uploading} className="hidden" />
                            </label>
                            <button onClick={() => handleDeleteSlot(slot, i, hasLocalFallback)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-200 transition-colors">Delete</button>
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        {!hasVisual && (
                          <label className="block bg-blue-600 text-white py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors text-center cursor-pointer">
                            {uploading ? "Uploading..." : "Upload"}
                            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) openCrop(f, { slotIndex: i }); e.target.value = ""; }} disabled={uploading} className="hidden" />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : allowReorder ? (
            // ── Unified draggable grid ─────────────────────────────────────
            <>
              <div className="mb-4">
                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                  {uploading ? "Uploading..." : "Upload Image"}
                  <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) openCrop(f); e.target.value = ""; }} disabled={uploading} className="hidden" />
                </label>
              </div>

              {loading ? (
                <p className="text-gray-400 text-sm">Loading...</p>
              ) : unifiedOrder.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-400 text-sm mb-3">No images</p>
                  {fallbackImages && fallbackImages.length > 0 && (
                    <button onClick={handleRestoreFallbacks} disabled={uploading} className="text-xs bg-amber-100 text-amber-800 px-3 py-1.5 rounded font-semibold hover:bg-amber-200 transition-colors">
                      Restore defaults
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {unifiedOrder.map((item, i) => {
                    const key = item.kind === "upload" ? item.name : `fallback-${item.fallbackIndex}`;
                    const imgSrc = item.kind === "upload" ? item.url : item.src;
                    return (
                      <div
                        key={key}
                        draggable
                        onDragStart={() => setDragIndex(i)}
                        onDragOver={(e) => { e.preventDefault(); setDragOverIndex(i); }}
                        onDragLeave={() => setDragOverIndex(null)}
                        onDrop={async (e) => { e.preventDefault(); if (dragIndex !== null) await handleReorder(dragIndex, i); setDragOverIndex(null); }}
                        onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                        className={`rounded-lg border overflow-hidden transition-all group cursor-grab ${
                          dragIndex === i ? "opacity-40" : ""
                        } ${dragOverIndex === i && dragIndex !== i ? "ring-2 ring-blue-400 border-blue-400" : "border-gray-200"}`}
                      >
                        <div className="relative aspect-video bg-gray-100">
                          <Image src={imgSrc} alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                          {item.kind === "default" && (
                            <span className="absolute top-1 left-1 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-tight">Default</span>
                          )}
                          <GripIcon />
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                            <label className="bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors text-center cursor-pointer">
                              Replace
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) openCrop(f, item.kind === "upload" ? { replaceOld: item.name } : { fallbackIndex: item.fallbackIndex });
                                  e.target.value = "";
                                }}
                                disabled={uploading}
                                className="hidden"
                              />
                            </label>
                            <button onClick={() => handleDeleteUnified(item)} disabled={uploading} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-200 transition-colors">
                              Delete
                            </button>
                          </div>
                        </div>
                        {item.kind === "upload" && (
                          <div className="p-2">
                            <p className="text-xs text-gray-500 truncate">{item.name}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            // ── Standard non-reorder mode ──────────────────────────────────
            <>
              {!atLimit && (
                <div className="mb-4">
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) openCrop(f); e.target.value = ""; }} disabled={uploading} className="hidden" />
                  </label>
                  {maxImages > 0 && (
                    <span className="text-xs text-gray-400 ml-3">{images.length}/{maxImages} slots used</span>
                  )}
                </div>
              )}

              {loading ? (
                <p className="text-gray-400 text-sm">Loading...</p>
              ) : allCleared && images.length === 0 ? (
                <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 flex items-center justify-between gap-3">
                  <p className="text-sm text-amber-700 font-medium">Default images are currently hidden.</p>
                  <button onClick={handleRestoreFallbacks} disabled={uploading} className="text-xs bg-amber-100 text-amber-800 px-3 py-1.5 rounded font-semibold hover:bg-amber-200 transition-colors">Restore defaults</button>
                </div>
              ) : visibleFallbacks.length === 0 && images.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-400 text-sm mb-3">No images</p>
                  {fallbackImages && fallbackImages.length > 0 && (
                    <button onClick={handleRestoreFallbacks} disabled={uploading} className="text-xs bg-amber-100 text-amber-800 px-3 py-1.5 rounded font-semibold hover:bg-amber-200 transition-colors">Restore defaults</button>
                  )}
                </div>
              ) : (
                <div>
                  {visibleFallbacks.length > 0 && (
                    <div className="flex items-center justify-between mb-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                      <p className="text-xs text-amber-600 font-semibold">Default images shown — replace or delete individual ones, or clear all defaults.</p>
                      <button onClick={handleClearFallbacks} disabled={uploading} className="ml-3 text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded font-semibold hover:bg-red-200 transition-colors flex-shrink-0">Clear all defaults</button>
                    </div>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {visibleFallbacks.map(({ src, index }) => (
                      <div key={`fallback-${index}`} className="group rounded-lg border border-amber-200 overflow-hidden">
                        <div className="relative aspect-video bg-gray-100">
                          <Image src={src} alt={`Default ${index + 1}`} fill className="object-cover opacity-80" sizes="(max-width: 768px) 50vw, 25vw" />
                          <span className="absolute top-1 left-1 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-tight">Default</span>
                          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                            <label className="bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-semibold hover:bg-gray-100 transition-colors text-center cursor-pointer">
                              Replace
                              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) openCrop(f, { fallbackIndex: index }); e.target.value = ""; }} disabled={uploading} className="hidden" />
                            </label>
                            <button onClick={() => handleDeleteFallback(index)} disabled={uploading} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-200 transition-colors">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {images.map((image) => (
                      <div key={image.name} className="rounded-lg border border-gray-200 overflow-hidden">
                        <div className="relative aspect-video bg-gray-100">
                          <Image src={image.url} alt={image.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                        </div>
                        <div className="p-2">
                          <p className="text-xs text-gray-500 truncate mb-2">{image.name}</p>
                          <div className="flex gap-1.5">
                            <label className="flex-1 bg-amber-100 text-amber-700 py-1 rounded text-xs font-medium hover:bg-amber-200 transition-colors text-center cursor-pointer">
                              Replace
                              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) openCrop(f, { replaceOld: image.name }); e.target.value = ""; }} className="hidden" />
                            </label>
                            <button onClick={() => handleDelete(image.name)} className="flex-1 bg-red-100 text-red-700 py-1 rounded text-xs font-medium hover:bg-red-200 transition-colors">Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      <ConfirmDialog state={confirmState} onClose={closeConfirm} />
    </div>
  );
}
