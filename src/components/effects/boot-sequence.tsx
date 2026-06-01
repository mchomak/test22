"use client";

import { CheckCircle2, CircuitBoard, TerminalSquare } from "lucide-react";
import { useEffect, useState } from "react";

const bootLogs = [
  "loading python backend contour",
  "mapping bot scenarios",
  "linking payments, api, queues",
  "starting ai gateway",
  "deploy surface ready",
];

const nodes = [
  { left: "18%", top: "31%" },
  { left: "36%", top: "48%" },
  { left: "51%", top: "28%" },
  { left: "67%", top: "55%" },
  { left: "81%", top: "36%" },
];

export function BootSequence() {
  const [phase, setPhase] = useState<"running" | "exiting" | "done">(
    "running",
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const bootDuration = reduceMotion ? 700 : 3400;
    const exitDuration = reduceMotion ? 20 : 850;

    let exitTimeout = 0;
    const bootTimeout = window.setTimeout(() => {
      setPhase("exiting");
      exitTimeout = window.setTimeout(() => {
        setPhase("done");
      }, exitDuration);
    }, bootDuration);

    return () => {
      window.clearTimeout(bootTimeout);
      window.clearTimeout(exitTimeout);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[90] overflow-hidden bg-[#050607] text-white ${
        phase === "exiting" ? "boot-screen-exit" : ""
      }`}
      aria-label="Сборка интерфейса"
    >
      <div className="boot-grid absolute inset-0 opacity-70" />
      <div className="boot-axis-x absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
      <div className="boot-axis-y absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-200 to-transparent" />

      <div className="absolute inset-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {nodes.map((node, index) => (
          <span
            key={`${node.left}-${node.top}`}
            className="boot-node absolute grid h-16 w-16 place-items-center rounded-full border border-emerald-300/30 bg-emerald-300/10 shadow-[0_0_44px_rgba(110,231,183,0.18)]"
            style={{
              ...node,
              animationDelay: `${0.38 + index * 0.18}s`,
            }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
        ))}
      </div>

      <div className="boot-panel absolute left-1/2 top-1/2 w-[min(92vw,720px)] rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/60 backdrop-blur-md sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-200">
              <CircuitBoard size={15} />
              mchomak.system
            </div>
            <h2 className="max-w-xl text-balance text-3xl font-semibold leading-tight sm:text-5xl">
              Собираю интерфейс как production-контур
            </h2>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <CheckCircle2 size={24} className="text-emerald-300" />
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#050607]/90">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <TerminalSquare size={16} className="text-cyan-200" />
            <span className="font-mono text-xs text-zinc-500">
              boot_sequence.log
            </span>
          </div>
          <div className="grid gap-2 p-4 font-mono text-xs leading-6 text-zinc-400 sm:text-sm">
            {bootLogs.map((line, index) => (
              <div
                key={line}
                className="boot-log-line grid grid-cols-[28px_1fr_auto] items-center gap-3"
                style={{ animationDelay: `${0.88 + index * 0.28}s` }}
              >
                <span className="text-zinc-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="text-emerald-300">&gt;</span> {line}
                </span>
                <span
                  className="boot-log-dot h-2 w-2 rounded-full bg-emerald-300"
                  style={{ animationDelay: `${1.04 + index * 0.28}s` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="boot-progress h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-200 to-amber-200" />
        </div>
      </div>
    </div>
  );
}
