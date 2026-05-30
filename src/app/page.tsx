import { Cases } from "@/components/sections/cases";
import { BootSequence } from "@/components/effects/boot-sequence";
import { ScrollOrb } from "@/components/effects/scroll-orb";
import { SiteEffects } from "@/components/effects/site-effects";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA, Footer } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { SiteHeader } from "@/components/sections/site-header";
import { Specialization } from "@/components/sections/specialization";
import { SystemShowcase } from "@/components/sections/system-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { Trust } from "@/components/sections/trust";

export default function Home() {
  return (
    <>
      <BootSequence />
      <SiteEffects />
      <ScrollOrb />
      <SiteHeader />
      <main>
        <Hero />
        <SystemShowcase />
        <Specialization />
        <Cases />
        <Services />
        <Process />
        <Trust />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
