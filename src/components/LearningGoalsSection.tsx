"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { useSupabaseImages } from "@/lib/useSupabaseImages";

const goals = [
  {
    title: "Holistic Development",
    description:
      "Children are supported to speak, share ideas, and express themselves freely without hesitation.",
    icon: "/learning-goals/1.png",
  },
  {
    title: "Environmental Awareness",
    description:
      "We help children connect with nature and learn simple habits of care and responsibility towards the environment.",
    icon: "/learning-goals/2.png",
  },
  {
    title: "Cultural Awareness",
    description:
      "We introduce children to different cultures, traditions, and perspectives, building openness and respect.",
    icon: "/learning-goals/3.png",
  },
  {
    title: "Imagination & Curiosity",
    description:
      "We spark a love for learning by encouraging exploration, open questions, and creative thinking every day.",
    icon: "/learning-goals/4.png",
  },
];

export default function LearningGoalsSection() {
  const { images } = useSupabaseImages("learning-goals");

  return (
    <section id="learning" className="py-20 bg-white">
      <FadeUp>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-green-700 mb-4 md:mb-12">
            Learning goals
          </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 items-center">
          {/* Left: kite-tilted main image with smaller overlap image at top-right */}
          <div className="flex justify-center mt-10 md:mt-0">
            <div className="relative w-48 h-84 md:w-full md:max-w-sm md:aspect-[4/5]">
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
                className="absolute -top-8 -right-4 w-20 h-16 md:-top-14 md:-right-6 md:w-32 md:h-24 bg-gray-400 rounded-xl shadow-lg overflow-hidden z-10 animate-swing-slow-reverse"
              >
                {images[1] ? (
                  <Image src={images[1]} alt="Learning" fill className="object-cover" sizes="128px" />
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
                className="flex gap-4 items-center bg-white border border-amber-300 rounded-2xl px-5 py-5 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center bg-amber-200">
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
