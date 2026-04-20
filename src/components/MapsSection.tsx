import FadeUp from "@/components/FadeUp";

type MapLocation = {
  label: string;
  embedSrc?: string;
  mapsHref?: string;
  placeholder?: string;
};

const locations: MapLocation[] = [
  {
    label: "Delhi",
    embedSrc: "https://www.google.com/maps?q=28.5538228,77.2329972&z=17&output=embed",
    mapsHref:
      "https://www.google.com/maps/place/Ukti+Early+Years/@28.5538228,77.2329972,17z/",
  },
  {
    label: "Noida",
    embedSrc: "https://www.google.com/maps?q=28.528498,77.378998&z=17&output=embed",
    mapsHref:
      "https://www.google.com/maps/dir/28.6314,77.222342/28.528498,77.378998/@28.578116,77.1358341,11z/data=!3m1!4b1!4m6!4m5!1m1!4e1!1m1!4e1!3e0",
  },
];

export default function MapsSection() {
  return (
    <section id="maps" className="py-16 bg-white">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-6 md:mb-8">
          Maps
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-8 md:gap-10 px-4 md:px-6">
        {locations.map((loc) => (
          <div key={loc.label}>
            <p className="font-extrabold text-center text-gray-900 mb-2 text-sm tracking-wide">
              {loc.label}
            </p>
            {loc.embedSrc ? (
              <div className="h-64 md:h-96 rounded-2xl overflow-hidden border border-gray-200">
                <iframe
                  title={`${loc.label} map`}
                  src={loc.embedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div
                className={`${loc.placeholder ?? "bg-gray-300"} h-64 md:h-96 rounded-2xl flex items-center justify-center`}
              >
                <span className="text-white/60 text-sm font-medium">
                  Map Placeholder — {loc.label}
                </span>
              </div>
            )}
            {loc.mapsHref ? (
              <a
                href={loc.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm font-semibold text-[#F6892A] hover:underline"
              >
                Open in Google Maps
              </a>
            ) : null}
          </div>
        ))}
      </div>
      </FadeUp>
    </section>
  );
}
