"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import FadeUp from "@/components/FadeUp";

const testimonialVideoSrc = "/home/testimonials/Video-68.mp4";

function TestimonialVideo({ className }: { className?: string }) {
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
        src={testimonialVideoSrc}
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

        {/* Mobile */}
        <div className="md:hidden px-4">
          <TestimonialVideo className="mx-auto aspect-[4/5] w-full max-w-md" />
        </div>

        {/* Desktop */}
        <div className="hidden md:block relative mx-auto" style={{ maxWidth: 1200, height: 540 }}>
          <div
            className="absolute rounded-2xl"
            style={{
              left: 0,
              top: 90,
              width: 360,
              height: 360,
              backgroundColor: "#9c9188",
              zIndex: 0,
            }}
          />

          <div
            className="absolute rounded-2xl"
            style={{
              right: 0,
              top: 90,
              width: 360,
              height: 360,
              backgroundColor: "#9c9188",
              zIndex: 0,
            }}
          />

          <div
            className="absolute"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              width: 680,
              height: 540,
              zIndex: 10,
            }}
          >
            <TestimonialVideo className="h-full w-full" />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
