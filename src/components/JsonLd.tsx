const SITE_URL = "https://www.uktiearlyyears.in";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Ukti Early Years",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/Ukti _ Logo.png`,
      },
      email: "hello@uktiearlyyears.in",
      sameAs: [
        "https://instagram.com/uktiearlyyears",
        "https://www.linkedin.com/company/ukti-early-years/",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-95993-76953",
          contactType: "customer service",
          areaServed: "Delhi",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-87969-46469",
          contactType: "customer service",
          areaServed: "Noida",
          availableLanguage: ["English", "Hindi"],
        },
      ],
    },
    {
      "@type": "ChildCare",
      "@id": `${SITE_URL}/#delhi`,
      name: "Ukti Early Years – Delhi",
      description:
        "Ukti Early Years is a micro preschool in Delhi offering play-based, Montessori-inspired early childhood education for toddlers and preschoolers aged 15 months to 5 years.",
      url: SITE_URL,
      telephone: "+91-95993-76953",
      email: "hello@uktiearlyyears.in",
      foundingDate: "2021",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressRegion: "Delhi",
        addressCountry: "IN",
      },
      image: `${SITE_URL}/logo/Ukti _ Logo.png`,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "13:30",
          closes: "15:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "11:00",
          closes: "14:00",
        },
      ],
      priceRange: "$$",
      sameAs: [
        "https://instagram.com/uktiearlyyears",
        "https://www.linkedin.com/company/ukti-early-years/",
      ],
    },
    {
      "@type": "ChildCare",
      "@id": `${SITE_URL}/#noida`,
      name: "Ukti Early Years – Noida",
      description:
        "Ukti Early Years is a micro preschool in Noida offering play-based, Montessori-inspired early childhood education for toddlers and preschoolers aged 15 months to 5 years.",
      url: SITE_URL,
      telephone: "+91-87969-46469",
      email: "hello@uktiearlyyears.in",
      foundingDate: "2021",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      image: `${SITE_URL}/logo/Ukti _ Logo.png`,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "13:30",
          closes: "15:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "11:00",
          closes: "14:00",
        },
      ],
      priceRange: "$$",
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
