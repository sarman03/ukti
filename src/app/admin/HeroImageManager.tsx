"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ImageCropModal from "@/components/ImageCropModal";

const BUCKET = "images";
const HERO_ASPECT = 16 / 9;

export default function HeroImageManager() {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Crop state
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [replaceTarget, setReplaceTarget] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    console.log("[Config] Bucket:", BUCKET);
    console.log("[Config] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    const { data, error } = await supabase.storage.from(BUCKET).list("", {
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      console.error("[Fetch] Error listing images:", error);
      setLoading(false);
      return;
    }

    const files = (data || [])
      .filter((f) => !f.id?.startsWith("."))
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      }));

    console.log("[Fetch] Found", files.length, "images:", files.map((f) => f.name));
    setImages(files);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function openCrop(file: File, replaceOld?: string) {
    console.log("[Upload] File selected:", file.name, (file.size / 1024).toFixed(1), "KB");
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
    closeCrop();
    setUploading(true);

    console.log("[Upload] Cropped blob ready —", (blob.size / 1024).toFixed(1), "KB");

    try {
      if (replaceTarget) {
        console.log("[Upload] Deleting old file:", replaceTarget);
        await supabase.storage.from(BUCKET).remove([replaceTarget]);
      }

      const fileName = `${Date.now()}.webp`;
      console.log("[Upload] Uploading as:", fileName);

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, blob, { contentType: "image/webp" });

      if (error) {
        console.error("[Upload] Failed:", error.message);
        alert("Upload failed: " + error.message);
      } else {
        console.log("[Upload] Success:", fileName);
        await fetchImages();
      }
    } catch (err) {
      console.error("[Upload] Error:", err);
      alert("Upload failed: " + (err as Error).message);
    }

    setUploading(false);
  }

  async function handleDelete(name: string) {
    if (!confirm("Delete this image?")) return;

    console.log("[Delete] Removing:", name);
    const { error } = await supabase.storage.from(BUCKET).remove([name]);

    if (error) {
      console.error("[Delete] Failed:", error.message);
      alert("Delete failed: " + error.message);
    } else {
      console.log("[Delete] Success:", name);
      await fetchImages();
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading hero images...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">
          Hero Section Images
        </h2>
        <label className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">
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
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-400 text-lg">No hero images yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Upload your first image using the button above
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.name}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700 font-medium truncate mb-3">
                  {image.name}
                </p>
                <div className="flex gap-2">
                  <label className="flex-1 bg-amber-100 text-amber-700 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors text-center cursor-pointer">
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
                    className="flex-1 bg-red-100 text-red-700 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          aspect={HERO_ASPECT}
          aspectLabel="Hero — 16:9 full screen"
          onConfirm={handleCropped}
          onCancel={closeCrop}
        />
      )}
    </div>
  );
}
