import Image from "next/image";
import {
  ArrowRight,
  Calculator,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { QuickLeadForm } from "@/components/interactive/quick-lead-form";
import { ProductionCircuit } from "@/components/interactive/production-circuit";
import type { CaseMosaicItem } from "@/components/interactive/case-mosaic";
import { HeroHeadline } from "@/components/interactive/hero-headline";
import { HeroScrollGate } from "@/components/interactive/hero-scroll-gate";
import type { Locale, SiteData } from "@/data/site";

const heroCaseOrder = [
  "sapsanex-mini-app",
  "subscription-bot",
  "seedream-tryon",
  "bybit-trading-bot",
  "skillup",
  "ai-reply-assistant",
] as const;

const heroCaseFragments: Record<(typeof heroCaseOrder)[number], string> = {
  "sapsanex-mini-app": "1",
  "subscription-bot": "5",
  "seedream-tryon": "2",
  "bybit-trading-bot": "preview_sq",
  skillup: "preview_sq",
  "ai-reply-assistant": "1",
};

export function Hero({
  cases,
  locale,
  site,
}: {
  cases: SiteData["cases"];
  locale: Locale;
  site: SiteData;
}) {
  const { ui } = site;
  const circuitItems = getHeroCircuitItems(locale, cases);

  return (
    <section
      id="top"
      className="cinematic-hero section-shell section-deep relative isolate overflow-hidden border-b border-[var(--stroke-subtle)]"
    >
      <HeroScrollGate />
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#040505_0%,#070807_48%,#090908_100%)]" />
      <Image
        src="/images/engineering-command-center.webp"
        alt=""
        aria-hidden
        fill
        preload
        quality={70}
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-[0.07] saturate-0"
      />
      <div className="hero-grid absolute inset-0 -z-10 opacity-30" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(4,5,5,0.98)_0%,rgba(4,5,5,0.82)_42%,rgba(4,5,5,0.18)_100%),radial-gradient(circle_at_72%_48%,rgba(125,211,252,0.02)_0%,rgba(4,5,5,0.25)_42%,rgba(4,5,5,0.92)_86%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />

      <div className="hero-sticky-viewport relative z-10">
        <div className="hero-stage-layout site-container">
          <Reveal variant="hero" className="hero-copy">
            <div className="tag-pill tag-pill-signal mb-7 gap-2 bg-black/20">
              <span className="dot-signal" />
              {ui.hero.badge}
            </div>

            <HeroHeadline lines={ui.hero.headline} />

            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
              {ui.hero.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="#quick-lead"
                icon={<MessageCircle size={18} />}
                className="sm:min-w-48"
                data-site-event="hero_primary_cta_click"
              >
                {ui.hero.primaryCta}
              </ButtonLink>
              <ButtonLink
                href="#estimator"
                variant="secondary"
                icon={<Calculator size={18} />}
                className="sm:min-w-44"
              >
                {ui.hero.secondaryCta}
              </ButtonLink>
            </div>

            <div id="quick-lead" className="hero-quick-lead surface-tool">
              <QuickLeadForm
                compact
                contacts={site.contacts}
                copy={ui.quickLead}
                source="hero"
              />
            </div>
          </Reveal>

          <Reveal delay={0.18} variant="panel" className="hero-visual">
            <ProductionCircuit items={circuitItems} />
          </Reveal>
        </div>

        <div className="hero-trust-dock site-container">
          <div className="hero-trust-bar" aria-label={ui.hero.bottomNote}>
            {ui.hero.trustBar.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <a href="#cases" className="hero-next-proof">
            <span>{ui.hero.bottomNote}</span>
            <ArrowRight size={16} />
            <span>{ui.cases.eyebrow}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function getHeroCircuitItems(
  locale: Locale,
  cases: SiteData["cases"],
): CaseMosaicItem[] {
  const bySlug = new Map(cases.map((item) => [item.slug, item]));

  return heroCaseOrder
    .map((slug) => {
      const item = bySlug.get(slug);
      if (!item) return null;

      return {
        accent: item.preview.accent,
        label: item.preview.label,
        slug: item.slug,
        src: `/cases/${locale}/${item.slug}/${heroCaseFragments[slug]}.webp`,
        title: item.title,
      };
    })
    .filter((item): item is CaseMosaicItem => Boolean(item));
}
