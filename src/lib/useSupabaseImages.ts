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
