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
import { localizeCaseImages } from "@/data/case-images";
import { getLocaleFromParams, getSiteData } from "@/data/site";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = getLocaleFromParams(await params);

  if (!locale) notFound();

  const site = getSiteData(locale);
  const casesData = {
    cases: localizeCaseImages(locale, site.cases),
    ui: site.ui,
  };

  return (
    <>
      <BootSequence copy={site.ui.boot} />
      <SiteEffects />
      <ScrollOrb />
      <SiteHeader locale={locale} site={site} />
      <main>
        <Hero site={site} />
        <Specialization site={site} />
        <Trust site={site} />
        <ProjectConfigurator site={site} />
        <Process site={site} />
        <Cases data={casesData} locale={locale} />
        <Services site={site} />
        <FAQ site={site} />
        <FinalCTA site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}
