export type ThreeSceneKind = "hero" | "ambient";

export type ThreeScenePerformanceProfile = {
  startupDelayMs: number;
  maxPixelRatio: number;
  particleScale: number;
  curveSegments: number;
  nodeSegments: number;
  ringSegments: number;
  orbitSegments: number;
  pulseSegments: number;
  orbDetail: number;
  frameIntervalMs: number;
};

type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
};

type NavigatorWithHints = Navigator & {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
};

export function getThreeScenePerformanceProfile(
  kind: ThreeSceneKind,
): ThreeScenePerformanceProfile {
  const navigatorHints = navigator as NavigatorWithHints;
  const connection = navigatorHints.connection;
  const deviceMemory = navigatorHints.deviceMemory ?? 8;
  const cpuCores = navigator.hardwareConcurrency ?? 8;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isSmallViewport = window.innerWidth < 768;
  const isVerySmallViewport = window.innerWidth < 480;
  const saveData = Boolean(connection?.saveData);
  const slowNetwork =
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";

  const constrained =
    saveData ||
    slowNetwork ||
    isCoarsePointer ||
    isSmallViewport ||
    deviceMemory <= 4 ||
    cpuCores <= 4;

  const veryConstrained =
    saveData ||
    slowNetwork ||
    isVerySmallViewport ||
    deviceMemory <= 2 ||
    cpuCores <= 2;

  if (kind === "ambient") {
    return {
      startupDelayMs: veryConstrained ? 5800 : constrained ? 5200 : 4600,
      maxPixelRatio: veryConstrained ? 0.75 : constrained ? 0.85 : 1,
      particleScale: 1,
      curveSegments: 0,
      nodeSegments: 0,
      ringSegments: 0,
      orbitSegments: 0,
      pulseSegments: 0,
      orbDetail: veryConstrained ? 2 : constrained ? 2 : 3,
      frameIntervalMs: veryConstrained ? 1000 / 20 : constrained ? 1000 / 24 : 1000 / 30,
    };
  }

  return {
    startupDelayMs: veryConstrained ? 3900 : constrained ? 3400 : 3000,
    maxPixelRatio: veryConstrained ? 0.85 : constrained ? 0.95 : 1.1,
    particleScale: veryConstrained ? 0.48 : constrained ? 0.62 : 0.82,
    curveSegments: veryConstrained ? 24 : constrained ? 30 : 40,
    nodeSegments: veryConstrained ? 14 : constrained ? 18 : 22,
    ringSegments: veryConstrained ? 26 : constrained ? 32 : 40,
    orbitSegments: veryConstrained ? 56 : constrained ? 72 : 96,
    pulseSegments: veryConstrained ? 10 : constrained ? 12 : 14,
    orbDetail: 0,
    frameIntervalMs: veryConstrained ? 1000 / 24 : constrained ? 1000 / 30 : 1000 / 45,
  };
}

export function scheduleSceneStartup(
  callback: () => void,
  delayMs: number,
) {
  let cancelled = false;
  let loadListener: (() => void) | null = null;
  let frameId = 0;
  let timeoutId: ReturnType<typeof globalThis.setTimeout> | null = null;
  let idleId: number | null = null;

  const run = () => {
    if (cancelled) return;
    callback();
  };

  const scheduleIdle = () => {
    if (cancelled) return;

    const requestIdle = window.requestIdleCallback?.bind(window);
    if (requestIdle) {
      idleId = requestIdle(run, { timeout: delayMs });
      return;
    }

    timeoutId = globalThis.setTimeout(run, delayMs);
  };

  const scheduleAfterPaint = () => {
    frameId = window.requestAnimationFrame(() => {
      frameId = window.requestAnimationFrame(() => {
        timeoutId = globalThis.setTimeout(scheduleIdle, delayMs);
      });
    });
  };

  if (document.readyState === "complete") {
    scheduleAfterPaint();
  } else {
    loadListener = scheduleAfterPaint;
    window.addEventListener("load", loadListener, { once: true });
  }

  return () => {
    cancelled = true;

    if (loadListener) {
      window.removeEventListener("load", loadListener);
    }

    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }

    if (timeoutId) {
      globalThis.clearTimeout(timeoutId);
    }

    if (idleId !== null) {
      window.cancelIdleCallback?.(idleId);
    }
  };
}
