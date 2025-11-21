import { Hero } from "@/components/sections/Hero";
import { DemoSection } from "@/components/sections/DemoSection";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Creator } from "@/components/sections/Creator";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <DemoSection />
      <Features />
      <Testimonials />
      <Creator />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}
