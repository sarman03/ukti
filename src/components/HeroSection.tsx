"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSupabaseImages } from "@/lib/useSupabaseImages";
import { HOME_HERO_WEB_FALLBACK_IMAGES, HOME_HERO_MOBILE_FALLBACK_IMAGES } from "@/lib/imageDefaults";

export default function HeroSection() {
  const {
    images: webAdmin,
    allImages: webAll,
    cleared: webCleared,
    removedFallbacks: webRemovedFallbacks,
  } = useSupabaseImages("hero-web", HOME_HERO_WEB_FALLBACK_IMAGES.length, HOME_HERO_WEB_FALLBACK_IMAGES);
  const {
    images: mobileAdmin,
    allImages: mobileAll,
    cleared: mobileCleared,
    removedFallbacks: mobileRemovedFallbacks,
  } = useSupabaseImages("hero-mobile", HOME_HERO_MOBILE_FALLBACK_IMAGES.length, HOME_HERO_MOBILE_FALLBACK_IMAGES);

  const webFallbacks = HOME_HERO_WEB_FALLBACK_IMAGES.filter((_, i) => !webRemovedFallbacks[i]);
  const mobileFallbacks = HOME_HERO_MOBILE_FALLBACK_IMAGES.filter((_, i) => !mobileRemovedFallbacks[i]);
  const webImages = webCleared ? [] : (webAll.length > 0 ? webAll : [...webAdmin, ...webFallbacks]);
  const mobileImages = mobileCleared ? [] : (mobileAll.length > 0 ? mobileAll : [...mobileAdmin, ...mobileFallbacks]);

  const maxLength = Math.max(webImages.length, mobileImages.length, 1);
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % maxLength);
  }, [maxLength]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + maxLength) % maxLength);
  }, [maxLength]);

  useEffect(() => {
    if (maxLength <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [maxLength, nextSlide]);

  const webIdx = webImages.length > 0 ? current % webImages.length : -1;
  const mobileIdx = mobileImages.length > 0 ? current % mobileImages.length : -1;

  if (webImages.length === 0 && mobileImages.length === 0) {
    return <section className="relative w-full h-screen bg-gray-200" />;
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Desktop images (md and up) */}
      {webImages.length > 0 ? webImages.map((url, index) => (
        <div
          key={`web-${url}`}
          className={`absolute inset-0 hidden md:block transition-opacity duration-[2000ms] ease-in-out ${
            index === webIdx ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={url} alt={`Hero image ${index + 1}`} fill className="object-cover" sizes="100vw" priority={index === 0} />
        </div>
      )) : <div className="absolute inset-0 hidden md:block bg-gray-200" />}

      {/* Mobile images (below md) */}
      {mobileImages.length > 0 ? mobileImages.map((url, index) => (
        <div
          key={`mobile-${url}`}
          className={`absolute inset-0 block md:hidden transition-opacity duration-[2000ms] ease-in-out ${
            index === mobileIdx ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={url} alt={`Hero image ${index + 1}`} fill className="object-cover" sizes="100vw" priority={index === 0} />
        </div>
      )) : <div className="absolute inset-0 block md:hidden bg-gray-200" />}

      {maxLength > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Mobile indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 md:hidden">
            {mobileImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === mobileIdx ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Desktop indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex gap-2 z-10">
            {webImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === webIdx ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
