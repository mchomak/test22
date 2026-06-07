# Portfolio Ramil Kaneev

Production-style portfolio site for AI, backend and Telegram development: bots, Mini Apps, AI integrations, backend services, parsing, crypto automation, deployment and support.

## Быстрый локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:3000`. Next.js сам подхватит `.env` из корня проекта.

Если нужна локальная PostgreSQL через Docker:

```bash
docker compose up -d postgres
npm run dev
```

Для локального подключения из `npm run dev` используйте `DATABASE_URL` вида:

```bash
DATABASE_URL=postgres://portfolio:change-this-password@localhost:5432/portfolio
```

## Production check

```bash
npm run lint
npm run build
npm start
```

Проект использует `output: "standalone"`. После `npm run build` команда `npm start` копирует standalone static/public assets и запускает `.next/standalone/server.js`.

## Переменные окружения

Скопируйте пример и заполните реальные значения:

```bash
cp .env.example .env
```

Обязательные для production:

- `NEXT_PUBLIC_SITE_URL` - публичный URL сайта.
- `DEPLOYMENT_VERSION` - версия деплоя, удобно ставить short commit hash.
- `APP_PORT` - порт на хосте для Docker Compose.
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` - настройки PostgreSQL в Compose.
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` - доступ к `/admin`.
- `ANALYTICS_SALT` - соль для хеша IP в аналитике.

Telegram:

- `TELEGRAM_BOT_TOKEN` - токен бота от BotFather.
- `TELEGRAM_CHAT_ID` - id личного чата, группы или канала, который видит бот.
- `TELEGRAM_PROXY_URL` - optional outbound proxy для запросов к Telegram Bot API.
- `TELEGRAM_REQUEST_TIMEOUT_MS` - timeout отправки в Telegram.

`DATABASE_URL` нужен для запуска без Compose или для внешней БД. В Docker Compose приложение получает внутренний URL автоматически.

## Telegram proxy

У Telegram Bot API нет поля "proxy" в `sendMessage`. Proxy настраивается на стороне приложения: все исходящие запросы к `https://api.telegram.org` пойдут через `TELEGRAM_PROXY_URL`.

Примеры:

```bash
TELEGRAM_PROXY_URL=http://user:password@proxy-host:8080
TELEGRAM_PROXY_URL=https://proxy-host:8443
TELEGRAM_PROXY_URL=socks5://user:password@proxy-host:1080
```

Если переменная пустая, запрос идет напрямую.

## Заявки и аналитика

Форма конфигуратора отправляет POST на `/api/project-leads`.

Поток:

1. API валидирует заявку.
2. Если `DATABASE_URL` доступен, заявка сохраняется в PostgreSQL.
3. API отправляет уведомление в Telegram.
4. Статус доставки обновляется в БД.

Аналитика page views пишется через `/api/analytics/page-view`. Сырой IP не хранится: при наличии `ANALYTICS_SALT` сохраняется только хеш.

Админка доступна по:

```text
/admin
```

В ней видны:

- общее число заявок;
- заявки за сегодня;
- статус доставки в Telegram;
- просмотры и уникальные посетители;
- график за 14 дней;
- топ страниц за 30 дней;
- последние заявки.

## Деплой на сервер через Docker Compose

На сервере нужны Docker и Docker Compose plugin.

```bash
git clone https://github.com/mchomak/test22.git
cd test22
cp .env.example .env
nano .env
```

Заполните `.env`. Для секретов используйте длинные случайные строки:

```bash
openssl rand -base64 32
```

Сборка и запуск:

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f portfolio
```

PostgreSQL поднимется отдельным сервисом `postgres`, данные сохраняются в volume `postgres_data`. Таблицы создаются приложением автоматически при первом обращении.

Пример Nginx reverse proxy:

```nginx
server {
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

После настройки HTTPS через certbot:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

## Обновление на сервере

```bash
cd test22
git pull
DEPLOYMENT_VERSION=$(git rev-parse --short HEAD) docker compose up -d --build
docker compose logs -f portfolio
```

Если меняли `.env`, перезапустите контейнеры:

```bash
docker compose up -d
```

## Диагностика Telegram

Проверить токен:

```bash
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe"
```

Если заявка возвращает `chat not found`, бот не видит `TELEGRAM_CHAT_ID`. Откройте чат с ботом, отправьте `/start`, затем получите id через `getUpdates` или добавьте бота в нужную группу/канал.

Проверить логи отправки:

```bash
docker compose logs -f portfolio
```

## Структура проекта

- `src/app/[lang]/page.tsx` - локализованная главная.
- `src/app/[lang]/cases/page.tsx` - архив кейсов.
- `src/app/api/project-leads/route.ts` - endpoint заявок.
- `src/app/api/analytics/page-view/route.ts` - endpoint аналитики.
- `src/app/admin/page.tsx` - админка.
- `src/lib/database.ts` - PostgreSQL schema и запросы.
- `src/lib/telegram.ts` - доставка в Telegram с optional proxy.
- `src/data/site.*.ts` - тексты, кейсы, пакеты, FAQ и конфигуратор.
- `src/components/sections/` - секции публичного сайта.
- `src/components/interactive/` - интерактивные компоненты.
- `img/<project>/` - source case images, синхронизируются в `public/cases/<lang>/<slug>/` перед dev/build.
