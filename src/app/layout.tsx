import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ukti Early Years",
  description: "Fostering the brightest beginnings for young learners.",
  icons: {
    icon: [
      { url: "/logo/Ukti-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/Ukti-favicon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/logo/Ukti-favicon.png",
    apple: "/logo/Ukti-favicon.png",
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
      <body className="min-h-full flex flex-col font-baloo">{children}</body>
    </html>
  );
}
