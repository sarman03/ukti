// Each row contains ITEM_COUNT placeholder cards, duplicated for a seamless loop.
// Row 1 scrolls left→right. Row 2 scrolls right→left.
// CSS keyframes (marquee-ltr / marquee-rtl) are defined in globals.css.

const ITEMS_PER_ROW = 6;

const row1 = Array.from({ length: ITEMS_PER_ROW }, (_, i) => i + 1);
const row2 = Array.from({ length: ITEMS_PER_ROW }, (_, i) => i + 1);

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-white overflow-hidden">
      <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-12">
        Gallery
      </h2>

      {/* Row 1 — left to right */}
      <div className="overflow-hidden mb-4">
        <div className="flex gap-4 w-max animate-marquee-ltr">
          {/* Items duplicated so the scroll loops seamlessly */}
          {[...row1, ...row1].map((n, i) => (
            <div
              key={i}
              className="w-56 h-44 bg-gray-300 rounded-2xl flex-shrink-0 flex items-center justify-center"
            >
              <span className="text-gray-400 text-xs font-medium">Photo {n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="overflow-hidden">
        <div className="flex gap-4 w-max animate-marquee-rtl">
          {[...row2, ...row2].map((n, i) => (
            <div
              key={i}
              className="w-56 h-44 bg-gray-300 rounded-2xl flex-shrink-0 flex items-center justify-center"
            >
              <span className="text-gray-400 text-xs font-medium">Photo {n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
