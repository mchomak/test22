# Скрины для кейсов

Сайт использует выбранные изображения из `public/cases/<slug>/`.
Корневую папку `img/` можно держать как рабочий архив, а на сайт подключать только отобранные файлы из `public/cases`.

## Текущие обложки

- `public/cases/subscription-bot/telegram-subscription-bot-preview.png`
- `public/cases/sapsanex-mini-app/sapsanex-mini-app-calculator-preview.png`
- `public/cases/seedream-tryon/seedream-ai-tryon-bot-preview.png`
- `public/cases/ai-reply-assistant/ai-reply-assistant-preview.png`
- `public/cases/bybit-trading-bot/bybit-market-scanner-preview.png`
- `public/cases/eps-bot/solana-eps-trading-bot-preview.png`
- `public/cases/frax-redesign/frax-redesign-before-after-preview.png`
- `public/cases/tech-rise-academy/tech-rise-academy-leads-preview.png`
- `public/cases/gym-progres/gym-progres-tracker-preview.png`
- `public/cases/skillup/skillup-ai-learning-tree-preview.png`

## Как называть новые файлы

Для каждого проекта держим отдельную папку:

- `public/cases/<slug>/`

Главную обложку называй по смыслу проекта:

- `<slug>-preview.png`
- `<slug>-dashboard-preview.png`
- `<slug>-before-after-preview.png`
- `<slug>-lead-flow-preview.png`

Дополнительные скрины называй по порядку и по зоне интерфейса:

- `01-bot-main-menu.png`
- `02-bot-payment.png`
- `03-admin-dashboard.png`
- `04-admin-payments.png`
- `05-user-flow.png`
- `06-architecture.png`
- `07-result.png`

Для web-проектов:

- `01-web-hero.png`
- `02-web-form.png`
- `03-web-mobile.png`
- `04-admin-leads.png`

Для trading/parser/backend-проектов:

- `01-dashboard.png`
- `02-signals.png`
- `03-api-flow.png`
- `04-logs.png`
- `05-architecture.png`

Если есть видео:

- `demo-flow.mp4`
- `admin-flow.mp4`

`originals/` можно оставлять рядом как архив исходников, но на сайт лучше подключать уже выбранные и очищенные файлы из `public/cases/<slug>/`.

Детальные чек-листы по проектам лежат в `ready/<slug>.md`.
