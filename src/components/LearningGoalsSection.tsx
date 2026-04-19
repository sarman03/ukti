"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { useSupabaseSlotImages } from "@/lib/useSupabaseImages";

const goals = [
  {
    title: "Holistic Development",
    description:
      "Nurturing cognitive, social, emotional, and physical growth to support well-rounded development in every child.",
    icon: "/learning-goals/1.png",
  },
  {
    title: "Critical Thinking & Problem Solving",
    description:
      "Encouraging curiosity and independent thinking through hands-on, inquiry-based learning experiences.",
    icon: "/learning-goals/2.png",
  },
  {
    title: "Creativity & Self-Expression",
    description:
      "Fostering imagination through art, music, storytelling, and open-ended experiences.",
    icon: "/learning-goals/3.png",
  },
  {
    title: "Language & Communication Skills",
    description:
      "Building strong foundations in listening, speaking, and early literacy through rich, engaging interactions.",
    icon: "/learning-goals/4.png",
  },
  {
    title: "Social & Emotional Development",
    description:
      "Helping children develop empathy, confidence, and positive relationships in a supportive environment.",
    icon: "/learning-goals/1.png",
  },
  {
    title: "Environmental & Cultural Awareness",
    description:
      "Encouraging respect for nature and appreciation of diverse cultures through meaningful, real-world experiences.",
    icon: "/learning-goals/2.png",
  },
];

export default function LearningGoalsSection() {
  const { images: adminImages } = useSupabaseSlotImages("learning-goals", 2);
  const fallbackImages = [
    "/learning-goals/PHOTO-2025-05-09-14-27-34.jpg",
    "/learning-goals/PHOTO-2024-10-28-13-26-25.jpg",
  ];
  const images = [
    adminImages[0] || fallbackImages[0],
    adminImages[1] || fallbackImages[1],
  ];

  return (
    <section id="learning" className="py-20 bg-white">
      <FadeUp>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-4 md:mb-12">
            Learning goals
          </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 items-center">
          {/* Left: kite-tilted main image with smaller overlap image at top-right */}
          <div className="flex justify-center mt-10 md:mt-0">
            <div className="relative w-48 h-64 md:w-[22rem] md:h-[520px]">
              {/* Main image — heavily tilted like a kite */}
              <div
                className="absolute inset-0 bg-gray-300 rounded-2xl shadow-lg overflow-hidden animate-swing-slow"
              >
                {images[0] ? (
                  <Image src={images[0]} alt="Learning goals" fill className="object-cover" sizes="400px" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">Image Placeholder</span>
                )}
              </div>

              {/* Smaller image overlapping the top-right corner */}
              <div
                className="absolute -top-12 -right-6 w-28 h-28 md:-top-20 md:-right-10 md:w-48 md:h-48 bg-gray-400 rounded-xl shadow-lg overflow-hidden z-10 animate-swing-slow-reverse"
              >
                {images[1] ? (
                  <Image src={images[1]} alt="Learning" fill className="object-cover" sizes="(max-width: 768px) 112px, 192px" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs">Image</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: goal items */}
          <div className="flex flex-col gap-4">
            {goals.map((goal) => (
              <div
                key={goal.title}
                className="flex gap-4 items-center bg-white border border-[#F2DA36] rounded-2xl px-5 py-5 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center bg-[#F2DA36]/50">
                  <Image
                    src={goal.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-extrabold text-base leading-tight">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-snug mt-1">
                    {goal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
