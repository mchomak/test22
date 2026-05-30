"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Layers3,
  ServerCog,
  Workflow,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cases } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Cases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = cases[activeIndex];

  const visibleCases = useMemo(() => {
    return cases.map((item, index) => {
      let offset = index - activeIndex;
      if (offset > cases.length / 2) offset -= cases.length;
      if (offset < -cases.length / 2) offset += cases.length;

      return { item, index, offset };
    });
  }, [activeIndex]);

  const go = (direction: -1 | 1) => {
    setActiveIndex((current) =>
      direction > 0
        ? (current + 1) % cases.length
        : (current - 1 + cases.length) % cases.length,
    );
  };

  return (
    <section id="cases" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Кейсы"
          title="Галерея production-кейсов без однотипной карточной сетки"
          description="Кейсов может стать больше, поэтому витрина работает как подвесная лента: быстро переключаете задачу, а детали раскрываются в одном фокусном контуре."
        />

        <Reveal>
          <div className="case-hanger-shell overflow-hidden rounded-[2rem] border border-white/10 bg-[#07100e] p-4 shadow-2xl shadow-black/35 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(cases.length).padStart(2, "0")}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition duration-300 hover:border-cyan-200/35 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                  aria-label="Предыдущий кейс"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition duration-300 hover:border-cyan-200/35 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                  aria-label="Следующий кейс"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            <div className="case-hanger-stage">
              <div className="case-hanger-rail" />
              {visibleCases.map(({ item, index, offset }) => {
                const distance = Math.abs(offset);
                const isActive = index === activeIndex;
                const hidden = distance > 3;

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`case-hanger-card ${
                      isActive ? "case-hanger-card-active" : ""
                    }`}
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${offset * 132}px)`,
                      y: isActive ? 54 : 36 + distance * 10,
                      rotate: offset * 4,
                      rotateY: offset * -18,
                      scale: isActive ? 1.08 : Math.max(0.68, 0.92 - distance * 0.08),
                      opacity: hidden ? 0 : isActive ? 1 : Math.max(0.24, 0.7 - distance * 0.13),
                      zIndex: 20 - distance,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 24 }}
                    aria-label={item.title}
                  >
                    <span className="case-hanger-string" />
                    <span className="case-hanger-pin" />
                    <span className="relative z-10 block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/75">
                        {String(index + 1).padStart(2, "0")} / {item.type}
                      </span>
                      <span className="mt-4 block text-left text-base font-semibold leading-6 text-white">
                        {item.title}
                      </span>
                      <span className="mt-5 flex flex-wrap gap-1.5">
                        {item.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-black/25 px-2 py-1 font-mono text-[10px] text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={active.title}
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                transition={{ duration: 0.28 }}
                className="case-focus-panel"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                      {active.type}
                    </p>
                    <h3 className="mt-3 max-w-4xl text-balance text-2xl font-semibold leading-tight text-white sm:text-4xl">
                      {active.title}
                    </h3>

                    <div className="mt-7 grid gap-5 md:grid-cols-3">
                      <CaseLine label="Проблема" text={active.problem} />
                      <CaseLine label="Решение" text={active.solution} />
                      <CaseLine label="Результат" text={active.result} />
                    </div>
                  </div>

                  <div className="space-y-5 border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
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

                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <Workflow size={18} className="text-cyan-200" />
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                          metrics
                        </p>
                      </div>
                      <div className="grid gap-3">
                        {active.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="flex gap-3 border-l border-cyan-200/25 bg-white/[0.03] px-3 py-2"
                          >
                            <Layers3
                              size={15}
                              className="mt-1 shrink-0 text-cyan-200"
                            />
                            <p className="text-xs leading-5 text-zinc-300">
                              {metric}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{text}</p>
    </div>
  );
}
