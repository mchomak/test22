import { Layers3 } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { CaseShowcaseLoader } from "@/components/sections/cases-showcase-loader";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale, SiteData } from "@/data/site";

type CasesData = Pick<SiteData, "cases" | "ui">;

export function Cases({
  data,
  locale,
}: {
  data: CasesData;
  locale: Locale;
}) {
  const showcaseCases = data.cases;
  const copy = data.ui.cases;

  return (
    <section id="cases" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <Reveal>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              {copy.intro}
            </p>
            <Link href={`/${locale}/cases`} className="case-showcase-library-link">
              <Layers3 size={16} />
              {copy.allCases}
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <CaseShowcaseLoader
            cases={showcaseCases}
            copy={copy}
            locale={locale}
          />
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#quick-lead" variant="primary">
              {copy.discussCta}
            </ButtonLink>
            <ButtonLink href="#estimator" variant="secondary">
              {copy.estimateCta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
