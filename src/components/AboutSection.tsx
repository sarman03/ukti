"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";
import { useSupabaseImages } from "@/lib/useSupabaseImages";

const stats = [
  { value: "6+", label: "Years of Experience", icon: "/about-us/6+.png" },
  { value: "50+", label: "Happy Little Learners", icon: "/about-us/50 +.png" },
  { value: "3hrs+", label: "Tactile Play", icon: "/about-us/3+.png" },
];

export default function AboutSection() {
  const { images } = useSupabaseImages("about");

  return (
    <section id="about" className="bg-white pt-20 pb-12 md:pb-20 px-4 md:px-8">
      <FadeUp>
      <div className="max-w-6xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-8 mb-10 md:mb-16">
          {/* Left column: image at top */}
          <div className="w-full aspect-[5/4] bg-gray-300 rounded-2xl overflow-hidden relative">
            {images[0] ? (
              <Image src={images[0]} alt="About Ukti" fill className="object-cover" sizes="33vw" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">Image Placeholder</span>
            )}
          </div>

          {/* Center text */}
          <div className="text-center flex flex-col items-center gap-6 pt-2">
              <h2 className="text-3xl md:text-5xl font-extrabold text-green-700">About Us</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Welcome to Ukti Early Years where we believe in fostering the brightest beginnings for our young
                learners. We aspire to create an environment where children not only learn but thrive, where every
                moment is an opportunity to sculpt curious minds and nurture boundless potential
              </p>
              <RippleButton href="#">
                Know More
              </RippleButton>
          </div>

          {/* Right column: large logo at top, image offset lower */}
          <div className="flex flex-col items-center">
            <Image
              src="/logo/Ukti _ Logo 1.png"
              alt="Ukti Early Years"
              width={280}
              height={294}
              className="w-40 md:w-60 h-auto"
            />
            <div className="w-full aspect-[5/4] bg-gray-300 rounded-2xl overflow-hidden relative mt-6 md:mt-12">
              {images[1] ? (
                <Image src={images[1]} alt="About Ukti" fill className="object-cover" sizes="33vw" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">Image Placeholder</span>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row items-center sm:grid sm:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-5 w-56 sm:w-auto sm:justify-center"
            >
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                <Image
                  src={stat.icon}
                  alt=""
                  width={80}
                  height={80}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-5xl font-extrabold text-green-700 leading-none">
                  {stat.value}
                </span>
                <span className="text-gray-700 text-sm font-medium mt-2">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
