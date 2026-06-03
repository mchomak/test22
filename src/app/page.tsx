import { Cases } from "@/components/sections/cases";
import { BootSequence } from "@/components/effects/boot-sequence";
import { ScrollOrb } from "@/components/effects/scroll-orb";
import { SiteEffects } from "@/components/effects/site-effects";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA, Footer } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { ProjectConfigurator } from "@/components/sections/project-configurator";
import { Services } from "@/components/sections/services";
import { SiteHeader } from "@/components/sections/site-header";
import { Specialization } from "@/components/sections/specialization";
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
        <Specialization />
        <Trust />
        <ProjectConfigurator />
        <Process />
        <Cases />
        <Services />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
