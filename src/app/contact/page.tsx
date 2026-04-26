import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryFormSection from "@/components/EnquiryFormSection";
import ContactMapsSection from "@/components/ContactMapsSection";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Contact & Admissions – Book a Tour or Enquire",
  description:
    "Get in touch with Ukti Early Years. Book a school tour, submit an admission enquiry, or reach us at our Delhi or Noida branches. Call: Delhi +91 95993 76953 | Noida +91 87969 46469.",
  openGraph: {
    title: "Contact Ukti Early Years | Admissions in Delhi & Noida",
    description:
      "Book a tour or submit an admission enquiry at Ukti Early Years. We are open Mon–Fri 9 AM–5 PM and Saturday 10 AM–3 PM. Delhi and Noida branches.",
    url: "https://www.uktiearlyyears.in/contact",
  },
  alternates: {
    canonical: "https://www.uktiearlyyears.in/contact",
  },
};

const contactDetails = [
  {
    label: "Phone",
    value: "Delhi: +91 95993 76953\nNoida: +91 87969 46469",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "Info@uktiearlyyears.in",
    href: "mailto:Info@uktiearlyyears.in",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "Delhi: W-1, Ground Floor, Greater Kailash 1, 110048\nNoida: B-185, Sec 108, Noida, 201304",
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
    value: "Mon – Fri: 9:00 AM – 5:00 PM\nSat: 10:00 AM – 3:00 PM",
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
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ukti-early-years/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1zM8.3 18.6H5.58V9.8H8.3v8.8zm4.35-8.8h-2.6v8.8h2.72v-4.62c0-2.58 3.36-2.82 3.36 0v4.62h2.73v-5.56c0-4.33-4.9-4.17-6.2-2.04V9.8z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ukti.creativeartscentre",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-white px-6 pt-36 pb-6 md:pt-44 md:pb-8">
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
      <section className="pt-4 md:pt-6 pb-8 md:pb-10 px-4 md:px-8 bg-white">
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
