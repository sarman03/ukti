import FadeUp from "@/components/FadeUp";

type ContactLocation = {
  label: string;
  address: string;
  embedSrc?: string;
  mapsHref?: string;
  placeholder?: string;
};

const locations: ContactLocation[] = [
  {
    label: "Delhi",
    address: "W-1, Ground Floor, Greater Kailash 1, 110048",
    embedSrc: "https://www.google.com/maps?q=28.5538228,77.2329972&z=17&output=embed",
    mapsHref:
      "https://www.google.com/maps/place/Ukti+Early+Years/@28.5538228,77.2329972,17z/",
  },
  {
    label: "Noida",
    address: "B-185, Sec 108, Noida, 201304",
    embedSrc: "https://www.google.com/maps?q=28.528498,77.378998&z=17&output=embed",
    mapsHref:
      "https://www.google.com/maps/dir/28.6314,77.222342/28.528498,77.378998/@28.578116,77.1358341,11z/data=!3m1!4b1!4m6!4m5!1m1!4e1!1m1!4e1!3e0",
  },
];

export default function ContactMapsSection() {
  return (
    <section id="maps" className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5EA85B] mb-3">
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
                  <span className="w-10 h-10 rounded-full bg-[#F6892A] text-white flex items-center justify-center">
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
                {loc.embedSrc ? (
                  <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-gray-200">
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
                    className={`${loc.placeholder ?? "bg-gray-300"} w-full h-72 md:h-96 rounded-2xl overflow-hidden flex items-center justify-center`}
                  >
                    <span className="text-white/70 text-sm font-medium">
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
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
