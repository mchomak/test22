import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  Layers3,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cases, contacts } from "@/data/site";
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

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300/80">
                  Case library
                </p>
                <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl">
                  Кейсы с местом под ссылки, скрины и видео
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
                  Здесь удобно раскрывать проекты глубже, чем на главной:
                  задача, решение, результат, стек, медиа и ссылка на рабочую
                  поверхность. Сейчас ссылки оставлены пустыми, чтобы быстро
                  заполнить их после согласования.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-300/20 bg-[#0d1713]/72 p-5 backdrop-blur-md">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                  next content pass
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  Для каждого кейса лучше добавить 1 hero-скрин, 3-5 рабочих
                  кадров, короткое видео и ссылку на проект или демо.
                </p>
                <ButtonLink
                  href={contacts.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 w-full"
                >
                  Прислать ссылки
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b0d0c]">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:px-8">
            {cases.map((item, index) => (
              <article
                key={item.slug}
                id={item.slug}
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-white/10 bg-[#101311]/72 backdrop-blur-md"
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">
                        {item.type}
                      </span>
                    </div>

                    <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-white">
                      {item.title}
                    </h2>

                    <div className="mt-7 grid gap-5">
                      <CaseBlock label="Проблема" text={item.problem} />
                      <CaseBlock label="Решение" text={item.solution} />
                      <CaseBlock label="Результат" text={item.result} />
                    </div>

                    <div className="mt-7 flex flex-wrap gap-2">
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

                  <aside className="grid gap-5 border-t border-white/10 bg-black/15 p-6 sm:p-8 lg:border-l lg:border-t-0">
                    <div>
                      <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                        <CheckCircle2 size={16} className="text-emerald-300" />
                        metrics
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

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <MediaPlaceholder
                        icon={<ImageIcon size={18} />}
                        title="Фото / скрины"
                        text="место под hero-кадр и рабочие экраны"
                      />
                      <MediaPlaceholder
                        icon={<PlayCircle size={18} />}
                        title="Видео"
                        text="место под короткий walkthrough"
                      />
                    </div>

                    <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
                      {item.projectUrl ? (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-4 text-sm font-semibold text-emerald-100 transition hover:border-cyan-200/45 hover:bg-cyan-200/10 hover:text-cyan-50"
                        >
                          <ExternalLink size={16} />
                          Открыть проект
                        </a>
                      ) : (
                        <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 text-sm font-semibold text-zinc-500">
                          <ExternalLink size={16} />
                          Ссылка скоро
                        </span>
                      )}
                      <Link
                        href={`/#cases`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:text-white"
                      >
                        <Layers3 size={16} />
                        Вернуться к витрине
                      </Link>
                    </div>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CaseBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-l border-emerald-300/25 pl-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300/70">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
    </div>
  );
}

function MediaPlaceholder({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/14 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-zinc-300">
        <span className="text-emerald-300">{icon}</span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="mt-2 text-xs leading-5 text-zinc-500">{text}</p>
    </div>
  );
}
