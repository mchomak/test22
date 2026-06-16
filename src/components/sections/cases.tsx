import { Calculator, Layers3, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { CaseShowcase } from "@/components/sections/cases-showcase";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale, SiteData } from "@/data/site";

type CasesData = Pick<SiteData, "cases" | "contacts" | "ui">;

export function Cases({
  data,
  locale,
}: {
  data: CasesData;
  locale: Locale;
}) {
  const showcaseCases = data.cases;
  const copy = data.ui.cases;
  const showcaseCopy = {
    details: copy.details,
    openCase: copy.openCase,
    outcomesAria: copy.outcomesAria,
    similar: copy.similar,
  };

  return (
    <section id="cases" className="section-shell section-deep">
      <div className="cases-proof-inner site-container py-24">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <Reveal>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="body-copy max-w-2xl text-sm">
              {copy.intro}
            </p>
            <Link href={`/${locale}/cases`} className="case-showcase-library-link">
              <Layers3 size={16} />
              {copy.allCases}
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <CaseShowcase
            cases={showcaseCases}
            copy={showcaseCopy}
            locale={locale}
          />
        </Reveal>

        <Reveal>
          <div className="cases-cta-scene" aria-label={copy.nextStepTitle}>
            <div className="cases-cta-actions">
              <span className="cases-cta-motion cases-cta-motion-primary">
                <ButtonLink href="#estimator" icon={<Calculator size={18} />}>
                  {copy.estimateCta}
                </ButtonLink>
              </span>
              <span className="cases-cta-motion cases-cta-motion-secondary">
                <ButtonLink
                  href={data.contacts.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  icon={<MessageCircle size={18} />}
                >
                  {copy.telegramCta}
                </ButtonLink>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
