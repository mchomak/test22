# SkillUp — AI-платформа обучения

Slug на сайте: `/cases/skillup`
Источник в vault: `Projects/Personal/SKILLUP/SkillUp.md`

> Публичное позиционирование — «веб-сервис, где AI собирает структурированный план обучения по любой теме». Полностью свой продукт, можно показывать на 100% — будет «лицом» AI-кейсов в портфолио.

---

## 1. Название

**Основное (108 симв):**
> SkillUp — AI-платформа обучения: персональный план из 4 уровней по любой теме и прогресс в виде дерева

**Короткое (76 симв, для карточки на витрине):**
> SkillUp — AI-сервис, который строит план обучения и растит твоё «дерево»

## 2. Описание (~1490 симв)

Веб-сервис, где AI собирает структурированный план обучения по любой теме и показывает прогресс как растущее дерево, а не очередной чек-лист.

**Проблема.** ChatGPT даёт по теме хаотичные стены текста: непонятно, с чего стартовать и где «достаточно». Готовые roadmap-сайты — слишком общие, под рынок, а не под конкретного человека. Курсы с обещанием «выучи Х за месяц» не учитывают, что юзер уже знает. Нужен инструмент, который через короткий онбординг с моделью соберёт **именно мой** план — и потом покажет, где я сейчас и что дальше.

**Решение.** Frontend на Next.js 14 (App Router, TypeScript, Zustand, TanStack Query, Framer Motion) с дизайн-системой «ночной лес» (тёмные ночные фоны, фиолетово-зелёные акценты, шрифты Plus Jakarta Sans + Instrument Serif). Backend — FastAPI + SQLAlchemy 2.0 async + Alembic, тяжёлые AI-задачи на Celery + Redis. AI-слой на Anthropic API: `claude-opus-4-7` собирает план, `claude-sonnet-4-6` ведёт онбординг-чат, генерирует объяснения и квиз. План — дерево из узлов с tier `foundation → core → applied → mastery`, у каждого узла статус `locked / active / done`. Позиции узлов на канвасе считает фронт из tier + order_index, в БД не хранятся — это даёт гибкую переразвёртку без миграций. Всё в Docker Compose, отдача через Nginx.

**Результат.** Пользователь за 5 минут проходит онбординг и получает персональный план — не roadmap-png, а интерактивное дерево. Прогресс ощущается визуально: ветка зацвела — закрыл блок «foundation». Это мой основной AI-кейс в портфолио: showcase, на котором показываю, как объединять Claude, Celery-пайплайны и продуктовый Next.js.

**Стек:** Next.js 14 App Router + TypeScript, React 18, Zustand, TanStack Query, Framer Motion, vanilla CSS + CSS Modules, FastAPI, SQLAlchemy 2.0 async + Alembic, Celery + Redis, PostgreSQL 16, Anthropic API (claude-opus-4-7 / claude-sonnet-4-6), Docker Compose, Nginx.

## 2.1. Description (~1000 символов)

SkillUp — веб-сервис, где AI собирает персональный план обучения по любой теме и показывает прогресс как живое дерево, а не обычный чек-лист.

Frontend сделан на Next.js 14, TypeScript, Zustand, TanStack Query и Framer Motion; backend — FastAPI, PostgreSQL, Celery и Redis. AI-слой использует Anthropic API: одна модель собирает 4-уровневый план, другая ведёт онбординг, объясняет узлы и генерирует квизы. Узлы дерева имеют статусы `locked / active / done`, а координаты рассчитываются на фронте из tier и order_index, поэтому layout можно менять без миграций.

Пользователь за несколько минут проходит онбординг и получает интерактивный roadmap, где прогресс виден визуально: закрываешь блок — ветка «расцветает».

## 3. Превью (обложка кейса)

Главный визуал — растущее дерево-канвас в дизайне «ночной лес». Ствол и ветки расходятся по 4 уровням: `Foundation` снизу (зелёные «листья»), `Core`, `Applied`, `Mastery` сверху (фиолетовые «огоньки»). Несколько узлов подсвечены как «active»/«done». Сбоку — мини-чат онбординга с тремя репликами AI. В углу — иконки Claude и шрифт Instrument Serif с надписью «SkillUp».

Размеры: hero 1600×900, карточка на витрине 800×600. Фон — глубокий ночной (palette `--night-*`), акцент — зелёный sapling + фиолетовый CTA.

## 4. Скрины и видео (18 файлов)

> Использовать тестовый аккаунт `demo_learner`. Реальные темы юзеров и их планы блюрить или заменить на нейтральные («Learn FastAPI», «Drum basics»). Никаких реальных email/ID.

### Главная и онбординг
- [ ] `web-01-landing.png` — главная: hero «выбери тему», демо-карточка плана.
- [ ] `web-02-onboarding-1.png` — первый шаг чата онбординга: AI спрашивает уровень.
- [ ] `web-03-onboarding-2.png` — AI просит уточнить цель и доступное время.
- [ ] `web-04-onboarding-summary.png` — экран «строю план», прогресс-бар.

### План и дерево
- [ ] `web-05-plan-tree.png` — каноническое дерево с 4 уровнями. **Главный «вау»-скрин.**
- [ ] `web-06-topic-panel.png` — TopicPanel с описанием узла, вариантами объяснения и кнопкой «начать».
- [ ] `web-07-node-quiz.png` — мини-квиз по узлу, сгенерированный sonnet'ом.
- [ ] `web-08-node-done.png` — узел закрылся, ветка «расцвела», прогресс уровня обновился.
- [ ] `web-09-mobile-tree.png` — то же дерево на мобиле (вертикальный layout).

### Dashboard и профиль
- [ ] `web-10-dashboard.png` — список планов пользователя, streak, XP.
- [ ] `web-11-settings.png` — профиль + переключение темы/языка (если уже есть).

### Архитектура и AI-пайплайн
- [ ] `arch-diagram.svg` — схема: Next.js ↔ FastAPI ↔ Postgres + Celery/Redis + Anthropic API. Excalidraw, 30 мин.
- [ ] `pipeline-diagram.svg` — AI-пайплайн генерации плана (онбординг → opus → дерево → sonnet квиз). 30 мин.
- [ ] `code-claude-plan.png` — снипет вызова `claude-opus-4-7` для сборки плана (carbon.now.sh), ~15 строк.
- [ ] `code-canvas-layout.png` — снипет расчёта позиций узлов из `tier` + `order_index`, ~15 строк.
- [ ] `code-celery-task.png` — снипет Celery-таски на генерацию плана с прогрессом, ~12 строк.

### Видео
- [ ] `demo-onboarding-to-plan.mp4` — 40–60 сек: ввёл тему → онбординг → AI собирает план (progress) → открылось дерево → клик по узлу → объяснение → закрыл узел → ветка расцвела. Без монтажа.
- [ ] `demo-mobile.mp4` — 15–20 сек: то же на мобиле, акцент на анимации Framer Motion.

### Не снимать (экономия времени)
- Все 12 impl-заметок A1–A12 — это рабочие документы, не публичный контент.
- Дизайн-превью `/design-preview` целиком — берём только 1–2 скрина для разбавки.
- Длинные логи Celery — заменяются на короткий снипет таски.

---

# EN version

> Public framing stays the same: **a web service where AI builds a structured learning plan for any topic**. Fully my own product, no redactions — meant to be the face of AI cases in the portfolio.

## 1. Title

**Primary (108 chars):**
> SkillUp — AI learning platform: a personal 4-tier plan for any topic and your progress as a growing tree

**Short (75 chars, for the grid card):**
> SkillUp — AI service that builds a learning plan and grows your tree

## 2. Description (~1490 chars)

A web service where AI builds a structured learning plan for any topic and shows progress as a growing tree, not yet another checklist.

**Problem.** ChatGPT gives you chaotic walls of text on a topic — unclear where to start, unclear where "enough" is. Off-the-shelf roadmap sites are too generic, written for the market, not for the person. Courses promising "learn X in a month" ignore what the user already knows. People need a tool that, through a short onboarding with a model, builds **their** plan — and then shows where they are now and what's next.

**Solution.** Frontend on Next.js 14 (App Router, TypeScript, Zustand, TanStack Query, Framer Motion) with a "night forest" design system (deep dark backgrounds, violet-green accents, Plus Jakarta Sans + Instrument Serif). Backend — FastAPI + SQLAlchemy 2.0 async + Alembic, heavy AI work on Celery + Redis. AI layer on the Anthropic API: `claude-opus-4-7` assembles the plan, `claude-sonnet-4-6` runs the onboarding chat, generates explanations and quizzes. The plan is a tree of nodes with `foundation → core → applied → mastery` tiers; each node has `locked / active / done` status. Canvas positions are computed on the frontend from `tier` + `order_index` and never stored in the DB — that lets the layout evolve without migrations. Everything ships as Docker Compose behind Nginx.

**Result.** In five minutes the user goes from "type a topic" to a personal plan — not a roadmap PNG but an interactive tree. Progress feels visual: a branch blooms, a tier closes. This is the flagship AI case in my portfolio: a showcase for how I combine Claude, Celery pipelines and product-grade Next.js.

**Stack:** Next.js 14 App Router + TypeScript, React 18, Zustand, TanStack Query, Framer Motion, vanilla CSS + CSS Modules, FastAPI, SQLAlchemy 2.0 async + Alembic, Celery + Redis, PostgreSQL 16, Anthropic API (claude-opus-4-7 / claude-sonnet-4-6), Docker Compose, Nginx.

## 2.1. Description (~1000 chars)

SkillUp is a web service where AI builds a personal learning plan for any topic and shows progress as a living tree instead of a checklist.

The frontend uses Next.js 14, TypeScript, Zustand, TanStack Query and Framer Motion; the backend uses FastAPI, PostgreSQL, Celery and Redis. The AI layer runs on the Anthropic API: one model assembles the 4-tier plan, another handles onboarding, explains nodes and generates quizzes. Tree nodes have `locked / active / done` states, while coordinates are computed on the frontend from tier and order_index, so layout can evolve without migrations.

In a few minutes the user goes from onboarding to an interactive roadmap where progress is visual: finish a block, and the branch blooms.

## 3. Cover preview

Hero is the growing tree canvas in the "night forest" design. Trunk and branches fan across four tiers: `Foundation` at the bottom (green "leaves"), `Core`, `Applied`, `Mastery` on top (violet "lights"). Several nodes glow as "active"/"done". On the side — a small onboarding chat with three AI replies. In a corner — Claude icon and "SkillUp" in Instrument Serif.

Sizes: hero 1600×900, grid card 800×600. Deep night background (`--night-*` palette), sapling green + violet CTA as accents.

## 4. Screenshots and videos (18 files)

> Use a test account `demo_learner`. Blur real user topics and replace plans with neutral ones ("Learn FastAPI", "Drum basics"). No real emails/IDs.

### Landing and onboarding
- [ ] `web-01-landing.png` — landing: "pick a topic" hero, demo plan card.
- [ ] `web-02-onboarding-1.png` — first onboarding chat step: AI asks about level.
- [ ] `web-03-onboarding-2.png` — AI clarifies goal and available time.
- [ ] `web-04-onboarding-summary.png` — "building plan" screen with progress bar.

### Plan and tree
- [ ] `web-05-plan-tree.png` — canonical tree with 4 tiers. **Hero shot.**
- [ ] `web-06-topic-panel.png` — TopicPanel with node description, explanation variants and a "start" button.
- [ ] `web-07-node-quiz.png` — per-node mini-quiz generated by Sonnet.
- [ ] `web-08-node-done.png` — node closes, branch "blooms", tier progress updates.
- [ ] `web-09-mobile-tree.png` — same tree on mobile (vertical layout).

### Dashboard and profile
- [ ] `web-10-dashboard.png` — user plan list, streak, XP.
- [ ] `web-11-settings.png` — profile + theme/language toggle (if already shipped).

### Architecture and AI pipeline
- [ ] `arch-diagram.svg` — diagram: Next.js ↔ FastAPI ↔ Postgres + Celery/Redis + Anthropic API. Excalidraw, 30 min.
- [ ] `pipeline-diagram.svg` — AI plan generation pipeline (onboarding → Opus → tree → Sonnet quiz). 30 min.
- [ ] `code-claude-plan.png` — `claude-opus-4-7` call snippet for plan assembly (carbon.now.sh), ~15 lines.
- [ ] `code-canvas-layout.png` — snippet computing node positions from `tier` + `order_index`, ~15 lines.
- [ ] `code-celery-task.png` — Celery task for plan generation with progress, ~12 lines.

### Video
- [ ] `demo-onboarding-to-plan.mp4` — 40–60 sec: enter a topic → onboarding → AI builds plan (progress) → tree opens → click a node → explanation → close node → branch blooms. No edits.
- [ ] `demo-mobile.mp4` — 15–20 sec: same on mobile, emphasis on Framer Motion animations.

### Do NOT shoot (time-saver)
- All 12 impl A1–A12 working notes — internal docs, not public content.
- Full `/design-preview` walkthrough — pull only 1–2 screens for variety.
- Long Celery logs — replace with a short task snippet.
