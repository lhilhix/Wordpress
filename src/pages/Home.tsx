import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GridSection from "../components/GridSection";
import HistorySection from "../components/HistorySection";
import FeaturedCarousel from "../components/FeaturedCarousel";
import CTASection from "../components/CTASection";
import ContactSection, { Footer } from "../components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-bfi-red selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <GridSection />
        <HistorySection />
        <FeaturedCarousel />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
