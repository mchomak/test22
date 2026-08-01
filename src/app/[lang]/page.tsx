import { Cases } from "@/components/sections/cases";
import { BootSequence } from "@/components/effects/boot-sequence";
import { ScrollOrb } from "@/components/effects/scroll-orb";
import { SiteEffects } from "@/components/effects/site-effects";
import { FinalCTA, Footer } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { MobileContactBar } from "@/components/sections/mobile-contact-bar";
import { Process } from "@/components/sections/process";
import { ProjectConfigurator } from "@/components/sections/project-configurator";
import { SiteHeader } from "@/components/sections/site-header";
import { Specialization } from "@/components/sections/specialization";
import { getLocaleFromParams, getSiteData } from "@/data/site";
import { portfolioCases } from "@/data/portfolio-cases";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = getLocaleFromParams(await params);

  if (!locale) notFound();

  const site = getSiteData(locale);
  return (
    <>
      <BootSequence copy={site.ui.boot} />
      <SiteEffects />
      <ScrollOrb />
      <SiteHeader locale={locale} site={site} />
      <MobileContactBar contacts={site.contacts} copy={site.ui.stickyCta} />
      <main>
        <Hero site={site} />
        <Specialization site={site} />
        <Cases cases={portfolioCases} locale={locale} />
        <ProjectConfigurator site={site} />
        <Process site={site} />
        <FinalCTA site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}
