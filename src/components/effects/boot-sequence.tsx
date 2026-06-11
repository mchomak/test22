"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, CircuitBoard, TerminalSquare } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteData } from "@/data/site";
import { useIsMobile } from "@/lib/use-is-mobile";

const nodes = [
  { left: "18%", top: "31%" },
  { left: "36%", top: "48%" },
  { left: "51%", top: "28%" },
  { left: "67%", top: "55%" },
  { left: "81%", top: "36%" },
];

export function BootSequence({ copy }: { copy: SiteData["ui"]["boot"] }) {
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  // Lite on mobile (isMobile !== false covers null first paint) and on reduce-motion.
  // Full overlay only once desktop is confirmed (isMobile === false, no reduce-motion).
  const lite = Boolean(reduceMotion) || isMobile !== false;

  useEffect(() => {
    const timeout = window.setTimeout(
      () => {
        setDone(true);
      },
      reduceMotion ? 700 : lite ? 1500 : 3400,
    );

    return () => window.clearTimeout(timeout);
  }, [reduceMotion, lite]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[90] overflow-hidden bg-[#050607] text-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
          }}
          aria-label={copy.ariaLabel}
        >
          <div className="boot-grid absolute inset-0 opacity-70" />
          {!lite ? (
            <>
              <motion.div
                className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-200 to-transparent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="absolute inset-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {nodes.map((node, index) => (
                  <motion.span
                    key={`${node.left}-${node.top}`}
                    className="absolute grid h-16 w-16 place-items-center rounded-full border border-emerald-300/30 bg-emerald-300/10 shadow-[0_0_44px_rgba(110,231,183,0.18)]"
                    style={node}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: [0, 1, 0.75], scale: 1 }}
                    transition={{
                      delay: 0.38 + index * 0.18,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </motion.span>
                ))}
              </div>
            </>
          ) : null}

          <motion.div
            className="absolute left-1/2 top-1/2 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-2xl shadow-black/60 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-200">
                  <CircuitBoard size={15} />
                  mchomak.system
                </div>
                <h2 className="max-w-xl text-balance text-3xl font-semibold leading-tight sm:text-5xl">
                  {copy.title}
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
                {copy.logs.map((line, index) => (
                  <motion.div
                    key={line}
                    className="grid grid-cols-[28px_1fr_auto] items-center gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.88 + index * 0.28, duration: 0.3 }}
                  >
                    <span className="text-zinc-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="text-emerald-300">&gt;</span> {line}
                    </span>
                    <motion.span
                      className="h-2 w-2 rounded-full bg-emerald-300"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.04 + index * 0.28 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-200 to-amber-200"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.35, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
