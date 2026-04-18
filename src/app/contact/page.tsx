import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryFormSection from "@/components/EnquiryFormSection";
import ContactMapsSection from "@/components/ContactMapsSection";
import FadeUp from "@/components/FadeUp";

const contactDetails = [
  {
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "hello@uktiearlyyears.com",
    href: "mailto:hello@uktiearlyyears.com",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "Delhi  •  Noida",
    href: "#maps",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Hours",
    value: "Mon – Fri: 1:30 PM – 3:30 PM\nSat: 11:00 AM – 2:00 PM",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/uktiearlyyears",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/uktiearlyyears",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@uktiearlyyears",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919876543210",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0a11.9 11.9 0 0 0-10.2 18l-1.7 6 6.2-1.6a11.9 11.9 0 0 0 5.7 1.4h.1A11.9 11.9 0 0 0 24 12a11.8 11.8 0 0 0-3.5-8.5zM12 21.4a9.4 9.4 0 0 1-4.8-1.3l-.4-.2-3.7 1 1-3.6-.2-.4A9.5 9.5 0 1 1 21.5 12 9.4 9.4 0 0 1 12 21.4zm5.2-7.1c-.3-.1-1.7-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.7 7.7 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5c.1-.1.1-.2.2-.4s0-.3 0-.4-.6-1.4-.8-1.9-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.6 4 5 5 0 0 0 3 .6 2.8 2.8 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-white px-6 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#F6892A] mb-4">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto">
              We&apos;d love to hear from you. Whether you want to book a tour,
              ask about admissions, or just say hello — reach out anytime.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Contact details + socials */}
      <section className="pt-16 md:pt-20 pb-8 md:pb-10 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {contactDetails.map((item, i) => {
              const Card = (
                <div className="h-full bg-[#F2DA36]/10 border border-[#F2DA36]/50 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#F6892A] text-white flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">
                      {item.label}
                    </p>
                    <p className="text-base md:text-lg font-semibold text-gray-900 leading-snug whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return (
                <FadeUp key={item.label} delay={i * 0.1}>
                  {item.href ? (
                    <a href={item.href} className="block h-full">
                      {Card}
                    </a>
                  ) : (
                    Card
                  )}
                </FadeUp>
              );
            })}
          </div>

          {/* Social links */}
          <FadeUp delay={0.2}>
            <div className="mt-10 md:mt-12 text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#5EA85B] mb-2">
                Follow our journey
              </h2>
              <p className="text-gray-700 mb-6">
                Stay updated with stories, events, and little moments from Ukti.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-12 h-12 rounded-full bg-[#F6892A] text-white flex items-center justify-center hover:bg-[#F6892A] hover:scale-110 transition-all shadow-sm"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Enquiry form */}
      <EnquiryFormSection />

      {/* Maps */}
      <ContactMapsSection />

      <Footer />
    </main>
  );
}
