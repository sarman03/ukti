"use client";

import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const BUCKET = "images";

export function useSupabaseImages(folder: string, fallbackCount = 0) {
  const [images, setImages] = useState<string[]>([]);
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
        const urls = data
          .filter(
            (f) =>
              !f.id?.startsWith(".") &&
              f.name !== ".emptyFolderPlaceholder" &&
              !f.name.endsWith(".flag")
          )
          .map(
            (f) =>
              supabase.storage.from(BUCKET).getPublicUrl(`${folder}/${f.name}`).data.publicUrl
          );
        setImages(urls);
        setCleared(hasCleared && urls.length === 0);
      }
      setRemovedFallbacks(nextRemoved);
      setLoading(false);
    }
    fetch();
  }, [folder, fallbackCount]);

  return { images, cleared, loading, removedFallbacks };
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
