import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  Layers3,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cases, contacts, type CaseStudy } from "@/data/site";
import { Footer } from "@/components/sections/final-cta";
import { SiteHeader } from "@/components/sections/site-header";
import { ButtonLink } from "@/components/ui/button-link";

export default function CasesPage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="min-h-screen bg-[#050607] pt-16 text-white">
        <section className="section-shell bg-[#090a0a]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Link
              href="/#cases"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition hover:border-emerald-300/35 hover:text-white"
            >
              <ArrowLeft size={16} />
              На главную
            </Link>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
                  Case proof base
                </p>
                <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl">
                  Подробные кейсы: контекст, архитектура, сложности и результат
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
                  На главной кейсы работают как витрина. Здесь каждый проект
                  раскрыт как доказательная база: зачем он был нужен, что было
                  собрано, где были технические риски и какой рабочий результат
                  получился после запуска.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-[#0d1713]/72 p-5 backdrop-blur-md">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                  {cases.length} кейсов
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Telegram-боты, Mini Apps, AI-модули, crypto-автоматизация,
                  backend-сервисы и web-интерфейсы в одном формате.
                </p>
                <ButtonLink href="/#estimator" className="mt-5 w-full">
                  Рассчитать похожий проект
                </ButtonLink>
              </div>
            </div>

            <nav
              className="mt-10 flex flex-wrap gap-2"
              aria-label="Навигация по кейсам"
            >
              {cases.map((item) => (
                <Link
                  key={item.slug}
                  href={`#${item.slug}`}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-[11px] text-zinc-400 transition hover:border-cyan-200/35 hover:text-cyan-50"
                >
                  {item.category} · {item.title.split(" — ")[0]}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="bg-[#0b0d0c]">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            {cases.map((item, index) => (
              <CaseArticle key={item.slug} item={item} index={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CaseArticle({ item, index }: { item: CaseStudy; index: number }) {
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
          <Fact label="Сроки" value={item.timeframe} />
          <Fact label="Ключевой результат" value={item.keyResult} />
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Стек
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

      <CaseCover item={item} preload={index === 0} />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-10">
          <TextSection title="Контекст задачи" items={item.context} />
          <TextSection title="Что было реализовано" items={item.modules} />
          <TextSection
            title="Интеграции и бизнес-логика"
            items={item.integrations}
          />
          <ArchitectureFlow steps={item.architecture} />
          <MediaBoard item={item} />
          <ChallengeGrid challenges={item.challenges} />
          <TextSection title="Результат" items={item.resultDetails} />
        </div>

        <aside className="grid content-start gap-5 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-cyan-200/15 bg-[#07110f]/72 p-5">
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
              <CheckCircle2 size={16} className="text-emerald-300" />
              outcomes
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
              CTA
            </p>
            <div className="mt-4 grid gap-3">
              <ButtonLink
                href={contacts.telegramUrl}
                target="_blank"
                rel="noreferrer"
                icon={<ArrowRight size={18} />}
              >
                Хочу похожий проект
              </ButtonLink>
              <ButtonLink
                href="/#estimator"
                variant="secondary"
                icon={<Layers3 size={18} />}
              >
                Рассчитать стоимость
              </ButtonLink>
              {item.projectUrl ? (
                <ButtonLink
                  href={item.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                  icon={<ExternalLink size={18} />}
                >
                  Открыть проект
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function CaseCover({
  item,
  preload = false,
}: {
  item: CaseStudy;
  preload?: boolean;
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-2 shadow-2xl shadow-black/30">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#030505]">
        <Image
          src={item.coverImage}
          alt={item.coverAlt}
          fill
          preload={preload}
          sizes="(max-width: 1024px) 100vw, 1180px"
          className="object-contain"
        />
      </div>
    </div>
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

function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-white">
        Архитектура / схема работы
      </h3>
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

function MediaBoard({ item }: { item: CaseStudy }) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="text-2xl font-semibold text-white">
          Скрины / видео / интерфейсы
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          real или стилизованные mockups
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
                {group.title.toLowerCase().includes("видео") ? (
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

function ChallengeGrid({ challenges }: { challenges: CaseStudy["challenges"] }) {
  return (
    <section>
      <h3 className="text-2xl font-semibold text-white">Сложности и решения</h3>
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
