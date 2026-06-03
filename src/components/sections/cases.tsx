"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  ServerCog,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState, type PointerEvent } from "react";
import { cases } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const angleStep = 360 / cases.length;
const dragThreshold = 78;

export function Cases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [holderRotation, setHolderRotation] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragPointerId = useRef<number | null>(null);
  const didDrag = useRef(false);

  const carouselCards = useMemo(() => {
    return cases.map((item, index) => {
      const offset = getCircularOffset(index, activeIndex);
      const angle = offset * angleStep;
      const radians = (angle * Math.PI) / 180;
      const side = Math.sin(radians);
      const depth = Math.cos(radians);
      const depthRatio = (depth + 1) / 2;
      const isActive = offset === 0;
      const mutedBrightness = 0.68 + depthRatio * 0.12;
      const mutedSaturation = 0.42 + depthRatio * 0.16;

      return {
        item,
        index,
        isActive,
        x: side * 440,
        y: isActive ? 10 : 56 + (1 - depth) * 62,
        scale: isActive ? 1 : 0.58 + depthRatio * 0.16,
        opacity: isActive ? 1 : 0.06 + depthRatio * 0.16,
        rotate: side * 1.8,
        rotateY: side * -8,
        zIndex: isActive ? 140 : Math.round(depthRatio * 36),
        visualFilter: isActive
          ? "brightness(1) saturate(1)"
          : `brightness(${mutedBrightness}) saturate(${mutedSaturation})`,
      };
    });
  }, [activeIndex]);

  const rotateBy = (steps: number) => {
    if (steps === 0) return;

    setHolderRotation((current) => current - steps * angleStep);
    setActiveIndex((current) => (current + steps + cases.length) % cases.length);
  };

  const go = (direction: -1 | 1) => {
    rotateBy(direction);
  };

  const goTo = (index: number) => {
    const offset = getCircularOffset(index, activeIndex);
    if (offset === 0) return;

    rotateBy(offset);
  };

  const handleDragStart = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStartX.current = event.clientX;
    dragPointerId.current = event.pointerId;
    didDrag.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId || dragStartX.current === null) {
      return;
    }

    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) < dragThreshold) return;

    event.preventDefault();
    didDrag.current = true;
    rotateBy(delta < 0 ? 1 : -1);
    dragStartX.current = event.clientX;
  };

  const handleDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStartX.current = null;
    dragPointerId.current = null;

    if (didDrag.current) {
      window.setTimeout(() => {
        didDrag.current = false;
      }, 0);
    }
  };

  return (
    <section id="cases" className="section-shell bg-[#0b0d0c]">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Кейсы"
          title="Кейсы, которые показывают подход к разработке"
          description="Кейсы ниже работают как доказательство: бот, AI-сервис, backend, crypto-интеграция, Mini App и автоматизация с понятной задачей, решением и результатом."
        />

        <Reveal>
          <div className="case-showcase-shell">
            <div
              className="case-showcase-stage"
              role="region"
              aria-label="Карусель кейсов. Карточки можно вращать мышью или кнопками навигации."
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
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
                          transform: `rotate(${
                            index * angleStep + 90
                          }deg) translateX(var(--case-wheel-node-radius))`,
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
                    isActive,
                    x,
                    y,
                    scale,
                    opacity,
                    rotate,
                    rotateY,
                    zIndex,
                    visualFilter,
                  }) => (
                    <motion.article
                      key={item.title}
                      className={`case-wheel-card ${
                        isActive ? "case-wheel-card-active" : "case-wheel-card-muted"
                      }`}
                      aria-label={item.title}
                      aria-current={isActive ? "true" : undefined}
                      tabIndex={isActive ? 0 : -1}
                      initial={false}
                      style={{
                        zIndex,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      animate={{
                        x,
                        y,
                        scale,
                        opacity,
                        rotate,
                        rotateY,
                        filter: visualFilter,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <span className="case-wheel-card-line" aria-hidden="true" />
                      <span className="case-wheel-card-pin" aria-hidden="true" />
                      {isActive ? (
                        <CaseCardContent item={item} />
                      ) : (
                        <span className="case-wheel-card-ghost" aria-hidden="true">
                          <span />
                          <span />
                          <span />
                          <span />
                        </span>
                      )}
                    </motion.article>
                  ),
                )}
              </div>
            </div>

            <div className="case-showcase-controls" aria-label="Навигация кейсов">
              <button
                type="button"
                onClick={() => go(-1)}
                className="case-showcase-control-button"
                aria-label="Предыдущий кейс"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="case-showcase-pagination" aria-live="polite">
                <span className="case-showcase-pagination-count">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(cases.length).padStart(2, "0")}
                </span>
                <span className="case-showcase-dots">
                  {cases.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`case-showcase-dot ${
                        index === activeIndex ? "case-showcase-dot-active" : ""
                      }`}
                      aria-label={`Открыть кейс ${index + 1}: ${item.title}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                    />
                  ))}
                </span>
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                className="case-showcase-control-button"
                aria-label="Следующий кейс"
              >
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseCardContent({
  item,
}: {
  item: (typeof cases)[number];
}) {
  return (
    <span className="case-wheel-card-content">
      <span className="case-wheel-card-head">
        <span className="case-wheel-card-title-group">
          <span className="case-wheel-card-type">
            {item.type}
          </span>
          <span className="case-wheel-card-title">
            {item.title}
          </span>
        </span>

        <span className="case-wheel-card-actions">
          <Link href={`/cases#${item.slug}`} className="case-wheel-card-action">
            <FileText size={16} />
            Подробнее
          </Link>

          {item.projectUrl ? (
            <a
              href={item.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="case-wheel-card-action"
            >
              <ExternalLink size={16} />
              Ссылка на проект
            </a>
          ) : (
            <span className="case-wheel-card-action case-wheel-card-action-muted">
              <ExternalLink size={16} />
              Ссылка скоро
            </span>
          )}
        </span>
      </span>

      <span className="case-wheel-card-body">
        <span className="case-wheel-card-narrative">
          <CaseLine label="Проблема" text={item.problem} />
          <CaseLine label="Решение" text={item.solution} />
          <CaseLine label="Результат" text={item.result} />
        </span>

        <span className="case-wheel-card-aside">
          <span className="case-wheel-card-aside-block">
            <span className="case-wheel-card-aside-title">
            <ServerCog size={18} className="text-emerald-300" />
              stack
            </span>
            <span className="case-wheel-stack">
              {item.stack.map((tech) => (
                <span key={tech} className="case-wheel-stack-pill">
                  {tech}
                </span>
              ))}
            </span>
          </span>

          <span className="case-wheel-card-aside-block">
            <span className="case-wheel-card-aside-title">
            <Workflow size={18} className="text-cyan-200" />
              metrics
            </span>
            <span className="case-wheel-metrics">
              {item.metrics.map((metric) => (
                <span key={metric} className="case-wheel-metric">
                  <CheckCircle2 size={15} />
                  <span>{metric}</span>
                </span>
              ))}
            </span>
          </span>
        </span>
      </span>
    </span>
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
    <span className="case-wheel-line">
      <span className="case-wheel-line-label">
        {label}
      </span>
      <span className="case-wheel-line-text">{text}</span>
    </span>
  );
}
