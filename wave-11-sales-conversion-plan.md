# Wave 11 - Sales conversion and lead path

Дата: 2026-06-22.

Статус: подробный план перед реализацией. Цель этой волны - сделать сайт более продающим и снизить барьер до заявки без разрушения текущей визуальной системы.

## Главная идея

Сейчас основной вход в заявку - конфигуратор. Для части посетителей это слишком высокий порог: нужно дойти до секции, понять механику, пройти несколько блоков и оставить Telegram. Новый сценарий должен работать иначе:

1. Быстрая заявка доступна сразу: первый экран, мобильная sticky-кнопка, финальный блок.
2. Конфигуратор остается, но становится опцией "посчитать точнее", а не обязательным путем.
3. Первый экран за 5 секунд отвечает: что делаю, для кого, какой бизнес-результат.
4. Telegram остается важным каналом, но не единственным.

## Текущая ситуация в коде

Основные файлы:

- `src/app/[lang]/page.tsx` - порядок секций главной страницы.
- `src/components/sections/hero.tsx` - первый экран и основные CTA.
- `src/components/sections/cases.tsx` - CTA после кейсов.
- `src/components/sections/project-configurator.tsx` - секция конфигуратора.
- `src/components/interactive/project-estimator.tsx` - интерактивная форма конфигуратора и отправка заявки.
- `src/components/sections/final-cta.tsx` - финальный CTA и контакты.
- `src/components/sections/site-header.tsx` - кнопка контакта в шапке.
- `src/data/site.ru.ts` - каноническая структура данных и русский текст.
- `src/data/site.en.ts` - английская версия, должна структурно совпадать с русской.
- `src/app/api/project-leads/route.ts` - API приема заявки.
- `src/lib/database.ts` - хранение заявок.
- `src/lib/lead-message.ts` - формат сообщения в Telegram.
- `src/app/admin/page.tsx` - отображение заявок в админке.

Что сейчас ограничивает конверсию:

- `hero.primaryCta` ведет в `#estimator`, то есть сразу в многошаговый сценарий.
- Header CTA ведет напрямую в Telegram, а не в простую форму.
- Final CTA предлагает "собрать заявку" через конфигуратор или написать в Telegram.
- `ProjectEstimator` требует `contact.telegram` и `comment`.
- `/api/project-leads` валидирует наличие Telegram.
- В базе `contact_telegram TEXT NOT NULL`, поэтому альтернативный контакт нельзя нормально сохранить.
- В сообщении лида контакт подписан как Telegram.

## Целевая воронка

### Быстрый путь

Посетитель видит первый экран, понимает предложение и может оставить заявку за 15-30 секунд:

- имя, опционально;
- контакт: Telegram / WhatsApp / телефон / email в одном поле;
- коротко "что нужно сделать".

После отправки:

- заявка сохраняется в базу, если `DATABASE_URL` настроен;
- сообщение уходит в Telegram владельцу сайта;
- пользователь видит понятный success-state;
- рядом остаются прямые каналы связи.

### Точный путь

Посетитель, которому нужна оценка бюджета, идет в конфигуратор:

- выбирает тип проекта;
- видит предварительную вилку;
- может раскрыть модули;
- оставляет любой контакт, не только Telegram;
- на каждом этапе видит fallback "или просто напишите мне".

### Прямой путь

Посетитель может сразу перейти в:

- Telegram;
- WhatsApp;
- телефон;
- email.

Это важно для заказчиков, которые не хотят писать в Telegram или открывают сайт с рабочего устройства.

## Этап 1 - Расширить контактную модель

Цель: убрать жесткую зависимость от Telegram и подготовить один контракт заявки для быстрой формы и конфигуратора.

### Изменения в данных

Файл: `src/data/site.ru.ts`.

В `contacts` добавить:

- `whatsapp`: человекочитаемый номер или подпись;
- `whatsappUrl`: ссылка вида `https://wa.me/...`;
- при необходимости `phoneLabel`, если хочется отделить отображение от `phone`.

Пример целевой структуры:

```ts
export const contacts = {
  email: "kaneevramil7@gmail.com",
  telegram: "@McHomak15",
  telegramUrl: "https://t.me/McHomak15",
  whatsapp: "+79269549196",
  whatsappUrl: "https://wa.me/79269549196",
  phone: "+79269549196",
  phoneHref: "+79269549196",
  github: "github.com/mchomak",
  githubUrl: "https://github.com/mchomak",
};
```

Файл: `src/data/site.en.ts`.

Так как английская версия импортирует `contacts` из русской, отдельное дублирование контактов не нужно.

### Изменения в API payload

Файл: `src/app/api/project-leads/route.ts`.

Сейчас:

```ts
contact?: {
  name?: unknown;
  telegram?: unknown;
  email?: unknown;
};
```

Целевой вариант:

```ts
contact?: {
  name?: unknown;
  channel?: unknown;
  value?: unknown;
  telegram?: unknown;
  email?: unknown;
  phone?: unknown;
  whatsapp?: unknown;
};
```

Правило совместимости:

- старый `telegram` продолжать принимать;
- новый `value` считать основным контактом;
- если `value` пустой, брать `telegram`, `phone`, `whatsapp`, `email` по порядку;
- заявка валидна, если есть `contactValue` и `comment`.

### Изменения в базе

Файл: `src/lib/database.ts`.

Расширить типы:

- `contactChannel: string`;
- `contactValue: string`;
- `contactTelegram?: string`;
- `contactEmail?: string`.

В `ensureSchema` добавить безопасные `ALTER TABLE`:

```sql
ALTER TABLE project_leads ADD COLUMN IF NOT EXISTS contact_channel TEXT;
ALTER TABLE project_leads ADD COLUMN IF NOT EXISTS contact_value TEXT;
```

Для существующей схемы с `contact_telegram TEXT NOT NULL` есть два варианта.

Рекомендуемый вариант:

- оставить `contact_telegram`, чтобы не ломать старые строки;
- при вставке всегда писать в `contact_telegram` значение контакта, если отдельный Telegram не указан;
- параллельно писать нормальные `contact_channel` и `contact_value`.

Это минимальный риск: не нужно делать миграцию `DROP NOT NULL` на проде.

Более чистый вариант:

```sql
ALTER TABLE project_leads ALTER COLUMN contact_telegram DROP NOT NULL;
```

Его можно сделать позже отдельным техническим проходом.

### Изменения в сообщении лида

Файл: `src/lib/lead-message.ts`.

Сейчас сообщение пишет:

```text
Контакт: <telegram>
```

Нужно:

```text
Канал: WhatsApp
Контакт: +7926...
Telegram: @username // только если указан отдельно
Email: ... // только если указан
```

Для быстрой формы в сообщении должны быть видны:

- источник: "Быстрая форма в hero" / "Финальная форма" / "Конфигуратор";
- имя;
- канал;
- контакт;
- задача;
- если есть оценка из конфигуратора - бюджет и сроки.

### Изменения в админке

Файл: `src/app/admin/page.tsx`.

В карточке заявки показывать:

- `Контакт: <contactValue>`;
- `Канал: <contactChannel>`, если есть;
- `Telegram: ...`, если есть и отличается от общего контакта;
- `Email: ...`, если есть.

### Критерии приемки

- API принимает заявку без Telegram, если есть телефон/email/WhatsApp.
- Старый payload конфигуратора с `contact.telegram` продолжает работать.
- Новые заявки сохраняют общий контакт и канал.
- Telegram-уведомление владельцу содержит понятный контакт.
- Админка не ломается на старых строках базы.

## Этап 2 - Добавить быструю форму заявки

Цель: получить reusable-компонент для hero и final CTA.

### Новый компонент

Файл: `src/components/interactive/quick-lead-form.tsx`.

Компонент клиентский: `"use client"`.

Поля:

- `name` - опционально;
- `contactValue` - обязательно;
- `comment` - обязательно.

Дополнительно:

- сегментированный выбор канала: Telegram / WhatsApp / Phone / Email;
- placeholder меняется от канала;
- скрытый/проп `source`, чтобы понимать, откуда пришла заявка.

Пропсы:

```ts
type QuickLeadFormProps = {
  contacts: SiteData["contacts"];
  copy: SiteData["ui"]["quickLead"];
  source: "hero" | "final" | "sticky" | "inline";
  compact?: boolean;
};
```

Payload в `/api/project-leads`:

```ts
{
  category: "Быстрая заявка",
  complexity: "не указана",
  urgency: "обсудить",
  options: [],
  estimate: {
    budget: "после обсуждения",
    timeline: "после обсуждения"
  },
  sourceCase: "",
  source: "hero",
  contact: {
    name,
    channel,
    value,
    telegram,
    email
  },
  comment,
  fileUrl: ""
}
```

Важно: лучше не создавать отдельный API для быстрой формы, а использовать существующий `/api/project-leads`, чтобы не плодить две логики доставки.

### Copy в данных

Файл: `src/data/site.ru.ts`.

Добавить в `ui` новый объект `quickLead`.

Пример:

```ts
quickLead: {
  title: "Коротко опишите задачу",
  description: "Ответ пришлю в удобный для вас канал.",
  name: "Имя",
  namePlaceholder: "Как к вам обращаться",
  channel: "Канал связи",
  channels: {
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    phone: "Телефон",
    email: "Email",
  },
  contact: "Куда написать",
  contactPlaceholder: {
    telegram: "@username",
    whatsapp: "+7...",
    phone: "+7...",
    email: "name@company.com",
  },
  comment: "Что нужно сделать",
  commentPlaceholder: "Например: нужен Telegram-бот с оплатой и админкой для заявок.",
  submit: "Обсудить проект",
  sending: "Отправляю",
  success: "Заявка отправлена. Вернусь с уточняющими вопросами.",
  validationError: "Оставьте контакт и коротко опишите задачу.",
  fallbackTitle: "Можно написать напрямую:",
}
```

Файл: `src/data/site.en.ts`.

Добавить такой же объект на английском. Структура должна совпадать с русской.

### UI-детали

- Использовать существующие `field-control`, `btn-link`, цветовые токены.
- Не делать форму как тяжелую вложенную карточку внутри карточки.
- На desktop форма может быть компактным блоком в hero рядом с текстом.
- На mobile форма должна быть видна до длинного visual или сразу после первого CTA.
- Кнопка submit должна иметь состояние `sending`, `success`, `error`.
- После ошибки показывать прямые ссылки Telegram / WhatsApp / Email.

### Критерии приемки

- Форма отправляет заявку.
- Нельзя отправить пустой контакт или пустую задачу.
- Имя можно не заполнять.
- Success/error состояния понятны.
- Компонент переиспользуется в hero и final CTA без дублирования логики.
- На 390px поля не вылезают за экран.

## Этап 3 - Переписать первый экран под результат

Цель: убрать "флекс для своих" на входе и дать понятное обещание для заказчика.

### Изменения в copy

Файлы:

- `src/data/site.ru.ts`;
- `src/data/site.en.ts`.

Текущий русский hero:

```ts
badge: "Telegram / AI / Backend / автоматизация",
headline: ["Telegram, AI и Backend", "под ключ"],
description: "Собираю Telegram-ботов..."
primaryCta: "Рассчитать проект"
secondaryCta: "Смотреть кейсы"
```

Предлагаемый русский hero:

```ts
badge: "Для бизнеса, экспертов и команд с ручной рутиной",
headline: ["Telegram-боты и сервисы", "для заявок и оплат"],
description:
  "Делаю под ключ ботов, Mini Apps, backend, AI-модули, админки и платежи - от идеи до запуска на сервере.",
primaryCta: "Обсудить проект",
secondaryCta: "Посчитать точнее",
trustBar: [
  "малый бизнес и эксперты",
  "Telegram / Mini Apps",
  "платежи и заявки",
  "запуск под ключ",
],
bottomNote: "Ниже - реальные проекты",
```

Альтернативный H1, если хочется более прямой продажи:

```ts
headline: ["Telegram-боты и сервисы,", "которые приносят заявки"]
```

Для английской версии:

```ts
badge: "For small businesses, experts and product teams",
headline: ["Telegram bots and services", "for leads and payments"],
description:
  "I build bots, Mini Apps, backend systems, AI modules, admin panels and payments - from idea to production launch.",
primaryCta: "Discuss a project",
secondaryCta: "Get a tighter estimate",
```

### Изменения в hero layout

Файл: `src/components/sections/hero.tsx`.

Сейчас CTA:

- primary: `#estimator`;
- secondary: `#cases`.

Нужно:

- primary: `#quick-lead` или `#contact`, если форма в hero получает id;
- secondary: `#estimator`;
- cases оставить через нижний `hero-next-proof`.

В hero добавить `QuickLeadForm`.

Вариант компоновки:

- слева: badge, H1, description, CTAs, quick form;
- справа: `ProductionCircuit`;
- на mobile: текст, CTAs, quick form, visual.

Чтобы форма не перегрузила первый экран:

- compact-режим формы;
- textarea на 2-3 строки;
- direct links под формой в одну строку/сетку.

### Якоря

Рекомендуемый id для формы:

- `id="quick-lead"` на обертке формы в hero.

Sticky CTA и header могут вести туда.

### Критерии приемки

- В первом viewport понятно, что делается и для кого.
- Primary CTA не ведет в конфигуратор.
- Конфигуратор доступен как "посчитать точнее".
- Быстрая форма доступна без длинного скролла.
- Hero не превращается в перегруженную форму: визуальная сцена остается, но продающее сообщение главнее.

## Этап 4 - Добавить мобильный sticky CTA

Цель: на мобильном пользователь всегда имеет простой путь к контакту.

### Новый компонент

Файл: `src/components/sections/mobile-contact-bar.tsx`.

Поведение:

- показывать только на mobile/tablet, например до `lg`;
- fixed bottom;
- z-index ниже модалок, выше контента;
- кнопка "Обсудить проект" ведет к `#quick-lead`;
- рядом маленькие icon-buttons: Telegram, WhatsApp.

Пример структуры:

```tsx
<div className="mobile-contact-bar">
  <a href="#quick-lead">Обсудить проект</a>
  <a href={contacts.telegramUrl}>Telegram</a>
  <a href={contacts.whatsappUrl}>WhatsApp</a>
</div>
```

Подключить в `src/app/[lang]/page.tsx` рядом с `ScrollOrb`/`SiteHeader`.

### Данные

Файлы:

- `src/data/site.ru.ts`;
- `src/data/site.en.ts`.

Добавить `ui.stickyCta`:

```ts
stickyCta: {
  discuss: "Обсудить проект",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
}
```

### CSS

Файл: `src/app/globals.css`.

Добавить:

- `.mobile-contact-bar`;
- mobile-only media;
- safe-area support: `padding-bottom: env(safe-area-inset-bottom)`;
- дополнительный нижний padding для `body` или `main` на mobile, если bar перекрывает footer/form submit.

### Критерии приемки

- На desktop sticky CTA не виден.
- На mobile 390px CTA не перекрывает важные кнопки и поля.
- Кнопки не вылезают по ширине.
- Telegram/WhatsApp открываются в новом окне.
- Основная кнопка скроллит к быстрой форме.

## Этап 5 - Финальный CTA с короткой формой

Цель: в конце страницы снова дать простой вход в заявку, не отправляя человека обратно в многошаговый конфигуратор.

### Изменения в компоненте

Файл: `src/components/sections/final-cta.tsx`.

Сейчас:

- слева текст;
- справа две кнопки: конфигуратор и Telegram;
- ниже контакты.

Нужно:

- слева сильный финальный текст;
- справа `QuickLeadForm` с `source="final"`;
- под формой direct contact row: Telegram / WhatsApp / phone / email;
- кнопка на конфигуратор становится вторичной ссылкой "Посчитать точнее".

### Copy

Файлы:

- `src/data/site.ru.ts`;
- `src/data/site.en.ts`.

Русский вариант:

```ts
finalCta: {
  eyebrow: "Следующий шаг",
  title: "Расскажите, что нужно автоматизировать или запустить.",
  description:
    "Можно оставить короткое описание без ТЗ. Я вернусь с вопросами, предложу первый объем работ, сроки и вилку бюджета.",
  estimateCta: "Посчитать точнее",
  telegramCta: "Написать в Telegram",
  footer: "Telegram-боты, Mini Apps, AI-интеграции, backend и запуск под ключ.",
}
```

### CSS

Файл: `src/app/globals.css`.

Изменить `.final-cta-layout`:

- правая колонка должна выдерживать форму;
- не вкладывать форму в декоративную карточку, если весь final CTA уже имеет фон/рамки;
- на mobile форма идет под текстом;
- контакты не конкурируют с submit.

### Критерии приемки

- В финале можно отправить заявку без перехода в конфигуратор.
- Прямые каналы видны.
- Конфигуратор обозначен как дополнительный расчет.
- На mobile финал не становится слишком длинной контактной карточкой.

## Этап 6 - Понизить конфигуратор до опции "посчитать точнее"

Цель: сохранить расчет бюджета, но снизить психологический вес формы.

### Изменения copy

Файлы:

- `src/data/site.ru.ts`;
- `src/data/site.en.ts`.

Текущий смысл:

- "Конфигуратор заявки";
- "Соберите конфигурацию проекта".

Новый смысл:

```ts
configurator: {
  eyebrow: "Точный расчет",
  title: "Если хотите точнее - соберите параметры проекта",
  description:
    "Это не обязательный шаг. Можно выбрать тип решения и получить ориентир по бюджету, а модули раскрыть только при необходимости.",
}
```

В `ui.estimator`:

- `leadTitle`: "Можно посчитать точнее или просто написать";
- `leadDescription`: "Выберите тип проекта, если хотите вилку бюджета. Если вводных мало, оставьте короткую заявку выше или напишите напрямую.";
- `telegramFallback`: заменить на более общий `directFallback`: "Или просто напишите мне";
- `fields.telegram`: заменить на `fields.contact`;
- `validationError`: "Оставьте контакт и коротко опишите задачу.";

Так как русская структура каноническая, добавление новых ключей сначала делать в `site.ru.ts`, потом синхронно в `site.en.ts`.

### Изменения формы

Файл: `src/components/interactive/project-estimator.tsx`.

Сейчас state:

```ts
const [contact, setContact] = useState({
  name: "",
  telegram: "",
  email: "",
  comment: "",
  fileUrl: "",
});
```

Целевой state:

```ts
const [contact, setContact] = useState({
  name: "",
  channel: "telegram",
  value: "",
  telegram: "",
  email: "",
  comment: "",
  fileUrl: "",
});
```

Упрощенный вариант с меньшим diff:

- переименовать поле UI в "Куда написать";
- оставить внутреннее поле `telegram`, но принимать туда любой контакт;
- в payload дополнительно отправлять `contact.value = contact.telegram`.

Это быстрее и безопаснее для первого прохода. Полную чистку названий можно сделать позже.

### Fallback на каждом шаге

В `ConfigBlock` добавить необязательный проп:

```ts
fallbackHref?: string;
fallbackLabel?: string;
```

И выводить компактную ссылку:

```tsx
<a href={data.contacts.telegramUrl}>или просто напишите мне</a>
```

Лучше не только Telegram:

- основной fallback href может быть `#quick-lead`;
- рядом в summary direct links.

Рекомендуемое решение:

- в каждом `ConfigBlock` ссылка "или оставьте короткую заявку" -> `#quick-lead`;
- в summary links: Telegram / WhatsApp.

### Снижение числа обязательных шагов

Фактически сейчас обязательны:

- тип проекта выбран по умолчанию;
- сложность и сроки выбраны по умолчанию;
- модули имеют defaults;
- обязательны Telegram и comment.

Значит технически форма уже не требует ручного прохождения всех шагов. Нужно визуально показать это:

- step rail можно сократить до 3 пунктов: "Тип", "Оценка", "Контакт";
- модули оставить внутри `details`;
- контакты поднять выше модулей уже сделано: сейчас контакты идут до модулей, это хорошо;
- модульный блок подписать как "необязательно".

### Критерии приемки

- Конфигуратор не ощущается единственным входом.
- В конфигураторе можно оставить любой контакт.
- На каждом крупном блоке есть путь к короткой заявке.
- Модули выглядят необязательным уточнением.
- Query params из кейсов продолжают работать.
- Расчет бюджета не меняется.

## Этап 7 - Обновить CTA по странице

Цель: все CTA должны вести в новую логику: сначала обсуждение, потом точный расчет.

### Header

Файл: `src/components/sections/site-header.tsx`.

Сейчас desktop-кнопка ведет в Telegram.

Нужно:

- label: "Обсудить проект";
- href: `#quick-lead`;
- Telegram оставить в footer/final/sticky.

Данные:

```ts
header: {
  contactCta: "Обсудить проект",
}
```

Английский:

```ts
contactCta: "Discuss a project",
```

### Cases CTA

Файл: `src/components/sections/cases.tsx`.

Сейчас:

- "Собрать заявку" -> `#estimator`;
- "Обсудить в Telegram" -> Telegram.

Нужно:

- primary: "Обсудить похожий проект" -> `#quick-lead`;
- secondary: "Посчитать точнее" -> `#estimator`;
- Telegram можно оставить рядом, если не перегружает блок. Если кнопок слишком много, Telegram оставить в sticky/final.

Минимальный вариант:

- primary `#quick-lead`;
- secondary Telegram остается.

Лучший вариант:

- primary `#quick-lead`;
- secondary `#estimator`;
- прямые контакты ниже в финале.

### Case detail pages

Файл: `src/app/[lang]/cases/page.tsx`.

Проверить CTA:

- "Estimate a similar project" сейчас ведет к `#estimator`.
- Для детальных кейсов можно оставить `#estimator`, потому что пользователь уже пришел с конкретным кейсом и хочет расчет похожего проекта.
- Но рядом или в нижнем CTA добавить "Обсудить проект" -> `/#quick-lead`.

В первом проходе можно не трогать детальные страницы, чтобы не расширять scope.

### Footer

Файл: `src/components/sections/final-cta.tsx`.

Footer уже содержит Telegram, телефон, email, GitHub. Добавить WhatsApp.

### Критерии приемки

- Основные CTA на главной не заставляют начинать с конфигуратора.
- Header ведет к быстрой форме.
- Cases дают путь к обсуждению похожего проекта.
- Footer содержит WhatsApp.
- Нет битых якорей.

## Этап 8 - Аналитика формы и точек отказа

Цель: увидеть, какие входы реально работают и где бросают конфигуратор.

Этот этап можно делать после визуально-функционального релиза. Он не должен блокировать первые изменения.

### Минимальные события

Файлы:

- `src/components/analytics-tracker.tsx`;
- `src/app/api/analytics/...` или новый endpoint;
- возможно `src/lib/database.ts`.

События:

- `quick_form_submit_success`;
- `quick_form_submit_error`;
- `sticky_cta_click`;
- `hero_primary_cta_click`;
- `estimator_submit_success`;
- `estimator_submit_error`;
- `estimator_direct_fallback_click`;
- `estimator_module_details_open`.

### Хранение

Можно добавить таблицу:

```sql
CREATE TABLE IF NOT EXISTS site_events (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  visitor_id TEXT,
  event_name TEXT NOT NULL,
  path TEXT,
  locale TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);
```

Но для первого прохода можно ограничиться console/info или Яндекс.Метрикой, если она подключена и события можно отправить через client-side goal.

### Критерии приемки

- Можно отличить заявку из hero от заявки из final CTA.
- Можно увидеть клики sticky CTA.
- Можно увидеть успешные и ошибочные отправки.
- Аналитика не ломает отправку заявки, если база не настроена.

## Этап 9 - QA

### Команды

```bash
npm run lint
npm run build
```

### Ручная проверка

Страницы:

- `/ru`;
- `/en`;
- `/ru#quick-lead`;
- `/ru#estimator`;
- `/ru#contact`;
- `/en#quick-lead`;
- `/en#estimator`;
- `/en#contact`.

Viewport:

- mobile 390px;
- tablet 768px;
- desktop 1440px;
- wide desktop 1920px.

Проверить:

- первый экран понятен без чтения технических деталей;
- quick form видна и отправляется;
- нельзя отправить пустую форму;
- можно отправить контакт не Telegram;
- sticky CTA не перекрывает submit и footer;
- WhatsApp/Telegram/mail/tel ссылки корректные;
- конфигуратор считает как раньше;
- кейс -> estimator query params работают;
- админка открывает заявки;
- Telegram-уведомление владельцу читаемое;
- нет горизонтального скролла на 390px;
- reduced motion не ломает доступность.

## Рекомендуемый порядок реализации

1. Расширить API, lead-message и database под общий контакт.
2. Добавить `quickLead` и `stickyCta` copy в `site.ru.ts` и `site.en.ts`.
3. Создать `QuickLeadForm`.
4. Встроить `QuickLeadForm` в hero.
5. Переписать hero copy и CTA.
6. Добавить mobile sticky contact bar.
7. Встроить `QuickLeadForm` в final CTA.
8. Обновить контакты final/footer, добавить WhatsApp.
9. Упростить copy конфигуратора и общий контакт в estimator.
10. Обновить CTA в header и cases.
11. Прогнать lint/build и ручную проверку.
12. Отдельным этапом добавить аналитику событий, если нужно.

## Что не делать в этой волне

- Не переписывать расчет бюджета.
- Не менять порядок кейсов и asset pipeline.
- Не добавлять новую CRM.
- Не делать большой редизайн всех секций.
- Не удалять конфигуратор.
- Не делать отдельный API для быстрой формы без необходимости.
- Не заставлять пользователя выбирать только Telegram.
- Не перегружать первый экран техническими словами вроде `LLM guardrails`, `production contour`, `boot sequence`, если они не объясняют пользу заказчику.

## Definition of done

- На первом экране есть понятное обещание результата, сегмент "для кого" и короткая форма.
- Основной путь к заявке занимает 2 обязательных поля: контакт и задача.
- Имя опционально.
- Конфигуратор остается доступным как точный расчет.
- Telegram, WhatsApp, телефон и email доступны как альтернативные каналы.
- API принимает заявку без Telegram.
- Telegram-уведомление владельцу содержит общий контакт и источник заявки.
- Финальный CTA содержит короткую форму.
- На mobile есть sticky CTA.
- `npm run lint` проходит.
- `npm run build` проходит.

