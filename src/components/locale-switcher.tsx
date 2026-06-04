"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { Locale, SiteData } from "@/data/site";

const languageOptions: Locale[] = ["ru", "en"];

type LocaleSwitcherProps = {
  ariaLabel: string;
  labels: SiteData["ui"]["header"]["languageNames"];
  locale: Locale;
};

export function LocaleSwitcher({
  ariaLabel,
  labels,
  locale,
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildTarget = (nextLocale: Locale) => {
    const currentPath = pathname || `/${locale}`;
    const parts = currentPath.split("/").filter(Boolean);

    if (parts[0] === "ru" || parts[0] === "en") {
      parts[0] = nextLocale;
    } else {
      parts.unshift(nextLocale);
    }

    const query = searchParams?.toString();
    const hash = typeof window === "undefined" ? "" : window.location.hash;

    return `/${parts.join("/")}${query ? `?${query}` : ""}${hash}`;
  };

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    window.location.assign(buildTarget(nextLocale));
  };

  return (
    <div
      className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1"
      aria-label={ariaLabel}
      role="group"
    >
      {languageOptions.map((option) => {
        const isActive = option === locale;

        return (
          <button
            key={option}
            type="button"
            onClick={() => switchLocale(option)}
            aria-pressed={isActive}
            title={labels[option]}
            className={`min-h-8 rounded-full px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition ${
              isActive
                ? "bg-emerald-300 text-zinc-950"
                : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
