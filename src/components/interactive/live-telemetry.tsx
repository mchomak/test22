"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RadioTower, ShieldCheck, TerminalSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SiteData } from "@/data/site";
import { useIsMobile } from "@/lib/use-is-mobile";

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
      <div className="absolute left-4 right-4 top-5 z-10 rounded-2xl border border-white/[0.14] bg-[#07100e]/88 p-4 shadow-2xl shadow-black/30 backdrop-blur-md sm:left-8 sm:right-auto sm:w-[390px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <RadioTower size={17} className="text-emerald-300" />
            {copy.title}
          </div>
          <span className="rounded-full bg-emerald-300/12 px-2.5 py-1 font-mono text-[11px] text-emerald-200">
            {copy.status}
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          {copy.events.map((event, index) => (
            <button
              key={event.label}
              type="button"
              onClick={() => setActive(index)}
              className={`group grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                index === active
                  ? "border-emerald-300/35 bg-emerald-300/10"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
              }`}
            >
              <span className="font-mono text-xs text-zinc-400">
                {event.label}
              </span>
              <span className={`font-mono text-xs ${event.tone}`}>
                {index === 0 ? `${latency} ms` : event.value}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/35 px-3 py-2.5">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentEvent.log}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24 }}
              className="font-mono text-[11px] leading-5 text-zinc-400"
            >
              <span className="text-emerald-300">$</span> {currentEvent.log}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-5 left-4 right-4 z-10 rounded-2xl border border-white/[0.14] bg-[#050607]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:bottom-8 sm:left-auto sm:right-8 sm:w-[440px]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <TerminalSquare size={17} className="text-cyan-200" />
            {copy.pipelineTitle}
          </div>
          <ShieldCheck size={17} className="text-emerald-300" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {copy.pipeline.map((node, index) => (
            <motion.div
              key={node}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] px-3 py-3"
              animate={{
                borderColor:
                  index === active || index === (active + 2) % copy.pipeline.length
                    ? "rgba(110,231,183,0.45)"
                    : "rgba(255,255,255,0.1)",
              }}
              transition={{ duration: 0.35 }}
            >
              <motion.span
                className="absolute inset-y-0 left-0 w-1 bg-emerald-300"
                animate={{
                  opacity: index === active ? 1 : 0.18,
                  scaleY: index === active ? 1 : 0.35,
                }}
              />
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
                <span className="font-mono text-[10px] text-zinc-500">
                  0{index + 1}
                </span>
              </div>
              <div className="text-sm font-medium leading-5 text-zinc-200">
                {node}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
