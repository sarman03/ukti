"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import FadeUp from "@/components/FadeUp";
import { useSupabaseImages } from "@/lib/useSupabaseImages";

const FALLBACK_VIDEOS = [
  "/home/testimonials/Video-68-opt.mp4",
  "/home/testimonials/VIDEO-2026-02-17-12-40-09.mp4",
];

const FALLBACK_POSTERS = [
  "/home/testimonials/poster-1.jpg",
  "/home/testimonials/poster-2.jpg",
];

function TestimonialVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    void videoRef.current?.play();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startPlayback();
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gray-200 shadow-xl ${className ?? ""}`}
      onClick={!isPlaying ? startPlayback : undefined}
      onKeyDown={!isPlaying ? handleKeyDown : undefined}
      role={!isPlaying ? "button" : undefined}
      tabIndex={!isPlaying ? 0 : undefined}
      aria-label={!isPlaying ? "Play testimonial video" : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="h-full w-full object-cover"
        controls={isPlaying}
        playsInline
        preload="metadata"
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg">
            <svg
              className="h-8 w-8 text-[#5EA85B]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}

export default function TestimonialsSection() {
  const { images: supabaseVideos, cleared } = useSupabaseImages("testimonials");
  const videos = cleared ? [] : supabaseVideos.length > 0 ? supabaseVideos : FALLBACK_VIDEOS;
  const posters = supabaseVideos.length > 0 ? [] : FALLBACK_POSTERS;

  const [current, setCurrent] = useState(0);

  const prevIdx = current > 0 ? current - 1 : null;
  const nextIdx = current < videos.length - 1 ? current + 1 : null;

  return (
    <section
      id="testimonials"
      className="pt-20 pb-28 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #fffff5 0%, #fefce8 25%, #F2DA36 80%, #F2DA36 100%)",
      }}
    >
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-10 md:mb-16">
          Testimonials
        </h2>

        {videos.length === 0 ? null : (
          <>
            {/* Mobile — carousel */}
            <div className="md:hidden px-4">
              <TestimonialVideo
                key={current}
                src={videos[current]}
                poster={posters[current]}
                className="mx-auto aspect-[9/16] w-full max-w-sm"
              />
              {videos.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === current ? "bg-[#5EA85B]" : "bg-gray-400/60"
                      }`}
                      aria-label={`Video ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop — original layout with prev/next navigation */}
            <div className="hidden md:block relative mx-auto" style={{ maxWidth: 1200, height: 540 }}>

              {/* Left preview box — prev video thumbnail, or plain box if none */}
              <div
                className={`absolute rounded-2xl overflow-hidden ${prevIdx !== null ? "cursor-pointer" : ""}`}
                style={{ left: 0, top: 90, width: 360, height: 360, backgroundColor: "#9c9188", zIndex: 0 }}
                onClick={prevIdx !== null ? () => setCurrent(prevIdx) : undefined}
              >
                {prevIdx !== null && (
                  <>
                    <video
                      src={videos[prevIdx]}
                      poster={posters[prevIdx]}
                      className="w-full h-full object-cover opacity-70"
                      preload="metadata"
                      playsInline
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow">
                        <svg className="h-6 w-6 text-[#5EA85B]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Right preview box — next video thumbnail, or plain box if none */}
              <div
                className={`absolute rounded-2xl overflow-hidden ${nextIdx !== null ? "cursor-pointer" : ""}`}
                style={{ right: 0, top: 90, width: 360, height: 360, backgroundColor: "#9c9188", zIndex: 0 }}
                onClick={nextIdx !== null ? () => setCurrent(nextIdx) : undefined}
              >
                {nextIdx !== null && (
                  <>
                    <video
                      src={videos[nextIdx]}
                      poster={posters[nextIdx]}
                      className="w-full h-full object-cover opacity-70"
                      preload="metadata"
                      playsInline
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow">
                        <svg className="h-6 w-6 text-[#5EA85B]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Center active video */}
              <div
                className="absolute"
                style={{ left: "50%", transform: "translateX(-50%)", top: 0, width: 680, height: 540, zIndex: 10 }}
              >
                <TestimonialVideo
                  key={current}
                  src={videos[current]}
                  poster={posters[current]}
                  className="h-full w-full"
                />
              </div>

              {/* Prev / Next arrow buttons */}
              {videos.length > 1 && (
                <>
                  <button
                    onClick={() => prevIdx !== null && setCurrent(prevIdx)}
                    disabled={prevIdx === null}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous video"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12 4L6 10L12 16" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => nextIdx !== null && setCurrent(nextIdx)}
                    disabled={nextIdx === null}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next video"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M8 4L14 10L8 16" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </FadeUp>
    </section>
  );
}
