"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const nodePositions = [
  new THREE.Vector3(-2.8, 1.4, 0.1),
  new THREE.Vector3(-1.55, -0.2, 0.55),
  new THREE.Vector3(0, 0.58, 0),
  new THREE.Vector3(1.5, 1.25, -0.35),
  new THREE.Vector3(2.65, 0.05, 0.2),
  new THREE.Vector3(1.25, -1.35, 0.42),
  new THREE.Vector3(-1.75, -1.35, -0.28),
];

const edges = [
  [0, 2],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [6, 1],
  [6, 5],
  [4, 5],
];

export function EngineeringScene({ showCore = true }: { showCore?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.set(0, 0.05, 8.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.className = "h-full w-full";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const particleGeometry = new THREE.BufferGeometry();
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
      new THREE.PointsMaterial({
        color: "#5eead4",
        size: 0.012,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    );
    group.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#67e8f9",
      transparent: true,
      opacity: 0.28,
    });
    const warmLineMaterial = new THREE.LineBasicMaterial({
      color: "#fbbf24",
      transparent: true,
      opacity: 0.18,
    });
    const curves: THREE.CatmullRomCurve3[] = [];

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
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(
        geometry,
        index === 3 || index === 7 ? warmLineMaterial : lineMaterial,
      );
      group.add(line);
    });

    const nodeGeometry = new THREE.SphereGeometry(0.085, 28, 28);
    const coreGeometry = new THREE.IcosahedronGeometry(0.34, 1);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: "#6ee7b7",
      transparent: true,
      opacity: 0.96,
    });
    const secondaryNodeMaterial = new THREE.MeshBasicMaterial({
      color: "#67e8f9",
      transparent: true,
      opacity: 0.9,
    });
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: "#a7f3d0",
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#34d399",
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });

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
        new THREE.RingGeometry(index === 2 ? 0.52 : 0.17, index === 2 ? 0.54 : 0.18, 48),
        ringMaterial,
      );
      ring.position.copy(position);
      ring.lookAt(camera.position);
      group.add(ring);
    });

    const pulseGeometry = new THREE.SphereGeometry(0.04, 18, 18);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: "#fef3c7",
      transparent: true,
      opacity: 0.92,
    });
    const pulses = curves.map((curve, index) => {
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial.clone());
      pulse.userData = {
        curve,
        offset: index / curves.length,
        speed: 0.085 + index * 0.006,
      };
      group.add(pulse);
      return pulse;
    });

    const orbitGeometry = new THREE.TorusGeometry(1.12, 0.006, 10, 120);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: "#5eead4",
      transparent: true,
      opacity: 0.22,
    });
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
    mount.addEventListener("pointermove", onPointerMove);

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
          curve: THREE.CatmullRomCurve3;
          offset: number;
          speed: number;
        };
        const t = reducedMotion ? offset : (offset + motion * speed) % 1;
        pulse.position.copy(curve.getPointAt(t));
        const material = pulse.material as THREE.MeshBasicMaterial;
        material.opacity = 0.35 + Math.sin((t + motion) * Math.PI * 2) * 0.28;
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      particleGeometry.dispose();
      nodeGeometry.dispose();
      coreGeometry.dispose();
      pulseGeometry.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      mount.removeChild(renderer.domElement);
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
