"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import type { Locale } from "@/data/site";
import { trackSiteEvent, type SiteEventName } from "@/lib/site-events";

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

    const sendPageView = () => {
      const viewport = `${window.innerWidth}x${window.innerHeight}`;
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
      }).catch(() => {});
    };

    const requestIdle = window.requestIdleCallback?.bind(window);
    const cancelIdle = window.cancelIdleCallback?.bind(window);

    if (requestIdle && cancelIdle) {
      const idleId = requestIdle(sendPageView, { timeout: 2500 });
      return () => cancelIdle(idleId);
    }

    const timeoutId = globalThis.setTimeout(sendPageView, 1200);
    return () => globalThis.clearTimeout(timeoutId);
  }, [locale, path]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const trigger = target.closest("[data-site-event]") as HTMLElement | null;
      const eventName = trigger?.dataset.siteEvent as SiteEventName | undefined;

      if (!trigger || !eventName) {
        return;
      }

      let payload: Record<string, unknown> = {};
      const rawPayload = trigger.dataset.siteEventPayload;

      if (rawPayload) {
        try {
          const parsed = JSON.parse(rawPayload) as unknown;

          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            payload = parsed as Record<string, unknown>;
          }
        } catch (error) {
          if (process.env.NODE_ENV !== "production") {
            console.info("[site-event:payload]", error);
          }
        }
      }

      trackSiteEvent(eventName, {
        href: trigger.getAttribute("href") ?? undefined,
        ...payload,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
