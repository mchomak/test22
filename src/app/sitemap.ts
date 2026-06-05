import type { MetadataRoute } from "next";
import { locales } from "@/data/site";

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

function getLocalizedAlternates(path = "") {
  const siteUrl = getSiteUrl();

  return Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();
  const paths = ["", "/cases"];
  const entries = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path ? 0.8 : 1,
      alternates: {
        languages: getLocalizedAlternates(path),
      },
    })),
  );

  return entries;
}
