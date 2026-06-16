"use client";

import { ArrowUpRight, Calculator } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale, SiteData } from "@/data/site";

type CaseShowcaseCopy = Pick<
  SiteData["ui"]["cases"],
  "details" | "openCase" | "outcomesAria" | "similar"
>;

const showcaseCaseSlugs = [
  "sapsanex-mini-app",
  "subscription-bot",
  "seedream-tryon",
  "ai-reply-assistant",
  "bybit-trading-bot",
  "skillup",
];

export function CaseShowcase({
  cases,
  copy,
  locale,
}: {
  cases: SiteData["cases"];
  copy: CaseShowcaseCopy;
  locale: Locale;
}) {
  const showcaseCases = getShowcaseCases(cases);

  if (!showcaseCases.length) {
    return null;
  }

  return (
    <div className="case-showcase-shell case-editorial-showcase">
      <div className="case-lane-grid">
        {showcaseCases.map((item, index) => (
          <CaseTile
            key={item.slug}
            copy={copy}
            index={index + 1}
            item={item}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}

function CaseTile({
  copy,
  index,
  item,
  locale,
}: {
  copy: CaseShowcaseCopy;
  index: number;
  item: SiteData["cases"][number];
  locale: Locale;
}) {
  return (
    <article
      className="case-tile"
      style={{ "--case-accent": item.preview.accent } as CSSProperties}
    >
      <Link
        href={`/${locale}/cases#${item.slug}`}
        className="case-tile-media"
        style={{ "--case-image": `url("${item.coverImage}")` } as CSSProperties}
        aria-label={`${copy.openCase}: ${item.title}`}
      >
        <Image
          src={item.coverImage}
          alt={item.coverAlt}
          fill
          sizes="(max-width: 680px) 94vw, (max-width: 1200px) 48vw, (min-width: 1600px) 840px, 46vw"
          className="case-tile-image"
        />
        <CaseGlitchLayers />
        <span className="case-media-sheen" aria-hidden="true" />
        <CaseAssetOverlay item={item} />
      </Link>

      <div className="case-tile-copy">
        <div className="case-card-kicker">
          <span>{String(index).padStart(2, "0")}</span>
          <span>{item.type}</span>
        </div>
        <h3 className="case-tile-title">{item.title}</h3>
        <p className="case-tile-result">{item.keyResult}</p>
        <Tags ariaLabel={copy.outcomesAria} tags={item.outcomes.slice(0, 3)} />
      </div>

      <div className="case-tile-footer">
        <Link
          href={`/${locale}/cases#${item.slug}`}
          className="case-tile-link"
        >
          {copy.details}
          <ArrowUpRight size={15} />
        </Link>
        <Link
          href={buildLocalizedEstimatorHref(locale, item)}
          className="case-tile-link case-tile-link-muted"
        >
          <Calculator size={15} />
          {copy.similar}
        </Link>
      </div>
    </article>
  );
}

function CaseGlitchLayers() {
  return (
    <>
      <span
        className="case-glitch-layer case-glitch-layer-cyan"
        aria-hidden="true"
      />
      <span
        className="case-glitch-layer case-glitch-layer-warm"
        aria-hidden="true"
      />
      <span className="case-glitch-scan" aria-hidden="true" />
    </>
  );
}

function CaseAssetOverlay({
  item,
}: {
  item: SiteData["cases"][number];
}) {
  const stats = item.preview.stats.slice(0, 1);

  return (
    <span className="case-asset-overlay">
      <span className="case-asset-label">{item.preview.label}</span>
      <span className="case-asset-stats">
        {stats.map((stat) => (
          <span key={stat}>{stat}</span>
        ))}
      </span>
    </span>
  );
}

function Tags({
  ariaLabel,
  tags,
}: {
  ariaLabel: string;
  tags: string[];
}) {
  return (
    <div className="case-editorial-tags" aria-label={ariaLabel}>
      {tags.map((tag) => (
        <span key={tag} className="case-editorial-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}

function getShowcaseCases(cases: SiteData["cases"]) {
  const bySlug = new Map(cases.map((item) => [item.slug, item]));
  const preferredCases = showcaseCaseSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is SiteData["cases"][number] => Boolean(item));

  if (preferredCases.length >= 6) {
    return preferredCases;
  }

  const fallbackCases = cases.filter(
    (item) => !preferredCases.some((preferred) => preferred.slug === item.slug),
  );

  return [...preferredCases, ...fallbackCases].slice(0, 6);
}

function buildLocalizedEstimatorHref(
  locale: Locale,
  item: SiteData["cases"][number],
) {
  const params = new URLSearchParams({
    estimateType: item.estimatorPreset.type,
    estimateComplexity: item.estimatorPreset.complexity,
    estimateModules: item.estimatorPreset.modules.join(","),
    estimateCase: item.slug,
  });

  return `/${locale}/?${params.toString()}#estimator`;
}
