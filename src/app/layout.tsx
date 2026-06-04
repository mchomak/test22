import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { headers } from "next/headers";
import { defaultLocale, isLocale } from "@/data/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Ramil Kaneev - AI, backend and Telegram development",
  description:
    "Telegram bots, Mini Apps, AI/ML integrations, backend APIs, parsing, web services, crypto/trading tools, deployment and support.",
  keywords: [
    "Ramil Kaneev",
    "mchomak",
    "AI developer",
    "backend development",
    "Telegram бот",
    "Telegram Mini App",
    "FastAPI",
    "AI integrations",
    "parsing",
    "crypto bot",
  ],
  openGraph: {
    title: "Ramil Kaneev - AI, backend and Telegram development",
    description:
      "Telegram bots, Mini Apps, AI modules, backend systems, parsers and integrations from MVP to production.",
    type: "website",
    images: ["/images/engineering-command-center.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerLocale = (await headers()).get("x-site-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  );
}
