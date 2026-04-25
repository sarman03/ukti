"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import DayAtUktiSection from "@/components/DayAtUktiSection";
import EnquiryFormSection from "@/components/EnquiryFormSection";
import RippleButton from "@/components/RippleButton";
import { getStoragePublicUrl } from "@/lib/classroomPrograms";
import { useClassroomPageCards } from "@/lib/useClassroomPrograms";
import { useSupabaseImages, useSupabaseSlotImages } from "@/lib/useSupabaseImages";
import {
  CLASSROOM_CARD_FALLBACK_IMAGES,
  CLASSROOM_HERO_WEB_FALLBACK_IMAGES,
  CLASSROOM_HERO_MOBILE_FALLBACK_IMAGES,
} from "@/lib/imageDefaults";

function ProgramCard({
  title,
  subtitle,
  description,
  points,
  sections,
  imageLeft = false,
  imageUrl,
  imageHeight = "md:h-[400px]",
}: {
  title: string;
  subtitle: string;
  description: string;
  points?: string[];
  sections?: { heading: string; points: string[] }[];
  imageLeft?: boolean;
  imageUrl?: string;
  imageHeight?: string;
}) {
  return (
    <div className={`bg-[#F8D17C] rounded-[3rem] md:rounded-[150px] p-5 ${imageLeft ? "md:p-10" : "md:py-10 md:pl-24 md:pr-10"} flex flex-col md:flex-row gap-5 md:gap-6 items-center text-center md:text-left`}>
      {/* Image */}
      <div
        className={`w-full md:w-80 h-56 ${imageHeight} bg-gray-300 rounded-[2rem] md:rounded-[120px] flex-shrink-0 overflow-hidden relative flex items-center justify-center ${
          imageLeft ? "order-1" : "order-1 md:order-2"
        }`}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" sizes="320px" />
        ) : (
          <span className="text-gray-500 text-sm">Image Placeholder</span>
        )}
      </div>

      {/* Text content */}
      <div className={`flex-1 ${imageLeft ? "order-2" : "order-2 md:order-1"}`}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h3>
        <p className="text-base font-semibold text-gray-700 mt-1">{subtitle}</p>
        <p className="text-base text-gray-800 leading-relaxed mt-3">
          {description}
        </p>

        {points && (
          <ul className="mt-3 space-y-1 inline-block md:block text-left">
            {points.map((point) => (
              <li key={point} className="text-base text-gray-800 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
                {point}
              </li>
            ))}
          </ul>
        )}

        {sections &&
          sections.map((sec) => (
            <div key={sec.heading} className="mt-4">
              <p className="font-bold text-base text-gray-900">{sec.heading}</p>
              <ul className="mt-1 space-y-1 inline-block md:block text-left">
                {sec.points.map((point) => (
                  <li key={point} className="text-base text-gray-800 flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        <div className="mt-5">
          <RippleButton href="#contact" className="px-14 py-3">
            Enroll Now
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

function HeroCarousel() {
  const {
    images: webAdmin,
    allImages: webAll,
    cleared: webCleared,
    removedFallbacks: webRemovedFallbacks,
  } = useSupabaseImages("classroom-hero-web", CLASSROOM_HERO_WEB_FALLBACK_IMAGES.length, CLASSROOM_HERO_WEB_FALLBACK_IMAGES);
  const {
    images: mobileAdmin,
    allImages: mobileAll,
    cleared: mobileCleared,
    removedFallbacks: mobileRemovedFallbacks,
  } = useSupabaseImages("classroom-hero-mobile", CLASSROOM_HERO_MOBILE_FALLBACK_IMAGES.length, CLASSROOM_HERO_MOBILE_FALLBACK_IMAGES);

  const webFallbacks = CLASSROOM_HERO_WEB_FALLBACK_IMAGES.filter((_, i) => !webRemovedFallbacks[i]);
  const mobileFallbacks = CLASSROOM_HERO_MOBILE_FALLBACK_IMAGES.filter((_, i) => !mobileRemovedFallbacks[i]);
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
          <Image src={url} alt={`Classroom hero ${index + 1}`} fill className="object-cover" sizes="100vw" priority={index === 0} />
        </div>
      )) : <div className="absolute inset-0 hidden md:block bg-gray-400" />}

      {/* Mobile images (below md) */}
      {mobileImages.length > 0 ? mobileImages.map((url, index) => (
        <div
          key={`mobile-${url}`}
          className={`absolute inset-0 block md:hidden transition-opacity duration-[2000ms] ease-in-out ${
            index === mobileIdx ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={url} alt={`Classroom hero ${index + 1}`} fill className="object-cover" sizes="100vw" priority={index === 0} />
        </div>
      )) : <div className="absolute inset-0 block md:hidden bg-gray-400" />}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Decorative puzzle pieces - left side (desktop only) */}
      <div className="hidden md:flex flex-col absolute bottom-0 -left-6 lg:-left-4 z-10 pointer-events-none">
        <Image src="/classroom/hero-assets/ukti classes page@3x.png" alt="" width={140} height={140} className="w-28 lg:w-36 h-auto" style={{ transform: "rotate(-8deg)" }} />
        <Image src="/classroom/hero-assets/Asset 3@3x.png" alt="" width={110} height={110} className="w-20 lg:w-24 h-auto -mt-5" style={{ transform: "rotate(6deg)" }} />
        <Image src="/classroom/hero-assets/Asset 4@3x.png" alt="" width={110} height={110} className="w-20 lg:w-24 h-auto -mt-5" style={{ transform: "rotate(-4deg)" }} />
        <Image src="/classroom/hero-assets/Asset 2@3x.png" alt="" width={140} height={140} className="w-28 lg:w-36 h-auto -mt-4" style={{ transform: "rotate(5deg)" }} />
      </div>

      {/* Decorative puzzle pieces - right side (desktop only) */}
      <div className="hidden md:flex flex-col absolute top-20 -right-6 lg:-right-4 z-10 pointer-events-none items-end">
        <Image src="/classroom/hero-assets/ukti classes page@3x.png" alt="" width={140} height={140} className="w-28 lg:w-36 h-auto" style={{ transform: "rotate(8deg)" }} />
        <Image src="/classroom/hero-assets/Asset 3@3x.png" alt="" width={110} height={110} className="w-20 lg:w-24 h-auto -mt-5" style={{ transform: "rotate(-6deg)" }} />
        <Image src="/classroom/hero-assets/Asset 4@3x.png" alt="" width={110} height={110} className="w-20 lg:w-24 h-auto -mt-5" style={{ transform: "rotate(4deg)" }} />
        <Image src="/classroom/hero-assets/Asset 2@3x.png" alt="" width={140} height={140} className="w-28 lg:w-36 h-auto -mt-4" style={{ transform: "rotate(-5deg)" }} />
      </div>

      {/* Text content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6">
          <span className="text-white">Learn</span><br />
          <span className="text-white">Express</span><br />
          <span className="text-white">Grow</span>
        </h1>
        <RippleButton href="#contact" className="px-8 py-3">
          Book a tour
        </RippleButton>
      </div>

      {/* Prev/Next arrows */}
      {maxLength > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10" aria-label="Previous slide">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10" aria-label="Next slide">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {maxLength > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: maxLength }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function ClassroomPage() {
  const { cards } = useClassroomPageCards();
  const { images: cardImages, removed: removedCardSlots } = useSupabaseSlotImages("classroom-cards", 5);
  const preschoolPrograms = cards.filter((card) => card.tab === "preschool");
  const afterschoolPrograms = cards.filter((card) => card.tab === "afterschool");
  const resolveCardImage = (cardId: string, explicitPath?: string) => {
    const card = cards.find((item) => item.id === cardId);
    if (card?.imageRemoved) return "";
    const adminImage = getStoragePublicUrl(explicitPath);
    if (adminImage) return adminImage;

    const index = cards.findIndex((card) => card.id === cardId);
    if (index === -1) return "";
    return removedCardSlots[index]
      ? cardImages[index]
      : cardImages[index] || CLASSROOM_CARD_FALLBACK_IMAGES[index];
  };

  return (
    <main>
      <Navbar />

      <HeroCarousel />

      {/* Pre School Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-10 md:mb-14">
              Pre School
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-8 md:gap-10">
            {preschoolPrograms.map((program, i) => (
              <FadeUp key={program.title} delay={i * 0.15}>
                <ProgramCard
                  {...program}
                  imageLeft
                  imageUrl={resolveCardImage(program.id, program.imagePath)}
                  imageHeight={program.imageHeight === "tall" ? "md:h-[600px]" : "md:h-[400px]"}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* After School Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#F6892A] mb-10 md:mb-14">
              After school
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-8 md:gap-10">
            {afterschoolPrograms.map((program, i) => (
              <FadeUp key={program.title} delay={i * 0.15}>
                <ProgramCard
                  {...program}
                  imageUrl={resolveCardImage(program.id, program.imagePath)}
                  imageHeight={program.imageHeight === "tall" ? "md:h-[600px]" : "md:h-[400px]"}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <DayAtUktiSection />

      <div className="-mt-16 md:-mt-32">
        <EnquiryFormSection />
      </div>

      <Footer />
    </main>
  );
}
