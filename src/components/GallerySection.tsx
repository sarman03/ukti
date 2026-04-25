"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { useSupabaseImages } from "@/lib/useSupabaseImages";
import { GALLERY_FALLBACK_IMAGES } from "@/lib/imageDefaults";

export default function GallerySection() {
  const { images: adminImages, allImages, cleared, removedFallbacks } = useSupabaseImages(
    "gallery",
    GALLERY_FALLBACK_IMAGES.length,
    GALLERY_FALLBACK_IMAGES
  );
  const galleryFallbacks = GALLERY_FALLBACK_IMAGES.filter((_, i) => !removedFallbacks[i]);
  const images = cleared ? [] : (allImages.length > 0 ? allImages : [...adminImages, ...galleryFallbacks]);

  // Split images into two rows, duplicate for seamless loop
  const half = Math.ceil(images.length / 2);
  const row1 = images.slice(0, half);
  const row2 = images.slice(half);

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
              <Image src={url} alt="Gallery photo" fill className="object-cover" sizes="224px" />
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
              <Image src={url} alt="Gallery photo" fill className="object-cover" sizes="224px" />
            </div>
          ))}
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
