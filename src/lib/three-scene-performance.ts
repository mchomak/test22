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
  const saveData = Boolean(connection?.saveData);
  const slowNetwork =
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";

  // Tier purely on real capability hints (CPU/memory/network/save-data).
  // A touch screen or a narrow viewport is NOT treated as "weak" — modern
  // phones run the full scene at 60fps; only genuinely low-end devices degrade.
  const constrained =
    saveData ||
    slowNetwork ||
    deviceMemory <= 3 ||
    cpuCores <= 4;

  const veryConstrained =
    saveData ||
    slowNetwork ||
    deviceMemory <= 2 ||
    cpuCores <= 2;

  if (kind === "ambient") {
    return {
      startupDelayMs: veryConstrained ? 2800 : constrained ? 1800 : 1200,
      maxPixelRatio: veryConstrained ? 0.75 : constrained ? 1 : 1.25,
      particleScale: 1,
      curveSegments: 0,
      nodeSegments: 0,
      ringSegments: 0,
      orbitSegments: 0,
      pulseSegments: 0,
      orbDetail: veryConstrained ? 2 : constrained ? 2 : 3,
      frameIntervalMs: veryConstrained ? 1000 / 24 : constrained ? 1000 / 36 : 1000 / 60,
    };
  }

  return {
    startupDelayMs: veryConstrained ? 1600 : constrained ? 900 : 500,
    maxPixelRatio: veryConstrained ? 0.85 : constrained ? 1 : 1.25,
    particleScale: veryConstrained ? 0.5 : constrained ? 0.75 : 1,
    curveSegments: veryConstrained ? 24 : constrained ? 36 : 48,
    nodeSegments: veryConstrained ? 14 : constrained ? 20 : 28,
    ringSegments: veryConstrained ? 26 : constrained ? 36 : 48,
    orbitSegments: veryConstrained ? 56 : constrained ? 84 : 120,
    pulseSegments: veryConstrained ? 10 : constrained ? 14 : 18,
    orbDetail: 0,
    frameIntervalMs: veryConstrained ? 1000 / 30 : constrained ? 1000 / 45 : 1000 / 60,
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
