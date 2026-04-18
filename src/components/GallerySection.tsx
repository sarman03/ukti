"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { useSupabaseImages } from "@/lib/useSupabaseImages";

export default function GallerySection() {
  const { images } = useSupabaseImages("gallery");

  // Split images into two rows, duplicate for seamless loop
  const half = Math.ceil(images.length / 2);
  const row1 = images.length > 0 ? images.slice(0, half) : Array(6).fill(null);
  const row2 = images.length > 0 ? images.slice(half) : Array(6).fill(null);

  return (
    <section id="gallery" className="py-20 bg-white overflow-hidden">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#F6892A] mb-8 md:mb-12">
          Gallery
        </h2>

      {/* Row 1 — left to right */}
      <div className="overflow-hidden mb-4">
        <div className="flex gap-4 w-max animate-marquee-ltr">
          {[...row1, ...row1].map((url, i) => (
            <div
              key={i}
              className="w-40 h-40 md:w-56 md:h-56 bg-gray-300 rounded-2xl flex-shrink-0 relative overflow-hidden"
            >
              {url ? (
                <Image src={url} alt={`Gallery photo`} fill className="object-cover" sizes="224px" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs font-medium">Photo {(i % 6) + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="overflow-hidden">
        <div className="flex gap-4 w-max animate-marquee-rtl">
          {[...row2, ...row2].map((url, i) => (
            <div
              key={i}
              className="w-40 h-40 md:w-56 md:h-56 bg-gray-300 rounded-2xl flex-shrink-0 relative overflow-hidden"
            >
              {url ? (
                <Image src={url} alt={`Gallery photo`} fill className="object-cover" sizes="224px" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs font-medium">Photo {(i % 6) + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
