import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ProcessSteps } from "@/components/sections/process-steps";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { CTABand } from "@/components/sections/cta-band";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <LogoStrip />
      <ServicesGrid />
      <FeaturedWork />
      <ProcessSteps />
      <TechStack />
      <Testimonials />
      <CTABand />
    </div>
  );
}
