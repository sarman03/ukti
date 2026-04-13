"use client";

import { useState } from "react";
import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";

type FormTab = "tour" | "admission";

export default function EnquiryFormSection() {
  const [activeTab, setActiveTab] = useState<FormTab>("tour");

  return (
    <section
      id="contact"
      className="py-12 md:py-20 px-4 md:px-8 bg-white"
    >
      <FadeUp>
      <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-orange-500 mb-6 md:mb-8">
            Enquiry form
          </h2>

        {/* Tab toggle */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab("tour")}
            className={`ripple-btn relative px-7 py-2.5 rounded-full font-semibold text-sm transition-colors ${
              activeTab === "tour"
                ? "bg-orange-500 text-white shadow-sm"
                : "border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-50"
            }`}
            style={{ "--ripple-color": activeTab === "tour" ? "rgba(249, 115, 22, 0.4)" : "rgba(31, 41, 55, 0.2)" } as React.CSSProperties}
          >
            <span className="ripple-extra absolute inset-0 rounded-full pointer-events-none" />
            <span className="relative z-10">Book a Tour</span>
          </button>
          <button
            onClick={() => setActiveTab("admission")}
            className={`ripple-btn relative px-7 py-2.5 rounded-full font-semibold text-sm transition-colors ${
              activeTab === "admission"
                ? "bg-orange-500 text-white shadow-sm"
                : "border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-50"
            }`}
            style={{ "--ripple-color": activeTab === "admission" ? "rgba(249, 115, 22, 0.4)" : "rgba(31, 41, 55, 0.2)" } as React.CSSProperties}
          >
            <span className="ripple-extra absolute inset-0 rounded-full pointer-events-none" />
            <span className="relative z-10">Admission Enquiry</span>
          </button>
        </div>

        {/* Tour timings — shown only for Book a Tour */}
        {activeTab === "tour" && (
          <div className="mb-6 text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold">Tour Timings:</p>
            <p>Monday to Friday: 1:30 pm – 3:30 pm</p>
            <p>Saturday: 11:00 am – 2:00 pm</p>
          </div>
        )}

        {/* Form box */}
        <div className="bg-amber-400 rounded-2xl p-5 md:p-8">
          <p className="font-extrabold text-gray-900 text-center mb-6 text-base">
            {activeTab === "tour"
              ? "Book a School Tour at Ukti Early Years"
              : "Admission Enquiry at Ukti Early Years"}
          </p>

          {activeTab === "tour" ? <TourForm /> : <AdmissionForm />}
        </div>
      </div>
      </FadeUp>
    </section>
  );
}

function TourForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Child's Name"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          placeholder="Age"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          placeholder="Parent's name"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="tel"
          placeholder="Contact number"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="date"
          placeholder="Preferred date"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none text-gray-500 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          placeholder="Time of visit"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
      </div>
      <input
        type="text"
        placeholder="Location"
        className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
      />
      <RippleButton type="submit" color="bg-orange-600" rippleCss="rgba(234, 88, 12, 0.4)" className="mt-2 w-full">
        Book a Tour
      </RippleButton>
    </form>
  );
}

function AdmissionForm() {
  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Child's Name"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          placeholder="Age"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          placeholder="Parent's Name"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="tel"
          placeholder="Contact Number"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-orange-400"
        />
        <select
          className="rounded-full px-5 py-3 text-sm bg-white outline-none text-gray-400 focus:ring-2 focus:ring-orange-400"
          defaultValue=""
        >
          <option value="" disabled>
            Preferred Branch
          </option>
          <option value="delhi">Delhi</option>
          <option value="noida">Noida</option>
        </select>
      </div>
      <textarea
        placeholder="Your message or query"
        rows={3}
        className="rounded-2xl px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-400"
      />
      <RippleButton type="submit" color="bg-orange-600" rippleCss="rgba(234, 88, 12, 0.4)" className="mt-2 w-full">
        Submit Enquiry
      </RippleButton>
    </form>
  );
}
