import Image from "next/image";

const goals = [
  {
    title: "Holistic Development",
    description:
      "Children are supported to speak, share ideas, and express themselves freely without hesitation.",
    icon: "/learning-goals/1.png",
  },
  {
    title: "Environmental Awareness",
    description:
      "We help children connect with nature and learn simple habits of care and responsibility towards the environment.",
    icon: "/learning-goals/2.png",
  },
  {
    title: "Cultural Awareness",
    description:
      "We introduce children to different cultures, traditions, and perspectives, building openness and respect.",
    icon: "/learning-goals/3.png",
  },
  {
    title: "Imagination & Curiosity",
    description:
      "We spark a love for learning by encouraging exploration, open questions, and creative thinking every day.",
    icon: "/learning-goals/4.png",
  },
];

export default function LearningGoalsSection() {
  return (
    <section id="learning" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">
          Learning goals
        </h2>

        <div className="grid grid-cols-2 gap-12 items-center">
          {/* Left: kite-tilted main image with smaller overlap image at top-right */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              {/* Main image — heavily tilted like a kite */}
              <div
                className="absolute inset-0 bg-gray-300 rounded-2xl shadow-lg flex items-center justify-center"
                style={{ transform: "rotate(-12deg)" }}
              >
                <span className="text-gray-500 text-sm">Image Placeholder</span>
              </div>

              {/* Smaller image overlapping the top-right corner */}
              <div
                className="absolute -top-6 -right-6 w-32 h-24 bg-gray-400 rounded-xl shadow-lg flex items-center justify-center z-10"
                style={{ transform: "rotate(8deg)" }}
              >
                <span className="text-gray-600 text-xs">Image</span>
              </div>
            </div>
          </div>

          {/* Right: goal items */}
          <div className="flex flex-col gap-4">
            {goals.map((goal) => (
              <div
                key={goal.title}
                className="flex gap-4 items-center bg-white border border-amber-300 rounded-2xl px-5 py-5 shadow-sm"
              >
                <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center bg-amber-200">
                  <Image
                    src={goal.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-extrabold text-base leading-tight">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-snug mt-1">
                    {goal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
