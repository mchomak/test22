# Frax — Crypto Exchanger Redesign

Slug на сайте: `/cases/frax-redesign`
Источник в vault: `Projects/Work/Frax redisign/Frax redisign.md`

> Кейс про фронтенд-редизайн обменника. На скринах оставляем тестовые/демо-курсы. Реальные кошельки, ключи API обменного плагина, креды админки WordPress — не показываем. Связанный проект под тем же заказчиком: `Taksa redisign`.

---

## 1. Название

**Основное (104 симв):**
> Frax — редизайн криптообменника на WordPress: новый фронтенд поверх готового плагина обмена, без замены CMS

**Короткое (72 симв, для карточки на витрине):**
> Frax — редизайн криптообменника на WordPress, без замены backend

## 2. Описание (~1470 симв)

Фронтенд-редизайн сайта обменника криптовалюты `frax.cc`. Полностью переработан внешний слой, при этом обменный движок (сторонний WordPress-плагин) остался нетронутым — без миграции данных и простоя.

**Проблема.** У заказчика был рабочий, но устаревший сайт обменника на WordPress + специализированный плагин для обмена крипты. Плагин закрывал всю бизнес-логику: курсы, направления, лимиты, заявки, API партнёров. Переписывать его означало бы потерять годы накопленных интеграций и поднимать проект заново. При этом сам сайт визуально проигрывал конкурентам, мобильная версия выглядела сломанной, а UX калькулятора отпугивал новых клиентов.

**Решение.** Чистый фронтенд-редизайн поверх существующего бэкенда. Перевёрстаны шаблоны WordPress: новая визуальная система, упорядочены сетки и типографика, переработан главный экран и блок калькулятора. Плагин обмена не трогаем — выводы плагина встроены в новую разметку через хуки и шорткоды. Все стили в одном слое (PHP/CSS/JS), без сборщиков и тяжёлых зависимостей — заказчику легко поддерживать и редактировать. Полная адаптация под мобилку: калькулятор работает в одну руку, кнопки крупные, поля автофокусятся.

**Результат.** Дизайн выкачен на боевой домен `frax.cc`, плагин обмена работает без изменений. Сайт стал визуально соответствовать ожиданиям рынка обменников 2026 года, мобильный трафик получил рабочий UX. Под того же заказчика по аналогичной логике сделан второй обменник — `taksa.cc`.

**Стек:** WordPress, PHP, CSS/JS, сторонний плагин обмена крипты.

## 2.1. Description (~1000 символов)

Редизайн фронтенда криптообменника `frax.cc` без замены WordPress и без переписывания обменного плагина. Задача была обновить визуальный слой, мобильный UX и калькулятор, сохранив всю существующую бизнес-логику.

Плагин уже обрабатывал курсы, направления, лимиты, заявки и партнёрские API, поэтому миграция была бы дорогой и рискованной. Вместо этого были перевёрстаны WordPress-шаблоны, собрана новая визуальная система, приведены в порядок сетки, типографика и главный обменный поток. Выводы плагина встроены в новую разметку через хуки и шорткоды.

Результат выкачен на production: сайт выглядит современнее, мобильный сценарий стал рабочим, а backend остался стабильным и знакомым заказчику.

## 3. Превью (обложка кейса)

Before/After split. Левая половина — старый дизайн `frax.cc` (мутный фон, сжатые блоки, мелкий калькулятор). Правая половина — новый дизайн: яркий hero с курсами обмена, чистый калькулятор «отдаёте / получаете» с кнопкой «Обменять». В центре — тонкая полоса-разделитель с подписью «before / after».

Размеры: hero 1600×900, карточка на витрине 800×600. Превью «before» можно слегка обесцветить, чтобы новый дизайн выглядел контрастно.

## 4. Скрины и видео (12 файлов)

> Везде блюрить: реальные API-ключи в админке WordPress, реальные кошельки в направлениях, реальные суммы клиентских заявок. На курсах — оставлять как есть (это публичные данные сайта).

### Before / After
- [ ] `before-01-home.png` — старый главный экран `frax.cc` (исходник до правок).
- [ ] `before-02-mobile.png` — старая мобильная версия.

### Новый дизайн — десктоп
- [ ] `after-01-hero.png` — новый hero с курсами и кнопкой обмена. **Главный «вау»-скрин.**
- [ ] `after-02-calculator.png` — обновлённый калькулятор «отдаёте / получаете».
- [ ] `after-03-directions.png` — список направлений обмена (BTC/USDT/SBER и т.п.).
- [ ] `after-04-order-form.png` — форма создания заявки.
- [ ] `after-05-reviews.png` — блок отзывов / счётчиков (если есть).
- [ ] `after-06-footer.png` — футер, FAQ / правила обмена.

### Новый дизайн — мобильный
- [ ] `after-07-mobile-hero.png` — hero на iPhone-моке.
- [ ] `after-08-mobile-calc.png` — калькулятор на мобиле, поток заявки одной рукой.

### Техника
- [ ] `code-shortcode-integration.png` — снипет PHP-шаблона, где новая разметка оборачивает шорткод плагина обмена. carbon.now.sh, 12–15 строк.

### Видео
- [ ] `demo-exchange-flow.mp4` — 25–35 сек: листаю главную → выбираю направление → ввожу сумму → создаю заявку (демо-режим). Без монтажа.

### Не снимать (экономия времени)
- Админка WordPress и интерфейс плагина обмена — не «твой» UI, может смутить заказчика.
- Настройки кошельков и партнёрских интеграций — чувствительные данные.
- Аналитика по конверсии — без согласования с заказчиком и цифр на руках не выносим.

---

# EN version

> On the EN site keep neutral framing — frontend redesign on top of an existing WordPress exchange. Blur real wallet addresses, plugin API keys, admin credentials. Public exchange rates can stay as-is. Sister project under the same client: `Taksa redisign`.

## 1. Title

**Primary (108 chars):**
> Frax — crypto exchanger redesign on WordPress: new frontend layered over the existing exchange plugin, no CMS swap

**Short (72 chars, for the grid card):**
> Frax — WordPress crypto exchanger redesign without touching the backend

## 2. Description (~1450 chars)

A frontend redesign of the `frax.cc` crypto exchanger. The entire visual layer was rebuilt while the exchange engine — a specialized WordPress plugin — was left untouched. No data migration, no downtime.

**Problem.** The client had a working but dated exchanger website on WordPress plus a specialized crypto-exchange plugin. The plugin contained all the business logic: rates, directions, limits, order intake, partner APIs. Rewriting it would have meant losing years of integrations and rebuilding from scratch. Meanwhile, the site visually lagged behind competitors, the mobile layout was broken, and the calculator UX was scaring off new users.

**Solution.** A clean frontend redesign on top of the existing backend. WordPress templates were reworked: a new visual system, repaired grid and typography, redesigned hero and calculator. The exchange plugin stayed in place — its output is embedded in the new markup via hooks and shortcodes. All styles live in a single layer (PHP/CSS/JS), no bundlers, no heavy dependencies — easy for the client to maintain and edit. Full mobile pass: one-handed calculator, large tap targets, autofocused fields.

**Result.** The redesign is live on the production domain `frax.cc`; the exchange plugin runs unchanged. The site now matches the visual standard of 2026 exchanger market, and mobile traffic finally has a usable flow. The same client commissioned a second exchanger (`taksa.cc`) on the same approach.

**Stack:** WordPress, PHP, CSS/JS, third-party crypto-exchange plugin.

## 2.1. Description (~1000 chars)

A frontend redesign of the `frax.cc` crypto exchanger without replacing WordPress or rewriting the exchange plugin. The goal was to modernize the visual layer, mobile UX and calculator while preserving the existing business logic.

The plugin already handled rates, directions, limits, orders and partner APIs, so migration would have been expensive and risky. Instead, WordPress templates were rebuilt, a new visual system was introduced, grids, typography and the core exchange flow were cleaned up. Plugin output was embedded into the new markup through hooks and shortcodes.

The redesign is live in production: the site feels current, the mobile flow is usable, and the backend stayed stable and familiar for the client.

## 3. Cover preview

Before/After split. Left — the old `frax.cc` design (muddy background, cramped blocks, tiny calculator). Right — the new design: bright hero with live rates, clean "you give / you get" calculator and an "Exchange" CTA. A thin divider down the middle labeled "before / after".

Sizes: hero 1600×900, grid card 800×600. The "before" half can be desaturated to make the new design feel more contrasted.

## 4. Screenshots and videos (12 files)

> Blur on every shot: real WordPress admin API keys, real wallet addresses in directions, real customer order amounts. Public exchange rates can stay as they appear on the live site.

### Before / After
- [ ] `before-01-home.png` — old `frax.cc` home (original, pre-redesign).
- [ ] `before-02-mobile.png` — old mobile layout.

### New design — desktop
- [ ] `after-01-hero.png` — new hero with rates and exchange CTA. **Hero shot.**
- [ ] `after-02-calculator.png` — redesigned "you give / you get" calculator.
- [ ] `after-03-directions.png` — list of exchange directions (BTC/USDT/SBER, etc.).
- [ ] `after-04-order-form.png` — order creation form.
- [ ] `after-05-reviews.png` — reviews / counters block (if present).
- [ ] `after-06-footer.png` — footer, FAQ / exchange rules.

### New design — mobile
- [ ] `after-07-mobile-hero.png` — hero in an iPhone mockup.
- [ ] `after-08-mobile-calc.png` — calculator on mobile, one-handed order flow.

### Engineering
- [ ] `code-shortcode-integration.png` — PHP template snippet where the new markup wraps the exchange plugin shortcode. carbon.now.sh, 12–15 lines.

### Video
- [ ] `demo-exchange-flow.mp4` — 25–35 sec: scroll the home page → pick a direction → enter an amount → create a (demo) order. No edits.

### Do NOT shoot (time-saver)
- WordPress admin and the exchange plugin's own UI — it's not "your" UI and may worry the client.
- Wallet and partner integration settings — sensitive data.
- Conversion analytics — don't publish without client sign-off and hard numbers in hand.
