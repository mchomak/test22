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
  title: "Рамиль Канеев - Python-разработчик для Telegram, AI и backend",
  description:
    "Production-grade портфолио Python-разработчика Рамиля Канеева: Telegram-боты с оплатой, AI/LLM-интеграции, backend-сервисы, crypto automation, деплой и поддержка.",
  keywords: [
    "Рамиль Канеев",
    "mchomak",
    "Python разработчик",
    "Telegram бот",
    "FastAPI",
    "AI интеграции",
    "backend разработка",
  ],
  openGraph: {
    title: "Рамиль Канеев - Python backend, Telegram bots, AI integrations",
    description:
      "5 лет опыта, 30+ проектов под ключ: архитектура, backend, платежи, AI, деплой и поддержка.",
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
