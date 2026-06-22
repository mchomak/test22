"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 768px)";

/**
 * Whether the viewport is mobile-sized (<= 768px).
 *
 * Returns `null` until measured on the client, so server render and first
 * client paint render nothing heavy and there is no hydration mismatch.
 * Consumers gate on `isMobile === false` to act only once the desktop case
 * is confirmed.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}
