"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/use-is-mobile";
import {
  getThreeScenePerformanceProfile,
  scheduleSceneStartup,
  type ThreeScenePerformanceProfile,
} from "@/lib/three-scene-performance";

type ThreeModule = typeof import("three");
export type EngineeringSceneMode = "network" | "sphere" | "helix" | "radial";
export type EngineeringSceneMotion =
  | "hero"
  | "spiral"
  | "breathe"
  | "wave"
  | "bloom"
  | "calm";
export type EngineeringScenePalette = "emerald" | "cyan" | "amber" | "violet";
export type EngineeringSceneSurface = "none" | "wire" | "facets" | "halo";

export type EngineeringSceneProps = {
  showCore?: boolean;
  mode?: EngineeringSceneMode;
  motionStyle?: EngineeringSceneMotion;
  palette?: EngineeringScenePalette;
  surface?: EngineeringSceneSurface;
  scale?: number;
  bulge?: number;
  curveBend?: number;
  breathAmount?: number;
  nodeScale?: number;
  coreScale?: number;
  particleDensity?: number;
  orbitScale?: number;
  lineOpacity?: number;
  rotationSpeed?: number;
  pulseSpeed?: number;
  cameraDistance?: number;
  preserveDrawingBuffer?: boolean;
};

type EngineeringSceneConfig = Required<EngineeringSceneProps>;

const nodePositionTuples = [
  [-2.8, 1.4, 0.1],
  [-1.55, -0.2, 0.55],
  [0, 0.58, 0],
  [1.5, 1.25, -0.35],
  [2.65, 0.05, 0.2],
  [1.25, -1.35, 0.42],
  [-1.75, -1.35, -0.28],
] as const;

const edges = [
  [0, 2],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [6, 1],
  [6, 5],
  [4, 5],
] as const;

const paletteMap: Record<
  EngineeringScenePalette,
  {
    node: string;
    secondary: string;
    line: string;
    warmLine: string;
    core: string;
    ring: string;
    pulse: string;
    surface: string;
  }
> = {
  emerald: {
    node: "#6ee7b7",
    secondary: "#67e8f9",
    line: "#67e8f9",
    warmLine: "#fbbf24",
    core: "#a7f3d0",
    ring: "#34d399",
    pulse: "#fef3c7",
    surface: "#67e8f9",
  },
  cyan: {
    node: "#67e8f9",
    secondary: "#a5f3fc",
    line: "#22d3ee",
    warmLine: "#38bdf8",
    core: "#cffafe",
    ring: "#06b6d4",
    pulse: "#e0f2fe",
    surface: "#38bdf8",
  },
  amber: {
    node: "#fbbf24",
    secondary: "#fde68a",
    line: "#f59e0b",
    warmLine: "#2dd4bf",
    core: "#fef3c7",
    ring: "#f59e0b",
    pulse: "#ecfeff",
    surface: "#fbbf24",
  },
  violet: {
    node: "#c084fc",
    secondary: "#67e8f9",
    line: "#a78bfa",
    warmLine: "#f472b6",
    core: "#ddd6fe",
    ring: "#8b5cf6",
    pulse: "#f5d0fe",
    surface: "#c084fc",
  },
};

const defaultConfig: EngineeringSceneConfig = {
  showCore: true,
  mode: "network",
  motionStyle: "hero",
  palette: "emerald",
  surface: "none",
  scale: 1,
  bulge: 1,
  curveBend: 1,
  breathAmount: 1,
  nodeScale: 1,
  coreScale: 1,
  particleDensity: 1,
  orbitScale: 1,
  lineOpacity: 1,
  rotationSpeed: 1,
  pulseSpeed: 1,
  cameraDistance: 8.8,
  preserveDrawingBuffer: false,
};

type SceneLayout = {
  positions: import("three").Vector3[];
  edges: Array<readonly [number, number]>;
  coreIndex: number;
  radius: number;
};

function createSceneLayout(
  THREE: ThreeModule,
  mode: EngineeringSceneMode,
  scale: number,
  bulge: number,
): SceneLayout {
  const depth = THREE.MathUtils.clamp(bulge, 0.22, 2.2);

  if (mode === "sphere") {
    const radius = 2.42 * scale;
    const surfaceCount = 16;
    const positions = [new THREE.Vector3(0, 0, 0)];

    for (let index = 0; index < surfaceCount; index += 1) {
      const y = 1 - (index / (surfaceCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = index * Math.PI * (3 - Math.sqrt(5));
      positions.push(
        new THREE.Vector3(
          Math.cos(theta) * radiusAtY * radius,
          y * radius * 0.78,
          Math.sin(theta) * radiusAtY * radius * 0.58 * depth,
        ),
      );
    }

    const sphereEdges: Array<readonly [number, number]> = [];
    for (let index = 1; index < positions.length; index += 1) {
      sphereEdges.push([0, index]);
      sphereEdges.push([index, index === positions.length - 1 ? 1 : index + 1]);
    }

    return { positions, edges: sphereEdges, coreIndex: 0, radius: radius * Math.max(1, depth * 0.72) };
  }

  if (mode === "helix") {
    const radius = 2.16 * scale;
    const positions = [new THREE.Vector3(0, 0, 0)];
    const steps = 15;

    for (let index = 0; index < steps; index += 1) {
      const t = index / (steps - 1);
      const angle = index * 0.92;
      positions.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          (t - 0.5) * 3.9 * scale,
          Math.sin(angle) * radius * 0.64 * depth,
        ),
      );
    }

    const helixEdges: Array<readonly [number, number]> = [];
    for (let index = 1; index < positions.length; index += 1) {
      if (index > 1) helixEdges.push([index - 1, index]);
      if (index % 3 === 1) helixEdges.push([0, index]);
    }

    return { positions, edges: helixEdges, coreIndex: 0, radius: radius * Math.max(1, depth * 0.64) };
  }

  if (mode === "radial") {
    const radius = 2.28 * scale;
    const tuples = [
      [0, 0, 0],
      [-radius, 0.1 * scale, 0],
      [radius, -0.1 * scale, 0],
      [0, radius * 0.72, 0.12 * scale],
      [0, -radius * 0.72, -0.12 * scale],
      [-radius * 0.68, radius * 0.42, -0.32 * scale],
      [radius * 0.68, radius * 0.42, 0.32 * scale],
      [-radius * 0.68, -radius * 0.42, 0.32 * scale],
      [radius * 0.68, -radius * 0.42, -0.32 * scale],
      [0, 0, radius * 0.72],
      [0, 0, -radius * 0.72],
    ] as const;
    const positions = tuples.map(([x, y, z]) => new THREE.Vector3(x, y, z * depth));
    const radialEdges: Array<readonly [number, number]> = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 9],
      [0, 10],
      [1, 5],
      [5, 3],
      [3, 6],
      [6, 2],
      [2, 8],
      [8, 4],
      [4, 7],
      [7, 1],
      [5, 9],
      [6, 9],
      [7, 10],
      [8, 10],
    ];

    return { positions, edges: radialEdges, coreIndex: 0, radius: radius * Math.max(1, depth * 0.72) };
  }

  return {
    positions: nodePositionTuples.map(
      ([x, y, z]) => new THREE.Vector3(x * scale, y * scale, z * scale * depth),
    ),
    edges: [...edges],
    coreIndex: 2,
    radius: 2.8 * scale * Math.max(1, depth * 0.5),
  };
}

function createSurfaceMesh(
  THREE: ThreeModule,
  config: EngineeringSceneConfig,
  color: string,
  radius: number,
  track: <T extends { dispose: () => void }>(item: T) => T,
) {
  if (config.surface === "none") return null;

  const surfaceRadius = radius * (config.mode === "network" ? 0.72 : 1.02);
  const geometry = track(
    config.surface === "facets"
      ? new THREE.IcosahedronGeometry(surfaceRadius, 2)
      : new THREE.SphereGeometry(surfaceRadius, 42, 24),
  );
  const material = track(
    new THREE.MeshBasicMaterial({
      color,
      depthWrite: false,
      opacity: config.surface === "halo" ? 0.055 : 0.16,
      side: THREE.DoubleSide,
      transparent: true,
      wireframe: config.surface !== "halo",
    }),
  );

  return new THREE.Mesh(geometry, material);
}

export function EngineeringScene({
  showCore = defaultConfig.showCore,
  mode = defaultConfig.mode,
  motionStyle = defaultConfig.motionStyle,
  palette = defaultConfig.palette,
  surface = defaultConfig.surface,
  scale = defaultConfig.scale,
  bulge = defaultConfig.bulge,
  curveBend = defaultConfig.curveBend,
  breathAmount = defaultConfig.breathAmount,
  nodeScale = defaultConfig.nodeScale,
  coreScale = defaultConfig.coreScale,
  particleDensity = defaultConfig.particleDensity,
  orbitScale = defaultConfig.orbitScale,
  lineOpacity = defaultConfig.lineOpacity,
  rotationSpeed = defaultConfig.rotationSpeed,
  pulseSpeed = defaultConfig.pulseSpeed,
  cameraDistance = defaultConfig.cameraDistance,
  preserveDrawingBuffer = defaultConfig.preserveDrawingBuffer,
}: EngineeringSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile !== false) return;

    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const performanceProfile = getThreeScenePerformanceProfile("hero");

    const cancelStartup = scheduleSceneStartup(() => {
      void import("three")
        .then((THREE) => {
          if (cancelled || !mount.isConnected) return;
          cleanup = setupEngineeringScene(
            THREE,
            mount,
            {
              showCore,
              mode,
              motionStyle,
              palette,
              surface,
              scale,
              bulge,
              curveBend,
              breathAmount,
              nodeScale,
              coreScale,
              particleDensity,
              orbitScale,
              lineOpacity,
              rotationSpeed,
              pulseSpeed,
              cameraDistance,
              preserveDrawingBuffer,
            },
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
  }, [
    cameraDistance,
    breathAmount,
    bulge,
    curveBend,
    coreScale,
    isMobile,
    lineOpacity,
    mode,
    motionStyle,
    nodeScale,
    orbitScale,
    palette,
    particleDensity,
    preserveDrawingBuffer,
    pulseSpeed,
    rotationSpeed,
    scale,
    showCore,
    surface,
  ]);

  // Mobile (<=768px): skip the WebGL scene entirely — the `three` chunk is
  // never imported (see the effect guard above) and nothing is rendered.
  if (isMobile !== false) return null;

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 z-0 overflow-hidden"
    />
  );
}

function setupEngineeringScene(
  THREE: ThreeModule,
  mount: HTMLDivElement,
  config: EngineeringSceneConfig,
  performanceProfile: ThreeScenePerformanceProfile,
) {
  let width = Math.max(mount.clientWidth, 1);
  let height = Math.max(mount.clientHeight, 1);
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const disposables = new Set<{ dispose: () => void }>();
  const track = <T extends { dispose: () => void }>(item: T) => {
    disposables.add(item);
    return item;
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
  camera.position.set(0, 0.05, config.cameraDistance);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: config.preserveDrawingBuffer,
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, performanceProfile.maxPixelRatio),
  );
  renderer.setSize(width, height);
  renderer.domElement.className = "h-full w-full";
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const layout = createSceneLayout(THREE, config.mode, config.scale, config.bulge);
  const nodePositions = layout.positions;
  const palette = paletteMap[config.palette];

  const particleGeometry = track(new THREE.BufferGeometry());
  const particleCount = Math.round(
    620 * config.particleDensity * performanceProfile.particleScale,
  );
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 9 * config.scale;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5.8 * config.scale;
    particlePositions[i * 3 + 2] =
      (Math.random() - 0.5) * 3.6 * config.scale * config.bulge;
  }
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3),
  );
  const particles = new THREE.Points(
    particleGeometry,
    track(
      new THREE.PointsMaterial({
        color: palette.node,
        size: 0.012 * config.nodeScale,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    ),
  );
  group.add(particles);

  const lineMaterial = track(
    new THREE.LineBasicMaterial({
      color: palette.line,
      transparent: true,
      opacity: 0.28 * config.lineOpacity,
    }),
  );
  const warmLineMaterial = track(
    new THREE.LineBasicMaterial({
      color: palette.warmLine,
      transparent: true,
      opacity: 0.18 * config.lineOpacity,
    }),
  );
  const curves: Array<import("three").CatmullRomCurve3> = [];

  layout.edges.forEach(([from, to], index) => {
    const start = nodePositions[from];
    const end = nodePositions[to];
    const middle = start
      .clone()
      .lerp(end, 0.5)
      .add(
        new THREE.Vector3(
          0,
          (index % 2 === 0 ? 0.32 : -0.22) * config.curveBend,
          0.28 * config.curveBend * config.bulge,
        ),
      );
    const curve = new THREE.CatmullRomCurve3([start, middle, end]);
    curves.push(curve);
    const points = curve.getPoints(performanceProfile.curveSegments);
    const geometry = track(new THREE.BufferGeometry().setFromPoints(points));
    const line = new THREE.Line(
      geometry,
      index === 3 || index === 7 ? warmLineMaterial : lineMaterial,
    );
    group.add(line);
  });

  const nodeGeometry = track(
    new THREE.SphereGeometry(
      0.085 * config.nodeScale,
      performanceProfile.nodeSegments,
      performanceProfile.nodeSegments,
    ),
  );
  const coreGeometry = track(
    config.surface === "halo"
      ? new THREE.SphereGeometry(
          0.34 * config.coreScale,
          performanceProfile.nodeSegments,
          Math.max(10, Math.round(performanceProfile.nodeSegments * 0.7)),
        )
      : new THREE.IcosahedronGeometry(0.34 * config.coreScale, 1),
  );
  const nodeMaterial = track(
    new THREE.MeshBasicMaterial({
      color: palette.node,
      transparent: true,
      opacity: 0.96,
    }),
  );
  const secondaryNodeMaterial = track(
    new THREE.MeshBasicMaterial({
      color: palette.secondary,
      transparent: true,
      opacity: 0.9,
    }),
  );
  const coreMaterial = track(
    new THREE.MeshBasicMaterial({
      color: palette.core,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    }),
  );
  const ringMaterial = track(
    new THREE.MeshBasicMaterial({
      color: palette.ring,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    }),
  );

  nodePositions.forEach((position, index) => {
    if (index === layout.coreIndex && !config.showCore) return;

    const mesh = new THREE.Mesh(
      index === layout.coreIndex ? coreGeometry : nodeGeometry,
      index === layout.coreIndex
        ? coreMaterial
        : index % 3 === 0
          ? secondaryNodeMaterial
          : nodeMaterial,
    );
    mesh.position.copy(position);
    group.add(mesh);

    const ring = new THREE.Mesh(
      track(
        new THREE.RingGeometry(
          index === layout.coreIndex ? 0.52 * config.coreScale : 0.17 * config.nodeScale,
          index === layout.coreIndex ? 0.54 * config.coreScale : 0.18 * config.nodeScale,
          performanceProfile.ringSegments,
        ),
      ),
      ringMaterial,
    );
    ring.position.copy(position);
    ring.lookAt(camera.position);
    group.add(ring);
  });

  const surfaceMesh = createSurfaceMesh(THREE, config, palette.surface, layout.radius, track);
  if (surfaceMesh) {
    surfaceMesh.position.copy(nodePositions[layout.coreIndex]);
    group.add(surfaceMesh);
  }

  const pulseGeometry = track(
    new THREE.SphereGeometry(
      0.04 * config.nodeScale,
      performanceProfile.pulseSegments,
      performanceProfile.pulseSegments,
    ),
  );
  const pulseMaterial = track(
    new THREE.MeshBasicMaterial({
      color: palette.pulse,
      transparent: true,
      opacity: 0.92,
    }),
  );
  const pulses = curves.map((curve, index) => {
    const pulse = new THREE.Mesh(pulseGeometry, track(pulseMaterial.clone()));
    pulse.userData = {
      curve,
      offset: index / curves.length,
      speed: (0.085 + index * 0.006) * config.pulseSpeed,
    };
    group.add(pulse);
    return pulse;
  });

  const orbitGeometry = track(
    new THREE.TorusGeometry(
      1.12 * config.orbitScale * config.scale,
      0.006,
      8,
      performanceProfile.orbitSegments,
    ),
  );
  const orbitMaterial = track(
    new THREE.MeshBasicMaterial({
      color: palette.node,
      transparent: true,
      opacity: 0.22,
    }),
  );
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  if (config.showCore) {
    orbit.position.copy(nodePositions[layout.coreIndex]);
    orbit.rotation.x = 1.22;
    group.add(orbit);
  }

  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    const rect = mount.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };
  mount.addEventListener("pointermove", onPointerMove, { passive: true });

  let frameId = 0;
  let isVisible = true;
  let isDisposed = false;
  let lastFrameAt = 0;
  const startedAt = performance.now();

  const render = (now = performance.now()) => {
    const elapsed = (now - startedAt) / 1000;
    const motionTime = reducedMotion ? 0 : elapsed;
    const pulse = Math.max(config.pulseSpeed, 0.05);
    const spin = Math.max(config.rotationSpeed, 0);
    const breath = Math.max(config.breathAmount, 0);

    if (config.motionStyle === "hero") {
      group.rotation.y += (pointer.x * 0.16 - group.rotation.y) * 0.035;
      group.rotation.x += (pointer.y * 0.09 - group.rotation.x) * 0.035;
      group.rotation.z += (0 - group.rotation.z) * 0.035;
      group.position.y = Math.sin(motionTime * 0.35) * 0.05;
      group.scale.setScalar(1);
    } else {
      let targetX = pointer.y * 0.09;
      let targetY = pointer.x * 0.16;
      let targetZ = 0;
      let scaleX = 1;
      let scaleY = 1;
      let scaleZ = 1;

      if (config.motionStyle === "spiral") {
        targetY += motionTime * 0.22 * spin;
        targetX += Math.sin(motionTime * 0.62 * pulse) * 0.18 * breath;
        targetZ = Math.sin(motionTime * 0.32 * pulse) * 0.08 * config.bulge;
        scaleX += Math.sin(motionTime * 0.74 * pulse) * 0.025 * breath;
        scaleY += Math.cos(motionTime * 0.68 * pulse) * 0.025 * breath;
        scaleZ += Math.sin(motionTime * 0.9 * pulse) * 0.075 * breath;
      }

      if (config.motionStyle === "breathe") {
        const amount = Math.sin(motionTime * 0.9 * pulse) * 0.08 * breath;
        targetY += Math.sin(motionTime * 0.18) * 0.12 * spin;
        scaleX += amount;
        scaleY += amount * 0.72;
        scaleZ += amount * 1.32;
      }

      if (config.motionStyle === "wave") {
        targetY += Math.sin(motionTime * 0.72 * pulse) * 0.38 * spin;
        targetX += Math.cos(motionTime * 0.58 * pulse) * 0.18 * breath;
        targetZ = Math.sin(motionTime * 0.46 * pulse) * 0.12 * breath;
        group.position.y = Math.sin(motionTime * 0.82 * pulse) * 0.1 * breath;
        scaleY += Math.sin(motionTime * 1.08 * pulse) * 0.04 * breath;
        scaleZ += Math.cos(motionTime * 0.9 * pulse) * 0.06 * breath;
      } else {
        group.position.y = Math.sin(motionTime * 0.35 * pulse) * 0.05 * breath;
      }

      if (config.motionStyle === "bloom") {
        const amount = (Math.sin(motionTime * 1.12 * pulse) + 1) * 0.055 * breath;
        targetY += motionTime * 0.08 * spin;
        scaleX += amount;
        scaleY += amount;
        scaleZ += amount * 1.55;
      }

      if (config.motionStyle === "calm") {
        targetY += motionTime * 0.045 * spin;
        targetX += Math.sin(motionTime * 0.25 * pulse) * 0.06 * breath;
        scaleZ += Math.sin(motionTime * 0.38 * pulse) * 0.025 * breath;
      }

      group.rotation.y += (targetY - group.rotation.y) * 0.035;
      group.rotation.x += (targetX - group.rotation.x) * 0.035;
      group.rotation.z += (targetZ - group.rotation.z) * 0.035;
      group.scale.set(scaleX, scaleY, scaleZ);
    }

    particles.rotation.y = motionTime * 0.018 * config.rotationSpeed;
    particles.rotation.x =
      config.motionStyle === "spiral"
        ? Math.sin(motionTime * 0.22 * pulse) * 0.16 * config.bulge
        : 0;
    if (surfaceMesh) {
      surfaceMesh.rotation.y = motionTime * 0.06 * config.rotationSpeed;
      surfaceMesh.rotation.x = motionTime * 0.025 * config.rotationSpeed;
      if (config.motionStyle === "bloom" || config.motionStyle === "breathe") {
        const surfacePulse =
          1 + Math.sin(motionTime * pulse) * 0.04 * config.breathAmount;
        surfaceMesh.scale.setScalar(surfacePulse);
      }
    }
    if (config.showCore) {
      orbit.rotation.z = motionTime * 0.22 * config.rotationSpeed;
      orbit.rotation.y = motionTime * 0.12 * config.rotationSpeed;
    }

    pulses.forEach((pulse) => {
      const { curve, offset, speed } = pulse.userData as {
        curve?: import("three").CatmullRomCurve3;
        offset: number;
        speed: number;
      };
      const t = reducedMotion ? offset : (offset + motionTime * speed) % 1;
      const point =
        curve && Number.isFinite(t)
          ? curve.getPointAt(THREE.MathUtils.clamp(t, 0, 1))
          : null;
      if (!point) return;

      pulse.position.copy(point);
      const material = pulse.material as import("three").MeshBasicMaterial;
      material.opacity = 0.35 + Math.sin((t + motionTime) * Math.PI * 2) * 0.28;
    });

    renderer.render(scene, camera);
  };

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

  const stopLoop = () => {
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const loop = (now: number) => {
    frameId = 0;
    if (
      isDisposed ||
      reducedMotion ||
      !isVisible ||
      document.visibilityState !== "visible"
    ) {
      return;
    }

    if (now - lastFrameAt >= performanceProfile.frameIntervalMs) {
      render(now);
      lastFrameAt = now;
    }

    frameId = window.requestAnimationFrame(loop);
  };

  const scheduleLoop = () => {
    if (
      frameId ||
      reducedMotion ||
      !isVisible ||
      document.visibilityState !== "visible"
    ) {
      return;
    }

    frameId = window.requestAnimationFrame(loop);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && isVisible) {
      render();
      scheduleLoop();
    } else {
      stopLoop();
    }
  };

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        render();
        scheduleLoop();
      } else {
        stopLoop();
      }
    },
    { threshold: 0.08 },
  );
  visibilityObserver.observe(mount);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  render();
  scheduleLoop();

  return () => {
    isDisposed = true;
    stopLoop();
    observer.disconnect();
    visibilityObserver.disconnect();
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    mount.removeEventListener("pointermove", onPointerMove);
    disposables.forEach((item) => item.dispose());
    renderer.dispose();
    if (renderer.domElement.parentNode === mount) {
      mount.removeChild(renderer.domElement);
    }
  };
}
