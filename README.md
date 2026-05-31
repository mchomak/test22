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

## Docker / деплой на сервер

Production-образ собирается через standalone output Next.js:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://example.com \
  --build-arg DEPLOYMENT_VERSION=$(git rev-parse --short HEAD) \
  -t test22-portfolio:latest .
```

Локальная проверка образа:

```bash
docker run --rm -p 3000:3000 test22-portfolio:latest
```

Для сервера удобнее использовать compose:

```bash
cp .env.example .env
# отредактируйте NEXT_PUBLIC_SITE_URL, DEPLOYMENT_VERSION и APP_PORT
docker compose up -d --build
```

Пример reverse proxy для nginx лежит в `deploy/nginx.conf.example`. На сервере замените `example.com` на домен, настройте HTTPS и проксируйте трафик на `127.0.0.1:3000` или другой `APP_PORT`.

## Основная структура

- `src/app/page.tsx` - сборка всех секций главной страницы.
- `src/data/site.ts` - тексты, кейсы, пакеты, FAQ, контакты и стек.
- `src/components/sections/` - hero, интерактивная системная схема, специализация, кейсы, услуги, процесс, доверие, отзывы, FAQ и финальный CTA.
- `src/components/effects/` - boot-интро, cursor crosshair и scroll-orb.
- `src/components/interactive/` - WebGL-сцена, live telemetry, hero headline и estimator бюджета.
- `src/components/ui/` - базовые UI-компоненты.
- `public/images/engineering-command-center.png` - hero visual asset.

Для production-деплоя можно указать `NEXT_PUBLIC_SITE_URL`, чтобы OpenGraph-ссылки собирались с реальным доменом.
