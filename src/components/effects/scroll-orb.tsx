"use client";

import { useEffect, useRef } from "react";

type ThreeModule = typeof import("three");

const stops = [0, 0.16, 0.32, 0.5, 0.68, 0.84, 1];
const xStops = [57, 33, 18, 48, 74, 62, 35];
const yStops = [47, 30, 45, 62, 50, 75, 82];
const scaleStops = [1, 0.92, 0.88, 1.02, 1.08, 0.94, 1.02];
const opacityStops = [0.12, 0.1, 0.085, 0.09, 0.1, 0.085, 0.06];

export function ScrollOrb() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const mount = mountRef.current;
    if (!root || !mount) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const loadTimeout = window.setTimeout(() => {
      void import("three")
        .then((THREE) => {
          if (cancelled || !root.isConnected || !mount.isConnected) return;
          cleanup = setupScrollOrb(THREE, root, mount);
        })
        .catch(() => {});
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(loadTimeout);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed z-[1] h-[352px] w-[352px] opacity-0 transition-transform duration-500 ease-out md:h-[512px] md:w-[512px]"
    >
      <div ref={mountRef} className="h-full w-full" />
    </div>
  );
}

function setupScrollOrb(
  THREE: ThreeModule,
  root: HTMLDivElement,
  mount: HTMLDivElement,
) {
  let width = Math.max(mount.clientWidth, 1);
  let height = Math.max(mount.clientHeight, 1);
  let frameId = 0;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 20);
  camera.position.set(0, 0, 4.2);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  renderer.setSize(width, height);
  renderer.domElement.className = "h-full w-full";
  mount.appendChild(renderer.domElement);

  const geometry = new THREE.IcosahedronGeometry(0.34, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "#a7f3d0",
    wireframe: true,
    transparent: true,
    opacity: 0.62,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.setScalar(2.45);
  mesh.rotation.set(0.18, -0.36, 0.08);
  scene.add(mesh);

  const update = () => {
    frameId = 0;
    const progress = getScrollProgress();
    const x = interpolate(stops, xStops, progress);
    const y = interpolate(stops, yStops, progress);
    const scale = interpolate(stops, scaleStops, progress);
    const opacity = interpolate(stops, opacityStops, progress);
    root.style.opacity = String(opacity);
    root.style.transform = `translate3d(calc(${x}vw - 50%), calc(${y}vh - 50%), 0) scale(${scale})`;

    if (!reduceMotion) {
      mesh.rotation.y = -0.36 + progress * Math.PI * 1.4;
      mesh.rotation.x = 0.18 + Math.sin(progress * Math.PI * 2) * 0.08;
      mesh.rotation.z = 0.08 + progress * Math.PI * 0.5;
    }

    renderer.render(scene, camera);
  };

  const resize = () => {
    width = Math.max(mount.clientWidth, 1);
    height = Math.max(mount.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    update();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(mount);

  const requestUpdate = () => {
    if (!frameId && document.visibilityState === "visible") {
      frameId = window.requestAnimationFrame(update);
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") requestUpdate();
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
  update();

  return () => {
    if (frameId) window.cancelAnimationFrame(frameId);
    observer.disconnect();
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    if (renderer.domElement.parentNode === mount) {
      mount.removeChild(renderer.domElement);
    }
  };
}

function getScrollProgress() {
  const documentElement = document.documentElement;
  const max = Math.max(documentElement.scrollHeight - window.innerHeight, 1);
  return Math.min(Math.max(window.scrollY / max, 0), 1);
}

function interpolate(input: number[], output: number[], value: number) {
  for (let index = 1; index < input.length; index += 1) {
    if (value <= input[index]) {
      const start = input[index - 1];
      const end = input[index];
      const progress = (value - start) / (end - start);
      return output[index - 1] + (output[index] - output[index - 1]) * progress;
    }
  }
  return output[output.length - 1];
}
