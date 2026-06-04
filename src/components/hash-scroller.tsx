"use client";

import { useEffect } from "react";

function scrollToCurrentHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const target = document.getElementById(decodeURIComponent(hash));
  if (!target) return;

  const headerHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 64;
  const top =
    window.scrollY + target.getBoundingClientRect().top - headerHeight - 24;

  window.scrollTo({ top: Math.max(top, 0), behavior: "auto" });
}

export function HashScroller() {
  useEffect(() => {
    const scrollWithRetries = () => {
      window.requestAnimationFrame(() => {
        scrollToCurrentHash();
        window.setTimeout(scrollToCurrentHash, 120);
        window.setTimeout(scrollToCurrentHash, 480);
        window.setTimeout(scrollToCurrentHash, 900);
        window.setTimeout(scrollToCurrentHash, 1500);
      });
    };

    scrollWithRetries();
    window.addEventListener("hashchange", scrollWithRetries);

    return () => {
      window.removeEventListener("hashchange", scrollWithRetries);
    };
  }, []);

  return null;
}
