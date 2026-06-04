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
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-2 shadow-2xl shadow-black/30">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#030505]">
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
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-emerald-300/35 hover:text-white"
              aria-label={copy.previous}
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-emerald-300/35 hover:text-white"
              aria-label={copy.next}
            >
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">
            <span className="font-mono text-[11px] text-emerald-200">
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
                      ? "w-5 bg-emerald-300"
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
