import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ClassroomSection from "@/components/ClassroomSection";
import GallerySection from "@/components/GallerySection";
import LearningGoalsSection from "@/components/LearningGoalsSection";
import SafetyFacilitiesSection from "@/components/SafetyFacilitiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EnquiryFormSection from "@/components/EnquiryFormSection";
import MapsSection from "@/components/MapsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

// All scrolling sections in order. They'll be wrapped in sticky containers
// with increasing z-index so each new section slides UP and overlaps the
// previous one as the user scrolls.
const sections = [
  HeroSection,
  AboutSection,
  WhyChooseSection,
  ClassroomSection,
  GallerySection,
  LearningGoalsSection,
  SafetyFacilitiesSection,
  TestimonialsSection,
  EnquiryFormSection,
  MapsSection,
  CTASection,
];

export default function Home() {
  return (
    <main>
      <Navbar />
      {sections.map((Section) => (
        <div key={Section.name} className="relative bg-white">
          <Section />
        </div>
      ))}
      <Footer />
    </main>
  );
}
