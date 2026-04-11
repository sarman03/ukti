// Replace the grey placeholder divs with <iframe> Google Maps embeds
// when real locations are available. Each iframe should have:
//   src="https://www.google.com/maps/embed?pb=..." width="100%" height="100%"
//   style={{ border: 0 }} allowFullScreen loading="lazy"

const locations = [
  { label: "Delhi", placeholder: "bg-gray-300" },
  { label: "Noida", placeholder: "bg-[#8b8178]" },
];

export default function MapsSection() {
  return (
    <section id="maps" className="py-16 bg-white">
      <h2 className="text-4xl font-extrabold text-center text-green-700 mb-8">
        Maps
      </h2>

      <div className="grid grid-cols-2 max-w-5xl mx-auto">
        {locations.map((loc) => (
          <div key={loc.label}>
            <p className="font-extrabold text-center text-gray-900 mb-2 text-sm tracking-wide">
              {loc.label}
            </p>
            {/* Map placeholder — swap for <iframe> when ready */}
            <div
              className={`${loc.placeholder} h-96 flex items-center justify-center`}
            >
              <span className="text-white/60 text-sm font-medium">
                Map Placeholder — {loc.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
