"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const BUCKET = "images";

interface SectionVideoManagerProps {
  folder: string;
  title: string;
  fallbackVideos?: string[];
}

export default function SectionVideoManager({
  folder,
  title,
  fallbackVideos,
}: SectionVideoManagerProps) {
  const [videos, setVideos] = useState<{ name: string; url: string }[]>([]);
  const [allCleared, setAllCleared] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const fetchVideos = useCallback(async () => {
    const { data, error } = await supabase.storage.from(BUCKET).list(folder, {
      sortBy: { column: "name", order: "asc" },
    });
    if (error) { setLoading(false); return; }

    const files = (data || []).filter(
      (f) => !f.id?.startsWith(".") && f.name !== ".emptyFolderPlaceholder"
    );
    const hasCleared = files.some((f) => f.name === "all-removed.flag");
    const videoFiles = files.filter((f) => !f.name.endsWith(".flag"));

    setAllCleared(hasCleared && videoFiles.length === 0);
    setVideos(
      videoFiles.map((f) => ({
        name: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(`${folder}/${f.name}`).data.publicUrl,
      }))
    );
    setLoading(false);
  }, [folder]);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      await supabase.storage.from(BUCKET).remove([`${folder}/all-removed.flag`]);
      const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${folder}/${Date.now()}.${ext}`, file, { contentType: file.type });
      if (error) alert("Upload failed: " + error.message);
      else await fetchVideos();
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  async function handleReplace(oldName: string, file: File) {
    setUploading(true);
    try {
      await supabase.storage.from(BUCKET).remove([`${folder}/${oldName}`]);
      const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${folder}/${Date.now()}.${ext}`, file, { contentType: file.type });
      if (error) alert("Upload failed: " + error.message);
      else await fetchVideos();
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  async function handleDelete(name: string) {
    if (!confirm("Delete this video?")) return;
    const { error } = await supabase.storage.from(BUCKET).remove([`${folder}/${name}`]);
    if (error) alert("Delete failed: " + error.message);
    else await fetchVideos();
  }

  async function handleClearFallbacks() {
    if (!confirm("Remove default videos? The section will show no videos until you upload new ones.")) return;
    setUploading(true);
    try {
      const marker = new Blob(["removed"], { type: "text/plain" });
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${folder}/all-removed.flag`, marker, { contentType: "text/plain", upsert: true });
      if (error) throw new Error(error.message);
      await fetchVideos();
    } catch (err) {
      alert("Failed: " + (err as Error).message);
    }
    setUploading(false);
  }

  const showFallbacks = !allCleared && videos.length === 0 && !!fallbackVideos?.length;
  const badge = loading
    ? "..."
    : allCleared
      ? "0 videos"
      : showFallbacks
        ? `${fallbackVideos!.length} default${fallbackVideos!.length !== 1 ? "s" : ""}`
        : `${videos.length} video${videos.length !== 1 ? "s" : ""}`;

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-gray-800">{title}</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{badge}</span>
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
          <div className="mb-4 flex items-center gap-3">
            <label className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer">
              {uploading ? "Uploading..." : "Upload Video"}
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm,.m4v"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                  e.target.value = "";
                }}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-400">MP4 recommended for best compatibility</span>
          </div>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : showFallbacks ? (
            <div>
              <div className="flex items-center justify-between mb-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <p className="text-xs text-amber-600 font-semibold">
                  Currently showing default videos — upload to replace, or delete to clear them.
                </p>
                <button
                  onClick={handleClearFallbacks}
                  disabled={uploading}
                  className="ml-3 text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded font-semibold hover:bg-red-200 transition-colors flex-shrink-0"
                >
                  Clear all
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fallbackVideos!.map((src, i) => (
                  <div key={i} className="group rounded-lg border border-amber-200 overflow-hidden">
                    <div className="relative aspect-[9/16] bg-gray-900">
                      <video
                        src={src}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        preload="metadata"
                        playsInline
                        muted
                      />
                      <span className="absolute top-1 left-1 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-tight z-10">
                        Default
                      </span>
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <button
                          onClick={handleClearFallbacks}
                          disabled={uploading}
                          className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-200 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="p-2 text-xs text-gray-500 truncate">{src.split("/").pop()}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : videos.length === 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-400 text-sm">No videos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div key={video.name} className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="relative aspect-[9/16] bg-gray-900">
                    <video
                      src={video.url}
                      className="absolute inset-0 w-full h-full object-cover"
                      preload="metadata"
                      playsInline
                      muted
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-500 truncate mb-2">{video.name}</p>
                    <div className="flex gap-1.5">
                      <label className="flex-1 bg-amber-100 text-amber-700 py-1 rounded text-xs font-medium hover:bg-amber-200 transition-colors text-center cursor-pointer">
                        Replace
                        <input
                          type="file"
                          accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm,.m4v"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleReplace(video.name, file);
                            e.target.value = "";
                          }}
                          className="hidden"
                        />
                      </label>
                      <button
                        onClick={() => handleDelete(video.name)}
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
    </div>
  );
}
