"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { useSupabaseImages } from "@/lib/useSupabaseImages";

const fallbackGallery = [
  "/gallery/PHOTO-2024-09-03-14-59-18.jpg",
  "/gallery/PHOTO-2024-10-28-13-26-25.jpg",
  "/gallery/PHOTO-2025-01-09-16-01-16.jpg",
  "/gallery/PHOTO-2025-02-18-16-20-16.jpg",
  "/gallery/PHOTO-2025-03-03-12-00-07.jpg",
  "/gallery/PHOTO-2025-03-11-19-28-14.jpg",
  "/gallery/PHOTO-2025-05-04-18-10-58.jpg",
  "/gallery/PHOTO-2025-08-22-19-14-09.jpg",
  "/gallery/PHOTO-2025-10-14-14-13-49 (1).jpg",
  "/gallery/PHOTO-2025-10-14-14-13-49.jpg",
  "/gallery/PHOTO-2025-11-17-13-48-59.jpg",
  "/gallery/PHOTO-2026-01-16-20-46-40.jpg",
];

export default function GallerySection() {
  const { images: adminImages } = useSupabaseImages("gallery");
  const images = adminImages.length > 0 ? adminImages : fallbackGallery;

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
