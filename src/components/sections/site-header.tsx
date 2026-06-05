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
  const { contacts, navItems, ui } = site;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050607]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          aria-label={ui.header.backToTop}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-emerald-300/30 bg-emerald-300/10 text-emerald-200 transition duration-300 group-hover:border-emerald-200/60">
            <Code2 size={18} />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold text-white">
              {ui.brandName}
            </span>
            <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              mchomak
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={ui.header.navAria}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={getLocalizedHref(locale, item.href)}
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition duration-300 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
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
            href={contacts.telegramUrl}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="hidden min-h-10 px-4 sm:inline-flex"
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
    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
      <span className="min-h-8 rounded-full bg-emerald-300 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-950">
        {locale}
      </span>
    </div>
  );
}
