"use client";

import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const BUCKET = "images";

export function useSupabaseImages(
  folder: string,
  fallbackCount = 0,
  fallbackImages?: string[]
) {
  const [images, setImages] = useState<string[]>([]);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [cleared, setCleared] = useState(false);
  const [removedFallbacks, setRemovedFallbacks] = useState<boolean[]>(
    () => Array(fallbackCount).fill(false)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.storage.from(BUCKET).list(folder, {
        sortBy: { column: "name", order: "asc" },
      });

      const nextRemoved: boolean[] = Array(fallbackCount).fill(false);
      if (data && data.length > 0) {
        for (const f of data) {
          const m = f.name.match(/^fallback-(\d+)-removed\.flag$/);
          if (!m) continue;
          const i = parseInt(m[1], 10);
          if (i >= 0 && i < nextRemoved.length) nextRemoved[i] = true;
        }

        const hasCleared = data.some((f) => f.name === "all-removed.flag");
        const orderEntry = data.find((f) => f.name === "order.json");
        const imageFiles = data.filter(
          (f) =>
            !f.id?.startsWith(".") &&
            f.name !== ".emptyFolderPlaceholder" &&
            !f.name.endsWith(".flag") &&
            f.name !== "order.json"
        );

        // Build URL map for uploads
        const uploadUrlMap: Record<string, string> = {};
        for (const f of imageFiles) {
          uploadUrlMap[f.name] = supabase.storage
            .from(BUCKET)
            .getPublicUrl(`${folder}/${f.name}`).data.publicUrl;
        }

        let uploadUrls = imageFiles.map((f) => uploadUrlMap[f.name]);
        let combined: string[] | null = null;

        if (orderEntry) {
          try {
            const { data: orderBlob } = await supabase.storage
              .from(BUCKET)
              .download(`${folder}/order.json`);
            if (orderBlob) {
              const keys: string[] = JSON.parse(await orderBlob.text());
              const hasMixed = keys.some((k) => k.startsWith("fallback-"));

              if (hasMixed && fallbackImages && !hasCleared) {
                // Mixed order — interleave defaults and uploads
                const result: string[] = [];
                for (const key of keys) {
                  if (key.startsWith("fallback-")) {
                    const idx = parseInt(key.replace("fallback-", ""), 10);
                    if (!nextRemoved[idx] && fallbackImages[idx]) {
                      result.push(fallbackImages[idx]);
                    }
                  } else {
                    const url = uploadUrlMap[key];
                    if (url) result.push(url);
                  }
                }
                // Append uploads not in the order spec
                for (const f of imageFiles) {
                  if (!keys.includes(f.name)) result.push(uploadUrlMap[f.name]);
                }
                combined = result;
              } else {
                // Upload-only ordering
                uploadUrls = [...imageFiles]
                  .sort((a, b) => {
                    const ai = keys.indexOf(a.name);
                    const bi = keys.indexOf(b.name);
                    if (ai === -1 && bi === -1) return 0;
                    if (ai === -1) return 1;
                    if (bi === -1) return -1;
                    return ai - bi;
                  })
                  .map((f) => uploadUrlMap[f.name]);
              }
            }
          } catch { /* keep original order */ }
        }

        setImages(uploadUrls);
        setCleared(hasCleared && imageFiles.length === 0);
        setAllImages(combined ?? []);
      }
      setRemovedFallbacks(nextRemoved);
      setLoading(false);
    }
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder, fallbackCount]);

  return { images, allImages, cleared, loading, removedFallbacks };
}

/**
 * Returns a fixed-length array of image URLs indexed by slot.
 * Filenames are expected to follow `slot-{index}-{timestamp}.webp`.
 * Missing slots come back as empty strings.
 */
export function useSupabaseSlotImages(folder: string, count: number) {
  const [images, setImages] = useState<string[]>(() => Array(count).fill(""));
  const [removed, setRemoved] = useState<boolean[]>(() => Array(count).fill(false));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.storage.from(BUCKET).list(folder, {
        sortBy: { column: "name", order: "asc" },
      });

      const next: string[] = Array(count).fill("");
      const nextRemoved: boolean[] = Array(count).fill(false);
      if (data && data.length > 0) {
        for (const f of data) {
          if (f.id?.startsWith(".") || f.name === ".emptyFolderPlaceholder") continue;
          const removedMatch = f.name.match(/^slot-(\d+)-removed\.flag$/);
          if (removedMatch) {
            const removedIdx = parseInt(removedMatch[1], 10);
            if (removedIdx >= 0 && removedIdx < count) nextRemoved[removedIdx] = true;
            continue;
          }

          const m = f.name.match(/^slot-(\d+)-\d+\.webp$/);
          if (!m) continue;
          const idx = parseInt(m[1], 10);
          if (idx >= 0 && idx < count) {
            next[idx] = supabase.storage
              .from(BUCKET)
              .getPublicUrl(`${folder}/${f.name}`).data.publicUrl;
          }
        }
      }
      setImages(next);
      setRemoved(nextRemoved);
      setLoading(false);
    }
    fetch();
  }, [folder, count]);

  return { images, removed, loading };
}
