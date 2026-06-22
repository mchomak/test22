export const contacts = {
  email: "kaneevramil7@gmail.com",
  telegram: "@McHomak15",
  telegramUrl: "https://t.me/McHomak15",
  whatsapp: "+79269549196",
  whatsappUrl: "https://wa.me/79269549196",
  github: "github.com/mchomak",
  githubUrl: "https://github.com/mchomak",
};

export const navItems = [
  { label: "Задачи", href: "#specialization" },
  { label: "Конфигуратор", href: "#estimator" },
  { label: "Процесс", href: "#process" },
  { label: "Кейсы", href: "#cases" },
  { label: "Бюджет", href: "#budget" },
  { label: "FAQ", href: "#faq" },
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

export type ProjectComplexityId = "mvp" | "business" | "system";

export type ProjectEstimatorPreset = {
  type: ProjectTypeId;
  complexity: ProjectComplexityId;
  modules: string[];
};

const priceDiscountFactor = 0.7;
const rubFormatter = new Intl.NumberFormat("ru-RU");

function discountRubPrice(value: number) {
  return Math.round(value * priceDiscountFactor);
}

function formatDiscountedRubPrice(value: number) {
  return `${rubFormatter.format(discountRubPrice(value))} ₽`;
}

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

export const complexityLevels: Array<{
  id: ProjectComplexityId;
  label: string;
  description: string;
  priceFactor: number;
  daysFactor: number;
}> = [
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
    { id: "payments", label: "Платежи картой", description: "Счета, статусы, webhook-и, повторные проверки.", price: 24000, days: 4 },
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
    { id: "payments", label: "Платежи картой", description: "Оплата внутри воронки, webhooks и статусы.", price: 26000, days: 4 },
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
    { id: "payments", label: "Платежи картой", description: "Счета, статусы, webhook-и и финансовые события.", price: 26000, days: 4 },
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

const discountedProjectTypes = projectTypes.map((item) => ({
  ...item,
  baseHigh: discountRubPrice(item.baseHigh),
  baseLow: discountRubPrice(item.baseLow),
})) satisfies typeof projectTypes;

const discountedProjectModules = Object.fromEntries(
  Object.entries(projectModules).map(([type, modules]) => [
    type,
    modules.map((module) => ({
      ...module,
      price: discountRubPrice(module.price),
    })),
  ]),
) as typeof projectModules;

export type CaseStudy = {
  slug: string;
  projectUrl: string;
  title: string;
  type: string;
  category: string;
  shortSummary: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  metrics: string[];
  outcomes: string[];
  timeframe: string;
  keyResult: string;
  context: string[];
  modules: string[];
  integrations: string[];
  architecture: string[];
  media: Array<{
    title: string;
    items: string[];
  }>;
  challenges: Array<{
    title: string;
    text: string;
  }>;
  resultDetails: string[];
  screenshotFolder: string;
  coverImage: string;
  coverAlt: string;
  estimatorPreset: ProjectEstimatorPreset;
  preview: {
    kind: "bot" | "mini-app" | "ai" | "chart" | "dashboard" | "web" | "tree";
    accent: string;
    label: string;
    stats: string[];
  };
};

export function buildEstimatorHref({
  estimatorPreset,
  slug,
}: Pick<CaseStudy, "estimatorPreset" | "slug">) {
  const params = new URLSearchParams({
    estimateType: estimatorPreset.type,
    estimateComplexity: estimatorPreset.complexity,
    estimateModules: estimatorPreset.modules.join(","),
    estimateCase: slug,
  });

  return `/?${params.toString()}#estimator`;
}

export const cases: CaseStudy[] = [
  {
    slug: "subscription-bot",
    projectUrl: "",
    title: "Subscription Bot — цифровые подписки с автовыдачей",
    type: "Subscription automation",
    category: "Telegram",
    shortSummary: "Telegram-бот для подписочного продукта: тарифы, четыре платёжных провайдера, автоматическая выдача доступа и web-админка для операторов.",
    problem: "Заявки, платежи и выдача доступа велись вручную в чате: клиенты ждали оператора, тарифы путались, а рост аудитории ломал операционную схему.",
    solution: "Один aiohttp-сервис обслуживает Telegram-бота, webhooks платёжных провайдеров и Jinja2-админку. Покупка построена как FSM: тариф, локация, оплата, автовыдача доступа.",
    result: "Воронка от выбора тарифа до получения доступа работает без человека, а оператор управляет тарифами, платежами, рассылками и спорными случаями из админки.",
    stack: ["Python", "aiogram 3", "aiohttp", "SQLAlchemy 2.0 async", "PostgreSQL", "APScheduler", "Docker"],
    metrics: ["4 платёжных провайдера", "автовыдача доступа", "рассылки и напоминания"],
    outcomes: ["платежи картой", "админка", "автовыдача", "рассылки"],
    timeframe: "MVP + production-запуск",
    keyResult: "Покупка подписки проходит без оператора: от выбора тарифа до выдачи доступа.",
    context: [
      "Заказчику нужна была воронка продаж цифровых подписок внутри Telegram, без ручной выдачи данных в личных сообщениях.",
      "Ручной процесс плохо масштабировался: операторы путали тарифы, локации и статусы платежей.",
      "Простого чат-бота было недостаточно: нужны были webhooks платежей, админка, напоминания и контролируемые edge-кейсы.",
    ],
    modules: [
      "FSM-сценарий покупки: тариф, локация, провайдер оплаты, счёт, выдача доступа.",
      "Jinja2-админка для тарифов, пользователей, платежей, провайдеров и рассылок.",
      "APScheduler для истечения подписок, напоминаний и фоновых broadcast-задач.",
      "Кэш настроек и кнопок с инвалидированием при изменениях в админке.",
    ],
    integrations: ["Telegram Bot API", "Rapira", "CryptoBot", "ParityPay", "PostgreSQL"],
    architecture: ["Пользователь", "Telegram-бот", "aiohttp backend", "PostgreSQL", "payment webhooks", "админка"],
    media: [
      { title: "Telegram-бот", items: ["главное меню", "тарифы", "выбор провайдера оплаты", "доступ выдан"] },
      { title: "Админка", items: ["платежи по провайдерам", "редактор тарифов", "рассылки", "настройки платёжных систем"] },
      { title: "Техника", items: ["FSM покупки", "задачи APScheduler", "схема webhook-потока"] },
    ],
    challenges: [
      { title: "Много платёжных провайдеров", text: "События приведены к единой модели платежа, чтобы оператор видел статусы одинаково независимо от источника." },
      { title: "Автовыдача без хаоса", text: "Покупка разделена на FSM-шаги, а выдача доступа запускается только после подтверждённого платежного события." },
      { title: "Настройки без редеплоя", text: "Тарифы, локации и платёжные переключатели вынесены в админку с контролируемым обновлением кэша." },
    ],
    resultDetails: [
      "Оператор подключается только к спорным случаям и поддержке.",
      "Тарифная сетка, локации и провайдеры управляются через админку.",
      "Пользователь получает доступ сразу после успешной оплаты.",
    ],
    screenshotFolder: "public/cases/subscription-bot",
    coverImage: "/cases/subscription-bot/preview_sq.png",
    coverAlt: "Subscription bot Telegram flow and admin dashboard preview",
    estimatorPreset: {
      type: "telegram-bot",
      complexity: "system",
      modules: [
        "database",
        "admin",
        "payments",
        "crypto-payments",
        "profile",
        "notifications",
        "analytics",
        "external-api",
        "deploy",
      ],
    },
    preview: {
      kind: "bot",
      accent: "#67e8f9",
      label: "paid webhook",
      stats: ["4 providers", "FSM flow", "auto issue"],
    },
  },
  {
    slug: "sapsanex-mini-app",
    projectUrl: "",
    title: "SapsanEx — Telegram Mini App обменника",
    type: "Telegram Mini App / exchanger",
    category: "Mini App",
    shortSummary: "Mini App для обменника: расчёт курса, создание заявки, polling статуса и уведомления остаются внутри Telegram.",
    problem: "Пользователь приходил из Telegram, уходил на сайт, создавал заявку и проверял статус на отдельном экране — мобильная воронка теряла людей на каждом переходе.",
    solution: "Собран Docker Compose из React Mini App, FastAPI-шлюза, aiogram-бота и PostgreSQL. Авторизация идёт через Telegram initData, а внешний API обменника обёрнут в типизированный слой.",
    result: "Расчёт курса, создание заявки, polling статуса, автоотмена по таймауту и уведомления о смене статуса остались внутри Telegram без отдельного логина.",
    stack: ["React", "TypeScript", "FastAPI", "aiogram 3", "SQLAlchemy async", "PostgreSQL", "Docker Compose"],
    metrics: ["Telegram WebApp auth", "typed exchanger gateway", "ru/en i18n"],
    outcomes: ["Mini App", "Telegram auth", "API gateway", "статусы"],
    timeframe: "готово к production-деплою",
    keyResult: "Обменный поток проходит в Telegram без перехода на внешний сайт.",
    context: [
      "Клиенты приходили из Telegram, но ключевые шаги обмена происходили на внешнем сайте.",
      "Мобильная воронка теряла пользователей на переходах между ботом, браузером и страницей статуса.",
      "Сторонний API обменника работал через form-data и не давал удобной типизированной модели заявки.",
    ],
    modules: [
      "React + TypeScript Mini App с калькулятором, созданием заявки и историей.",
      "FastAPI-шлюз над сторонним API обменника с Pydantic-моделями.",
      "aiogram-бот для запуска WebApp и уведомлений о смене статуса.",
      "Фоновая автоотмена зависших заявок и polling статуса в интерфейсе.",
    ],
    integrations: ["Telegram WebApp initData", "Premium Exchanger API", "Telegram Bot API", "PostgreSQL"],
    architecture: ["Пользователь", "Telegram WebApp", "React Mini App", "FastAPI gateway", "Premium Exchanger API", "PostgreSQL", "aiogram bot"],
    media: [
      { title: "Mini App", items: ["калькулятор", "подтверждение заявки", "status polling", "история заявок"] },
      { title: "Telegram-уведомления", items: ["создание заявки", "смена статуса", "автоотмена по таймауту"] },
      { title: "Техника", items: ["HMAC initData", "typed API wrapper", "схема WebApp-потока"] },
    ],
    challenges: [
      { title: "Авторизация без логина", text: "Telegram initData валидируется через HMAC-SHA256, поэтому пользователю не нужен отдельный аккаунт." },
      { title: "Неприятный внешний API", text: "form-data API закрыт типизированным gateway-слоем, чтобы фронт работал с нормальными DTO." },
      { title: "Зависшие заявки", text: "Фоновая задача закрывает заявки по таймауту, а пользователь видит актуальный статус прямо в Mini App." },
    ],
    resultDetails: [
      "Расчёт, создание и отслеживание заявки остались в Telegram.",
      "Статусы приходят уведомлением от бота и обновляются в Mini App.",
      "Собственный журнал заявок хранит историю и снижает зависимость от внешнего API.",
    ],
    screenshotFolder: "public/cases/sapsanex-mini-app",
    coverImage: "/cases/sapsanex-mini-app/preview_sq.png",
    coverAlt: "SapsanEx Telegram Mini App calculator and admin workflow preview",
    estimatorPreset: {
      type: "telegram-mini-app",
      complexity: "business",
      modules: ["database", "notifications", "profile", "external-api", "deploy"],
    },
    preview: {
      kind: "mini-app",
      accent: "#f97316",
      label: "HMAC initData",
      stats: ["rate calc", "status polling", "i18n"],
    },
  },
  {
    slug: "seedream-tryon",
    projectUrl: "",
    title: "Seedream Bot — AI-примерка одежды в Telegram",
    type: "AI bot / e-commerce",
    category: "AI",
    shortSummary: "Telegram-бот для AI-примерки: загрузка товара, параметры генерации, Seedream API, Telegram Stars, YooKassa и FastAPI-админка.",
    problem: "Небольшим магазинам дорого снимать каждую позицию на модели, а внешние AI-сервисы требуют ручной работы и вытаскивают продавца из Telegram.",
    solution: "aiogram-бот принимает фото товара, ведёт пользователя через FSM-параметры генерации, вызывает Seedream API, принимает оплату через Telegram Stars или YooKassa и отдаёт результат в чат.",
    result: "Получился законченный продукт для e-commerce: бот, генерация, две платёжные системы и FastAPI-админка для пользователей, балансов, тарифов и транзакций.",
    stack: ["Python", "aiogram 3", "FastAPI", "Seedream API", "Telegram Stars", "YooKassa", "PostgreSQL"],
    metrics: ["две платёжные дорожки", "админка операторов", "RU/EN локализация"],
    outcomes: ["AI-модуль", "Stars", "YooKassa", "админка"],
    timeframe: "собственный продукт / demo-ready",
    keyResult: "Магазин получает AI-примерку и монетизацию внутри Telegram.",
    context: [
      "Маленьким e-commerce-командам дорого снимать каждую вещь на модели.",
      "Готовые AI-сервисы уводят пользователя из Telegram и требуют ручных шагов.",
      "Нужен был продуктовый бот: генерация, платежи, баланс, история и операторская админка.",
    ],
    modules: [
      "FSM загрузки товара и выбора параметров генерации.",
      "Обёртка над Seedream API для img2img-сценария.",
      "Две платёжные дорожки: Telegram Stars и YooKassa.",
      "FastAPI-админка с пользователями, балансами, тарифами и транзакциями.",
    ],
    integrations: ["Seedream API", "Telegram Stars", "YooKassa", "Telegram Bot API", "PostgreSQL"],
    architecture: ["Пользователь", "aiogram bot", "Seedream service", "payment providers", "PostgreSQL", "FastAPI admin"],
    media: [
      { title: "Telegram-бот", items: ["загрузка товара", "параметры", "AI-результат", "история генераций"] },
      { title: "Платежи", items: ["Stars invoice", "YooKassa checkout", "баланс генераций"] },
      { title: "Админка", items: ["пользователи", "платежи", "тарифы", "ручные начисления"] },
    ],
    challenges: [
      { title: "AI как продукт, а не демо", text: "Генерация встроена в понятный пользовательский flow с балансом, историей и тарифами." },
      { title: "Две кассы в одном боте", text: "Stars закрывает быстрые микропокупки, YooKassa — пакеты и подписочные сценарии." },
      { title: "Операторский контроль", text: "Админка позволяет видеть платежи, пользователей и начисления без доступа к базе." },
    ],
    resultDetails: [
      "Пользователь получает результат AI-примерки в том же Telegram-чате.",
      "Владелец управляет тарифами, балансами и платежами из админки.",
      "Стек готов к переиспользованию для других img2img-сервисов.",
    ],
    screenshotFolder: "public/cases/seedream-tryon",
    coverImage: "/cases/seedream-tryon/preview_sq.png",
    coverAlt: "Seedream try-on bot with before and after generation preview",
    estimatorPreset: {
      type: "telegram-bot",
      complexity: "system",
      modules: [
        "database",
        "admin",
        "payments",
        "telegram-stars",
        "profile",
        "notifications",
        "external-api",
        "deploy",
      ],
    },
    preview: {
      kind: "ai",
      accent: "#a78bfa",
      label: "Seedream 4.0",
      stats: ["img2img", "Stars", "YooKassa"],
    },
  },
  {
    slug: "ai-reply-assistant",
    projectUrl: "",
    title: "AI Reply Assistant — Telegram-бот с 7 AI-сценариями",
    type: "AI Telegram bot",
    category: "AI",
    shortSummary: "AI-ассистент внутри Telegram: семь сценариев, GPT-4o, YooKassa, рефералка и прокси-ротация для стабильного доступа к модели.",
    problem: "Пользователю нужен был быстрый помощник внутри Telegram: без ручного копипаста в отдельные AI-сервисы и без зависания из-за нестабильного доступа к модели.",
    solution: "Собран aiogram + aiohttp webhook-сервис с 7 AI-сценариями, prompt-builder/response-parser модулями, YooKassa-платежами, реферальной логикой и пулом HTTP-прокси для OpenAI.",
    result: "MVP с оплатой готов к production: бот выбирает рабочий прокси, принимает оплату с фискальным чеком и возвращает варианты ответа в одном Telegram-окне.",
    stack: ["Python", "aiogram 3", "aiohttp", "OpenAI GPT-4o", "YooKassa", "PostgreSQL", "Docker"],
    metrics: ["7 AI-сценариев", "proxy healthcheck + cooldown", "trial и referral flow"],
    outcomes: ["AI-сценарии", "YooKassa", "proxy pool", "referral"],
    timeframe: "MVP готов к production",
    keyResult: "Пользователь получает AI-ответы в Telegram, а модель вызывается через устойчивый proxy pool.",
    context: [
      "Нужен был AI-помощник, который принимает текст или скриншот и возвращает варианты ответа в одном окне.",
      "Ручной copy-paste в отдельные AI-сервисы ломал скорость и привычный Telegram-flow.",
      "Доступ к OpenAI был нестабилен, поэтому простого прямого API-вызова было мало.",
    ],
    modules: [
      "Семь AI-сценариев с отдельными prompt-builder и response-parser модулями.",
      "Персонализация тона, роли и имени AI-персонажа.",
      "YooKassa-платежи, trial flow и реферальная программа.",
      "Пул HTTP-прокси с healthcheck, cooldown и slow-threshold ротацией.",
    ],
    integrations: ["OpenAI GPT-4o", "YooKassa", "Telegram Bot API", "PostgreSQL", "HTTP proxy pool"],
    architecture: ["Пользователь", "Telegram-бот", "AI router", "proxy pool", "OpenAI", "YooKassa webhook", "PostgreSQL"],
    media: [
      { title: "Telegram-бот", items: ["главное меню", "выбор сценария", "загрузка контекста", "варианты ответа"] },
      { title: "Платежи", items: ["пакеты", "YooKassa checkout", "реферальный экран"] },
      { title: "Техника", items: ["prompt builder", "proxy rotation", "YooKassa webhook"] },
    ],
    challenges: [
      { title: "Нейтральный UX", text: "Сценарии сформулированы как универсальный помощник переписки без публичных серых формулировок." },
      { title: "Нестабильный upstream", text: "Proxy pool выбирает рабочий узел, охлаждает ошибочные прокси и ротирует медленные." },
      { title: "Платёжная воронка", text: "Trial, пакеты, фискальный чек и рефералка связаны с лимитами пользователя в базе." },
    ],
    resultDetails: [
      "Пользователь остаётся в Telegram и получает варианты ответа без ручного копирования.",
      "Бот сам выбирает рабочий прокси для вызова модели.",
      "Оплата и бонусы попадают в единый пользовательский баланс.",
    ],
    screenshotFolder: "public/cases/ai-reply-assistant",
    coverImage: "/cases/ai-reply-assistant/preview_sq.png",
    coverAlt: "AI reply assistant Telegram bot and moderation pipeline preview",
    estimatorPreset: {
      type: "ai-integration",
      complexity: "business",
      modules: ["llm-api", "content-generation", "ai-assistant", "admin-ai", "history-logs"],
    },
    preview: {
      kind: "bot",
      accent: "#38bdf8",
      label: "GPT-4o router",
      stats: ["7 scenarios", "YooKassa", "proxy"],
    },
  },
  {
    slug: "bybit-trading-bot",
    projectUrl: "",
    title: "ByBit Trading Bot — спотовая торговля 24/7",
    type: "Crypto trading automation",
    category: "Crypto",
    shortSummary: "Автоматизация торговли: Bybit WebSocket/REST, стратегия Volume Spike + Price Acceleration, риск-менеджер и Telegram-отчёты.",
    problem: "Ручная торговля не успевала за 300+ спотовыми парами: нужно одновременно ловить всплески объёма, ускорение цены и контролировать риск по открытым позициям.",
    solution: "Собран трёхслойный пайплайн: Bybit WebSocket/REST-сканер, стратегия Volume Spike + Price Acceleration и риск-менеджер со стопами, тейк-профитом и Telegram-отчётами.",
    result: "Цикл «сканирование → сигнал → сделка → выход» работает автономно 24/7, а dry-run режим позволяет проверять стратегию на реальных данных без риска для боевого счёта.",
    stack: ["Python asyncio", "Bybit API", "CoinPaprika", "PostgreSQL", "Telegram Bot API", "Docker Compose"],
    metrics: ["300+ монет в мониторинге", "автоуправление позициями", "dry-run перед production"],
    outcomes: ["Bybit API", "risk manager", "dry-run", "alerts"],
    timeframe: "production-ready pipeline",
    keyResult: "Сканирование, сигнал, вход и выход из позиции работают автономно 24/7.",
    context: [
      "Стратегия требовала одновременно отслеживать объёмные всплески и ускорение цены по сотням инструментов.",
      "Ручной мониторинг приводил к пропущенным сигналам и эмоциональным решениям.",
      "Нужно было проверить стратегию на live-данных без риска для боевого счёта.",
    ],
    modules: [
      "Bybit WebSocket/REST-сканер с фильтрацией ликвидности через CoinPaprika.",
      "Стратегия Volume Spike + Price Acceleration.",
      "Риск-менеджер со стоп-лоссом, тейк-профитом и лимитом открытых позиций.",
      "Telegram-уведомления о сделках, позициях и дневном P&L.",
    ],
    integrations: ["Bybit REST API", "Bybit WebSocket", "CoinPaprika API", "Telegram Bot API", "PostgreSQL"],
    architecture: ["Bybit market data", "scanner", "strategy", "risk manager", "Bybit REST", "PostgreSQL", "Telegram"],
    media: [
      { title: "Стратегия", items: ["volume spike chart", "price acceleration", "таблица позиций"] },
      { title: "Telegram", items: ["сигнал входа", "закрытие позиции", "daily report"] },
      { title: "Техника", items: ["scanner log", "strategy code", "position manager"] },
    ],
    challenges: [
      { title: "300+ инструментов", text: "Сканер разделён от стратегии, чтобы фильтрация рынка не смешивалась с логикой входа." },
      { title: "Риск до боевого режима", text: "Dry-run позволяет прогнать поток на реальных данных без ордеров на аккаунте." },
      { title: "Контроль позиций", text: "Риск-менеджер следит за лимитом позиций, стопами и условиями выхода." },
    ],
    resultDetails: [
      "Бот не требует постоянного ручного мониторинга рынка.",
      "Все ключевые события уходят в Telegram.",
      "Dry-run режим снижает риск перед включением реальной торговли.",
    ],
    screenshotFolder: "public/cases/bybit-trading-bot",
    coverImage: "/cases/bybit-trading-bot/preview_sq.png",
    coverAlt: "Bybit trading bot market scanner and alert dashboard preview",
    estimatorPreset: {
      type: "crypto-trading-bot",
      complexity: "system",
      modules: [
        "exchange-api",
        "price-monitoring",
        "signals",
        "telegram-alerts",
        "trade-logs",
        "risk-limits",
      ],
    },
    preview: {
      kind: "chart",
      accent: "#f7a600",
      label: "Volume Spike",
      stats: ["300+ coins", "24/7", "dry-run"],
    },
  },
  {
    slug: "eps-bot",
    projectUrl: "",
    title: "EPS Bot — ML-торговля на Solana DEX",
    type: "DEX trading / ML pipeline",
    category: "Crypto",
    shortSummary: "R&D-пайплайн для Solana DEX: сбор OHLCV, обучение ML-моделей, стратегия, on-chain исполнение и Telegram-отчёты.",
    problem: "Для проверки стратегий на Solana DEX нужно было вручную собирать данные по пулам, готовить датасеты, запускать бэктесты и отдельно исполнять сделки в кошельке.",
    solution: "Собран pipeline: Raydium + GeckoTerminal данные, PostgreSQL-хранилище, ML-модуль на PyTorch/scikit-learn и слой tx_tools для формирования Solana-транзакций.",
    result: "Проект закрыл полный цикл «данные → модель → сигнал → сделка → отчёт» и стал технической базой для последующих crypto/automation решений.",
    stack: ["Python 3.12", "PyTorch", "scikit-learn", "Raydium API", "Solana RPC", "PostgreSQL", "Docker Compose"],
    metrics: ["LSTM / GRU / CNN / Transformer", "on-chain исполнение", "ежедневный PnL в Telegram"],
    outcomes: ["PyTorch", "on-chain tx", "PnL alerts", "backtest"],
    timeframe: "R&D / технологический кейс",
    keyResult: "Проверка гипотезы проходит от данных до on-chain сделки в одном пайплайне.",
    context: [
      "Для DEX-стратегий нужно было собирать пулы, свечи, датасеты и бэктесты без ручного копирования.",
      "ML-модели требовали отдельного слоя обучения и сравнения результатов.",
      "Исполнение сделки в кошельке вручную ломало идею автономной стратегии.",
    ],
    modules: [
      "Raydium + GeckoTerminal клиенты для пулов и OHLCV.",
      "PostgreSQL-хранилище датасетов и истории.",
      "ML-модуль с LSTM, GRU, CNN, Transformer и Random Forest.",
      "tx_tools для формирования Solana-транзакций и Telegram-отчёты.",
    ],
    integrations: ["Raydium API", "GeckoTerminal API", "Solana RPC", "Telegram Bot API", "PostgreSQL"],
    architecture: ["Raydium / GeckoTerminal", "data collector", "PostgreSQL", "PyTorch models", "strategy", "Solana RPC", "Telegram"],
    media: [
      { title: "ML и рынок", items: ["OHLCV signals", "training curves", "models compare"] },
      { title: "CLI", items: ["collect pools", "train model", "backtest report"] },
      { title: "Техника", items: ["LSTM snippet", "strategy threshold", "Raydium tx"] },
    ],
    challenges: [
      { title: "Данные до модели", text: "Сбор рынка и обучение разделены, чтобы модель можно было менять без переписывания API-клиентов." },
      { title: "Разные модели", text: "Пайплайн допускает сравнение нескольких архитектур и порогов под разные рыночные режимы." },
      { title: "On-chain исполнение", text: "tx_tools вынесены в отдельный слой, чтобы стратегия не зависела от деталей Solana RPC." },
    ],
    resultDetails: [
      "Пайплайн стал базой для дальнейших crypto automation решений.",
      "Модели и пороги можно менять без слома архитектуры.",
      "Telegram-отчёты дают наблюдаемость без отдельной панели.",
    ],
    screenshotFolder: "public/cases/eps-bot",
    coverImage: "/cases/eps-bot/preview_sq.png",
    coverAlt: "Solana trading bot Telegram alerts and backend architecture preview",
    estimatorPreset: {
      type: "crypto-trading-bot",
      complexity: "system",
      modules: [
        "dex",
        "price-monitoring",
        "signals",
        "telegram-alerts",
        "trade-logs",
        "risk-limits",
      ],
    },
    preview: {
      kind: "chart",
      accent: "#8b5cf6",
      label: "LSTM-v3",
      stats: ["OHLCV", "ML", "Solana"],
    },
  },
  {
    slug: "frax-redesign",
    projectUrl: "",
    title: "Frax — редизайн криптообменника на WordPress",
    type: "Crypto exchanger redesign",
    category: "Web",
    shortSummary: "Редизайн фронтенда обменника на WordPress: новый UI, мобильный калькулятор и аккуратная интеграция поверх существующего плагина.",
    problem: "Рабочий обменник на WordPress визуально устарел, мобильный UX калькулятора проседал, но переписывать обменный плагин было слишком рискованно.",
    solution: "Перевёрстаны WordPress-шаблоны, собрана новая визуальная система, переработан главный экран и калькулятор, а выводы плагина встроены в новую разметку через хуки и шорткоды.",
    result: "Production-сайт стал соответствовать ожиданиям рынка обменников, мобильный сценарий стал рабочим, а существующая backend-логика осталась стабильной.",
    stack: ["WordPress", "PHP", "CSS", "JavaScript", "Exchange plugin"],
    metrics: ["без замены CMS", "мобильный UX калькулятора", "production rollout"],
    outcomes: ["редизайн", "mobile UX", "WordPress", "без миграции"],
    timeframe: "production rollout",
    keyResult: "Новый интерфейс выкачен без замены CMS и без риска для обменного backend.",
    context: [
      "У заказчика уже был рабочий обменник на WordPress со специализированным плагином.",
      "Плагин хранил курсы, направления, лимиты, заявки и партнёрские API.",
      "Полная миграция была дорогой и рискованной, поэтому нужно было улучшить frontend поверх текущей логики.",
    ],
    modules: [
      "Новая визуальная система и переработанные WordPress-шаблоны.",
      "Главный экран и калькулятор обмена с мобильной адаптацией.",
      "Интеграция выводов плагина через хуки и шорткоды.",
      "CSS/JS-слой без тяжёлых сборщиков, чтобы сайт было проще поддерживать.",
    ],
    integrations: ["WordPress", "Exchange plugin", "PHP templates", "shortcodes", "CSS/JS"],
    architecture: ["Пользователь", "WordPress theme", "shortcode wrapper", "exchange plugin", "orders / rates", "production site"],
    media: [
      { title: "Before / after", items: ["старый hero", "новый hero", "мобильный калькулятор"] },
      { title: "Новый дизайн", items: ["направления обмена", "форма заявки", "FAQ / правила"] },
      { title: "Техника", items: ["PHP shortcode wrapper", "CSS component layer"] },
    ],
    challenges: [
      { title: "Не сломать плагин", text: "Бизнес-логика не переписывалась: новая разметка оборачивала существующие выводы." },
      { title: "Мобильный калькулятор", text: "Поля, кнопки и порядок действий переработаны под сценарий одной рукой." },
      { title: "Поддержка заказчиком", text: "Стили и шаблоны оставлены в простом WordPress-слое без лишней сборочной инфраструктуры." },
    ],
    resultDetails: [
      "Сайт стал визуально ближе к рынку обменников 2026 года.",
      "Мобильный поток заявки стал понятнее и крупнее.",
      "Существующий backend остался стабильным и знакомым заказчику.",
    ],
    screenshotFolder: "public/cases/frax-redesign",
    coverImage: "/cases/frax-redesign/preview_sq.png",
    coverAlt: "Frax real estate website redesign before and after preview",
    estimatorPreset: {
      type: "web-service",
      complexity: "business",
      modules: ["frontend", "backend-api", "database-web", "admin", "dashboard", "external-integrations"],
    },
    preview: {
      kind: "web",
      accent: "#22c55e",
      label: "before / after",
      stats: ["WP", "mobile", "plugin"],
    },
  },
  {
    slug: "tech-rise-academy",
    projectUrl: "",
    title: "Tech Rise Academy — лендинг с заявками в Telegram",
    type: "Landing / lead automation",
    category: "Backend",
    shortSummary: "Многостраничный лендинг академии с FastAPI endpoint: заявки валидируются и за несколько секунд уходят владельцу в Telegram.",
    problem: "Академии нужен был быстрый сайт без CRM: заявки терялись в директе и почте, а скорость ответа в первые минуты критична для продажи курса.",
    solution: "Собраны главная и страницы курсов на Vanilla HTML/CSS/JS, общий config.js для контента и FastAPI endpoint, который валидирует заявку и отправляет её владельцу через Telegram Bot API.",
    result: "Сайт задеплоен на собственный домен, заявки приходят в Telegram за несколько секунд, а контакты и ссылки можно менять без участия разработчика.",
    stack: ["HTML", "CSS", "JavaScript", "FastAPI", "Pydantic", "Telegram Bot API", "Nginx"],
    metrics: ["без CRM и базы", "заявка в Telegram", "Docker Compose deployment"],
    outcomes: ["лиды", "FastAPI", "Telegram", "без CRM"],
    timeframe: "быстрый запуск на домене",
    keyResult: "Заявка попадает владельцу в Telegram через несколько секунд после формы.",
    context: [
      "У академии не было сайта и отдельного бюджета на CRM.",
      "Лиды терялись между директом, почтой и ручными сообщениями.",
      "Нужна была лёгкая связка, которую можно поддерживать без сложного backend и базы.",
    ],
    modules: [
      "Главная и две страницы курсов на Vanilla HTML/CSS/JS.",
      "Общий config.js для ссылок, контактов и оферты.",
      "FastAPI endpoint /api/lead с Pydantic-валидацией.",
      "Отправка карточки заявки через Telegram Bot API.",
    ],
    integrations: ["FastAPI", "Pydantic", "Telegram Bot API", "Docker Compose", "Nginx"],
    architecture: ["Пользователь", "landing form", "FastAPI /api/lead", "Telegram Bot API", "чат владельца"],
    media: [
      { title: "Лендинг", items: ["hero", "программы", "страница курса", "форма заявки"] },
      { title: "Поток заявки", items: ["карточка лида в Telegram", "config.js", "lead handler"] },
      { title: "Техника", items: ["Docker Compose", "Nginx", "FastAPI endpoint"] },
    ],
    challenges: [
      { title: "Без CRM", text: "Telegram-чат стал единым inbox для заявок, без отдельной базы и платной CRM." },
      { title: "Правки без разработчика", text: "Контакты, ссылки и оферта вынесены в config.js." },
      { title: "Быстрая реакция", text: "Backend отправляет заявку владельцу сразу после валидации формы." },
    ],
    resultDetails: [
      "Владелец получает заявку сразу в привычном Telegram.",
      "Контентные изменения делаются точечно в конфиге.",
      "Сайт работает без тяжёлого фреймворка и отдельной CRM.",
    ],
    screenshotFolder: "public/cases/tech-rise-academy",
    coverImage: "/cases/tech-rise-academy/preview_sq.png",
    coverAlt: "TechRise Academy landing page and Telegram lead bot preview",
    estimatorPreset: {
      type: "web-service",
      complexity: "mvp",
      modules: ["frontend", "backend-api", "external-integrations"],
    },
    preview: {
      kind: "dashboard",
      accent: "#06b6d4",
      label: "lead inbox",
      stats: ["FastAPI", "Telegram", "no CRM"],
    },
  },
  {
    slug: "gym-progres",
    projectUrl: "",
    title: "gym_progres — трекер тренировок с auto-save",
    type: "Niche web app",
    category: "Backend",
    shortSummary: "Личный web-трекер тренировок: SSR на FastAPI, Alpine.js auto-save, публичные шаблоны и история прогресса.",
    problem: "Заметки и таблицы быстро превращались в хаос, а готовые фитнес-приложения были перегружены рекламой, подписками и лишними сценариями.",
    solution: "FastAPI отдаёт SSR-страницы на Jinja2, Alpine.js отправляет debounced JSON-запросы, упражнения хранятся в расширяемом каталоге, а шаблоны импортируются по публичной ссылке.",
    result: "Пользователь записывает подходы без кнопки «Сохранить», видит историю прогресса и может импортировать тренировочный шаблон без дублей.",
    stack: ["Python 3.12", "FastAPI", "Jinja2", "Alpine.js", "SQLAlchemy", "PostgreSQL", "Docker Compose"],
    metrics: ["auto-save без кнопки", "публичные шаблоны", "40+ упражнений в каталоге"],
    outcomes: ["auto-save", "SSR", "шаблоны", "графики"],
    timeframe: "собственный продукт",
    keyResult: "Тренировку можно вести в одном экране: вводишь подходы, данные сохраняются сами.",
    context: [
      "Заметки и таблицы плохо подходят для регулярной записи подходов и прогресса.",
      "Готовые приложения перегружены лишними сценариями и подписками.",
      "Нужен был лёгкий продукт с публичными шаблонами и сохранением без кнопки.",
    ],
    modules: [
      "FastAPI + Jinja2 SSR для страниц приложения.",
      "Alpine.js островки с debounced auto-save в JSON API.",
      "Каталог упражнений из data/exercises.json с расширением без перезапуска.",
      "Публичные шаблоны тренировок и идемпотентный импорт.",
    ],
    integrations: ["FastAPI", "Jinja2", "Alpine.js", "PostgreSQL", "Docker Compose"],
    architecture: ["Пользователь", "SSR page", "Alpine.js", "JSON API", "PostgreSQL", "exercise catalog"],
    media: [
      { title: "Web app", items: ["dashboard", "workout form", "exercise catalog", "progress chart"] },
      { title: "Шаблоны", items: ["public template", "import confirm", "share modal"] },
      { title: "Техника", items: ["auto-save snippet", "template import", "архитектура SSR + JSON"] },
    ],
    challenges: [
      { title: "Auto-save без сюрпризов", text: "Изменения дебаунсятся на клиенте и уходят в JSON API, поэтому пользователь просто вводит данные." },
      { title: "Шаблоны без дублей", text: "Импорт сделан идемпотентным: уже существующие элементы не размножаются." },
      { title: "Нишевое приложение без React", text: "SSR + Alpine.js дали быстрый интерфейс без тяжёлого клиентского стека." },
    ],
    resultDetails: [
      "Подходы сохраняются без кнопки и ручного контроля.",
      "Шаблонами можно делиться публичной ссылкой.",
      "История и графики дают быстрый обзор прогресса.",
    ],
    screenshotFolder: "public/cases/gym-progres",
    coverImage: "/cases/gym-progres/preview_sq.png",
    coverAlt: "Gym Progres training tracker and analytics dashboard preview",
    estimatorPreset: {
      type: "web-service",
      complexity: "business",
      modules: ["frontend", "backend-api", "auth", "database-web", "dashboard"],
    },
    preview: {
      kind: "dashboard",
      accent: "#84cc16",
      label: "auto-save",
      stats: ["SSR", "templates", "charts"],
    },
  },
  {
    slug: "skillup",
    projectUrl: "",
    title: "SkillUp — AI-платформа обучения",
    type: "AI education product",
    category: "AI",
    shortSummary: "Full-stack AI-сервис: онбординг, генерация персонального roadmap, дерево прогресса, Celery/Redis и Anthropic API.",
    problem: "Обычные AI-ответы дают хаотичные стены текста, а готовые roadmap-сайты не учитывают текущий уровень и цель конкретного пользователя.",
    solution: "Собран full-stack продукт: Next.js frontend, FastAPI backend, Celery + Redis для AI-задач и Anthropic API для онбординга, плана, объяснений и квизов.",
    result: "Пользователь за несколько минут получает персональный 4-уровневый roadmap, где прогресс отображается как интерактивное дерево с активными и закрытыми узлами.",
    stack: ["Next.js", "TypeScript", "FastAPI", "Celery", "Redis", "PostgreSQL", "Anthropic API"],
    metrics: ["4 уровня плана", "AI-онбординг и квизы", "Docker + Nginx deployment"],
    outcomes: ["AI roadmap", "Celery", "квизы", "дерево"],
    timeframe: "собственный AI-продукт",
    keyResult: "Пользователь получает персональный план обучения и видит прогресс как интерактивное дерево.",
    context: [
      "Обычные AI-ответы плохо превращаются в последовательный план действий.",
      "Готовые roadmap-сайты слишком общие и не учитывают уровень пользователя.",
      "Нужен был продуктовый AI-flow: онбординг, генерация плана, прогресс, объяснения и квизы.",
    ],
    modules: [
      "Next.js frontend с интерактивным деревом прогресса.",
      "FastAPI backend с PostgreSQL и асинхронной бизнес-логикой.",
      "Celery + Redis для тяжёлых AI-задач и прогресса генерации.",
      "Anthropic API для онбординга, плана, объяснений и квизов.",
    ],
    integrations: ["Anthropic API", "Celery", "Redis", "PostgreSQL", "Docker Compose", "Nginx"],
    architecture: ["Пользователь", "Next.js", "FastAPI", "PostgreSQL", "Celery / Redis", "Anthropic API"],
    media: [
      { title: "Продукт", items: ["онбординг", "построение плана", "дерево", "квиз"] },
      { title: "AI pipeline", items: ["onboarding chat", "plan generation", "node explanation", "quiz generation"] },
      { title: "Техника", items: ["Celery task", "canvas layout", "Claude API call"] },
    ],
    challenges: [
      { title: "План вместо стены текста", text: "AI-ответ структурируется в 4 уровня с узлами, статусами и порядком прохождения." },
      { title: "Долгие AI-задачи", text: "Генерация вынесена в Celery, чтобы фронт показывал прогресс и не зависал." },
      { title: "Гибкий layout дерева", text: "Позиции узлов считаются на фронте из tier и order_index, без хранения координат в БД." },
    ],
    resultDetails: [
      "Пользователь проходит онбординг и получает персональный roadmap за несколько минут.",
      "Прогресс виден визуально через активные и закрытые узлы.",
      "AI-пайплайн разделён на генерацию плана, объяснения и квизы.",
    ],
    screenshotFolder: "public/cases/skillup",
    coverImage: "/cases/skillup/preview_sq.png",
    coverAlt: "SkillUp AI learning tree and onboarding chat preview",
    estimatorPreset: {
      type: "ai-integration",
      complexity: "system",
      modules: [
        "llm-api",
        "content-generation",
        "ai-assistant",
        "existing-product",
        "admin-ai",
        "history-logs",
      ],
    },
    preview: {
      kind: "tree",
      accent: "#c084fc",
      label: "AI roadmap",
      stats: ["4 tiers", "Celery", "Claude"],
    },
  },
];

export const packages = [
  {
    title: "Базовый",
    subtitle: "Небольшой Telegram-бот, MVP или одна интеграция.",
    price: `от ${formatDiscountedRubPrice(48000)}`,
    firstProjectPrice: `первый проект от ${formatDiscountedRubPrice(38400)}`,
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
    price: `от ${formatDiscountedRubPrice(112000)}`,
    firstProjectPrice: `первый проект от ${formatDiscountedRubPrice(89600)}`,
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
    price: `от ${formatDiscountedRubPrice(224000)}`,
    firstProjectPrice: `первый проект от ${formatDiscountedRubPrice(179200)}`,
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
  price: `от ${formatDiscountedRubPrice(10000)} / месяц`,
  description: "Фикс багов, небольшие доработки, обновление интеграций, контроль ошибок, помощь после релиза и планирование следующих итераций.",
};

export const budgetGuides = [
  {
    title: "Небольшой бот / скрипт",
    price: `от ${formatDiscountedRubPrice(15000)}`,
    description: "Простая автоматизация, уведомления, базовая логика.",
  },
  {
    title: "Бизнес-бот / парсер / backend-модуль",
    price: `от ${formatDiscountedRubPrice(40000)}`,
    description: "База данных, роли, интеграции, API, регулярные задачи.",
  },
  {
    title: "Mini App / AI-сервис / система под ключ",
    price: `от ${formatDiscountedRubPrice(100000)}`,
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

export const siteMeta = {
  title: "Рамиль Канеев - AI, backend и Telegram-разработка под ключ",
  description:
    "Telegram-боты, Mini Apps, AI/ML-интеграции, backend API, парсинг, web-сервисы, crypto/trading-инструменты, деплой и поддержка.",
  keywords: [
    "Рамиль Канеев",
    "mchomak",
    "AI разработчик",
    "backend разработка",
    "Telegram бот",
    "Telegram Mini App",
    "FastAPI",
    "AI интеграции",
    "парсинг",
    "crypto bot",
  ],
  openGraphTitle:
    "Рамиль Канеев - AI, backend и Telegram-разработка",
  openGraphDescription:
    "Telegram-боты, Mini Apps, AI-модули, backend-системы, парсеры и интеграции от MVP до production.",
};

export const ui = {
  brandName: "Рамиль Канеев",
  header: {
    backToTop: "Наверх",
    navAria: "Главная навигация",
    contactCta: "Telegram",
    languageAria: "Переключить язык",
    languageNames: {
      ru: "Русский",
      en: "English",
    },
  },
  boot: {
    ariaLabel: "Сборка интерфейса",
    title: "Собираю интерфейс как production-контур",
    logs: [
      "loading python backend contour",
      "mapping bot scenarios",
      "linking payments, api, queues",
      "starting ai gateway",
      "deploy surface ready",
    ],
  },
  hero: {
    badge: "Telegram / AI / backend / automation",
    headline: ["AI, backend и", "Telegram-разработка", "под ключ"],
    description:
      "Собираю Telegram-ботов, Mini Apps, backend-системы, AI-модули, парсеры и интеграции — от MVP до рабочего продукта с админкой, платежами и аналитикой.",
    primaryCta: "Рассчитать проект",
    secondaryCta: "Смотреть кейсы",
    bottomNote: "Architecture / build / launch / support",
  },
  liveTelemetry: {
    title: "Live product contour",
    status: "online",
    events: [
      {
        label: "Telegram webhook",
        value: "18 ms",
        tone: "text-emerald-200",
        log: "event.message -> scenario.router -> state.commit",
      },
      {
        label: "Payment callback",
        value: "verified",
        tone: "text-cyan-200",
        log: "provider.webhook -> signature.check -> order.paid",
      },
      {
        label: "LLM guardrail",
        value: "scoped",
        tone: "text-amber-200",
        log: "query -> retrieval -> policy.limit -> answer",
      },
      {
        label: "Deploy health",
        value: "green",
        tone: "text-emerald-200",
        log: "docker.restart=0 errors=0 queue.depth=3",
      },
    ],
    pipelineTitle: "Bot to payment pipeline",
    pipeline: [
      "Telegram Bot",
      "Payments",
      "FastAPI",
      "PostgreSQL",
      "Redis Queue",
      "AI Gateway",
    ],
  },
  specialization: {
    eyebrow: "С какими задачами я помогаю",
    title:
      "Продуктовая линейка без хаоса: Telegram, AI, backend, web, parsing и crypto",
    description:
      "Каждое направление упаковано вокруг результата для бизнеса: заявки, платежи, данные, автоматизация, интерфейсы, интеграции и запуск.",
    taskLabel: "task",
    audienceLabel: "Бизнес-задача:",
    includesLabel: "Что можно собрать",
    techLabel: "Стек / интеграции",
  },
  trust: {
    eyebrow: "Уже в работе",
    title:
      "Перед расчётом — быстрый срез задач, которые уже похожи на реальные production-проекты",
    description:
      "Это не витрина всех кейсов, а короткое подтверждение опыта по типам решений, которые чаще всего приходят в заявку.",
    proofLabel: "proof",
  },
  configurator: {
    eyebrow: "Конфигуратор заявки",
    title: "Соберите конфигурацию проекта",
    description:
      "Выберите тип решения, модули и сроки — сайт покажет ориентир по бюджету и сформирует заявку.",
  },
  estimator: {
    steps: [
      "Тип проекта",
      "Сложность",
      "Модули",
      "Сроки",
      "Контакты",
      "Отправка",
    ],
    moneyLocale: "ru-RU",
    currency: "₽",
    currencyPosition: "suffix",
    budgetStep: 5000,
    budgetMin: 15000,
    budgetGap: 10000,
    dayShort: "дн.",
    timelineSuffix: "рабочих дней",
    kicker: "Project config",
    title: "Тип проекта → модули → заявка",
    stepPrefix: "step",
    typeTitle: "Выберите тип решения",
    typeDescription:
      "После выбора типа ниже остаются только релевантные модули.",
    complexityTitle: "Сложность",
    complexityDescription:
      "Это влияет на вилку бюджета и срок: MVP, бизнес-продукт или сложная система.",
    modulesTitle: "Модули",
    modulesDescription: "Показаны опции для категории «{category}».",
    urgencyTitle: "Сроки",
    urgencyDescription:
      "Выберите комфортный темп. Срочность повышает стоимость, но сжимает план работ.",
    contactsTitle: "Контакты и описание",
    contactsDescription:
      "Эти данные попадут в заявку вместе с выбранной конфигурацией и расчётом.",
    fields: {
      name: "Имя",
      namePlaceholder: "Как к вам обращаться",
      telegram: "Telegram",
      email: "Email",
      emailPlaceholder: "необязательно",
      fileUrl: "Ссылка на ТЗ / файл",
      fileUrlPlaceholder: "Google Docs, Figma, архив",
      comment: "Краткое описание задачи",
      commentPlaceholder:
        "Например: нужно сделать мини-приложение для магазина одежды с каталогом, оплатой и реферальной системой.",
    },
    note:
      "Калькулятор показывает ориентир. Финальная стоимость фиксируется после короткого обсуждения задачи, интеграций, дизайна и сроков.",
    submit: "Отправить конфигурацию",
    sendAnother: "Отправить ещё",
    validationError: "Укажите Telegram и коротко опишите задачу.",
    fallbackSubmitError: "Не удалось отправить заявку.",
    unknownSubmitError:
      "Не удалось отправить заявку. Попробуйте написать в Telegram.",
    successDelivered:
      "Заявка отправлена в Telegram. Я вернусь с уточнениями.",
    successStub:
      "Заявка принята. Напишу в Telegram в ближайшее время.",
    estimateLabel: "Предварительная оценка",
    timelineLabel: "Срок:",
    summaryLabels: {
      category: "Категория",
      complexity: "Сложность",
      urgency: "Темп",
    },
    selectedModules: "Выбранные модули",
    noModules:
      "Модули не выбраны. Оценка считается только по базовой разработке.",
    requestFormat: "Формат заявки",
    requestTitle: "Новая заявка с сайта",
    requestOptions: "Опции",
    requestEstimate: "Оценка",
    baseDevelopment: "базовая разработка",
    viewCases: "Смотреть кейсы",
  },
  process: {
    eyebrow: "Как проходит работа",
    title: "После заявки понятно, что происходит дальше",
    description:
      "Процесс снижает неопределённость: сначала конфигурация и уточнение деталей, потом границы MVP, финальная смета, разработка, запуск и поддержка.",
    metrics: [
      { label: "Architecture", value: "схема до кода" },
      { label: "Delivery", value: "итерации и проверки" },
      { label: "Launch", value: "деплой и стабилизация" },
    ],
  },
  cases: {
    eyebrow: "Кейсы",
    title: "Витрина реальных проектов: быстро понять тип задачи и результат",
    description:
      "На главной — короткая подборка из разных типов работ: Telegram, AI, crypto, backend, Mini App и web. Подробности, схемы и технические решения вынесены на отдельную страницу.",
    intro:
      "Карточка показывает задачу, собранные модули и итоговые outcomes. Для подробной доказательной базы откройте кейс целиком.",
    allCases: "Все кейсы",
    carouselAria:
      "Карусель кейсов. Карточки можно вращать мышью или кнопками навигации.",
    controlsAria: "Навигация кейсов",
    previous: "Предыдущий кейс",
    next: "Следующий кейс",
    openCase: "Открыть кейс",
    outcomesAria: "Ключевые модули",
    details: "Подробнее",
    similar: "Хочу похожий проект",
  },
  casesPage: {
    backHome: "На главную",
    eyebrow: "Case proof base",
    title: "Подробные кейсы: контекст, архитектура, сложности и результат",
    description:
      "На главной кейсы работают как витрина. Здесь каждый проект раскрыт как доказательная база: зачем он был нужен, что было собрано, где были технические риски и какой рабочий результат получился после запуска.",
    countLabel: "кейсов",
    countDescription:
      "Telegram-боты, Mini Apps, AI-модули, crypto-автоматизация, backend-сервисы и web-интерфейсы в одном формате.",
    estimateSimilar: "Рассчитать похожий проект",
    navAria: "Навигация по кейсам",
    timeframe: "Сроки",
    keyResult: "Ключевой результат",
    stack: "Стек",
    sections: {
      context: "Контекст задачи",
      modules: "Что было реализовано",
      integrations: "Интеграции и бизнес-логика",
      architecture: "Архитектура / схема работы",
      media: "Скрины / видео / интерфейсы",
      challenges: "Сложности и решения",
      result: "Результат",
    },
    mediaNote: "real или стилизованные mockups",
    outcomes: "outcomes",
    cta: "CTA",
    wantSimilar: "Хочу похожий проект",
    estimateCost: "Рассчитать стоимость",
    openProject: "Открыть проект",
    imageAltSeparator: "—",
  },
  services: {
    eyebrow: "Ориентиры по бюджету",
    title:
      "Короткая рамка цен без конкуренции с калькулятором",
    description:
      "Эти суммы помогают понять порядок бюджета. Точную вилку лучше считать через конфигуратор выше, потому что модули, сроки и интеграции сильно меняют объём.",
    budgetLabel: "budget",
    finalTitle: "Финальная стоимость зависит от деталей",
    finalDescription:
      "Финальная стоимость зависит от сценариев, дизайна, интеграций, платежей, объёма данных и сроков. После запуска можно отдельно подключить поддержку:",
    estimateCta: "Рассчитать проект",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Вопросы, которые лучше закрыть до старта",
    description:
      "Чем точнее на входе сценарии, интеграции и ограничения, тем меньше сюрпризов на этапе разработки.",
  },
  testimonials: {
    eyebrow: "Отзывы",
    title: "Спокойная инженерная работа без лишнего шума",
    description:
      "Формулировки обезличены, но передают типичный запрос: довести продукт до рабочего состояния, а не просто написать отдельный скрипт.",
  },
  finalCta: {
    eyebrow: "Next step",
    title:
      "Опишите задачу — я вернусь с архитектурой, сроками и вилкой бюджета.",
    description:
      "Быстрее всего начать с конфигуратора: он соберёт тип проекта, модули, сроки и контакт в одну заявку. Если вводных мало, можно сразу написать в Telegram.",
    estimateCta: "Рассчитать проект",
    telegramCta: "Написать в Telegram",
    footer: "Python, Telegram bots, AI integrations, backend services.",
  },
  gallery: {
    previous: "Предыдущий скрин",
    next: "Следующий скрин",
    open: "Открыть скрин",
  },
};

export const ruSiteData = {
  meta: siteMeta,
  ui,
  contacts,
  navItems,
  heroMetrics,
  stack,
  specializations,
  proofItems,
  projectTypes: discountedProjectTypes,
  complexityLevels,
  urgencyOptions,
  projectModules: discountedProjectModules,
  cases,
  packages,
  retainer,
  budgetGuides,
  processSteps,
  trustItems,
  testimonials,
  faqs,
};
