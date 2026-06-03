import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
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
  title: "Рамиль Канеев - AI, backend и Telegram-разработка под ключ",
  description:
    "Telegram-боты, Mini Apps, AI/ML-интеграции, backend API, парсинг, web-сервисы, crypto/trading-инструменты, деплой и поддержка.",
  keywords: [
    "Рамиль Канеев",
    "mchomak",
    "AI разработчик",
    "backend разработка",
    "Telegram бот",
    "Telegram Mini App",
    "FastAPI",
    "AI интеграции",
    "парсинг",
    "crypto bot",
  ],
  openGraph: {
    title: "Рамиль Канеев - AI, backend и Telegram-разработка",
    description:
      "Telegram-боты, Mini Apps, AI-модули, backend-системы, парсеры и интеграции от MVP до production.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  );
}
