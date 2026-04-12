// "Growing curious minds, one moment at a time."
// Three scattered image placeholders around a centered tagline.

import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";

export default function CTASection() {
  return (
    <section className="py-20 px-8 bg-white overflow-hidden">
      <FadeUp>
      <div className="max-w-5xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-8">

        {/* Left images — stacked, slightly rotated */}
        <div className="flex flex-col items-end gap-5">
          <div
            className="w-44 h-36 bg-gray-300 rounded-2xl shadow-md"
            style={{ transform: "rotate(-6deg)" }}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs rounded-2xl">
              Image
            </div>
          </div>
          <div
            className="w-40 h-32 bg-gray-300 rounded-2xl shadow-md"
            style={{ transform: "rotate(4deg)" }}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs rounded-2xl">
              Image
            </div>
          </div>
        </div>

        {/* Center tagline */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className="leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            <p className="font-extrabold text-gray-900">Growing</p>
            <p className="font-extrabold text-green-700">curious minds,</p>
            <p className="font-extrabold text-gray-900">
              one{" "}
              <span className="text-orange-500 italic">moment</span>
            </p>
            <p className="font-extrabold text-gray-900">at a time.</p>
          </div>
          <RippleButton>
            Enroll Your Child
          </RippleButton>
        </div>

        {/* Right image */}
        <div className="flex flex-col items-start gap-5">
          <div
            className="w-44 h-44 bg-gray-300 rounded-2xl shadow-md"
            style={{ transform: "rotate(5deg)" }}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs rounded-2xl">
              Image
            </div>
          </div>
        </div>
      </div>
      </FadeUp>
    </section>
  );
}
