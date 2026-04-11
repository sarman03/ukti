import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "6+", label: "Years of Experience", icon: "/about-us/6+.png" },
  { value: "50+", label: "Happy Little Learners", icon: "/about-us/50 +.png" },
  { value: "3hrs+", label: "Tactile Play", icon: "/about-us/3+.png" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-3 items-start gap-8 mb-16">
          {/* Left column: image at top, shorter aspect */}
          <div className="w-full aspect-[5/4] bg-gray-300 rounded-2xl flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image Placeholder</span>
          </div>

          {/* Center text */}
          <div className="text-center flex flex-col items-center gap-6 pt-2">
            <h2 className="text-4xl font-extrabold text-green-700">About Us</h2>
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

          {/* Right column: large logo at top, image offset lower */}
          <div className="flex flex-col items-center">
            <Image
              src="/logo/Ukti _ Logo 1.png"
              alt="Ukti Early Years"
              width={280}
              height={294}
              className="w-60 h-auto"
            />
            {/* Image is pushed down so it sits roughly at the level of the Know More button */}
            <div className="w-full aspect-[5/4] bg-gray-300 rounded-2xl flex items-center justify-center mt-12">
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
              <Image
                src={stat.icon}
                alt=""
                width={80}
                height={80}
                className="w-16 h-16 flex-shrink-0 object-contain"
              />
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
