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

export const navItems = [
  { label: "Направления", href: "#specialization" },
  { label: "Кейсы", href: "#cases" },
  { label: "Калькулятор", href: "#estimator" },
  { label: "Процесс", href: "#process" },
  { label: "Контакты", href: "#contact" },
];

export const heroMetrics = [
  { value: "5 лет", label: "коммерческой разработки" },
  { value: "30+", label: "ботов, сервисов и интеграций" },
  { value: "3 направления", label: "AI / Telegram / backend и интеграции" },
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
    title: "AI и автоматизация процессов",
    audience: "Убираю ручную рутину: обработку документов, работу с данными, ответы и повторяющиеся действия команды.",
    includes: [],
    tech: "",
    result: "Процесс становится прозрачным, управляемым и не зависит от ручной обработки каждого шага.",
  },
  {
    title: "Telegram-сервисы и Mini Apps",
    audience: "Создаю ботов и мини-приложения для заявок, подписок, продаж, личных кабинетов и поддержки внутри Telegram.",
    includes: [],
    tech: "",
    result: "Клиент проходит нужный сценарий в привычном канале, а команда получает удобный инструмент управления.",
  },
  {
    title: "Backend, интеграции и административные панели",
    audience: "Собираю серверную основу, связываю внешние сервисы и делаю панели, в которых удобно работать с данными и статусами.",
    includes: [],
    tech: "",
    result: "Получается надёжная система, которую можно развивать без хаоса в процессах и данных.",
  },
];

export const proofItems = [
  {
    title: "Мини-приложение Telegram",
    summary: "Каталог, оплаты, приглашение друзей, панель управления и вход через Telegram.",
    tags: ["Mini App", "payments", "admin"],
  },
  {
    title: "Сервис с нейросетью",
    summary: "Создание структуры, тесты, обработка данных и встраивание в продукт.",
    tags: ["OpenAI / Claude", "RAG", "logs"],
  },
  {
    title: "Крипто-бот",
    summary: "Отслеживание цен, сигналы, подключение к биржам, ограничения по риску и оповещения в Telegram.",
    tags: ["Bybit API", "signals", "alerts"],
  },
  {
    title: "Серверная система",
    summary: "База данных, роли, серверная логика, панель управления, статусы и запуск на сервере.",
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
    id: "ai-integration",
    label: "AI и автоматизация процессов",
    description: "Обработка документов, работа с данными, AI-сценарии и регулярные процессы без ручной рутины.",
    baseLow: 60000,
    baseHigh: 105000,
    daysLow: 10,
    daysHigh: 18,
    defaultModules: ["llm-api", "history-logs", "admin-ai"],
  },
  {
    id: "telegram-mini-app",
    label: "Telegram-сервис или Mini App",
    description: "Боты и приложения внутри Telegram для заявок, подписок, продаж, оплат и личных кабинетов.",
    baseLow: 70000,
    baseHigh: 115000,
    daysLow: 12,
    daysHigh: 20,
    defaultModules: ["database", "admin", "payments", "profile"],
  },
  {
    id: "web-service",
    label: "Backend, интеграции и админ-панели",
    description: "Серверная логика, интеграции, базы данных, личные кабинеты и рабочие панели для команды.",
    baseLow: 75000,
    baseHigh: 130000,
    daysLow: 14,
    daysHigh: 24,
    defaultModules: ["frontend", "backend-api", "auth", "database-web"],
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
    label: "Первая версия",
    description: "Один главный сценарий, минимум ролей и подключений.",
    priceFactor: 0.82,
    daysFactor: 0.86,
  },
  {
    id: "business",
    label: "Бизнес-продукт",
    description: "Несколько сценариев, панель управления, данные и работа в реальных условиях.",
    priceFactor: 1,
    daysFactor: 1,
  },
  {
    id: "system",
    label: "Сложная система",
    description: "Много ролей, подключений, статусов, платежей или логики с искусственным интеллектом и криптой.",
    priceFactor: 1.32,
    daysFactor: 1.24,
  },
];

export const urgencyOptions = [
  {
    id: "flexible",
    label: "Гибкий старт",
    description: "Можно спокойно уточнить детали и работать без жёсткого срока.",
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
    { id: "admin", label: "Панель управления", description: "Операторы, настройки, таблицы, ручные действия.", price: 26000, days: 4 },
    { id: "payments", label: "Платежи картой", description: "Счета, статусы оплат и автоматическая проверка платежа.", price: 24000, days: 4 },
    { id: "telegram-stars", label: "Оплата звёздами Telegram", description: "Оплата звёздами Telegram и корректная обработка платежей.", price: 18000, days: 3 },
    { id: "crypto-payments", label: "Крипто-платежи", description: "Приём оплаты криптовалютой через CryptoBot или свой сценарий.", price: 26000, days: 4 },
    { id: "referral", label: "Приглашение друзей", description: "Приглашения, бонусы, лимиты и начисления.", price: 18000, days: 3 },
    { id: "profile", label: "Личный кабинет", description: "Профиль, баланс, подписка, история заказов.", price: 18000, days: 3 },
    { id: "notifications", label: "Уведомления", description: "Системные сообщения, оповещения администраторам, напоминания.", price: 9000, days: 1 },
    { id: "analytics", label: "Аналитика", description: "Сводки, продажи, выгрузки и ключевые события.", price: 14000, days: 2 },
    { id: "external-api", label: "Связь с внешним сервисом", description: "CRM, платёжный сервис, каталог или другой сторонний сервис.", price: 22000, days: 4 },
    { id: "deploy", label: "Запуск на сервере", description: "Размещение на сервере, базовые журналы работы и инструкция.", price: 12000, days: 2 },
  ],
  "telegram-mini-app": [
    { id: "database", label: "База данных", description: "Пользователи, товары, заявки, платежи и статусы.", price: 14000, days: 2 },
    { id: "admin", label: "Панель управления", description: "Каталог, заявки, пользователи и настройки.", price: 28000, days: 5 },
    { id: "payments", label: "Платежи картой", description: "Оплата прямо в приложении, автоматическая проверка и статусы.", price: 26000, days: 4 },
    { id: "telegram-stars", label: "Оплата звёздами Telegram", description: "Звёзды, лимиты, чеки и обработка оплат Telegram.", price: 18000, days: 3 },
    { id: "crypto-payments", label: "Крипто-платежи", description: "Оплата криптовалютой: адреса, статусы и уведомления.", price: 28000, days: 4 },
    { id: "referral", label: "Приглашение друзей", description: "Ссылки, бонусы, уровни и защита от накруток.", price: 18000, days: 3 },
    { id: "profile", label: "Личный кабинет", description: "Профиль, история, баланс, избранное или заказы.", price: 20000, days: 3 },
    { id: "notifications", label: "Уведомления", description: "Сообщения в бот, статусы заявок и оповещения администраторам.", price: 10000, days: 1 },
    { id: "analytics", label: "Аналитика", description: "Путь клиента, заявки, платежи, выгрузки и сводки.", price: 16000, days: 2 },
    { id: "external-api", label: "Связь с внешним сервисом", description: "Каталог, CRM, склад, обменник или приём платежей.", price: 24000, days: 4 },
    { id: "deploy", label: "Запуск на сервере", description: "Сборка, размещение на сервере и рабочий запуск.", price: 14000, days: 2 },
  ],
  "ai-integration": [
    { id: "llm-api", label: "Подключение ChatGPT / Claude", description: "Подключение нейросети, лимиты, права доступа и контроль ошибок.", price: 22000, days: 3 },
    { id: "rag", label: "База знаний по вашим документам", description: "Загрузка документов, поиск по ним и ответы со ссылкой на источник.", price: 42000, days: 7 },
    { id: "documents", label: "Обработка документов", description: "PDF, таблицы, сортировка и извлечение нужных данных.", price: 28000, days: 5 },
    { id: "classification", label: "Сортировка текстов", description: "Темы, статусы, распределение по категориям и автопроверки.", price: 20000, days: 3 },
    { id: "content-generation", label: "Создание текстов", description: "Шаблоны, черновики и контроль качества результата.", price: 22000, days: 3 },
    { id: "ai-assistant", label: "Умный помощник", description: "Диалог, память, навыки, права доступа и ограничения.", price: 32000, days: 5 },
    { id: "existing-product", label: "Встраивание в ваш продукт", description: "Подключение к вашему сервису, интерфейс и безопасное встраивание.", price: 28000, days: 5 },
    { id: "admin-ai", label: "Панель управления", description: "Настройки ответов, лимиты, пользователи и проверка работы.", price: 24000, days: 4 },
    { id: "history-logs", label: "История и журналы", description: "Диалоги, события, ошибки, проверка и выгрузки.", price: 14000, days: 2 },
  ],
  "parser-automation": [
    { id: "single-site", label: "Один сайт", description: "Стабильный сбор данных с одного источника.", price: 12000, days: 2 },
    { id: "multi-site", label: "Несколько сайтов", description: "Сведение данных из разных источников к единому виду.", price: 26000, days: 5 },
    { id: "auth", label: "Вход в личный кабинет", description: "Вход по логину, сохранение сессии и обновление доступа.", price: 18000, days: 3 },
    { id: "captcha", label: "Защита от блокировок", description: "Оценка рисков, обходные сценарии и устойчивая работа.", price: 26000, days: 5 },
    { id: "proxies", label: "Обход ограничений", description: "Смена адресов доступа, обход лимитов и контроль блокировок.", price: 16000, days: 3 },
    { id: "regular-run", label: "Запуск по расписанию", description: "Расписание, повторные попытки, отчёты и контроль сбоев.", price: 12000, days: 2 },
    { id: "export", label: "Выгрузка в Excel / Google Таблицы", description: "Готовые выгрузки в удобном для команды виде.", price: 12000, days: 2 },
    { id: "database", label: "База данных", description: "Хранение истории, удаление повторов, статусы.", price: 14000, days: 2 },
    { id: "telegram-alerts", label: "Уведомления в Telegram", description: "Оповещения о новых данных, ошибках и итогах запуска.", price: 9000, days: 1 },
  ],
  "web-service": [
    { id: "frontend", label: "Видимая часть сайта", description: "Интерфейс сайта: формы, таблицы и экраны.", price: 32000, days: 6 },
    { id: "backend-api", label: "Серверная логика", description: "Логика работы, обработка запросов, статусы и подключения.", price: 30000, days: 6 },
    { id: "auth", label: "Вход и доступ", description: "Вход, сессии, права доступа и безопасность.", price: 20000, days: 3 },
    { id: "roles", label: "Роли пользователей", description: "Администратор, оператор, клиент и ограничения действий.", price: 18000, days: 3 },
    { id: "database-web", label: "База данных", description: "Данные, связи между ними и история изменений.", price: 18000, days: 3 },
    { id: "admin", label: "Панель управления", description: "Управление данными, фильтры, действия и выгрузки.", price: 28000, days: 5 },
    { id: "dashboard", label: "Сводки и аналитика", description: "Показатели, графики, сводки и оперативный контроль.", price: 24000, days: 4 },
    { id: "payments", label: "Платежи картой", description: "Счета, статусы оплат и финансовые события.", price: 26000, days: 4 },
    { id: "external-integrations", label: "Связь с другими сервисами", description: "CRM, учётные системы, Telegram, таблицы или другие сервисы.", price: 24000, days: 4 },
  ],
  "crypto-trading-bot": [
    { id: "exchange-api", label: "Подключение к биржам", description: "Получение данных и проведение сделок, лимиты и обработка ошибок.", price: 28000, days: 5 },
    { id: "dex", label: "Биржи в блокчейне (Solana, Ethereum)", description: "Данные из блокчейна, подключение к биржам и проведение сделок.", price: 42000, days: 8 },
    { id: "price-monitoring", label: "Отслеживание цен", description: "Сканирование рынков, фильтры, частота и хранение данных.", price: 20000, days: 3 },
    { id: "signals", label: "Торговые сигналы", description: "Условия входа, правила, фильтры и тестовые режимы.", price: 26000, days: 5 },
    { id: "telegram-alerts", label: "Уведомления в Telegram", description: "Сигналы, сделки, ошибки и ежедневные отчёты.", price: 9000, days: 1 },
    { id: "crypto-payments", label: "Крипто-платежи", description: "Приём платежей, статусы, проверки и уведомления.", price: 26000, days: 4 },
    { id: "trade-logs", label: "Журнал сделок", description: "История сделок, прибыль и убытки, тестовый режим и выгрузки.", price: 16000, days: 3 },
    { id: "risk-limits", label: "Ограничения по риску", description: "Лимиты на сделки, стоп-сигналы, отключение и защита от повторов.", price: 24000, days: 4 },
  ],
  "not-sure": [
    { id: "discovery", label: "Разбор задачи", description: "Разбор цели, сценариев, рисков и ограничений.", price: 8000, days: 1 },
    { id: "mvp-scope", label: "Границы первой версии", description: "Что делаем в первой версии и что оставляем на потом.", price: 10000, days: 2 },
    { id: "architecture", label: "Схема решения", description: "Данные, роли, подключения и план развития.", price: 14000, days: 2 },
    { id: "prototype", label: "Набросок решения", description: "Быстрый набросок решения — кликабельный или текстом.", price: 16000, days: 3 },
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
    title: "Subscription Bot — продажа подписок с автоматической выдачей доступа",
    type: "Subscription automation",
    category: "Telegram",
    shortSummary: "Telegram-бот для продажи подписок: тарифы, четыре способа оплаты, автоматическая выдача доступа и панель управления для операторов.",
    problem: "Заявки, платежи и выдача доступа велись вручную в чате: клиенты ждали оператора, тарифы путались, а с ростом аудитории ручная схема перестала справляться.",
    solution: "Один сервис обслуживает Telegram-бота, приём оплат и панель управления. Покупка идёт пошагово: тариф, локация, оплата и автоматическая выдача доступа.",
    result: "Путь от выбора тарифа до получения доступа проходит без участия человека, а оператор управляет тарифами, платежами, рассылками и спорными случаями из панели управления.",
    stack: ["Python", "aiogram 3", "aiohttp", "SQLAlchemy 2.0 async", "PostgreSQL", "APScheduler", "Docker"],
    metrics: ["4 платёжных провайдера", "автовыдача доступа", "рассылки и напоминания"],
    outcomes: ["платежи картой", "админка", "автовыдача", "рассылки"],
    timeframe: "Первая версия + рабочий запуск",
    keyResult: "Покупка подписки проходит без оператора: от выбора тарифа до выдачи доступа.",
    context: [
      "Заказчику нужна была продажа подписок прямо внутри Telegram, без ручной выдачи доступа в личных сообщениях.",
      "Ручной процесс плохо справлялся с ростом: операторы путали тарифы, локации и статусы платежей.",
      "Простого чат-бота было недостаточно: нужны были приём оплат, панель управления, напоминания и обработка нестандартных ситуаций.",
    ],
    modules: [
      "Пошаговая покупка: тариф, локация, способ оплаты, счёт и выдача доступа.",
      "Панель управления для тарифов, пользователей, платежей, способов оплаты и рассылок.",
      "Автоматические задачи: окончание подписок, напоминания и массовые рассылки.",
      "Быстрая работа за счёт сохранения настроек, которые обновляются при изменениях в панели управления.",
    ],
    integrations: ["Telegram Bot API", "Rapira", "CryptoBot", "ParityPay", "PostgreSQL"],
    architecture: ["Пользователь", "Telegram-бот", "aiohttp backend", "PostgreSQL", "payment webhooks", "админка"],
    media: [
      { title: "Telegram-бот", items: ["главное меню", "тарифы", "выбор провайдера оплаты", "доступ выдан"] },
      { title: "Админка", items: ["платежи по провайдерам", "редактор тарифов", "рассылки", "настройки платёжных систем"] },
      { title: "Техника", items: ["FSM покупки", "задачи APScheduler", "схема webhook-потока"] },
    ],
    challenges: [
      { title: "Несколько способов оплаты", text: "Все платежи приведены к единому виду, чтобы оператор видел статусы одинаково, независимо от способа оплаты." },
      { title: "Автоматическая выдача без хаоса", text: "Покупка разбита на понятные шаги, а доступ выдаётся только после подтверждённой оплаты." },
      { title: "Настройки без участия разработчика", text: "Тарифы, локации и способы оплаты меняются прямо в панели управления, без переустановки." },
    ],
    resultDetails: [
      "Оператор подключается только к спорным случаям и поддержке.",
      "Тарифы, локации и способы оплаты управляются через панель управления.",
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
    title: "SapsanEx — мини-приложение обменника в Telegram",
    type: "Telegram Mini App / exchanger",
    category: "Mini App",
    shortSummary: "Мини-приложение обменника: расчёт курса, создание заявки, отслеживание статуса и уведомления — всё внутри Telegram.",
    problem: "Пользователь приходил из Telegram, уходил на сайт, создавал заявку и проверял статус на отдельной странице — на телефоне люди терялись на каждом переходе.",
    solution: "Собрано мини-приложение, серверный шлюз, Telegram-бот и база данных. Вход выполняется автоматически через Telegram, без отдельного логина, а подключение к сервису обменника спрятано за надёжной прослойкой.",
    result: "Расчёт курса, создание заявки, отслеживание статуса, автоматическая отмена просроченных заявок и уведомления о смене статуса — всё внутри Telegram, без отдельного входа.",
    stack: ["React", "TypeScript", "FastAPI", "aiogram 3", "SQLAlchemy async", "PostgreSQL", "Docker Compose"],
    metrics: ["Telegram WebApp auth", "typed exchanger gateway", "ru/en i18n"],
    outcomes: ["Mini App", "Telegram auth", "API gateway", "статусы"],
    timeframe: "готово к запуску",
    keyResult: "Весь процесс обмена проходит в Telegram, без перехода на внешний сайт.",
    context: [
      "Клиенты приходили из Telegram, но ключевые шаги обмена происходили на внешнем сайте.",
      "На телефоне пользователи терялись на переходах между ботом, браузером и страницей статуса.",
      "Сторонний сервис обменника был неудобен для подключения и не давал аккуратной структуры заявки.",
    ],
    modules: [
      "Мини-приложение с калькулятором, созданием заявки и историей.",
      "Серверный шлюз к сервису обменника с проверкой данных.",
      "Telegram-бот для запуска приложения и уведомлений о смене статуса.",
      "Автоматическая отмена зависших заявок и обновление статуса прямо в приложении.",
    ],
    integrations: ["Telegram WebApp initData", "Premium Exchanger API", "Telegram Bot API", "PostgreSQL"],
    architecture: ["Пользователь", "Telegram WebApp", "React Mini App", "FastAPI gateway", "Premium Exchanger API", "PostgreSQL", "aiogram bot"],
    media: [
      { title: "Mini App", items: ["калькулятор", "подтверждение заявки", "status polling", "история заявок"] },
      { title: "Telegram-уведомления", items: ["создание заявки", "смена статуса", "автоотмена по таймауту"] },
      { title: "Техника", items: ["HMAC initData", "typed API wrapper", "схема WebApp-потока"] },
    ],
    challenges: [
      { title: "Вход без отдельного логина", text: "Вход проходит автоматически и безопасно через Telegram, поэтому пользователю не нужен отдельный аккаунт." },
      { title: "Неудобный внешний сервис", text: "Подключение к сервису обменника спрятано за аккуратной прослойкой, чтобы приложение работало с понятными данными." },
      { title: "Зависшие заявки", text: "Автоматическая задача закрывает просроченные заявки, а пользователь видит актуальный статус прямо в приложении." },
    ],
    resultDetails: [
      "Расчёт, создание и отслеживание заявки остались в Telegram.",
      "Статусы приходят уведомлением от бота и обновляются в приложении.",
      "Собственный журнал заявок хранит историю и снижает зависимость от внешнего сервиса.",
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
    title: "Seedream Bot — примерка одежды нейросетью в Telegram",
    type: "AI bot / e-commerce",
    category: "AI",
    shortSummary: "Telegram-бот для виртуальной примерки: загрузка товара, настройки, нейросеть Seedream, оплата звёздами Telegram и через ЮKassa, плюс панель управления.",
    problem: "Небольшим магазинам дорого снимать каждую вещь на модели, а сторонние сервисы требуют ручной работы и уводят продавца из Telegram.",
    solution: "Бот принимает фото товара, пошагово уточняет настройки, обращается к нейросети Seedream, принимает оплату звёздами Telegram или через ЮKassa и отдаёт результат прямо в чат.",
    result: "Получился законченный продукт для интернет-магазинов: бот, генерация картинок, две системы оплаты и панель управления для пользователей, балансов, тарифов и платежей.",
    stack: ["Python", "aiogram 3", "FastAPI", "Seedream API", "Telegram Stars", "YooKassa", "PostgreSQL"],
    metrics: ["две платёжные дорожки", "админка операторов", "RU/EN локализация"],
    outcomes: ["AI-модуль", "Stars", "YooKassa", "админка"],
    timeframe: "собственный продукт / готов к показу",
    keyResult: "Магазин получает виртуальную примерку и заработок прямо внутри Telegram.",
    context: [
      "Небольшим интернет-магазинам дорого снимать каждую вещь на модели.",
      "Готовые сервисы уводят пользователя из Telegram и требуют ручных действий.",
      "Нужен был полноценный бот: генерация, платежи, баланс, история и панель управления для оператора.",
    ],
    modules: [
      "Пошаговая загрузка товара и выбор настроек.",
      "Подключение к нейросети Seedream для примерки по фото.",
      "Два способа оплаты: звёзды Telegram и ЮKassa.",
      "Панель управления с пользователями, балансами, тарифами и платежами.",
    ],
    integrations: ["Seedream API", "Telegram Stars", "YooKassa", "Telegram Bot API", "PostgreSQL"],
    architecture: ["Пользователь", "aiogram bot", "Seedream service", "payment providers", "PostgreSQL", "FastAPI admin"],
    media: [
      { title: "Telegram-бот", items: ["загрузка товара", "параметры", "AI-результат", "история генераций"] },
      { title: "Платежи", items: ["Stars invoice", "YooKassa checkout", "баланс генераций"] },
      { title: "Админка", items: ["пользователи", "платежи", "тарифы", "ручные начисления"] },
    ],
    challenges: [
      { title: "Нейросеть как продукт, а не демо", text: "Генерация встроена в понятный путь пользователя с балансом, историей и тарифами." },
      { title: "Две кассы в одном боте", text: "Звёзды Telegram удобны для быстрых мелких покупок, а ЮKassa — для пакетов и подписок." },
      { title: "Контроль для оператора", text: "Панель управления позволяет видеть платежи, пользователей и начисления без доступа к базе данных." },
    ],
    resultDetails: [
      "Пользователь получает результат примерки в том же чате Telegram.",
      "Владелец управляет тарифами, балансами и платежами из панели управления.",
      "Решение легко переиспользовать для других сервисов работы с изображениями.",
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
    title: "AI Reply Assistant — Telegram-бот с 7 умными сценариями",
    type: "AI Telegram bot",
    category: "AI",
    shortSummary: "Умный помощник внутри Telegram: семь сценариев, нейросеть GPT-4o, оплата через ЮKassa, приглашение друзей и запасные каналы доступа для стабильной работы.",
    problem: "Пользователю нужен был быстрый помощник внутри Telegram: без ручного копирования в отдельные сервисы и без сбоев из-за нестабильного доступа к нейросети.",
    solution: "Собран бот с семью умными сценариями, оплатой через ЮKassa, программой приглашений и набором запасных каналов доступа к нейросети.",
    result: "Первая версия с оплатой готова к запуску: бот сам выбирает рабочий канал доступа, принимает оплату с чеком и возвращает варианты ответа в одном окне Telegram.",
    stack: ["Python", "aiogram 3", "aiohttp", "OpenAI GPT-4o", "YooKassa", "PostgreSQL", "Docker"],
    metrics: ["7 AI-сценариев", "proxy healthcheck + cooldown", "trial и referral flow"],
    outcomes: ["AI-сценарии", "YooKassa", "proxy pool", "referral"],
    timeframe: "Первая версия готова к запуску",
    keyResult: "Пользователь получает ответы нейросети в Telegram, а доступ к ней идёт через устойчивые запасные каналы.",
    context: [
      "Нужен был умный помощник, который принимает текст или скриншот и возвращает варианты ответа в одном окне.",
      "Ручное копирование в отдельные сервисы тормозило работу и ломало привычный путь в Telegram.",
      "Доступ к нейросети был нестабилен, поэтому простого прямого подключения было недостаточно.",
    ],
    modules: [
      "Семь умных сценариев, каждый со своей подготовкой запроса и разбором ответа.",
      "Настройка тона, роли и имени помощника.",
      "Оплата через ЮKassa, бесплатный пробный период и программа приглашений.",
      "Набор запасных каналов доступа с проверкой работоспособности и отключением медленных.",
    ],
    integrations: ["OpenAI GPT-4o", "YooKassa", "Telegram Bot API", "PostgreSQL", "HTTP proxy pool"],
    architecture: ["Пользователь", "Telegram-бот", "AI router", "proxy pool", "OpenAI", "YooKassa webhook", "PostgreSQL"],
    media: [
      { title: "Telegram-бот", items: ["главное меню", "выбор сценария", "загрузка контекста", "варианты ответа"] },
      { title: "Платежи", items: ["пакеты", "YooKassa checkout", "реферальный экран"] },
      { title: "Техника", items: ["prompt builder", "proxy rotation", "YooKassa webhook"] },
    ],
    challenges: [
      { title: "Нейтральный и понятный интерфейс", text: "Сценарии оформлены как универсальный помощник для переписки, без сомнительных формулировок." },
      { title: "Нестабильный внешний доступ", text: "Система сама выбирает рабочий канал доступа, временно отключает сбойные и обходит медленные." },
      { title: "Понятная оплата", text: "Пробный период, пакеты, чек и приглашения связаны с лимитами пользователя." },
    ],
    resultDetails: [
      "Пользователь остаётся в Telegram и получает варианты ответа без ручного копирования.",
      "Бот сам выбирает рабочий канал доступа к нейросети.",
      "Оплата и бонусы попадают в единый баланс пользователя.",
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
    title: "ByBit Trading Bot — автоматическая торговля криптой 24/7",
    type: "Crypto trading automation",
    category: "Crypto",
    shortSummary: "Автоматическая торговля: подключение к бирже Bybit, стратегия на всплесках объёма и ускорении цены, контроль риска и отчёты в Telegram.",
    problem: "Ручная торговля не успевала следить за более чем 300 парами: нужно одновременно ловить всплески объёма, ускорение цены и контролировать риск по открытым сделкам.",
    solution: "Собрана система из трёх частей: сканер рынка на бирже Bybit, торговая стратегия на всплесках объёма и ускорении цены, и контроль риска со стоп-сигналами, фиксацией прибыли и отчётами в Telegram.",
    result: "Цикл «сканирование → сигнал → сделка → выход» работает сам по себе круглосуточно, а тестовый режим позволяет проверять стратегию на реальных данных без риска для основного счёта.",
    stack: ["Python asyncio", "Bybit API", "CoinPaprika", "PostgreSQL", "Telegram Bot API", "Docker Compose"],
    metrics: ["300+ монет в мониторинге", "автоуправление позициями", "dry-run перед production"],
    outcomes: ["Bybit API", "risk manager", "dry-run", "alerts"],
    timeframe: "готовая к работе система",
    keyResult: "Сканирование, сигнал, вход и выход из сделки работают сами по себе круглосуточно.",
    context: [
      "Стратегия требовала одновременно отслеживать всплески объёма и ускорение цены по сотням пар.",
      "Ручное наблюдение приводило к пропущенным сигналам и эмоциональным решениям.",
      "Нужно было проверить стратегию на реальных данных без риска для основного счёта.",
    ],
    modules: [
      "Сканер рынка на бирже Bybit с отбором по ликвидности.",
      "Торговая стратегия на всплесках объёма и ускорении цены.",
      "Контроль риска: стоп-сигналы, фиксация прибыли и лимит на число открытых сделок.",
      "Уведомления в Telegram о сделках, позициях и дневной прибыли или убытке.",
    ],
    integrations: ["Bybit REST API", "Bybit WebSocket", "CoinPaprika API", "Telegram Bot API", "PostgreSQL"],
    architecture: ["Bybit market data", "scanner", "strategy", "risk manager", "Bybit REST", "PostgreSQL", "Telegram"],
    media: [
      { title: "Стратегия", items: ["volume spike chart", "price acceleration", "таблица позиций"] },
      { title: "Telegram", items: ["сигнал входа", "закрытие позиции", "daily report"] },
      { title: "Техника", items: ["scanner log", "strategy code", "position manager"] },
    ],
    challenges: [
      { title: "Более 300 пар", text: "Сканер отделён от стратегии, чтобы отбор рынка не смешивался с правилами входа в сделку." },
      { title: "Проверка без риска", text: "Тестовый режим позволяет прогнать всё на реальных данных без настоящих сделок на счёте." },
      { title: "Контроль сделок", text: "Система следит за лимитом открытых сделок, стоп-сигналами и условиями выхода." },
    ],
    resultDetails: [
      "Бот не требует постоянного ручного наблюдения за рынком.",
      "Все ключевые события уходят в Telegram.",
      "Тестовый режим снижает риск перед включением реальной торговли.",
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
    title: "EPS Bot — торговля на блокчейне Solana с обучаемыми моделями",
    type: "DEX trading / ML pipeline",
    category: "Crypto",
    shortSummary: "Исследовательская система для бирж в блокчейне Solana: сбор данных о ценах, обучение моделей, стратегия, проведение сделок в блокчейне и отчёты в Telegram.",
    problem: "Чтобы проверять стратегии на биржах в блокчейне Solana, приходилось вручную собирать данные, готовить выборки, прогонять проверки на истории и отдельно проводить сделки в кошельке.",
    solution: "Собрана единая система: сбор данных с бирж, хранилище, обучаемые модели и отдельный слой для проведения сделок в блокчейне Solana.",
    result: "Проект закрыл полный цикл «данные → модель → сигнал → сделка → отчёт» и стал основой для следующих крипто-проектов и автоматизаций.",
    stack: ["Python 3.12", "PyTorch", "scikit-learn", "Raydium API", "Solana RPC", "PostgreSQL", "Docker Compose"],
    metrics: ["LSTM / GRU / CNN / Transformer", "on-chain исполнение", "ежедневный PnL в Telegram"],
    outcomes: ["PyTorch", "on-chain tx", "PnL alerts", "backtest"],
    timeframe: "исследование / технологический проект",
    keyResult: "Проверка идеи проходит от сбора данных до сделки в блокчейне в одной системе.",
    context: [
      "Для торговых стратегий нужно было собирать данные о ценах и выборки и прогонять проверки на истории без ручного копирования.",
      "Обучаемые модели требовали отдельного слоя обучения и сравнения результатов.",
      "Ручное проведение сделок в кошельке ломало идею самостоятельной стратегии.",
    ],
    modules: [
      "Подключения к биржам для сбора данных о ценах.",
      "Хранилище выборок и истории.",
      "Набор обучаемых моделей разных типов.",
      "Слой для проведения сделок в блокчейне Solana и отчёты в Telegram.",
    ],
    integrations: ["Raydium API", "GeckoTerminal API", "Solana RPC", "Telegram Bot API", "PostgreSQL"],
    architecture: ["Raydium / GeckoTerminal", "data collector", "PostgreSQL", "PyTorch models", "strategy", "Solana RPC", "Telegram"],
    media: [
      { title: "ML и рынок", items: ["OHLCV signals", "training curves", "models compare"] },
      { title: "CLI", items: ["collect pools", "train model", "backtest report"] },
      { title: "Техника", items: ["LSTM snippet", "strategy threshold", "Raydium tx"] },
    ],
    challenges: [
      { title: "Сначала данные, потом модель", text: "Сбор данных и обучение разделены, чтобы менять модель без переделки подключений к биржам." },
      { title: "Разные модели", text: "Система позволяет сравнивать несколько моделей и настроек под разные состояния рынка." },
      { title: "Сделки в блокчейне", text: "Проведение сделок вынесено в отдельный слой, чтобы стратегия не зависела от технических деталей блокчейна." },
    ],
    resultDetails: [
      "Система стала основой для следующих крипто-проектов и автоматизаций.",
      "Модели и настройки можно менять, не ломая всю систему.",
      "Отчёты в Telegram дают полную картину без отдельной панели.",
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
    title: "Frax — обновление дизайна криптообменника на WordPress",
    type: "Crypto exchanger redesign",
    category: "Web",
    shortSummary: "Обновление внешнего вида обменника на WordPress: новый дизайн, удобный калькулятор на телефоне и аккуратная доработка поверх существующего плагина.",
    problem: "Рабочий обменник на WordPress выглядел устаревшим, калькулятор на телефоне был неудобным, но переписывать обменный плагин было слишком рискованно.",
    solution: "Переделаны шаблоны страниц, собран новый единый стиль, переработаны главный экран и калькулятор, а данные плагина аккуратно встроены в новый дизайн.",
    result: "Рабочий сайт стал соответствовать ожиданиям рынка обменников, версия для телефона стала удобной, а существующая логика обмена осталась стабильной.",
    stack: ["WordPress", "PHP", "CSS", "JavaScript", "Exchange plugin"],
    metrics: ["без замены CMS", "мобильный UX калькулятора", "production rollout"],
    outcomes: ["редизайн", "mobile UX", "WordPress", "без миграции"],
    timeframe: "запуск на рабочем сайте",
    keyResult: "Новый дизайн запущен без смены платформы и без риска для логики обмена.",
    context: [
      "У заказчика уже был рабочий обменник на WordPress со специализированным плагином.",
      "Плагин хранил курсы, направления, лимиты, заявки и связи с партнёрами.",
      "Полный переезд был дорогим и рискованным, поэтому нужно было обновить внешний вид поверх текущей логики.",
    ],
    modules: [
      "Новый единый стиль и переработанные шаблоны страниц.",
      "Главный экран и калькулятор обмена, удобные на телефоне.",
      "Аккуратное встраивание данных плагина в новый дизайн.",
      "Лёгкий код оформления без сложных инструментов, чтобы сайт было проще поддерживать.",
    ],
    integrations: ["WordPress", "Exchange plugin", "PHP templates", "shortcodes", "CSS/JS"],
    architecture: ["Пользователь", "WordPress theme", "shortcode wrapper", "exchange plugin", "orders / rates", "production site"],
    media: [
      { title: "Before / after", items: ["старый hero", "новый hero", "мобильный калькулятор"] },
      { title: "Новый дизайн", items: ["направления обмена", "форма заявки", "FAQ / правила"] },
      { title: "Техника", items: ["PHP shortcode wrapper", "CSS component layer"] },
    ],
    challenges: [
      { title: "Не сломать плагин", text: "Логика обмена не переписывалась: новый дизайн просто оборачивал существующие данные плагина." },
      { title: "Калькулятор на телефоне", text: "Поля, кнопки и порядок действий переработаны под удобное использование одной рукой." },
      { title: "Поддержка заказчиком", text: "Оформление и шаблоны оставлены простыми, чтобы заказчик мог поддерживать сайт без сложных инструментов." },
    ],
    resultDetails: [
      "Сайт стал визуально ближе к рынку обменников 2026 года.",
      "На телефоне оформление заявки стало понятнее и крупнее.",
      "Существующая логика обмена осталась стабильной и знакомой заказчику.",
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
    title: "Tech Rise Academy — сайт с заявками прямо в Telegram",
    type: "Landing / lead automation",
    category: "Backend",
    shortSummary: "Сайт академии на несколько страниц: заявки проверяются и за несколько секунд уходят владельцу в Telegram.",
    problem: "Академии нужен был быстрый сайт без сложных систем учёта: заявки терялись в личных сообщениях и почте, а скорость ответа в первые минуты решает, купят курс или нет.",
    solution: "Собраны главная и страницы курсов, единый файл настроек для текстов и небольшой сервис, который проверяет заявку и отправляет её владельцу в Telegram.",
    result: "Сайт запущен на своём домене, заявки приходят в Telegram за несколько секунд, а контакты и ссылки можно менять без участия разработчика.",
    stack: ["HTML", "CSS", "JavaScript", "FastAPI", "Pydantic", "Telegram Bot API", "Nginx"],
    metrics: ["без CRM и базы", "заявка в Telegram", "Docker Compose deployment"],
    outcomes: ["лиды", "FastAPI", "Telegram", "без CRM"],
    timeframe: "быстрый запуск на домене",
    keyResult: "Заявка попадает владельцу в Telegram через несколько секунд после формы.",
    context: [
      "У академии не было сайта и отдельного бюджета на систему учёта клиентов.",
      "Заявки терялись между личными сообщениями, почтой и ручной перепиской.",
      "Нужно было лёгкое решение, которое можно поддерживать без сложной серверной части и базы данных.",
    ],
    modules: [
      "Главная и две страницы курсов.",
      "Единый файл настроек для ссылок, контактов и оферты.",
      "Небольшой сервис приёма заявок с проверкой данных.",
      "Отправка готовой карточки заявки в Telegram.",
    ],
    integrations: ["FastAPI", "Pydantic", "Telegram Bot API", "Docker Compose", "Nginx"],
    architecture: ["Пользователь", "landing form", "FastAPI /api/lead", "Telegram Bot API", "чат владельца"],
    media: [
      { title: "Лендинг", items: ["hero", "программы", "страница курса", "форма заявки"] },
      { title: "Поток заявки", items: ["карточка лида в Telegram", "config.js", "lead handler"] },
      { title: "Техника", items: ["Docker Compose", "Nginx", "FastAPI endpoint"] },
    ],
    challenges: [
      { title: "Без системы учёта", text: "Чат в Telegram стал единым местом для всех заявок, без отдельной базы и платных сервисов учёта." },
      { title: "Правки без разработчика", text: "Контакты, ссылки и оферта вынесены в отдельный файл настроек." },
      { title: "Быстрая реакция", text: "Заявка уходит владельцу сразу после проверки формы." },
    ],
    resultDetails: [
      "Владелец получает заявку сразу в привычном Telegram.",
      "Изменения в текстах делаются точечно в файле настроек.",
      "Сайт работает без тяжёлых технологий и отдельной системы учёта.",
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
    title: "gym_progres — трекер тренировок с автосохранением",
    type: "Niche web app",
    category: "Backend",
    shortSummary: "Личный сайт для учёта тренировок: автосохранение, готовые шаблоны по ссылке и история прогресса.",
    problem: "Заметки и таблицы быстро превращались в хаос, а готовые фитнес-приложения были перегружены рекламой, подписками и лишними функциями.",
    solution: "Страницы формируются на сервере, данные сохраняются автоматически по ходу ввода, упражнения хранятся в пополняемом каталоге, а шаблоны тренировок добавляются по обычной ссылке.",
    result: "Пользователь записывает подходы без кнопки «Сохранить», видит историю прогресса и может добавить чужой шаблон тренировки без повторов.",
    stack: ["Python 3.12", "FastAPI", "Jinja2", "Alpine.js", "SQLAlchemy", "PostgreSQL", "Docker Compose"],
    metrics: ["auto-save без кнопки", "публичные шаблоны", "40+ упражнений в каталоге"],
    outcomes: ["auto-save", "SSR", "шаблоны", "графики"],
    timeframe: "собственный продукт",
    keyResult: "Тренировку можно вести в одном экране: вводишь подходы, данные сохраняются сами.",
    context: [
      "Заметки и таблицы плохо подходят для регулярной записи подходов и прогресса.",
      "Готовые приложения перегружены лишними функциями и подписками.",
      "Нужен был лёгкий продукт с готовыми шаблонами по ссылке и сохранением без кнопки.",
    ],
    modules: [
      "Страницы приложения, которые формируются на сервере.",
      "Автосохранение по ходу ввода, без кнопки «Сохранить».",
      "Каталог упражнений, который можно пополнять без перезапуска.",
      "Готовые шаблоны тренировок и добавление их без повторов.",
    ],
    integrations: ["FastAPI", "Jinja2", "Alpine.js", "PostgreSQL", "Docker Compose"],
    architecture: ["Пользователь", "SSR page", "Alpine.js", "JSON API", "PostgreSQL", "exercise catalog"],
    media: [
      { title: "Web app", items: ["dashboard", "workout form", "exercise catalog", "progress chart"] },
      { title: "Шаблоны", items: ["public template", "import confirm", "share modal"] },
      { title: "Техника", items: ["auto-save snippet", "template import", "архитектура SSR + JSON"] },
    ],
    challenges: [
      { title: "Автосохранение без сюрпризов", text: "Изменения сохраняются автоматически по ходу ввода, поэтому пользователь просто вносит данные." },
      { title: "Шаблоны без повторов", text: "Добавление шаблона устроено так, что уже существующие упражнения не дублируются." },
      { title: "Лёгкое приложение без тяжёлых технологий", text: "Простой подход дал быстрый интерфейс без громоздких инструментов." },
    ],
    resultDetails: [
      "Подходы сохраняются без кнопки и ручного контроля.",
      "Шаблонами можно делиться обычной ссылкой.",
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
    title: "SkillUp — обучающая платформа на основе нейросети",
    type: "AI education product",
    category: "AI",
    shortSummary: "Полноценный сервис обучения с нейросетью: знакомство с пользователем, личный план развития, дерево прогресса и фоновая обработка задач.",
    problem: "Обычные ответы нейросетей — это хаотичные стены текста, а готовые сайты с планами обучения не учитывают уровень и цель конкретного человека.",
    solution: "Собран полноценный продукт: сайт, серверная часть, фоновая обработка тяжёлых задач и нейросеть Claude для знакомства, плана, объяснений и тестов.",
    result: "Пользователь за несколько минут получает личный план обучения из 4 уровней, где прогресс показан как интерактивное дерево с открытыми и закрытыми шагами.",
    stack: ["Next.js", "TypeScript", "FastAPI", "Celery", "Redis", "PostgreSQL", "Anthropic API"],
    metrics: ["4 уровня плана", "AI-онбординг и квизы", "Docker + Nginx deployment"],
    outcomes: ["AI roadmap", "Celery", "квизы", "дерево"],
    timeframe: "собственный продукт с нейросетью",
    keyResult: "Пользователь получает персональный план обучения и видит прогресс как интерактивное дерево.",
    context: [
      "Обычные ответы нейросети плохо превращаются в понятный пошаговый план.",
      "Готовые сайты с планами обучения слишком общие и не учитывают уровень пользователя.",
      "Нужен был полноценный сценарий: знакомство, создание плана, прогресс, объяснения и тесты.",
    ],
    modules: [
      "Сайт с интерактивным деревом прогресса.",
      "Серверная часть с базой данных и логикой работы.",
      "Фоновая обработка тяжёлых задач нейросети с показом прогресса.",
      "Нейросеть Claude для знакомства, плана, объяснений и тестов.",
    ],
    integrations: ["Anthropic API", "Celery", "Redis", "PostgreSQL", "Docker Compose", "Nginx"],
    architecture: ["Пользователь", "Next.js", "FastAPI", "PostgreSQL", "Celery / Redis", "Anthropic API"],
    media: [
      { title: "Продукт", items: ["онбординг", "построение плана", "дерево", "квиз"] },
      { title: "AI pipeline", items: ["onboarding chat", "plan generation", "node explanation", "quiz generation"] },
      { title: "Техника", items: ["Celery task", "canvas layout", "Claude API call"] },
    ],
    challenges: [
      { title: "План вместо стены текста", text: "Ответ нейросети превращается в план из 4 уровней с шагами, статусами и порядком прохождения." },
      { title: "Долгие задачи нейросети", text: "Создание плана вынесено в фон, чтобы сайт показывал прогресс и не зависал." },
      { title: "Удобное дерево прогресса", text: "Расположение шагов рассчитывается автоматически, без хранения координат в базе данных." },
    ],
    resultDetails: [
      "Пользователь отвечает на пару вопросов и получает личный план обучения за несколько минут.",
      "Прогресс виден наглядно через открытые и закрытые шаги.",
      "Работа нейросети разделена на создание плана, объяснения и тесты.",
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
    subtitle: "Небольшой Telegram-бот, первая версия продукта или одно подключение.",
    price: `от ${formatDiscountedRubPrice(48000)}`,
    firstProjectPrice: `первый проект от ${formatDiscountedRubPrice(38400)}`,
    term: "1-2 недели",
    includes: [
      "разбор задачи и короткое техническое задание",
      "один основной сценарий для пользователя",
      "бот или серверное подключение",
      "простая база данных или хранение данных",
      "запуск на сервере и короткая инструкция",
    ],
    excludes: ["сложные роли и панель управления", "несколько способов оплаты", "долгая поддержка после запуска"],
    featured: false,
  },
  {
    title: "Стандарт",
    subtitle: "Полноценный бот или сервис с оплатами, базой данных, панелью управления и запуском.",
    price: `от ${formatDiscountedRubPrice(112000)}`,
    firstProjectPrice: `первый проект от ${formatDiscountedRubPrice(89600)}`,
    term: "3-5 недель",
    includes: [
      "техническая схема решения",
      "несколько сценариев для пользователей",
      "платежи, база данных, роли",
      "действия администратора и уведомления",
      "запуск на сервере, журналы работы и проверка",
    ],
    excludes: ["сложное обучение моделей", "многоступенчатая аналитика", "круглосуточная поддержка"],
    featured: true,
  },
  {
    title: "Премиум",
    subtitle: "Сложная система: искусственный интеллект, подключения, платежи, очереди задач, мониторинг и поддержка запуска.",
    price: `от ${formatDiscountedRubPrice(224000)}`,
    firstProjectPrice: `первый проект от ${formatDiscountedRubPrice(179200)}`,
    term: "6-10 недель",
    includes: [
      "подробная схема и ограничения проекта",
      "искусственный интеллект или несколько внешних подключений",
      "платежи, очереди задач, мониторинг, роли",
      "документация, тестовая и рабочая версии",
      "поддержка запуска и стабилизация",
    ],
    excludes: ["закупка сторонних сервисов", "дизайн сложных интерфейсов с нуля", "юридическая настройка платежей"],
    featured: false,
  },
];

export const retainer = {
  title: "Поддержка и развитие",
  price: `от ${formatDiscountedRubPrice(10000)} / месяц`,
  description: "Исправление ошибок, небольшие доработки, обновление подключений, контроль сбоев, помощь после запуска и планирование следующих шагов.",
};

export const budgetGuides = [
  {
    title: "Небольшой бот / простая программа",
    price: `от ${formatDiscountedRubPrice(15000)}`,
    description: "Простая автоматизация, уведомления, базовая логика.",
  },
  {
    title: "Бизнес-бот / сбор данных / серверный модуль",
    price: `от ${formatDiscountedRubPrice(40000)}`,
    description: "База данных, роли, подключения и задачи по расписанию.",
  },
  {
    title: "Мини-приложение / сервис с нейросетью / система под ключ",
    price: `от ${formatDiscountedRubPrice(100000)}`,
    description: "Сайт, серверная часть, панель управления, платежи, аналитика и нейросети.",
  },
];

export const processSteps = [
  {
    title: "Вы отправляете заявку с параметрами",
    text: "Выбираете тип решения, сложность, нужные части и оставляете контакт. Уже на этом этапе виден примерный диапазон бюджета и сроков.",
  },
  {
    title: "Я уточняю детали",
    text: "Коротко разбираю сценарии, подключения, платежи, данные, готовые материалы и риски, которые могут повлиять на оценку.",
  },
  {
    title: "Фиксируем первую версию и границы работ",
    text: "Определяем, что входит в первую версию, какие сценарии важнее всего, а что можно оставить на следующий этап.",
  },
  {
    title: "Финальная смета и сроки",
    text: "После уточнений даю понятную оценку, этапы, условия приёмки и старта под конкретный объём.",
  },
  {
    title: "Разработка, проверка, запуск",
    text: "Собираю рабочий продукт: серверную часть, бот или интерфейс, подключения, проверку сценариев и запуск на сервере.",
  },
  {
    title: "Поддержка после запуска",
    text: "После запуска можно подключить сопровождение: исправление ошибок, небольшие доработки, контроль сбоев и развитие следующей версии.",
  },
];

export const trustItems = [
  "5 лет коммерческой разработки на Python",
  "30+ завершённых проектов под ключ",
  "Опыт с оплатами, возвратами, статусами и уведомлениями о платежах",
  "Подключение искусственного интеллекта с ограничениями, ролями и базой знаний",
  "Надёжная серверная основа: данные, статусы и ошибки продуманы заранее",
  "Запуск на сервере, журналы работы и поддержка после запуска",
  "Понятные границы работ, сроки и индивидуальные условия под проект",
];

export const testimonials = [
  {
    quote: "Нужен был не просто бот, а рабочий сервис с оплатой, статусами и действиями администратора. Рамиль быстро разложил задачу по схеме, показал риски и довёл до запуска без лишней драмы.",
    author: "Основатель Telegram-сервиса",
  },
  {
    quote: "Мы не хотели ломать существующий обменник. Получили аккуратное обновление дизайна, понятный путь заявки и ощущение более зрелого продукта без переписывания всей серверной части.",
    author: "Владелец обменного проекта",
  },
  {
    quote: "Ценность была в инженерном подходе: где хранить данные, как ограничить доступ, что отслеживать после запуска. В итоге внутренний инструмент стал предсказуемым в работе.",
    author: "Руководитель продукта (внутренний инструмент)",
  },
];

export const faqs = [
  {
    question: "Можно ли прийти без готового техзадания?",
    answer: "Да. Достаточно описать задачу, пользователей, желаемый результат и ограничения. Я помогу определить первую версию, сценарии, список подключений и границы первого этапа.",
  },
  {
    question: "Почему цена в калькуляторе предварительная?",
    answer: "Калькулятор не видит детали: дизайн, качество существующего кода, сложность подключений, платежи, объём данных, сроки и скрытые нестандартные ситуации. Финальная стоимость фиксируется после короткого разбора задачи.",
  },
  {
    question: "Можно ли начать с первой версии?",
    answer: "Да. Обычно первая версия закрывает один главный сценарий, минимум подключений и понятную точку проверки идеи. После запуска можно расширять роли, платежи, панель управления и аналитику.",
  },
  {
    question: "Делаете ли вы мини-приложения для Telegram?",
    answer: "Да. Могу собрать мини-приложение с входом через Telegram, каталогом, личным кабинетом, оплатами, приглашением друзей, панелью управления и серверной частью.",
  },
  {
    question: "Можно ли подключить искусственный интеллект к существующему проекту?",
    answer: "Да, если проект можно запустить или у него есть понятный способ подключения. Возможны умный помощник, база знаний по вашим документам, обработка документов, сортировка текстов, создание текстов и сохранение истории.",
  },
  {
    question: "Работаете ли вы с платежами, звёздами Telegram и криптой?",
    answer: "Да. Возможны ЮKassa, звёзды Telegram, CryptoBot, крипто-оплаты и нестандартные сценарии оплаты. Отдельно проверяются подтверждения платежей, статусы, повторные оплаты и действия администратора.",
  },
  {
    question: "Можно ли доработать уже существующий проект?",
    answer: "Да, если есть доступ к коду, среде запуска и данным для проверки. Сначала провожу разбор: зависимости, устройство проекта, база данных, запуск и риски изменений.",
  },
  {
    question: "Что будет после отправки заявки?",
    answer: "Я посмотрю выбранные параметры, задам уточняющие вопросы, предложу границы первой версии и после короткого обсуждения вернусь с финальным диапазоном бюджета, сроками и этапами.",
  },
];

export const siteMeta = {
  title: "Рамиль Канеев — Telegram-боты, нейросети и серверная разработка под ключ",
  description:
    "Telegram-боты, мини-приложения, подключение нейросетей, серверные сервисы, сбор данных, сайты, крипто-инструменты, запуск и поддержка.",
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
    "Рамиль Канеев — Telegram-боты, нейросети и серверная разработка",
  openGraphDescription:
    "Telegram-боты, мини-приложения, нейросети, серверные системы, сбор данных и подключения — от первой версии до запуска.",
};

export const ui = {
  brandName: "Рамиль Канеев",
  header: {
    backToTop: "Наверх",
    navAria: "Главная навигация",
    contactCta: "Обсудить проект",
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
    badge: "Для бизнеса, экспертов и команд с ручной рутиной",
    headline: ["Разрабатываю AI-сервисы и", "системы автоматизации для бизнеса", ""],
    description:
      "Telegram Mini Apps, внутренние кабинеты, обработка документов, интеграции и backend — от проектирования до запуска.",
    primaryCta: "Обсудить проект",
    secondaryCta: "Посчитать точнее",
    bottomNote: "Ниже — реальные проекты",
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
    eyebrow: "Направления работы",
    title: "Три направления для автоматизации и запуска продукта",
    description:
      "От первой схемы до работающей системы: без лишней сложности и с понятным результатом для команды и клиентов.",
    taskLabel: "task",
    audienceLabel: "Бизнес-задача:",
    includesLabel: "Что можно собрать",
    techLabel: "Технологии",
  },
  trust: {
    eyebrow: "Уже в работе",
    title:
      "Перед расчётом — короткий обзор задач, которые уже похожи на реальные рабочие проекты",
    description:
      "Это не витрина всех кейсов, а короткое подтверждение опыта по типам решений, которые чаще всего приходят в заявку.",
    proofLabel: "proof",
  },
  configurator: {
    eyebrow: "Калькулятор стоимости",
    title: "Оцените проект по основному направлению",
    description:
      "Выберите направление и нужные части системы, чтобы получить ориентир по бюджету и срокам. Точная оценка — после обсуждения задачи.",
  },
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
    commentPlaceholder:
      "Например: нужен Telegram-бот с оплатой и панелью управления для заявок.",
    submit: "Обсудить проект",
    sending: "Отправляю",
    success: "Заявка отправлена. Вернусь с уточняющими вопросами.",
    validationError: "Оставьте контакт и коротко опишите задачу.",
    submitError: "Не удалось отправить. Напишите напрямую:",
    fallbackTitle: "Можно написать напрямую:",
  },
  stickyCta: {
    discuss: "Обсудить проект",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
  },
  estimator: {
    steps: ["Тип", "Оценка", "Контакт"],
    leadTitle: "Можно посчитать точнее или просто написать",
    leadDescription:
      "Выберите тип проекта, если хотите узнать диапазон бюджета. Если данных мало, оставьте короткую заявку выше или напишите напрямую.",
    directFallback: "Или просто напишите мне",
    blockFallback: "или оставьте короткую заявку",
    optionalLabel: "необязательно",
    moneyLocale: "ru-RU",
    currency: "₽",
    currencyPosition: "suffix",
    budgetStep: 5000,
    budgetMin: 15000,
    budgetGap: 10000,
    dayShort: "дн.",
    timelineSuffix: "рабочих дней",
    kicker: "Project config",
    title: "Тип проекта → дополнения → заявка",
    stepPrefix: "step",
    typeTitle: "Выберите тип решения",
    typeDescription:
      "После выбора типа ниже остаются только подходящие дополнения.",
    complexityTitle: "Сложность",
    complexityDescription:
      "Это влияет на диапазон бюджета и срок: первая версия, бизнес-продукт или сложная система.",
    modulesTitle: "Дополнения",
    modulesDescription: "Показаны варианты для категории «{category}».",
    urgencyTitle: "Сроки",
    urgencyDescription:
      "Выберите комфортный темп. Срочность повышает стоимость, но сжимает план работ.",
    contactsTitle: "Контакты и описание",
    contactsDescription:
      "Эти данные попадут в заявку вместе с выбранными параметрами и расчётом.",
    fields: {
      name: "Имя",
      namePlaceholder: "Как к вам обращаться",
      contact: "Куда написать",
      contactPlaceholder: "Telegram, телефон, WhatsApp или email",
      email: "Email",
      emailPlaceholder: "необязательно",
      fileUrl: "Ссылка на техзадание или файл",
      fileUrlPlaceholder: "Google Docs, Figma, архив",
      comment: "Краткое описание задачи",
      commentPlaceholder:
        "Например: нужно мини-приложение для магазина одежды с каталогом, оплатой и приглашением друзей.",
    },
    note:
      "Калькулятор показывает ориентир. Финальная стоимость фиксируется после короткого обсуждения задачи, подключений, дизайна и сроков.",
    submit: "Отправить заявку",
    sendAnother: "Отправить ещё",
    validationError: "Оставьте контакт и коротко опишите задачу.",
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
    selectedModules: "Выбранные дополнения",
    noModules:
      "Дополнения не выбраны. Оценка считается только по базовой разработке.",
    requestFormat: "Формат заявки",
    requestTitle: "Новая заявка с сайта",
    requestOptions: "Дополнения",
    requestEstimate: "Оценка",
    baseDevelopment: "базовая разработка",
    viewCases: "Смотреть кейсы",
  },
  process: {
    eyebrow: "Как проходит работа",
    title: "После заявки понятно, что происходит дальше",
    description:
      "Понятный процесс снижает неопределённость: сначала параметры и уточнение деталей, потом границы первой версии, финальная смета, разработка, запуск и поддержка.",
    metrics: [
      { label: "Architecture", value: "схема до кода" },
      { label: "Delivery", value: "итерации и проверки" },
      { label: "Launch", value: "запуск и стабилизация" },
    ],
  },
  cases: {
    eyebrow: "Кейсы",
    title: "Витрина реальных проектов: быстро понять тип задачи и результат",
    description:
      "На главной — короткая подборка из разных типов работ: Telegram, нейросети, крипта, серверные сервисы, мини-приложения и сайты. Подробности, схемы и технические решения вынесены на отдельную страницу.",
    intro:
      "Карточка показывает задачу, собранные части и итоговый результат. Чтобы увидеть подробности, откройте кейс целиком.",
    allCases: "Все кейсы",
    carouselAria:
      "Карусель кейсов. Карточки можно вращать мышью или кнопками навигации.",
    controlsAria: "Навигация кейсов",
    previous: "Предыдущий кейс",
    next: "Следующий кейс",
    openCase: "Открыть кейс",
    outcomesAria: "Ключевые возможности",
    details: "Подробнее",
    similar: "Хочу похожий проект",
    discussCta: "Обсудить похожий проект",
    estimateCta: "Посчитать точнее",
  },
  casesPage: {
    backHome: "На главную",
    eyebrow: "Case proof base",
    title: "Подробные кейсы: контекст, архитектура, сложности и результат",
    description:
      "На главной кейсы работают как витрина. Здесь каждый проект раскрыт как доказательная база: зачем он был нужен, что было собрано, где были технические риски и какой рабочий результат получился после запуска.",
    countLabel: "кейсов",
    countDescription:
      "Telegram-боты, мини-приложения, нейросети, крипто-автоматизация, серверные сервисы и сайты в одном формате.",
    estimateSimilar: "Рассчитать похожий проект",
    navAria: "Навигация по кейсам",
    timeframe: "Сроки",
    keyResult: "Ключевой результат",
    stack: "Технологии",
    sections: {
      context: "Контекст задачи",
      modules: "Что было реализовано",
      integrations: "Подключения и логика работы",
      architecture: "Схема работы",
      media: "Скриншоты и интерфейсы",
      challenges: "Сложности и решения",
      result: "Результат",
    },
    mediaNote: "реальные или примерные макеты",
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
      "Короткие ориентиры по ценам — в дополнение к калькулятору",
    description:
      "Эти суммы помогают понять порядок бюджета. Точный диапазон лучше посчитать через конфигуратор выше, потому что состав работ, сроки и подключения сильно меняют объём.",
    budgetLabel: "budget",
    finalTitle: "Финальная стоимость зависит от деталей",
    finalDescription:
      "Финальная стоимость зависит от сценариев, дизайна, подключений, платежей, объёма данных и сроков. После запуска можно отдельно подключить поддержку:",
    estimateCta: "Рассчитать проект",
  },
  faq: {
    eyebrow: "Вопросы и ответы",
    title: "Вопросы, которые лучше закрыть до старта",
    description:
      "Чем точнее с самого начала описаны сценарии, подключения и ограничения, тем меньше сюрпризов на этапе разработки.",
  },
  testimonials: {
    eyebrow: "Отзывы",
    title: "Спокойная инженерная работа без лишнего шума",
    description:
      "Формулировки обезличены, но передают типичный запрос: довести продукт до рабочего состояния, а не просто написать отдельную программу.",
  },
  finalCta: {
    eyebrow: "Следующий шаг",
    title: "Расскажите, что нужно автоматизировать или запустить.",
    description:
      "Можно оставить короткое описание без техзадания. Я вернусь с вопросами, предложу первый объём работ, сроки и диапазон бюджета.",
    estimateCta: "Посчитать точнее",
    telegramCta: "Написать в Telegram",
    footer:
      "Telegram-боты, мини-приложения, нейросети, серверная часть и запуск под ключ.",
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
