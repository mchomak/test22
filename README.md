# Portfolio Ramil Kaneev

Production-style portfolio site for AI, backend and Telegram development: bots, Mini Apps, AI integrations, backend services, parsing, crypto automation, deployment and support.

## Development

```bash
npm install
npm run dev
```

The development server opens at `http://localhost:3000`.

## Production Check

```bash
npm run lint
npm run build
npm start
```

The project uses Next.js standalone output. After `npm run build`, `npm start` prepares standalone static assets and runs `.next/standalone/server.js`.

To choose a custom port in PowerShell:

```powershell
$env:PORT = "3100"
npm start
```

## Docker Deploy

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://example.com \
  --build-arg DEPLOYMENT_VERSION=$(git rev-parse --short HEAD) \
  -t test22-portfolio:latest .
```

Local image check:

```bash
docker run --rm -p 3000:3000 test22-portfolio:latest
```

Server deploy with Compose:

```bash
cp .env.example .env
# edit NEXT_PUBLIC_SITE_URL, DEPLOYMENT_VERSION, APP_PORT and Telegram env values
docker compose up -d --build
```

`deploy/nginx.conf.example` contains a reverse proxy example. Replace `example.com`, enable HTTPS, and proxy traffic to `127.0.0.1:${APP_PORT}`.

## Environment

- `NEXT_PUBLIC_SITE_URL` - public site URL used for metadata, robots and sitemap.
- `DEPLOYMENT_VERSION` - deployment identifier used by Next.js version skew protection.
- `APP_PORT` - host port for Docker Compose.
- `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` - optional Telegram delivery for project requests. Without them the API returns a stub response and logs the request server-side.

## Project Structure

- `src/app/[lang]/page.tsx` - localized homepage.
- `src/app/[lang]/cases/page.tsx` - localized case archive.
- `src/app/api/project-leads/route.ts` - project request endpoint.
- `src/data/site.*.ts` - localized copy, cases, packages, FAQ and estimator data.
- `src/components/sections/` - page sections.
- `src/components/interactive/` - interactive WebGL and estimator components.
- `public/cases/` - production case images used by the site.
