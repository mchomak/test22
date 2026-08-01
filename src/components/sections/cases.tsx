import { ArrowRight, FileText, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReferenceLeadButton } from "@/components/interactive/reference-lead-modal";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PortfolioCase } from "@/data/portfolio-cases";
import type { Locale } from "@/data/site";

export function Cases({
  cases,
  locale,
}: {
  cases: PortfolioCase[];
  locale: Locale;
}) {
  const copy = getCopy(locale);

  return (
    <section id="cases" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item, index) => {
            const content = item[locale];

            return (
              <Reveal key={item.slug} delay={Math.min(index * 0.06, 0.24)}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d1110]/70 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35 hover:bg-[#101715]/78">
                  <CaseMedia item={item} title={content.title} copy={copy} />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-100">
                        {item.projectKind === "commercial"
                          ? copy.commercial
                          : copy.personal}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                        {content.type}
                      </span>
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold leading-tight text-white">
                      {content.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {content.summary}
                    </p>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                        {copy.purpose}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-emerald-100/85">
                        {content.sections.result[0]}
                      </p>
                    </div>

                    <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-2">
                      <Link
                        href={`/${locale}/cases/${item.slug}`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-zinc-100 transition hover:border-white/20 hover:bg-white/[0.08]"
                      >
                        <FileText size={16} />
                        {copy.openCase}
                      </Link>
                      <ReferenceLeadButton
                        caseTitle={content.title}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-300/45 bg-emerald-300 px-4 text-sm font-semibold text-black transition hover:bg-emerald-200"
                      >
                        {copy.orderSimilar}
                        <ArrowRight size={16} />
                      </ReferenceLeadButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseMedia({
  item,
  title,
  copy,
}: {
  item: PortfolioCase;
  title: string;
  copy: ReturnType<typeof getCopy>;
}) {
  if (item.media.kind === "gallery") {
    return (
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black/20">
        <Image
          src={`/cases/${item.media.folder}/${item.media.files[0]}`}
          alt={`${title} — ${copy.imageAlt}`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div className="relative grid aspect-[16/9] place-items-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_75%_15%,rgba(110,231,183,0.16),transparent_34%),linear-gradient(135deg,rgba(16,23,21,0.95),rgba(5,6,7,0.95))] p-6 text-center">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative">
        <ImageIcon className="mx-auto text-emerald-300/75" size={30} />
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
          {copy.mediaPlaceholder}
        </p>
      </div>
    </div>
  );
}

function getCopy(locale: Locale) {
  return locale === "ru"
    ? {
        eyebrow: "Главные кейсы",
        title: "Системы, которые решают конкретные задачи бизнеса",
        description:
          "Шесть проектов: автоматизация, Telegram-сервисы, backend и обработка документов. В каждом кейсе — контекст, реализованные решения и текущий статус.",
        commercial: "Коммерческий проект",
        personal: "Собственный продукт",
        purpose: "Результат / статус",
        openCase: "Посмотреть кейс",
        orderSimilar: "Заказать похожий проект",
        mediaPlaceholder: "Материалы будут добавлены",
        imageAlt: "скриншот проекта",
      }
    : {
        eyebrow: "Featured cases",
        title: "Systems built for specific business tasks",
        description:
          "Six projects across automation, Telegram services, backend and document processing. Each case explains the context, delivered solution and current status.",
        commercial: "Commercial project",
        personal: "Personal product",
        purpose: "Result / status",
        openCase: "View case",
        orderSimilar: "Order a similar project",
        mediaPlaceholder: "Media will be added",
        imageAlt: "project screenshot",
      };
}
