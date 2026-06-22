# План поэтапного редизайна без видео

Цель: довести главную страницу до более дорогого, кинематографичного и профессионального уровня, адаптируя сильные приемы Produx, но без видео на первом релизе. Видео добавим позже отдельным этапом, когда будет готов исходник.

Главный принцип: сайт должен остаться про production engineering, Telegram, AI, backend, платежи, данные и запуск систем. Мы берем у референса режиссуру, масштаб, ритм, hover и editorial-подачу кейсов, но не копируем бренд-агентство 1 в 1.

## Вводные решения

- Видео пока не используем.
- Вместо видео делаем статичный/анимированный `reel poster`: мозаика из реальных скриншотов проектов + system map.
- Ассеты выбирает Codex из `public/cases`, `img` и описаний проектов в `ready/*.md`.
- Если существующая обложка выглядит слабой, можно сгенерировать новую на основе описания проекта и очищенных скринов.
- Hero должен быть готов к будущему видео: компонент проектируется так, чтобы позже заменить poster на video без переписывания всей секции.
- Основной визуальный asset для первого релиза: `system map`, собранная под реальные проекты.

## Концепция system map

Рабочее название: `Production Circuit`.

Это не абстрактный терминал и не декоративная схема. Это визуальная карта того, что ты реально собираешь:

- `Client request` -> `Scope / Architecture`
- `Telegram Bot / Mini App`
- `Backend API`
- `AI module / Parser / Trading logic`
- `PostgreSQL / Redis`
- `Payments / Crypto / External APIs`
- `Admin panel / Logs`
- `Deploy / Monitoring / Support`

Визуально: темная карта с узлами, тонкими линиями, маленькими превью кейсов и короткими лейблами. Она должна ощущаться как production-контур, а не как фейковый sci-fi dashboard.

Лучшее место применения:

- hero background/right visual;
- переход между hero и кейсами;
- proof-блок рядом с услугами;
- финальный CTA как спокойный фон.

## Этап 00 - Asset audit и выбор направления

### Цель

Выбрать лучшие существующие материалы перед правками дизайна, чтобы не строить новый визуал вокруг слабых изображений.

### Источники

- `ready/*.md` - описание проектов.
- `public/cases/*` - текущие обложки и скрины для сайта.
- `img/*` - исходные обложки и очищенные скрины.
- `src/data/case-images.ts` - привязка ассетов.
- `src/data/site.ru.ts` и `src/data/site.en.ts` - порядок и тексты кейсов.

### Что сделать

- Выбрать 4-6 главных проектов для главной.
- Для каждого проекта определить лучший asset:
  - `hero/showcase cover`;
  - `square preview`;
  - `supporting screenshot`;
  - `needs regeneration: yes/no`.
- Отдельно выбрать 6-10 маленьких фрагментов для hero-мозаики.
- Составить таблицу asset-решений в `docs/produx-level-redesign/wave-08-asset-audit.md` или обновить существующую.

### Предпочтительный shortlist кейсов

- `sapsanex-mini-app` - сильный Mini App / interface proof.
- `subscription-bot` или `vpn-bot` - Telegram + payments/subscription logic.
- `seedream-tryon` - AI/image workflow.
- `ai-reply-assistant` или `chat-help-bot` - AI support / assistant.
- `bybit-trading-bot` - crypto/trading automation.
- `skillup` или `tech-rise-academy` - education/product workflow.

### Критерий готовности

- Понятно, какие изображения идут в hero, cases и proof.
- Понятно, какие ассеты нужно оставить, заменить или сгенерировать.
- Код сайта еще не менялся.

### Как запустить этап

Скажи: `Выполни этап 00: asset audit для редизайна без видео`.

## Этап 01 - Visual foundation

### Цель

Подготовить визуальную систему под premium editorial engineering: меньше dashboard-шумов, больше воздуха, сильнее типографика, спокойнее фон.

### Файлы

- `src/app/globals.css`
- `src/components/sections/site-header.tsx`
- `src/components/ui/button-link.tsx`
- при необходимости `src/components/reveal.tsx`

### Что сделать

- Уменьшить количество свечений и декоративных сеток.
- Сохранить темную базу, но сделать ее чище и глубже.
- Привести кнопки и chips к более строгому виду.
- Убрать ощущение “много маленьких панелей” там, где нужен editorial-ритм.
- Подготовить CSS-токены для:
  - hover focus/dim;
  - glitch slices;
  - large editorial typography;
  - system map nodes.
- Проверить, что mobile не получает тяжелые blur/backdrop эффекты.

### Критерий готовности

- Страница визуально спокойнее еще до перестройки секций.
- Header, кнопки и базовые карточки выглядят более цельно.
- Нет поломок layout на `/ru` и `/en`.

### Проверка

- `npm run lint`
- `npm run build`
- ручной просмотр `/ru` и `/en`

### Как запустить этап

Скажи: `Выполни этап 01: visual foundation`.

## Этап 02 - Cinematic hero без видео

### Цель

Пересобрать первый экран так, чтобы он давал сильное первое впечатление без видео.

### Файлы

- `src/components/sections/hero.tsx`
- `src/components/interactive/hero-headline.tsx`
- новый компонент, например `src/components/interactive/production-circuit.tsx`
- возможно `src/components/interactive/engineering-scene.tsx`
- `src/app/globals.css`

### Что сделать

- Упростить hero: один главный тезис, один supporting paragraph, два CTA максимум.
- Уменьшить роль stack chips и мелких telemetry-панелей на первом экране.
- Добавить `Production Circuit`:
  - узлы production-контура;
  - 4-6 фрагментов реальных кейсов;
  - мягкая scroll/entrance анимация;
  - без autoplay video.
- Сделать hero готовым к будущему видео:
  - `poster`/`visual` сейчас;
  - место под `videoSrc` позже;
  - fullscreen modal не нужен на этом этапе.
- Сохранить WebGL только если он усиливает сцену и не конфликтует с system map.

### Визуальный результат

Первый экран должен читаться так:

> Я собираю production-системы под ключ: Telegram, AI, backend, платежи, данные и деплой.

А не так:

> Смотри, сколько здесь интерфейсных деталей.

### Критерий готовности

- Hero выглядит сильным даже без скролла.
- На mobile заголовок не разваливается и не перекрывает visual.
- Первый экран не требует видео, чтобы выглядеть законченным.

### Проверка

- `npm run lint`
- `npm run build`
- desktop: 1440px первый экран
- mobile: 390px первый экран

### Как запустить этап

Скажи: `Выполни этап 02: cinematic hero без видео`.

## Этап 03 - Hero scroll transition и мозаика

### Цель

Адаптировать прием Produx со сборкой первого кадра из квадратов, но сделать это под твои проекты и без видео.

### Файлы

- `src/components/sections/hero.tsx`
- новый компонент, например `src/components/interactive/case-mosaic.tsx`
- `src/lib/motion.ts`
- `src/app/globals.css`

### Что сделать

- Собрать мозаичный poster из фрагментов существующих кейсов.
- На скролле:
  - крупный hero-текст слегка уменьшается/уходит выше;
  - мозаика собирается из отдельных квадратов;
  - system map становится более читаемой;
  - ниже появляется переход к кейсам.
- Не делать scroll-jacking: пользователь должен свободно скроллить дальше.
- На mobile заменить сложную сборку на простое появление poster/system map.

### Критерий готовности

- Есть вау-момент при первом скролле.
- Нет ощущения, что сайт заставляет смотреть анимацию.
- `prefers-reduced-motion` получает статичную версию.

### Проверка

- `npm run lint`
- `npm run build`
- ручной скролл hero -> следующая секция
- проверка mobile scroll

### Как запустить этап

Скажи: `Выполни этап 03: hero scroll transition и мозаика`.

## Этап 04 - Selected projects как главная proof-секция

### Цель

Сделать кейсы центральной частью сайта: не сеткой карточек, а дорогой асимметричной витриной.

### Файлы

- `src/components/sections/cases.tsx`
- `src/components/sections/cases-showcase.tsx`
- `src/data/site.ru.ts`
- `src/data/site.en.ts`
- `src/data/case-images.ts`
- `src/app/globals.css`

### Что сделать

- Пересобрать layout кейсов:
  - 1 крупный flagship-кейс;
  - далее асимметричные пары примерно по 2 проекта на экран;
  - меньше карточной оболочки, больше изображения.
- Для каждого кейса оставить:
  - номер;
  - название;
  - тип проекта;
  - короткий outcome;
  - 2-3 тега;
  - CTA к деталям.
- Добавить hover focus:
  - активный проект ярче;
  - соседние элементы темнее, чуть blur/saturate down;
  - переходы плавные.
- Подготовить место для сгенерированных cover assets, если на этапе 00 какие-то изображения признаны слабыми.

### Критерий готовности

- Кейсы выглядят как proof, а не как каталог.
- За 10 секунд понятно, какие задачи ты уже делал.
- Hover добавляет фокус, но не мешает клику.

### Проверка

- `npm run lint`
- `npm run build`
- `/ru#cases`
- `/en#cases`
- mobile cases

### Как запустить этап

Скажи: `Выполни этап 04: selected projects showcase`.

## Этап 05 - Digital hover/glitch для кейсов

### Цель

Добавить дорогой интерактивный эффект на hover, но дозированно.

### Файлы

- `src/components/sections/cases-showcase.tsx`
- возможно новый компонент `src/components/effects/glitch-media.tsx`
- `src/app/globals.css`

### Что сделать

- Реализовать короткий glitch на изображениях кейсов:
  - 300-500 мс;
  - горизонтальные slices;
  - легкий chromatic shift;
  - краткий blur/scan;
  - без постоянной анимации в idle.
- Добавить состояние `case-showcase:hover`.
- Сделать graceful fallback:
  - no effect для `prefers-reduced-motion`;
  - упрощенный эффект на touch/mobile;
  - без canvas, если CSS достаточно.

### Критерий готовности

- Эффект заметен, но не выглядит как ошибка загрузки.
- Не падает performance.
- Активный кейс всегда остается читаемым.

### Проверка

- `npm run lint`
- `npm run build`
- hover на desktop
- touch/mobile без дерганья

### Как запустить этап

Скажи: `Выполни этап 05: digital hover/glitch для кейсов`.

## Этап 06 - Services и proof rhythm

### Цель

Убрать ощущение длинной ленты одинаковых карточек после hero и кейсов.

### Файлы

- `src/components/sections/specialization.tsx`
- `src/components/sections/trust.tsx`
- `src/components/sections/process.tsx`
- `src/components/sections/services.tsx`
- `src/app/[lang]/page.tsx`
- `src/app/globals.css`

### Что сделать

- Поднять кейсы выше, если они еще не стали ранней proof-секцией.
- `Specialization` сделать компактнее:
  - 4 основных направления вместо перегруженной ленты;
  - больше outcome, меньше длинных описаний.
- `Trust` превратить в production proof strip:
  - payments;
  - admin panels;
  - AI modules;
  - parsers;
  - deploy;
  - support.
- `Process` оставить ниже: короткий delivery-flow, без лишнего dashboard-шума.
- `Services` оставить как бюджетный ориентир, но не давать ему конкурировать с конфигуратором.

### Критерий готовности

- После hero страница не проседает по энергии.
- Каждая секция отвечает за одну мысль.
- Меньше повторяющихся карточек и одинаковых заголовков.

### Проверка

- `npm run lint`
- `npm run build`
- полный ручной скролл главной
- mobile scroll density

### Как запустить этап

Скажи: `Выполни этап 06: services и proof rhythm`.

## Этап 07 - Configurator как premium tool

### Цель

Сохранить конверсию и функциональность конфигуратора, но визуально сделать его легче и дороже.

### Файлы

- `src/components/sections/project-configurator.tsx`
- `src/components/interactive/project-estimator.tsx`
- `src/app/globals.css`
- `src/lib/lead-message.ts`
- `src/app/api/project-leads/route.ts` только если проверка выявит проблему

### Что сделать

- Не ломать бизнес-логику расчета.
- Упростить визуальную оболочку:
  - меньше вложенных карточек;
  - понятнее шаги;
  - спокойнее активные состояния;
  - аккуратнее summary.
- Связать кейсы с конфигуратором:
  - CTA `Хочу похожий проект`;
  - query params должны продолжать работать.
- Сделать конфигуратор похожим на рабочий инструмент, а не на тяжелую форму.

### Критерий готовности

- Отправка заявки работает.
- Preset из кейсов работает.
- Пользователь понимает следующий шаг без чтения длинных инструкций.

### Проверка

- `npm run lint`
- `npm run build`
- ручная проверка query params из кейса
- ручная проверка submit/fallback Telegram

### Как запустить этап

Скажи: `Выполни этап 07: configurator premium tool`.

## Этап 08 - Final CTA и footer

### Цель

Сделать финал страницы сильной последней сценой, а не просто карточкой контактов.

### Файлы

- `src/components/sections/final-cta.tsx`
- `src/app/globals.css`
- возможно `src/data/site.ru.ts` и `src/data/site.en.ts`

### Что сделать

- Пересобрать CTA как широкую editorial-секцию.
- Использовать крупный текст и спокойный system-map фон.
- Оставить два действия:
  - собрать scope;
  - написать в Telegram.
- Контакты оставить, но сделать их вторичными.
- Footer привести к минимальному виду.

### Критерий готовности

- Финальный экран выглядит как уверенное завершение.
- CTA заметен, но не кричит.
- Mobile не превращается в длинную контактную карточку.

### Проверка

- `npm run lint`
- `npm run build`
- `/ru#contact`
- mobile final CTA

### Как запустить этап

Скажи: `Выполни этап 08: final CTA`.

## Этап 09 - Asset generation pass

### Цель

Усилить визуалы там, где реальные скрины или обложки недостаточно сильны.

### Когда делать

Только после этапов 00 и 04, когда понятно, какие изображения реально проседают.

### Что можно генерировать

- Новые case covers на основе описания из `ready/*.md`.
- Стилизованные mockup-композиции из очищенных скринов.
- Фоновые fragments для hero-мозаики.
- Один `Production Circuit` poster, если CSS/HTML-версия выглядит слабее ожидаемого.

### Что не генерировать

- Фейковые интерфейсы, которые противоречат реальному проекту.
- Слишком абстрактные stock-like картинки.
- Изображения с несуществующими брендами/логотипами.

### Критерий готовности

- Главные 4-6 кейсов имеют сильные covers.
- Визуалы выглядят как одна система.
- Новые изображения оптимизированы и подключены через существующий пайплайн.

### Проверка

- `npm run optimize:case-images`, если добавлялись исходники
- `npm run sync:case-images`
- `npm run lint`
- `npm run build`

### Как запустить этап

Скажи: `Выполни этап 09: asset generation pass`.

## Этап 10 - Production QA перед выкладкой

### Цель

Проверить сайт как релиз без видео.

### Что проверить

- `/ru`
- `/en`
- `/ru/cases`
- `/en/cases`
- все якоря header;
- кейс -> конфигуратор;
- отправка заявки;
- Telegram/mail/github ссылки;
- mobile 390px;
- tablet 768px;
- desktop 1440px;
- `prefers-reduced-motion`;
- отсутствие тяжелых idle-анимаций.

### Команды

```bash
npm run lint
npm run build
```

Если добавлялись/менялись изображения:

```bash
npm run sync:case-images
npm run optimize:case-images
npm run build
```

### Критерий готовности

- Build проходит.
- На mobile нет горизонтального скролла.
- Первый экран, кейсы, конфигуратор и final CTA выглядят цельно.
- Сайт готов к выкладке без видео.

### Как запустить этап

Скажи: `Выполни этап 10: production QA перед выкладкой`.

## Будущий этап - Добавление видео

Этот этап не входит в текущий релиз.

Когда видео будет готово, нужно будет:

- добавить `webm` и `mp4`;
- добавить poster fallback;
- заменить hero/reel poster на video layer;
- добавить fullscreen modal по клику;
- сохранить возможность просто скроллить ниже;
- проверить mobile и reduced motion.

### Как запустить будущий этап

Скажи: `Добавь видео в hero/reel, исходники лежат в ...`.

## Рекомендуемый порядок запуска

1. Этап 00 - asset audit.
2. Этап 01 - visual foundation.
3. Этап 02 - cinematic hero без видео.
4. Этап 03 - scroll transition и мозаика.
5. Этап 04 - selected projects.
6. Этап 05 - glitch hover.
7. Этап 06 - services/proof rhythm.
8. Этап 07 - configurator.
9. Этап 08 - final CTA.
10. Этап 09 - asset generation, только если нужен.
11. Этап 10 - production QA.

## Как ставить задачи Codex

Лучший формат:

```text
Выполни этап 02 из docs/produx-level-redesign/no-video-implementation-plan.md.
Код меняй, видео не добавляй. После правок проверь lint/build.
```

Если хочешь ограничить риск:

```text
Выполни только дизайн и верстку этапа 04. Данные кейсов и тексты не меняй.
```

Если хочешь сначала увидеть план перед кодом:

```text
Разбери этап 06 и предложи точный список правок, но код пока не меняй.
```
