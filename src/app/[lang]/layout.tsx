import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLocaleFromParams,
  getSiteData,
  locales,
} from "@/data/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = getLocaleFromParams(await params);

  if (!locale) return {};

  const site = getSiteData(locale);

  return {
    title: site.meta.title,
    description: site.meta.description,
    keywords: site.meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
      },
    },
    openGraph: {
      title: site.meta.openGraphTitle,
      description: site.meta.openGraphDescription,
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      images: ["/images/engineering-command-center.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const locale = getLocaleFromParams(await params);

  if (!locale) notFound();

  return children;
}
