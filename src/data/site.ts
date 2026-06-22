import { enSiteData } from "@/data/site.en";
import {
  buildEstimatorHref,
  ruSiteData,
  type CaseStudy,
  type ProjectComplexityId,
  type ProjectEstimatorPreset,
  type ProjectModule,
  type ProjectTypeId,
} from "@/data/site.ru";

export {
  buildEstimatorHref,
  type CaseStudy,
  type ProjectComplexityId,
  type ProjectEstimatorPreset,
  type ProjectModule,
  type ProjectTypeId,
};

export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];
export type SiteData = typeof ruSiteData;

export const defaultLocale: Locale = "en";
export const russianLocale: Locale = "ru";
export const localeCookieName = "site-locale";

export const siteDataByLocale = {
  ru: ruSiteData,
  en: enSiteData,
} satisfies Record<Locale, SiteData>;

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.some((locale) => locale === value);
}

export function getSiteData(locale: string | undefined | null): SiteData {
  return isLocale(locale) ? siteDataByLocale[locale] : siteDataByLocale[defaultLocale];
}

export function getLocalizedHref(locale: Locale, href: string) {
  if (/^(?:https?:|mailto:|tel:|#)/.test(href)) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;

  if (locales.some((item) => normalizedHref === `/${item}` || normalizedHref.startsWith(`/${item}/`))) {
    return normalizedHref;
  }

  return `/${locale}${normalizedHref}`;
}

export function getLocaleFromParams(params: { lang?: string }) {
  return isLocale(params.lang) ? params.lang : null;
}
