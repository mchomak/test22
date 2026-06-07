"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import type { Locale } from "@/data/site";

export function AnalyticsTracker({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sentPaths = useRef(new Set<string>());
  const search = searchParams?.toString() ?? "";
  const path = useMemo(() => {
    if (!pathname) {
      return "";
    }

    return search ? `${pathname}?${search}` : pathname;
  }, [pathname, search]);

  useEffect(() => {
    if (!path || path.startsWith("/admin") || sentPaths.current.has(path)) {
      return;
    }

    sentPaths.current.add(path);

    const viewport =
      typeof window === "undefined"
        ? ""
        : `${window.innerWidth}x${window.innerHeight}`;
    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";

    fetch("/api/analytics/page-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        locale,
        referrer: document.referrer,
        language: navigator.language,
        timezone,
        viewport,
      }),
      credentials: "same-origin",
      keepalive: true,
    }).catch(() => {
      sentPaths.current.delete(path);
    });
  }, [locale, path]);

  return null;
}
