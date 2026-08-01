import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  Layers3,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import { CaseGallery } from "@/components/case-gallery";
import { ReferenceLeadButton } from "@/components/interactive/reference-lead-modal";
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
import { notFound } from "next/navigation";

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
      <main id="top" className="min-h-screen bg-[#050607] pt-16 text-white">
        <section className="section-shell bg-[#090a0a]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}/#cases`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:border-emerald-300/35 hover:text-white"
            >
              <ArrowLeft size={16} />
              {ui.casesPage.backHome}
            </Link>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
                  {ui.casesPage.eyebrow}
                </p>
                <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl">
                  {ui.casesPage.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
                  {ui.casesPage.description}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-[#0d1713]/72 p-5 backdrop-blur-md">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                  {cases.length} {ui.casesPage.countLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
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
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-[11px] text-zinc-400 transition hover:border-cyan-200/35 hover:text-cyan-50"
                >
                  {item.category} · {getCaseNavTitle(item.title)}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="bg-[#0b0d0c]">
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
  const { ui } = site;
  const copy = ui.casesPage;

  return (
    <article
      id={item.slug}
      className="scroll-mt-24 border-t border-white/10 py-16 first:border-t-0 lg:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">
              {item.category} / {item.type}
            </span>
          </div>

          <h2 className="mt-5 max-w-4xl text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {item.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            {item.shortSummary}
          </p>
        </div>

        <aside className="grid gap-3">
          <Fact label={copy.timeframe} value={item.timeframe} />
          <Fact label={copy.keyResult} value={item.keyResult} />
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {copy.stack}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[11px] text-zinc-400"
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
          <div className="rounded-2xl border border-cyan-200/15 bg-[#07110f]/72 p-5">
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              <CheckCircle2 size={16} className="text-emerald-300" />
              {copy.outcomes}
            </p>
            <div className="grid gap-2">
              {item.metrics.map((metric) => (
                <span
                  key={metric}
                  className="border-l border-cyan-200/25 bg-white/[0.035] px-3 py-2 text-sm leading-5 text-zinc-300"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              {copy.cta}
            </p>
            <div className="mt-4 grid gap-3">
              <ReferenceLeadButton
                caseTitle={item.title}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-300 px-5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(110,231,183,0.16)] transition duration-300 hover:bg-emerald-200 hover:shadow-[0_0_52px_rgba(110,231,183,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                <span>{copy.wantSimilar}</span>
                <ArrowRight size={18} className="transition duration-300 group-hover:translate-x-0.5" />
              </ReferenceLeadButton>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-200">{value}</p>
    </div>
  );
}

function TextSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <div key={item} className="border-l border-emerald-300/25 pl-4">
            <p className="text-sm leading-6 text-zinc-300">{item}</p>
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
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#07110f]/72 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, index) => (
            <span
              key={`${step}-${index}`}
              className="inline-flex items-center gap-2"
            >
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.07] px-3 py-2 font-mono text-[11px] text-cyan-50/80">
                {step}
              </span>
              {index < steps.length - 1 ? (
                <ArrowRight size={15} className="text-emerald-300/70" />
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
        <h3 className="text-2xl font-semibold text-white">
          {copy.sections.media}
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          {copy.mediaNote}
        </span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {item.media.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
          >
            <div className="flex items-center gap-2 text-zinc-200">
              <span className="text-emerald-300">
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
                  className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-zinc-400"
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
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.title}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
          >
            <p className="text-sm font-semibold text-zinc-100">{challenge.title}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
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
