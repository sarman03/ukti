import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amber-300 px-4 md:px-20 py-10 md:py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Left: Logo + tagline */}
        <div className="flex flex-col items-start gap-3">
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

        {/* Right: Contact info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-extrabold text-gray-900 text-sm mb-1">Get in Touch</h3>
          <p className="text-gray-800 text-sm">Delhi | Noida</p>
          <a href="#contact" className="text-gray-800 text-sm hover:text-gray-600 transition-colors">Book a Tour</a>
          <a href="#contact" className="text-gray-800 text-sm hover:text-gray-600 transition-colors">Admission Enquiry</a>
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
