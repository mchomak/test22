"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Layers3, ScanLine, ServerCog } from "lucide-react";
import { useState } from "react";
import { cases } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Cases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = cases[activeIndex];

  return (
    <section id="cases" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Кейсы"
          title="Интерактивная витрина задач: от crypto UX до AI/RAG и backend-операций"
          description="Кейсы обезличены, зато показывают реальный тип работы: где была проблема, как строилось решение и что остаётся после запуска."
        />

        <Reveal>
          <div className="case-console grid gap-5 rounded-[2rem] border border-white/10 bg-[#101311] p-4 shadow-2xl shadow-black/35 md:p-6 lg:grid-cols-[360px_1fr]">
            <div className="grid gap-2 self-start">
              {cases.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                      isActive
                        ? "border-cyan-200/35 bg-cyan-200/10"
                        : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-case"
                        className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-cyan-200"
                      />
                    ) : null}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/70">
                          {String(index + 1).padStart(2, "0")} / {item.type}
                        </p>
                        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-white">
                          {item.title}
                        </h3>
                      </div>
                      <ArrowUpRight
                        size={17}
                        className={`shrink-0 transition ${
                          isActive
                            ? "text-cyan-100"
                            : "text-zinc-600 group-hover:text-zinc-300"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[620px] overflow-hidden rounded-3xl border border-white/10 bg-[#050607]/70 p-5 sm:p-6">
              <div className="case-scan absolute inset-0 opacity-50" />
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.title}
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex min-h-[570px] flex-col"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                        {active.type}
                      </p>
                      <h3 className="mt-3 max-w-3xl text-balance text-2xl font-semibold leading-tight text-white sm:text-4xl">
                        {active.title}
                      </h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                        delivery mode
                      </p>
                      <p className="mt-1 text-sm text-emerald-200">
                        architecture → build → launch
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4 lg:grid-cols-3">
                    <CaseBlock label="Проблема" text={active.problem} />
                    <CaseBlock label="Решение" text={active.solution} />
                    <CaseBlock label="Результат" text={active.result} />
                  </div>

                  <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_260px]">
                    <div className="rounded-2xl border border-white/10 bg-[#0d1110]/80 p-4">
                      <div className="mb-4 flex items-center gap-2">
                        <ScanLine size={18} className="text-cyan-200" />
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                          execution trace
                        </p>
                      </div>
                      <div className="space-y-3">
                        {[
                          "scope.locked",
                          "entities.mapped",
                          "integration.checked",
                          "deploy.ready",
                        ].map((line, index) => (
                          <motion.div
                            key={line}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.12 + index * 0.06 }}
                            className="grid grid-cols-[72px_1fr_auto] items-center gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                          >
                            <span className="font-mono text-[11px] text-zinc-600">
                              T+0{index + 1}
                            </span>
                            <span className="font-mono text-xs text-zinc-300">
                              {line}
                            </span>
                            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#0d1110]/80 p-4">
                      <div className="mb-4 flex items-center gap-2">
                        <ServerCog size={18} className="text-emerald-300" />
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                          stack
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {active.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[11px] text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-3">
                    {active.metrics.map((metric, index) => (
                      <motion.div
                        key={metric}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22 + index * 0.05 }}
                        className="group border-l border-cyan-200/25 bg-white/[0.03] px-4 py-3 transition duration-300 hover:border-emerald-300/45 hover:bg-white/[0.06]"
                      >
                        <Layers3
                          size={15}
                          className="mb-2 text-cyan-200 transition group-hover:text-emerald-200"
                        />
                        <p className="text-xs leading-5 text-zinc-300">
                          {metric}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>
    </div>
  );
}
