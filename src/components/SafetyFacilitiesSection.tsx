// Single SVG layout: 4 colored circles at fixed positions, connected by diagonal
// lines. Text is rendered via <foreignObject> next to each circle.
// The SVG uses viewBox so it scales responsively.

const W = 920;
const H = 500;

// Circle definitions
const circles = [
  {
    id: "tl",
    cx: 145,
    cy: 125,
    r: 62,
    fill: "#F47C26", // orange
    title: "Safe & Secure Campus",
    description:
      "Fully monitored premises with restricted entry and child-safe infrastructure to ensure complete security.",
    textX: 222,
    textY: 78,
    textWidth: 230,
    textHeight: 100,
  },
  {
    id: "tr",
    cx: 775,
    cy: 125,
    r: 62,
    fill: "#E9B841", // amber
    title: "Hygiene & Clean Environment",
    description:
      "Daily cleaning routines and sanitized play areas, classrooms, and washrooms for a healthy space.",
    textX: 468,
    textY: 78,
    textWidth: 240,
    textHeight: 100,
  },
  {
    id: "bl",
    cx: 200,
    cy: 390,
    r: 62,
    fill: "#3DBFBF", // teal
    title: "Trained & Caring Staff",
    description:
      "Experienced educators and support staff who are trained in child care, safety, and emergency handling.",
    textX: 278,
    textY: 343,
    textWidth: 230,
    textHeight: 100,
  },
  {
    id: "br",
    cx: 720,
    cy: 390,
    r: 62,
    fill: "#5A9E3C", // green
    title: "Child-Safe Infrastructure",
    description:
      "Furniture, toys, and spaces designed with rounded edges, non-toxic materials, and safety-first layouts.",
    textX: 430,
    textY: 343,
    textWidth: 230,
    textHeight: 100,
  },
];

// Lines connecting the 4 circles in an X pattern
const lines = [
  { x1: 145, y1: 125, x2: 200, y2: 390 }, // TL → BL (near-vertical left)
  { x1: 775, y1: 125, x2: 720, y2: 390 }, // TR → BR (near-vertical right)
  { x1: 145, y1: 125, x2: 720, y2: 390 }, // TL → BR (diagonal)
  { x1: 775, y1: 125, x2: 200, y2: 390 }, // TR → BL (diagonal)
];

// Simple white SVG icons rendered at center (0,0) of each circle
function ShieldIcon() {
  return (
    <>
      <path
        d="M0,-12 L-9,-8 L-9,0 C-9,7 -4.5,11 0,13 C4.5,11 9,7 9,0 L9,-8 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
      />
      <circle cx="0" cy="-1" r="2.5" fill="white" />
      <line x1="0" y1="1.5" x2="0" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </>
  );
}

function SprayIcon() {
  return (
    <>
      {/* Bottle body */}
      <rect x="-7" y="-4" width="12" height="14" rx="2" fill="none" stroke="white" strokeWidth="1.8" />
      {/* Nozzle */}
      <line x1="3" y1="-4" x2="3" y2="-10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="-10" x2="9" y2="-10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Spray dots */}
      <circle cx="11" cy="-7" r="1.2" fill="white" />
      <circle cx="12" cy="-11" r="1.2" fill="white" />
      <circle cx="13" cy="-3" r="1.2" fill="white" />
    </>
  );
}

function PeopleIcon() {
  return (
    <>
      {/* Person 1 */}
      <circle cx="-5" cy="-7" r="3.5" fill="none" stroke="white" strokeWidth="1.8" />
      <path d="M-10,4 C-10,0 0,0 0,4 L0,9 L-10,9 Z" fill="none" stroke="white" strokeWidth="1.8" />
      {/* Person 2 */}
      <circle cx="5" cy="-7" r="3.5" fill="none" stroke="white" strokeWidth="1.8" />
      <path d="M0,4 C0,0 10,0 10,4 L10,9 L0,9 Z" fill="none" stroke="white" strokeWidth="1.8" />
    </>
  );
}

function BlocksIcon() {
  return (
    <>
      {/* Bottom row: 2 blocks */}
      <rect x="-10" y="2" width="9" height="9" rx="1" fill="none" stroke="white" strokeWidth="1.8" />
      <rect x="1" y="2" width="9" height="9" rx="1" fill="none" stroke="white" strokeWidth="1.8" />
      {/* Top row: 1 block centered */}
      <rect x="-4.5" y="-9" width="9" height="9" rx="1" fill="none" stroke="white" strokeWidth="1.8" />
    </>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  tl: <ShieldIcon />,
  tr: <SprayIcon />,
  bl: <PeopleIcon />,
  br: <BlocksIcon />,
};

export default function SafetyFacilitiesSection() {
  return (
    <section id="safety" className="py-20 px-8 bg-white">
      <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-4">
        Safety &amp; Facilities
      </h2>

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
              <g transform={`translate(${c.cx}, ${c.cy})`}>
                {iconMap[c.id]}
              </g>
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
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  color: "#111827",
                }}
              >
                <p style={{ fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>
                  {c.title}
                </p>
                <p style={{ fontSize: "11.5px", color: "#4b5563", lineHeight: "1.55" }}>
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
