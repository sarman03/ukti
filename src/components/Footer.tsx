"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EnrollmentModal from "@/components/EnrollmentModal";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/uktiearlyyears",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    onClick: true,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ukti-early-years/",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1zM8.3 18.6H5.58V9.8H8.3v8.8zm4.35-8.8h-2.6v8.8h2.72v-4.62c0-2.58 3.36-2.82 3.36 0v4.62h2.73v-5.56c0-4.33-4.9-4.17-6.2-2.04V9.8z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ukti.creativeartscentre",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="bg-[#F2DA36] px-4 md:px-20 py-10 md:py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {/* Left: Logo + tagline */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-3">
          <Link href="/">
            <Image
              src="/logo/Ukti _ Logo.png"
              alt="Ukti Early Years"
              width={88}
              height={92}
              className="w-32 md:w-40 h-auto"
            />
          </Link>
          <p className="text-gray-800 text-sm leading-relaxed max-w-xs">
            Fostering the brightest beginnings for young learners.
          </p>
        </div>

        {/* Center: Quick links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-extrabold text-gray-900 text-sm mb-1">Quick Links</h3>
          <a href="#about" className="text-gray-800 text-sm hover:text-gray-600 transition-colors">About</a>
          <a href="#classes" className="text-gray-800 text-sm hover:text-gray-600 transition-colors">Classes</a>
          <a href="#gallery" className="text-gray-800 text-sm hover:text-gray-600 transition-colors">Gallery</a>
          <a href="#contact" className="text-gray-800 text-sm hover:text-gray-600 transition-colors">Contact</a>
        </div>

        {/* Right: Contact info + socials */}
        <div className="flex flex-col gap-2">
          <h3 className="font-extrabold text-gray-900 text-sm mb-1">Get in Touch</h3>
          <p className="text-gray-800 text-sm">Delhi | Noida</p>
          <a href="#contact" className="text-gray-800 text-sm hover:text-gray-600 transition-colors">Book a Tour</a>
          <a href="#contact" className="text-gray-800 text-sm hover:text-gray-600 transition-colors">Admission Enquiry</a>
          <div className="flex items-center gap-2 mt-4">
            {socials.map((s) => {
              if (s.onClick) {
                return (
                  <button
                    key={s.label}
                    onClick={() => setIsModalOpen(true)}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-[#F6892A] text-white flex items-center justify-center hover:bg-[#F6892A] transition-colors"
                  >
                    {s.icon}
                  </button>
                );
              }
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-[#F6892A] text-white flex items-center justify-center hover:bg-[#F6892A] transition-colors"
                >
                  {s.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#F2DA36]/60">
        <p className="text-gray-700 text-xs text-center">
          &copy; {new Date().getFullYear()} Ukti Early Years. All rights reserved.
        </p>
      </div>

      <EnrollmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}

