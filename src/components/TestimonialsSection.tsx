"use client";

import { useState } from "react";
import FadeUp from "@/components/FadeUp";

const testimonials = [
  {
    name: "Ananya Kapoor",
    role: "Parent of a Toddler",
    quote:
      "Ukti Early Years has been transformative for our little one. The teachers are nurturing and the play-based approach is exactly what we were looking for.",
  },
  {
    name: "Vikram Singh",
    role: "Parent of Pre Nursery student",
    quote:
      "The warmth and professionalism of the Ukti team is unmatched. Our son looks forward to school every single day — which says everything about the environment they've created.",
  },
  {
    name: "Meera Patel",
    role: "Parent of Nursery student",
    quote:
      "We noticed incredible growth in our daughter's social skills and confidence within just a few months. The 1:6 ratio truly makes a difference.",
  },
  {
    name: "Arjun Malhotra",
    role: "Parent of a Toddler",
    quote:
      "The Montessori + Play-way blend at Ukti is perfect. Our child is curious, engaged and developing beautifully. Highly recommend to all parents.",
  },
  {
    name: "Sunita Rao",
    role: "Parent of Pre Nursery student",
    quote:
      "Finding Ukti Early Years was a blessing. The attention to each child's individual development is exceptional. We couldn't be happier.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  return (
    <section
      id="testimonials"
      className="pt-20 pb-28 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #fffff5 0%, #fefce8 25%, #F2DA36 80%, #F2DA36 100%)",
      }}
    >
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-10 md:mb-16">
          Testimonials
        </h2>

      {/* Mobile carousel — single card */}
      <div className="md:hidden px-4">
        <div className="bg-gray-200 rounded-2xl p-6 shadow-md min-h-[240px] flex flex-col justify-between">
          <p className="text-gray-600 text-sm leading-relaxed italic">
            &ldquo;{testimonials[current].quote}&rdquo;
          </p>
          <div className="mt-4">
            <p className="font-extrabold text-gray-900 text-sm">
              {testimonials[current].name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {testimonials[current].role}
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrent(prev)}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#5EA85B] font-bold text-xl"
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent(next)}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#5EA85B] font-bold text-xl"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>

      {/* Desktop carousel */}
      <div className="hidden md:block relative mx-auto" style={{ maxWidth: 1200, height: 460 }}>
        {/* Left background card */}
        <div
          className="absolute rounded-2xl"
          style={{
            left: 0,
            top: 60,
            width: 360,
            height: 340,
            backgroundColor: "#9c9188",
            zIndex: 0,
          }}
        />

        {/* Center card */}
        <div
          className="absolute rounded-2xl shadow-xl flex flex-col justify-between"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            width: 680,
            height: 460,
            backgroundColor: "#e5e7eb",
            zIndex: 10,
            padding: "2.5rem",
          }}
        >
          <p className="text-gray-600 text-base leading-relaxed italic">
            &ldquo;{testimonials[current].quote}&rdquo;
          </p>
          <div>
            <p className="font-extrabold text-gray-900 text-base">
              {testimonials[current].name}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              {testimonials[current].role}
            </p>
          </div>
        </div>

        {/* Right background card */}
        <div
          className="absolute rounded-2xl"
          style={{
            right: 0,
            top: 60,
            width: 360,
            height: 340,
            backgroundColor: "#9c9188",
            zIndex: 0,
          }}
        />

        {/* Left arrow */}
        <button
          onClick={() => setCurrent(prev)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors text-[#5EA85B] font-bold text-2xl z-20"
          aria-label="Previous testimonial"
        >
          ‹
        </button>

        {/* Right arrow */}
        <button
          onClick={() => setCurrent(next)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors text-[#5EA85B] font-bold text-2xl z-20"
          aria-label="Next testimonial"
        >
          ›
        </button>
      </div>
      </FadeUp>
    </section>
  );
}
