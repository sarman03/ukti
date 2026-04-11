"use client";

import { useState } from "react";

type Tab = "preschool" | "afterschool";

const programs: Record<Tab, { title: string; age: string; description: string }[]> = {
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
      title: "Art & Craft",
      age: "Age: 4 – 6 Years",
      description:
        "Creative exploration through various art forms, building fine motor skills, imagination, and self-expression.",
    },
    {
      title: "Music & Movement",
      age: "Age: 4 – 6 Years",
      description:
        "Exploring rhythm, melody, and movement to develop coordination, confidence, and musical appreciation.",
    },
    {
      title: "Story Time Plus",
      age: "Age: 4 – 6 Years",
      description:
        "Engaging storytelling and reading activities that build language skills and a lifelong love for books.",
    },
  ],
};

export default function ClassroomSection() {
  const [activeTab, setActiveTab] = useState<Tab>("preschool");
  const activePrograms = programs[activeTab];

  return (
    <section id="classes" className="py-20 px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Our Classroom
        </h2>

        {/* Tab toggle */}
        <div className="flex justify-center gap-3 mb-12">
          {(["preschool", "afterschool"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-7 py-2.5 rounded-full font-semibold text-sm transition-colors ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-sm"
                  : "border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-100"
              }`}
            >
              {tab === "preschool" ? "Pre School" : "After School"}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {activePrograms.map((program) => (
            <div
              key={program.title}
              className="rounded-2xl overflow-hidden shadow-md bg-white"
            >
              {/* Image placeholder */}
              <div className="h-52 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image Placeholder</span>
              </div>
              {/* Card content */}
              <div className="bg-amber-400 p-5">
                <h3 className="text-lg font-extrabold text-gray-900">
                  {program.title}
                </h3>
                <p className="text-xs text-gray-700 font-medium mt-0.5 mb-2">
                  {program.age}
                </p>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded-full transition-colors text-sm">
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
}
