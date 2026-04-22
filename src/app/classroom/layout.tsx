import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs – Preschool & After School Classes",
  description:
    "Explore Ukti Early Years' preschool programs for children aged 15 months to 5 years: Toddlers, Pre Nursery, and Nursery. Plus after-school Storytelling and Language & Math programs. Available in Delhi and Noida.",
  openGraph: {
    title: "Preschool Programs | Ukti Early Years Delhi & Noida",
    description:
      "Toddlers (15–23 months), Pre Nursery, Nursery and after-school programs with Montessori and play-based learning for children aged 15 months to 5 years. Delhi & Noida.",
    url: "https://www.uktiearlyyears.com/classroom",
  },
  alternates: {
    canonical: "https://www.uktiearlyyears.com/classroom",
  },
};

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
