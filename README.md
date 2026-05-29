# Портфолио Рамиля Канеева

Production-style сайт-портфолио Python-разработчика: Telegram-боты, AI/LLM-интеграции, backend-сервисы, платежи, crypto automation, деплой и поддержка.

## Запуск

```bash
npm install
npm run dev
```

Локально сайт откроется на `http://127.0.0.1:3000` или `http://localhost:3000`.

## Проверка

```bash
npm run lint
npm run build
```

## Основная структура

- `src/app/page.tsx` - сборка всех секций главной страницы.
- `src/data/site.ts` - тексты, кейсы, пакеты, FAQ, контакты и стек.
- `src/components/sections/` - hero, интерактивная системная схема, специализация, кейсы, услуги, процесс, доверие, отзывы, FAQ и финальный CTA.
- `src/components/effects/` - boot-интро, scroll progress, cursor crosshair и переходы между секциями.
- `src/components/interactive/` - WebGL-сцена, live telemetry, hero headline и estimator бюджета.
- `src/components/ui/` - базовые UI-компоненты.
- `public/images/engineering-command-center.png` - hero visual asset.

Для production-деплоя можно указать `NEXT_PUBLIC_SITE_URL`, чтобы OpenGraph-ссылки собирались с реальным доменом.
