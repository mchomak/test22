"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useIsMobile } from "@/lib/use-is-mobile";

export type ScrollOrbAnimation =
  | "hero"
  | "deep-pull"
  | "soft-bulge"
  | "ripple"
  | "twist"
  | "calm";

export type ScrollOrbConfig = {
  animation: ScrollOrbAnimation;
  meshScale: number;
  lineOpacity: number;
  inwardStrength: number;
  outwardStrength: number;
  dentSize: number;
  dentSharpness: number;
  waveSpeed: number;
  rotationSpeed: number;
  wobble: number;
  breathing: number;
  twist: number;
  cameraDistance: number;
  preserveDrawingBuffer: boolean;
};

export const defaultScrollOrbConfig: ScrollOrbConfig = {
  animation: "calm",
  meshScale: 1,
  lineOpacity: 0.08,
  inwardStrength: 0,
  outwardStrength: 0,
  dentSize: 0,
  dentSharpness: 1,
  waveSpeed: 0,
  rotationSpeed: 0,
  wobble: 0,
  breathing: 0,
  twist: 0,
  cameraDistance: 0,
  preserveDrawingBuffer: false,
};

export function ScrollOrb() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.46, 0.82, 1],
    [0.2, 0.13, 0.08, 0.12, 0.05],
  );
  const shiftA = useTransform(
    scrollYProgress,
    [0, 0.3, 0.64, 1],
    ["-6vw", "8vw", "-2vw", "5vw"],
  );
  const shiftB = useTransform(
    scrollYProgress,
    [0, 0.36, 0.72, 1],
    ["8vw", "-4vw", "6vw", "-8vw"],
  );
  const yA = useTransform(
    scrollYProgress,
    [0, 0.28, 0.58, 1],
    ["19vh", "42vh", "58vh", "76vh"],
  );
  const yB = useTransform(
    scrollYProgress,
    [0, 0.28, 0.58, 1],
    ["72vh", "56vh", "35vh", "22vh"],
  );

  if (reduceMotion || isMobile !== false) return null;

  return (
    <motion.div
      aria-hidden
      className="scroll-field pointer-events-none fixed inset-0 z-[1] hidden overflow-hidden md:block"
      style={{ opacity }}
    >
      <motion.span
        className="scroll-field-line scroll-field-line-a"
        style={{ x: shiftA, y: yA }}
      />
      <motion.span
        className="scroll-field-line scroll-field-line-b"
        style={{ x: shiftB, y: yB }}
      />
      <span className="scroll-field-plane" />
    </motion.div>
  );
}

export function ScrollOrbCanvas({
  className = "h-full w-full",
}: {
  className?: string;
  config?: Partial<ScrollOrbConfig>;
  reduceMotion?: boolean;
}) {
  return <div aria-hidden className={className} />;
}
