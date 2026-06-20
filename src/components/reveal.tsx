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

export function Reveal({
  children,
  delay = 0,
  className,
  id,
  variant = "section",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      data-reveal-variant={variant}
      className={["reveal", className].filter(Boolean).join(" ")}
      initial={false}
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
