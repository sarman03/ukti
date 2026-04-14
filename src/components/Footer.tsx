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
    label: "Facebook",
    href: "https://facebook.com/uktiearlyyears",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@uktiearlyyears",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919876543210",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0a11.9 11.9 0 0 0-10.2 18l-1.7 6 6.2-1.6a11.9 11.9 0 0 0 5.7 1.4h.1A11.9 11.9 0 0 0 24 12a11.8 11.8 0 0 0-3.5-8.5zM12 21.4a9.4 9.4 0 0 1-4.8-1.3l-.4-.2-3.7 1 1-3.6-.2-.4A9.5 9.5 0 1 1 21.5 12 9.4 9.4 0 0 1 12 21.4zm5.2-7.1c-.3-.1-1.7-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.7 7.7 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5c.1-.1.1-.2.2-.4s0-.3 0-.4-.6-1.4-.8-1.9-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.6 4 5 5 0 0 0 3 .6 2.8 2.8 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-amber-300 px-4 md:px-20 py-10 md:py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {/* Left: Logo + tagline */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-3">
          <Link href="/">
            <Image
              src="/logo/Ukti _ Logo 1.png"
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
                className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-amber-400/60">
        <p className="text-gray-700 text-xs text-center">
          &copy; {new Date().getFullYear()} Ukti Early Years. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
