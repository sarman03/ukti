import FadeUp from "@/components/FadeUp";

type Side = "tab" | "notch" | "flat";

interface Piece {
  row: number;
  col: number;
  type: "image" | "text";
  color?: string;
  text?: string;
  top: Side;
  right: Side;
  bottom: Side;
  left: Side;
}

// Piece dimensions
const PW = 220; // piece width
const PH = 200; // piece height

// Bulb geometry — narrow neck flaring into a circular head
const NECK = 14;       // half-width of the neck (where bulb meets the edge)
const BULB_R = 24;     // bulb radius (also half-width of bulb head)
const BULB_C = 22;     // distance from edge to bulb center
const NECK_PULL = 4;   // initial outward pull at the neck base for the cusp curve
// Maximum protrusion = BULB_C + BULB_R. Used to oversize fill rects.
const TAB = BULB_C + BULB_R;

// Grid layout: 5 cols × 2 rows
// Rule: TEXT pieces always have a "tab" on every interior edge,
//       IMAGE pieces always have a "notch" on every interior edge.
// This makes text pieces visually OVERLAP image pieces from every side.
const pieces: Piece[] = [
  // ── Row 0: text / image / text / image / text ──────────────────────
  // Outer top edge: images get OUTWARD tabs, text pieces get INWARD notches
  {
    row: 0, col: 0, type: "text", color: "#F2DA36",
    text: "Personal attention with a 1:6 ratio, ensuring every child is seen, heard, and supported.",
    top: "notch", right: "tab", bottom: "tab", left: "flat",
  },
  {
    row: 0, col: 1, type: "image",
    top: "tab", right: "notch", bottom: "notch", left: "notch",
  },
  {
    row: 0, col: 2, type: "text", color: "#F6892A",
    text: "A perfect blend of Montessori + Play-way methods for hands-on, joyful learning.",
    top: "notch", right: "tab", bottom: "tab", left: "tab",
  },
  {
    row: 0, col: 3, type: "image",
    top: "tab", right: "notch", bottom: "notch", left: "notch",
  },
  {
    row: 0, col: 4, type: "text", color: "#F2DA36",
    text: "Focus on critical thinking, communication & independence from an early age.",
    top: "notch", right: "flat", bottom: "tab", left: "tab",
  },
  // ── Row 1: image / text / image / text / image ─────────────────────
  // Outer bottom edge: images get OUTWARD tabs, text pieces get INWARD notches
  {
    row: 1, col: 0, type: "image",
    top: "notch", right: "notch", bottom: "tab", left: "flat",
  },
  {
    row: 1, col: 1, type: "text", color: "#0FB3BC",
    text: "We nurture mind, emotions, creativity & physical growth for well-rounded development.",
    top: "tab", right: "tab", bottom: "notch", left: "tab",
  },
  {
    row: 1, col: 2, type: "image",
    top: "notch", right: "notch", bottom: "tab", left: "notch",
  },
  {
    row: 1, col: 3, type: "text", color: "#0FB3BC",
    text: "Guided by passionate and professional teachers who understand early learning deeply.",
    top: "tab", right: "tab", bottom: "notch", left: "tab",
  },
  {
    row: 1, col: 4, type: "image",
    top: "notch", right: "flat", bottom: "tab", left: "notch",
  },
];

/**
 * Generates an SVG path string for a puzzle piece at (col, row).
 *
 * Each side is "tab" (bump outward), "notch" (indent inward), or "flat" (straight).
 * The coordinate origin is the top-left of the full grid (0, 0).
 * Tabs extend INTO the adjacent piece's bounding rectangle — so all paths
 * fit within the combined grid bounds of COLS*PW × ROWS*PH.
 */
function buildPath(p: Piece): string {
  const x0 = p.col * PW;
  const y0 = p.row * PH;
  const x1 = x0 + PW;
  const y1 = y0 + PH;
  const mx = x0 + PW / 2;
  const my = y0 + PH / 2;

  // Direction: tab pushes AWAY from piece center, notch pushes INTO piece.
  const ts = p.top === "tab" ? -1 : p.top === "notch" ? 1 : 0;       // y, up = -1
  const rs = p.right === "tab" ? 1 : p.right === "notch" ? -1 : 0;   // x, right = +1
  const bs = p.bottom === "tab" ? 1 : p.bottom === "notch" ? -1 : 0; // y, down = +1
  const ls = p.left === "tab" ? -1 : p.left === "notch" ? 1 : 0;     // x, left = -1

  // Each side uses 3 cubic beziers to draw a "neck → bulb" shape:
  //   1) From neck base, curve outward and up to the left side of the bulb
  //   2) Arc over the top of the bulb (left → right)
  //   3) Curve from right of bulb back down to the right neck base

  let d = `M ${x0} ${y0}`;

  // ── TOP edge: left → right ─────────────────────────────────────────
  if (p.top === "flat") {
    d += ` L ${x1} ${y0}`;
  } else {
    d += ` L ${mx - NECK} ${y0}`;
    // Left side of bulb
    d += ` C ${mx - NECK} ${y0 + ts * NECK_PULL}, ${mx - BULB_R} ${y0 + ts * (BULB_C - BULB_R * 0.4)}, ${mx - BULB_R} ${y0 + ts * BULB_C}`;
    // Around the top
    d += ` C ${mx - BULB_R} ${y0 + ts * (BULB_C + BULB_R)}, ${mx + BULB_R} ${y0 + ts * (BULB_C + BULB_R)}, ${mx + BULB_R} ${y0 + ts * BULB_C}`;
    // Right side of bulb back down to neck
    d += ` C ${mx + BULB_R} ${y0 + ts * (BULB_C - BULB_R * 0.4)}, ${mx + NECK} ${y0 + ts * NECK_PULL}, ${mx + NECK} ${y0}`;
    d += ` L ${x1} ${y0}`;
  }

  // ── RIGHT edge: top → bottom ───────────────────────────────────────
  if (p.right === "flat") {
    d += ` L ${x1} ${y1}`;
  } else {
    d += ` L ${x1} ${my - NECK}`;
    d += ` C ${x1 + rs * NECK_PULL} ${my - NECK}, ${x1 + rs * (BULB_C - BULB_R * 0.4)} ${my - BULB_R}, ${x1 + rs * BULB_C} ${my - BULB_R}`;
    d += ` C ${x1 + rs * (BULB_C + BULB_R)} ${my - BULB_R}, ${x1 + rs * (BULB_C + BULB_R)} ${my + BULB_R}, ${x1 + rs * BULB_C} ${my + BULB_R}`;
    d += ` C ${x1 + rs * (BULB_C - BULB_R * 0.4)} ${my + BULB_R}, ${x1 + rs * NECK_PULL} ${my + NECK}, ${x1} ${my + NECK}`;
    d += ` L ${x1} ${y1}`;
  }

  // ── BOTTOM edge: right → left ──────────────────────────────────────
  if (p.bottom === "flat") {
    d += ` L ${x0} ${y1}`;
  } else {
    d += ` L ${mx + NECK} ${y1}`;
    d += ` C ${mx + NECK} ${y1 + bs * NECK_PULL}, ${mx + BULB_R} ${y1 + bs * (BULB_C - BULB_R * 0.4)}, ${mx + BULB_R} ${y1 + bs * BULB_C}`;
    d += ` C ${mx + BULB_R} ${y1 + bs * (BULB_C + BULB_R)}, ${mx - BULB_R} ${y1 + bs * (BULB_C + BULB_R)}, ${mx - BULB_R} ${y1 + bs * BULB_C}`;
    d += ` C ${mx - BULB_R} ${y1 + bs * (BULB_C - BULB_R * 0.4)}, ${mx - NECK} ${y1 + bs * NECK_PULL}, ${mx - NECK} ${y1}`;
    d += ` L ${x0} ${y1}`;
  }

  // ── LEFT edge: bottom → top ────────────────────────────────────────
  if (p.left === "flat") {
    d += ` Z`;
  } else {
    d += ` L ${x0} ${my + NECK}`;
    d += ` C ${x0 + ls * NECK_PULL} ${my + NECK}, ${x0 + ls * (BULB_C - BULB_R * 0.4)} ${my + BULB_R}, ${x0 + ls * BULB_C} ${my + BULB_R}`;
    d += ` C ${x0 + ls * (BULB_C + BULB_R)} ${my + BULB_R}, ${x0 + ls * (BULB_C + BULB_R)} ${my - BULB_R}, ${x0 + ls * BULB_C} ${my - BULB_R}`;
    d += ` C ${x0 + ls * (BULB_C - BULB_R * 0.4)} ${my - BULB_R}, ${x0 + ls * NECK_PULL} ${my - NECK}, ${x0} ${my - NECK}`;
    d += ` Z`;
  }

  return d;
}

const SVG_W = 5 * PW; // 1100
const SVG_H = 2 * PH; // 400

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-20 bg-white">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#F6892A] mb-8 md:mb-12">
          Why Choose Ukti
        </h2>

      {/* Mobile card layout */}
      <div className="md:hidden grid grid-cols-1 gap-4 px-4">
        {pieces.filter(p => p.type === "text").map((p, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 text-center text-sm font-semibold text-gray-800 leading-relaxed"
            style={{ backgroundColor: p.color }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Desktop SVG puzzle */}
      <div className="hidden md:block w-full">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ display: "block", overflow: "visible" }}
          aria-label="Why Choose Ukti puzzle diagram"
        >
          <defs>
            {/* Drop shadow filter */}
            <filter id="piece-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.18)" />
            </filter>

            {/* One clipPath per puzzle piece */}
            {pieces.map((p) => (
              <clipPath key={`clip-${p.row}-${p.col}`} id={`clip-${p.row}-${p.col}`}>
                <path d={buildPath(p)} />
              </clipPath>
            ))}
          </defs>

          {/* ── Piece backgrounds (clipped to puzzle shape) ──
              Each fill rect is enlarged by TAB on every side so that the clipPath
              has content to clip in the protruding tab regions. */}
          {pieces.map((p) => {
            const clipId = `clip-${p.row}-${p.col}`;
            const x = p.col * PW;
            const y = p.row * PH;
            // Extended bounds covering tab overhangs on all sides
            const fx = x - TAB;
            const fy = y - TAB;
            const fw = PW + TAB * 2;
            const fh = PH + TAB * 2;

            if (p.type === "image") {
              return (
                <g key={clipId} clipPath={`url(#${clipId})`}>
                  {/* Grey placeholder — replace rect with <image> when real photos are ready */}
                  <rect x={fx} y={fy} width={fw} height={fh} fill="#d1d5db" />
                  <text
                    x={x + PW / 2}
                    y={y + PH / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#9ca3af"
                    fontSize="11"
                    fontFamily="Arial, sans-serif"
                  >
                    Image
                  </text>
                </g>
              );
            }

            // Text piece
            return (
              <g key={clipId} clipPath={`url(#${clipId})`}>
                <rect x={fx} y={fy} width={fw} height={fh} fill={p.color} />
                <foreignObject
                  x={x + 18}
                  y={y + 18}
                  width={PW - 36}
                  height={PH - 36}
                >
                  <div
                    {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#1f2937",
                      lineHeight: "1.55",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    {p.text}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* ── Black outline drawn on top of every piece border ── */}
          {pieces.map((p) => (
            <path
              key={`border-${p.row}-${p.col}`}
              d={buildPath(p)}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
      </FadeUp>
    </section>
  );
}
