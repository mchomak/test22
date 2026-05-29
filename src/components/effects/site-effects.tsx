"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function SiteEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[70] h-px w-full origin-left bg-gradient-to-r from-emerald-300 via-cyan-200 to-amber-200"
        style={{ scaleX }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 z-[60] hidden h-screen w-px bg-gradient-to-b from-transparent via-emerald-300/18 to-transparent md:block"
        animate={{ x: position.x }}
        transition={{ type: "spring", stiffness: 90, damping: 26, mass: 0.35 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 z-[60] hidden h-px w-screen bg-gradient-to-r from-transparent via-cyan-200/16 to-transparent md:block"
        animate={{ y: position.y }}
        transition={{ type: "spring", stiffness: 90, damping: 26, mass: 0.35 }}
      />
    </>
  );
}
