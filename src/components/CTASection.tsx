"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";

export default function CTASection() {
  const images = [
    "/home/last%20section/PHOTO-2024-09-03-14-59-18.jpg",
    "/home/last%20section/PHOTO-2025-05-09-14-35-38.jpg",
    "/home/last%20section/PHOTO-2024-10-12-18-49-50.jpg",
  ];

  return (
    <section className="py-12 md:py-0 md:min-h-screen px-4 md:px-8 bg-white overflow-hidden flex items-center justify-center">
      <FadeUp className="w-full">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-10">

        {/* Left images — hidden on mobile, stacked on desktop */}
        <div className="hidden md:flex flex-col items-center gap-14">
          <div className="w-72 h-56 bg-gray-300 rounded-2xl shadow-md animate-swing-slow overflow-hidden relative">
            {images[0] ? (
              <Image src={images[0]} alt="CTA" fill className="object-cover" sizes="288px" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">Image</span>
            )}
          </div>
          <div className="w-64 h-52 bg-gray-300 rounded-2xl shadow-md animate-swing-slow-reverse overflow-hidden relative">
            {images[1] ? (
              <Image src={images[1]} alt="CTA" fill className="object-cover" sizes="256px" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">Image</span>
            )}
          </div>
        </div>

        {/* Center tagline */}
        <div className="flex flex-col items-center text-center gap-6 md:gap-8">
          <div className="leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            <p className="font-extrabold text-[#F6892A]">Learn</p>
            <p className="font-extrabold text-[#5EA85B]">Express</p>
            <p className="font-extrabold text-[#0FB3BC]">Grow</p>
            <p className="font-extrabold text-gray-900 text-[length:clamp(1.1rem,2.5vw,1.9rem)] mt-2">With Ukti Early Years</p>
          </div>
          <RippleButton>
            Enroll Your Child
          </RippleButton>
        </div>

        {/* Right image — hidden on mobile */}
        <div className="hidden md:flex flex-col items-center gap-5">
          <div className="w-72 h-72 bg-gray-300 rounded-2xl shadow-md animate-swing-slow overflow-hidden relative">
            {images[2] ? (
              <Image src={images[2]} alt="CTA" fill className="object-cover" sizes="288px" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">Image</span>
            )}
          </div>
        </div>

        {/* Mobile: show images in a row */}
        <div className="md:hidden flex justify-center gap-4">
          <div className="w-40 h-32 bg-gray-300 rounded-2xl shadow-md overflow-hidden relative">
            {images[0] ? (
              <Image src={images[0]} alt="CTA" fill className="object-cover" sizes="160px" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">Image</span>
            )}
          </div>
          <div className="w-40 h-32 bg-gray-300 rounded-2xl shadow-md overflow-hidden relative">
            {images[2] ? (
              <Image src={images[2]} alt="CTA" fill className="object-cover" sizes="160px" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">Image</span>
            )}
          </div>
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
