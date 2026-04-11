import Link from "next/link";
import Image from "next/image";

// Icon images will be dropped into /public/icons later — leave space for them.
const stats = [
  { value: "6+", label: "Years of Experience" },
  { value: "50+", label: "Happy Little Learners" },
  { value: "3hrs+", label: "Tactile Play" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-3 items-center gap-8 mb-16">
          {/* Left image placeholder */}
          <div className="w-full aspect-[3/4] bg-gray-300 rounded-2xl flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image Placeholder</span>
          </div>

          {/* Center text */}
          <div className="text-center flex flex-col items-center gap-6">
            <h2 className="text-4xl font-extrabold text-gray-900">About Us</h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Welcome to Ukti Early Years where we believe in fostering the brightest beginnings for our young
              learners. We aspire to create an environment where children not only learn but thrive, where every
              moment is an opportunity to sculpt curious minds and nurture boundless potential
            </p>
            <Link
              href="#"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
            >
              Know More
            </Link>
          </div>

          {/* Right column: logo + image */}
          <div className="flex flex-col items-center gap-4">
            {/* UKTI logo */}
            <Image
              src="/logo/Ukti _ Logo 1.png"
              alt="Ukti Early Years"
              width={140}
              height={146}
              className="w-32 h-auto"
            />

            {/* Right image placeholder */}
            <div className="w-full aspect-[4/3] bg-gray-300 rounded-2xl flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image Placeholder</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 pt-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-center gap-5"
            >
              {/* Icon placeholder — replace with <Image /> when assets are ready */}
              <div className="w-16 h-16 flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-5xl font-extrabold text-green-700 leading-none">
                  {stat.value}
                </span>
                <span className="text-gray-700 text-sm font-medium mt-2">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
