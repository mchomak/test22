"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";

const pointerSpring = { stiffness: 90, damping: 26, mass: 0.35 };

export function SiteEffects() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-200);
  const pointerY = useMotionValue(-200);
  const x = useSpring(pointerX, pointerSpring);
  const y = useSpring(pointerY, pointerSpring);

  useEffect(() => {
    if (reduceMotion) return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <>
      {!reduceMotion ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-trace-y pointer-events-none fixed top-0 z-[60] hidden h-screen w-px md:block"
            style={{ x }}
          />
          <motion.div
            aria-hidden
            className="pointer-trace-x pointer-events-none fixed left-0 z-[60] hidden h-px w-screen md:block"
            style={{ y }}
          />
        </>
      ) : null}
    </>
  );
}
