import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { JoinSection } from "@/components/JoinSection";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { TaglineSection } from "@/components/TaglineSection";
import { WhyLocalJobSection } from "@/components/WhyLocalJobSection";
import { WorkerGridSection } from "@/components/WorkerGridSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <HowItWorksSection />
      <TaglineSection />
      <WorkerGridSection />
      <WhyLocalJobSection />
      <JoinSection />
      <Footer />
    </>
  );
}
