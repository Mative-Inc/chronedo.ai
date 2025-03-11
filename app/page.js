import BadgeSection from "@/components/BadgeSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Gallery from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";
import WorkSection from "@/components/WorkSection";
import MainLayout from "@/layouts/mainLayout";


export default function Home() {
  return (
    <MainLayout>
    <div className="w-full flex flex-col items-center justify-center px-4">
      {/* <Navbar /> */}
      <HeroSection />
      <Gallery />
      <WorkSection />
      <PricingSection />
      <TestimonialSection />
      <FAQSection />
      {/* <BadgeSection /> */}
      {/* <Footer /> */}
    </div>
    </MainLayout>
  );
}
