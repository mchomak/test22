"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import type { Locale, SiteData } from "@/data/site";

const dragThreshold = 78;

const stopCarouselDrag = (event: PointerEvent<HTMLElement>) => {
  event.stopPropagation();
};

export function CaseShowcase({
  cases,
  copy,
  locale,
}: {
  cases: SiteData["cases"];
  copy: SiteData["ui"]["cases"];
  locale: Locale;
}) {
  const showcaseCases = cases;
  const angleStep = showcaseCases.length > 0 ? 360 / showcaseCases.length : 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const [holderRotation, setHolderRotation] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragPointerId = useRef<number | null>(null);
  const didDrag = useRef(false);

  const carouselCards = useMemo(() => {
    return showcaseCases.map((item, index) => {
      const offset = getCircularOffset(index, activeIndex, showcaseCases.length);
      const angle = offset * angleStep;
      const radians = (angle * Math.PI) / 180;
      const side = Math.sin(radians);
      const depth = Math.cos(radians);
      const depthRatio = (depth + 1) / 2;
      const isActive = offset === 0;

      return {
        item,
        isActive,
        x: side * 440,
        y: isActive ? 10 : 56 + (1 - depth) * 62,
        scale: isActive ? 1 : 0.58 + depthRatio * 0.16,
        opacity: isActive ? 1 : 0,
        rotate: side * 1.8,
        rotateY: side * -8,
        zIndex: isActive ? 140 : Math.round(depthRatio * 36),
        visualFilter: "brightness(1) saturate(1)",
      };
    });
  }, [activeIndex, angleStep, showcaseCases]);

  const rotateBy = (steps: number) => {
    if (steps === 0 || showcaseCases.length === 0) return;

    setHolderRotation((current) => current - steps * angleStep);
    setActiveIndex(
      (current) => (current + steps + showcaseCases.length) % showcaseCases.length,
    );
  };

  const go = (direction: -1 | 1) => {
    rotateBy(direction);
  };

  const goTo = (index: number) => {
    const offset = getCircularOffset(index, activeIndex, showcaseCases.length);
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

  if (showcaseCases.length === 0) {
    return null;
  }

  return (
    <div className="case-showcase-shell">
      <div
        className="case-showcase-stage"
        role="region"
        aria-label={copy.carouselAria}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      >
        <div className="case-wheel-holder" aria-hidden="true">
          <span className="case-wheel-holder-plane">
            <span className="case-wheel-holder-ring" />
            <span
              className="case-wheel-holder-rotor"
              style={{ transform: `rotate(${holderRotation}deg)` }}
            >
              {showcaseCases.map((item, index) => (
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
            </span>
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
              <article
                key={item.title}
                className={`case-wheel-card ${
                  isActive ? "case-wheel-card-active" : "case-wheel-card-muted"
                }`}
                aria-label={item.title}
                aria-hidden={isActive ? undefined : true}
                aria-current={isActive ? "true" : undefined}
                tabIndex={isActive ? 0 : -1}
                style={{
                  zIndex,
                  pointerEvents: isActive ? "auto" : "none",
                  opacity,
                  filter: visualFilter,
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg) rotateY(${rotateY}deg)`,
                }}
              >
                <span className="case-wheel-card-line" aria-hidden="true" />
                <span className="case-wheel-card-pin" aria-hidden="true" />
                {isActive ? (
                  <CaseCardContent copy={copy} item={item} locale={locale} />
                ) : (
                  <span className="case-wheel-card-ghost" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                )}
              </article>
            ),
          )}
        </div>
      </div>

      <div className="case-showcase-controls" aria-label={copy.controlsAria}>
        <button
          type="button"
          onClick={() => go(-1)}
          className="case-showcase-control-button"
          aria-label={copy.previous}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="case-showcase-pagination" aria-live="polite">
          <span className="case-showcase-pagination-count">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(showcaseCases.length).padStart(2, "0")}
          </span>
          <span className="case-showcase-dots">
            {showcaseCases.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goTo(index)}
                className={`case-showcase-dot ${
                  index === activeIndex ? "case-showcase-dot-active" : ""
                }`}
                aria-label={`${copy.openCase} ${index + 1}: ${item.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </span>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="case-showcase-control-button"
          aria-label={copy.next}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function CaseCardContent({
  copy,
  item,
  locale,
}: {
  copy: SiteData["ui"]["cases"];
  item: SiteData["cases"][number];
  locale: Locale;
}) {
  return (
    <div
      className="case-wheel-card-content"
      style={{ "--case-accent": item.preview.accent } as CSSProperties}
    >
      <div className="case-showcase-copy">
        <div className="case-wheel-card-title-group">
          <span className="case-wheel-card-type">{item.category}</span>
          <h3 className="case-wheel-card-title">{item.title}</h3>
        </div>

        <p className="case-wheel-card-summary">{item.shortSummary}</p>

        <div className="case-wheel-outcomes" aria-label={copy.outcomesAria}>
          {item.outcomes.slice(0, 4).map((outcome) => (
            <span key={outcome} className="case-wheel-outcome">
              {outcome}
            </span>
          ))}
        </div>

        <div className="case-wheel-card-actions">
          <Link
            href={`/${locale}/cases#${item.slug}`}
            className="case-wheel-card-action"
            onPointerDown={stopCarouselDrag}
          >
            <FileText size={16} />
            {copy.details}
          </Link>
          <Link
            href={buildLocalizedEstimatorHref(locale, item)}
            className="case-wheel-card-action case-wheel-card-action-secondary"
            onPointerDown={stopCarouselDrag}
          >
            <Calculator size={16} />
            {copy.similar}
          </Link>
        </div>
      </div>

      <CasePreview item={item} />
    </div>
  );
}

function CasePreview({
  item,
}: {
  item: SiteData["cases"][number];
}) {
  if (item.coverImage) {
    return (
      <div className="case-preview case-preview-image-card" aria-hidden="true">
        <Image
          src={item.coverImage}
          alt=""
          fill
          loading="lazy"
          sizes="(max-width: 768px) 90vw, 840px"
          className="case-preview-image"
        />
      </div>
    );
  }

  const title = item.preview.label;

  if (item.preview.kind === "chart") {
    return (
      <div className="case-preview case-preview-chart" aria-hidden="true">
        <PreviewHeader title={title} stats={item.preview.stats} />
        <span className="case-preview-chart-grid">
          <span className="case-preview-candle case-preview-candle-a" />
          <span className="case-preview-candle case-preview-candle-b" />
          <span className="case-preview-candle case-preview-candle-c" />
          <span className="case-preview-candle case-preview-candle-d" />
          <span className="case-preview-signal" />
        </span>
      </div>
    );
  }

  if (item.preview.kind === "tree") {
    return (
      <div className="case-preview case-preview-tree" aria-hidden="true">
        <PreviewHeader title={title} stats={item.preview.stats} />
        <span className="case-preview-tree-canvas">
          <span className="case-preview-branch case-preview-branch-a" />
          <span className="case-preview-branch case-preview-branch-b" />
          <span className="case-preview-branch case-preview-branch-c" />
          <span className="case-preview-node case-preview-node-a" />
          <span className="case-preview-node case-preview-node-b" />
          <span className="case-preview-node case-preview-node-c" />
          <span className="case-preview-node case-preview-node-d" />
        </span>
      </div>
    );
  }

  if (item.preview.kind === "web" || item.preview.kind === "dashboard") {
    return (
      <div className="case-preview case-preview-web" aria-hidden="true">
        <PreviewHeader title={title} stats={item.preview.stats} />
        <span className="case-preview-browser">
          <span className="case-preview-browser-bar">
            <span />
            <span />
            <span />
          </span>
          <span className="case-preview-browser-body">
            <span className="case-preview-browser-hero" />
            <span className="case-preview-browser-row" />
            <span className="case-preview-browser-row case-preview-browser-row-short" />
            <span className="case-preview-browser-table">
              <span />
              <span />
              <span />
            </span>
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="case-preview case-preview-device" aria-hidden="true">
      <PreviewHeader title={title} stats={item.preview.stats} />
      <span className="case-preview-device-grid">
        <span className="case-preview-phone">
          <span className="case-preview-phone-notch" />
          <span className="case-preview-bubble case-preview-bubble-in" />
          <span className="case-preview-bubble case-preview-bubble-out" />
          <span className="case-preview-bubble case-preview-bubble-in case-preview-bubble-short" />
          <span className="case-preview-paid" />
        </span>
        <span className="case-preview-panel">
          <span className="case-preview-panel-title" />
          <span className="case-preview-panel-row" />
          <span className="case-preview-panel-row" />
          <span className="case-preview-panel-row case-preview-panel-row-active" />
          <span className="case-preview-panel-chart">
            <span />
            <span />
            <span />
          </span>
        </span>
      </span>
    </div>
  );
}

function PreviewHeader({ title, stats }: { title: string; stats: string[] }) {
  return (
    <span className="case-preview-header">
      <span className="case-preview-label">{title}</span>
      <span className="case-preview-stats">
        {stats.map((stat) => (
          <span key={stat}>{stat}</span>
        ))}
      </span>
    </span>
  );
}

function buildLocalizedEstimatorHref(
  locale: Locale,
  item: SiteData["cases"][number],
) {
  const params = new URLSearchParams({
    estimateType: item.estimatorPreset.type,
    estimateComplexity: item.estimatorPreset.complexity,
    estimateModules: item.estimatorPreset.modules.join(","),
    estimateCase: item.slug,
  });

  return `/${locale}/?${params.toString()}#estimator`;
}

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}
