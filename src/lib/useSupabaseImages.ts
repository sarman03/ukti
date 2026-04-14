"use client";

import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const BUCKET = "images";

export function useSupabaseImages(folder: string) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.storage.from(BUCKET).list(folder, {
        sortBy: { column: "name", order: "asc" },
      });

      if (data && data.length > 0) {
        const urls = data
          .filter((f) => !f.id?.startsWith(".") && f.name !== ".emptyFolderPlaceholder")
          .map(
            (f) =>
              supabase.storage.from(BUCKET).getPublicUrl(`${folder}/${f.name}`).data.publicUrl
          );
        setImages(urls);
      }
      setLoading(false);
    }
    fetch();
  }, [folder]);

  return { images, loading };
}

/**
 * Returns a fixed-length array of image URLs indexed by slot.
 * Filenames are expected to follow `slot-{index}-{timestamp}.webp`.
 * Missing slots come back as empty strings.
 */
export function useSupabaseSlotImages(folder: string, count: number) {
  const [images, setImages] = useState<string[]>(() => Array(count).fill(""));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.storage.from(BUCKET).list(folder, {
        sortBy: { column: "name", order: "asc" },
      });

      const next: string[] = Array(count).fill("");
      if (data && data.length > 0) {
        for (const f of data) {
          if (f.id?.startsWith(".") || f.name === ".emptyFolderPlaceholder") continue;
          const m = f.name.match(/^slot-(\d+)-/);
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
      setLoading(false);
    }
    fetch();
  }, [folder, count]);

  return { images, loading };
}
