# gym_progres — Трекер тренировок

Slug на сайте: `/cases/gym-progres`
Источник в vault: `Projects/Personal/gym-progres/gym-progres-treker-trenirovok.md`

> Публичное позиционирование — «персональный веб-трекер тренировок с публичными шаблонами». Это полностью свой продукт, можно показывать смело.

---

## 1. Название

**Основное (102 симв):**
> gym_progres — веб-трекер тренировок: подходы, веса, графики прогресса и публичные шаблоны по ссылке

**Короткое (76 симв, для карточки на витрине):**
> gym_progres — трекер тренировок с auto-save и шаблонами по публичной ссылке

## 2. Описание (~1450 симв)

Персональное веб-приложение для записи тренировок: подходы, веса, упражнения и историю прогресса. Все формы сохраняются автоматически, без кнопки «Сохранить».

**Проблема.** Записывать тренировки в заметки или Google-таблицу — это либо хаос, либо ад с формулами. Готовые фитнес-приложения перегружены: рекламой, подписками, ненужными метриками. А когда тренер скидывает программу в PDF, перенести её в трекер быстрее переписать вручную, чем найти в каталоге.

**Решение.** FastAPI отдаёт страницы через Jinja2 (SSR), Alpine.js на стороне клиента дебаунсит запросы и шлёт изменения в JSON-API — пользователь просто вводит цифры, ничего не «сохраняет». Каталог упражнений (40+ позиций) живёт в `data/exercises.json`, прогревается через LRU-cache и расширяется без перезапуска контейнера. Любой шаблон тренировки можно открыть по публичной ссылке: ученик жмёт «Импортировать» и получает точную копию у себя, без дубликатов, если что-то уже есть. Bodyweight-упражнения берут вес из профиля пользователя, чтобы не вводить руками. Сессии — на `SessionMiddleware`, конфиг — pydantic-settings, всё в Docker Compose.

**Результат.** Полный цикл «выбрал шаблон → записал подход → увидел график» работает в один экран без подписок и рекламы. Шаблонами можно делиться без регистрации зрителя. Архитектура SSR + островки Alpine.js — отличная база для быстрых внутренних/нишевых веб-приложений на FastAPI без тяжёлого React.

**Стек:** Python 3.12, FastAPI, SQLAlchemy + PostgreSQL, Jinja2 SSR, Alpine.js, Tailwind CDN, Starlette sessions, pydantic-settings, Docker Compose.

## 2.1. Description (~1000 символов)

Веб-трекер тренировок для записи подходов, весов, упражнений и прогресса без кнопки «Сохранить». Пользователь просто вводит цифры, а приложение автоматически сохраняет изменения.

Сервис построен на FastAPI, Jinja2 SSR и Alpine.js: страницы отдаются сервером, а маленькие интерактивные участки отправляют debounced-запросы в JSON API. Каталог упражнений хранится в `data/exercises.json` и расширяется без перезапуска контейнера. Шаблоны тренировок можно открыть по публичной ссылке и импортировать в свой аккаунт без дублей.

Получился лёгкий личный продукт без рекламы и подписок: выбрал шаблон, записал подход, увидел график. Архитектура хорошо подходит для быстрых нишевых веб-приложений на FastAPI.

## 3. Превью (обложка кейса)

Split-screen. Слева — мокап телефона с формой тренировки: 4 упражнения, у каждого по подходу с весом и повторениями, рядом активный счётчик «3/4». Справа — десктоп с графиком прогресса по жиму лёжа за 3 месяца (восходящая линия + точки подходов). Между ними — иконка «Поделиться» и короткий URL с тегом «public template».

Размеры: hero 1600×900, карточка на витрине 800×600. Фон — в выбранной палитре, акцент на зелёных бейджах «saved» возле полей формы (символ auto-save).

## 4. Скрины и видео (15 файлов)

> Везде блюрить: реальные имена/email в профиле, никнеймы других пользователей в публичных шаблонах. Использовать тестовый аккаунт `demo_athlete`.

### Веб-приложение
- [ ] `web-01-dashboard.png` — главная: список последних тренировок, кнопка «новая».
- [ ] `web-02-workout-form.png` — форма тренировки с auto-save индикаторами. **Главный «вау»-скрин.**
- [ ] `web-03-exercise-catalog.png` — каталог 40+ упражнений с фильтрами/иконками.
- [ ] `web-04-template-public.png` — публичная страница шаблона с кнопкой «Импортировать».
- [ ] `web-05-import-confirm.png` — диалог «уже есть похожий шаблон, не дублировать».
- [ ] `web-06-progress-chart.png` — график прогресса по упражнению за период.
- [ ] `web-07-stats-summary.png` — статистика: суммарный объём, частота, любимые упражнения.
- [ ] `web-08-bodyweight-set.png` — упражнение, где вес снаряда = bodyweight (визуально подсвечено).
- [ ] `web-09-share-modal.png` — модалка «Поделиться» с публичной ссылкой и QR.

### Мобильный вид
- [ ] `mobile-01-form.png` — та же форма на телефоне (адаптив).
- [ ] `mobile-02-history.png` — лента истории на телефоне.

### Техника
- [ ] `arch-diagram.svg` — схема: FastAPI (SSR + JSON) ↔ Alpine.js ↔ PostgreSQL + JSON-каталог. Excalidraw, 20 мин.
- [ ] `code-autosave.png` — снипет debounced auto-save на Alpine.js через carbon.now.sh, 12–15 строк.
- [ ] `code-template-import.png` — снипет idempotent-импорта шаблона на FastAPI, ~12 строк.

### Видео
- [ ] `demo-workout-flow.mp4` — 25–35 сек: открыл шаблон → импортировал → начал тренировку → ввёл подходы → увидел auto-save → закрыл вкладку → открыл снова, данные на месте.

### Не снимать (экономия времени)
- Админский раздел / миграции — их нет, схема создаётся при старте.
- Реальные тренировки конкретного пользователя — приватность, синтетика лучше.
- Тесты / CI — у проекта нет публичной CI-витрины, не профильно.

---

# EN version

> Public framing stays straightforward: this is **a personal workout tracker** with publicly shareable templates. Fully my own product, nothing to redact.

## 1. Title

**Primary (104 chars):**
> gym_progres — web workout tracker: sets, weights, progress charts and publicly shareable workout templates

**Short (76 chars, for the grid card):**
> gym_progres — workout tracker with auto-save and shareable public templates

## 2. Description (~1440 chars)

A personal web app for logging workouts: sets, weights, exercises and progress history. Every form saves automatically — there is no "Save" button.

**Problem.** Tracking workouts in plain notes or Google Sheets is either chaos or formula hell. Off-the-shelf fitness apps are bloated with ads, subscriptions and metrics nobody asked for. And when a coach sends a program as a PDF, re-typing it by hand is faster than finding all the exercises in someone else's catalog.

**Solution.** FastAPI renders pages with Jinja2 (SSR) and Alpine.js on the client debounces requests against a JSON API — the user just types numbers, nothing to "save". The exercise catalog (40+ items) lives in `data/exercises.json`, is warmed via LRU-cache and extended without restarting the container. Any workout template can be opened by a public link: a student hits "Import" and gets an exact copy in their account, with no duplicates if something already exists. Bodyweight exercises pull the user's weight from the profile so it does not have to be typed in. Sessions sit on `SessionMiddleware`, config on pydantic-settings, the whole thing ships as Docker Compose.

**Result.** The full loop — pick a template → log a set → see the chart — fits on one screen, without subscriptions or ads. Templates can be shared without forcing the viewer to sign up. The SSR + Alpine.js islands pattern is a solid base for small internal/niche FastAPI web apps without React weight.

**Stack:** Python 3.12, FastAPI, SQLAlchemy + PostgreSQL, Jinja2 SSR, Alpine.js, Tailwind CDN, Starlette sessions, pydantic-settings, Docker Compose.

## 2.1. Description (~1000 chars)

A web workout tracker for logging sets, weights, exercises and progress without a "Save" button. The user just types numbers, and the app saves changes automatically.

The service uses FastAPI, Jinja2 SSR and Alpine.js: pages are rendered server-side, while small interactive parts send debounced requests to a JSON API. The exercise catalog lives in `data/exercises.json` and can grow without restarting the container. Workout templates can be opened by public link and imported into an account without duplicates.

The result is a lightweight personal product with no ads or subscriptions: pick a template, log a set, see the chart. The architecture is a good fit for small niche FastAPI web apps.

## 3. Cover preview

Split screen. Left — a phone mockup with a workout form: four exercises, each with a set showing weight and reps, an active "3/4" counter next to it. Right — a desktop with a bench-press progress chart over three months (rising line with set dots). Between them — a "Share" icon and a short URL tagged "public template".

Sizes: hero 1600×900, grid card 800×600. Background in the chosen site palette, green "saved" badges next to form fields as the auto-save accent.

## 4. Screenshots and videos (15 files)

> Blur everywhere: real names/emails in profiles, other users' handles in public templates. Use a test account `demo_athlete`.

### Web app
- [ ] `web-01-dashboard.png` — home: recent workouts list, "new" button.
- [ ] `web-02-workout-form.png` — workout form with auto-save indicators. **Hero shot.**
- [ ] `web-03-exercise-catalog.png` — catalog of 40+ exercises with filters/icons.
- [ ] `web-04-template-public.png` — public template page with "Import" button.
- [ ] `web-05-import-confirm.png` — "similar template exists, do not duplicate" dialog.
- [ ] `web-06-progress-chart.png` — per-exercise progress chart over a period.
- [ ] `web-07-stats-summary.png` — stats: total volume, frequency, favorite exercises.
- [ ] `web-08-bodyweight-set.png` — exercise where equipment weight = bodyweight (visually highlighted).
- [ ] `web-09-share-modal.png` — "Share" modal with public link and QR.

### Mobile view
- [ ] `mobile-01-form.png` — same form on phone (responsive).
- [ ] `mobile-02-history.png` — history feed on phone.

### Engineering
- [ ] `arch-diagram.svg` — diagram: FastAPI (SSR + JSON) ↔ Alpine.js ↔ PostgreSQL + JSON catalog. Excalidraw, 20 min.
- [ ] `code-autosave.png` — debounced auto-save snippet in Alpine.js via carbon.now.sh, 12–15 lines.
- [ ] `code-template-import.png` — idempotent template-import snippet in FastAPI, ~12 lines.

### Video
- [ ] `demo-workout-flow.mp4` — 25–35 sec: opened a template → imported → started a workout → entered sets → saw auto-save → closed the tab → reopened, data intact.

### Do NOT shoot (time-saver)
- Admin section / migrations — none, schema is created on startup.
- Real workouts of a specific user — privacy, synthetic data is better.
- Tests / CI — no public CI surface, not relevant to the case.
