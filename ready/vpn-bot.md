# Subscription Bot (vpn-bot)

Slug на сайте: `/cases/subscription-bot`
Источник в vault: `Projects/Personal/vpn-bot/vpn-bot-telegram-bot-dlia-prodazhi-vpn-proxy.md`

> Публичное позиционирование — «бот продажи цифровых подписок с автовыдачей доступа». Слова «VPN-реселлер», «Marzban-панель», «3proxy», «обход блокировок» в публичные тексты не выносим.

---

## 1. Название

**Основное (96 симв):**
> Subscription Bot — продажа цифровых подписок через Telegram: автовыдача доступа, оплата фиатом и криптой

**Короткое (78 симв, для карточки на витрине):**
> Subscription Bot — Telegram-бот подписок с 4 платёжными провайдерами и админкой

## 2. Описание (~1460 симв)

Telegram-бот для подписочного бизнеса: автоматическая выдача доступа после оплаты, четыре платёжных провайдера в одном продукте и web-админка для операторов.

**Проблема.** До бота заявки и выдача учётных данных велись вручную в чате. Клиенту приходилось ждать оператора, оператор путал тарифы и страны, платежи принимались через личную карту. Чем больше клиентов — тем сильнее ломалась схема.

**Решение.** Один async-сервис на aiohttp обслуживает три точки одновременно: webhook бота (aiogram 3), webhooks четырёх платёжных систем (Rapira, CryptoBot, ParityPay) и админ-панель на Jinja2. Покупка — FSM-сценарий: тариф → локация → провайдер оплаты → автоматическая выдача конфига через REST/SSH-интеграции. APScheduler следит за истечениями подписок, отправляет напоминания и крутит фоновые рассылки. Реферальная система с бонусом за регистрацию. In-memory кэш настроек и кнопок прогревается на старте, каждое обновление в админке инвалидирует кэш.

**Результат.** Полностью автоматическая воронка от «выбрал тариф» до «получил доступ» без участия человека. Оператор работает только с edge-кейсами: видит платежи в разрезе провайдеров, продлевает подписки, делает таргетированные рассылки, включает/выключает платёжные системы налету. Тарифная сетка и список локаций редактируются без редеплоя — через каталог в админке.

**Стек:** Python, aiogram 3, aiohttp, SQLAlchemy 2.0 async, PostgreSQL, APScheduler, Jinja2, Docker.

## 2.1. Description (~1000 символов)

Telegram-бот для продажи цифровых подписок с автоматической выдачей доступа после оплаты. Публично кейс подаётся нейтрально: подписочный продукт, платежи, админка и автоматизация операторской рутины.

Один aiohttp-сервис обслуживает webhook бота, webhooks платёжных систем и Jinja2-админку. Покупка устроена как FSM-сценарий: тариф, локация, провайдер оплаты, счёт и выдача доступа через интеграции. APScheduler следит за сроками подписок, отправляет напоминания и запускает рассылки. В админке оператор управляет тарифами, платежами, пользователями, провайдерами и broadcast-сценариями.

Результат — автоматическая воронка от выбора тарифа до получения доступа, где человек нужен только для спорных случаев и поддержки.

## 3. Превью (обложка кейса)

Split-image. Левая половина — мокап смартфона с Telegram-ботом (список тарифов + бейдж «Подписка активна до 24 июня»). Правая половина — ноутбук с админкой (таблица платежей с цветными бейджами статусов и фильтром по провайдеру). Между ними — ломаная FSM-стрелка и 4 мини-иконки платёжных провайдеров.

Размеры: hero 1600×900, карточка на витрине 800×600. Фон — в выбранной палитре, акцент на зелёном бейдже «paid».

## 4. Скрины и видео (18 файлов)

> Везде блюрить: IP/домены серверов, реальные ключи в `.env`, никнеймы клиентов, ID платежей, реальные конфиги. Заменять на `client_***`, `vps_***`, `pay_***`.

### Telegram-бот
- [ ] `bot-01-main-menu.png` — `/start`, главное меню.
- [ ] `bot-02-tariffs.png` — список тарифов с ценой и сроком.
- [ ] `bot-03-countries.png` — выбор локации (флаги + страны).
- [ ] `bot-04-payment-providers.png` — 4 кнопки выбора провайдера оплаты.
- [ ] `bot-05-invoice.png` — счёт с суммой, QR/кнопкой «Оплатить», таймером.
- [ ] `bot-06-access-delivered.png` — «доступ выдан» с обезличенным форматом конфига.
- [ ] `bot-07-my-subscription.png` — статус подписки, дата окончания, локация, «продлить».

### Админ-панель
- [ ] `admin-01-login.png` — авторизация (без реальных кред).
- [ ] `admin-02-users.png` — таблица пользователей, ФИО/ID заблюрены.
- [ ] `admin-03-payments.png` — лента платежей с фильтром по провайдеру. **Главный «вау»-скрин.**
- [ ] `admin-04-tariffs.png` — редактор тарифа (цена/срок/локация/тоглы провайдеров).
- [ ] `admin-05-broadcast.png` — композер рассылки: текст + фильтр аудитории + preview.
- [ ] `admin-06-settings.png` — тоглы платёжных провайдеров, настройка реф. бонуса.

### Техника
- [ ] `arch-diagram.svg` — 4 payment webhook → aiohttp → DB + интеграции + APScheduler. Excalidraw, 30 мин.
- [ ] `code-fsm-purchase.png` — снипет FSM покупки через carbon.now.sh, 12–15 строк.
- [ ] `code-aps-job.png` — снипет APScheduler-задачи на истечения подписок, ~10 строк.

### Видео
- [ ] `demo-bot-purchase.mp4` — 25–35 сек: главное меню → тариф → локация → провайдер → фейковый success → получение доступа. Test-режим.
- [ ] `demo-admin-walkthrough.mp4` — 20–30 сек: Users → Payments → Broadcast → Settings. Без монтажа.

### Не снимать (экономия времени)
- Marzban-панель и SSH-сессии с 3proxy — серая зона, не «твой» интерфейс.
- Логи / Grafana — нет красивого мониторинга, потёмкинский дашборд не делаем.
- Сценарий ошибки/рефанда — упоминается в тексте, отдельный скриншот не нужен.

---

# EN version

> On the EN site the framing must stay neutral: this is a **digital subscription bot with automated access delivery**. Do not mention "VPN reselling", "Marzban", "3proxy" or anything proxy/circumvention-related on the public English page.

## 1. Title

**Primary (98 chars):**
> Subscription Bot — Telegram bot for selling digital subscriptions: automated access delivery, fiat and crypto

**Short (76 chars, for the grid card):**
> Subscription Bot — Telegram subscription bot with 4 payment gateways and admin

## 2. Description (~1450 chars)

A Telegram bot for subscription businesses: automated access delivery on payment, four payment gateways unified in one product, and a web admin panel for operators.

**Problem.** Before the bot, orders and access delivery were handled manually in a Telegram chat. Customers had to wait for an operator, the operator would mix up plans and locations, and payments were collected through a personal card. The more customers came in, the worse the workflow scaled.

**Solution.** A single async aiohttp service serves three surfaces at once: the bot webhook (aiogram 3), webhooks for four payment systems (Rapira, CryptoBot, ParityPay), and a Jinja2 admin panel. Purchase is an FSM flow: plan → location → payment provider → automated access delivery through REST/SSH integrations. APScheduler tracks subscription expirations, sends renewal reminders and runs background broadcasts. Referral system with a signup bonus. An in-memory cache of settings and buttons is warmed at startup and invalidated on every admin update.

**Result.** A fully automated funnel from "picked a plan" to "received access" with no human in the loop. The operator only handles edge cases: sees payments grouped by provider, extends subscriptions, runs targeted broadcasts, toggles payment systems on the fly. Plans and locations are edited in the admin catalog without a redeploy.

**Stack:** Python, aiogram 3, aiohttp, SQLAlchemy 2.0 async, PostgreSQL, APScheduler, Jinja2, Docker.

## 2.1. Description (~1000 chars)

A Telegram bot for selling digital subscriptions with automated access delivery after payment. The public framing stays neutral: subscription product, payments, admin panel and operator workflow automation.

One aiohttp service handles the bot webhook, payment-system webhooks and a Jinja2 admin panel. Purchase is an FSM flow: plan, location, payment provider, invoice and access delivery through integrations. APScheduler tracks expirations, sends renewal reminders and runs broadcasts. In the admin panel, operators manage plans, payments, users, providers and broadcast scenarios.

The result is an automated funnel from plan selection to access delivery, where a human is only needed for edge cases and support.

## 3. Cover preview

Split image. Left half — a phone mockup with the Telegram bot open (list of plans + a "Subscription active until June 24" badge). Right half — a laptop with the admin panel (payments table with colored status badges and a provider filter). Between them — a kinked FSM arrow and four mini payment-provider icons.

Sizes: hero 1600×900, grid card 800×600. Background in the chosen site palette, accent on the green "paid" badge.

## 4. Screenshots and videos (18 files)

> Blur everywhere: server IPs/domains, real `.env` keys, customer usernames, payment IDs, real access configs. Replace with `client_***`, `vps_***`, `pay_***`.

### Telegram bot
- [ ] `bot-01-main-menu.png` — `/start`, main menu.
- [ ] `bot-02-tariffs.png` — plans list with price and duration.
- [ ] `bot-03-countries.png` — location picker (flags + countries).
- [ ] `bot-04-payment-providers.png` — four payment provider buttons.
- [ ] `bot-05-invoice.png` — invoice with amount, QR/Pay button, countdown.
- [ ] `bot-06-access-delivered.png` — "access delivered" message with an anonymized config shape.
- [ ] `bot-07-my-subscription.png` — subscription status, expiry date, location, "extend" button.

### Admin panel
- [ ] `admin-01-login.png` — auth screen (no real credentials).
- [ ] `admin-02-users.png` — users table, names/IDs blurred.
- [ ] `admin-03-payments.png` — payments feed with provider filter. **Hero shot.**
- [ ] `admin-04-tariffs.png` — plan editor (price/duration/location/provider toggles).
- [ ] `admin-05-broadcast.png` — broadcast composer: copy + audience filter + preview.
- [ ] `admin-06-settings.png` — payment-provider toggles, referral bonus setup.

### Engineering
- [ ] `arch-diagram.svg` — 4 payment webhooks → aiohttp → DB + integrations + APScheduler. Excalidraw, 30 min.
- [ ] `code-fsm-purchase.png` — purchase FSM snippet via carbon.now.sh, 12–15 lines.
- [ ] `code-aps-job.png` — APScheduler job for expirations, ~10 lines.

### Video
- [ ] `demo-bot-purchase.mp4` — 25–35 sec: main menu → plan → location → provider → mock success → access delivered. Test mode.
- [ ] `demo-admin-walkthrough.mp4` — 20–30 sec: Users → Payments → Broadcast → Settings. No edits.

### Do NOT shoot (time-saver)
- Marzban panel and 3proxy SSH sessions — grey zone, not "your" UI.
- Logs / Grafana — no nice monitoring set up, no Potemkin dashboards.
- Failure/refund flow — covered in the copy, separate screenshot adds nothing.
