import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  Layers3,
  PlayCircle,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CaseGallery } from "@/components/case-gallery";
import { HashScroller } from "@/components/hash-scroller";
import { Footer } from "@/components/sections/final-cta";
import { SiteHeader } from "@/components/sections/site-header";
import { ButtonLink } from "@/components/ui/button-link";
import {
  getCaseGalleryImages,
  localizeCaseImages,
  type LocalizedCaseGalleryImage,
} from "@/data/case-images";
import {
  getLocaleFromParams,
  getSiteData,
  type CaseStudy,
  type Locale,
  type SiteData,
} from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = getLocaleFromParams(await params);

  if (!locale) return {};

  const site = getSiteData(locale);
  const title = `${site.ui.casesPage.title} | ${site.ui.brandName}`;
  const description = site.ui.casesPage.description;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords: site.meta.keywords,
    alternates: {
      canonical: `/${locale}/cases`,
      languages: {
        ru: "/ru/cases",
        en: "/en/cases",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      url: `/${locale}/cases`,
      images: [
        {
          url: "/images/engineering-command-center.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/engineering-command-center.png"],
    },
  };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = getLocaleFromParams(await params);

  if (!locale) notFound();

  const site = getSiteData(locale);
  const cases = localizeCaseImages(locale, site.cases);
  const { ui } = site;

  return (
    <>
      <SiteHeader locale={locale} site={site} />
      <HashScroller />
      <main id="top" className="min-h-screen bg-[var(--color-bg)] pt-16 text-[var(--text-primary)]">
        <section className="section-shell section-soft">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}/#cases`}
              className="btn-link btn-link-secondary"
            >
              <ArrowLeft size={16} />
              {ui.casesPage.backHome}
            </Link>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
              <div>
                <p className="eyebrow">
                  {ui.casesPage.eyebrow}
                </p>
                <h1 className="section-title mt-4 max-w-4xl">
                  {ui.casesPage.title}
                </h1>
                <p className="section-copy mt-6 max-w-3xl">
                  {ui.casesPage.description}
                </p>
              </div>

              <div className="surface-panel p-5">
                <p className="eyebrow">
                  {cases.length} {ui.casesPage.countLabel}
                </p>
                <p className="body-copy mt-3 text-sm">
                  {ui.casesPage.countDescription}
                </p>
                <ButtonLink href={`/${locale}/#estimator`} className="mt-5 w-full">
                  {ui.casesPage.estimateSimilar}
                </ButtonLink>
              </div>
            </div>

            <nav
              className="mt-10 flex flex-wrap gap-2"
              aria-label={ui.casesPage.navAria}
            >
              {cases.map((item) => (
                <Link
                  key={item.slug}
                  href={`#${item.slug}`}
                  className="tag-pill"
                >
                  {item.category} · {getCaseNavTitle(item.title)}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="section-soft">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            {cases.map((item, index) => (
              <CaseArticle
                key={item.slug}
                item={item}
                index={index}
                locale={locale}
                site={site}
                galleryImages={getCaseGalleryImages(locale, item)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer site={site} />
    </>
  );
}

function CaseArticle({
  galleryImages,
  item,
  index,
  locale,
  site,
}: {
  galleryImages: LocalizedCaseGalleryImage[];
  item: CaseStudy;
  index: number;
  locale: Locale;
  site: SiteData;
}) {
  const { contacts, ui } = site;
  const copy = ui.casesPage;

  return (
    <article
      id={item.slug}
      className="scroll-mt-24 border-t border-[var(--stroke-subtle)] py-16 first:border-t-0 lg:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="tag-pill tag-pill-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="eyebrow-muted accent-signal">
              {item.category} / {item.type}
            </span>
          </div>

          <h2 className="mt-5 max-w-4xl text-balance text-3xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl">
            {item.title}
          </h2>
          <p className="body-copy mt-5 max-w-3xl text-base">
            {item.shortSummary}
          </p>
        </div>

        <aside className="grid gap-3">
          <Fact label={copy.timeframe} value={item.timeframe} />
          <Fact label={copy.keyResult} value={item.keyResult} />
          <div className="surface-card p-4 shadow-none">
            <p className="eyebrow-muted">
              {copy.stack}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="tag-pill"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <CaseGallery
        copy={ui.gallery}
        images={galleryImages}
        preload={index === 0}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-10">
          <TextSection title={copy.sections.context} items={item.context} />
          <TextSection title={copy.sections.modules} items={item.modules} />
          <TextSection
            title={copy.sections.integrations}
            items={item.integrations}
          />
          <ArchitectureFlow
            steps={item.architecture}
            title={copy.sections.architecture}
          />
          <MediaBoard copy={copy} item={item} />
          <ChallengeGrid
            challenges={item.challenges}
            title={copy.sections.challenges}
          />
          <TextSection title={copy.sections.result} items={item.resultDetails} />
        </div>

        <aside className="grid content-start gap-5 lg:sticky lg:top-24">
          <div className="surface-card p-5">
            <p className="eyebrow-muted mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="accent-logic" />
              {copy.outcomes}
            </p>
            <div className="grid gap-2">
              {item.metrics.map((metric) => (
                <span
                  key={metric}
                  className="border-l border-[color:var(--accent-signal)] bg-[var(--surface-base)] px-3 py-2 text-sm leading-5 text-[var(--text-secondary)]"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <div className="surface-card p-5">
            <p className="eyebrow-muted">
              {copy.cta}
            </p>
            <div className="mt-4 grid gap-3">
              <ButtonLink
                href={contacts.telegramUrl}
                target="_blank"
                rel="noreferrer"
                icon={<ArrowRight size={18} />}
              >
                {copy.wantSimilar}
              </ButtonLink>
              <ButtonLink
                href={buildLocalizedEstimatorHref(locale, item)}
                variant="secondary"
                icon={<Layers3 size={18} />}
              >
                {copy.estimateCost}
              </ButtonLink>
              {item.projectUrl ? (
                <ButtonLink
                  href={item.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                  icon={<ExternalLink size={18} />}
                >
                  {copy.openProject}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-4 shadow-none">
      <p className="eyebrow-muted">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{value}</p>
    </div>
  );
}

function TextSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{title}</h3>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <div key={item} className="border-l border-[color:var(--accent-signal)] pl-4">
            <p className="body-copy text-sm">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArchitectureFlow({
  steps,
  title,
}: {
  steps: string[];
  title: string;
}) {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{title}</h3>
      <div className="surface-tool mt-5 overflow-hidden p-4 shadow-none">
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, index) => (
            <span
              key={`${step}-${index}`}
              className="inline-flex items-center gap-2"
            >
              <span className="tag-pill tag-pill-signal">
                {step}
              </span>
              {index < steps.length - 1 ? (
                <ArrowRight size={15} className="accent-signal" />
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaBoard({
  copy,
  item,
}: {
  copy: SiteData["ui"]["casesPage"];
  item: CaseStudy;
}) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
          {copy.sections.media}
        </h3>
        <span className="eyebrow-muted">
          {copy.mediaNote}
        </span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {item.media.map((group) => (
          <div
            key={group.title}
            className="surface-card p-4 shadow-none"
          >
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <span className="accent-signal">
                {group.title.toLowerCase().includes("video") ? (
                  <PlayCircle size={18} />
                ) : (
                  <ImageIcon size={18} />
                )}
              </span>
              <span className="text-sm font-semibold">{group.title}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="tag-pill min-h-0 px-2.5 py-1 text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChallengeGrid({
  challenges,
  title,
}: {
  challenges: CaseStudy["challenges"];
  title: string;
}) {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-[var(--text-primary)]">{title}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.title}
            className="surface-card p-4 shadow-none"
          >
            <p className="text-sm font-semibold text-[var(--text-primary)]">{challenge.title}</p>
            <p className="body-copy mt-2 text-sm">
              {challenge.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function buildLocalizedEstimatorHref(locale: Locale, item: CaseStudy) {
  const params = new URLSearchParams({
    estimateType: item.estimatorPreset.type,
    estimateComplexity: item.estimatorPreset.complexity,
    estimateModules: item.estimatorPreset.modules.join(","),
    estimateCase: item.slug,
  });

  return `/${locale}/?${params.toString()}#estimator`;
}

function getCaseNavTitle(title: string) {
  return title.split(/\s+[—-]\s+/)[0] ?? title;
}
