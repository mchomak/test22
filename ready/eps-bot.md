# EPS Bot — Solana Raydium ML Trading Bot

Slug на сайте: `/cases/eps-bot`
Источник в vault: `Projects/Personal/EPS-Bot/eps-bot-solana-raydium-ml-trading-bot.md`

> Публичное позиционирование — «алгоритмический торговый бот на DEX Solana с ML-сигналами». Это собственный pet-проект, а не продукт для клиентов; на витрине подаём как технологический кейс (PyTorch + on-chain + автоматизация).

---

## 1. Название

**Основное (108 симв):**
> EPS Bot — алгоритмический торговый бот на DEX Raydium (Solana): ML-сигналы, исполнение сделок, Telegram-отчёты

**Короткое (74 симв, для карточки на витрине):**
> EPS Bot — ML-торговля на Solana DEX с авто-исполнением и Telegram-отчётами

## 2. Описание (~1480 симв)

Автономный торговый бот на DEX Raydium в сети Solana: собирает рынок, обучает ML-модели на исторических данных и сам исполняет сделки по сигналам.

**Проблема.** Ручная торговля на Solana DEX — это бесконечный мониторинг сотен пулов, перенос данных в таблички и эмоциональные решения на ночных свечах. Чтобы проверить хоть одну стратегию, нужно собрать датасет, прогнать бэктест и каждый раз руками жать «купить/продать» в кошельке.

**Решение.** Пайплайн из четырёх слоёв: (1) клиенты Raydium API v3 + GeckoTerminal качают пулы и OHLCV-данные в PostgreSQL; (2) ML-модуль строит датасет с техническими индикаторами (pandas-ta) и обучает несколько моделей — LSTM, GRU, CNN, Transformer и Random Forest — с валидацией на отдельной выборке; (3) стратегия читает свежие свечи, прогоняет их через выбранную модель и сравнивает прогноз с порогами `threshold_buy` / `threshold_sell`; (4) tx_tools формирует и подписывает транзакции через Solana RPC. Telegram-уведомитель шлёт каждую сделку и ежедневный отчёт по PnL. Всё упаковано в Docker Compose, миграции и сбор пулов вынесены в отдельные CLI-скрипты в `tools/`.

**Результат.** Полный цикл «данные → модель → сделка → отчёт» работает без участия человека. Архитектура позволяет переключать модели и пороги под разные рынки без переписывания пайплайна. На этом проекте отработан стек, который потом переиспользую в крипто-кейсах под клиента.

**Стек:** Python 3.12 asyncio, PyTorch, scikit-learn, pandas-ta, SQLAlchemy + PostgreSQL, Raydium API v3, GeckoTerminal API, Solana RPC, Telegram Bot API, Docker Compose.

## 2.1. Description (~1000 символов)

Автономный trading-bot для Raydium DEX в сети Solana. Он собирает пулы и OHLCV-данные, обучает ML-модели на исторических свечах и исполняет сделки по сигналам стратегии без ручного участия.

Пайплайн разделён на четыре слоя: сбор данных через Raydium API v3 и GeckoTerminal, хранение в PostgreSQL, ML-модуль на PyTorch/scikit-learn с LSTM, GRU, CNN, Transformer и Random Forest, затем стратегия и `tx_tools` для формирования Solana-транзакций. Telegram-уведомления показывают сделки, ошибки и ежедневный PnL-отчёт.

Проект отработал полный цикл «данные → модель → сделка → отчёт» и стал технической базой для следующих crypto/automation кейсов.

## 3. Превью (обложка кейса)

Композиция в три слоя: на заднем плане — свечной график OHLCV с подсвеченными точками входа/выхода (зелёные/красные маркеры). Поверх — прозрачная карточка с архитектурой `GeckoTerminal → DB → PyTorch → Raydium`. Справа — мокап Telegram-уведомления «BUY SOL/USDC · pred 0.74 · size 1.2». В углу логотип Solana-радуги, ник модели «LSTM-v3».

Размеры: hero 1600×900, карточка на витрине 800×600. Фон — тёмный, акцент на зелёных стрелках входов и фиолетовом градиенте Solana.

## 4. Скрины и видео (16 файлов)

> Везде блюрить: реальные адреса кошельков, приватные ключи в `.env`, конкретные суммы и RPC-эндпоинты. Все цифры в демо — синтетические, без претензии на «реальный PnL».

### Telegram-уведомления
- [ ] `tg-01-trade-alert.png` — отчёт о сделке: пара, направление, размер, скор модели.
- [ ] `tg-02-daily-report.png` — ежедневный отчёт PnL: количество сделок, win-rate, прибыль.
- [ ] `tg-03-error-alert.png` — пример уведомления о сбое RPC / API (показывает наблюдаемость).

### Чарты и модели
- [ ] `chart-01-ohlcv-signals.png` — свечной график с метками входов/выходов модели. **Главный «вау»-скрин.**
- [ ] `chart-02-training-curves.png` — кривые обучения LSTM (train/val loss).
- [ ] `chart-03-models-compare.png` — таблица/бар-чарт сравнения LSTM / GRU / CNN / Transformer / RF по precision/recall.

### Админ-консоль / CLI
- [ ] `cli-01-collect-pools.png` — вывод `tools/collect_pools.py` с фильтрацией пулов Raydium.
- [ ] `cli-02-train-model.png` — лог обучения модели с эпохами и метриками.
- [ ] `cli-03-backtest.png` — отчёт бэктеста стратегии на исторических данных.

### Техника
- [ ] `arch-diagram.svg` — 4-блочная схема: API-клиенты → DB → ML → tx_tools → Telegram. Excalidraw, 30 мин.
- [ ] `code-lstm-model.png` — снипет архитектуры LSTM через carbon.now.sh, 15–20 строк.
- [ ] `code-strategy.png` — снипет стратегии: чтение OHLCV → predict → threshold → решение.
- [ ] `code-raydium-tx.png` — снипет формирования swap-транзакции на Raydium, ~12 строк.

### Видео
- [ ] `demo-pipeline.mp4` — 30–40 сек: запуск `docker compose up` → логи сбора пулов → старт обучения → инференс → Telegram-алёрт. Ускоренный таймлапс.
- [ ] `demo-telegram-feed.mp4` — 15–20 сек: лента уведомлений в Telegram-канале с серией сделок.

### Не снимать (экономия времени)
- Реальный кошелёк и транзакции на mainnet — приватность + не нужно для кейса.
- Подробный разбор бэктеста по конкретному токену — слишком нишево для лендинга.
- Скриншоты исходного кода ML — длинные простыни, заменяются на короткие carbon-снипеты.

---

# EN version

> Public framing on the EN site stays neutral: this is **an algorithmic trading bot for Solana DEX with ML-driven signals** — a personal R&D project, presented as a technology case (PyTorch + on-chain + automation), not a service.

## 1. Title

**Primary (107 chars):**
> EPS Bot — algorithmic trading bot for Raydium DEX on Solana: ML signals, automated execution, Telegram reports

**Short (72 chars, for the grid card):**
> EPS Bot — ML-driven trading on Solana DEX with auto-execution and alerts

## 2. Description (~1480 chars)

An autonomous trading bot for the Raydium DEX on Solana: collects market data, trains ML models on historical OHLCV and executes trades on its own signals.

**Problem.** Trading manually on a Solana DEX means watching hundreds of pools, dragging numbers into spreadsheets and making emotional calls on late-night candles. Validating a single strategy means assembling a dataset, running a backtest and clicking "buy/sell" in a wallet every time.

**Solution.** A four-layer pipeline: (1) Raydium API v3 and GeckoTerminal clients pull pool metadata and OHLCV candles into PostgreSQL; (2) the ML module builds a dataset with technical indicators (pandas-ta) and trains several models — LSTM, GRU, CNN, Transformer and Random Forest — with a held-out validation set; (3) the strategy reads fresh candles, runs them through the selected model and compares the prediction against `threshold_buy` / `threshold_sell`; (4) tx_tools builds and signs Solana transactions via RPC. A Telegram notifier ships every trade and a daily PnL report. Everything ships as Docker Compose, with migrations and pool-collection scripts split into CLI tools under `tools/`.

**Result.** The full loop — data → model → trade → report — runs without a human in the middle. The architecture lets me swap models and thresholds for different market regimes without rewriting the pipeline. The stack ironed out on this project becomes the baseline for client crypto cases.

**Stack:** Python 3.12 asyncio, PyTorch, scikit-learn, pandas-ta, SQLAlchemy + PostgreSQL, Raydium API v3, GeckoTerminal API, Solana RPC, Telegram Bot API, Docker Compose.

## 2.1. Description (~1000 chars)

An autonomous trading bot for Raydium DEX on Solana. It collects pools and OHLCV data, trains ML models on historical candles and executes trades from strategy signals without manual clicks.

The pipeline has four layers: market collection through Raydium API v3 and GeckoTerminal, PostgreSQL storage, a PyTorch/scikit-learn ML module with LSTM, GRU, CNN, Transformer and Random Forest models, then strategy logic plus `tx_tools` for Solana transactions. Telegram alerts report trades, failures and daily PnL.

The project proves the full loop from data to model to trade to report, and became a technical base for later crypto and automation cases.

## 3. Cover preview

Three-layer composition: in the background, an OHLCV candle chart with highlighted entry/exit markers (green/red). On top, a translucent card showing the architecture `GeckoTerminal → DB → PyTorch → Raydium`. On the right, a phone mockup with a Telegram alert "BUY SOL/USDC · pred 0.74 · size 1.2". A small Solana rainbow logo in the corner, model tag "LSTM-v3".

Sizes: hero 1600×900, grid card 800×600. Dark background, green arrows for entries, a violet Solana-style gradient as accent.

## 4. Screenshots and videos (16 files)

> Blur everywhere: real wallet addresses, `.env` private keys, real position sizes, RPC endpoints. All numbers in demos are synthetic — no "real PnL" claims.

### Telegram alerts
- [ ] `tg-01-trade-alert.png` — trade alert: pair, direction, size, model score.
- [ ] `tg-02-daily-report.png` — daily PnL report: trade count, win rate, profit.
- [ ] `tg-03-error-alert.png` — sample RPC/API failure alert (signals observability).

### Charts and models
- [ ] `chart-01-ohlcv-signals.png` — candle chart with model entry/exit markers. **Hero shot.**
- [ ] `chart-02-training-curves.png` — LSTM train/val loss curves.
- [ ] `chart-03-models-compare.png` — comparison table/bar chart for LSTM / GRU / CNN / Transformer / RF on precision/recall.

### Admin console / CLI
- [ ] `cli-01-collect-pools.png` — output of `tools/collect_pools.py` filtering Raydium pools.
- [ ] `cli-02-train-model.png` — training log with epochs and metrics.
- [ ] `cli-03-backtest.png` — backtest report on historical data.

### Engineering
- [ ] `arch-diagram.svg` — 4-block diagram: API clients → DB → ML → tx_tools → Telegram. Excalidraw, 30 min.
- [ ] `code-lstm-model.png` — LSTM architecture snippet via carbon.now.sh, 15–20 lines.
- [ ] `code-strategy.png` — strategy snippet: read OHLCV → predict → threshold → decision.
- [ ] `code-raydium-tx.png` — Raydium swap transaction snippet, ~12 lines.

### Video
- [ ] `demo-pipeline.mp4` — 30–40 sec: `docker compose up` → pool collection logs → training start → inference → Telegram alert. Time-lapsed.
- [ ] `demo-telegram-feed.mp4` — 15–20 sec: Telegram channel feed with a series of trade alerts.

### Do NOT shoot (time-saver)
- Real mainnet wallet and transactions — privacy + not needed for the case.
- Token-specific backtest deep-dives — too niche for a portfolio page.
- Long ML source-code screenshots — replace with short carbon snippets.
