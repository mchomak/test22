"use client";

import { motion } from "framer-motion";
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

const angleStep = 360 / cases.length;

export function Cases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [holderRotation, setHolderRotation] = useState(0);

  const carouselCards = useMemo(() => {
    return cases.map((item, index) => {
      const offset = getCircularOffset(index, activeIndex);
      const angle = offset * angleStep;
      const radians = (angle * Math.PI) / 180;
      const side = Math.sin(radians);
      const depth = Math.cos(radians);
      const depthRatio = (depth + 1) / 2;
      const isActive = offset === 0;

      return {
        item,
        index,
        isActive,
        x: side * 430,
        y: isActive ? 18 : 52 + (1 - depth) * 86,
        scale: isActive ? 1 : 0.7 + depthRatio * 0.22,
        opacity: isActive ? 1 : 0.16 + depthRatio * 0.5,
        rotate: side * 3,
        rotateY: side * -18,
        zIndex: Math.round(depthRatio * 80) + (isActive ? 40 : 0),
        blur: isActive ? 0 : 4 + (1 - depthRatio) * 7,
      };
    });
  }, [activeIndex]);

  const go = (direction: -1 | 1) => {
    const nextIndex =
      direction > 0
        ? (activeIndex + 1) % cases.length
        : (activeIndex - 1 + cases.length) % cases.length;

    setHolderRotation((current) => current + direction * angleStep);
    setActiveIndex(nextIndex);
  };

  const goTo = (index: number) => {
    const offset = getCircularOffset(index, activeIndex);
    if (offset === 0) return;

    setHolderRotation((current) => current + offset * angleStep);
    setActiveIndex(index);
  };

  return (
    <section id="cases" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Кейсы"
          title="Кейсы в фокусе, без мелкой карточной сетки"
          description="Кейсы ведут себя как подвешенные карточки на карусельном треке: одна выходит вперёд и раскрывает детали, остальные уходят назад и остаются приглушёнными ориентирами."
        />

        <Reveal>
          <div className="case-showcase-shell">
            <div className="case-showcase-toolbar mb-5 flex items-center justify-between gap-3">
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

            <div className="case-showcase-stage">
              <div className="case-wheel-holder" aria-hidden="true">
                <span className="case-wheel-holder-plane">
                  <span className="case-wheel-holder-ring" />
                  <motion.span
                    className="case-wheel-holder-rotor"
                    animate={{ rotate: holderRotation }}
                    transition={{ type: "spring", stiffness: 78, damping: 18 }}
                  >
                    {cases.map((item, index) => (
                      <span
                        key={item.title}
                        className="case-wheel-holder-node"
                        style={{
                          transform: `rotate(${index * angleStep}deg) translateX(var(--case-wheel-node-radius))`,
                        }}
                      />
                    ))}
                  </motion.span>
                </span>
              </div>

              <div className="case-wheel-deck">
                {carouselCards.map(
                  ({
                    item,
                    index,
                    isActive,
                    x,
                    y,
                    scale,
                    opacity,
                    rotate,
                    rotateY,
                    zIndex,
                    blur,
                  }) => (
                    <motion.button
                      key={item.title}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`case-wheel-card ${
                        isActive ? "case-wheel-card-active" : "case-wheel-card-muted"
                      }`}
                      aria-label={item.title}
                      aria-current={isActive ? "true" : undefined}
                      initial={false}
                      style={{ zIndex }}
                      animate={{
                        x,
                        y,
                        scale,
                        opacity,
                        rotate,
                        rotateY,
                        filter: `blur(${blur}px)`,
                      }}
                      transition={{ type: "spring", stiffness: 112, damping: 23 }}
                    >
                      <span className="case-wheel-card-line" aria-hidden="true" />
                      <span className="case-wheel-card-pin" aria-hidden="true" />
                      <span className="case-wheel-card-content">
                        <span className="case-wheel-card-head">
                          <span className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/80">
                            {item.type}
                          </span>
                          <span className="mt-3 block text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
                            {item.title}
                          </span>

                          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                            <span className="text-cyan-200">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>/</span>
                            <span>{String(cases.length).padStart(2, "0")}</span>
                          </span>
                        </span>

                        <span className="mt-7 grid gap-5">
                          <CaseLine label="Проблема" text={item.problem} />
                          <CaseLine label="Решение" text={item.solution} />
                          <CaseLine label="Результат" text={item.result} />
                        </span>

                        <span className="mt-7 block space-y-6 border-t border-white/10 pt-6">
                          <span className="block">
                            <span className="mb-3 flex items-center gap-2">
                              <ServerCog size={18} className="text-emerald-300" />
                              <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                                stack
                              </span>
                            </span>
                            <span className="flex flex-wrap gap-2">
                              {item.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[11px] text-zinc-400"
                                >
                                  {tech}
                                </span>
                              ))}
                            </span>
                          </span>

                          <span className="block">
                            <span className="mb-3 flex items-center gap-2">
                              <Workflow size={18} className="text-cyan-200" />
                              <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                                metrics
                              </span>
                            </span>
                            <span className="grid gap-3">
                              {item.metrics.map((metric) => (
                                <span
                                  key={metric}
                                  className="flex gap-3 border-l border-cyan-200/25 bg-white/[0.03] px-3 py-2"
                                >
                                  <Layers3
                                    size={15}
                                    className="mt-1 shrink-0 text-cyan-200"
                                  />
                                  <span className="text-xs leading-5 text-zinc-300">
                                    {metric}
                                  </span>
                                </span>
                              ))}
                            </span>
                          </span>
                        </span>
                      </span>
                    </motion.button>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function getCircularOffset(index: number, activeIndex: number) {
  let offset = index - activeIndex;
  if (offset > cases.length / 2) offset -= cases.length;
  if (offset < -cases.length / 2) offset += cases.length;
  return offset;
}

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <span className="block border-t border-white/10 pt-4">
      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
      <span className="mt-3 block text-sm leading-6 text-zinc-300">{text}</span>
    </span>
  );
}
