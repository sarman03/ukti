import FadeUp from "@/components/FadeUp";

const locations = [
  {
    label: "Delhi",
    address: "Ukti Early Years, Delhi",
    placeholder: "bg-gray-300",
    // Replace placeholder div with an iframe when ready:
    // embedSrc: "https://www.google.com/maps/embed?pb=...",
  },
  {
    label: "Noida",
    address: "Ukti Early Years, Noida",
    placeholder: "bg-[#8b8178]",
  },
];

export default function ContactMapsSection() {
  return (
    <section id="maps" className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-green-700 mb-3">
            Visit Us
          </h2>
          <p className="text-center text-gray-700 mb-10 md:mb-12">
            Find us at our two locations.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-10 md:gap-14">
          {locations.map((loc, i) => (
            <FadeUp key={loc.label} delay={i * 0.1}>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-extrabold text-xl md:text-2xl text-gray-900 leading-tight">
                      {loc.label}
                    </h3>
                    <p className="text-sm text-gray-600">{loc.address}</p>
                  </div>
                </div>
                <div
                  className={`${loc.placeholder} w-full h-72 md:h-96 rounded-2xl overflow-hidden flex items-center justify-center`}
                >
                  <span className="text-white/70 text-sm font-medium">
                    Map Placeholder — {loc.label}
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
