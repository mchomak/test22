"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale, SiteData } from "@/data/site";

const DeferredCaseShowcase = dynamic(
  () =>
    import("@/components/sections/cases-showcase").then(
      (module) => module.CaseShowcase,
    ),
  { ssr: false },
);

export function CaseShowcaseLoader({
  cases,
  copy,
  locale,
}: {
  cases: SiteData["cases"];
  copy: SiteData["ui"]["cases"];
  locale: Locale;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const mount = mountRef.current;
    if (!mount) return;

    const load = () => setShouldLoad(true);
    const timeoutId = globalThis.setTimeout(load, 3600);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        load();
        observer.disconnect();
      },
      { rootMargin: "1400px 0px" },
    );

    observer.observe(mount);

    return () => {
      globalThis.clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div ref={mountRef}>
      {shouldLoad ? (
        <DeferredCaseShowcase
          cases={cases}
          copy={copy}
          locale={locale}
        />
      ) : (
        <div className="case-showcase-shell case-showcase-shell-deferred" />
      )}
    </div>
  );
}
