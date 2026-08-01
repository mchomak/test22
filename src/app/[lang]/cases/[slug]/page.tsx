import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ImageIcon } from "lucide-react";
import { CaseGallery } from "@/components/case-gallery";
import { Footer } from "@/components/sections/final-cta";
import { SiteHeader } from "@/components/sections/site-header";
import { ButtonLink } from "@/components/ui/button-link";
import { getPortfolioCase, portfolioCases } from "@/data/portfolio-cases";
import { getLocaleFromParams, getSiteData, locales, type Locale } from "@/data/site";

type PageParams = { lang: string; slug: string };

const sectionKeys = [
  "task",
  "delivered",
  "flow",
  "functions",
  "considerations",
  "result",
] as const;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    portfolioCases.map((item) => ({ lang, slug: item.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = getLocaleFromParams({ lang });
  const item = getPortfolioCase(slug);

  if (!locale || !item) return {};

  const content = item[locale];
  const title = `${content.title} — ${locale === "ru" ? "кейс" : "case study"}`;
  const description = content.summary;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/cases/${item.slug}`,
      languages: Object.fromEntries(
        locales.map((language) => [language, `/${language}/cases/${item.slug}`]),
      ),
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: locale === "ru" ? "ru_RU" : "en_US",
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { lang, slug } = await params;
  const locale = getLocaleFromParams({ lang });
  const item = getPortfolioCase(slug);

  if (!locale || !item) notFound();

  const site = getSiteData(locale);
  const content = item[locale];
  const copy = getCopy(locale);
  const media = item.media;
  const galleryImages =
    media.kind === "gallery"
      ? media.files.map((file) => ({
          src: `/cases/${locale}/${media.folder}/${file}`,
          alt: `${content.title} ${copy.mediaAlt}`,
          label: file.replace(/\.[^.]+$/, ""),
        }))
      : null;

  return (
    <>
      <SiteHeader locale={locale} site={site} />
      <main id="top" className="min-h-screen bg-[#050607] pt-16 text-white">
        <section className="section-shell bg-[#090a0a]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href={`/${locale}/#cases`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:border-emerald-300/35 hover:text-white"
            >
              <ArrowLeft size={16} />
              {copy.back}
            </Link>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200">
                    {item.projectKind === "commercial" ? copy.commercial : copy.personal}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                    {content.type}
                  </span>
                </div>
                <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl">
                  {content.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">
                  {content.summary}
                </p>
              </div>

              <aside className="rounded-2xl border border-emerald-300/20 bg-[#0d1713]/72 p-5 backdrop-blur-md">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {copy.client}
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">{localizeClient(item.client, locale)}</p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {copy.technology}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </aside>
            </div>

            {galleryImages ? (
              <CaseGallery copy={site.ui.gallery} images={galleryImages} preload />
            ) : (
              <MediaPlaceholder title={content.title} copy={copy} />
            )}
          </div>
        </section>

        <section className="bg-[#0b0d0c]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="grid gap-14">
                {sectionKeys.map((key) => (
                  <CaseSection
                    key={key}
                    title={copy.sections[key]}
                    items={content.sections[key]}
                    flow={key === "flow"}
                  />
                ))}
              </div>

              <aside className="h-fit rounded-2xl border border-cyan-200/15 bg-[#07110f]/72 p-5 lg:sticky lg:top-24">
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  {copy.resultLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{content.summary}</p>
                <ButtonLink
                  href={`/${locale}/?referenceCase=${item.slug}#request`}
                  className="mt-5 w-full"
                  icon={<ArrowRight size={18} />}
                >
                  {copy.cta}
                </ButtonLink>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer site={site} />
    </>
  );
}

function CaseSection({
  title,
  items,
  flow = false,
}: {
  title: string;
  items: string[];
  flow?: boolean;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {flow ? (
        <ol className="mt-5 grid gap-3">
          {items.map((item, index) => (
            <li
              key={item}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-200/25 bg-cyan-200/[0.07] font-mono text-xs text-cyan-50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-sm leading-6 text-zinc-300">{item}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <div key={item} className="border-l border-emerald-300/25 pl-4">
              <p className="text-sm leading-6 text-zinc-300">{item}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function MediaPlaceholder({
  title,
  copy,
}: {
  title: string;
  copy: ReturnType<typeof getCopy>;
}) {
  return (
    <div className="mt-8 grid aspect-[16/9] place-items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.025] p-6 text-center">
      <div>
        <ImageIcon className="mx-auto text-emerald-300/70" size={32} />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
          {copy.mediaPlaceholder}
        </p>
        <p className="mt-2 text-sm text-zinc-500">{title}</p>
      </div>
    </div>
  );
}

function getCopy(locale: Locale) {
  return locale === "ru"
    ? {
        back: "Ко всем кейсам",
        commercial: "Коммерческий проект",
        personal: "Собственный продукт",
        client: "Заказчик / статус",
        technology: "Технологии",
        mediaAlt: "— материалы кейса",
        mediaPlaceholder: "Медиа будет добавлено",
        resultLabel: "Кратко о кейсе",
        cta: "Заказать похожий проект",
        sections: {
          task: "Задача",
          delivered: "Что было разработано",
          flow: "Как работает система",
          functions: "Основные функции",
          considerations: "Особенности реализации",
          result: "Результат",
        },
      }
    : {
        back: "All cases",
        commercial: "Commercial project",
        personal: "Personal product",
        client: "Client / status",
        technology: "Technologies",
        mediaAlt: "— case material",
        mediaPlaceholder: "Media will be added",
        resultLabel: "Case summary",
        cta: "Order a similar project",
        sections: {
          task: "Task",
          delivered: "What was built",
          flow: "How the system works",
          functions: "Key features",
          considerations: "Implementation considerations",
          result: "Result",
        },
      };
}

function localizeClient(client: string, locale: Locale) {
  if (locale === "ru") return client;
  if (client === "Private client") return "Private client";
  if (client === "Personal product") return "Personal product";
  if (client === "ООО МСК Авиа") return "MCK Avia LLC";
  return client;
}
