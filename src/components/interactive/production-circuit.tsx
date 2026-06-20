"use client";

import {
  Bot,
  BrainCircuit,
  CreditCard,
  Database,
  Rocket,
  Route,
  ServerCog,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { CaseMosaic, type CaseMosaicItem } from "@/components/interactive/case-mosaic";
import { useIsMobile } from "@/lib/use-is-mobile";

type ProductionCircuitProps = {
  items: CaseMosaicItem[];
  videoSrc?: string;
};

const circuitNodes = [
  {
    id: "request",
    label: "Client request",
    detail: "scope / architecture",
    icon: Route,
    x: 15,
    y: 28,
  },
  {
    id: "telegram",
    label: "Telegram",
    detail: "bot / mini app",
    icon: Bot,
    x: 35,
    y: 20,
  },
  {
    id: "backend",
    label: "Backend API",
    detail: "states / queues",
    icon: ServerCog,
    x: 54,
    y: 38,
  },
  {
    id: "ai",
    label: "AI module",
    detail: "parser / logic",
    icon: BrainCircuit,
    x: 32,
    y: 66,
  },
  {
    id: "data",
    label: "Data layer",
    detail: "PostgreSQL / Redis",
    icon: Database,
    x: 58,
    y: 74,
  },
  {
    id: "payments",
    label: "Payments",
    detail: "cards / crypto",
    icon: CreditCard,
    x: 78,
    y: 25,
  },
  {
    id: "deploy",
    label: "Deploy",
    detail: "logs / support",
    icon: Rocket,
    x: 84,
    y: 63,
  },
] as const;

export function ProductionCircuit({ items, videoSrc }: ProductionCircuitProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isStatic = reduceMotion || isMobile !== false;
  const { scrollY } = useScroll();
  const heroProgress = useSpring(useTransform(scrollY, [0, 420], [0, 1]), {
    damping: 30,
    mass: 0.38,
    stiffness: 115,
  });
  const mapOpacity = useTransform(heroProgress, [0, 0.55, 1], [0.66, 0.88, 1]);
  const mapScale = useTransform(heroProgress, [0, 1], [0.955, 1]);
  const pathLength = useTransform(heroProgress, [0.12, 0.88], [0.42, 1]);

  return (
    <motion.div
      className="production-circuit"
      aria-label="Production Circuit: project fragments and system map"
      style={isStatic ? undefined : { opacity: mapOpacity, scale: mapScale }}
    >
      <div className="production-circuit-header">
        <span>Production Circuit</span>
        <small>poster-ready visual</small>
      </div>

      <div className="production-circuit-visual" data-video-ready={Boolean(videoSrc)}>
        {videoSrc ? (
          <video
            className="production-circuit-video"
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <CaseMosaic items={items} progress={heroProgress} />
        )}
      </div>

      <div className="production-circuit-map">
        <svg
          className="production-circuit-lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M15 28 C25 17 30 17 35 20 C43 22 47 31 54 38 C64 30 70 24 78 25 C86 34 88 50 84 63 C75 72 68 75 58 74 C48 76 40 72 32 66 C28 52 42 44 54 38"
            pathLength={isStatic ? 1 : pathLength}
          />
          <path d="M35 20 C27 37 25 52 32 66" />
          <path d="M54 38 C58 50 58 61 58 74" />
          <path d="M78 25 C68 30 62 34 54 38" />
        </svg>

        {circuitNodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              className={`production-circuit-node production-circuit-node-${node.id}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              initial={false}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: isStatic ? 0 : 0.08 + index * 0.045 }}
            >
              <span className="production-circuit-node-icon">
                <Icon size={15} />
              </span>
              <span>
                <strong>{node.label}</strong>
                <small>{node.detail}</small>
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="production-circuit-footer">
        <span>Telegram</span>
        <span>AI</span>
        <span>Backend</span>
        <span>Payments</span>
        <span>Deploy</span>
      </div>
    </motion.div>
  );
}
