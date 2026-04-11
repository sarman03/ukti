import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-amber-300 px-14 py-4 flex items-center justify-between">
      {/* Left: Nav Links */}
      <div className="flex items-center gap-10">
        <Link href="#about" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
          About
        </Link>
        <Link href="#classes" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
          Classes
        </Link>
        <Link href="#contact" className="text-gray-800 font-medium hover:text-gray-600 transition-colors">
          Contact
        </Link>
      </div>

      {/* Center: Logo — absolutely centered within the fixed nav */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/logo/Ukti _ Logo 1.png"
          alt="Ukti Early Years"
          width={88}
          height={92}
          priority
        />
      </div>

      {/* Right: CTA Buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="#contact"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
        >
          Book a tour
        </Link>
        <Link
          href="#contact"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors text-sm"
        >
          Contact Me
        </Link>
      </div>
    </nav>
  );
}
