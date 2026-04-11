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
const TAB = 24; // tab protrusion px
const NECK = 16; // half-width of tab neck px

// Grid layout: 5 cols × 2 rows
// Tab/notch adjacency rules — if piece A has right=tab, piece B (same row, next col) must have left=notch
const pieces: Piece[] = [
  // ── Row 0 ────────────────────────────────────────────────────────────
  {
    row: 0, col: 0, type: "text", color: "#F5C842",
    text: "Personal attention with a 1:6 ratio, ensuring every child is seen, heard, and supported.",
    top: "flat", right: "tab", bottom: "tab", left: "flat",
  },
  {
    row: 0, col: 1, type: "image",
    top: "flat", right: "tab", bottom: "notch", left: "notch",
  },
  {
    row: 0, col: 2, type: "text", color: "#F28B30",
    text: "A perfect blend of Montessori + Play-way methods for hands-on, joyful learning.",
    top: "flat", right: "tab", bottom: "tab", left: "notch",
  },
  {
    row: 0, col: 3, type: "image",
    top: "flat", right: "tab", bottom: "notch", left: "notch",
  },
  {
    row: 0, col: 4, type: "text", color: "#F5C842",
    text: "Focus on critical thinking, communication & independence from an early age.",
    top: "flat", right: "flat", bottom: "tab", left: "notch",
  },
  // ── Row 1 ────────────────────────────────────────────────────────────
  {
    row: 1, col: 0, type: "image",
    top: "notch", right: "notch", bottom: "flat", left: "flat",
  },
  {
    row: 1, col: 1, type: "text", color: "#3DBFBF",
    text: "We nurture mind, emotions, creativity & physical growth for well-rounded development.",
    top: "tab", right: "notch", bottom: "flat", left: "tab",
  },
  {
    row: 1, col: 2, type: "image",
    top: "notch", right: "notch", bottom: "flat", left: "tab",
  },
  {
    row: 1, col: 3, type: "text", color: "#3DBFBF",
    text: "Guided by passionate and professional teachers who understand early learning deeply.",
    top: "tab", right: "notch", bottom: "flat", left: "tab",
  },
  {
    row: 1, col: 4, type: "image",
    top: "notch", right: "flat", bottom: "flat", left: "tab",
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
  const mx = x0 + PW / 2; // horizontal midpoint
  const my = y0 + PH / 2; // vertical midpoint
  const n = NECK;
  const t = TAB;

  // Direction: +1 means away from piece center (tab), -1 means into piece (notch)
  const ts = p.top === "tab" ? -1 : p.top === "notch" ? 1 : 0;    // y-axis, tab = up = -1
  const rs = p.right === "tab" ? 1 : p.right === "notch" ? -1 : 0; // x-axis, tab = right = +1
  const bs = p.bottom === "tab" ? 1 : p.bottom === "notch" ? -1 : 0; // y-axis, tab = down = +1
  const ls = p.left === "tab" ? -1 : p.left === "notch" ? 1 : 0;   // x-axis, tab = left = -1

  let d = `M ${x0} ${y0}`;

  // Top edge — left → right
  if (p.top === "flat") {
    d += ` L ${x1} ${y0}`;
  } else {
    d += ` L ${mx - n} ${y0}`;
    d += ` C ${mx - n} ${y0 + ts * t * 0.6} ${mx - n * 0.5} ${y0 + ts * t} ${mx} ${y0 + ts * t}`;
    d += ` C ${mx + n * 0.5} ${y0 + ts * t} ${mx + n} ${y0 + ts * t * 0.6} ${mx + n} ${y0}`;
    d += ` L ${x1} ${y0}`;
  }

  // Right edge — top → bottom
  if (p.right === "flat") {
    d += ` L ${x1} ${y1}`;
  } else {
    d += ` L ${x1} ${my - n}`;
    d += ` C ${x1 + rs * t * 0.6} ${my - n} ${x1 + rs * t} ${my - n * 0.5} ${x1 + rs * t} ${my}`;
    d += ` C ${x1 + rs * t} ${my + n * 0.5} ${x1 + rs * t * 0.6} ${my + n} ${x1} ${my + n}`;
    d += ` L ${x1} ${y1}`;
  }

  // Bottom edge — right → left
  if (p.bottom === "flat") {
    d += ` L ${x0} ${y1}`;
  } else {
    d += ` L ${mx + n} ${y1}`;
    d += ` C ${mx + n} ${y1 + bs * t * 0.6} ${mx + n * 0.5} ${y1 + bs * t} ${mx} ${y1 + bs * t}`;
    d += ` C ${mx - n * 0.5} ${y1 + bs * t} ${mx - n} ${y1 + bs * t * 0.6} ${mx - n} ${y1}`;
    d += ` L ${x0} ${y1}`;
  }

  // Left edge — bottom → top  (Z closes straight back to x0,y0 = upper straight portion)
  if (p.left === "flat") {
    d += ` Z`;
  } else {
    d += ` L ${x0} ${my + n}`;
    d += ` C ${x0 + ls * t * 0.6} ${my + n} ${x0 + ls * t} ${my + n * 0.5} ${x0 + ls * t} ${my}`;
    d += ` C ${x0 + ls * t} ${my - n * 0.5} ${x0 + ls * t * 0.6} ${my - n} ${x0} ${my - n}`;
    d += ` Z`;
  }

  return d;
}

const SVG_W = 5 * PW; // 1100
const SVG_H = 2 * PH; // 400

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-20 px-8 bg-white">
      <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-12">
        Why Choose Ukti
      </h2>
      <div className="max-w-6xl mx-auto">
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

          {/* ── Piece backgrounds (clipped to puzzle shape) ── */}
          {pieces.map((p) => {
            const clipId = `clip-${p.row}-${p.col}`;
            const x = p.col * PW;
            const y = p.row * PH;

            if (p.type === "image") {
              return (
                <g key={clipId} clipPath={`url(#${clipId})`}>
                  {/* Grey placeholder — replace rect with <image> when real photos are ready */}
                  <rect x={x} y={y} width={PW} height={PH} fill="#d1d5db" />
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
                <rect x={x} y={y} width={PW} height={PH} fill={p.color} />
                <foreignObject
                  x={x + 18}
                  y={y + 18}
                  width={PW - 36}
                  height={PH - 36}
                >
                  {/* xmlns required for foreignObject HTML content */}
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
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

          {/* ── White joint lines drawn on top of every piece border ── */}
          {pieces.map((p) => (
            <path
              key={`border-${p.row}-${p.col}`}
              d={buildPath(p)}
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
