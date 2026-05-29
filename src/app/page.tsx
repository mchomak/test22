import { Cases } from "@/components/sections/cases";
import { BootSequence } from "@/components/effects/boot-sequence";
import { SectionBridge } from "@/components/effects/section-bridge";
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
      <SiteHeader />
      <main>
        <Hero />
        <SectionBridge from="hero" to="system map" tone="emerald" />
        <SystemShowcase />
        <SectionBridge from="system map" to="specialization" tone="cyan" />
        <Specialization />
        <SectionBridge from="directions" to="cases" tone="amber" />
        <Cases />
        <SectionBridge from="cases" to="packages" tone="cyan" />
        <Services />
        <SectionBridge from="commercial scope" to="delivery pipeline" tone="emerald" />
        <Process />
        <SectionBridge from="pipeline" to="trust" tone="amber" />
        <Trust />
        <Testimonials />
        <SectionBridge from="proof" to="faq" tone="cyan" />
        <FAQ />
        <SectionBridge from="faq" to="contact" tone="emerald" />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
