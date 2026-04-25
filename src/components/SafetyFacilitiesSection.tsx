import Image from "next/image";
import FadeUp from "@/components/FadeUp";

const W = 920;
const H = 620;

// TL(160,130) → BL(280,420) → TR(640,130) → BR(760,420)
// Both outer diagonals have identical offset (+120, +290) — perfectly parallel
const circles = [
  {
    id: "tl",
    cx: 160,
    cy: 130,
    r: 58,
    fill: "#F6892A",
    icon: "/facilities/safety.png",
    title: "Safe & Secure Campus",
    description:
      "Fully monitored CCTV premises with restricted entry and child-safe infrastructure to ensure complete security.",
    textX: 232,
    textY: 78,
    textWidth: 260,
    textHeight: 130,
    textAlign: "left" as const,
  },
  {
    id: "tr",
    cx: 640,
    cy: 130,
    r: 58,
    fill: "#F2DA36",
    icon: "/facilities/hygiene.png",
    title: "Hygiene & Clean Environment",
    description:
      "Daily cleaning routines and sanitized play areas, classrooms, and washrooms for a healthy space.",
    textX: 712,
    textY: 78,
    textWidth: 200,
    textHeight: 130,
    textAlign: "left" as const,
  },
  {
    id: "bl",
    cx: 280,
    cy: 420,
    r: 58,
    fill: "#0FB3BC",
    icon: "/facilities/staff.png",
    title: "Trained & Caring Staff",
    description:
      "Experienced educators and support staff who are trained in child care, safety, and emergency handling.",
    textX: 160,
    textY: 492,
    textWidth: 240,
    textHeight: 130,
    textAlign: "center" as const,
  },
  {
    id: "br",
    cx: 760,
    cy: 420,
    r: 58,
    fill: "#5EA85B",
    icon: "/facilities/child.png",
    title: "Child-Safe Infrastructure",
    description:
      "Furniture, toys, and spaces designed with rounded edges, non-toxic materials, and safety-first layouts.",
    textX: 640,
    textY: 492,
    textWidth: 240,
    textHeight: 130,
    textAlign: "center" as const,
  },
];

// Zigzag: TL→BL (parallel diagonal), BL→TR (crossing), TR→BR (parallel diagonal)
// Both outer lines have identical slope (+120, +290) — symmetric
const lines = [
  { x1: 160, y1: 130, x2: 280, y2: 420 }, // TL → BL
  { x1: 280, y1: 420, x2: 640, y2: 130 }, // BL → TR
  { x1: 640, y1: 130, x2: 760, y2: 420 }, // TR → BR
];

// Icon image dimensions inside each circle
const ICON_SIZE = 64;

export default function SafetyFacilitiesSection() {
  return (
    <section id="safety" className="pt-12 md:pt-20 pb-6 md:pb-10 px-4 md:px-8 bg-white">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#F6892A] mb-6 md:mb-4">
          Safety &amp; Facilities
        </h2>

      {/* Mobile card layout */}
      <div className="md:hidden grid grid-cols-1 gap-4 max-w-md mx-auto">
        {circles.map((c) => (
          <div key={c.id} className="flex items-start gap-4 rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: c.fill }}>
              <img src={c.icon} alt="" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{c.title}</p>
              <p className="text-gray-600 text-xs leading-relaxed mt-1">{c.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop image */}
      <div className="hidden md:block max-w-5xl mx-auto pt-12">
        <Image src="/home/safety2.png" alt="Safety and Facilities" width={1200} height={700} className="w-full h-auto" />
      </div>

      {/* Desktop SVG diagram (kept for reference) */}
      <div className="hidden max-w-5xl mx-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ display: "block", overflow: "visible" }}
          aria-label="Safety and Facilities diagram"
        >
          {/* Connecting lines */}
          {lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#d1d5db"
              strokeWidth="1.5"
            />
          ))}

          {/* Circles + icons */}
          {circles.map((c) => (
            <g key={c.id}>
              <circle cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} />
              <image
                href={c.icon}
                x={c.cx - ICON_SIZE / 2}
                y={c.cy - ICON_SIZE / 2}
                width={ICON_SIZE}
                height={ICON_SIZE}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          ))}

          {/* Text labels via foreignObject */}
          {circles.map((c) => (
            <foreignObject
              key={`text-${c.id}`}
              x={c.textX}
              y={c.textY}
              width={c.textWidth}
              height={c.textHeight}
            >
              <div
                {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
                style={{
                  fontFamily: "inherit",
                  color: "#111827",
                  textAlign: c.textAlign,
                }}
              >
                <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "6px" }}>
                  {c.title}
                </p>
                <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.55" }}>
                  {c.description}
                </p>
              </div>
            </foreignObject>
          ))}
        </svg>
      </div>
      </FadeUp>
    </section>
  );
}
