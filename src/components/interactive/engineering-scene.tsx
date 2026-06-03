"use client";

import { useEffect, useRef } from "react";

type ThreeModule = typeof import("three");

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

export function EngineeringScene({ showCore = true }: { showCore?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const loadTimeout = window.setTimeout(() => {
      void import("three")
        .then((THREE) => {
          if (cancelled || !mount.isConnected) return;
          cleanup = setupEngineeringScene(THREE, mount, showCore);
        })
        .catch(() => {});
    }, 80);

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimeout);
      cleanup?.();
    };
  }, [showCore]);

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
  showCore: boolean,
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
  camera.position.set(0, 0.05, 8.8);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.setSize(width, height);
  renderer.domElement.className = "h-full w-full";
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const nodePositions = nodePositionTuples.map(
    ([x, y, z]) => new THREE.Vector3(x, y, z),
  );

  const particleGeometry = track(new THREE.BufferGeometry());
  const particleCount = 620;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 9;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5.8;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.6;
  }
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3),
  );
  const particles = new THREE.Points(
    particleGeometry,
    track(
      new THREE.PointsMaterial({
        color: "#5eead4",
        size: 0.012,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    ),
  );
  group.add(particles);

  const lineMaterial = track(
    new THREE.LineBasicMaterial({
      color: "#67e8f9",
      transparent: true,
      opacity: 0.28,
    }),
  );
  const warmLineMaterial = track(
    new THREE.LineBasicMaterial({
      color: "#fbbf24",
      transparent: true,
      opacity: 0.18,
    }),
  );
  const curves: Array<import("three").CatmullRomCurve3> = [];

  edges.forEach(([from, to], index) => {
    const start = nodePositions[from];
    const end = nodePositions[to];
    const middle = start
      .clone()
      .lerp(end, 0.5)
      .add(new THREE.Vector3(0, index % 2 === 0 ? 0.32 : -0.22, 0.28));
    const curve = new THREE.CatmullRomCurve3([start, middle, end]);
    curves.push(curve);
    const points = curve.getPoints(48);
    const geometry = track(new THREE.BufferGeometry().setFromPoints(points));
    const line = new THREE.Line(
      geometry,
      index === 3 || index === 7 ? warmLineMaterial : lineMaterial,
    );
    group.add(line);
  });

  const nodeGeometry = track(new THREE.SphereGeometry(0.085, 28, 28));
  const coreGeometry = track(new THREE.IcosahedronGeometry(0.34, 1));
  const nodeMaterial = track(
    new THREE.MeshBasicMaterial({
      color: "#6ee7b7",
      transparent: true,
      opacity: 0.96,
    }),
  );
  const secondaryNodeMaterial = track(
    new THREE.MeshBasicMaterial({
      color: "#67e8f9",
      transparent: true,
      opacity: 0.9,
    }),
  );
  const coreMaterial = track(
    new THREE.MeshBasicMaterial({
      color: "#a7f3d0",
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    }),
  );
  const ringMaterial = track(
    new THREE.MeshBasicMaterial({
      color: "#34d399",
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    }),
  );

  nodePositions.forEach((position, index) => {
    if (index === 2 && !showCore) return;

    const mesh = new THREE.Mesh(
      index === 2 ? coreGeometry : nodeGeometry,
      index === 2
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
          index === 2 ? 0.52 : 0.17,
          index === 2 ? 0.54 : 0.18,
          48,
        ),
      ),
      ringMaterial,
    );
    ring.position.copy(position);
    ring.lookAt(camera.position);
    group.add(ring);
  });

  const pulseGeometry = track(new THREE.SphereGeometry(0.04, 18, 18));
  const pulseMaterial = track(
    new THREE.MeshBasicMaterial({
      color: "#fef3c7",
      transparent: true,
      opacity: 0.92,
    }),
  );
  const pulses = curves.map((curve, index) => {
    const pulse = new THREE.Mesh(pulseGeometry, track(pulseMaterial.clone()));
    pulse.userData = {
      curve,
      offset: index / curves.length,
      speed: 0.085 + index * 0.006,
    };
    group.add(pulse);
    return pulse;
  });

  const orbitGeometry = track(new THREE.TorusGeometry(1.12, 0.006, 10, 120));
  const orbitMaterial = track(
    new THREE.MeshBasicMaterial({
      color: "#5eead4",
      transparent: true,
      opacity: 0.22,
    }),
  );
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  if (showCore) {
    orbit.position.copy(nodePositions[2]);
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
  const startedAt = performance.now();

  const render = (now = performance.now()) => {
    const elapsed = (now - startedAt) / 1000;
    const motion = reducedMotion ? 0 : elapsed;

    group.rotation.y += (pointer.x * 0.16 - group.rotation.y) * 0.035;
    group.rotation.x += (pointer.y * 0.09 - group.rotation.x) * 0.035;
    group.position.y = Math.sin(motion * 0.35) * 0.05;
    particles.rotation.y = motion * 0.018;
    if (showCore) {
      orbit.rotation.z = motion * 0.22;
      orbit.rotation.y = motion * 0.12;
    }

    pulses.forEach((pulse) => {
      const { curve, offset, speed } = pulse.userData as {
        curve?: import("three").CatmullRomCurve3;
        offset: number;
        speed: number;
      };
      const t = reducedMotion ? offset : (offset + motion * speed) % 1;
      const point =
        curve && Number.isFinite(t)
          ? curve.getPointAt(THREE.MathUtils.clamp(t, 0, 1))
          : null;
      if (!point) return;

      pulse.position.copy(point);
      const material = pulse.material as import("three").MeshBasicMaterial;
      material.opacity = 0.35 + Math.sin((t + motion) * Math.PI * 2) * 0.28;
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

    render(now);
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
