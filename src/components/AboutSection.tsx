"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";
import { useSupabaseSlotImages } from "@/lib/useSupabaseImages";

const stats = [
  { value: 6, suffix: "+", label: "Years of Experience", icon: "/about-us/6+.png" },
  { value: 50, suffix: "+", label: "Happy Little Learners", icon: "/about-us/50 +.png" },
  { value: 3, suffix: "hrs+", label: "Tactile Play", icon: "/about-us/3+.png" },
];

function CountUp({ end, suffix = "", duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const { images: adminImages } = useSupabaseSlotImages("home-about", 2);
  const fallbackImages = ["/home/about/1.jpg", "/home/about/2.jpg"];
  const images = [
    adminImages[0] || fallbackImages[0],
    adminImages[1] || fallbackImages[1],
  ];

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
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#5EA85B]">About Us</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                At Ukti Early Years, a thoughtfully designed micro preschool, where we offer a warm, intimate environment where every child receives personalised attention and care.
                <br /><br />
                Through hands-on exploration, play-based learning, and meaningful interactions, we nurture confident, expressive, and independent learners.
                <br /><br />
                More than just a preschool, Ukti is a home for learning—a close-knit community where children feel safe, valued, and inspired every day.
              </p>
              <RippleButton href="#">
                Know More
              </RippleButton>
          </div>

          {/* Right column: large logo at top, image offset lower */}
          <div className="flex flex-col items-center">
            <Image
              src="/logo/Ukti _ Logo.png"
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
                <span className="text-3xl md:text-5xl font-extrabold text-[#5EA85B] leading-none">
                  <CountUp end={stat.value} suffix={stat.suffix} />
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
