"use client";

import Image from "next/image";
import FadeUp from "@/components/FadeUp";

export default function DayAtUktiSection() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-10 md:mb-14 leading-tight">
            A day at
            <br />
            Ukti Early Years
          </h2>
        </FadeUp>

        <FadeUp>
          <div className="relative w-full aspect-[7/6] overflow-hidden">
            <Image
              src="/classroom/snake.png"
              alt="A day at Ukti Early Years"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Interactive version — kept for future use, currently replaced by the static
// image above. To re-enable, rename to `DayAtUktiSection` and export.
// ---------------------------------------------------------------------------

const steps = [
  { id: 1, text: "Warm Welcome & Setting In", top: "2%", left: "5%", color: "shadow-[0_0_15px_rgba(251,146,60,0.4)]" },
  { id: 2, text: "Free Play & Exploration", top: "22%", left: "18%", color: "shadow-[0_0_15px_rgba(158,217,107,0.4)]" },
  { id: 3, text: "Music & Movement", top: "33%", left: "42%", color: "shadow-[0_0_15px_rgba(186,230,253,0.5)]" },
  { id: 4, text: "Storytelling Circle", top: "48%", left: "37%", color: "shadow-[0_0_15px_rgba(251,146,60,0.4)]" },
  { id: 5, text: "Sensory & Messy Play", top: "68%", left: "21%", color: "shadow-[0_0_15px_rgba(254,240,138,0.5)]" },
  { id: 6, text: "Snack & Social Time", top: "85%", left: "28%", color: "shadow-[0_0_15px_rgba(158,217,107,0.4)]" },
  { id: 7, text: "Fine Motor & Montessori Work Cycle", top: "82%", left: "62%", color: "shadow-[0_0_15px_rgba(186,230,253,0.5)]" },
  {
    id: 8,
    text: "Language & Early Math Exploration",
    subtext: "(by Pre nursery and Nursery)",
    top: "62%",
    left: "68%",
    color: "shadow-[0_0_15px_rgba(248,113,113,0.4)]",
  },
  { id: 9, text: "Calm Closure & Dispersal", top: "48%", left: "75%", color: "shadow-[0_0_15px_rgba(251,146,60,0.4)]" },
];

export function DayAtUktiInteractive() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-20 leading-tight">
            A day at
            <br />
            Ukti Early Years
          </h2>
        </FadeUp>

        <FadeUp>
          <div className="relative w-full max-w-[900px] mx-auto aspect-[4/5] md:aspect-[1/1] min-h-[700px]">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M 100 50
                   C 100 50, 300 50, 300 250
                   C 300 450, 100 450, 100 650
                   C 100 850, 400 950, 500 850
                   C 600 750, 600 650, 750 500
                   C 850 400, 950 500, 950 650
                   C 950 850, 800 950, 800 950"
                stroke="#9ED96B"
                strokeWidth="85"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 120 70 C 150 70, 250 80, 260 180" stroke="white" strokeWidth="6" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
              <path d="M 110 580 C 110 540, 130 500, 180 490" stroke="white" strokeWidth="6" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
              <path d="M 450 820 C 500 800, 550 750, 560 680" stroke="white" strokeWidth="6" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
              <path d="M 850 520 C 900 530, 910 580, 910 620" stroke="white" strokeWidth="6" strokeOpacity="0.4" strokeLinecap="round" fill="none" />
            </svg>

            {steps.map((step) => (
              <div
                key={step.id}
                className={`absolute flex items-center bg-white rounded-2xl md:rounded-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-100 w-max max-w-[150px] md:max-w-[240px] transition-all duration-300 hover:scale-105 hover:z-20 cursor-default ${step.color}`}
                style={{
                  top: step.top,
                  left: step.left,
                  zIndex: 10,
                }}
              >
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-[#F6892A] text-white rounded-full font-bold text-xs mr-3 shadow-inner">
                  {step.id}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#4A4A4A] font-semibold leading-tight text-[13px] md:text-sm">
                    {step.text}
                  </span>
                  {step.subtext && (
                    <span className="text-[10px] text-gray-400 font-normal mt-0.5">
                      {step.subtext}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
