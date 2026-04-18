"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import RippleButton from "./RippleButton";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isClassroom = pathname === "/classroom";
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F2DA36] px-4 md:px-20 py-3 md:py-4 flex items-center justify-between">
      {/* Mobile: Logo on left */}
      <Link href="/" className="md:hidden">
        <Image
          src="/logo/Ukti _ Logo 1.png"
          alt="Ukti Early Years"
          width={88}
          height={92}
          priority
          className="w-12 h-auto"
        />
      </Link>

      {/* Left: Nav Links (desktop) */}
      <div className="hidden md:flex items-center gap-10">
        <a href="/about" className={`font-medium transition-colors ${isAbout ? "text-[#5EA85B] font-bold" : "text-gray-800 hover:text-gray-600"}`}>
          About
        </a>
        <a href="/classroom" className={`font-medium transition-colors ${isClassroom ? "text-[#5EA85B] font-bold" : "text-gray-800 hover:text-gray-600"}`}>
          Classes
        </a>
        <a href="/contact" className={`font-medium transition-colors ${isContact ? "text-[#5EA85B] font-bold" : "text-gray-800 hover:text-gray-600"}`}>
          Contact
        </a>
      </div>

      {/* Center: Logo (desktop only) */}
      <Link href="/" className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <Image
          src="/logo/Ukti _ Logo 1.png"
          alt="Ukti Early Years"
          width={88}
          height={92}
          priority
        />
      </Link>

      {/* Right: CTA Buttons (desktop) */}
      <div className="hidden md:flex items-center gap-2">
        <RippleButton href="/#contact" className="px-6 py-2.5">
          Book a tour
        </RippleButton>
        <RippleButton href="/contact" className="px-6 py-2.5">
          Contact Us
        </RippleButton>
      </div>

      {/* Mobile: Hamburger button on right */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 z-10"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile: Slide-down menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#F2DA36] shadow-lg flex flex-col items-center gap-4 py-6 md:hidden">
          <a href="/about" onClick={() => setMenuOpen(false)} className={`font-medium text-lg ${isAbout ? "text-[#5EA85B] font-bold" : "text-gray-800"}`}>
            About
          </a>
          <a href="/classroom" onClick={() => setMenuOpen(false)} className={`font-medium text-lg ${isClassroom ? "text-[#5EA85B] font-bold" : "text-gray-800"}`}>
            Classes
          </a>
          <a href="/contact" onClick={() => setMenuOpen(false)} className={`font-medium text-lg ${isContact ? "text-[#5EA85B] font-bold" : "text-gray-800"}`}>
            Contact
          </a>
          <div className="flex flex-col gap-2 mt-2">
            <RippleButton href="/#contact" className="px-6 py-2.5">
              Book a tour
            </RippleButton>
            <RippleButton href="/contact" className="px-6 py-2.5">
              Contact Us
            </RippleButton>
          </div>
        </div>
      )}
    </nav>
  );
}
