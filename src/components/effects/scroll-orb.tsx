"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type ThreeModule = typeof import("three");

export function ScrollOrb() {
  const mountRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const loadTimeout = window.setTimeout(() => {
      void import("three")
        .then((THREE) => {
          if (cancelled || !mount.isConnected) return;
          cleanup = setupScrollOrb(THREE, mount, Boolean(reduceMotion));
        })
        .catch(() => {});
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimeout);
      cleanup?.();
    };
  }, [reduceMotion]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[352px] w-[352px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen md:h-[512px] md:w-[512px]"
      style={{ x, y, scale, opacity }}
    >
      <div ref={mountRef} className="h-full w-full" />
    </motion.div>
  );
}

function setupScrollOrb(
  THREE: ThreeModule,
  mount: HTMLDivElement,
  reduceMotion: boolean,
) {
  let width = Math.max(mount.clientWidth, 1);
  let height = Math.max(mount.clientHeight, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 20);
  camera.position.set(0, 0, 4.2);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.setSize(width, height);
  renderer.domElement.className = "h-full w-full";
  mount.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry(0.34, 3);
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
    opacity: 0.68,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.setScalar(2.45);
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
  const clock = new THREE.Clock();

  const deformOrb = (elapsed: number) => {
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
          (elapsed * 0.16 + centerIndex / dentDirections.length) % 1;
        const wave = Math.sin(cycle * Math.PI * 2);
        const influence = Math.pow(
          Math.max(0, (vertexDirection.dot(center) - 0.38) / 0.62),
          2.4,
        );

        inward = Math.max(inward, influence * Math.pow(Math.max(0, wave), 3));
        outward = Math.max(
          outward,
          influence * Math.pow(Math.max(0, -wave), 3.6),
        );
      });

      const breathing = 1 + Math.sin(elapsed * 1.1 + baseX * 7) * 0.018;
      const scale = Math.max(0.22, breathing + outward * 0.14 - inward * 0.82);

      positionAttribute.setXYZ(index, baseX * scale, baseY * scale, baseZ * scale);
    }

    positionAttribute.needsUpdate = true;
  };

  const render = () => {
    const elapsed = clock.getElapsedTime();

    if (!reduceMotion) {
      deformOrb(elapsed);
      mesh.rotation.y = -0.36 + elapsed * 0.09;
      mesh.rotation.x = 0.18 + Math.sin(elapsed * 0.18) * 0.08;
      mesh.rotation.z = 0.08 + elapsed * 0.035;
    }

    renderer.render(scene, camera);
  };

  const loop = () => {
    if (!running) return;
    render();
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
