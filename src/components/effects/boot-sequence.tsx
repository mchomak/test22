"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SiteData } from "@/data/site";
import {
  motionDuration,
  motionEasing,
  motionStagger,
} from "@/lib/motion";

export function BootSequence({ copy }: { copy: SiteData["ui"]["boot"] }) {
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();
  const markers = useMemo(
    () => [copy.logs[1], copy.logs.at(-1)].filter(Boolean),
    [copy.logs],
  );

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setDone(true),
      reduceMotion ? 360 : 1180,
    );

    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          aria-label={copy.ariaLabel}
          className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-[var(--color-bg-deep)] text-[var(--text-primary)]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            transition: {
              duration: reduceMotion ? 0.18 : motionDuration.page,
              ease: motionEasing.exit,
            },
          }}
        >
          <div className="boot-grid absolute inset-0 opacity-40" />
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-[var(--accent-signal)] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: reduceMotion ? 0 : 1 }}
            transition={{ duration: 0.72, ease: motionEasing.entrance }}
          />

          <div className="relative z-10 grid w-[min(86vw,680px)] justify-items-center px-4 text-center">
            <motion.div
              className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-[var(--stroke-regular)] bg-white/[0.045] text-[var(--accent-signal)] shadow-[0_0_44px_rgba(125,211,252,0.1)]"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: motionDuration.base,
                ease: motionEasing.entrance,
              }}
            >
              <Code2 size={24} />
            </motion.div>

            <motion.p
              className="eyebrow-muted mb-3 text-[var(--accent-signal)]"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionDuration.base,
                delay: reduceMotion ? 0 : motionStagger.tight,
                ease: motionEasing.entrance,
              }}
            >
              mchomak / production systems
            </motion.p>

            <motion.h2
              className="max-w-2xl text-balance text-3xl font-semibold leading-tight sm:text-5xl"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionDuration.hero,
                delay: reduceMotion ? 0 : motionStagger.relaxed,
                ease: motionEasing.expressive,
              }}
            >
              {copy.title}
            </motion.h2>

            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-2"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionDuration.base,
                delay: reduceMotion ? 0 : motionStagger.relaxed * 2,
                ease: motionEasing.entrance,
              }}
            >
              {markers.map((marker) => (
                <span key={marker} className="tag-pill min-h-0 px-3 py-1.5">
                  {marker}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
