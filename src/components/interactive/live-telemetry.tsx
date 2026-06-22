"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RadioTower, ShieldCheck, TerminalSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SiteData } from "@/data/site";
import { useIsMobile } from "@/lib/use-is-mobile";

function getToneClass(tone: string) {
  if (tone.includes("cyan")) return "accent-signal";
  if (tone.includes("amber")) return "accent-warm";
  if (tone.includes("emerald")) return "accent-logic";

  return tone;
}

export function LiveTelemetry({
  copy,
}: {
  copy: SiteData["ui"]["liveTelemetry"];
}) {
  const [active, setActive] = useState(0);
  const [latency, setLatency] = useState(18);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile !== false) {
      return;
    }

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % copy.events.length);
      setLatency(14 + Math.round(Math.random() * 12));
    }, 1900);

    return () => window.clearInterval(interval);
  }, [copy.events.length, isMobile]);

  const currentEvent = useMemo(() => copy.events[active], [active, copy.events]);

  return (
    <>
      <div className="surface-panel absolute left-4 right-4 top-5 z-10 p-4 sm:left-8 sm:right-auto sm:w-[390px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
            <RadioTower size={17} className="accent-signal" />
            {copy.title}
          </div>
          <span className="tag-pill tag-pill-logic min-h-0 px-2.5 py-1 text-[11px]">
            {copy.status}
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          {copy.events.map((event, index) => (
            <button
              key={event.label}
              type="button"
              onClick={() => setActive(index)}
              className={`choice-card group grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2.5 ${
                index === active
                  ? "choice-card-active choice-card-active-signal"
                  : ""
              }`}
            >
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {event.label}
              </span>
              <span className={`font-mono text-xs ${getToneClass(event.tone)}`}>
                {index === 0 ? `${latency} ms` : event.value}
              </span>
            </button>
          ))}
        </div>

        <div className="surface-tool mt-4 overflow-hidden px-3 py-2.5 shadow-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentEvent.log}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
              className="font-mono text-[11px] leading-5 text-[var(--text-muted)]"
            >
              <span className="accent-signal">$</span> {currentEvent.log}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="surface-panel absolute bottom-5 left-4 right-4 z-10 p-4 sm:bottom-8 sm:left-auto sm:right-8 sm:w-[440px]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
            <TerminalSquare size={17} className="accent-signal" />
            {copy.pipelineTitle}
          </div>
          <ShieldCheck size={17} className="accent-logic" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {copy.pipeline.map((node, index) => (
            <motion.div
              key={node}
              className="surface-card relative overflow-hidden px-3 py-3 shadow-none"
              animate={{
                borderColor:
                  index === active || index === (active + 2) % copy.pipeline.length
                    ? "rgba(125,211,252,0.42)"
                    : "rgba(244,242,236,0.09)",
              }}
              transition={{ duration: 0.35 }}
            >
              <motion.span
                className="absolute inset-y-0 left-0 w-1 bg-[var(--accent-signal)]"
                animate={{
                  opacity: index === active ? 1 : 0.18,
                  scaleY: index === active ? 1 : 0.35,
                }}
              />
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-warm)]" />
                <span className="font-mono text-[10px] text-[var(--text-faint)]">
                  0{index + 1}
                </span>
              </div>
              <div className="text-sm font-medium leading-5 text-[var(--text-secondary)]">
                {node}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
