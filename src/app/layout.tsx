import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://www.uktiearlyyears.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ukti Early Years | Micro Preschool in Delhi & Noida",
    template: "%s | Ukti Early Years",
  },
  description:
    "Ukti Early Years is a thoughtfully designed micro preschool in Delhi and Noida offering play-based, Montessori-inspired learning for toddlers and preschoolers aged 15 months to 5 years. Small groups, 1:6 teacher ratio, personalised attention.",
  keywords: [
    "preschool Delhi",
    "preschool Noida",
    "micro preschool Delhi",
    "play-based preschool Delhi Noida",
    "Montessori preschool Delhi",
    "early childhood education Delhi NCR",
    "toddler program Delhi",
    "nursery school Noida",
    "best preschool Delhi NCR",
    "Ukti Early Years",
  ],
  authors: [{ name: "Ukti Early Years" }],
  creator: "Ukti Early Years",
  publisher: "Ukti Early Years",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Ukti Early Years",
    title: "Ukti Early Years | Micro Preschool in Delhi & Noida",
    description:
      "A warm, intimate micro preschool in Delhi & Noida where children Learn, Express, and Grow through play-based and Montessori-inspired learning. Small groups, personalised attention.",
    images: [
      {
        url: "/logo/Ukti-favicon.png",
        width: 1200,
        height: 630,
        alt: "Ukti Early Years – Micro Preschool in Delhi & Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ukti Early Years | Micro Preschool in Delhi & Noida",
    description:
      "A warm, intimate micro preschool in Delhi & Noida where children Learn, Express, and Grow through play-based and Montessori-inspired learning.",
    images: ["/logo/Ukti-favicon.png"],
  },
  icons: {
    icon: [
      { url: "/logo/Ukti-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/Ukti-favicon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/logo/Ukti-favicon.png",
    apple: "/logo/Ukti-favicon.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DTK2EK8TKV"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DTK2EK8TKV');
        `}
      </Script>
      <body className="min-h-full flex flex-col font-baloo">{children}</body>
    </html>
  );
}
