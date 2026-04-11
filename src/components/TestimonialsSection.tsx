"use client";

import { useState } from "react";

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
        background: "linear-gradient(to bottom, #fffff5 0%, #fefce8 25%, #fbbf24 80%, #f59e0b 100%)",
      }}
    >
      <h2 className="text-4xl font-extrabold text-center text-green-800 mb-16">
        Testimonials
      </h2>

      {/* Carousel container */}
      <div className="relative mx-auto" style={{ maxWidth: 1200, height: 460 }}>
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
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors text-green-800 font-bold text-2xl z-20"
          aria-label="Previous testimonial"
        >
          ‹
        </button>

        {/* Right arrow */}
        <button
          onClick={() => setCurrent(next)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors text-green-800 font-bold text-2xl z-20"
          aria-label="Next testimonial"
        >
          ›
        </button>
      </div>
    </section>
  );
}
