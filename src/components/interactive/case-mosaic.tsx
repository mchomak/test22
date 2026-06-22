"use client";

import {
  motion,
  type MotionValue,
  type MotionStyle,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { type CSSProperties, useRef } from "react";
import { useIsMobile } from "@/lib/use-is-mobile";
import { motionEasing } from "@/lib/motion";

export type CaseMosaicItem = {
  slug: string;
  src: string;
  title: string;
  label: string;
  accent: string;
};

const tileOffsets = [
  { x: -92, y: -42, rotate: -7, scale: 0.92 },
  { x: 74, y: -56, rotate: 5, scale: 0.9 },
  { x: -68, y: 74, rotate: 6, scale: 0.88 },
  { x: 92, y: 42, rotate: -5, scale: 0.9 },
  { x: -28, y: 106, rotate: -4, scale: 0.86 },
  { x: 42, y: -94, rotate: 7, scale: 0.86 },
] as const;

export function CaseMosaic({
  items,
  progress,
}: {
  items: CaseMosaicItem[];
  progress?: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isStatic = reduceMotion || isMobile !== false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 18%"],
  });
  const activeProgress = progress ?? scrollYProgress;

  return (
    <div ref={ref} className="case-mosaic" aria-hidden="true">
      {items.slice(0, 6).map((item, index) => (
        <MosaicTile
          key={item.slug}
          index={index}
          isStatic={isStatic}
          item={item}
          progress={activeProgress}
        />
      ))}
    </div>
  );
}

function MosaicTile({
  index,
  isStatic,
  item,
  progress,
}: {
  index: number;
  isStatic: boolean;
  item: CaseMosaicItem;
  progress: MotionValue<number>;
}) {
  const offset = tileOffsets[index % tileOffsets.length];
  const x = useTransform(progress, [0, 0.88], [offset.x, 0]);
  const y = useTransform(progress, [0, 0.88], [offset.y, 0]);
  const rotate = useTransform(progress, [0, 0.88], [offset.rotate, 0]);
  const scale = useTransform(progress, [0, 0.88], [offset.scale, 1]);
  const opacity = useTransform(progress, [0, 0.22, 1], [0.54, 0.8, 1]);
  const tileStyle = {
    "--case-accent": item.accent,
    ...(isStatic ? {} : { opacity, rotate, scale, x, y }),
  } as CSSProperties & MotionStyle;

  return (
    <motion.figure
      className={`case-mosaic-tile case-mosaic-tile-${index + 1}`}
      initial={false}
      style={tileStyle}
      transition={{ duration: 0.7, ease: motionEasing.expressive }}
    >
      <Image
        src={item.src}
        alt=""
        fill
        loading={index < 2 ? "eager" : "lazy"}
        quality={70}
        sizes="(max-width: 768px) 44vw, (max-width: 1200px) 22vw, 260px"
        className="case-mosaic-image"
      />
      <figcaption className="case-mosaic-caption">{item.label}</figcaption>
    </motion.figure>
  );
}
