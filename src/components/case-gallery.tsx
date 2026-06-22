"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { SiteData } from "@/data/site";

export type CaseGalleryImage = {
  src: string;
  alt: string;
  label: string;
};

export function CaseGallery({
  copy,
  images,
  preload = false,
}: {
  copy: SiteData["ui"]["gallery"];
  images: CaseGalleryImage[];
  preload?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) return null;

  const go = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      return (current + direction + images.length) % images.length;
    });
  };

  return (
    <div className="surface-panel mt-8 overflow-hidden p-2">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-bg-deep)]">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          preload={preload && activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 1180px"
          className="object-contain"
        />
      </div>

      {images.length > 1 ? (
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--stroke-subtle)] bg-white/[0.04] text-[var(--text-secondary)] transition hover:border-[var(--stroke-strong)] hover:text-[var(--text-primary)]"
              aria-label={copy.previous}
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--stroke-subtle)] bg-white/[0.04] text-[var(--text-secondary)] transition hover:border-[var(--stroke-strong)] hover:text-[var(--text-primary)]"
              aria-label={copy.next}
            >
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="tag-pill tag-pill-signal gap-2 px-3 py-2">
            <span className="font-mono text-[11px]">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <span className="flex items-center gap-1">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition ${
                    index === activeIndex
                      ? "w-5 bg-[var(--accent-signal)]"
                      : "w-1.5 bg-white/20 hover:bg-white/45"
                  }`}
                  aria-label={`${copy.open} ${index + 1}: ${image.label}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
