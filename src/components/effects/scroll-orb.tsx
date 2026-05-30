"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

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

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 20);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    const resize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frameId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (!reduceMotion) {
        mesh.rotation.y = -0.36 + elapsed * 0.09;
        mesh.rotation.x = 0.18 + Math.sin(elapsed * 0.18) * 0.08;
        mesh.rotation.z = 0.08 + elapsed * 0.035;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mount.removeChild(renderer.domElement);
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
