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

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <ClassroomSection />
      <GallerySection />
      <LearningGoalsSection />
      <SafetyFacilitiesSection />
      <TestimonialsSection />
      <EnquiryFormSection />
      <MapsSection />
      <CTASection />
    </main>
  );
}
