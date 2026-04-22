import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – Our Story, Mission & Founders",
  description:
    "Meet the founders of Ukti Early Years – Nikita Sharma and Adeeba Arif. Learn about our story, mission, teaching philosophy, and the nurturing micro preschool environment we have built in Delhi and Noida since 2021.",
  openGraph: {
    title: "About Ukti Early Years | Micro Preschool Delhi & Noida",
    description:
      "Founded in 2021, Ukti Early Years is a micro preschool blending Montessori and play-based learning. Meet our founders and discover what makes us different.",
    url: "https://www.uktiearlyyears.in/about",
  },
  alternates: {
    canonical: "https://www.uktiearlyyears.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
