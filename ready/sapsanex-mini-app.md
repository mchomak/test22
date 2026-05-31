# SapsanEx — Telegram Mini App для обмена

Slug на сайте: `/cases/sapsanex-mini-app`
Источник в vault: `Projects/Work/exchanger-mini-app-2/sapsanex-telegram-mini-app-dlia-obmena-valiut.md`

> Кейс — Mini App для обмена крипты/фиата внутри Telegram. Все скрины обезличиваем: реальные суммы, хеши заявок, IP сервера, ключи к Premium Exchanger API, токен бота. На UI оставляем демо-курсы и тестовые суммы.

---

## 1. Название

**Основное (110 симв):**
> SapsanEx — Telegram Mini App для обмена крипты и фиата: расчёт курса, заявка и трекинг статуса внутри Telegram

**Короткое (76 симв, для карточки на витрине):**
> SapsanEx — Telegram Mini App для обмена крипты и фиата, без перехода в браузер

## 2. Описание (~1490 симв)

Telegram Mini App для обменника `sapsanex.cc`: пользователь рассчитывает курс, создаёт заявку и следит за её статусом, не выходя из Telegram. Под капотом — собственный FastAPI-шлюз поверх стороннего API Premium Exchanger.

**Проблема.** До Mini App клиенты приходили из Telegram, переходили на внешний сайт, заполняли форму, потом проверяли статус заявки на третьем экране. На каждом шаге часть пользователей отваливалась, особенно с мобильного. Параллельно — стороннее API обменника на `form-data` (не JSON), без типизации и без удобной модели заявки.

**Решение.** Один Docker Compose, четыре сервиса: FastAPI-бэкенд, aiogram-бот, React+TS-фронтенд, PostgreSQL. Mini App работает поверх Telegram WebApp: авторизация через HMAC-SHA256 валидацию `initData` — без сессий и JWT, без отдельной формы логина. Бэкенд оборачивает Premium Exchanger в типизированный слой (SQLAlchemy async + Pydantic), параллельно ведёт собственный журнал заявок в Postgres. Бот (aiogram 3) — отдельный процесс: шарит конфиг, но не делит соединения с API; при изменении статуса заявки шлёт пользователю уведомление. Polling статуса работает прямо в Mini App, фоновая задача в `main.py` отменяет заявки, висящие >30 минут. i18n (ru/en) через CSV-файлы.

**Результат.** Полный цикл обмена — расчёт → создание → отслеживание — проходит внутри Telegram. Пользователю не нужно открывать сайт, заявка автоматически закрывается при таймауте, статус приходит уведомлением от бота. Готово к продакшен-деплою.

**Стек:** React + TypeScript + Vite, Tailwind, FastAPI, aiogram 3, SQLAlchemy async, PostgreSQL, Docker Compose.

## 2.1. Description (~1000 символов)

Telegram Mini App для обменника `sapsanex.cc`: пользователь рассчитывает курс, создаёт заявку и отслеживает статус, не выходя из Telegram.

Приложение состоит из React+TS фронтенда, FastAPI-бэкенда, aiogram-бота и PostgreSQL в Docker Compose. Авторизация работает через Telegram WebApp `initData` с HMAC-SHA256, без отдельного логина. Бэкенд оборачивает сторонний Premium Exchanger API в типизированный слой и параллельно хранит собственный журнал заявок. Бот присылает уведомления при смене статуса, а Mini App показывает polling и таймауты.

В итоге весь обменный поток остаётся внутри Telegram: расчёт, создание заявки, ожидание оплаты, авто-отмена зависших заявок и уведомление о результате.

## 3. Превью (обложка кейса)

Phone-моки в две стопки. Слева — открытый Mini App с калькулятором обмена (USDT → RUB, пара демо-цифр и кнопка «Создать заявку»). Справа — Telegram-чат, где бот прислал «Заявка `ex_***` оплачена, выдаём средства» с цветным бейджем статуса. Между ними — мини-иконка Telegram WebApp и стрелка через бейдж «HMAC initData». Акценты — на бейдже «paid».

Размеры: hero 1600×900, карточка на витрине 800×600. Светлая палитра + жирный акцент на оранжево-зелёных бейджах статусов.

## 4. Скрины и видео (16 файлов)

> Везде блюрить: реальные суммы, hash заявок, кошельки, имена/usernames пользователей, API_LOGIN/API_KEY Premium Exchanger, IP/домен сервера. Заменять на `ex_***`, `user_***`, `wallet_***`.

### Mini App — поток заявки
- [ ] `app-01-home.png` — главный экран, выбор направлений (top-list популярных).
- [ ] `app-02-calculator.png` — калькулятор «отдаю / получу», подсветка курса. **Главный «вау»-скрин.**
- [ ] `app-03-confirm.png` — подтверждение условий обмена (галочка соглашения).
- [ ] `app-04-create.png` — экран после создания заявки (hash, статус «ожидает оплаты»).
- [ ] `app-05-status-polling.png` — заявка в процессе, статус-чип «processing», таймер.
- [ ] `app-06-status-paid.png` — заявка в статусе «paid / completed».
- [ ] `app-07-history.png` — история заявок пользователя.
- [ ] `app-08-language.png` — переключатель ru/en (i18n).

### Telegram-бот (уведомления)
- [ ] `bot-01-new-order.png` — уведомление «Создана заявка `ex_***`».
- [ ] `bot-02-status-update.png` — уведомление «Статус изменён: processing → paid».
- [ ] `bot-03-cancelled.png` — авто-отмена по таймауту >30 минут.

### Техника
- [ ] `arch-diagram.svg` — WebApp → React → FastAPI → Premium Exchanger / Postgres / aiogram bot. Excalidraw, 30 мин.
- [ ] `code-hmac-validation.png` — снипет `telegram_auth.py` (HMAC-SHA256 валидация initData), 15–20 строк, carbon.now.sh.
- [ ] `code-exchanger-wrapper.png` — снипет `exchanger_api.py`, где стороннее form-data API приведено к типизированному слою. ~15 строк.

### Видео
- [ ] `demo-app-flow.mp4` — 30–40 сек: открываю Mini App из бота → выбираю направление → ввожу сумму → создаю заявку → получаю уведомление в чате (демо/тест-режим, без реальных средств).
- [ ] `demo-bot-notifications.mp4` — 15–20 сек: показываю поток уведомлений от бота при смене статуса.

### Не снимать (экономия времени)
- Админка Premium Exchanger — не «твоя» поверхность.
- SQL-консоль / pgAdmin — без красивого мониторинга нет смысла.
- Подробные edge-cases отмен/возвратов — упоминаем текстом, отдельные скрины не нужны.

---

# EN version

> On the EN site keep neutral framing — a Telegram Mini App for crypto/fiat exchange. Blur amounts, order hashes, wallet addresses, Premium Exchanger API keys, server IPs, and bot tokens on every shot. Keep demo rates and test amounts on the UI.

## 1. Title

**Primary (114 chars):**
> SapsanEx — Telegram Mini App for crypto and fiat exchange: rate calculation, order creation and status tracking inside Telegram

**Short (78 chars, for the grid card):**
> SapsanEx — Telegram Mini App for crypto/fiat exchange, no browser hop needed

## 2. Description (~1490 chars)

A Telegram Mini App for the `sapsanex.cc` exchanger: users calculate rates, place orders and watch their status without leaving Telegram. Under the hood — a custom FastAPI gateway wrapping the third-party Premium Exchanger API.

**Problem.** Before the Mini App, customers came from Telegram, hopped to an external website, filled out a form, then checked status on a third screen. Each hop bled users, especially on mobile. On top of that, the Premium Exchanger API spoke `form-data` (not JSON), had no typing, and exposed no convenient order model.

**Solution.** One Docker Compose, four services: FastAPI backend, aiogram bot, React+TS frontend, PostgreSQL. The Mini App runs on top of Telegram WebApp: auth is HMAC-SHA256 validation of `initData` — no sessions, no JWT, no separate login. The backend wraps Premium Exchanger in a typed layer (SQLAlchemy async + Pydantic) and keeps its own order journal in Postgres. The bot (aiogram 3) is a separate process: it shares config but not API connections; on status changes it pushes a notification to the user. Status polling runs inside the Mini App; a background task in `main.py` cancels orders pending more than 30 minutes. i18n (ru/en) via CSV files.

**Result.** The full exchange flow — calculate → create → track — happens inside Telegram. Users never open a browser, stale orders self-cancel on timeout, status arrives as a bot notification. Ready for production rollout.

**Stack:** React + TypeScript + Vite, Tailwind, FastAPI, aiogram 3, SQLAlchemy async, PostgreSQL, Docker Compose.

## 2.1. Description (~1000 chars)

A Telegram Mini App for the `sapsanex.cc` exchanger: users calculate a rate, create an order and track status without leaving Telegram.

The app consists of a React+TS frontend, FastAPI backend, aiogram bot and PostgreSQL in Docker Compose. Authentication uses Telegram WebApp `initData` with HMAC-SHA256, with no separate login. The backend wraps the third-party Premium Exchanger API into a typed layer and also keeps its own order journal. The bot sends status-change notifications, while the Mini App handles polling and timeouts.

The result is a complete exchange flow inside Telegram: calculation, order creation, payment wait, auto-cancel for stale orders and final status notification.

## 3. Cover preview

Two phone mockups. Left — Mini App open with the exchange calculator (USDT → RUB, a couple of demo numbers and a "Create order" CTA). Right — a Telegram chat where the bot posted "Order `ex_***` paid, releasing funds" with a colored status badge. Between them — a small Telegram WebApp icon and an arrow passing through an "HMAC initData" badge. Accent on the "paid" badge.

Sizes: hero 1600×900, grid card 800×600. Light palette with bold orange/green status-badge accents.

## 4. Screenshots and videos (16 files)

> Blur on every shot: real amounts, order hashes, wallet addresses, usernames, Premium Exchanger `API_LOGIN`/`API_KEY`, server IP/domain. Replace with `ex_***`, `user_***`, `wallet_***`.

### Mini App — order flow
- [ ] `app-01-home.png` — home screen, popular directions list.
- [ ] `app-02-calculator.png` — "you give / you get" calculator with rate highlight. **Hero shot.**
- [ ] `app-03-confirm.png` — terms confirmation screen (consent checkbox).
- [ ] `app-04-create.png` — post-creation screen (hash, "awaiting payment" status).
- [ ] `app-05-status-polling.png` — order in flight, "processing" status chip with timer.
- [ ] `app-06-status-paid.png` — order in "paid / completed" state.
- [ ] `app-07-history.png` — user order history.
- [ ] `app-08-language.png` — ru/en switcher (i18n).

### Telegram bot (notifications)
- [ ] `bot-01-new-order.png` — "Order `ex_***` created" notification.
- [ ] `bot-02-status-update.png` — "Status changed: processing → paid" notification.
- [ ] `bot-03-cancelled.png` — auto-cancel after >30 min timeout.

### Engineering
- [ ] `arch-diagram.svg` — WebApp → React → FastAPI → Premium Exchanger / Postgres / aiogram bot. Excalidraw, 30 min.
- [ ] `code-hmac-validation.png` — `telegram_auth.py` snippet (HMAC-SHA256 validation of initData), 15–20 lines, carbon.now.sh.
- [ ] `code-exchanger-wrapper.png` — `exchanger_api.py` snippet showing the third-party form-data API wrapped into a typed layer. ~15 lines.

### Video
- [ ] `demo-app-flow.mp4` — 30–40 sec: open the Mini App from the bot → pick a direction → enter an amount → create an order → receive a notification in chat (demo/test mode, no real funds).
- [ ] `demo-bot-notifications.mp4` — 15–20 sec: walk through bot notifications as the status changes.

### Do NOT shoot (time-saver)
- The Premium Exchanger admin — not "your" surface.
- SQL console / pgAdmin — no nice monitoring set up.
- Detailed refund/cancel edge cases — mentioned in copy, separate shots not needed.
