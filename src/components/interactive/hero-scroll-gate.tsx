"use client";

import { useEffect } from "react";

const gateDurationMs = 1200;
const desktopQuery = "(min-width: 1024px)";
const topThresholdPx = 16;
const blockedKeys = new Set(["ArrowDown", "End", "PageDown", " "]);

export function HeroScrollGate() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia(desktopQuery).matches) return;
    if (window.location.hash && window.location.hash !== "#top") return;

    let releaseAt = 0;
    let unlockTimer: number | undefined;
    let touchY = 0;

    const isNearHeroStart = () => window.scrollY <= topThresholdPx;
    const blockIfNeeded = (event: Event, wantsDown: boolean) => {
      if (!wantsDown || !isNearHeroStart()) return;

      const now = performance.now();
      if (!releaseAt) {
        releaseAt = now + gateDurationMs;
        unlockTimer = window.setTimeout(() => {
          releaseAt = 1;
        }, gateDurationMs);
      }

      if (now < releaseAt) {
        event.preventDefault();
      }
    };

    const onWheel = (event: WheelEvent) => {
      blockIfNeeded(event, event.deltaY > 0);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? touchY;
    };

    const onTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY ?? touchY;
      blockIfNeeded(event, touchY - nextY > 0);
      touchY = nextY;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      blockIfNeeded(event, blockedKeys.has(event.key));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
