# Seedream Bot — AI Virtual Try-On

Slug на сайте: `/cases/seedream-tryon`
Источник в vault: `Projects/Personal/seedream-bot/seedream-bot-ai-virtual-try-on.md`

> Публичное позиционирование — «Telegram-бот для AI-примерки одежды с двойной монетизацией и админкой». Полностью свой продукт, есть демо — можно показывать смело.

---

## 1. Название

**Основное (104 симв):**
> Seedream Bot — Telegram-бот AI-примерки одежды для e-commerce: Telegram Stars + YooKassa и админ-панель

**Короткое (78 симв, для карточки на витрине):**
> Seedream Bot — Telegram-бот AI-примерки одежды с двумя платёжными системами

## 2. Описание (~1490 симв)

Telegram-бот для интернет-магазинов одежды: пользователь загружает фото товара — нейросеть Seedream 4.0 генерирует фото модели в этом товаре, без фотосессии и съёмочной команды.

**Проблема.** Маленькому магазину одежды съёмка каждой новой позиции на живой модели стоит как сама партия товара: студия, модель, фотограф, ретушь. Без фото с моделью карточка плохо конвертит, особенно в Telegram-каналах продавцов. AI-сервисы есть, но они или дорогие через сайт, или требуют ручной возни — никто не идёт в браузер из чата.

**Решение.** aiogram 3 берёт фото товара, прогоняет через обёртку над Seedream 4.0 API и возвращает результат прямо в чат. Настраиваемые параметры генерации (фон, поза, угол, стиль, параметры модели) живут в FSM-сценарии. Две платёжные дорожки: **Telegram Stars** для микро-покупок внутри Telegram и **YooKassa** для пакетов и подписок. FastAPI-админка (порт 8001) на Jinja2 + Bootstrap 5 с авторизацией bcrypt + Starlette sessions: список пользователей, баланс генераций, история транзакций, тарифы, ручные начисления и выгрузки. SQLAlchemy 2.0 async + PostgreSQL (prod) / SQLite (dev), опциональный Redis под FSM. Локализация RU/EN живёт в `text.py`, логирование на loguru. Документация и launch-guide лежат в `docs/`.

**Результат.** Бизнес-владелец получает законченный продукт: бот, две кассы и админка из коробки. Я отработал стек, на котором делаю любые AI-примерки и img2img-сервисы под клиента — заменяется только бэкенд-провайдер модели.

**Стек:** Python, aiogram 3 (async), FastAPI + Jinja2 + Bootstrap 5, SQLAlchemy 2.0 async, PostgreSQL / SQLite, Seedream 4.0 API, Telegram Stars, YooKassa SDK, bcrypt + Starlette sessions, Redis (опц.), pydantic-settings, loguru, Docker.

## 2.1. Description (~1000 символов)

Telegram-бот для AI-примерки одежды: магазин загружает фото товара, а Seedream 4.0 генерирует изображение модели в этой вещи без отдельной фотосессии.

Бот на aiogram 3 ведёт пользователя через FSM-сценарий: загрузка товара, выбор параметров генерации, оплата и получение результата. Монетизация сделана двумя путями: Telegram Stars для быстрых покупок внутри Telegram и YooKassa для пакетов/подписок. FastAPI-админка на Jinja2 + Bootstrap показывает пользователей, балансы, платежи, тарифы, ручные начисления и выгрузки.

Получился законченный продукт для e-commerce: бот, генерация, две платёжные системы и операторская админка. Для новых img2img-кейсов меняется только провайдер модели.

## 3. Превью (обложка кейса)

Split-image. Слева — мокап телефона с Telegram-ботом: загруженное «фото товара» (футболка на белом фоне) и под ним AI-результат — модель в этой футболке на улице. Справа — окно админки: таблица пользователей с балансом генераций и колонкой «провайдер оплаты» с двумя иконками. Между двумя половинами — стрелка «Seedream 4.0 ▶». Сверху бейджи «Stars · YooKassa».

Размеры: hero 1600×900, карточка на витрине 800×600. Фон — в выбранной палитре, акцент — фиолетовый Telegram + золотой бейдж Stars.

## 4. Скрины и видео (16 файлов)

> Везде блюрить: реальные имена/никнеймы клиентов в админке, реальные ID платежей, реальные api-ключи. Использовать тест-аккаунт `demo_shop`. Для до/после примерки — собственные товарные фото или открытые stock-картинки, не чужие магазины.

### Telegram-бот
- [ ] `bot-01-start.png` — `/start`, главное меню, баланс генераций.
- [ ] `bot-02-upload.png` — пользователь прислал фото товара, бот просит выбрать параметры.
- [ ] `bot-03-params.png` — выбор фона/позы/стиля через inline-кнопки.
- [ ] `bot-04-result.png` — результат AI-примерки в чате. **Главный «вау»-скрин.**
- [ ] `bot-05-pricing.png` — экран тарифов: пакеты + ссылки на Stars и YooKassa.
- [ ] `bot-06-stars-pay.png` — инвойс Telegram Stars (нативный).
- [ ] `bot-07-yookassa-pay.png` — инвойс YooKassa (мобильный браузер).
- [ ] `bot-08-history.png` — история генераций с миниатюрами.

### Админ-панель
- [ ] `admin-01-login.png` — экран авторизации.
- [ ] `admin-02-users.png` — таблица пользователей (имена блюрены), баланс и теги.
- [ ] `admin-03-payments.png` — лента платежей с фильтром Stars / YooKassa. **Главный «вау»-скрин админки.**
- [ ] `admin-04-tariffs.png` — редактор тарифа (пакет генераций, цена, провайдер).

### Архитектура и код
- [ ] `arch-diagram.svg` — схема: aiogram 3 ↔ Seedream API + 2 платёжки + FastAPI-админка + Postgres + Redis. Excalidraw, 30 мин.
- [ ] `code-seedream-service.png` — снипет обёртки `seedream_service.py` (carbon.now.sh), 12–15 строк.
- [ ] `code-payments.png` — общий интерфейс над Stars и YooKassa, ~15 строк.

### Видео
- [ ] `demo-tryon.mp4` — 30–40 сек: открыл бота → загрузил фото товара → выбрал параметры → ожидание → AI-результат → история. Без монтажа.

### Не снимать (экономия времени)
- Реальные чужие магазины и реальные модели — копирайт, лучше синтетические товары.
- Внутренности Seedream API — это внешний сервис, у нас только обёртка.
- Скрины Postgres / Redis — нет ценной визуализации.

---

# EN version

> Public framing stays the same: **a Telegram bot for AI virtual try-on for e-commerce, with dual monetization and an admin panel**. Fully my own product with a working demo.

## 1. Title

**Primary (104 chars):**
> Seedream Bot — Telegram bot for AI virtual try-on for e-commerce: Telegram Stars + YooKassa and admin panel

**Short (76 chars, for the grid card):**
> Seedream Bot — Telegram virtual try-on bot with dual payments and admin

## 2. Description (~1480 chars)

A Telegram bot for online clothing stores: the user uploads a product photo and Seedream 4.0 generates a photo of a model wearing the item — no photoshoot, no crew.

**Problem.** For a small clothing store, shooting every new SKU on a live model costs about as much as the batch itself: studio, model, photographer, retouching. Without a model shot the product card converts poorly, especially in seller-run Telegram channels. AI services exist but they are either expensive on the web or full of manual steps — nobody leaves the chat for a browser.

**Solution.** aiogram 3 takes the product photo, runs it through a thin wrapper over the Seedream 4.0 API and returns the result straight into the chat. Generation parameters (background, pose, angle, style, model attributes) live in an FSM flow. Two payment lanes: **Telegram Stars** for in-Telegram micro-purchases and **YooKassa** for packs and subscriptions. A FastAPI admin panel (port 8001) on Jinja2 + Bootstrap 5 with bcrypt + Starlette sessions auth: user list, generation balance, transaction history, plans, manual top-ups and exports. SQLAlchemy 2.0 async + PostgreSQL (prod) / SQLite (dev), optional Redis for FSM. RU/EN localization lives in `text.py`, logs on loguru. Docs and launch guide ship in `docs/`.

**Result.** The business owner gets a finished product: bot, two checkouts and admin panel out of the box. I have also ironed out the stack I use for any AI try-on / img2img client service — only the model backend gets swapped.

**Stack:** Python, aiogram 3 (async), FastAPI + Jinja2 + Bootstrap 5, SQLAlchemy 2.0 async, PostgreSQL / SQLite, Seedream 4.0 API, Telegram Stars, YooKassa SDK, bcrypt + Starlette sessions, Redis (optional), pydantic-settings, loguru, Docker.

## 2.1. Description (~1000 chars)

A Telegram bot for AI virtual try-on: a shop uploads a product photo, and Seedream 4.0 generates an image of a model wearing that item without a separate photoshoot.

The aiogram 3 bot guides the user through an FSM flow: product upload, generation parameters, payment and result delivery. Monetization has two lanes: Telegram Stars for quick in-Telegram purchases and YooKassa for packs/subscriptions. A FastAPI admin panel on Jinja2 + Bootstrap shows users, balances, payments, plans, manual top-ups and exports.

The result is a finished e-commerce product: bot, generation, two payment systems and an operator admin panel. For new img2img cases, only the model provider has to change.

## 3. Cover preview

Split image. Left — a phone mockup with the Telegram bot: an uploaded "product photo" (t-shirt on white) and, below it, an AI result — a model wearing that t-shirt on the street. Right — admin panel window: user table with generation balance and a "payment provider" column with two icons. Between them — a "Seedream 4.0 ▶" arrow. "Stars · YooKassa" badges on top.

Sizes: hero 1600×900, grid card 800×600. Background in the chosen site palette, Telegram-violet plus a gold Stars badge as accents.

## 4. Screenshots and videos (16 files)

> Blur everywhere: real customer names/handles in admin, real payment IDs, real API keys. Use a test account `demo_shop`. For try-on before/after use own product photos or open stock images, never other shops' assets.

### Telegram bot
- [ ] `bot-01-start.png` — `/start`, main menu, generation balance.
- [ ] `bot-02-upload.png` — user uploaded a product photo, bot asks for parameters.
- [ ] `bot-03-params.png` — background/pose/style picker via inline buttons.
- [ ] `bot-04-result.png` — AI try-on result in chat. **Hero shot.**
- [ ] `bot-05-pricing.png` — plans screen: packs + Stars and YooKassa entry points.
- [ ] `bot-06-stars-pay.png` — native Telegram Stars invoice.
- [ ] `bot-07-yookassa-pay.png` — YooKassa invoice (mobile browser).
- [ ] `bot-08-history.png` — generation history with thumbnails.

### Admin panel
- [ ] `admin-01-login.png` — login screen.
- [ ] `admin-02-users.png` — user table (names blurred), balance and tags.
- [ ] `admin-03-payments.png` — payments feed with Stars / YooKassa filter. **Admin hero shot.**
- [ ] `admin-04-tariffs.png` — plan editor (generation pack, price, provider).

### Architecture and code
- [ ] `arch-diagram.svg` — diagram: aiogram 3 ↔ Seedream API + 2 payments + FastAPI admin + Postgres + Redis. Excalidraw, 30 min.
- [ ] `code-seedream-service.png` — `seedream_service.py` wrapper snippet (carbon.now.sh), 12–15 lines.
- [ ] `code-payments.png` — common interface over Stars and YooKassa, ~15 lines.

### Video
- [ ] `demo-tryon.mp4` — 30–40 sec: open the bot → upload a product photo → pick parameters → wait → AI result → history. No edits.

### Do NOT shoot (time-saver)
- Real third-party shops and real human models — copyright; use synthetic products.
- Seedream API internals — it's an external service, we only wrap it.
- Raw Postgres / Redis screens — nothing visually valuable.
