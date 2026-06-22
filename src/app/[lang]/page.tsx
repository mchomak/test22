import { Cases } from "@/components/sections/cases";
import { HashScroller } from "@/components/hash-scroller";
import { ScrollOrb } from "@/components/effects/scroll-orb";
import { SiteEffects } from "@/components/effects/site-effects";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA, Footer } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { MobileContactBar } from "@/components/sections/mobile-contact-bar";
import { ProductionFlow } from "@/components/sections/production-flow";
import { ProjectConfigurator } from "@/components/sections/project-configurator";
import { SiteHeader } from "@/components/sections/site-header";
import { Specialization } from "@/components/sections/specialization";
import { Testimonials } from "@/components/sections/testimonials";
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
    contacts: site.contacts,
    cases: localizeCaseImages(locale, site.cases),
    ui: site.ui,
  };

  return (
    <>
      <SiteEffects />
      <HashScroller />
      <ScrollOrb />
      <SiteHeader locale={locale} site={site} />
      <MobileContactBar site={site} />
      <main className="site-main">
        <Hero cases={casesData.cases} locale={locale} site={site} />
        <Cases data={casesData} locale={locale} />
        <Specialization site={site} />
        <ProductionFlow site={site} />
        <ProjectConfigurator site={site} />
        <Testimonials site={site} />
        <FAQ site={site} />
        <FinalCTA site={site} />
      </main>
      <Footer site={site} />
    </>
  );
}
