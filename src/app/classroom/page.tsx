import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeUp from "@/components/FadeUp";
import RippleButton from "@/components/RippleButton";

const preschoolPrograms = [
  {
    title: "Pre Nursery",
    subtitle: "Nurture curiosity and joyful learning",
    description:
      "For children aged 2-3 years, a gentle introduction to learning through play, exploration, and early social skills.",
    points: [
      "Theme-based learning every week",
      "Circle time for bonding & communication",
      "Storytelling to build imagination",
      "Early language & math concepts",
      "Montessori practical life skills",
    ],
  },
  {
    title: "Nursery",
    subtitle: "Build strong foundations for growth",
    description:
      "For children aged 3-4 years, a structured yet playful program that develops creativity, communication, and early academics.",
    points: [
      "Phonics & early literacy skills",
      "Creative arts & STEAM activities",
      "Early math & logical thinking",
      "Storytelling & expressive learning",
      "Practical life & independence skills",
      "Gross motor & outdoor play",
    ],
  },
  {
    title: "Toddlers",
    subtitle: "A safe start to explore the world",
    description:
      "For children aged 15-23 months, a nurturing environment focused on sensory discovery, movement, and emotional comfort.",
    points: [
      "Sensory & messy play exploration",
      "Music, movement & rhymes",
      "Fine & gross motor development",
      "Social interaction & bonding",
      "Safe, caring environment",
    ],
  },
];

const afterschoolPrograms = [
  {
    title: "Storytelling Program",
    subtitle: "Bringing stories to life through imagination",
    description:
      'An immersive program where children explore a "Story of the Day" through engaging, expressive, and play-focused experiences.',
    points: [
      "Music, movement & rhythm",
      "Theatre games & role play",
      "Expressive storytelling sessions",
      "Art & sensory-based activities",
      "Gross motor play & movement",
    ],
  },
  {
    title: "Language & Math Program",
    subtitle: "Build strong literacy and numeracy foundations",
    description:
      "A structured program based on Jolly Phonics, designed to develop language and math skills through fun, hands-on learning.",
    sections: [
      {
        heading: "Language Development",
        points: [
          "One letter introduced per session",
          "Sound-symbol recognition",
          "Letter formation practice",
          "Beginning sound identification",
          "Reading 2-3 letter words",
        ],
      },
      {
        heading: "Pre-Math Skills",
        points: [
          "Numbers, symbols & recognition",
          "Counting & number sequencing",
          "Sorting, matching & patterns",
          "Intro to graphs through play",
          "Shapes recognition",
          "Number writing practice",
        ],
      },
    ],
  },
];

function ProgramCard({
  title,
  subtitle,
  description,
  points,
  sections,
  imageLeft = false,
}: {
  title: string;
  subtitle: string;
  description: string;
  points?: string[];
  sections?: { heading: string; points: string[] }[];
  imageLeft?: boolean;
}) {
  return (
    <div className={`bg-amber-400 rounded-[3rem] md:rounded-[150px] p-5 ${imageLeft ? "md:p-10" : "md:py-10 md:pl-16 md:pr-10"} flex flex-col md:flex-row gap-5 md:gap-6 items-center text-center md:text-left`}>
      {/* Image placeholder */}
      <div
        className={`w-full md:w-80 h-44 md:h-72 bg-gray-300 rounded-[2rem] md:rounded-[120px] flex-shrink-0 flex items-center justify-center ${
          imageLeft ? "order-1" : "order-1 md:order-2"
        }`}
      >
        <span className="text-gray-500 text-sm">Image Placeholder</span>
      </div>

      {/* Text content */}
      <div className={`flex-1 ${imageLeft ? "order-2" : "order-2 md:order-1"}`}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h3>
        <p className="text-base font-semibold text-gray-700 mt-1">{subtitle}</p>
        <p className="text-base text-gray-800 leading-relaxed mt-3">
          {description}
        </p>

        {points && (
          <ul className="mt-3 space-y-1 inline-block md:block text-left">
            {points.map((point) => (
              <li key={point} className="text-base text-gray-800 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
                {point}
              </li>
            ))}
          </ul>
        )}

        {sections &&
          sections.map((sec) => (
            <div key={sec.heading} className="mt-4">
              <p className="font-bold text-base text-gray-900">{sec.heading}</p>
              <ul className="mt-1 space-y-1 inline-block md:block text-left">
                {sec.points.map((point) => (
                  <li key={point} className="text-base text-gray-800 flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        <div className="mt-5">
          <RippleButton href="#contact" className="px-14 py-3">
            Enroll Now
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

export default function ClassroomPage() {
  return (
    <main>
      <Navbar />

      {/* Hero banner with dimmed image */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Placeholder image background */}
        <div className="absolute inset-0 bg-gray-400" />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Love, learning &amp;<br />
            Laughter Every Day
          </h1>
          <RippleButton href="#contact" className="px-8 py-3">
            Book a tour
          </RippleButton>
        </div>
      </section>

      {/* Pre School Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-10 md:mb-14">
              Pre School
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-8 md:gap-10">
            {preschoolPrograms.map((program, i) => (
              <FadeUp key={program.title} delay={i * 0.15}>
                <ProgramCard {...program} imageLeft />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* After School Section */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-10 md:mb-14">
              After school
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-8 md:gap-10">
            {afterschoolPrograms.map((program, i) => (
              <FadeUp key={program.title} delay={i * 0.15}>
                <ProgramCard {...program} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
