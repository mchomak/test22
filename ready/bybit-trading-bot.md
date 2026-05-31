# ByBit Trading Bot — Автоматизированная спотовая торговля на Bybit

Slug на сайте: `/cases/bybit-trading-bot`
Источник в vault: `Projects/Work/bybit-bot/bybit-trading-bot.md`

> Публичное позиционирование — «автоматизированный торговый бот для биржи Bybit с мониторингом 300+ монет и стратегией Volume Spike + Price Acceleration». Клиентский проект; на витрине подаём как кейс по крипто-автоматизации.

---

## 1. Название

**Основное (106 симв):**
> ByBit Trading Bot — автоматизированная спотовая торговля: мониторинг 300+ монет, Volume Spike + управление позициями

**Короткое (72 симв, для карточки на витрине):**
> ByBit Trading Bot — спотовая торговля 24/7 с автоматическим управлением позициями

## 2. Описание (~1480 симв)

Автоматизированный торговый бот для биржи Bybit: сканирует 300+ монет круглосуточно, обнаруживает импульсные движения и самостоятельно исполняет спотовые сделки с защитой позиций.

**Проблема.** Ручная спотовая торговля на Bybit — это постоянный мониторинг сотен пар, ручные расчёты объёмов и пропущенные импульсы пока трейдер спит. Стратегия Volume Spike + Price Acceleration требует отслеживания аномальных изменений объёма и скорости цены одновременно — человеку это физически не успеть на 300+ инструментах.

**Решение.** Бот работает как трёхслойный пайплайн. Первый слой — сканер: каждые N секунд через Bybit WebSocket + REST собирает тикеры всех пар, фильтрует по ликвидности через CoinPaprika (капитализация, объём). Второй слой — стратегия: вычисляет объёмный всплеск относительно скользящего среднего за `VOLUME_WINDOW_DAYS` дней и ускорение цены за последние свечи; при одновременном срабатывании обоих условий — сигнал на вход. Третий слой — риск-менеджмент: открывает позицию через Bybit REST, фиксирует стоп-лосс и тейк-профит, следит за `MAX_POSITIONS`, закрывает позиции по условиям. Telegram-уведомления сообщают о каждой сделке, текущих открытых позициях и ежедневной сводке P&L. Весь сервис упакован в Docker Compose, конфигурируется через `.env`.

**Результат.** Полный цикл «сканирование → сигнал → сделка → выход» работает без участия человека 24/7. Реализован dry-run режим для безрискового тестирования стратегии на реальных данных перед переходом на боевой аккаунт.

**Стек:** Python 3.11+ asyncio, Bybit REST + WebSocket API, CoinPaprika API, SQLAlchemy async + asyncpg, PostgreSQL 14, Telegram Bot API, Docker Compose.

## 2.1. Description (~1000 символов)

Клиентский торговый бот для биржи Bybit. Мониторит 300+ спотовых пар 24/7, ищет импульсные движения по стратегии Volume Spike + Price Acceleration и сам открывает и закрывает позиции без участия человека.

Архитектура из трёх слоёв: WebSocket/REST-сканер с фильтрацией по капитализации (CoinPaprika), стратегийный модуль с расчётом объёмных аномалий и ценового ускорения, риск-менеджер с контролем стопов и лимитом открытых позиций. Telegram-уведомления — каждая сделка и ежедневный P&L. Dry-run режим для тестирования на реальных данных без риска.

## 3. Превью (обложка кейса)

Тёмный фон с брендингом Bybit (жёлтый акцент). На первом плане — свечной график с маркерами входа (жёлтые стрелки вверх) и выхода (белые стрелки). Поверх — прозрачная карточка архитектуры `WebSocket → Стратегия → Bybit REST → Telegram`. Справа — мокап Telegram-уведомления «BUY BTC/USDT · vol_spike ×3.2 · pos #4». Снизу — строка «300+ монет · 24/7 · dry-run ready».

Размеры: hero 1600×900, карточка на витрине 800×600. Акцент на жёлтом (#F7A600) — фирменный цвет Bybit.

## 4. Скрины и видео (14 файлов)

> Везде блюрить: API-ключи в `.env`, реальный баланс аккаунта, IP-адрес VPS, пароли. Все цифры в демо — синтетические из dry-run режима.

### Telegram-уведомления
- [ ] `tg-01-trade-open.png` — сигнал на вход: пара, направление, объёмный спайк, размер позиции.
- [ ] `tg-02-trade-close.png` — закрытие позиции: причина (TP / SL / стратегия), результат.
- [ ] `tg-03-daily-report.png` — ежедневная сводка: кол-во сделок, win-rate, P&L.

### Стратегия и данные
- [ ] `chart-01-volume-spike.png` — график объёма с выделенным аномальным всплеском и точкой входа. **Главный «вау»-скрин.**
- [ ] `chart-02-price-acceleration.png` — ценовой график с отмеченным ускорением и сигналом.
- [ ] `chart-03-positions.png` — таблица открытых позиций с P&L в реальном времени (dry-run данные).

### Консоль / логи
- [ ] `cli-01-scanner.png` — вывод сканера: список монет, объёмы, отфильтрованные пары.
- [ ] `cli-02-signal.png` — лог срабатывания стратегии: параметры сигнала, решение на вход.
- [ ] `cli-03-dry-run.png` — сессия dry-run: серия сделок, итоговый P&L симуляции.

### Техника
- [ ] `arch-diagram.svg` — схема: WebSocket/REST → Сканер → Стратегия → Риск-менеджер → Bybit API → Telegram. Excalidraw.
- [ ] `code-strategy.png` — снипет расчёта Volume Spike + Price Acceleration через carbon.now.sh, ~15 строк.
- [ ] `code-position-manager.png` — снипет открытия позиции с выставлением стоп-лосса и тейк-профита, ~12 строк.

### Видео
- [ ] `demo-pipeline.mp4` — 30–40 сек: запуск `docker compose up` → сканер находит сигнал → открытие позиции → Telegram-алёрт. Ускоренный таймлапс.
- [ ] `demo-telegram-feed.mp4` — 15–20 сек: лента уведомлений с серией dry-run сделок и итоговым отчётом.

### Не снимать
- Реальный баланс и живые сделки на боевом аккаунте — приватность клиента.
- Полный перебор параметров `VOLUME_WINDOW_DAYS` и `PRICE_ACCELERATION_FACTOR` — слишком технично для лендинга.

---

# EN version

> Public framing: **automated spot trading bot for Bybit — monitors 300+ coins 24/7, detects volume spikes and price acceleration, executes and manages positions without human involvement.** Client project, presented as a crypto automation case study.

## 1. Title

**Primary (104 chars):**
> ByBit Trading Bot — automated spot trading: 300+ coins monitored, Volume Spike strategy, position management

**Short (70 chars, for the grid card):**
> ByBit Trading Bot — 24/7 spot trading with automated position management

## 2. Description (~1480 chars)

An automated trading bot for Bybit: scans 300+ coins around the clock, detects momentum moves and executes spot trades with built-in position protection — no human in the loop.

**Problem.** Manual spot trading on Bybit means watching hundreds of pairs, calculating volume averages by hand and missing breakouts while you sleep. The Volume Spike + Price Acceleration strategy requires monitoring abnormal volume changes and price momentum simultaneously — physically impossible across 300+ instruments.

**Solution.** The bot runs as a three-layer pipeline. Layer 1 — scanner: Bybit WebSocket + REST streams tickers every few seconds, filtering pairs by liquidity via CoinPaprika (market cap, volume). Layer 2 — strategy: computes a volume spike relative to a rolling `VOLUME_WINDOW_DAYS` average and price acceleration over recent candles; when both conditions fire together, it generates an entry signal. Layer 3 — risk manager: places the order via Bybit REST, sets stop-loss and take-profit, tracks `MAX_POSITIONS`, and closes positions on exit conditions. Telegram notifications cover every trade, open positions and a daily P&L summary. The whole service runs in Docker Compose and configures via `.env`.

**Result.** The full loop — scan → signal → trade → exit — runs without a human 24/7. A dry-run mode lets the strategy be validated on live market data before switching to a live account.

**Stack:** Python 3.11+ asyncio, Bybit REST + WebSocket API, CoinPaprika API, SQLAlchemy async + asyncpg, PostgreSQL 14, Telegram Bot API, Docker Compose.

## 2.1. Description (~1000 chars)

A client-built trading bot for the Bybit exchange. It monitors 300+ spot pairs around the clock, detects momentum moves using a Volume Spike + Price Acceleration strategy and opens and closes positions autonomously.

Three-layer architecture: a WebSocket/REST scanner with CoinPaprika liquidity filtering, a strategy module that computes volume anomalies and price acceleration, and a risk manager with stop controls and a position-count limit. Telegram notifications cover every trade and a daily P&L summary. Dry-run mode for validating the strategy on live data before going live.

## 3. Cover preview

Dark background with Bybit brand yellow (#F7A600) as accent. Foreground: a candle chart with entry markers (yellow up-arrows) and exit markers (white arrows). Overlaid card showing the architecture `WebSocket → Strategy → Bybit REST → Telegram`. Right side: a phone mockup with a Telegram alert "BUY BTC/USDT · vol_spike ×3.2 · pos #4". Bottom strip: "300+ coins · 24/7 · dry-run ready".

Sizes: hero 1600×900, grid card 800×600. Yellow accent to match Bybit branding.

## 4. Screenshots and videos (14 files)

> Blur everywhere: `.env` API keys, real account balance, VPS IP, passwords. All numbers in demos are synthetic dry-run data.

### Telegram alerts
- [ ] `tg-01-trade-open.png` — entry signal: pair, direction, volume spike multiplier, position size.
- [ ] `tg-02-trade-close.png` — position close: reason (TP / SL / strategy), result.
- [ ] `tg-03-daily-report.png` — daily summary: trade count, win rate, P&L.

### Strategy and data
- [ ] `chart-01-volume-spike.png` — volume chart with highlighted anomalous spike and entry point. **Hero shot.**
- [ ] `chart-02-price-acceleration.png` — price chart with marked acceleration and signal.
- [ ] `chart-03-positions.png` — open positions table with real-time P&L (dry-run data).

### Console / logs
- [ ] `cli-01-scanner.png` — scanner output: coin list, volumes, filtered pairs.
- [ ] `cli-02-signal.png` — strategy trigger log: signal parameters, entry decision.
- [ ] `cli-03-dry-run.png` — dry-run session: series of trades, final simulated P&L.

### Engineering
- [ ] `arch-diagram.svg` — diagram: WebSocket/REST → Scanner → Strategy → Risk Manager → Bybit API → Telegram. Excalidraw.
- [ ] `code-strategy.png` — Volume Spike + Price Acceleration calculation snippet via carbon.now.sh, ~15 lines.
- [ ] `code-position-manager.png` — position open snippet with stop-loss and take-profit, ~12 lines.

### Video
- [ ] `demo-pipeline.mp4` — 30–40 sec: `docker compose up` → scanner finds a signal → position opens → Telegram alert. Time-lapsed.
- [ ] `demo-telegram-feed.mp4` — 15–20 sec: Telegram notification feed with a series of dry-run trades and final report.

### Do NOT shoot
- Real balance and live trades on a production account — client privacy.
- Full `VOLUME_WINDOW_DAYS` / `PRICE_ACCELERATION_FACTOR` parameter sweep — too technical for a portfolio page.
