import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import DoneForYouSection from "@/components/DoneForYouSection";
import VideoSection from "@/components/VideoSection";
import PricingSection from "@/components/PricingSection";
import RestStopSection from "@/components/RestStopSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import FaqSection from "@/components/FaqSection";
import CtaFooterSection from "@/components/CtaFooterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <VideoSection />
        <DoneForYouSection />
        <PricingSection />
        <RestStopSection />
        <GuaranteeSection />
        <FaqSection />
        <CtaFooterSection />
      </main>
      <Footer />
    </>
  );
}
