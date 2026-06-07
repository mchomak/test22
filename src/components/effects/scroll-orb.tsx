"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import {
  getThreeScenePerformanceProfile,
  scheduleSceneStartup,
  type ThreeScenePerformanceProfile,
} from "@/lib/three-scene-performance";

type ThreeModule = typeof import("three");

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

type ScrollOrbCanvasProps = {
  className?: string;
  config?: Partial<ScrollOrbConfig>;
  reduceMotion?: boolean;
};

type AnimationPreset = {
  inward: number;
  outward: number;
  wave: number;
  rotation: number;
  wobble: number;
  breathing: number;
  twist: number;
};

export const defaultScrollOrbConfig: ScrollOrbConfig = {
  animation: "hero",
  meshScale: 2.45,
  lineOpacity: 0.68,
  inwardStrength: 0.82,
  outwardStrength: 0.14,
  dentSize: 1,
  dentSharpness: 2.4,
  waveSpeed: 1,
  rotationSpeed: 1,
  wobble: 1,
  breathing: 1,
  twist: 0,
  cameraDistance: 4.2,
  preserveDrawingBuffer: false,
};

const animationPresets: Record<ScrollOrbAnimation, AnimationPreset> = {
  hero: {
    inward: 1,
    outward: 1,
    wave: 1,
    rotation: 1,
    wobble: 1,
    breathing: 1,
    twist: 1,
  },
  "deep-pull": {
    inward: 1.28,
    outward: 0.75,
    wave: 1.08,
    rotation: 0.92,
    wobble: 1.08,
    breathing: 0.9,
    twist: 0.75,
  },
  "soft-bulge": {
    inward: 0.55,
    outward: 2.55,
    wave: 0.82,
    rotation: 0.78,
    wobble: 0.82,
    breathing: 1.45,
    twist: 0.7,
  },
  ripple: {
    inward: 0.82,
    outward: 1.42,
    wave: 1.8,
    rotation: 1.08,
    wobble: 1.45,
    breathing: 2.1,
    twist: 0.9,
  },
  twist: {
    inward: 0.92,
    outward: 1.18,
    wave: 1.18,
    rotation: 1.28,
    wobble: 1.05,
    breathing: 1.05,
    twist: 2.4,
  },
  calm: {
    inward: 0.62,
    outward: 0.7,
    wave: 0.42,
    rotation: 0.46,
    wobble: 0.42,
    breathing: 0.62,
    twist: 0.35,
  },
};

export function ScrollOrb() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const x = useTransform(
    scrollYProgress,
    [0, 0.16, 0.32, 0.5, 0.68, 0.84, 1],
    ["57vw", "33vw", "18vw", "48vw", "74vw", "62vw", "35vw"],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.16, 0.32, 0.5, 0.68, 0.84, 1],
    ["47vh", "30vh", "45vh", "62vh", "50vh", "75vh", "82vh"],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.55, 0.78, 1],
    [1, 0.88, 1.08, 0.92, 1.02],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.5, 0.9, 1],
    [0.12, 0.1, 0.085, 0.1, 0.06],
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[352px] w-[352px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen md:h-[512px] md:w-[512px]"
      style={{ x, y, scale, opacity }}
    >
      <ScrollOrbCanvas reduceMotion={Boolean(reduceMotion)} />
    </motion.div>
  );
}

export function ScrollOrbCanvas({
  className = "h-full w-full",
  config,
  reduceMotion = false,
}: ScrollOrbCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const orbConfig = useMemo(
    () => ({ ...defaultScrollOrbConfig, ...config }),
    [config],
  );
  const configRef = useRef<ScrollOrbConfig>(orbConfig);

  useEffect(() => {
    configRef.current = orbConfig;
  }, [orbConfig]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const performanceProfile = getThreeScenePerformanceProfile("ambient");

    const cancelStartup = scheduleSceneStartup(() => {
      void import("three")
        .then((THREE) => {
          if (cancelled || !mount.isConnected) return;
          cleanup = setupScrollOrb(
            THREE,
            mount,
            configRef,
            reduceMotion,
            performanceProfile,
          );
        })
        .catch(() => {});
    }, performanceProfile.startupDelayMs);

    return () => {
      cancelled = true;
      cancelStartup?.();
      cleanup?.();
    };
  }, [reduceMotion]);

  return <div ref={mountRef} className={className} />;
}

function setupScrollOrb(
  THREE: ThreeModule,
  mount: HTMLDivElement,
  configRef: { current: ScrollOrbConfig },
  reduceMotion: boolean,
  performanceProfile: ThreeScenePerformanceProfile,
) {
  const initialConfig = configRef.current;
  let width = Math.max(mount.clientWidth, 1);
  let height = Math.max(mount.clientHeight, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 20);
  camera.position.set(0, 0, initialConfig.cameraDistance);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: initialConfig.preserveDrawingBuffer,
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, performanceProfile.maxPixelRatio),
  );
  renderer.setSize(width, height);
  renderer.domElement.className = "h-full w-full";
  mount.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry(
    0.34,
    performanceProfile.orbDetail,
  );
  const positionAttribute = geometry.getAttribute(
    "position",
  ) as import("three").BufferAttribute;
  const basePositions = new Float32Array(
    positionAttribute.array as Float32Array,
  );
  const dentDirections = [
    new THREE.Vector3(1, 0.18, 0.12).normalize(),
    new THREE.Vector3(0.18, 0.92, -0.28).normalize(),
    new THREE.Vector3(-0.72, 0.18, 0.62).normalize(),
    new THREE.Vector3(-0.16, -0.96, 0.22).normalize(),
    new THREE.Vector3(0.56, -0.42, -0.72).normalize(),
  ];
  const vertexDirection = new THREE.Vector3();
  const material = new THREE.MeshBasicMaterial({
    color: "#a7f3d0",
    wireframe: true,
    transparent: true,
    opacity: initialConfig.lineOpacity,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.setScalar(initialConfig.meshScale);
  mesh.rotation.set(0.18, -0.36, 0.08);
  scene.add(mesh);

  const resize = () => {
    width = Math.max(mount.clientWidth, 1);
    height = Math.max(mount.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(mount);

  let frameId = 0;
  let running = false;
  let lastFrameAt = 0;
  const startedAt = performance.now();

  const deformOrb = (
    elapsed: number,
    config: ScrollOrbConfig,
    preset: AnimationPreset,
  ) => {
    const threshold = THREE.MathUtils.clamp(
      0.72 - config.dentSize * 0.34,
      0.08,
      0.68,
    );
    const thresholdRange = Math.max(0.001, 1 - threshold);
    const sharpness = Math.max(0.25, config.dentSharpness);
    const waveSpeed = Math.max(0, config.waveSpeed) * preset.wave;
    const inwardStrength = config.inwardStrength * preset.inward;
    const outwardStrength = config.outwardStrength * preset.outward;
    const twistStrength = config.twist * preset.twist;

    for (let index = 0; index < positionAttribute.count; index += 1) {
      const offset = index * 3;
      const baseX = basePositions[offset];
      const baseY = basePositions[offset + 1];
      const baseZ = basePositions[offset + 2];

      vertexDirection.set(baseX, baseY, baseZ).normalize();

      let inward = 0;
      let outward = 0;
      dentDirections.forEach((center, centerIndex) => {
        const cycle =
          (elapsed * 0.16 * waveSpeed + centerIndex / dentDirections.length) % 1;
        const wave = Math.sin(cycle * Math.PI * 2);
        const influence = Math.pow(
          Math.max(0, (vertexDirection.dot(center) - threshold) / thresholdRange),
          sharpness,
        );

        inward = Math.max(inward, influence * Math.pow(Math.max(0, wave), 3));
        outward = Math.max(
          outward,
          influence * Math.pow(Math.max(0, -wave), 3.6),
        );
      });

      const breathing =
        1 +
        Math.sin(elapsed * 1.1 * waveSpeed + baseX * 7) *
          0.018 *
          config.breathing *
          preset.breathing;
      const radialScale = Math.max(
        0.22,
        breathing + outward * outwardStrength - inward * inwardStrength,
      );

      let x = baseX * radialScale;
      const y = baseY * radialScale;
      let z = baseZ * radialScale;

      if (twistStrength > 0) {
        const twistAngle =
          (baseY * 7 + elapsed * 0.42 * waveSpeed) *
          twistStrength *
          (0.18 + inward * 0.62 + outward * 0.36);
        const cos = Math.cos(twistAngle);
        const sin = Math.sin(twistAngle);
        const nextX = x * cos - z * sin;
        z = x * sin + z * cos;
        x = nextX;
      }

      positionAttribute.setXYZ(index, x, y, z);
    }

    positionAttribute.needsUpdate = true;
  };

  const render = () => {
    const elapsed = (performance.now() - startedAt) / 1000;
    const config = configRef.current;
    const preset = animationPresets[config.animation];

    material.opacity = config.lineOpacity;
    mesh.scale.setScalar(config.meshScale);
    camera.position.z = config.cameraDistance;

    if (!reduceMotion) {
      deformOrb(elapsed, config, preset);
      mesh.rotation.y =
        -0.36 + elapsed * 0.09 * config.rotationSpeed * preset.rotation;
      mesh.rotation.x =
        0.18 +
        Math.sin(elapsed * 0.18 * preset.wobble) *
          0.08 *
          config.wobble;
      mesh.rotation.z =
        0.08 + elapsed * 0.035 * config.rotationSpeed * preset.rotation;
    } else {
      deformOrb(0, config, preset);
    }

    renderer.render(scene, camera);
  };

  const loop = (now: number) => {
    if (!running) return;

    if (now - lastFrameAt >= performanceProfile.frameIntervalMs) {
      render();
      lastFrameAt = now;
    }

    frameId = window.requestAnimationFrame(loop);
  };

  const stopLoop = () => {
    running = false;
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const startLoop = () => {
    if (running || reduceMotion || document.visibilityState !== "visible") return;
    running = true;
    frameId = window.requestAnimationFrame(loop);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      render();
      startLoop();
    } else {
      stopLoop();
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  render();
  startLoop();

  return () => {
    stopLoop();
    observer.disconnect();
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    if (renderer.domElement.parentNode === mount) {
      mount.removeChild(renderer.domElement);
    }
  };
}
