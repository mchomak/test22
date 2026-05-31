"use client";

import { useEffect, useRef } from "react";

export function SiteEffects() {
  const xLineRef = useRef<HTMLDivElement>(null);
  const yLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    let frameId = 0;
    let x = -200;
    let y = -200;

    const paint = () => {
      frameId = 0;
      if (xLineRef.current) {
        xLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      if (yLineRef.current) {
        yLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frameId) {
        frameId = window.requestAnimationFrame(paint);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <>
      <div
        ref={xLineRef}
        aria-hidden
        className="pointer-events-none fixed top-0 z-[60] hidden h-screen w-px translate-x-[-200px] bg-gradient-to-b from-transparent via-emerald-300/18 to-transparent transition-transform duration-150 ease-out md:block"
      />
      <div
        ref={yLineRef}
        aria-hidden
        className="pointer-events-none fixed left-0 z-[60] hidden h-px w-screen translate-y-[-200px] bg-gradient-to-r from-transparent via-cyan-200/16 to-transparent transition-transform duration-150 ease-out md:block"
      />
    </>
  );
}
