const goals = [
  {
    title: "Holistic Development",
    description:
      "Children are supported to speak, share ideas, and express themselves freely without hesitation.",
    bgColor: "#c53030",
    icon: (
      // Heart
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    title: "Environmental Awareness",
    description:
      "We introduce children to both nature and learn simple habits of care and responsibility towards the environment.",
    bgColor: "#276749",
    icon: (
      // Leaf
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c9 0 12-8 12-12 0 0-3 3-5 4S8.5 12.5 8 13c.5-1 1.5-2.5 3-3.5C13 8.5 15 8 17 8z" />
      </svg>
    ),
  },
  {
    title: "Imagination & Curiosity",
    description:
      "We spark a love for learning by encouraging exploration, open questions, and creative thinking every day.",
    bgColor: "#b7791f",
    icon: (
      // Star
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

export default function LearningGoalsSection() {
  return (
    <section id="learning" className="py-20 bg-[#1a2e1a]">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left: title + image placeholder */}
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-8">
              Learning Goals
            </h2>
            <div className="aspect-[4/3] bg-gray-600 rounded-2xl flex items-center justify-center">
              <span className="text-gray-400 text-sm">Image Placeholder</span>
            </div>
          </div>

          {/* Right: goal items */}
          <div className="flex flex-col gap-10">
            {goals.map((goal) => (
              <div key={goal.title} className="flex gap-5 items-start">
                <div
                  className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: goal.bgColor }}
                >
                  {goal.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-1">
                    {goal.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
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
