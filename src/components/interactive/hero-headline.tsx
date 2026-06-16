"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  motionDuration,
  motionEasing,
  motionStagger,
} from "@/lib/motion";
import { useIsMobile } from "@/lib/use-is-mobile";

export function HeroHeadline({ lines }: { lines: string[] }) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isStatic = reduceMotion || isMobile !== false;
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 440], [0, -72]), {
    damping: 28,
    mass: 0.35,
    stiffness: 110,
  });
  const scale = useSpring(useTransform(scrollY, [0, 440], [1, 0.66]), {
    damping: 28,
    mass: 0.35,
    stiffness: 110,
  });

  return (
    <motion.h1
      className="hero-headline break-words text-balance font-semibold text-[var(--text-primary)]"
      style={isStatic ? undefined : { scale, y }}
    >
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-1.5">
          <motion.span
            className={[
              "block",
              index === 1 ? "text-[var(--text-secondary)]" : "",
              index === 2 ? "accent-warm" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { y: "112%", rotateX: 18, opacity: 0.4 }
            }
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            transition={{
              duration: reduceMotion ? motionDuration.fast : motionDuration.hero,
              ease: motionEasing.expressive,
              delay: reduceMotion ? 0 : 0.1 + index * motionStagger.base,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
