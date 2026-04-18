"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import DayAtUktiSection from "@/components/DayAtUktiSection";
import EnquiryFormSection from "@/components/EnquiryFormSection";
import RippleButton from "@/components/RippleButton";
import { useSupabaseSlotImages } from "@/lib/useSupabaseImages";

const preschoolPrograms = [
  {
    title: "Toddlers",
    subtitle: "A safe start to explore the world",
    description:
      "For children aged 15-23 months, a nurturing environment focused on sensory discovery, movement, and emotional comfort.",
    points: [
      "Weekly Thematic Experiences",
      "Circle Time",
      "Storytelling Adventures",
      "Sensory Play and Messy Play",
      "Multimedia Art",
      "Cooking Experiences",
      "Practical Life and Montessori Exercises",
      "Gross Motor Sessions",
    ],
  },
  {
    title: "Pre Nursery",
    subtitle: "Nurture curiosity and early growth",
    description:
      "A structured, play-based program where children explore themes through hands-on learning, building early literacy, numeracy, creativity, independence, and strong social-emotional skills.",
    points: [
      "Theme-based learning every week",
      "Circle time for bonding & communication",
      "Storytelling to build imagination",
      "Early language & math concepts",
      "Montessori practical life skills",
    ],
  },
  {
    title: "Nursery",
    subtitle: "Build strong foundations for growth",
    description:
      "For children aged 3-4 years, a gentle introduction to learning through play, exploration, and early social skills.",
    points: [
      "Thematic Learning & Experiential Exploration",
      "Circle Time & Storytelling",
      "Creative Arts & STEAM Learning",
      "Early Literacy & Pre-Writing Skills",
      "Early Math & Logical Thinking",
      "Practical Life Skills & Montessori Exercises",
      "Gross Motor Development & Outdoor Play",
    ],
  },
];

const afterschoolPrograms = [
  {
    title: "Storytelling Program",
    subtitle: "Bringing stories to life through imagination",
    description:
      'An immersive program where children explore a "Story of the Day" through engaging, expressive, and play-focused experiences.',
    points: [
      "Music, movement & rhythm",
      "Theatre games & role play",
      "Expressive storytelling sessions",
      "Art & sensory-based experiences",
      "Gross motor play & movement",
    ],
  },
  {
    title: "Language & Math Program",
    subtitle: "Build strong literacy and numeracy foundations",
    description:
      "A structured program based on Jolly Phonics, designed to develop language and math skills through fun, hands-on learning.",
    sections: [
      {
        heading: "Language Development",
        points: [
          "One letter introduced per session",
          "Sound-symbol recognition",
          "Letter formation practice",
          "Beginning sound identification",
          "Reading 2-3 letter words",
        ],
      },
      {
        heading: "Pre-Math Skills",
        points: [
          "Numbers, symbols & recognition",
          "Counting & number sequencing",
          "Sorting, matching & patterns",
          "Intro to graphs through play",
          "Shapes recognition",
          "Number writing practice",
        ],
      },
    ],
  },
];

const preschoolCardImages: Record<string, string> = {
  Toddlers: "/home/classroom/toddler.jpg",
  "Pre Nursery": "/home/classroom/pre%20nursery.jpg",
  Nursery: "/home/classroom/nursery.jpg",
};

function ProgramCard({
  title,
  subtitle,
  description,
  points,
  sections,
  imageLeft = false,
  imageUrl,
}: {
  title: string;
  subtitle: string;
  description: string;
  points?: string[];
  sections?: { heading: string; points: string[] }[];
  imageLeft?: boolean;
  imageUrl?: string;
}) {
  return (
    <div className={`bg-[#F8D17C] rounded-[3rem] md:rounded-[150px] p-5 ${imageLeft ? "md:p-10" : "md:py-10 md:pl-24 md:pr-10"} flex flex-col md:flex-row gap-5 md:gap-6 items-center text-center md:text-left`}>
      {/* Image */}
      <div
        className={`w-full md:w-80 h-44 md:h-72 bg-gray-300 rounded-[2rem] md:rounded-[120px] flex-shrink-0 overflow-hidden relative flex items-center justify-center ${
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
  const { images: adminImages } = useSupabaseSlotImages("classroom-hero", 8);
  const fallbackImages = [
    "/classroom/hero/AKN_2671.JPG",
    "/classroom/hero/AKN_9699.JPG",
    "/classroom/hero/AKN_9703.JPG",
    "/classroom/hero/AKN_9728.JPG",
    "/classroom/hero/AKN_9732.JPG",
    "/classroom/hero/AKN_9744.JPG",
  ];
  const images = adminImages.filter(Boolean).length > 0 ? adminImages.filter(Boolean) : fallbackImages;
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [images.length, nextSlide]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Images with fade transition */}
      {images.length > 0 ? (
        images.map((url, index) => (
          <div
            key={url}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={url}
              alt={`Classroom hero ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-gray-400" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Decorative icons - top right (desktop only) */}
      <div className="hidden md:flex flex-col absolute top-24 right-0 lg:right-2 z-10 pointer-events-none">
        <Image src="/classroom/Layer 1.png" alt="" width={120} height={120} className="w-24 lg:w-28 h-auto" />
        <Image src="/classroom/Layer 3.png" alt="" width={120} height={120} className="w-24 lg:w-28 h-auto -mt-6" />
        <Image src="/classroom/icon 16 1.png" alt="" width={120} height={120} className="w-24 lg:w-28 h-auto -mt-6" />
      </div>

      {/* Decorative icons - bottom left (desktop only) */}
      <div className="hidden md:flex flex-col absolute bottom-16 left-0 lg:left-2 z-10 pointer-events-none">
        <Image src="/classroom/Layer 1.png" alt="" width={120} height={120} className="w-24 lg:w-28 h-auto" />
        <Image src="/classroom/Layer 3.png" alt="" width={120} height={120} className="w-24 lg:w-28 h-auto -mt-6" />
        <Image src="/classroom/icon 16 1.png" alt="" width={120} height={120} className="w-24 lg:w-28 h-auto -mt-6" />
      </div>

      {/* Text content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Love, learning &amp;<br />
          Laughter Every Day
        </h1>
        <RippleButton href="#contact" className="px-8 py-3">
          Book a tour
        </RippleButton>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
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
  const { images: cardImages } = useSupabaseSlotImages("classroom-cards", 5);

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
                  imageUrl={cardImages[i] || preschoolCardImages[program.title]}
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
                <ProgramCard {...program} imageUrl={cardImages[preschoolPrograms.length + i]} />
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
