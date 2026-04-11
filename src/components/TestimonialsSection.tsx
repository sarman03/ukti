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
      <div className="relative mx-auto" style={{ maxWidth: 900, height: 280 }}>
        {/* Left background card */}
        <div
          className="absolute rounded-2xl"
          style={{
            left: 0,
            top: 40,
            width: 280,
            height: 200,
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
            width: 480,
            height: 268,
            backgroundColor: "#e5e7eb",
            zIndex: 10,
            padding: "2rem",
          }}
        >
          <p className="text-gray-600 text-sm leading-relaxed italic">
            &ldquo;{testimonials[current].quote}&rdquo;
          </p>
          <div>
            <p className="font-extrabold text-gray-900 text-sm">
              {testimonials[current].name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {testimonials[current].role}
            </p>
          </div>
        </div>

        {/* Right background card */}
        <div
          className="absolute rounded-2xl"
          style={{
            right: 0,
            top: 40,
            width: 280,
            height: 200,
            backgroundColor: "#9c9188",
            zIndex: 0,
          }}
        />
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-4 mt-10">
        {/* Arrows */}
        <div className="flex gap-4">
          <button
            onClick={() => setCurrent(prev)}
            className="w-9 h-9 rounded-full bg-white/60 hover:bg-white/90 flex items-center justify-center transition-colors text-green-800 font-bold text-lg"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrent(next)}
            className="w-9 h-9 rounded-full bg-white/60 hover:bg-white/90 flex items-center justify-center transition-colors text-green-800 font-bold text-lg"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === current ? "bg-green-800" : "bg-amber-200"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
