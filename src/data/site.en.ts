import {
  contacts,
  cases as ruCases,
  stack,
  type CaseStudy,
} from "@/data/site.ru";

type SiteData = typeof import("@/data/site.ru").ruSiteData;

const priceDiscountFactor = 0.7;
const rubToUsdRate = 100;
const usdFormatter = new Intl.NumberFormat("en-US");

function discountUsdPrice(value: number) {
  return Math.round((value * priceDiscountFactor) / rubToUsdRate);
}

function formatDiscountedUsdPrice(value: number) {
  return `$${usdFormatter.format(discountUsdPrice(value))}`;
}

const navItems: SiteData["navItems"] = [
  { label: "Work", href: "#specialization" },
  { label: "Estimator", href: "#estimator" },
  { label: "Process", href: "#process" },
  { label: "Cases", href: "#cases" },
  { label: "FAQ", href: "#faq" },
];

const heroMetrics: SiteData["heroMetrics"] = [
  { value: "5 yrs", label: "commercial development" },
  { value: "30+", label: "bots, services and integrations" },
  { value: "6 areas", label: "Telegram / AI / services / websites / data / crypto" },
];

const specializations: SiteData["specializations"] = [
  {
    title: "Telegram bots and mini apps",
    audience:
      "For businesses that need to take leads, sell, run subscriptions, personal accounts and support right inside Telegram - where the clients already are.",
    includes: [
      "bots for leads, stores, subscriptions and payments",
      "mini apps with catalog, personal account and friend invites",
      "control panel, notifications, reports and exports",
    ],
    tech: "aiogram 3, Telegram Bot API, Telegram Web Apps, PostgreSQL, Redis",
    result:
      "You get more than a chat bot - a ready sales system inside Telegram: the client goes all the way to payment or the needed action on their own.",
  },
  {
    title: "Artificial intelligence and neural networks",
    audience:
      "For teams that want to add artificial intelligence to a product, support, education, document processing or everyday tasks.",
    includes: [
      "smart assistants and workflows powered by ChatGPT and Claude",
      "answers based on your documents, plus their processing and sorting",
      "chat history, access rights, limits and response control",
    ],
    tech: "OpenAI SDK, Anthropic SDK, PyTorch, FastAPI, PostgreSQL",
    result:
      "Artificial intelligence becomes part of the work: it answers using your data, speeds up routine and removes manual copying between services.",
  },
  {
    title: "Data collection and automation",
    audience:
      "For projects that need to collect data regularly, track changes, update tables, send alerts and remove manual work.",
    includes: [
      "data collection from one or several websites",
      "scheduled runs and stable work even when sites block access",
      "export to Excel, Google Sheets or a database",
    ],
    tech: "Python asyncio, Playwright, requests/httpx, PostgreSQL, cron/workers",
    result:
      "Data arrives on schedule and in the right format, while the team stops spending hours on copying, checking and manual notifications.",
  },
  {
    title: "Websites, services and control panels",
    audience:
      "For teams that need a working website or service: personal account, summary panel, lead form or internal tool.",
    includes: [
      "the visible part of the site, server logic and user roles",
      "forms, tables, statuses, summaries and analytics",
      "payments, connections to other services, notifications and launch",
    ],
    tech: "Next.js, React, FastAPI, PostgreSQL, Docker, Nginx",
    result:
      "The result is a clear working tool for clients, managers or operators, not a pile of disconnected programs.",
  },
  {
    title: "Crypto projects and trading bots",
    audience:
      "For crypto projects, exchangers and trading teams that need connections to exchanges, price tracking, signals, payments or blockchain data.",
    includes: [
      "connections to exchanges (Bybit, Binance, OKX) and crypto payments",
      "price tracking, trading signals and Telegram alerts",
      "trade logging, risk limits and a safe test mode",
    ],
    tech: "Bybit API, Binance API, Solana / Ethereum, PostgreSQL, Telegram Bot API",
    result:
      "Automation watches the market, captures events and helps react faster without constant manual watching.",
  },
  {
    title: "Server side and databases",
    audience:
      "For products that need a reliable server foundation: data storage, statuses, task queues, connections to other services and a stable launch.",
    includes: [
      "server services, databases and background jobs",
      "login, access rights and connections to external services",
      "work logs, launch via Docker and a clear project structure",
    ],
    tech: "FastAPI, SQLAlchemy 2.0 async, PostgreSQL, Redis, Docker",
    result:
      "The server side handles real load: stores data, handles errors and stays understandable for future development.",
  },
];

const proofItems: SiteData["proofItems"] = [
  {
    title: "Telegram mini app",
    summary:
      "Catalog, payments, friend invites, control panel and login through Telegram.",
    tags: ["Mini App", "payments", "admin"],
  },
  {
    title: "AI service",
    summary:
      "Creating structure, tests, data processing and embedding into a product.",
    tags: ["OpenAI / Claude", "RAG", "logs"],
  },
  {
    title: "Crypto bot",
    summary:
      "Price tracking, signals, connections to exchanges, risk limits and Telegram alerts.",
    tags: ["Bybit API", "signals", "alerts"],
  },
  {
    title: "Server system",
    summary:
      "Database, roles, server logic, control panel, statuses and launch on a server.",
    tags: ["FastAPI", "PostgreSQL", "Docker"],
  },
];

const projectTypes: SiteData["projectTypes"] = [
  {
    id: "telegram-bot",
    label: "Telegram bot",
    description:
      "Leads, payments, subscriptions, notifications, personal accounts and operator workflows.",
    baseLow: 35000,
    baseHigh: 65000,
    daysLow: 7,
    daysHigh: 12,
    defaultModules: ["database", "admin", "notifications"],
  },
  {
    id: "telegram-mini-app",
    label: "Telegram mini app",
    description:
      "App inside Telegram: catalog, personal account, cart, payment, friend invites and control panel.",
    baseLow: 70000,
    baseHigh: 115000,
    daysLow: 12,
    daysHigh: 20,
    defaultModules: ["database", "admin", "payments", "profile"],
  },
  {
    id: "ai-integration",
    label: "Artificial intelligence",
    description:
      "Smart assistant, answers from your documents, file processing, text creation or AI inside a product.",
    baseLow: 60000,
    baseHigh: 105000,
    daysLow: 10,
    daysHigh: 18,
    defaultModules: ["llm-api", "history-logs", "admin-ai"],
  },
  {
    id: "parser-automation",
    label: "Data collection / automation",
    description:
      "Data collection, scheduled jobs, exports, notifications and connections to tables or databases.",
    baseLow: 30000,
    baseHigh: 60000,
    daysLow: 5,
    daysHigh: 12,
    defaultModules: ["single-site", "regular-run", "export"],
  },
  {
    id: "web-service",
    label: "Website / control panel",
    description:
      "Website or service, server logic, access rights, summaries, control panel, payments and connections to other services.",
    baseLow: 75000,
    baseHigh: 130000,
    daysLow: 14,
    daysHigh: 24,
    defaultModules: ["frontend", "backend-api", "auth", "database-web"],
  },
  {
    id: "crypto-trading-bot",
    label: "Crypto / trading bot",
    description:
      "Connections to exchanges, price tracking, signals, Telegram alerts, crypto payments and risk limits.",
    baseLow: 65000,
    baseHigh: 120000,
    daysLow: 10,
    daysHigh: 20,
    defaultModules: ["exchange-api", "price-monitoring", "telegram-alerts"],
  },
  {
    id: "not-sure",
    label: "Not sure yet",
    description:
      "Useful when you have an idea or problem, but the exact solution format is not fixed yet.",
    baseLow: 20000,
    baseHigh: 45000,
    daysLow: 4,
    daysHigh: 9,
    defaultModules: ["discovery", "mvp-scope"],
  },
];

const complexityLevels: SiteData["complexityLevels"] = [
  {
    id: "mvp",
    label: "First version",
    description: "One core scenario, minimal roles and connections.",
    priceFactor: 0.82,
    daysFactor: 0.86,
  },
  {
    id: "business",
    label: "Business product",
    description:
      "Several scenarios, control panel, data and real-world operation.",
    priceFactor: 1,
    daysFactor: 1,
  },
  {
    id: "system",
    label: "Complex system",
    description:
      "Many roles, connections, statuses, payments or AI and crypto logic.",
    priceFactor: 1.32,
    daysFactor: 1.24,
  },
];

const urgencyOptions: SiteData["urgencyOptions"] = [
  {
    id: "flexible",
    label: "Flexible start",
    description:
      "Enough time to clarify scenarios and move without a hard deadline.",
    priceFactor: 0.95,
    daysFactor: 1.12,
  },
  {
    id: "standard",
    label: "Standard pace",
    description:
      "Normal working rhythm with clear checkpoints.",
    priceFactor: 1,
    daysFactor: 1,
  },
  {
    id: "urgent",
    label: "Need it faster",
    description:
      "Compressed timeline with priorities and constraints fixed in advance.",
    priceFactor: 1.22,
    daysFactor: 0.78,
  },
];

const projectModules: SiteData["projectModules"] = {
  "telegram-bot": [
    { id: "database", label: "Database", description: "Users, statuses, orders and action history.", price: 12000, days: 2 },
    { id: "admin", label: "Control panel", description: "Operators, settings, tables and manual actions.", price: 26000, days: 4 },
    { id: "payments", label: "Card payments", description: "Invoices, payment statuses and automatic payment confirmation.", price: 24000, days: 4 },
    { id: "telegram-stars", label: "Telegram Stars payments", description: "Telegram Stars payments and correct payment handling.", price: 18000, days: 3 },
    { id: "crypto-payments", label: "Crypto payments", description: "Crypto payments via CryptoBot or a custom flow.", price: 26000, days: 4 },
    { id: "referral", label: "Friend invites", description: "Invites, bonuses, limits and accruals.", price: 18000, days: 3 },
    { id: "profile", label: "User account", description: "Profile, balance, subscription and order history.", price: 18000, days: 3 },
    { id: "notifications", label: "Notifications", description: "System messages, alerts to administrators and reminders.", price: 9000, days: 1 },
    { id: "analytics", label: "Analytics", description: "Summaries, sales, exports and key events.", price: 14000, days: 2 },
    { id: "external-api", label: "Connection to an external service", description: "CRM, payment service, catalog or another third-party service.", price: 22000, days: 4 },
    { id: "deploy", label: "Launch on a server", description: "Hosting on a server, basic work logs and handoff notes.", price: 12000, days: 2 },
  ],
  "telegram-mini-app": [
    { id: "database", label: "Database", description: "Users, products, requests, payments and statuses.", price: 14000, days: 2 },
    { id: "admin", label: "Control panel", description: "Catalog, requests, users and settings.", price: 28000, days: 5 },
    { id: "payments", label: "Card payments", description: "Payment right in the app, automatic confirmation and statuses.", price: 26000, days: 4 },
    { id: "telegram-stars", label: "Telegram Stars payments", description: "Stars, limits, receipts and Telegram payment handling.", price: 18000, days: 3 },
    { id: "crypto-payments", label: "Crypto payments", description: "Crypto payments: addresses, statuses and notifications.", price: 28000, days: 4 },
    { id: "referral", label: "Friend invites", description: "Links, bonuses, tiers and anti-fraud protection.", price: 18000, days: 3 },
    { id: "profile", label: "User account", description: "Profile, history, balance, favorites or orders.", price: 20000, days: 3 },
    { id: "notifications", label: "Notifications", description: "Bot messages, request statuses and alerts to administrators.", price: 10000, days: 1 },
    { id: "analytics", label: "Analytics", description: "Customer path, requests, payments, exports and summaries.", price: 16000, days: 2 },
    { id: "external-api", label: "Connection to an external service", description: "Catalog, CRM, warehouse, exchanger or payment intake.", price: 24000, days: 4 },
    { id: "deploy", label: "Launch on a server", description: "Build, hosting on a server and a working launch.", price: 14000, days: 2 },
  ],
  "ai-integration": [
    { id: "llm-api", label: "ChatGPT / Claude connection", description: "Connecting the AI, limits, access rights and error control.", price: 22000, days: 3 },
    { id: "rag", label: "Knowledge base from your documents", description: "Document upload, search across them and answers with a source link.", price: 42000, days: 7 },
    { id: "documents", label: "Document processing", description: "PDFs, tables, sorting and extraction of the needed data.", price: 28000, days: 5 },
    { id: "classification", label: "Text sorting", description: "Topics, statuses, sorting into categories and auto-checks.", price: 20000, days: 3 },
    { id: "content-generation", label: "Text creation", description: "Templates, drafts and result quality control.", price: 22000, days: 3 },
    { id: "ai-assistant", label: "Smart assistant", description: "Dialogue, memory, skills, access rights and limits.", price: 32000, days: 5 },
    { id: "existing-product", label: "Embedding into your product", description: "Connection to your service, interface and safe embedding.", price: 28000, days: 5 },
    { id: "admin-ai", label: "Control panel", description: "Answer settings, limits, users and work checks.", price: 24000, days: 4 },
    { id: "history-logs", label: "History and logs", description: "Dialogues, events, errors, checks and exports.", price: 14000, days: 2 },
  ],
  "parser-automation": [
    { id: "single-site", label: "Single website", description: "Stable collection from one source.", price: 12000, days: 2 },
    { id: "multi-site", label: "Multiple websites", description: "Bringing data from several sources to one format.", price: 26000, days: 5 },
    { id: "auth", label: "Login to an account", description: "Login, session keeping and access refresh.", price: 18000, days: 3 },
    { id: "captcha", label: "Protection from blocks", description: "Risk assessment, fallback scenarios and stable work.", price: 26000, days: 5 },
    { id: "proxies", label: "Bypassing limits", description: "Switching access points, bypassing limits and block control.", price: 16000, days: 3 },
    { id: "regular-run", label: "Scheduled runs", description: "Schedule, repeated attempts, reports and failure control.", price: 12000, days: 2 },
    { id: "export", label: "Export to Excel / Google Sheets", description: "Ready exports in a format convenient for the team.", price: 12000, days: 2 },
    { id: "database", label: "Database", description: "History storage, removing duplicates and statuses.", price: 14000, days: 2 },
    { id: "telegram-alerts", label: "Telegram alerts", description: "Alerts for new data, errors and run summaries.", price: 9000, days: 1 },
  ],
  "web-service": [
    { id: "frontend", label: "Visible part of the site", description: "Site interface: forms, tables and screens.", price: 32000, days: 6 },
    { id: "backend-api", label: "Server logic", description: "Work logic, request handling, statuses and connections.", price: 30000, days: 6 },
    { id: "auth", label: "Login and access", description: "Login, sessions, access rights and security.", price: 20000, days: 3 },
    { id: "roles", label: "User roles", description: "Administrator, operator, client and action limits.", price: 18000, days: 3 },
    { id: "database-web", label: "Database", description: "Data, relations between it and change history.", price: 18000, days: 3 },
    { id: "admin", label: "Control panel", description: "Data management, filters, actions and export.", price: 28000, days: 5 },
    { id: "dashboard", label: "Summaries and analytics", description: "Metrics, charts, summaries and operational control.", price: 24000, days: 4 },
    { id: "payments", label: "Card payments", description: "Invoices, payment statuses and financial events.", price: 26000, days: 4 },
    { id: "external-integrations", label: "Connections to other services", description: "CRM, accounting systems, Telegram, tables or other services.", price: 24000, days: 4 },
  ],
  "crypto-trading-bot": [
    { id: "exchange-api", label: "Connection to exchanges", description: "Getting data and placing trades, limits and error handling.", price: 28000, days: 5 },
    { id: "dex", label: "Blockchain exchanges (Solana, Ethereum)", description: "Blockchain data, connection to exchanges and placing trades.", price: 42000, days: 8 },
    { id: "price-monitoring", label: "Price tracking", description: "Market scanner, filters, frequency and storage.", price: 20000, days: 3 },
    { id: "signals", label: "Trading signals", description: "Entry conditions, rules, filters and test modes.", price: 26000, days: 5 },
    { id: "telegram-alerts", label: "Telegram alerts", description: "Signals, trades, errors and daily reports.", price: 9000, days: 1 },
    { id: "crypto-payments", label: "Crypto payments", description: "Payment intake, statuses, checks and notifications.", price: 26000, days: 4 },
    { id: "trade-logs", label: "Trade journal", description: "Trade history, profit and loss, test mode and exports.", price: 16000, days: 3 },
    { id: "risk-limits", label: "Risk limits", description: "Trade limits, stop signals, shutdown and duplicate protection.", price: 24000, days: 4 },
  ],
  "not-sure": [
    { id: "discovery", label: "Task review", description: "Goal, scenarios, risks and constraints review.", price: 8000, days: 1 },
    { id: "mvp-scope", label: "First version scope", description: "What goes into the first version and what waits.", price: 10000, days: 2 },
    { id: "architecture", label: "Solution map", description: "Data, roles, connections and a development plan.", price: 14000, days: 2 },
    { id: "prototype", label: "Solution outline", description: "Fast clickable or text outline of the solution.", price: 16000, days: 3 },
  ],
};

const discountedUsdProjectTypes = projectTypes.map((item) => ({
  ...item,
  baseHigh: discountUsdPrice(item.baseHigh),
  baseLow: discountUsdPrice(item.baseLow),
})) satisfies SiteData["projectTypes"];

const discountedUsdProjectModules = Object.fromEntries(
  Object.entries(projectModules).map(([type, modules]) => [
    type,
    modules.map((module) => ({
      ...module,
      price: discountUsdPrice(module.price),
    })),
  ]),
) as SiteData["projectModules"];

type CaseTranslation = Omit<Partial<CaseStudy>, "preview"> & {
  preview?: Partial<CaseStudy["preview"]>;
};

const caseTranslations: Record<string, CaseTranslation> = {
  "subscription-bot": {
    title: "Subscription Bot - selling subscriptions with automatic access delivery",
    type: "Subscription automation",
    category: "Telegram",
    shortSummary:
      "Telegram bot for selling subscriptions: plans, four payment methods, automatic access delivery and a control panel for operators.",
    problem:
      "Leads, payments and access delivery were handled manually in chat: clients waited for an operator, plans got mixed up and audience growth broke the manual process.",
    solution:
      "One service handles the Telegram bot, payment intake and a control panel. The purchase runs step by step: plan, location, payment and automatic access delivery.",
    result:
      "The path from plan selection to access delivery runs without a human, while the operator manages plans, payments, broadcasts and disputed cases in the control panel.",
    metrics: ["4 payment providers", "automatic access", "broadcasts and reminders"],
    outcomes: ["card payments", "admin panel", "auto delivery", "broadcasts"],
    timeframe: "First version + production launch",
    keyResult:
      "A subscription purchase completes without an operator: from plan selection to access delivery.",
    context: [
      "The client needed to sell subscriptions right inside Telegram, without delivering access manually in direct messages.",
      "The manual process did not scale: operators mixed up plans, locations and payment statuses.",
      "A simple chat bot was not enough: payment intake, a control panel, reminders and handling of non-standard cases were required.",
    ],
    modules: [
      "Step-by-step purchase: plan, location, payment method, invoice and access delivery.",
      "Control panel for plans, users, payments, payment methods and broadcasts.",
      "Automatic jobs: subscription expiration, reminders and bulk broadcasts.",
      "Fast work thanks to cached settings that refresh after changes in the control panel.",
    ],
    architecture: ["User", "Telegram bot", "aiohttp backend", "PostgreSQL", "payment webhooks", "admin panel"],
    media: [
      { title: "Telegram bot", items: ["main menu", "plans", "payment provider selection", "access delivered"] },
      { title: "Admin panel", items: ["payments by provider", "plan editor", "broadcasts", "payment settings"] },
      { title: "Engineering", items: ["purchase FSM", "APScheduler jobs", "webhook flow map"] },
    ],
    challenges: [
      { title: "Several payment methods", text: "All payments are brought to one format so the operator sees statuses the same way, regardless of the payment method." },
      { title: "Automatic access without chaos", text: "The purchase is split into clear steps, and access is delivered only after a confirmed payment." },
      { title: "Settings without a developer", text: "Plans, locations and payment methods are changed right in the control panel, without reinstalling." },
    ],
    resultDetails: [
      "Operators only handle disputed cases and support.",
      "Plans, locations and payment methods are managed through the control panel.",
      "The user receives access immediately after successful payment.",
    ],
  },
  "sapsanex-mini-app": {
    title: "SapsanEx - a mini app for an exchanger inside Telegram",
    type: "Telegram Mini App / exchanger",
    category: "Mini App",
    shortSummary:
      "Mini app for an exchanger: rate calculation, request creation, status tracking and notifications - all inside Telegram.",
    problem:
      "A user came from Telegram, moved to a website, created a request and checked status on a separate page. On a phone, people were lost at every transition.",
    solution:
      "A mini app, a server gateway, a Telegram bot and a database were built together. Login happens automatically through Telegram, with no separate account, while the connection to the exchanger service is hidden behind a reliable layer.",
    result:
      "Rate calculation, request creation, status tracking, automatic cancellation of expired requests and status notifications - all inside Telegram, with no separate login.",
    metrics: ["Telegram WebApp auth", "typed exchanger gateway", "ru/en i18n"],
    outcomes: ["Mini App", "Telegram auth", "API gateway", "statuses"],
    timeframe: "ready for launch",
    keyResult: "The exchange flow runs in Telegram without sending the user to an external website.",
    context: [
      "Customers came from Telegram, but the key exchange steps happened on an external website.",
      "On a phone, users were lost between the bot, browser and status page.",
      "The third-party exchanger service was inconvenient to connect to and gave no clean request structure.",
    ],
    modules: [
      "Mini app with a calculator, request creation and history.",
      "Server gateway to the exchanger service with data validation.",
      "Telegram bot for launching the app and status change notifications.",
      "Automatic cancellation of stuck requests and status updates right in the app.",
    ],
    architecture: ["User", "Telegram WebApp", "React Mini App", "FastAPI gateway", "Premium Exchanger API", "PostgreSQL", "aiogram bot"],
    media: [
      { title: "Mini App", items: ["calculator", "request confirmation", "status polling", "request history"] },
      { title: "Telegram notifications", items: ["request created", "status changed", "timeout auto-cancel"] },
      { title: "Engineering", items: ["HMAC initData", "typed API wrapper", "WebApp flow map"] },
    ],
    challenges: [
      { title: "Login without a separate account", text: "Login happens automatically and securely through Telegram, so the user does not need a separate account." },
      { title: "Inconvenient external service", text: "The connection to the exchanger service is hidden behind a clean layer, so the app works with understandable data." },
      { title: "Stuck requests", text: "An automatic job closes expired requests, while the user sees the current status right in the app." },
    ],
    resultDetails: [
      "Calculation, request creation and tracking remain inside Telegram.",
      "Statuses arrive through bot notifications and update inside the app.",
      "A local request journal stores history and reduces dependence on the external service.",
    ],
  },
  "seedream-tryon": {
    title: "Seedream Bot - clothing try-on with a neural network in Telegram",
    type: "AI bot / e-commerce",
    category: "AI",
    shortSummary:
      "Telegram bot for virtual try-on: product upload, settings, the Seedream neural network, payment via Telegram Stars and YooKassa, plus a control panel.",
    problem:
      "A store needed a try-on flow that felt like a real product, not a demo: payments, balance, history and operator visibility had to be included.",
    solution:
      "The bot guides the user through upload, settings and payment, then sends the job to the Seedream neural network. The control panel covers users, plans, payments and manual balance changes.",
    result:
      "A store gets virtual try-on and earnings inside Telegram, with operator control over payments and user balances.",
    metrics: ["Seedream API", "Stars + YooKassa", "FastAPI admin"],
    outcomes: ["AI generation", "payments", "balance", "admin"],
    timeframe: "own product / ready to show",
    keyResult: "The store gets virtual try-on and earnings inside Telegram.",
    context: [
      "The goal was to turn virtual try-on into a paid Telegram product with a clear user flow.",
      "Users needed history, balance and understandable limits, not a one-off generation command.",
      "The operator needed visibility into users, payments, plans and manual credits.",
    ],
    modules: [
      "Telegram bot flow for product upload, settings, generation and result history.",
      "Connection to the Seedream neural network with request validation and result delivery.",
      "Telegram Stars and YooKassa payments with balance accounting.",
      "Control panel for users, plans, payments and manual credits.",
    ],
    architecture: ["User", "Telegram bot", "FastAPI backend", "Seedream API", "payments", "PostgreSQL", "admin panel"],
    media: [
      { title: "Telegram bot", items: ["product upload", "parameters", "AI result", "generation history"] },
      { title: "Payments", items: ["Stars invoice", "YooKassa checkout", "generation balance"] },
      { title: "Admin panel", items: ["users", "payments", "tariffs", "manual credits"] },
    ],
    challenges: [
      { title: "A neural network as a product, not a demo", text: "Generation is embedded into a clear user flow with balance, history and plans." },
      { title: "Two payment methods in one bot", text: "Telegram Stars are handy for quick small purchases, while YooKassa is for packages and subscriptions." },
      { title: "Operator control", text: "The control panel shows payments, users and credits without database access." },
    ],
    resultDetails: [
      "A user can buy generations and receive try-on results inside Telegram.",
      "The store can manage plans and balances without developer involvement.",
      "The solution is ready for product demos and reuse in other online stores.",
    ],
  },
  "ai-reply-assistant": {
    title: "AI Reply Assistant - Telegram bot with 7 smart scenarios",
    type: "AI Telegram bot",
    category: "AI",
    shortSummary:
      "Smart assistant inside Telegram: seven scenarios, the GPT-4o neural network, payment via YooKassa, friend invites and backup access channels for stable work.",
    problem:
      "The product needed to pack several reply scenarios into a simple Telegram flow with payments, trial limits and stable access to the neural network.",
    solution:
      "The bot picks the right scenario, tracks user limits and sends requests through backup access channels. Payment via YooKassa, friend invites and usage history are tied to the user account.",
    result:
      "Users receive replies from the neural network in Telegram, while access to it goes through resilient backup channels.",
    metrics: ["7 AI scenarios", "GPT-4o", "proxy rotation"],
    outcomes: ["prompt builder", "payments", "referrals", "limits"],
    timeframe: "First version ready for launch",
    keyResult: "The user gets replies from the neural network in Telegram, and access to it goes through resilient backup channels.",
    context: [
      "The product needed several reply scenarios without turning the bot into a confusing editor.",
      "Access to the neural network had to survive slow or failing channels.",
      "Trial limits, packages, receipts and invite bonuses had to stay consistent.",
    ],
    modules: [
      "Telegram scenario menu with context upload and answer variants.",
      "Seven scenarios, each with its own request preparation and answer parsing.",
      "Payment via YooKassa, a free trial and an invite program.",
      "A set of backup access channels with health checks and disabling of slow ones.",
    ],
    architecture: ["User", "Telegram bot", "scenario router", "prompt builder", "proxy pool", "GPT-4o", "PostgreSQL"],
    media: [
      { title: "Telegram bot", items: ["main menu", "scenario selection", "context upload", "answer variants"] },
      { title: "Payments", items: ["packages", "YooKassa checkout", "referral screen"] },
      { title: "Engineering", items: ["prompt builder", "proxy rotation", "YooKassa webhook"] },
    ],
    challenges: [
      { title: "Neutral and clear interface", text: "Scenarios are framed as a universal messaging assistant, without questionable wording." },
      { title: "Unstable external access", text: "The system itself picks a working channel, temporarily disables failing ones and skips slow ones." },
      { title: "Clear payment", text: "Trial, packages, receipt and invites are connected to user limits." },
    ],
    resultDetails: [
      "The user stays in Telegram and gets answer variants without manual copying.",
      "The bot itself picks a working access channel to the neural network.",
      "Payments and bonuses go into a single user balance.",
    ],
  },
  "bybit-trading-bot": {
    title: "ByBit Trading Bot - automated crypto trading 24/7",
    type: "Crypto trading automation",
    category: "Crypto",
    shortSummary:
      "Trading automation: connection to the Bybit exchange, a strategy based on volume spikes and price acceleration, risk control and Telegram reports.",
    problem:
      "The market had to be scanned continuously across hundreds of trading pairs, with signal logic separated from execution and risk control.",
    solution:
      "The scanner receives market data from the Bybit exchange, the strategy detects volume spikes and price acceleration, and risk control manages entries, exits and a test mode.",
    result:
      "Scanning, signal generation, position entry and exit run autonomously around the clock.",
    metrics: ["300+ instruments", "dry-run mode", "Telegram reports"],
    outcomes: ["market scanner", "strategy", "risk manager", "alerts"],
    timeframe: "a ready-to-run system",
    keyResult: "Scanning, signal, entry and exit work autonomously 24/7.",
    context: [
      "Manual watching was too slow for the number of trading pairs.",
      "Signal logic needed to be testable without immediately placing real trades.",
      "The operator needed Telegram reports and visibility into open trades.",
    ],
    modules: [
      "Market scanner on the Bybit exchange with selection by liquidity.",
      "Trading strategy based on volume spikes and price acceleration.",
      "Risk control: stop signals, profit taking and a limit on the number of open trades.",
      "Telegram notifications about trades, positions and daily profit or loss.",
    ],
    architecture: ["Bybit market data", "scanner", "strategy", "risk manager", "order layer", "PostgreSQL", "Telegram reports"],
    media: [
      { title: "Strategy", items: ["volume spike chart", "price acceleration", "positions table"] },
      { title: "Telegram", items: ["entry signal", "position close", "daily report"] },
      { title: "Engineering", items: ["scanner log", "strategy code", "position manager"] },
    ],
    challenges: [
      { title: "Over 300 trading pairs", text: "The scanner is separated from the strategy so market selection does not mix with the entry rules." },
      { title: "Testing without risk", text: "Test mode lets everything run on real data without real trades on the account." },
      { title: "Trade control", text: "The system tracks the limit of open trades, stop signals and exit conditions." },
    ],
    resultDetails: [
      "The bot does not need constant manual watching of the market.",
      "All key events go to Telegram.",
      "Test mode reduces risk before turning on real trading.",
    ],
  },
  "eps-bot": {
    title: "EPS Bot - trading on the Solana blockchain with trainable models",
    type: "DEX trading / ML pipeline",
    category: "Crypto",
    shortSummary:
      "Research system for exchanges on the Solana blockchain: collecting price data, training models, strategy, placing trades on the blockchain and Telegram reports.",
    problem:
      "A trading idea needed a single system from collecting market data to training models and placing trades on the blockchain.",
    solution:
      "The project separates data collection, model training, strategy settings and trade placement on the Solana blockchain into distinct layers.",
    result:
      "The idea can be tested from collecting data to a trade on the blockchain inside one system.",
    metrics: ["OHLCV collection", "model compare", "Raydium tx layer"],
    outcomes: ["data pipeline", "ML training", "backtest", "on-chain"],
    timeframe: "research / technology project",
    keyResult: "The idea is tested from collecting data to a trade on the blockchain in one system.",
    context: [
      "The goal was not only to place trades, but to test the full path from data to execution.",
      "Models and settings had to be replaceable without redoing the connections to exchanges.",
      "The technical details of the blockchain needed to be isolated from the strategy.",
    ],
    modules: [
      "Connections to exchanges for collecting price data.",
      "Storage for samples and history.",
      "A set of trainable models of different types.",
      "A layer for placing trades on the Solana blockchain and Telegram reports.",
    ],
    architecture: ["DEX data", "collector", "training pipeline", "strategy", "tx_tools", "Solana RPC", "Telegram reports"],
    media: [
      { title: "ML and market", items: ["OHLCV signals", "training curves", "model compare"] },
      { title: "CLI", items: ["collect pools", "train model", "backtest report"] },
      { title: "Engineering", items: ["LSTM snippet", "strategy threshold", "Raydium tx"] },
    ],
    challenges: [
      { title: "Data first, then the model", text: "Data collection and training are separated so the model can change without redoing the connections to exchanges." },
      { title: "Different models", text: "The system allows comparing several models and settings for different market conditions." },
      { title: "Trades on the blockchain", text: "Trade placement is isolated so the strategy does not depend on the technical details of the blockchain." },
    ],
    resultDetails: [
      "The system became the basis for the next crypto projects and automations.",
      "Models and settings can be changed without breaking the whole system.",
      "Telegram reports give the full picture without a separate panel.",
    ],
  },
  "frax-redesign": {
    title: "Frax - design update for a WordPress crypto exchanger",
    type: "Crypto exchanger redesign",
    category: "Web",
    shortSummary:
      "Visual update for a WordPress exchanger: new design, a convenient calculator on phones and careful work on top of the existing plugin.",
    problem:
      "The exchanger needed a more mature look without replacing the platform or risking the existing exchange logic.",
    solution:
      "The page templates were redone, a new unified style was built, the main screen and calculator were reworked, and the plugin data was neatly placed into the new design.",
    result:
      "The working site started matching the expectations of the exchanger market, the phone version became convenient, and the existing exchange logic stayed stable.",
    metrics: ["WordPress layer", "mobile calculator", "no backend rewrite"],
    outcomes: ["redesign", "mobile UX", "shortcode wrapper", "safe rollout"],
    timeframe: "launch on the live site",
    keyResult: "The new design launched without changing the platform and without risk to the exchange logic.",
    context: [
      "The client already had a working exchanger on WordPress with a specialized plugin.",
      "The plugin stored rates, directions, limits, requests and partner connections.",
      "A full move was expensive and risky, so the look had to be updated on top of the existing logic.",
    ],
    modules: [
      "New unified style and reworked page templates.",
      "Main screen and exchange calculator, convenient on phones.",
      "Neat embedding of the plugin data into the new design.",
      "Lightweight styling code without complex tools, so the site is easier to maintain.",
    ],
    architecture: ["User", "WordPress page", "shortcode wrapper", "existing plugin", "exchange backend", "operator"],
    media: [
      { title: "Before / after", items: ["old hero", "new hero", "mobile calculator"] },
      { title: "New design", items: ["exchange directions", "request form", "FAQ / rules"] },
      { title: "Engineering", items: ["PHP shortcode wrapper", "CSS component layer"] },
    ],
    challenges: [
      { title: "Do not break the plugin", text: "The exchange logic was not rewritten: the new design simply wrapped the existing plugin data." },
      { title: "Calculator on phones", text: "Fields, buttons and action order were redesigned for comfortable one-handed use." },
      { title: "Client support", text: "Styling and templates were kept simple, so the client can maintain the site without complex tools." },
    ],
    resultDetails: [
      "The site became visually closer to the 2026 exchanger market.",
      "On phones, placing a request became clearer and larger.",
      "The existing exchange logic stayed stable and familiar to the client.",
    ],
  },
  "tech-rise-academy": {
    title: "Tech Rise Academy - a site with leads straight to Telegram",
    type: "Landing / lead automation",
    category: "Backend",
    shortSummary:
      "Multi-page academy site: leads are checked and sent to the owner in Telegram within seconds.",
    problem:
      "The academy needed a fast site without complex client systems: leads were getting lost in direct messages and email, and reply speed in the first minutes decides whether a course is bought.",
    solution:
      "The main page and course pages were built, a single settings file for texts, and a small service that checks the lead and sends it to the owner in Telegram.",
    result:
      "The site launched on its own domain, leads arrive in Telegram within seconds, and contacts and links can be changed without a developer.",
    metrics: ["FastAPI endpoint", "Telegram inbox", "Docker + Nginx"],
    outcomes: ["landing", "lead handler", "Telegram alerts", "deployment"],
    timeframe: "fast launch on a domain",
    keyResult: "A lead reaches the owner in Telegram within seconds after the form.",
    context: [
      "The academy had no site and no separate budget for a client management system.",
      "Leads were getting lost between direct messages, email and manual chats.",
      "A lightweight solution was needed that could be maintained without a complex server part and database.",
    ],
    modules: [
      "Main page and two course pages.",
      "A single settings file for links, contacts and the offer.",
      "A small lead intake service with data validation.",
      "Sending a ready lead card to Telegram.",
    ],
    architecture: ["Visitor", "landing form", "FastAPI endpoint", "Telegram Bot API", "owner chat", "Nginx", "Docker"],
    media: [
      { title: "Landing", items: ["hero", "programs", "course page", "lead form"] },
      { title: "Lead flow", items: ["Telegram lead card", "config.js", "lead handler"] },
      { title: "Engineering", items: ["Docker Compose", "Nginx", "FastAPI endpoint"] },
    ],
    challenges: [
      { title: "Without a client system", text: "A Telegram chat became the single place for all leads, without a separate database or paid systems." },
      { title: "Edits without a developer", text: "Contacts, links and the offer were moved into a separate settings file." },
      { title: "Fast reaction", text: "The lead goes to the owner immediately after the form is checked." },
    ],
    resultDetails: [
      "The owner gets the lead right away in the familiar Telegram.",
      "Text changes are made precisely in the settings file.",
      "The site works without heavy technology and a separate client system.",
    ],
  },
  "gym-progres": {
    title: "gym_progres - workout tracker with auto-save",
    type: "Niche web app",
    category: "Backend",
    shortSummary:
      "Personal site for tracking workouts: auto-save, ready templates via a link and progress history.",
    problem:
      "Notes and spreadsheets quickly turned into a mess, while ready fitness apps were overloaded with ads, subscriptions and extra features.",
    solution:
      "Pages are built on the server, data saves automatically as you type, exercises are stored in an expandable catalog, and workout templates are added via a regular link.",
    result:
      "The user logs sets without a Save button, sees progress history and can add someone else's workout template without duplicates.",
    metrics: ["SSR + Alpine.js", "auto-save", "public templates"],
    outcomes: ["workout form", "auto-save", "templates", "progress"],
    timeframe: "own product",
    keyResult: "A workout can be tracked on one screen: enter sets and the data saves automatically.",
    context: [
      "Notes and spreadsheets are a poor fit for regularly logging sets and progress.",
      "Ready apps are overloaded with extra features and subscriptions.",
      "A lightweight product was needed with ready templates via a link and saving without a button.",
    ],
    modules: [
      "App pages that are built on the server.",
      "Auto-save as you type, without a Save button.",
      "An exercise catalog that can be expanded without a restart.",
      "Ready workout templates and adding them without duplicates.",
    ],
    architecture: ["User", "SSR page", "Alpine.js", "JSON API", "database", "templates", "progress view"],
    media: [
      { title: "Web app", items: ["dashboard", "workout form", "exercise catalog", "progress chart"] },
      { title: "Templates", items: ["public template", "import confirm", "share modal"] },
      { title: "Engineering", items: ["auto-save snippet", "template import", "SSR + JSON architecture"] },
    ],
    challenges: [
      { title: "Auto-save without surprises", text: "Changes save automatically as you type, so the user simply enters data." },
      { title: "Templates without duplicates", text: "Adding a template is set up so existing exercises are not duplicated." },
      { title: "Lightweight app without heavy technology", text: "A simple approach gave a fast interface without bulky tools." },
    ],
    resultDetails: [
      "Sets are saved without a button and manual control.",
      "Templates can be shared with a regular link.",
      "History and charts give a quick overview of progress.",
    ],
  },
  "skillup": {
    title: "SkillUp - a learning platform powered by a neural network",
    type: "AI education product",
    category: "AI",
    shortSummary:
      "A complete learning service with a neural network: getting to know the user, a personal development plan, a progress tree and background task processing.",
    problem:
      "Ordinary neural network answers are chaotic walls of text, while ready learning-plan sites do not account for the level and goal of a specific person.",
    solution:
      "A complete product was built: a site, a server part, background processing of heavy tasks and the Claude neural network for getting to know the user, the plan, explanations and tests.",
    result:
      "In a few minutes the user gets a personal learning plan with 4 levels, where progress is shown as an interactive tree with open and locked steps.",
    metrics: ["4-tier roadmap", "Celery/Redis", "Claude API"],
    outcomes: ["onboarding", "AI roadmap", "progress tree", "quiz"],
    timeframe: "own product with a neural network",
    keyResult: "The user gets a personal learning plan and sees progress as an interactive tree.",
    context: [
      "Ordinary neural network answers turn poorly into a clear step-by-step plan.",
      "Ready learning-plan sites are too general and do not account for the user's level.",
      "A complete scenario was needed: getting to know the user, building a plan, progress, explanations and tests.",
    ],
    modules: [
      "A site with an interactive progress tree.",
      "A server part with a database and work logic.",
      "Background processing of heavy neural network tasks with progress display.",
      "The Claude neural network for getting to know the user, the plan, explanations and tests.",
    ],
    architecture: ["User", "onboarding", "AI pipeline", "Celery worker", "Claude API", "database", "progress tree"],
    media: [
      { title: "Product", items: ["onboarding", "plan builder", "tree", "quiz"] },
      { title: "AI pipeline", items: ["onboarding chat", "plan generation", "node explanation", "quiz generation"] },
      { title: "Engineering", items: ["Celery task", "canvas layout", "Claude API call"] },
    ],
    challenges: [
      { title: "A plan instead of a wall of text", text: "The neural network's answer is turned into a plan of 4 levels with steps, statuses and order." },
      { title: "Long neural network tasks", text: "Building the plan runs in the background so the site shows progress and does not freeze." },
      { title: "Convenient progress tree", text: "The position of the steps is calculated automatically, without storing coordinates in the database." },
    ],
    resultDetails: [
      "The user answers a couple of questions and gets a personal learning plan in a few minutes.",
      "Progress is clearly visible through open and locked steps.",
      "The neural network's work is split into building the plan, explanations and tests.",
    ],
  },
};

const cases: SiteData["cases"] = ruCases.map((item) => {
  const translation = caseTranslations[item.slug] ?? {};
  const { preview, ...rest } = translation;

  return {
    ...item,
    ...rest,
    preview: {
      ...item.preview,
      ...preview,
    },
  };
});

const packages: SiteData["packages"] = [
  {
    title: "Basic",
    subtitle: "Small Telegram bot, first version or one connection.",
    price: `from ${formatDiscountedUsdPrice(48000)}`,
    firstProjectPrice: `first project from ${formatDiscountedUsdPrice(38400)}`,
    term: "1-2 weeks",
    includes: [
      "task review and a short technical brief",
      "one core user scenario",
      "bot or server connection",
      "a simple database or data storage",
      "launch on a server and short handoff notes",
    ],
    excludes: ["complex roles and control panel", "multiple payment methods", "long support after launch"],
    featured: false,
  },
  {
    title: "Standard",
    subtitle:
      "Full bot or service with payments, database, control panel and launch.",
    price: `from ${formatDiscountedUsdPrice(112000)}`,
    firstProjectPrice: `first project from ${formatDiscountedUsdPrice(89600)}`,
    term: "3-5 weeks",
    includes: [
      "technical scheme of the solution",
      "several user scenarios",
      "payments, database and roles",
      "administrator actions and notifications",
      "launch on a server, work logs and testing",
    ],
    excludes: ["complex model training", "multi-stage analytics", "24/7 support"],
    featured: true,
  },
  {
    title: "Premium",
    subtitle:
      "Complex system: artificial intelligence, connections, payments, task queues, monitoring and launch support.",
    price: `from ${formatDiscountedUsdPrice(224000)}`,
    firstProjectPrice: `first project from ${formatDiscountedUsdPrice(179200)}`,
    term: "6-10 weeks",
    includes: [
      "detailed scheme and project constraints",
      "artificial intelligence or several external connections",
      "payments, task queues, monitoring and roles",
      "documentation, test and production environments",
      "launch support and stabilization",
    ],
    excludes: ["third-party service purchases", "full custom UI design from scratch", "legal payment setup"],
    featured: false,
  },
];

const retainer: SiteData["retainer"] = {
  title: "Support and development",
  price: `from ${formatDiscountedUsdPrice(10000)} / month`,
  description:
    "Bug fixes, small improvements, connection updates, error control, help after launch and planning the next steps.",
};

const budgetGuides: SiteData["budgetGuides"] = [
  {
    title: "Small bot / simple program",
    price: `from ${formatDiscountedUsdPrice(15000)}`,
    description:
      "Simple automation, notifications and basic logic.",
  },
  {
    title: "Business bot / data collection / server module",
    price: `from ${formatDiscountedUsdPrice(40000)}`,
    description:
      "Database, roles, connections and scheduled jobs.",
  },
  {
    title: "Mini app / AI service / turnkey system",
    price: `from ${formatDiscountedUsdPrice(100000)}`,
    description:
      "Website, server part, control panel, payments, analytics and neural networks.",
  },
];

const processSteps: SiteData["processSteps"] = [
  {
    title: "You send a request with parameters",
    text:
      "You choose the solution type, complexity, the parts you need and leave a contact. At this stage the site already shows an approximate budget and timeline range.",
  },
  {
    title: "I clarify the details",
    text:
      "I quickly review scenarios, connections, payments, data, existing materials and risks that may affect the estimate.",
  },
  {
    title: "We fix the first version and work boundaries",
    text:
      "We define what goes into the first version, which scenarios matter most and what can wait for the next stage.",
  },
  {
    title: "Final estimate and timeline",
    text:
      "After clarification I provide a clear estimate, stages, acceptance terms and start conditions for the actual scope.",
  },
  {
    title: "Development, checks, launch",
    text:
      "I assemble a working product: the server part, a bot or interface, connections, scenario checks and launch on a server.",
  },
  {
    title: "Support after launch",
    text:
      "After launch we can add support: bug fixes, small improvements, error control and next-version development.",
  },
];

const trustItems: SiteData["trustItems"] = [
  "5 years of commercial Python development",
  "30+ completed turnkey projects",
  "Experience with payments, refunds, statuses and payment notifications",
  "Artificial intelligence integrations with limits, roles and knowledge bases",
  "A reliable server foundation: data, statuses and errors are planned early",
  "Launch on a server, work logs and post-launch support",
  "Clear work boundaries, timelines and project-specific conditions",
];

const testimonials: SiteData["testimonials"] = [
  {
    quote:
      "We needed not just a bot, but a working service with payments, statuses and administrator actions. Ramil quickly mapped the task, showed risks and brought it to launch without extra drama.",
    author: "Founder of a Telegram service",
  },
  {
    quote:
      "We did not want to break the existing exchanger. We got a careful design update, a clearer request flow and a more mature product feel without rewriting the whole server part.",
    author: "Owner of an exchange project",
  },
  {
    quote:
      "The value was in the engineering approach: where to store data, how to limit access, what to track after launch. The internal tool became predictable in operation.",
    author: "Product manager of an internal tool",
  },
];

const faqs: SiteData["faqs"] = [
  {
    question: "Can I start without a ready technical specification?",
    answer:
      "Yes. It is enough to describe the task, users, desired result and constraints. I will help define the first version, scenarios, connections and the boundaries of the first stage.",
  },
  {
    question: "Why is the calculator estimate preliminary?",
    answer:
      "The calculator cannot see details such as design, existing code quality, complexity of connections, payments, data volume, deadlines and hidden non-standard cases. The final cost is fixed after a short task review.",
  },
  {
    question: "Can we start with a first version?",
    answer:
      "Yes. Usually a first version covers one main scenario, a minimum of connections and a clear point to test the idea. After launch, roles, payments, control panel and analytics can expand.",
  },
  {
    question: "Do you build mini apps for Telegram?",
    answer:
      "Yes. I can build a mini app with login through Telegram, catalog, personal account, payments, friend invites, control panel and a server part.",
  },
  {
    question: "Can artificial intelligence be added to an existing project?",
    answer:
      "Yes, if the project can be launched or has a clear way to connect. Options include a smart assistant, a knowledge base from your documents, document processing, text sorting, text creation and history logging.",
  },
  {
    question: "Do you work with payments, Telegram Stars and crypto?",
    answer:
      "Yes. YooKassa, Telegram Stars, CryptoBot, crypto payments and custom payment flows are possible. Payment confirmations, statuses, repeated payments and administrator operations are checked separately.",
  },
  {
    question: "Can you improve an existing project?",
    answer:
      "Yes, if there is access to the code, run environment and data for testing. I start with a review: dependencies, project structure, database, launch and change risks.",
  },
  {
    question: "What happens after I send a request?",
    answer:
      "I review the selected parameters, ask clarifying questions, suggest first-version boundaries and return with a final budget range, timeline and stages after a short discussion.",
  },
];

const siteMeta: SiteData["meta"] = {
  title: "Ramil Kaneev - turnkey Telegram bots, neural networks and server development",
  description:
    "Telegram bots, mini apps, neural network integration, server services, data collection, websites, crypto tools, launch and support.",
  keywords: [
    "Ramil Kaneev",
    "mchomak",
    "AI developer",
    "backend development",
    "Telegram bot",
    "Telegram Mini App",
    "FastAPI",
    "AI integrations",
    "parsing",
    "crypto bot",
  ],
  openGraphTitle: "Ramil Kaneev - Telegram bots, neural networks and server development",
  openGraphDescription:
    "Telegram bots, mini apps, neural networks, server systems, data collection and connections - from first version to launch.",
};

const ui: SiteData["ui"] = {
  brandName: "Ramil Kaneev",
  header: {
    backToTop: "Back to top",
    navAria: "Main navigation",
    contactCta: "Discuss a project",
    languageAria: "Switch language",
    languageNames: {
      ru: "Русский",
      en: "English",
    },
  },
  boot: {
    ariaLabel: "Building the interface",
    title: "Assembling the interface like a production contour",
    logs: [
      "loading python backend contour",
      "mapping bot scenarios",
      "linking payments, api, queues",
      "starting ai gateway",
      "deploy surface ready",
    ],
  },
  hero: {
    badge: "For small businesses, experts and product teams",
    headline: ["Telegram bots and services", "for leads and payments"],
    description:
      "I build bots, mini apps, server systems, neural networks, control panels and payments - from idea to launch on a server.",
    primaryCta: "Discuss a project",
    secondaryCta: "Get a tighter estimate",
    bottomNote: "Real projects below",
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
    eyebrow: "What I help with",
    title:
      "A clear set of solutions: Telegram, neural networks, server side, websites, data collection and crypto",
    description:
      "Each direction is built around a business result: leads, payments, data, automation, interfaces, connections and launch.",
    taskLabel: "task",
    audienceLabel: "Business task:",
    includesLabel: "What can be built",
    techLabel: "Technologies",
  },
  trust: {
    eyebrow: "Already in practice",
    title:
      "Before the estimate - a short overview of tasks already close to real working projects",
    description:
      "This is not the full case archive, but a compact proof of experience across the solution types that most often arrive as requests.",
    proofLabel: "proof",
  },
  configurator: {
    eyebrow: "Precise estimate",
    title: "If you want a tighter number - configure the project",
    description:
      "This is an optional step. You can pick the solution type to get a budget orientation, and expand the details only if needed.",
  },
  quickLead: {
    title: "Briefly describe the task",
    description: "I will reply in whatever channel suits you.",
    name: "Name",
    namePlaceholder: "How should I address you",
    channel: "Contact channel",
    channels: {
      telegram: "Telegram",
      whatsapp: "WhatsApp",
      phone: "Phone",
      email: "Email",
    },
    contact: "Where to reply",
    contactPlaceholder: {
      telegram: "@username",
      whatsapp: "+7...",
      phone: "+7...",
      email: "name@company.com",
    },
    comment: "What needs to be done",
    commentPlaceholder:
      "For example: I need a Telegram bot with payments and a control panel for requests.",
    submit: "Discuss a project",
    sending: "Sending",
    success: "Request sent. I will get back with a few clarifying questions.",
    validationError: "Leave a contact and briefly describe the task.",
    submitError: "Could not send. Write directly:",
    fallbackTitle: "You can also write directly:",
  },
  stickyCta: {
    discuss: "Discuss a project",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
  },
  estimator: {
    steps: ["Type", "Estimate", "Contact"],
    leadTitle: "You can get a tighter number or just write",
    leadDescription:
      "Choose a project type if you want a budget range. If you have little input, leave the short request above or write directly.",
    directFallback: "Or just write to me",
    blockFallback: "or leave a short request",
    optionalLabel: "optional",
    moneyLocale: "en-US",
    currency: "$",
    currencyPosition: "prefix",
    budgetStep: 50,
    budgetMin: 150,
    budgetGap: 100,
    dayShort: "d",
    timelineSuffix: "business days",
    kicker: "Project config",
    title: "Project type -> add-ons -> request",
    stepPrefix: "step",
    typeTitle: "Choose solution type",
    typeDescription:
      "After choosing the type, only the relevant add-ons remain below.",
    complexityTitle: "Complexity",
    complexityDescription:
      "This affects budget and timeline: first version, business product or complex system.",
    modulesTitle: "Add-ons",
    modulesDescription: "Options are shown for the {category} category.",
    urgencyTitle: "Timeline",
    urgencyDescription:
      "Choose a comfortable pace. Urgency increases cost, but compresses the work plan.",
    contactsTitle: "Contacts and description",
    contactsDescription:
      "These details will be included in the request together with the selected parameters and estimate.",
    fields: {
      name: "Name",
      namePlaceholder: "How should I address you",
      contact: "Where to reply",
      contactPlaceholder: "Telegram, phone, WhatsApp or email",
      email: "Email",
      emailPlaceholder: "optional",
      fileUrl: "Technical brief / file link",
      fileUrlPlaceholder: "Google Docs, Figma, archive",
      comment: "Short task description",
      commentPlaceholder:
        "For example: we need a mini app for a clothing store with a catalog, payments and friend invites.",
    },
    note:
      "The calculator shows an orientation point. Final cost is fixed after a short discussion of the task, connections, design and timeline.",
    submit: "Send request",
    sendAnother: "Send another",
    validationError: "Leave a contact and briefly describe the task.",
    fallbackSubmitError: "Could not submit the request.",
    unknownSubmitError:
      "Could not submit the request. Please try writing in Telegram.",
    successDelivered:
      "The request was sent to Telegram. I will come back with clarifying questions.",
    successStub:
      "Request received. I'll message you on Telegram shortly.",
    estimateLabel: "Preliminary estimate",
    timelineLabel: "Timeline:",
    summaryLabels: {
      category: "Category",
      complexity: "Complexity",
      urgency: "Pace",
    },
    selectedModules: "Selected add-ons",
    noModules:
      "No add-ons selected. The estimate is based only on base development.",
    requestFormat: "Request format",
    requestTitle: "New website request",
    requestOptions: "Add-ons",
    requestEstimate: "Estimate",
    baseDevelopment: "base development",
    viewCases: "View cases",
  },
  process: {
    eyebrow: "How the work goes",
    title: "After the request, the next steps are clear",
    description:
      "A clear process reduces uncertainty: parameters and clarification first, then first-version boundaries, final estimate, development, launch and support.",
    metrics: [
      { label: "Architecture", value: "scheme before code" },
      { label: "Delivery", value: "iterations and checks" },
      { label: "Launch", value: "launch and stabilization" },
    ],
  },
  cases: {
    eyebrow: "Cases",
    title: "Real project showcase: quickly understand the task type and result",
    description:
      "The homepage contains a compact selection across work types: Telegram, neural networks, crypto, server services, mini apps and websites. Details, flows and technical decisions live on a separate page.",
    intro:
      "Each card shows the task, assembled parts and the final result. Open the full case to see the details.",
    allCases: "All cases",
    carouselAria:
      "Case carousel. Cards can be rotated with the mouse or navigation buttons.",
    controlsAria: "Case navigation",
    previous: "Previous case",
    next: "Next case",
    openCase: "Open case",
    outcomesAria: "Key features",
    details: "Details",
    similar: "I want a similar project",
    discussCta: "Discuss a similar project",
    estimateCta: "Get a tighter estimate",
  },
  casesPage: {
    backHome: "Back home",
    eyebrow: "Case proof base",
    title: "Detailed cases: context, architecture, challenges and result",
    description:
      "On the homepage, cases work as a showcase. Here each project is expanded as a proof base: why it was needed, what was built, where the technical risks were and what working result came after launch.",
    countLabel: "cases",
    countDescription:
      "Telegram bots, mini apps, neural networks, crypto automation, server services and websites in one format.",
    estimateSimilar: "Estimate a similar project",
    navAria: "Case navigation",
    timeframe: "Timeline",
    keyResult: "Key result",
    stack: "Technologies",
    sections: {
      context: "Task context",
      modules: "What was implemented",
      integrations: "Connections and work logic",
      architecture: "Workflow",
      media: "Screenshots and interfaces",
      challenges: "Challenges and solutions",
      result: "Result",
    },
    mediaNote: "real or sample mockups",
    outcomes: "outcomes",
    cta: "CTA",
    wantSimilar: "I want a similar project",
    estimateCost: "Estimate cost",
    openProject: "Open project",
    imageAltSeparator: "-",
  },
  services: {
    eyebrow: "Budget guide",
    title: "Short price guides - in addition to the calculator",
    description:
      "These amounts help understand the budget order. The exact range is better calculated through the configurator above, because the scope of work, timeline and connections change the size of the project a lot.",
    budgetLabel: "budget",
    finalTitle: "Final cost depends on the details",
    finalDescription:
      "Final cost depends on scenarios, design, connections, payments, data volume and timeline. After launch, support can be connected separately:",
    estimateCta: "Estimate a project",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions worth closing before the start",
    description:
      "The clearer the scenarios, connections and constraints are at the start, the fewer surprises appear during development.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Calm engineering work without extra noise",
    description:
      "The wording is anonymized, but reflects a typical request: bring the product to a working state, not just write a separate program.",
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Tell me what you need to automate or launch.",
    description:
      "A short description without a technical brief is enough. I will come back with questions and propose a first scope of work, timeline and budget range.",
    estimateCta: "Get a tighter estimate",
    telegramCta: "Write in Telegram",
    footer:
      "Telegram bots, mini apps, neural networks, server part and turnkey launch.",
  },
  gallery: {
    previous: "Previous screen",
    next: "Next screen",
    open: "Open screen",
  },
};

export const enSiteData: SiteData = {
  meta: siteMeta,
  ui,
  contacts,
  navItems,
  heroMetrics,
  stack,
  specializations,
  proofItems,
  projectTypes: discountedUsdProjectTypes,
  complexityLevels,
  urgencyOptions,
  projectModules: discountedUsdProjectModules,
  cases,
  packages,
  retainer,
  budgetGuides,
  processSteps,
  trustItems,
  testimonials,
  faqs,
};
