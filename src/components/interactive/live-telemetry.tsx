"use client";

import { RadioTower, ShieldCheck, TerminalSquare } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const events = [
  {
    label: "Telegram webhook",
    value: "18 ms",
    tone: "text-emerald-200",
    log: "event.message -> scenario.router -> state.commit",
  },
  {
    label: "Payment callback",
    value: "verified",
    tone: "text-cyan-200",
    log: "provider.webhook -> signature.check -> order.paid",
  },
  {
    label: "LLM guardrail",
    value: "scoped",
    tone: "text-amber-200",
    log: "query -> retrieval -> policy.limit -> answer",
  },
  {
    label: "Deploy health",
    value: "green",
    tone: "text-emerald-200",
    log: "docker.restart=0 errors=0 queue.depth=3",
  },
];

const pipeline = [
  "Telegram Bot",
  "Payments",
  "FastAPI",
  "PostgreSQL",
  "Redis Queue",
  "AI Gateway",
];

export function LiveTelemetry() {
  const [active, setActive] = useState(0);
  const [latency, setLatency] = useState(18);
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;

      setActive((current) => (current + 1) % events.length);
      setLatency(14 + Math.round(Math.random() * 12));
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isVisible]);

  const currentEvent = useMemo(() => events[active], [active]);

  return (
    <div ref={rootRef} className="absolute inset-0">
      <div className="absolute left-4 right-4 top-5 z-10 rounded-2xl border border-white/[0.14] bg-[#07100e]/88 p-4 shadow-2xl shadow-black/30 backdrop-blur-md sm:left-8 sm:right-auto sm:w-[390px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <RadioTower size={17} className="text-emerald-300" />
            Live product contour
          </div>
          <span className="rounded-full bg-emerald-300/12 px-2.5 py-1 font-mono text-[11px] text-emerald-200">
            online
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          {events.map((event, index) => (
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
                {event.label === "Telegram webhook" ? `${latency} ms` : event.value}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/35 px-3 py-2.5">
          <p className="font-mono text-[11px] leading-5 text-zinc-400">
            <span className="text-emerald-300">$</span> {currentEvent.log}
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-4 right-4 z-10 rounded-2xl border border-white/[0.14] bg-[#050607]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:bottom-8 sm:left-auto sm:right-8 sm:w-[440px]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <TerminalSquare size={17} className="text-cyan-200" />
            Bot to payment pipeline
          </div>
          <ShieldCheck size={17} className="text-emerald-300" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {pipeline.map((node, index) => (
            <div
              key={node}
              className={`relative overflow-hidden rounded-xl border bg-white/[0.045] px-3 py-3 transition-colors duration-300 ${
                index === active || index === (active + 2) % pipeline.length
                  ? "border-emerald-300/45"
                  : "border-white/10"
              }`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-emerald-300 transition duration-300 ${
                  index === active ? "opacity-100" : "scale-y-[0.35] opacity-[0.18]"
                }`}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
