import Image from "next/image";
import Link from "next/link";

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
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ukti-early-years/",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1zM8.3 18.6H5.58V9.8H8.3v8.8zm4.35-8.8h-2.6v8.8h2.72v-4.62c0-2.58 3.36-2.82 3.36 0v4.62h2.73v-5.56c0-4.33-4.9-4.17-6.2-2.04V9.8z" />
      </svg>
    ),
  },
];

export default function Footer() {
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
            {socials.map((s) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#F2DA36]/60">
        <p className="text-gray-700 text-xs text-center">
          &copy; {new Date().getFullYear()} Ukti Early Years. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
