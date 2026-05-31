# Tech Rise Academy

Slug на сайте: `/cases/tech-rise-academy`
Источник в vault: `Projects/Work/Tech-Academy-web-2/tech-rise-academy-lending-it-akademii.md`

> Кейс про лендинг + автоматизированный сбор заявок. На публику не выносим креды VPS, реальный домен/IP, токен бота. На скринах админских уведомлений — обезличить ФИО, телефоны, email абитуриентов.

---

## 1. Название

**Основное (108 симв):**
> Tech Rise Academy — многостраничный лендинг IT-академии с автосбором заявок прямо в Telegram, без CRM и менеджеров

**Короткое (76 симв, для карточки на витрине):**
> Tech Rise Academy — лендинг IT-академии: заявки сразу в Telegram, без CRM

## 2. Описание (~1470 симв)

Многостраничный лендинг для IT-академии «Tech Rise Academy» с курсами «Аналитик данных» и «QA-тестировщик» и автоматической отправкой заявок в Telegram владельца.

**Проблема.** У академии не было сайта и не было бюджета на CRM. Заявки терялись в директе и почте, владелец не успевал реагировать в первые часы — а это критично для дорогого продукта вроде курса. Нужен был быстрый, лёгкий лендинг и одно место, куда падают все заявки.

**Решение.** Главная + две страницы курсов на чистом HTML/CSS/JS — никакого фреймворка, никакого билдера. Быстрый LCP, простая поддержка контента. Все ссылки и контакты собраны в одном `config.js`, заказчик меняет их без программиста. Бэкенд — FastAPI: эндпоинт `/api/lead` валидирует тело через Pydantic и отправляет уведомление в Telegram через Bot API (httpx). Развёртывание — Docker Compose + Nginx, обновление: `git pull && docker compose up -d --build`. Никакой базы и CRM — Telegram-чат и есть «inbox» заявок.

**Результат.** Сайт задеплоен на собственный домен, принимает заявки. Заявка падает владельцу в Telegram-чат в течение нескольких секунд после отправки формы — реакция в первые минуты, без проверки почты и без оплаты CRM. Контентные правки (телефон, новый набор, ссылки на оферту) делаются точечно в `config.js`, без участия разработчика.

**Стек:** Vanilla HTML/CSS/JS, FastAPI, Pydantic, Telegram Bot API, httpx, Docker Compose, Nginx.

## 2.1. Description (~1000 символов)

Многостраничный лендинг для IT-академии с двумя страницами курсов и автоматической отправкой заявок в Telegram владельца. Проект решает задачу без CRM, базы данных и тяжёлого фреймворка.

Frontend собран на чистом HTML/CSS/JS: главная, страницы курсов, формы и общий `config.js`, где заказчик может менять ссылки, контакты и оферту без разработчика. Backend на FastAPI принимает `/api/lead`, валидирует данные через Pydantic и отправляет карточку заявки в Telegram через Bot API. Деплой — Docker Compose + Nginx.

Владелец получает заявку через несколько секунд после отправки формы и реагирует сразу в привычном Telegram-чате, не проверяя почту и не оплачивая отдельную CRM.

## 3. Превью (обложка кейса)

Split-image. Слева — макет ноутбука с открытой главной страницей лендинга (hero с названием академии и кнопкой «Записаться»). Справа — смартфон с Telegram-чатом владельца, в котором видна свежая заявка карточкой: имя (обезличено), курс, телефон (обезличен), таймштамп. Между ними тонкая стрелка через «FastAPI / Bot API» badge. Акценты — на «новая заявка» бейдже в Telegram.

Размеры: hero 1600×900, карточка на витрине 800×600. Фон — в палитре сайта.

## 4. Скрины и видео (12 файлов)

> Везде блюрить: реальный домен/IP, токен бота, реальные ФИО/телефоны/email абитуриентов. Заменять на `student_***`, `phone_***`.

### Лендинг — десктоп
- [ ] `site-01-hero.png` — главная, hero-блок с заголовком и CTA.
- [ ] `site-02-programs.png` — секция «Программы», карточки курсов.
- [ ] `site-03-course-analyst.png` — страница курса «Аналитик данных», программа + цена.
- [ ] `site-04-course-qa.png` — страница курса «QA-тестировщик».
- [ ] `site-05-lead-form.png` — форма заявки с подсказками и валидацией.

### Лендинг — мобильный
- [ ] `site-06-mobile-hero.png` — hero на iPhone-моке.
- [ ] `site-07-mobile-form.png` — форма заявки на мобиле.

### Поток заявки
- [ ] `flow-01-telegram-lead.png` — карточка заявки в Telegram-чате владельца (всё обезличено). **Главный «вау»-скрин.**
- [ ] `flow-02-config-js.png` — снипет `config.js` через carbon.now.sh, чтобы показать, что заказчик правит сам.

### Техника
- [ ] `code-lead-handler.png` — снипет `/api/lead` (Pydantic-модель + httpx-вызов), 15–18 строк.
- [ ] `arch-diagram.svg` — Form → FastAPI `/api/lead` → Telegram Bot API → чат владельца. Excalidraw, 20 мин.

### Видео
- [ ] `demo-lead-flow.mp4` — 20–25 сек: открываю лендинг → заполняю форму тестовыми данными → получаю заявку в Telegram. Test-данные, без монтажа.

### Не снимать (экономия времени)
- Nginx-конфиг и docker-compose — текстом в описании достаточно, скрин не добавляет ценности.
- Lighthouse-отчёт — снимем, только если результат ≥90 во всех категориях.
- Админка/CRM — её намеренно нет, это часть истории.

---

# EN version

> On the EN site keep the same neutral framing — landing page + automated lead capture straight to Telegram. Blur all real domains, IPs, bot tokens, and applicant PII on every screenshot.

## 1. Title

**Primary (112 chars):**
> Tech Rise Academy — multi-page IT academy landing with automated lead capture straight to Telegram, no CRM required

**Short (74 chars, for the grid card):**
> Tech Rise Academy — IT academy landing: leads land in Telegram, no CRM

## 2. Description (~1480 chars)

A multi-page landing page for "Tech Rise Academy" with two course pages (Data Analyst, QA Engineer) and automated lead delivery straight to the owner's Telegram.

**Problem.** The academy had no website and no budget for a CRM. Leads were getting lost across DMs and inboxes; the owner couldn't react during the critical first hours after a sign-up — and that window is what closes a sale on a paid course. They needed a fast, lightweight landing and a single inbox for all incoming applications.

**Solution.** A home page plus two course pages built on plain HTML/CSS/JS — no framework, no page builder. Fast LCP, trivial content edits. All links and contact info live in a single `config.js`, so the client edits them without touching the developer. The backend is FastAPI: a `/api/lead` endpoint validates the payload with Pydantic and forwards a notification to Telegram via the Bot API (httpx). Deployment is Docker Compose + Nginx; updates are `git pull && docker compose up -d --build`. No database, no CRM — the Telegram chat is the inbox.

**Result.** The site is live on a custom domain and accepting applications. A new lead lands in the owner's Telegram within seconds — instant reaction without checking email, without paying for a CRM. Content edits (phone numbers, new cohort dates, offer links) are done by changing `config.js`, no developer involvement needed.

**Stack:** Vanilla HTML/CSS/JS, FastAPI, Pydantic, Telegram Bot API, httpx, Docker Compose, Nginx.

## 2.1. Description (~1000 chars)

A multi-page landing page for an IT academy with two course pages and automated lead delivery to the owner's Telegram. The project solves the intake flow without a CRM, database or heavy framework.

The frontend is plain HTML/CSS/JS: home page, course pages, forms and a shared `config.js` where the client can edit links, contacts and offer URLs without a developer. The FastAPI backend accepts `/api/lead`, validates data with Pydantic and sends a lead card to Telegram through the Bot API. Deployment is Docker Compose + Nginx.

The owner receives each application seconds after form submission and can react inside the familiar Telegram chat, without checking email or paying for a separate CRM.

## 3. Cover preview

Split image. Left — laptop mockup with the landing home page open (hero with the academy name and a "Sign up" CTA). Right — phone mockup with the owner's Telegram chat showing a fresh lead card: name (anonymized), course, phone (anonymized), timestamp. A thin arrow between them passes through a "FastAPI / Bot API" badge. Accent on the "new lead" Telegram badge.

Sizes: hero 1600×900, grid card 800×600. Background in the site palette.

## 4. Screenshots and videos (12 files)

> Blur on every shot: real domain/IP, bot token, applicant names/phones/emails. Replace with `student_***`, `phone_***`.

### Landing — desktop
- [ ] `site-01-hero.png` — home page, hero block with headline and CTA.
- [ ] `site-02-programs.png` — "Programs" section, course cards.
- [ ] `site-03-course-analyst.png` — Data Analyst course page, curriculum + price.
- [ ] `site-04-course-qa.png` — QA Engineer course page.
- [ ] `site-05-lead-form.png` — application form with hints and validation.

### Landing — mobile
- [ ] `site-06-mobile-hero.png` — hero in an iPhone mockup.
- [ ] `site-07-mobile-form.png` — application form on mobile.

### Lead flow
- [ ] `flow-01-telegram-lead.png` — lead card inside the owner's Telegram chat (all PII blurred). **Hero shot.**
- [ ] `flow-02-config-js.png` — `config.js` snippet via carbon.now.sh, showing the client can edit content themselves.

### Engineering
- [ ] `code-lead-handler.png` — `/api/lead` snippet (Pydantic model + httpx call), 15–18 lines.
- [ ] `arch-diagram.svg` — Form → FastAPI `/api/lead` → Telegram Bot API → owner chat. Excalidraw, 20 min.

### Video
- [ ] `demo-lead-flow.mp4` — 20–25 sec: open the landing → fill the form with test data → receive the lead in Telegram. Test data, no edits.

### Do NOT shoot (time-saver)
- Nginx config and docker-compose — a sentence in the copy is enough; a screenshot adds nothing.
- Lighthouse report — only ship it if the score is ≥90 across all categories.
- Admin/CRM screen — there isn't one on purpose, that's part of the story.
