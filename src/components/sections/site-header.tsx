import { Code2 } from "lucide-react";
import { Suspense } from "react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ButtonLink } from "@/components/ui/button-link";
import { getLocalizedHref, type Locale, type SiteData } from "@/data/site";

export function SiteHeader({
  locale,
  site,
}: {
  locale: Locale;
  site: SiteData;
}) {
  const { navItems, ui } = site;

  return (
    <header className="site-header-shell fixed inset-x-0 top-0 z-50">
      <div className="site-container flex h-16 items-center justify-between">
        <a
          href="#top"
          className="site-header-brand group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-signal)]"
          aria-label={ui.header.backToTop}
        >
          <span className="icon-tile icon-tile-round h-9 w-9 transition duration-300">
            <Code2 size={18} />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold text-[var(--text-primary)]">
              {ui.brandName}
            </span>
            <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
              mchomak
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={ui.header.navAria}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={getLocalizedHref(locale, item.href)}
              className="site-header-nav-link px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-signal)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Suspense fallback={<LocaleSwitcherFallback locale={locale} />}>
            <LocaleSwitcher
              ariaLabel={ui.header.languageAria}
              labels={ui.header.languageNames}
              locale={locale}
            />
          </Suspense>
          <ButtonLink
            href="#quick-lead"
            variant="secondary"
            className="hidden min-h-10 px-4 lg:inline-flex"
          >
            {ui.header.contactCta}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

function LocaleSwitcherFallback({ locale }: { locale: Locale }) {
  return (
    <div className="inline-flex rounded-full border border-[var(--stroke-subtle)] bg-white/[0.04] p-1">
      <span className="min-h-8 rounded-full bg-[var(--accent-primary)] px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary-contrast)]">
        {locale}
      </span>
    </div>
  );
}
