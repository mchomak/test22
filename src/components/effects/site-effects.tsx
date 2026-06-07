"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const pointerSpring = { stiffness: 90, damping: 26, mass: 0.35 };

export function SiteEffects() {
  const pointerX = useMotionValue(-200);
  const pointerY = useMotionValue(-200);
  const x = useSpring(pointerX, pointerSpring);
  const y = useSpring(pointerY, pointerSpring);

  useEffect(() => {
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
  }, [pointerX, pointerY]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 z-[60] hidden h-screen w-px bg-gradient-to-b from-transparent via-emerald-300/18 to-transparent md:block"
        style={{ x }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 z-[60] hidden h-px w-screen bg-gradient-to-r from-transparent via-cyan-200/16 to-transparent md:block"
        style={{ y }}
      />
    </>
  );
}
