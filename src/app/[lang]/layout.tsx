import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getLocaleFromParams,
  getSiteData,
  locales,
} from "@/data/site";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { ReferenceLeadModalProvider } from "@/components/interactive/reference-lead-modal";
import { YandexMetrika } from "@/components/yandex-metrika";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body>
        <YandexMetrika />
        <Suspense fallback={null}>
          <AnalyticsTracker locale={locale} />
        </Suspense>
        <ReferenceLeadModalProvider locale={locale}>
          {children}
        </ReferenceLeadModalProvider>
      </body>
    </html>
  );
}
