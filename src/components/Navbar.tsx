import Link from "next/link";
import Image from "next/image";
import RippleButton from "./RippleButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-amber-300 px-20 py-4 flex items-center justify-between">
      {/* Left: Nav Links */}
      <div className="flex items-center gap-10">
        <a href="#about" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
          About
        </a>
        <a href="#classes" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
          Classes
        </a>
        <a href="#contact" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
          Contact
        </a>
      </div>

      {/* Center: Logo — clickable, links to home */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/logo/Ukti _ Logo 1.png"
          alt="Ukti Early Years"
          width={88}
          height={92}
          priority
        />
      </Link>

      {/* Right: CTA Buttons */}
      <div className="flex items-center gap-2">
        <RippleButton href="#contact" className="px-6 py-2.5">
          Book a tour
        </RippleButton>
        <RippleButton href="#contact" className="px-6 py-2.5">
          Contact Me
        </RippleButton>
      </div>
    </nav>
  );
}
