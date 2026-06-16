"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import {
  motionDuration,
  motionEasing,
  revealViewport,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "section" | "hero" | "panel" | "quiet";
} & Pick<HTMLMotionProps<"div">, "id">;

const revealDistance = {
  section: 38,
  hero: 24,
  panel: 30,
  quiet: 18,
};

const revealScale = {
  section: 0.985,
  hero: 0.992,
  panel: 0.99,
  quiet: 1,
};

export function Reveal({
  children,
  delay = 0,
  className,
  id,
  variant = "section",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: revealDistance[variant],
        scale: revealScale[variant],
      };

  return (
    <motion.div
      id={id}
      className={["reveal", className].filter(Boolean).join(" ")}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={revealViewport}
      transition={{
        duration: reduceMotion ? motionDuration.fast : motionDuration.reveal,
        ease: motionEasing.entrance,
        delay: reduceMotion ? 0 : delay,
      }}
      style={{ transformOrigin: "50% 0%" }}
    >
      {children}
    </motion.div>
  );
}
