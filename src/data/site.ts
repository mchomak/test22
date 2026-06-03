export const contacts = {
  email: "kaneevramil7@gmail.com",
  telegram: "@McHomak15",
  telegramUrl: "https://t.me/McHomak15",
  github: "github.com/mchomak",
  githubUrl: "https://github.com/mchomak",
};

export const navItems = [
  { label: "Задачи", href: "/#specialization" },
  { label: "Конфигуратор", href: "/#estimator" },
  { label: "Процесс", href: "/#process" },
  { label: "Кейсы", href: "/#cases" },
  { label: "Бюджет", href: "/#budget" },
  { label: "FAQ", href: "/#faq" },
];

export const heroMetrics = [
  { value: "5 лет", label: "production-разработки" },
  { value: "30+", label: "ботов, сервисов и интеграций" },
  { value: "6 зон", label: "Telegram / AI / Backend / Web / Parsing / Crypto" },
];

export const stack = [
  "Python 3.11+",
  "FastAPI",
  "aiogram 3",
  "SQLAlchemy 2.0 async",
  "PostgreSQL",
  "Redis",
  "Docker",
  "OpenAI SDK",
  "Anthropic SDK",
  "PyTorch",
  "Next.js",
  "React",
  "Telegram Bot API",
  "YooKassa",
  "CryptoBot",
  "Telegram Stars",
  "Rapira",
  "ParityPay",
];

export const specializations = [
  {
    title: "Telegram-боты и Mini Apps",
    audience: "Бизнесу, которому нужен привычный Telegram-интерфейс для заявок, продаж, подписок, личных кабинетов и поддержки пользователей.",
    includes: [
      "боты для заявок, магазинов, подписок и оплат",
      "Mini Apps с каталогом, личным кабинетом и рефералкой",
      "админка, уведомления, аналитика и выгрузки",
    ],
    tech: "aiogram 3, Telegram Bot API, Telegram Web Apps, PostgreSQL, Redis",
    result: "Клиент получает не чат-скрипт, а рабочую воронку внутри Telegram: пользователь проходит путь до оплаты, заявки или нужного действия.",
  },
  {
    title: "AI / ML / нейросетевые модули",
    audience: "Командам, которым нужно встроить AI в продукт, поддержку, обучение, обработку документов или внутренние операции.",
    includes: [
      "AI-ассистенты и сценарии на OpenAI / Claude API",
      "RAG-базы знаний, обработка документов и классификация",
      "история, роли, лимиты, логи и контроль ответов",
    ],
    tech: "OpenAI SDK, Anthropic SDK, PyTorch, FastAPI, PostgreSQL",
    result: "AI становится частью процесса: отвечает по вашим данным, ускоряет рутину и не требует ручного копирования между сервисами.",
  },
  {
    title: "Парсинг и автоматизация",
    audience: "Проектам, где нужно регулярно собирать данные, следить за изменениями, обновлять таблицы, отправлять алерты или убирать ручные операции.",
    includes: [
      "сбор данных с одного или нескольких сайтов",
      "регулярный запуск, прокси, авторизация, антибот-риски",
      "экспорт в CSV / Excel / Google Sheets или базу данных",
    ],
    tech: "Python asyncio, Playwright, requests/httpx, PostgreSQL, cron/workers",
    result: "Данные приезжают по расписанию и в нужном формате, а команда не тратит часы на копирование, сверку и ручные уведомления.",
  },
  {
    title: "Web-сервисы и админ-панели",
    audience: "Командам, которым нужен рабочий web-интерфейс: личный кабинет, dashboard, форма заявок, админка или внутренний инструмент.",
    includes: [
      "frontend, backend API и роли пользователей",
      "формы, таблицы, статусы, dashboard и аналитика",
      "платежи, интеграции, уведомления и деплой",
    ],
    tech: "Next.js, React, FastAPI, PostgreSQL, Docker, Nginx",
    result: "Получается понятная рабочая поверхность для пользователей, менеджеров или операторов, а не набор разрозненных скриптов.",
  },
  {
    title: "Crypto / trading / blockchain-интеграции",
    audience: "Крипто-проектам, обменникам и трейдинговым командам, где нужны API бирж, мониторинг, сигналы, платежи или on-chain данные.",
    includes: [
      "Bybit / Binance / OKX API, DEX и crypto-платежи",
      "мониторинг цен, торговые сигналы и Telegram alerts",
      "логирование сделок, риск-ограничения и dry-run режимы",
    ],
    tech: "Bybit API, Binance API, Solana / Ethereum, PostgreSQL, Telegram Bot API",
    result: "Автоматизация следит за рынком, фиксирует события и помогает быстрее реагировать без постоянного ручного мониторинга.",
  },
  {
    title: "Backend API и базы данных",
    audience: "Продуктам, которым нужна стабильная серверная логика: API, модели данных, очереди, статусы, интеграции и поддерживаемый деплой.",
    includes: [
      "FastAPI-сервисы, базы данных, очереди и фоновые задачи",
      "авторизация, роли, webhook-и и внешние API",
      "логирование, Docker-деплой и понятная структура проекта",
    ],
    tech: "FastAPI, SQLAlchemy 2.0 async, PostgreSQL, Redis, Docker",
    result: "Серверная часть выдерживает реальные операции: хранит состояние, обрабатывает ошибки и остаётся понятной для развития.",
  },
];

export const proofItems = [
  {
    title: "Telegram Mini App",
    summary: "Каталог, платежи, рефералка, админка и авторизация через Telegram.",
    tags: ["Mini App", "payments", "admin"],
  },
  {
    title: "AI-сервис",
    summary: "Генерация структуры, тесты, обработка данных и интеграция в продукт.",
    tags: ["OpenAI / Claude", "RAG", "logs"],
  },
  {
    title: "Crypto bot",
    summary: "Мониторинг, сигналы, API бирж, риск-лимиты и Telegram alerts.",
    tags: ["Bybit API", "signals", "alerts"],
  },
  {
    title: "Backend-система",
    summary: "БД, роли, API, админ-панель, статусы и production-деплой.",
    tags: ["FastAPI", "PostgreSQL", "Docker"],
  },
];

export type ProjectTypeId =
  | "telegram-bot"
  | "telegram-mini-app"
  | "ai-integration"
  | "parser-automation"
  | "web-service"
  | "crypto-trading-bot"
  | "not-sure";

export type ProjectModule = {
  id: string;
  label: string;
  description: string;
  price: number;
  days: number;
};

export const projectTypes: Array<{
  id: ProjectTypeId;
  label: string;
  description: string;
  baseLow: number;
  baseHigh: number;
  daysLow: number;
  daysHigh: number;
  defaultModules: string[];
}> = [
  {
    id: "telegram-bot",
    label: "Telegram-бот",
    description: "Заявки, оплаты, подписки, уведомления, личные кабинеты и операторские сценарии.",
    baseLow: 35000,
    baseHigh: 65000,
    daysLow: 7,
    daysHigh: 12,
    defaultModules: ["database", "admin", "notifications"],
  },
  {
    id: "telegram-mini-app",
    label: "Telegram Mini App",
    description: "Интерфейс внутри Telegram: каталог, кабинет, корзина, оплата, рефералка и админка.",
    baseLow: 70000,
    baseHigh: 115000,
    daysLow: 12,
    daysHigh: 20,
    defaultModules: ["database", "admin", "payments", "profile"],
  },
  {
    id: "ai-integration",
    label: "AI-интеграция",
    description: "AI-ассистент, RAG, обработка документов, генерация контента или AI-модуль в продукте.",
    baseLow: 60000,
    baseHigh: 105000,
    daysLow: 10,
    daysHigh: 18,
    defaultModules: ["llm-api", "history-logs", "admin-ai"],
  },
  {
    id: "parser-automation",
    label: "Парсер / автоматизация",
    description: "Сбор данных, регулярные задачи, экспорт, уведомления и интеграции с таблицами или БД.",
    baseLow: 30000,
    baseHigh: 60000,
    daysLow: 5,
    daysHigh: 12,
    defaultModules: ["single-site", "regular-run", "export"],
  },
  {
    id: "web-service",
    label: "Web-сервис / админ-панель",
    description: "Frontend, backend API, роли, dashboard, админка, платежи и внешние интеграции.",
    baseLow: 75000,
    baseHigh: 130000,
    daysLow: 14,
    daysHigh: 24,
    defaultModules: ["frontend", "backend-api", "auth", "database-web"],
  },
  {
    id: "crypto-trading-bot",
    label: "Crypto / trading bot",
    description: "API бирж, мониторинг цен, сигналы, Telegram alerts, crypto-платежи и риск-ограничения.",
    baseLow: 65000,
    baseHigh: 120000,
    daysLow: 10,
    daysHigh: 20,
    defaultModules: ["exchange-api", "price-monitoring", "telegram-alerts"],
  },
  {
    id: "not-sure",
    label: "Не уверен, хочу обсудить",
    description: "Подходит, если есть идея или проблема, но пока нет точного формата решения.",
    baseLow: 20000,
    baseHigh: 45000,
    daysLow: 4,
    daysHigh: 9,
    defaultModules: ["discovery", "mvp-scope"],
  },
];

export const complexityLevels = [
  {
    id: "mvp",
    label: "MVP",
    description: "Один главный сценарий, минимум ролей и интеграций.",
    priceFactor: 0.82,
    daysFactor: 0.86,
  },
  {
    id: "business",
    label: "Бизнес-продукт",
    description: "Несколько сценариев, админка, данные и рабочая эксплуатация.",
    priceFactor: 1,
    daysFactor: 1,
  },
  {
    id: "system",
    label: "Сложная система",
    description: "Много ролей, интеграций, состояний, платежей или AI/crypto-логики.",
    priceFactor: 1.32,
    daysFactor: 1.24,
  },
];

export const urgencyOptions = [
  {
    id: "flexible",
    label: "Гибкий старт",
    description: "Можно спокойно уточнить сценарии и идти без жёсткого дедлайна.",
    priceFactor: 0.95,
    daysFactor: 1.12,
  },
  {
    id: "standard",
    label: "Стандартный темп",
    description: "Нормальный рабочий ритм с понятными контрольными точками.",
    priceFactor: 1,
    daysFactor: 1,
  },
  {
    id: "urgent",
    label: "Нужно быстрее",
    description: "Сжимаем сроки, заранее фиксируя приоритеты и ограничения.",
    priceFactor: 1.22,
    daysFactor: 0.78,
  },
];

export const projectModules: Record<ProjectTypeId, ProjectModule[]> = {
  "telegram-bot": [
    { id: "database", label: "База данных", description: "Пользователи, статусы, заказы, история действий.", price: 12000, days: 2 },
    { id: "admin", label: "Админ-панель", description: "Операторы, настройки, таблицы, ручные действия.", price: 26000, days: 4 },
    { id: "payments", label: "Платежи", description: "Счета, статусы, webhook-и, повторные проверки.", price: 24000, days: 4 },
    { id: "telegram-stars", label: "Telegram Stars", description: "Оплата звёздами и корректная обработка событий.", price: 18000, days: 3 },
    { id: "crypto-payments", label: "Крипто-платежи", description: "CryptoBot или кастомный crypto-flow.", price: 26000, days: 4 },
    { id: "referral", label: "Реферальная система", description: "Приглашения, бонусы, лимиты и начисления.", price: 18000, days: 3 },
    { id: "profile", label: "Личный кабинет", description: "Профиль, баланс, подписка, история заказов.", price: 18000, days: 3 },
    { id: "notifications", label: "Уведомления", description: "Системные сообщения, алерты админам, напоминания.", price: 9000, days: 1 },
    { id: "analytics", label: "Аналитика", description: "Сводки, конверсии, выгрузки и ключевые события.", price: 14000, days: 2 },
    { id: "external-api", label: "Интеграция с внешним API", description: "CRM, платежный провайдер, каталог или сторонний сервис.", price: 22000, days: 4 },
    { id: "deploy", label: "Деплой", description: "Docker, env, сервер, базовые логи и инструкция.", price: 12000, days: 2 },
  ],
  "telegram-mini-app": [
    { id: "database", label: "База данных", description: "Пользователи, товары, заявки, платежи и статусы.", price: 14000, days: 2 },
    { id: "admin", label: "Админ-панель", description: "Каталог, заявки, пользователи и настройки.", price: 28000, days: 5 },
    { id: "payments", label: "Платежи", description: "Оплата внутри воронки, webhooks и статусы.", price: 26000, days: 4 },
    { id: "telegram-stars", label: "Telegram Stars", description: "Звёзды, лимиты, чеки и события Telegram.", price: 18000, days: 3 },
    { id: "crypto-payments", label: "Крипто-платежи", description: "CryptoBot, адреса, статусы и уведомления.", price: 28000, days: 4 },
    { id: "referral", label: "Реферальная система", description: "Ссылки, бонусы, уровни и антифрод-ограничения.", price: 18000, days: 3 },
    { id: "profile", label: "Личный кабинет", description: "Профиль, история, баланс, избранное или заказы.", price: 20000, days: 3 },
    { id: "notifications", label: "Уведомления", description: "События в бот, статусы заявок и админские алерты.", price: 10000, days: 1 },
    { id: "analytics", label: "Аналитика", description: "Воронка, заявки, платежи, экспорт и сводки.", price: 16000, days: 2 },
    { id: "external-api", label: "Интеграция с внешним API", description: "Каталог, CRM, склад, обменник или платежный шлюз.", price: 24000, days: 4 },
    { id: "deploy", label: "Деплой", description: "Сборка, сервер, nginx, env и production-запуск.", price: 14000, days: 2 },
  ],
  "ai-integration": [
    { id: "llm-api", label: "OpenAI / Claude API", description: "Подключение модели, лимиты, роли и контроль ошибок.", price: 22000, days: 3 },
    { id: "rag", label: "RAG-база знаний", description: "Загрузка документов, чанки, поиск и контекст ответов.", price: 42000, days: 7 },
    { id: "documents", label: "Обработка документов", description: "PDF, таблицы, классификация, извлечение данных.", price: 28000, days: 5 },
    { id: "classification", label: "Классификация текстов", description: "Темы, статусы, маршрутизация и автопроверки.", price: 20000, days: 3 },
    { id: "content-generation", label: "Генерация контента", description: "Промпты, шаблоны, черновики и контроль результата.", price: 22000, days: 3 },
    { id: "ai-assistant", label: "AI-ассистент", description: "Диалог, память, инструменты, роли и ограничения.", price: 32000, days: 5 },
    { id: "existing-product", label: "Интеграция в существующий продукт", description: "API, webhooks, интерфейс и безопасная встраиваемость.", price: 28000, days: 5 },
    { id: "admin-ai", label: "Админ-панель", description: "Настройки промптов, лимиты, пользователи, диагностика.", price: 24000, days: 4 },
    { id: "history-logs", label: "История / логи", description: "Диалоги, события, ошибки, аудит и экспорт.", price: 14000, days: 2 },
  ],
  "parser-automation": [
    { id: "single-site", label: "Один сайт", description: "Стабильный сбор с одного источника.", price: 12000, days: 2 },
    { id: "multi-site", label: "Несколько сайтов", description: "Нормализация данных из разных источников.", price: 26000, days: 5 },
    { id: "auth", label: "Авторизация", description: "Личный кабинет, cookies, сессии и обновление доступа.", price: 18000, days: 3 },
    { id: "captcha", label: "Капча / антибот", description: "Оценка рисков, обходные сценарии и устойчивость.", price: 26000, days: 5 },
    { id: "proxies", label: "Прокси", description: "Ротация, лимиты, ошибки и контроль блокировок.", price: 16000, days: 3 },
    { id: "regular-run", label: "Регулярный запуск", description: "Расписание, retries, отчёты и контроль падений.", price: 12000, days: 2 },
    { id: "export", label: "Excel / CSV / Google Sheets", description: "Форматированные выгрузки для команды.", price: 12000, days: 2 },
    { id: "database", label: "База данных", description: "Хранение истории, дедупликация, статусы.", price: 14000, days: 2 },
    { id: "telegram-alerts", label: "Telegram-уведомления", description: "Алерты о новых данных, ошибках и итогах запуска.", price: 9000, days: 1 },
  ],
  "web-service": [
    { id: "frontend", label: "Frontend", description: "Интерфейс продукта, формы, таблицы и состояния.", price: 32000, days: 6 },
    { id: "backend-api", label: "Backend API", description: "Бизнес-логика, endpoints, статусы и интеграции.", price: 30000, days: 6 },
    { id: "auth", label: "Авторизация", description: "Вход, сессии, права доступа и безопасность.", price: 20000, days: 3 },
    { id: "roles", label: "Роли пользователей", description: "Админ, оператор, клиент и ограничения действий.", price: 18000, days: 3 },
    { id: "database-web", label: "База данных", description: "Сущности, миграции, связи и история изменений.", price: 18000, days: 3 },
    { id: "admin", label: "Админ-панель", description: "Управление данными, фильтры, действия и экспорт.", price: 28000, days: 5 },
    { id: "dashboard", label: "Dashboard / аналитика", description: "Метрики, графики, сводки и оперативный контроль.", price: 24000, days: 4 },
    { id: "payments", label: "Платежи", description: "Счета, статусы, webhook-и и финансовые события.", price: 26000, days: 4 },
    { id: "external-integrations", label: "Внешние интеграции", description: "CRM, ERP, Telegram, таблицы или сторонние API.", price: 24000, days: 4 },
  ],
  "crypto-trading-bot": [
    { id: "exchange-api", label: "Bybit / Binance / OKX API", description: "REST, WebSocket, лимиты и обработка ошибок.", price: 28000, days: 5 },
    { id: "dex", label: "Solana / Ethereum DEX", description: "On-chain данные, RPC, DEX API и транзакции.", price: 42000, days: 8 },
    { id: "price-monitoring", label: "Мониторинг цен", description: "Сканер рынков, фильтры, частота и хранение.", price: 20000, days: 3 },
    { id: "signals", label: "Торговые сигналы", description: "Условия входа, правила, фильтры и тестовые режимы.", price: 26000, days: 5 },
    { id: "telegram-alerts", label: "Уведомления в Telegram", description: "Сигналы, сделки, ошибки и ежедневные отчёты.", price: 9000, days: 1 },
    { id: "crypto-payments", label: "Crypto-платежи", description: "Приём платежей, статусы, проверки и уведомления.", price: 26000, days: 4 },
    { id: "trade-logs", label: "Логирование сделок", description: "История, PnL, dry-run, экспорт и аудит.", price: 16000, days: 3 },
    { id: "risk-limits", label: "Риск-ограничения", description: "Лимиты позиций, стопы, отключение и защита от дублей.", price: 24000, days: 4 },
  ],
  "not-sure": [
    { id: "discovery", label: "Диагностика задачи", description: "Разбор цели, сценариев, рисков и ограничений.", price: 8000, days: 1 },
    { id: "mvp-scope", label: "Границы MVP", description: "Что делаем в первой версии и что оставляем на потом.", price: 10000, days: 2 },
    { id: "architecture", label: "Архитектурная схема", description: "Сущности, роли, интеграции и дорожная карта.", price: 14000, days: 2 },
    { id: "prototype", label: "Прототип сценариев", description: "Быстрый кликабельный или текстовый контур решения.", price: 16000, days: 3 },
  ],
};

export const cases = [
  {
    slug: "subscription-bot",
    projectUrl: "",
    title: "Subscription Bot — цифровые подписки с автовыдачей",
    type: "Subscription automation",
    problem: "Заявки, платежи и выдача доступа велись вручную в чате: клиенты ждали оператора, тарифы путались, а рост аудитории ломал операционную схему.",
    solution: "Один aiohttp-сервис обслуживает Telegram-бота, webhooks платёжных провайдеров и Jinja2-админку. Покупка построена как FSM: тариф, локация, оплата, автовыдача доступа.",
    result: "Воронка от выбора тарифа до получения доступа работает без человека, а оператор управляет тарифами, платежами, рассылками и спорными случаями из админки.",
    stack: ["Python", "aiogram 3", "aiohttp", "SQLAlchemy 2.0 async", "PostgreSQL", "APScheduler", "Docker"],
    metrics: ["4 платёжных провайдера", "автовыдача доступа", "рассылки и напоминания"],
  },
  {
    slug: "sapsanex-mini-app",
    projectUrl: "",
    title: "SapsanEx — Telegram Mini App обменника",
    type: "Telegram Mini App / exchanger",
    problem: "Пользователь приходил из Telegram, уходил на сайт, создавал заявку и проверял статус на отдельном экране — мобильная воронка теряла людей на каждом переходе.",
    solution: "Собран Docker Compose из React Mini App, FastAPI-шлюза, aiogram-бота и PostgreSQL. Авторизация идёт через Telegram initData, а внешний API обменника обёрнут в типизированный слой.",
    result: "Расчёт курса, создание заявки, polling статуса, автоотмена по таймауту и уведомления о смене статуса остались внутри Telegram без отдельного логина.",
    stack: ["React", "TypeScript", "FastAPI", "aiogram 3", "SQLAlchemy async", "PostgreSQL", "Docker Compose"],
    metrics: ["Telegram WebApp auth", "typed exchanger gateway", "ru/en i18n"],
  },
  {
    slug: "seedream-tryon",
    projectUrl: "",
    title: "Seedream Bot — AI-примерка одежды в Telegram",
    type: "AI bot / e-commerce",
    problem: "Небольшим магазинам дорого снимать каждую позицию на модели, а внешние AI-сервисы требуют ручной работы и вытаскивают продавца из Telegram.",
    solution: "aiogram-бот принимает фото товара, ведёт пользователя через FSM-параметры генерации, вызывает Seedream API, принимает оплату через Telegram Stars или YooKassa и отдаёт результат в чат.",
    result: "Получился законченный продукт для e-commerce: бот, генерация, две платёжные системы и FastAPI-админка для пользователей, балансов, тарифов и транзакций.",
    stack: ["Python", "aiogram 3", "FastAPI", "Seedream API", "Telegram Stars", "YooKassa", "PostgreSQL"],
    metrics: ["две платёжные дорожки", "админка операторов", "RU/EN локализация"],
  },
  {
    slug: "ai-reply-assistant",
    projectUrl: "",
    title: "AI Reply Assistant — Telegram-бот с 7 AI-сценариями",
    type: "AI Telegram bot",
    problem: "Пользователю нужен был быстрый помощник внутри Telegram: без ручного копипаста в отдельные AI-сервисы и без зависания из-за нестабильного доступа к модели.",
    solution: "Собран aiogram + aiohttp webhook-сервис с 7 AI-сценариями, prompt-builder/response-parser модулями, YooKassa-платежами, реферальной логикой и пулом HTTP-прокси для OpenAI.",
    result: "MVP с оплатой готов к production: бот выбирает рабочий прокси, принимает оплату с фискальным чеком и возвращает варианты ответа в одном Telegram-окне.",
    stack: ["Python", "aiogram 3", "aiohttp", "OpenAI GPT-4o", "YooKassa", "PostgreSQL", "Docker"],
    metrics: ["7 AI-сценариев", "proxy healthcheck + cooldown", "trial и referral flow"],
  },
  {
    slug: "bybit-trading-bot",
    projectUrl: "",
    title: "ByBit Trading Bot — спотовая торговля 24/7",
    type: "Crypto trading automation",
    problem: "Ручная торговля не успевала за 300+ спотовыми парами: нужно одновременно ловить всплески объёма, ускорение цены и контролировать риск по открытым позициям.",
    solution: "Собран трёхслойный пайплайн: Bybit WebSocket/REST-сканер, стратегия Volume Spike + Price Acceleration и риск-менеджер со стопами, тейк-профитом и Telegram-отчётами.",
    result: "Цикл «сканирование → сигнал → сделка → выход» работает автономно 24/7, а dry-run режим позволяет проверять стратегию на реальных данных без риска для боевого счёта.",
    stack: ["Python asyncio", "Bybit API", "CoinPaprika", "PostgreSQL", "Telegram Bot API", "Docker Compose"],
    metrics: ["300+ монет в мониторинге", "автоуправление позициями", "dry-run перед production"],
  },
  {
    slug: "eps-bot",
    projectUrl: "",
    title: "EPS Bot — ML-торговля на Solana DEX",
    type: "DEX trading / ML pipeline",
    problem: "Для проверки стратегий на Solana DEX нужно было вручную собирать данные по пулам, готовить датасеты, запускать бэктесты и отдельно исполнять сделки в кошельке.",
    solution: "Собран pipeline: Raydium + GeckoTerminal данные, PostgreSQL-хранилище, ML-модуль на PyTorch/scikit-learn и слой tx_tools для формирования Solana-транзакций.",
    result: "Проект закрыл полный цикл «данные → модель → сигнал → сделка → отчёт» и стал технической базой для последующих crypto/automation решений.",
    stack: ["Python 3.12", "PyTorch", "scikit-learn", "Raydium API", "Solana RPC", "PostgreSQL", "Docker Compose"],
    metrics: ["LSTM / GRU / CNN / Transformer", "on-chain исполнение", "ежедневный PnL в Telegram"],
  },
  {
    slug: "frax-redesign",
    projectUrl: "",
    title: "Frax — редизайн криптообменника на WordPress",
    type: "Crypto exchanger redesign",
    problem: "Рабочий обменник на WordPress визуально устарел, мобильный UX калькулятора проседал, но переписывать обменный плагин было слишком рискованно.",
    solution: "Перевёрстаны WordPress-шаблоны, собрана новая визуальная система, переработан главный экран и калькулятор, а выводы плагина встроены в новую разметку через хуки и шорткоды.",
    result: "Production-сайт стал соответствовать ожиданиям рынка обменников, мобильный сценарий стал рабочим, а существующая backend-логика осталась стабильной.",
    stack: ["WordPress", "PHP", "CSS", "JavaScript", "Exchange plugin"],
    metrics: ["без замены CMS", "мобильный UX калькулятора", "production rollout"],
  },
  {
    slug: "tech-rise-academy",
    projectUrl: "",
    title: "Tech Rise Academy — лендинг с заявками в Telegram",
    type: "Landing / lead automation",
    problem: "Академии нужен был быстрый сайт без CRM: заявки терялись в директе и почте, а скорость ответа в первые минуты критична для продажи курса.",
    solution: "Собраны главная и страницы курсов на Vanilla HTML/CSS/JS, общий config.js для контента и FastAPI endpoint, который валидирует заявку и отправляет её владельцу через Telegram Bot API.",
    result: "Сайт задеплоен на собственный домен, заявки приходят в Telegram за несколько секунд, а контакты и ссылки можно менять без участия разработчика.",
    stack: ["HTML", "CSS", "JavaScript", "FastAPI", "Pydantic", "Telegram Bot API", "Nginx"],
    metrics: ["без CRM и базы", "заявка в Telegram", "Docker Compose deployment"],
  },
  {
    slug: "gym-progres",
    projectUrl: "",
    title: "gym_progres — трекер тренировок с auto-save",
    type: "Niche web app",
    problem: "Заметки и таблицы быстро превращались в хаос, а готовые фитнес-приложения были перегружены рекламой, подписками и лишними сценариями.",
    solution: "FastAPI отдаёт SSR-страницы на Jinja2, Alpine.js отправляет debounced JSON-запросы, упражнения хранятся в расширяемом каталоге, а шаблоны импортируются по публичной ссылке.",
    result: "Пользователь записывает подходы без кнопки «Сохранить», видит историю прогресса и может импортировать тренировочный шаблон без дублей.",
    stack: ["Python 3.12", "FastAPI", "Jinja2", "Alpine.js", "SQLAlchemy", "PostgreSQL", "Docker Compose"],
    metrics: ["auto-save без кнопки", "публичные шаблоны", "40+ упражнений в каталоге"],
  },
  {
    slug: "skillup",
    projectUrl: "",
    title: "SkillUp — AI-платформа обучения",
    type: "AI education product",
    problem: "Обычные AI-ответы дают хаотичные стены текста, а готовые roadmap-сайты не учитывают текущий уровень и цель конкретного пользователя.",
    solution: "Собран full-stack продукт: Next.js frontend, FastAPI backend, Celery + Redis для AI-задач и Anthropic API для онбординга, плана, объяснений и квизов.",
    result: "Пользователь за несколько минут получает персональный 4-уровневый roadmap, где прогресс отображается как интерактивное дерево с активными и закрытыми узлами.",
    stack: ["Next.js", "TypeScript", "FastAPI", "Celery", "Redis", "PostgreSQL", "Anthropic API"],
    metrics: ["4 уровня плана", "AI-онбординг и квизы", "Docker + Nginx deployment"],
  },
];

export const packages = [
  {
    title: "Базовый",
    subtitle: "Небольшой Telegram-бот, MVP или одна интеграция.",
    price: "от 48 000 ₽",
    firstProjectPrice: "первый проект от 38 400 ₽",
    term: "1-2 недели",
    includes: [
      "диагностика задачи и короткое ТЗ",
      "один основной пользовательский сценарий",
      "бот или backend-интеграция",
      "базовая база данных или хранение состояний",
      "деплой и короткая инструкция",
    ],
    excludes: ["сложные роли и админка", "несколько платёжных провайдеров", "долгая пострелизная поддержка"],
    featured: false,
  },
  {
    title: "Стандарт",
    subtitle: "Полноценный бот/backend-сервис с оплатами, базой, админкой и деплоем.",
    price: "от 112 000 ₽",
    firstProjectPrice: "первый проект от 89 600 ₽",
    term: "3-5 недель",
    includes: [
      "техническая схема и архитектура",
      "несколько сценариев пользователей",
      "платежи, база данных, роли",
      "админские действия и уведомления",
      "Docker-деплой, логирование, тестирование",
    ],
    excludes: ["сложный ML-пайплайн", "многоэтапная аналитика", "круглосуточная поддержка"],
    featured: true,
  },
  {
    title: "Премиум",
    subtitle: "Сложная система: AI, интеграции, платежи, очереди, мониторинг и поддержка запуска.",
    price: "от 224 000 ₽",
    firstProjectPrice: "первый проект от 179 200 ₽",
    term: "6-10 недель",
    includes: [
      "детальная архитектура и ограничения проекта",
      "AI/LLM или несколько внешних интеграций",
      "платежи, очереди, мониторинг, роли",
      "документация, staging/production контур",
      "поддержка запуска и стабилизация",
    ],
    excludes: ["закупка сторонних сервисов", "дизайн сложных интерфейсов с нуля", "юридическая настройка платежей"],
    featured: false,
  },
];

export const retainer = {
  title: "Поддержка и развитие",
  price: "от 10 000 ₽ / месяц",
  description: "Фикс багов, небольшие доработки, обновление интеграций, контроль ошибок, помощь после релиза и планирование следующих итераций.",
};

export const budgetGuides = [
  {
    title: "Небольшой бот / скрипт",
    price: "от 15 000 ₽",
    description: "Простая автоматизация, уведомления, базовая логика.",
  },
  {
    title: "Бизнес-бот / парсер / backend-модуль",
    price: "от 40 000 ₽",
    description: "База данных, роли, интеграции, API, регулярные задачи.",
  },
  {
    title: "Mini App / AI-сервис / система под ключ",
    price: "от 100 000 ₽",
    description: "Frontend, backend, админка, платежи, аналитика, AI-модули.",
  },
];

export const processSteps = [
  {
    title: "Вы отправляете конфигурацию",
    text: "Выбираете тип решения, сложность, модули и оставляете контакт. Уже на этом этапе видна предварительная вилка бюджета и сроков.",
  },
  {
    title: "Я уточняю детали",
    text: "Коротко разбираю сценарии, интеграции, платежи, данные, существующие материалы и риски, которые могут повлиять на оценку.",
  },
  {
    title: "Фиксируем MVP и границы работ",
    text: "Определяем, что входит в первую версию, какие сценарии критичны, а что можно оставить на следующий этап.",
  },
  {
    title: "Финальная смета и сроки",
    text: "После уточнений даю понятную оценку, этапы, критерии приёмки и условия старта под конкретный объём.",
  },
  {
    title: "Разработка, тестирование, запуск",
    text: "Собираю рабочий продукт: backend, бот или интерфейс, интеграции, проверки сценариев, деплой и запуск.",
  },
  {
    title: "Поддержка после релиза",
    text: "После запуска можно подключить сопровождение: багфиксы, небольшие доработки, контроль ошибок и развитие следующей версии.",
  },
];

export const trustItems = [
  "5 лет коммерческой разработки на Python",
  "30+ завершённых проектов под ключ",
  "Опыт с оплатами, возвратами, статусами и webhook-и",
  "AI/LLM-интеграции с ограничениями, ролями и базой знаний",
  "Backend-first подход: данные, статусы и ошибки продуманы заранее",
  "Деплой, логирование и поддержка после запуска",
  "Понятные границы работ, сроки и индивидуальные условия под проект",
];

export const testimonials = [
  {
    quote: "Нужен был не просто бот, а рабочий сервис с оплатой, статусами и админскими действиями. Рамиль быстро разложил задачу на схему, показал риски и довёл до запуска без лишней драматургии.",
    author: "Основатель Telegram-сервиса",
  },
  {
    quote: "Мы не хотели ломать существующий обменник. Получили аккуратный редизайн, понятный путь заявки и ощущение более зрелого продукта без переписывания всего backend.",
    author: "Владелец обменного проекта",
  },
  {
    quote: "Ценность была в инженерном мышлении: где хранить состояния, как ограничить доступ, что мониторить после релиза. В итоге внутренний инструмент стал предсказуемым в эксплуатации.",
    author: "Product manager внутреннего инструмента",
  },
];

export const faqs = [
  {
    question: "Можно ли прийти без готового ТЗ?",
    answer: "Да. Достаточно описать задачу, пользователей, желаемый результат и ограничения. Я помогу собрать MVP, сценарии, список интеграций и границы первой версии.",
  },
  {
    question: "Почему цена в калькуляторе предварительная?",
    answer: "Калькулятор не видит детали: дизайн, качество существующего кода, сложность API, платежи, объём данных, дедлайны и скрытые edge-кейсы. Финальная стоимость фиксируется после короткого разбора задачи.",
  },
  {
    question: "Можно ли начать с MVP?",
    answer: "Да. Обычно MVP фиксирует один главный сценарий, минимальный набор интеграций и понятную точку проверки гипотезы. После запуска можно расширять роли, платежи, админку и аналитику.",
  },
  {
    question: "Делаете ли вы Telegram Mini Apps?",
    answer: "Да. Могу собрать Mini App с авторизацией через Telegram initData, каталогом, личным кабинетом, оплатами, рефералкой, админкой и backend API.",
  },
  {
    question: "Можно ли подключить AI / нейросети к существующему проекту?",
    answer: "Да, если проект можно развернуть или есть понятный API. Возможны AI-ассистент, RAG-база знаний, обработка документов, классификация текстов, генерация контента и логирование истории.",
  },
  {
    question: "Работаете ли вы с платежами, Telegram Stars и криптой?",
    answer: "Да. Возможны YooKassa, Telegram Stars, CryptoBot, crypto-платежи и кастомные платёжные сценарии. Отдельно проверяются webhooks, статусы, повторные оплаты и админские операции.",
  },
  {
    question: "Можно ли доработать уже существующий проект?",
    answer: "Да, если есть доступ к коду, окружению и данным для проверки. Сначала провожу диагностику: зависимости, архитектура, база, деплой и риски изменений.",
  },
  {
    question: "Что будет после отправки заявки?",
    answer: "Я посмотрю выбранную конфигурацию, задам уточняющие вопросы, предложу границы MVP и после короткого обсуждения вернусь с финальной вилкой бюджета, сроками и этапами.",
  },
];
