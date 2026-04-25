"use client";

import { useState } from "react";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";
import { getStoragePublicUrl } from "@/lib/classroomPrograms";
import { useHomeClassroomCards } from "@/lib/useClassroomPrograms";
import { useSupabaseSlotImages } from "@/lib/useSupabaseImages";
import { CLASSROOM_CARD_FALLBACK_IMAGES } from "@/lib/imageDefaults";

type Tab = "preschool" | "afterschool";

export default function ClassroomSection() {
  const [activeTab, setActiveTab] = useState<Tab>("preschool");
  const { cards } = useHomeClassroomCards();
  const { images, removed } = useSupabaseSlotImages("classroom", 5);
  const activePrograms = cards.filter((card) => card.tab === activeTab);

  return (
    <section id="classes" className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <FadeUp>
      <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-6 md:mb-8">
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
                  ? "bg-[#F6892A] text-white shadow-sm"
                  : "border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-100"
              }`}
              style={{ "--ripple-color": activeTab === tab ? "rgba(246, 137, 42, 0.4)" : "rgba(31, 41, 55, 0.2)" } as React.CSSProperties}
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
              ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {activePrograms.map((program) => {
            const slotIndex = cards.findIndex((card) => card.id === program.id);
            const slotImage = images[slotIndex];
            const slotRemoved = removed[slotIndex];
            const fallback = CLASSROOM_CARD_FALLBACK_IMAGES[slotIndex];
            const imageUrl =
              program.imageRemoved
                ? ""
                : getStoragePublicUrl(program.imagePath) ||
                  (slotRemoved ? slotImage : slotImage || fallback);
            return (
            <div
              key={program.title}
              className="group rounded-2xl overflow-hidden shadow-md bg-white flex h-full flex-col"
            >
              {/* Image */}
              <div className="h-52 bg-gray-300 relative">
                {imageUrl ? (
                  <Image src={imageUrl} alt={program.title} fill className="object-cover" sizes="33vw" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">Image Placeholder</span>
                )}
              </div>
              {/* Card content — white by default, amber on card hover */}
              <div className="bg-white group-hover:bg-[#F2DA36] transition-colors p-5 flex-1">
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
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <RippleButton href="/classroom" className="px-10">
            Explore More
          </RippleButton>
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
