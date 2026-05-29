"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type SectionBridgeProps = {
  from: string;
  to: string;
  tone?: "emerald" | "cyan" | "amber";
};

const toneClass = {
  emerald: "from-emerald-300 via-cyan-200 to-emerald-300",
  cyan: "from-cyan-200 via-emerald-300 to-cyan-200",
  amber: "from-amber-200 via-emerald-300 to-cyan-200",
};

export function SectionBridge({
  from,
  to,
  tone = "emerald",
}: SectionBridgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleX = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0.15, 0.85], ["-12%", "92%"]);

  return (
    <div
      ref={ref}
      className="relative z-20 -my-6 mx-auto h-20 max-w-7xl px-4 sm:px-6 lg:-my-8 lg:h-28 lg:px-8"
      aria-hidden
    >
      <motion.div
        className="absolute inset-x-4 top-1/2 h-px origin-left bg-white/10 sm:inset-x-6 lg:inset-x-8"
        style={{ opacity }}
      />
      <motion.div
        className={`absolute inset-x-4 top-1/2 h-px origin-left bg-gradient-to-r sm:inset-x-6 lg:inset-x-8 ${toneClass[tone]} shadow-[0_0_24px_rgba(110,231,183,0.35)]`}
        style={{ scaleX, opacity }}
      />
      <motion.div
        className="absolute top-[calc(50%-14px)] grid h-7 w-7 place-items-center rounded-full border border-emerald-300/35 bg-[#07100e] shadow-[0_0_34px_rgba(110,231,183,0.16)] lg:top-[calc(50%-18px)] lg:h-9 lg:w-9"
        style={{ left: x, opacity }}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-300" />
      </motion.div>
      <motion.div
        className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600 sm:left-6 lg:left-8 lg:top-7 lg:text-[10px]"
        style={{ opacity }}
      >
        {from}
      </motion.div>
      <motion.div
        className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600 sm:right-6 lg:right-8 lg:top-7 lg:text-[10px]"
        style={{ opacity }}
      >
        {to}
      </motion.div>
    </div>
  );
}
