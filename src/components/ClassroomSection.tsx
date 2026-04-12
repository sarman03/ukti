"use client";

import { useState } from "react";
import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";

type Tab = "preschool" | "afterschool";

type Program = { title: string; age?: string; description: string };

const programs: Record<Tab, Program[]> = {
  preschool: [
    {
      title: "Toddlers",
      age: "Age: 15 – 23 Months",
      description:
        "A warm, nurturing space where little ones explore the world through play, movement, and sensory experiences.",
    },
    {
      title: "Pre Nursery",
      age: "Age: 2 – 3 Years",
      description:
        "A gentle introduction to learning through play, helping children build social skills, sensory awareness, and early motor development.",
    },
    {
      title: "Nursery",
      age: "Age: 3 – 4 Years",
      description:
        "A balanced program that nurtures curiosity, creativity, and early academic foundations through hands-on learning.",
    },
  ],
  afterschool: [
    {
      title: "Storytelling Program",
      description:
        "An immersive storytelling experience where children learn through imagination, expression, and play.",
    },
    {
      title: "Language & Math Program",
      description:
        "A structured yet fun program focused on building strong literacy and numeracy foundations.",
    },
  ],
};

export default function ClassroomSection() {
  const [activeTab, setActiveTab] = useState<Tab>("preschool");
  const activePrograms = programs[activeTab];

  return (
    <section id="classes" className="py-20 px-8 bg-gray-50">
      <FadeUp>
      <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-8">
            Our Classroom
          </h2>

        {/* Tab toggle */}
        <div className="flex justify-center gap-3 mb-12">
          {(["preschool", "afterschool"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`ripple-btn px-7 py-2.5 rounded-full font-semibold text-sm transition-colors ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-sm"
                  : "border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-100"
              }`}
              style={{ "--ripple-color": activeTab === tab ? "rgba(249, 115, 22, 0.4)" : "rgba(31, 41, 55, 0.2)" } as React.CSSProperties}
            >
              <span className="ripple-extra absolute inset-0 rounded-full pointer-events-none" />
              <span className="relative z-10">{tab === "preschool" ? "Pre School" : "After School"}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div
          className={`grid gap-6 mb-12 ${
            activePrograms.length === 2
              ? "grid-cols-2 max-w-3xl mx-auto"
              : "grid-cols-3"
          }`}
        >
          {activePrograms.map((program) => (
            <div
              key={program.title}
              className="group rounded-2xl overflow-hidden shadow-md bg-white"
            >
              {/* Image placeholder */}
              <div className="h-52 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image Placeholder</span>
              </div>
              {/* Card content — white by default, amber on card hover */}
              <div className="bg-white group-hover:bg-amber-400 transition-colors p-5">
                <h3 className="text-lg font-extrabold text-gray-900">
                  {program.title}
                </h3>
                {program.age && (
                  <p className="text-xs text-gray-700 font-medium mt-0.5 mb-2">
                    {program.age}
                  </p>
                )}
                <p className="text-sm text-gray-800 leading-relaxed mt-2">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <RippleButton className="px-10">
            Explore More
          </RippleButton>
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
