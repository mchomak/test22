# AI Reply Assistant (chat-help-bot)

Slug на сайте: `/cases/ai-reply-assistant`
Источник в vault: `Projects/Work/chat-help-bot/chat-help-bot-ai-pomoshchnik-dlia-znakomstv-v-telegram.md`

> **Серая зона.** Изначальная ниша — помощь в переписке на сайтах знакомств. На публичной витрине переформулировано как **«AI-ассистент переписки в Telegram»** с фокусом на технику: AI-сценарии, платёжная воронка, прокси-ротация, реферальная система. На EN-сайте этот кейс показываем только в neutral-варианте; если есть сомнения — скрываем полностью. Слова «dating», «знакомства», «флирт», «anti-ignor», «photo pickup» в публичных текстах НЕ используем.

---

## 1. Название

**Основное (108 симв):**
> AI Reply Assistant — Telegram-бот с 7 AI-сценариями переписки, подпиской YooKassa и прокси-ротацией для GPT-4o

**Короткое (78 симв, для карточки на витрине):**
> AI Reply Assistant — Telegram-бот: 7 AI-сценариев, подписка, прокси-ротация

## 2. Описание (~1490 симв)

Telegram-бот на aiogram 3, в котором пользователь загружает скриншот переписки или текст и получает варианты ответов через GPT-4o. Семь специализированных сценариев, подписки и пакеты через YooKassa, проксированный доступ к OpenAI, реферальная система.

**Проблема.** Пользователю, который пишет много сообщений и хочет звучать иначе, мешают три проблемы сразу: страх «зависнуть» с пустой строкой, ручной копипаст в ChatGPT и медленная/нестабильная работа OpenAI из РФ. Внутри Telegram нужно решение, которое принимает скриншот, помнит контекст и не упирается в блокировки.

**Решение.** aiogram 3 + aiohttp webhook в Docker, PostgreSQL с Alembic-миграциями, OpenAI GPT-4o под капотом. Семь сценариев: ответы на сообщение, первое сообщение, разбор переписки (интерес/риски/рекомендации), разбор профиля, реплика по фото, возврат внимания, стилизация тона. Каждый сценарий — отдельный модуль prompt-сборки и парсера ответа. Персонализация: пол, ситуация, роль, стиль, имя AI-персонажа. Триал на 2 ч / 100 скриншотов. Платежи — YooKassa с чеками НДС (54-ФЗ). Реферальная программа: +7 дней и +150 скриншотов рефереру после оплаты приглашённого. Доступ к OpenAI — через пул HTTP-прокси с healthcheck, кулдауном после ошибок и slow-threshold ротацией, чтобы боты-«заглохшие» прокси не блокировали поток. Цены — в коде, изменения проходят через VCS и требуют деплоя.

**Результат.** MVP с платежами готов, идёт продакшен-деплой. Пользователь работает в одном окне Telegram, бот сам выбирает рабочий прокси, оплата проходит с фискальным чеком.

**Стек:** Python, aiogram 3, aiohttp, OpenAI GPT-4o, YooKassa, SQLAlchemy async, Alembic, PostgreSQL, Docker.

## 2.1. Description (~1000 символов)

Telegram-бот на aiogram 3, который помогает быстро подготовить варианты ответа по тексту или скриншоту переписки. Пользователь остаётся внутри Telegram: выбирает сценарий, отправляет контекст и получает несколько вариантов через GPT-4o.

В проекте собраны семь AI-сценариев, отдельные prompt-builder и response-parser модули, персонализация тона и роли, YooKassa-платежи, реферальная программа и проксированный доступ к OpenAI. Доступ к модели идёт через пул HTTP-прокси с healthcheck, cooldown после ошибок и ротацией медленных узлов, чтобы нестабильный провайдер не блокировал весь поток.

MVP с платежами готов к продакшен-деплою: бот сам выбирает рабочий прокси, принимает оплату с фискальным чеком и возвращает ответы в одном Telegram-окне.

## 3. Превью (обложка кейса)

Phone-мок с Telegram-ботом: пользователь только что загрузил скриншот (заблюренный «текст диалога», обезличенный) и бот вернул карточку с 3 вариантами ответа. На переднем плане поверх — мини-бейджи «GPT-4o», «proxy rotation», «YooKassa». Без намёков на сайты знакомств — никаких сердечек, лайков, имён сервисов.

Размеры: hero 1600×900, карточка на витрине 800×600. Палитра — нейтральная (фокус на «AI-инструмент»).

## 4. Скрины и видео (16 файлов)

> Везде блюрить: реальные тексты переписок (даже тестовые — заменять на нейтральные), фото профилей (использовать AI-аватары / placeholder-ы), реальные ФИО, реальные транзакции YooKassa, IP/домен сервера, OpenAI ключи, список прокси. Заменять на `user_***`, `pay_***`, `proxy_***`.

### Telegram-бот — основные сценарии
- [ ] `bot-01-main-menu.png` — главное меню, перечень сценариев (формулировки нейтральные).
- [ ] `bot-02-scenario-pick.png` — карточка выбора сценария.
- [ ] `bot-03-screenshot-upload.png` — загрузка скриншота переписки (текст внутри обезличен/placeholder).
- [ ] `bot-04-reply-variants.png` — 3–5 вариантов ответа. **Главный «вау»-скрин.**
- [ ] `bot-05-conversation-analysis.png` — карточка разбора переписки (структура: интерес / риски / рекомендации).
- [ ] `bot-06-style-settings.png` — настройка стиля общения и имени AI-персонажа.
- [ ] `bot-07-onboarding.png` — экраны онбординга с триалом.

### Подписки и платежи
- [ ] `pay-01-plans.png` — карточки тарифов / пакетов.
- [ ] `pay-02-yookassa-checkout.png` — экран YooKassa (демо-режим, обезличено).
- [ ] `pay-03-success-receipt.png` — подтверждение оплаты + чек.
- [ ] `pay-04-referral.png` — экран реферальной программы (мой код, баланс бонусов).

### Техника
- [ ] `arch-diagram.svg` — Telegram → aiogram webhook → AI router → proxy pool → OpenAI; параллельно YooKassa webhook → DB. Excalidraw, 30 мин.
- [ ] `code-prompt-builder.png` — снипет `prompt_builder.py` для одного сценария, 15–18 строк, carbon.now.sh.
- [ ] `code-proxy-rotation.png` — снипет ротации прокси (healthcheck + кулдаун + slow-threshold), ~20 строк.
- [ ] `code-yookassa-webhook.png` — снипет обработчика YooKassa webhook + начисление реф-бонуса.

### Видео
- [ ] `demo-reply-flow.mp4` — 25–35 сек: открываю бота → выбираю сценарий «ответ на сообщение» → загружаю скрин (с нейтральным placeholder-текстом) → получаю варианты. Test-режим, демо-промпт.

### Не снимать (экономия времени)
- Реальные переписки / скриншоты — даже размытые читаются как dating, попадают в серую зону.
- Сам OpenAI dashboard и список прокси — чувствительные данные.
- Очередь сообщений / Redis — нет красивого мониторинга.

---

# EN version

> **Grey-zone case.** On the EN site this should be published only in neutral framing — "an AI assistant for replying to messages inside Telegram", focused on the engineering: AI scenario routing, payment funnel, proxy rotation, referral program. Do NOT use the words "dating", "flirt", "anti-ignore", "photo pickup" on the public page. When in doubt — omit the case from EN entirely.

## 1. Title

**Primary (108 chars):**
> AI Reply Assistant — Telegram bot with 7 AI reply scenarios, YooKassa subscriptions and GPT-4o proxy rotation

**Short (80 chars, for the grid card):**
> AI Reply Assistant — Telegram bot: 7 AI scenarios, subscription, proxy rotation

## 2. Description (~1480 chars)

A Telegram bot on aiogram 3 that takes a screenshot or text of a conversation and returns reply suggestions via GPT-4o. Seven specialized scenarios, subscriptions and packs through YooKassa, proxied OpenAI access, referral program.

**Problem.** A user who writes a lot and wants to sound different runs into three problems at once: the blank-line freeze, manual copy/paste into ChatGPT, and slow/unreliable OpenAI access from restricted regions. They need a Telegram-native tool that accepts a screenshot, remembers context and keeps working despite upstream blocks.

**Solution.** aiogram 3 + aiohttp webhook in Docker, PostgreSQL with Alembic migrations, OpenAI GPT-4o under the hood. Seven scenarios: reply suggestions, opener, conversation analysis (interest / risks / recommendations), profile review, photo-based reply, attention-recovery prompt, tone styling. Each scenario is its own prompt-builder + response-parser module. Personalization: gender, situation, role, style, AI persona name. Trial: 2 h / 100 screenshots. Payments — YooKassa with fiscal receipts (Russian 54-ФЗ). Referral program: +7 days and +150 screenshots to the inviter on the referee's first payment. OpenAI access goes through an HTTP proxy pool with healthcheck, cooldown after errors and slow-threshold rotation, so dead proxies don't block the queue. Prices live in code — changes go through VCS and require a deploy.

**Result.** MVP with payments is live, production rollout in progress. The user stays inside one Telegram window, the bot transparently picks a working proxy, and payments clear with a fiscal receipt.

**Stack:** Python, aiogram 3, aiohttp, OpenAI GPT-4o, YooKassa, SQLAlchemy async, Alembic, PostgreSQL, Docker.

## 2.1. Description (~1000 chars)

A Telegram bot on aiogram 3 that prepares reply options from a text message or a conversation screenshot. The user stays inside Telegram: chooses a scenario, sends context and receives several GPT-4o-powered variants.

The project combines seven AI scenarios, separate prompt-builder and response-parser modules, tone and role personalization, YooKassa payments, a referral program and proxied OpenAI access. Model calls go through an HTTP proxy pool with healthchecks, cooldown after failures and slow-node rotation, so one bad proxy does not block the whole flow.

The MVP with payments is ready for production rollout: the bot selects a working proxy automatically, clears payments with fiscal receipts and returns replies in one Telegram window.

## 3. Cover preview

Phone mockup with the Telegram bot: the user has just uploaded a screenshot (blurred/anonymized "conversation text") and the bot replied with a card containing three reply variants. Floating on top — small "GPT-4o", "proxy rotation", "YooKassa" pills. No dating hints — no hearts, no likes, no service logos.

Sizes: hero 1600×900, grid card 800×600. Neutral palette, framed as an "AI tool".

## 4. Screenshots and videos (16 files)

> Blur on every shot: real conversation text (replace even test text with neutral placeholders), profile photos (use AI avatars / placeholders), real names, real YooKassa transactions, server IP/domain, OpenAI keys, proxy list. Replace with `user_***`, `pay_***`, `proxy_***`.

### Telegram bot — core scenarios
- [ ] `bot-01-main-menu.png` — main menu, scenario list (neutral wording only).
- [ ] `bot-02-scenario-pick.png` — scenario selection card.
- [ ] `bot-03-screenshot-upload.png` — uploading a conversation screenshot (text anonymized/placeholder).
- [ ] `bot-04-reply-variants.png` — 3–5 reply variants. **Hero shot.**
- [ ] `bot-05-conversation-analysis.png` — conversation analysis card (interest / risks / recommendations).
- [ ] `bot-06-style-settings.png` — communication style + AI persona name settings.
- [ ] `bot-07-onboarding.png` — onboarding screens with the trial offer.

### Subscriptions and payments
- [ ] `pay-01-plans.png` — plan / pack cards.
- [ ] `pay-02-yookassa-checkout.png` — YooKassa checkout (demo mode, anonymized).
- [ ] `pay-03-success-receipt.png` — payment confirmation + fiscal receipt.
- [ ] `pay-04-referral.png` — referral program screen (my code, bonus balance).

### Engineering
- [ ] `arch-diagram.svg` — Telegram → aiogram webhook → AI router → proxy pool → OpenAI; in parallel YooKassa webhook → DB. Excalidraw, 30 min.
- [ ] `code-prompt-builder.png` — `prompt_builder.py` snippet for one scenario, 15–18 lines, carbon.now.sh.
- [ ] `code-proxy-rotation.png` — proxy rotation snippet (healthcheck + cooldown + slow-threshold), ~20 lines.
- [ ] `code-yookassa-webhook.png` — YooKassa webhook handler + referral bonus accrual.

### Video
- [ ] `demo-reply-flow.mp4` — 25–35 sec: open the bot → pick the "reply to message" scenario → upload a screenshot (neutral placeholder text) → receive variants. Test mode, demo prompt.

### Do NOT shoot (time-saver)
- Real conversations / screenshots — even blurred they read as dating and land in the grey zone.
- OpenAI dashboard and the proxy list itself — sensitive.
- Message queues / Redis — no nice monitoring set up.
