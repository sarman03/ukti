"use client";

import { useState, useRef, useEffect } from "react";
import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function DatePicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function selectDay(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    if (d < today || d.getDay() === 0) return;
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  }

  function formatDisplay(iso: string) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full rounded-full px-5 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-[#F6892A] text-left flex items-center justify-between"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value ? formatDisplay(value) : "Date of visit"}
        </span>
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 bottom-full mb-2 left-0 bg-white rounded-2xl shadow-xl p-4 w-72">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <span className="font-semibold text-sm text-gray-800">{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d, i) => (
              <div key={i} className={`text-center text-xs font-semibold py-1 ${i === 0 ? "text-gray-300" : "text-gray-500"}`}>{d}</div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const date = new Date(viewYear, viewMonth, day);
              const isPast = date < today;
              const isSunday = date.getDay() === 0;
              const isSelected = value === `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const disabled = isPast || isSunday;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className={`
                    text-center text-sm py-1.5 rounded-full mx-0.5 my-0.5 transition-colors
                    ${isSelected ? "bg-[#F6892A] text-white font-bold" : ""}
                    ${disabled ? "text-gray-300 cursor-not-allowed" : !isSelected ? "hover:bg-[#F2DA36]/50 text-gray-800 cursor-pointer" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

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
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#F6892A] mb-6 md:mb-8">
            Enquiry form
          </h2>

        {/* Tab toggle */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab("tour")}
            className={`ripple-btn relative px-7 py-2.5 rounded-full font-semibold text-sm transition-colors ${
              activeTab === "tour"
                ? "bg-[#F6892A] text-white shadow-sm"
                : "border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-50"
            }`}
            style={{ "--ripple-color": activeTab === "tour" ? "rgba(246, 137, 42, 0.4)" : "rgba(31, 41, 55, 0.2)" } as React.CSSProperties}
          >
            <span className="ripple-extra absolute inset-0 rounded-full pointer-events-none" />
            <span className="relative z-10">Book a Tour</span>
          </button>
          <button
            onClick={() => setActiveTab("admission")}
            className={`ripple-btn relative px-7 py-2.5 rounded-full font-semibold text-sm transition-colors ${
              activeTab === "admission"
                ? "bg-[#F6892A] text-white shadow-sm"
                : "border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-50"
            }`}
            style={{ "--ripple-color": activeTab === "admission" ? "rgba(246, 137, 42, 0.4)" : "rgba(31, 41, 55, 0.2)" } as React.CSSProperties}
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
        <div className={`${activeTab === "tour" ? "bg-[#F4B325]" : "bg-[#F4DF4F]"} rounded-2xl p-5 md:p-8`}>
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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  function getTimeSlots(dateStr: string): string[] {
    if (!dateStr) return [];
    const day = new Date(dateStr).getDay();
    if (day === 6) return ["11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM"];
    return ["1:30 PM - 2:30 PM", "2:30 PM - 3:30 PM"];
  }

  function handleDateChange(val: string) {
    setSelectedDate(val);
    setSelectedTime("");
  }

  const timeSlots = getTimeSlots(selectedDate);

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Child's Name"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <input
          type="text"
          placeholder="Age"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <input
          type="text"
          placeholder="Parent's name"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <input
          type="tel"
          placeholder="Contact number"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <DatePicker value={selectedDate} onChange={handleDateChange} />
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          disabled={!selectedDate}
          className={`rounded-full px-5 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-[#F6892A] ${!selectedTime ? "text-gray-400" : "text-gray-800"} disabled:opacity-60`}
        >
          <option value="" disabled>Time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="Location"
        className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
      />
      <RippleButton type="submit" color="bg-[#F6892A]" rippleCss="rgba(246, 137, 42, 0.4)" className="mt-2 w-full">
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
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <input
          type="text"
          placeholder="Age"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <input
          type="text"
          placeholder="Parent's Name"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <input
          type="tel"
          placeholder="Contact Number"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="rounded-full px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-[#F6892A]"
        />
        <select
          className="rounded-full px-5 py-3 text-sm bg-white outline-none text-gray-400 focus:ring-2 focus:ring-[#F6892A]"
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
        className="rounded-2xl px-5 py-3 text-sm bg-white outline-none placeholder-gray-400 resize-none focus:ring-2 focus:ring-[#F6892A]"
      />
      <RippleButton type="submit" color="bg-[#F6892A]" rippleCss="rgba(246, 137, 42, 0.4)" className="mt-2 w-full">
        Submit Enquiry
      </RippleButton>
    </form>
  );
}
