// Single SVG layout: 4 colored circles at fixed positions, connected by diagonal
// lines. Text is rendered via <foreignObject> next to each circle.
// The SVG uses viewBox so it scales responsively.

import FadeUp from "@/components/FadeUp";

const W = 920;
const H = 600;

// Circle definitions
// Top row: text appears to the RIGHT of the circle (horizontal layout)
// Bottom row: text appears BELOW the circle (vertical layout, centered)
const circles = [
  {
    id: "tl",
    cx: 130,
    cy: 130,
    r: 58,
    fill: "#F47C26", // orange
    icon: "/facilities/safety.png",
    title: "Safe & Secure Campus",
    description:
      "Fully monitored premises with restricted entry and child-safe infrastructure to ensure complete security.",
    textX: 200,
    textY: 78,
    textWidth: 240,
    textHeight: 130,
    textAlign: "left" as const,
  },
  {
    id: "tr",
    cx: 530,
    cy: 130,
    r: 58,
    fill: "#E9B841", // amber
    icon: "/facilities/hygiene.png",
    title: "Hygiene & Clean Environment",
    description:
      "Daily cleaning routines and sanitized play areas, classrooms, and washrooms for a healthy space.",
    textX: 600,
    textY: 78,
    textWidth: 280,
    textHeight: 130,
    textAlign: "left" as const,
  },
  {
    id: "bl",
    cx: 250,
    cy: 380,
    r: 58,
    fill: "#3DBFBF", // teal
    icon: "/facilities/staff.png",
    title: "Trained & Caring Staff",
    description:
      "Experienced educators and support staff who are trained in child care, safety, and emergency handling.",
    textX: 130,
    textY: 455,
    textWidth: 240,
    textHeight: 130,
    textAlign: "center" as const,
  },
  {
    id: "br",
    cx: 670,
    cy: 380,
    r: 58,
    fill: "#5A9E3C", // green
    icon: "/facilities/child.png",
    title: "Child-Safe Infrastructure",
    description:
      "Furniture, toys, and spaces designed with rounded edges, non-toxic materials, and safety-first layouts.",
    textX: 550,
    textY: 455,
    textWidth: 240,
    textHeight: 130,
    textAlign: "center" as const,
  },
];

// Lines connecting the 4 circles in a zig-zag: TL → BL → TR → BR
const lines = [
  { x1: 130, y1: 130, x2: 250, y2: 380 }, // TL → BL
  { x1: 250, y1: 380, x2: 530, y2: 130 }, // BL → TR
  { x1: 530, y1: 130, x2: 670, y2: 380 }, // TR → BR
];

// Icon image dimensions inside each circle
const ICON_SIZE = 64;

export default function SafetyFacilitiesSection() {
  return (
    <section id="safety" className="py-20 px-8 bg-white">
      <FadeUp>
        <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-4">
          Safety &amp; Facilities
        </h2>
      </FadeUp>

      <div className="max-w-5xl mx-auto">
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
    </section>
  );
}
