import {
  contacts,
  cases as ruCases,
  stack,
  type CaseStudy,
} from "@/data/site.ru";

type SiteData = typeof import("@/data/site.ru").ruSiteData;

const priceDiscountFactor = 0.56;
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
  { label: "Cases", href: "#cases" },
  { label: "Process", href: "#process" },
  { label: "Estimator", href: "#estimator" },
  { label: "FAQ", href: "#faq" },
];

const heroMetrics: SiteData["heroMetrics"] = [
  { value: "5 yrs", label: "production engineering" },
  { value: "30+", label: "bots, services and integrations" },
  { value: "4 lanes", label: "Telegram / AI / Backend / Data" },
];

const specializations: SiteData["specializations"] = [
  {
    title: "Telegram products, Mini Apps and payments",
    audience:
      "For businesses that need a familiar Telegram interface for leads, sales, subscriptions, personal accounts and user support.",
    includes: [
      "bots and Mini Apps with catalog, roles and account areas",
      "YooKassa, CryptoBot, Telegram Stars, subscriptions and statuses",
      "admin panel, notifications, analytics and exports",
    ],
    tech: "aiogram 3, Telegram Bot API, Telegram Web Apps, PostgreSQL, Redis",
    result:
      "The user reaches a lead, payment or subscription inside Telegram, while the team sees statuses, payments and operational actions.",
  },
  {
    title: "AI modules and operational assistants",
    audience:
      "For teams that need AI inside a product, support flow, education product, document processing or internal operations.",
    includes: [
      "AI assistants, RAG knowledge bases and support workflows",
      "document, image, response processing and classification",
      "history, roles, limits, logs and response control",
    ],
    tech: "OpenAI SDK, Anthropic SDK, PyTorch, FastAPI, PostgreSQL",
    result:
      "AI becomes part of the process: it answers using your data, speeds up routine work and avoids manual copying between services.",
  },
  {
    title: "Backend, data and integrations",
    audience:
      "For products that need reliable server-side logic: APIs, data models, queues, statuses, integrations and maintainable deployment.",
    includes: [
      "FastAPI services, databases, queues and background jobs",
      "authorization, roles, webhooks and external APIs",
      "logging, Docker deployment and a clear project structure",
    ],
    tech: "FastAPI, SQLAlchemy 2.0 async, PostgreSQL, Redis, Docker",
    result:
      "The server side stores state, handles errors and stays understandable for future iterations after the first launch.",
  },
  {
    title: "Web tools, parsers and crypto automation",
    audience:
      "For teams that need a working web interface, data collection, market monitoring, signals or internal automation without manual routine.",
    includes: [
      "admin panels, forms, tables, statuses and analytics",
      "Playwright/httpx parsers, scheduled jobs and alerts",
      "exchange APIs, monitoring, signals and risk limits",
    ],
    tech: "Next.js, React, Playwright, Bybit API, PostgreSQL, Docker",
    result:
      "Operations become a working tool: data arrives on schedule, interfaces are clear and events are captured.",
  },
];

const proofItems: SiteData["proofItems"] = [
  {
    title: "Payments",
    summary:
      "YooKassa, CryptoBot, Telegram Stars, statuses, webhooks and subscriptions.",
    tags: ["payments", "webhooks", "status"],
  },
  {
    title: "Admin panels",
    summary:
      "Roles, tables, requests, manual actions, filters and operational logs.",
    tags: ["roles", "tables", "logs"],
  },
  {
    title: "AI modules",
    summary:
      "Assistants, RAG, document processing, limits and response control.",
    tags: ["OpenAI", "RAG", "limits"],
  },
  {
    title: "Parsers",
    summary:
      "Playwright/httpx, schedules, proxy risks, exports and alerts.",
    tags: ["data", "workers", "alerts"],
  },
  {
    title: "Deploy",
    summary:
      "Docker, Nginx, environments, logs, healthchecks and clear launch flow.",
    tags: ["Docker", "Nginx", "ops"],
  },
  {
    title: "Support",
    summary:
      "Bug fixes, small iterations, stabilization and post-release development.",
    tags: ["support", "iterations", "release"],
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
    label: "Telegram Mini App",
    description:
      "Interface inside Telegram: catalog, account area, cart, payment, referrals and admin panel.",
    baseLow: 70000,
    baseHigh: 115000,
    daysLow: 12,
    daysHigh: 20,
    defaultModules: ["database", "admin", "payments", "profile"],
  },
  {
    id: "ai-integration",
    label: "AI integration",
    description:
      "AI assistant, RAG, document processing, content generation or an AI module inside a product.",
    baseLow: 60000,
    baseHigh: 105000,
    daysLow: 10,
    daysHigh: 18,
    defaultModules: ["llm-api", "history-logs", "admin-ai"],
  },
  {
    id: "parser-automation",
    label: "Parser / automation",
    description:
      "Data collection, scheduled jobs, export, notifications and integrations with tables or databases.",
    baseLow: 30000,
    baseHigh: 60000,
    daysLow: 5,
    daysHigh: 12,
    defaultModules: ["single-site", "regular-run", "export"],
  },
  {
    id: "web-service",
    label: "Web service / admin panel",
    description:
      "Frontend, backend API, roles, dashboard, admin panel, payments and external integrations.",
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
      "Exchange APIs, price monitoring, signals, Telegram alerts, crypto payments and risk limits.",
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
    label: "MVP",
    description: "One core scenario, minimal roles and integrations.",
    priceFactor: 0.82,
    daysFactor: 0.86,
  },
  {
    id: "business",
    label: "Business product",
    description:
      "Several user scenarios, admin panel, data and day-to-day operation.",
    priceFactor: 1,
    daysFactor: 1,
  },
  {
    id: "system",
    label: "Complex system",
    description:
      "Many roles, integrations, states, payments or AI/crypto logic.",
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
    { id: "admin", label: "Admin panel", description: "Operators, settings, tables and manual actions.", price: 26000, days: 4 },
    { id: "payments", label: "Card payments", description: "Invoices, statuses, webhooks and repeated checks.", price: 24000, days: 4 },
    { id: "telegram-stars", label: "Telegram Stars", description: "Stars payments and correct event handling.", price: 18000, days: 3 },
    { id: "crypto-payments", label: "Crypto payments", description: "CryptoBot or a custom crypto payment flow.", price: 26000, days: 4 },
    { id: "referral", label: "Referral system", description: "Invites, bonuses, limits and accruals.", price: 18000, days: 3 },
    { id: "profile", label: "User account", description: "Profile, balance, subscription and order history.", price: 18000, days: 3 },
    { id: "notifications", label: "Notifications", description: "System messages, admin alerts and reminders.", price: 9000, days: 1 },
    { id: "analytics", label: "Analytics", description: "Summaries, conversions, exports and key events.", price: 14000, days: 2 },
    { id: "external-api", label: "External API integration", description: "CRM, payment provider, catalog or third-party service.", price: 22000, days: 4 },
    { id: "deploy", label: "Deployment", description: "Docker, env, server, basic logs and handoff notes.", price: 12000, days: 2 },
  ],
  "telegram-mini-app": [
    { id: "database", label: "Database", description: "Users, products, requests, payments and statuses.", price: 14000, days: 2 },
    { id: "admin", label: "Admin panel", description: "Catalog, requests, users and settings.", price: 28000, days: 5 },
    { id: "payments", label: "Card payments", description: "Payment inside the funnel, webhooks and statuses.", price: 26000, days: 4 },
    { id: "telegram-stars", label: "Telegram Stars", description: "Stars, limits, receipts and Telegram events.", price: 18000, days: 3 },
    { id: "crypto-payments", label: "Crypto payments", description: "CryptoBot, addresses, statuses and notifications.", price: 28000, days: 4 },
    { id: "referral", label: "Referral system", description: "Links, bonuses, tiers and anti-fraud limits.", price: 18000, days: 3 },
    { id: "profile", label: "User account", description: "Profile, history, balance, favorites or orders.", price: 20000, days: 3 },
    { id: "notifications", label: "Notifications", description: "Bot events, request statuses and admin alerts.", price: 10000, days: 1 },
    { id: "analytics", label: "Analytics", description: "Funnel, requests, payments, exports and summaries.", price: 16000, days: 2 },
    { id: "external-api", label: "External API integration", description: "Catalog, CRM, warehouse, exchanger or payment gateway.", price: 24000, days: 4 },
    { id: "deploy", label: "Deployment", description: "Build, server, nginx, env and production launch.", price: 14000, days: 2 },
  ],
  "ai-integration": [
    { id: "llm-api", label: "OpenAI / Claude API", description: "Model connection, limits, roles and error control.", price: 22000, days: 3 },
    { id: "rag", label: "RAG knowledge base", description: "Document upload, chunks, search and answer context.", price: 42000, days: 7 },
    { id: "documents", label: "Document processing", description: "PDFs, tables, classification and data extraction.", price: 28000, days: 5 },
    { id: "classification", label: "Text classification", description: "Topics, statuses, routing and auto-checks.", price: 20000, days: 3 },
    { id: "content-generation", label: "Content generation", description: "Prompts, templates, drafts and result control.", price: 22000, days: 3 },
    { id: "ai-assistant", label: "AI assistant", description: "Dialogue, memory, tools, roles and constraints.", price: 32000, days: 5 },
    { id: "existing-product", label: "Existing product integration", description: "API, webhooks, UI and safe embedding.", price: 28000, days: 5 },
    { id: "admin-ai", label: "Admin panel", description: "Prompt settings, limits, users and diagnostics.", price: 24000, days: 4 },
    { id: "history-logs", label: "History / logs", description: "Dialogues, events, errors, audit and export.", price: 14000, days: 2 },
  ],
  "parser-automation": [
    { id: "single-site", label: "Single website", description: "Stable collection from one source.", price: 12000, days: 2 },
    { id: "multi-site", label: "Multiple websites", description: "Data normalization across several sources.", price: 26000, days: 5 },
    { id: "auth", label: "Authorization", description: "Account area, cookies, sessions and access refresh.", price: 18000, days: 3 },
    { id: "captcha", label: "Captcha / anti-bot", description: "Risk assessment, fallback scenarios and resilience.", price: 26000, days: 5 },
    { id: "proxies", label: "Proxies", description: "Rotation, limits, errors and block control.", price: 16000, days: 3 },
    { id: "regular-run", label: "Scheduled runs", description: "Schedule, retries, reports and failure control.", price: 12000, days: 2 },
    { id: "export", label: "Excel / CSV / Google Sheets", description: "Formatted exports for the team.", price: 12000, days: 2 },
    { id: "database", label: "Database", description: "History storage, deduplication and statuses.", price: 14000, days: 2 },
    { id: "telegram-alerts", label: "Telegram alerts", description: "Alerts for new data, errors and run summaries.", price: 9000, days: 1 },
  ],
  "web-service": [
    { id: "frontend", label: "Frontend", description: "Product UI, forms, tables and states.", price: 32000, days: 6 },
    { id: "backend-api", label: "Backend API", description: "Business logic, endpoints, statuses and integrations.", price: 30000, days: 6 },
    { id: "auth", label: "Authorization", description: "Login, sessions, access rights and security.", price: 20000, days: 3 },
    { id: "roles", label: "User roles", description: "Admin, operator, client and action limits.", price: 18000, days: 3 },
    { id: "database-web", label: "Database", description: "Entities, migrations, relations and change history.", price: 18000, days: 3 },
    { id: "admin", label: "Admin panel", description: "Data management, filters, actions and export.", price: 28000, days: 5 },
    { id: "dashboard", label: "Dashboard / analytics", description: "Metrics, charts, summaries and operational control.", price: 24000, days: 4 },
    { id: "payments", label: "Card payments", description: "Invoices, statuses, webhooks and financial events.", price: 26000, days: 4 },
    { id: "external-integrations", label: "External integrations", description: "CRM, ERP, Telegram, tables or third-party APIs.", price: 24000, days: 4 },
  ],
  "crypto-trading-bot": [
    { id: "exchange-api", label: "Bybit / Binance / OKX API", description: "REST, WebSocket, limits and error handling.", price: 28000, days: 5 },
    { id: "dex", label: "Solana / Ethereum DEX", description: "On-chain data, RPC, DEX APIs and transactions.", price: 42000, days: 8 },
    { id: "price-monitoring", label: "Price monitoring", description: "Market scanner, filters, frequency and storage.", price: 20000, days: 3 },
    { id: "signals", label: "Trading signals", description: "Entry conditions, rules, filters and test modes.", price: 26000, days: 5 },
    { id: "telegram-alerts", label: "Telegram alerts", description: "Signals, trades, errors and daily reports.", price: 9000, days: 1 },
    { id: "crypto-payments", label: "Crypto payments", description: "Payment intake, statuses, checks and notifications.", price: 26000, days: 4 },
    { id: "trade-logs", label: "Trade logs", description: "History, PnL, dry-run, export and audit.", price: 16000, days: 3 },
    { id: "risk-limits", label: "Risk limits", description: "Position limits, stops, shutdowns and duplicate protection.", price: 24000, days: 4 },
  ],
  "not-sure": [
    { id: "discovery", label: "Discovery", description: "Goal, scenarios, risks and constraints review.", price: 8000, days: 1 },
    { id: "mvp-scope", label: "MVP scope", description: "What goes into the first version and what waits.", price: 10000, days: 2 },
    { id: "architecture", label: "Architecture map", description: "Entities, roles, integrations and roadmap.", price: 14000, days: 2 },
    { id: "prototype", label: "Scenario prototype", description: "Fast clickable or text outline of the solution.", price: 16000, days: 3 },
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
    title: "Subscription Bot - digital subscriptions with automatic access",
    type: "Subscription automation",
    category: "Telegram",
    shortSummary:
      "Telegram bot for a subscription product: plans, four payment providers, automatic access delivery and a web admin panel for operators.",
    problem:
      "Leads, payments and access delivery were handled manually in chat: clients waited for an operator, plans got mixed up and audience growth broke the process.",
    solution:
      "One aiohttp service handles the Telegram bot, payment webhooks and a Jinja2 admin panel. The purchase flow is built as an FSM: plan, location, payment and automatic access delivery.",
    result:
      "The funnel from plan selection to access delivery works without a human, while the operator manages plans, payments, broadcasts and disputed cases in the admin panel.",
    metrics: ["4 payment providers", "automatic access", "broadcasts and reminders"],
    outcomes: ["card payments", "admin panel", "auto delivery", "broadcasts"],
    timeframe: "MVP + production launch",
    keyResult:
      "A subscription purchase completes without an operator: from plan selection to access delivery.",
    context: [
      "The client needed a Telegram sales funnel for digital subscriptions without manual credentials delivery in direct messages.",
      "The manual process did not scale: operators mixed up plans, locations and payment statuses.",
      "A simple chat bot was not enough: payment webhooks, an admin panel, reminders and controlled edge cases were required.",
    ],
    modules: [
      "FSM purchase flow: plan, location, payment provider, invoice and access delivery.",
      "Jinja2 admin panel for plans, users, payments, providers and broadcasts.",
      "APScheduler for subscription expiration, reminders and background broadcast jobs.",
      "Settings and button cache with invalidation after admin panel changes.",
    ],
    architecture: ["User", "Telegram bot", "aiohttp backend", "PostgreSQL", "payment webhooks", "admin panel"],
    media: [
      { title: "Telegram bot", items: ["main menu", "plans", "payment provider selection", "access delivered"] },
      { title: "Admin panel", items: ["payments by provider", "plan editor", "broadcasts", "payment settings"] },
      { title: "Engineering", items: ["purchase FSM", "APScheduler jobs", "webhook flow map"] },
    ],
    challenges: [
      { title: "Many payment providers", text: "Events are normalized into one payment model so operators see statuses consistently regardless of source." },
      { title: "Automatic access without chaos", text: "The purchase is split into FSM steps, and access delivery starts only after a confirmed payment event." },
      { title: "Settings without redeploy", text: "Plans, locations and payment toggles live in the admin panel with controlled cache refresh." },
    ],
    resultDetails: [
      "Operators only handle disputed cases and support.",
      "Plans, locations and providers are managed through the admin panel.",
      "The user receives access immediately after successful payment.",
    ],
  },
  "sapsanex-mini-app": {
    title: "SapsanEx - Telegram Mini App for an exchanger",
    type: "Telegram Mini App / exchanger",
    category: "Mini App",
    shortSummary:
      "Mini App for an exchanger: rate calculation, request creation, status polling and notifications stay inside Telegram.",
    problem:
      "A user came from Telegram, moved to a website, created a request and checked status on a separate screen. The mobile funnel lost people at every transition.",
    solution:
      "A Docker Compose stack combines a React Mini App, FastAPI gateway, aiogram bot and PostgreSQL. Authorization uses Telegram initData, while the exchanger API is wrapped in a typed layer.",
    result:
      "Rate calculation, request creation, status polling, timeout cancellation and status notifications stay inside Telegram with no separate login.",
    metrics: ["Telegram WebApp auth", "typed exchanger gateway", "ru/en i18n"],
    outcomes: ["Mini App", "Telegram auth", "API gateway", "statuses"],
    timeframe: "ready for production deployment",
    keyResult: "The exchange flow runs in Telegram without sending the user to an external website.",
    context: [
      "Customers came from Telegram, but the key exchange steps happened on an external website.",
      "The mobile funnel lost users between the bot, browser and status page.",
      "The third-party exchanger API used form-data and lacked a convenient typed request model.",
    ],
    modules: [
      "React + TypeScript Mini App with calculator, request creation and history.",
      "FastAPI gateway over the exchanger API with Pydantic models.",
      "aiogram bot for WebApp launch and status change notifications.",
      "Background timeout cancellation and status polling inside the interface.",
    ],
    architecture: ["User", "Telegram WebApp", "React Mini App", "FastAPI gateway", "Premium Exchanger API", "PostgreSQL", "aiogram bot"],
    media: [
      { title: "Mini App", items: ["calculator", "request confirmation", "status polling", "request history"] },
      { title: "Telegram notifications", items: ["request created", "status changed", "timeout auto-cancel"] },
      { title: "Engineering", items: ["HMAC initData", "typed API wrapper", "WebApp flow map"] },
    ],
    challenges: [
      { title: "Authorization without login", text: "Telegram initData is validated with HMAC-SHA256, so the user does not need a separate account." },
      { title: "Unfriendly external API", text: "The form-data API is hidden behind a typed gateway layer, so the frontend works with clean DTOs." },
      { title: "Stuck requests", text: "A background job closes timed-out requests, while the user sees current status directly in the Mini App." },
    ],
    resultDetails: [
      "Calculation, request creation and tracking remain inside Telegram.",
      "Statuses arrive through bot notifications and update inside the Mini App.",
      "A local request journal stores history and reduces dependence on the external API.",
    ],
  },
  "seedream-tryon": {
    title: "Seedream Bot - AI clothing try-on in Telegram",
    type: "AI bot / e-commerce",
    category: "AI",
    shortSummary:
      "Telegram bot for AI try-on: product upload, generation parameters, Seedream API, Telegram Stars, YooKassa and a FastAPI admin panel.",
    problem:
      "A store needed a try-on flow that felt like a product, not a demo: payments, balance, history, moderation and operator visibility had to be included.",
    solution:
      "The bot guides the user through upload, generation settings and payment, then sends the job to Seedream. FastAPI admin covers users, tariffs, payments and manual balance changes.",
    result:
      "A store gets AI try-on and monetization inside Telegram, with operator control over payments and user balances.",
    metrics: ["Seedream API", "Stars + YooKassa", "FastAPI admin"],
    outcomes: ["AI generation", "payments", "balance", "admin"],
    timeframe: "own product / demo-ready",
    keyResult: "The store gets AI try-on and monetization inside Telegram.",
    context: [
      "The goal was to turn AI try-on into a paid Telegram product with a clean user flow.",
      "Users needed history, balance and understandable limits, not a one-off generation command.",
      "The operator needed visibility into users, payments, tariffs and manual credits.",
    ],
    modules: [
      "Telegram bot flow for product upload, parameters, generation and result history.",
      "Seedream API integration with request validation and result delivery.",
      "Telegram Stars and YooKassa payments with balance accounting.",
      "FastAPI admin panel for users, tariffs, payments and manual credits.",
    ],
    architecture: ["User", "Telegram bot", "FastAPI backend", "Seedream API", "payments", "PostgreSQL", "admin panel"],
    media: [
      { title: "Telegram bot", items: ["product upload", "parameters", "AI result", "generation history"] },
      { title: "Payments", items: ["Stars invoice", "YooKassa checkout", "generation balance"] },
      { title: "Admin panel", items: ["users", "payments", "tariffs", "manual credits"] },
    ],
    challenges: [
      { title: "AI as a product, not a demo", text: "Generation is embedded into a clear flow with balance, history and tariffs." },
      { title: "Two payment rails in one bot", text: "Stars covers quick micro-purchases, while YooKassa covers larger packages and subscription scenarios." },
      { title: "Operator control", text: "The admin panel shows payments, users and credits without database access." },
    ],
    resultDetails: [
      "A user can buy generations and receive AI try-on results inside Telegram.",
      "The store can manage tariffs and balances without developer involvement.",
      "The architecture is ready for product demos and further e-commerce integration.",
    ],
  },
  "ai-reply-assistant": {
    title: "AI Reply Assistant - Telegram bot with 7 AI scenarios",
    type: "AI Telegram bot",
    category: "AI",
    shortSummary:
      "AI assistant inside Telegram: seven scenarios, GPT-4o, YooKassa, referral flow and proxy rotation for stable model access.",
    problem:
      "The product needed to package multiple AI reply scenarios into a simple Telegram flow with payments, trial limits and stable upstream access.",
    solution:
      "A scenario router builds prompts, tracks user limits and sends requests through a proxy pool. YooKassa, referrals and usage history are tied to the user account.",
    result:
      "Users receive AI replies in Telegram, while model calls run through a resilient proxy pool.",
    metrics: ["7 AI scenarios", "GPT-4o", "proxy rotation"],
    outcomes: ["prompt builder", "payments", "referrals", "limits"],
    timeframe: "MVP ready for production",
    keyResult: "The user gets AI replies in Telegram, and the model is called through a resilient proxy pool.",
    context: [
      "The product needed several AI scenarios without turning the bot into a confusing prompt editor.",
      "Access to the model had to survive slow or failing proxy nodes.",
      "Trial limits, packages, receipts and referral bonuses had to stay consistent in the database.",
    ],
    modules: [
      "Telegram scenario menu with context upload and AI answer variants.",
      "Prompt builder for seven use cases with shared safety and formatting rules.",
      "YooKassa checkout, referral screen and user limits.",
      "Proxy pool with cooldown for failed nodes and rotation for slow ones.",
    ],
    architecture: ["User", "Telegram bot", "scenario router", "prompt builder", "proxy pool", "GPT-4o", "PostgreSQL"],
    media: [
      { title: "Telegram bot", items: ["main menu", "scenario selection", "context upload", "answer variants"] },
      { title: "Payments", items: ["packages", "YooKassa checkout", "referral screen"] },
      { title: "Engineering", items: ["prompt builder", "proxy rotation", "YooKassa webhook"] },
    ],
    challenges: [
      { title: "Neutral UX", text: "Scenarios are framed as a universal messaging assistant without risky public wording." },
      { title: "Unstable upstream", text: "The proxy pool picks a working node, cools down failed proxies and rotates slow ones." },
      { title: "Payment funnel", text: "Trial, packages, fiscal receipt and referral bonuses are connected to user limits in the database." },
    ],
    resultDetails: [
      "The bot can serve multiple AI reply scenarios from one clean menu.",
      "Payments and limits are connected to user state.",
      "Proxy rotation improves model access stability.",
    ],
  },
  "bybit-trading-bot": {
    title: "ByBit Trading Bot - 24/7 spot trading",
    type: "Crypto trading automation",
    category: "Crypto",
    shortSummary:
      "Trading automation: Bybit WebSocket/REST, Volume Spike + Price Acceleration strategy, risk manager and Telegram reports.",
    problem:
      "The market had to be scanned continuously across hundreds of instruments, with signal logic separated from execution and risk controls.",
    solution:
      "The scanner receives market data through Bybit WebSocket/REST, the strategy detects volume and acceleration, and the risk manager controls entries, exits and dry-run behavior.",
    result:
      "Scanning, signal generation, position entry and exit run autonomously around the clock.",
    metrics: ["300+ instruments", "dry-run mode", "Telegram reports"],
    outcomes: ["market scanner", "strategy", "risk manager", "alerts"],
    timeframe: "production-ready pipeline",
    keyResult: "Scanning, signal, entry and exit work autonomously 24/7.",
    context: [
      "Manual monitoring was too slow for the number of spot instruments.",
      "Signal logic needed to be testable without immediately placing real orders.",
      "The operator needed Telegram reports and visibility into positions.",
    ],
    modules: [
      "Bybit WebSocket/REST market scanner with filtering.",
      "Volume Spike + Price Acceleration strategy.",
      "Position manager with limits, stops and exit conditions.",
      "Telegram signals, close notifications and daily reports.",
    ],
    architecture: ["Bybit market data", "scanner", "strategy", "risk manager", "order layer", "PostgreSQL", "Telegram reports"],
    media: [
      { title: "Strategy", items: ["volume spike chart", "price acceleration", "positions table"] },
      { title: "Telegram", items: ["entry signal", "position close", "daily report"] },
      { title: "Engineering", items: ["scanner log", "strategy code", "position manager"] },
    ],
    challenges: [
      { title: "300+ instruments", text: "The scanner is separated from the strategy so market filtering does not mix with entry logic." },
      { title: "Risk before live mode", text: "Dry-run allows the full flow to run on real data without placing account orders." },
      { title: "Position control", text: "The risk manager tracks position limits, stops and exit conditions." },
    ],
    resultDetails: [
      "The system scans markets and sends signals without manual watching.",
      "Dry-run and logging make strategy checks safer before live mode.",
      "Telegram reports keep the operator informed about entries, exits and health.",
    ],
  },
  "eps-bot": {
    title: "EPS Bot - ML trading on Solana DEX",
    type: "DEX trading / ML pipeline",
    category: "Crypto",
    shortSummary:
      "R&D pipeline for Solana DEX: OHLCV collection, ML model training, strategy, on-chain execution and Telegram reports.",
    problem:
      "A trading hypothesis needed a single pipeline from market data collection to model training and on-chain execution.",
    solution:
      "The project separates data collection, model training, strategy thresholds and Solana transaction tooling into distinct layers.",
    result:
      "The hypothesis can be tested from raw data to an on-chain trade inside one pipeline.",
    metrics: ["OHLCV collection", "model compare", "Raydium tx layer"],
    outcomes: ["data pipeline", "ML training", "backtest", "on-chain"],
    timeframe: "R&D / technology case",
    keyResult: "The hypothesis is tested from data to an on-chain trade in one pipeline.",
    context: [
      "The goal was not only to trigger trades, but to test the full path from data to execution.",
      "Models and thresholds had to be replaceable without rewriting API clients.",
      "Solana RPC and DEX transaction details needed isolation from strategy code.",
    ],
    modules: [
      "OHLCV collection for Solana pools.",
      "Training pipeline with model comparison and backtest reports.",
      "Strategy threshold layer for different market regimes.",
      "Raydium / Solana transaction tools separated from strategy logic.",
    ],
    architecture: ["DEX data", "collector", "training pipeline", "strategy", "tx_tools", "Solana RPC", "Telegram reports"],
    media: [
      { title: "ML and market", items: ["OHLCV signals", "training curves", "model compare"] },
      { title: "CLI", items: ["collect pools", "train model", "backtest report"] },
      { title: "Engineering", items: ["LSTM snippet", "strategy threshold", "Raydium tx"] },
    ],
    challenges: [
      { title: "Data before model", text: "Market collection and training are separated so the model can change without rewriting API clients." },
      { title: "Different models", text: "The pipeline allows comparing several architectures and thresholds for different market regimes." },
      { title: "On-chain execution", text: "tx_tools are isolated so the strategy does not depend on Solana RPC details." },
    ],
    resultDetails: [
      "The R&D loop covers data, training, backtest and execution.",
      "Models and thresholds can be changed independently.",
      "On-chain execution is separated from strategy logic.",
    ],
  },
  "frax-redesign": {
    title: "Frax - WordPress crypto exchanger redesign",
    type: "Crypto exchanger redesign",
    category: "Web",
    shortSummary:
      "Frontend redesign for a WordPress exchanger: new UI, mobile calculator and careful integration over the existing plugin.",
    problem:
      "The exchanger needed a more mature interface without replacing the CMS or risking the existing exchange backend.",
    solution:
      "The redesign wraps existing plugin outputs with a new layout, component CSS layer and mobile-first calculator flow.",
    result:
      "The new interface was rolled out without replacing the CMS or disturbing the exchange backend.",
    metrics: ["WordPress layer", "mobile calculator", "no backend rewrite"],
    outcomes: ["redesign", "mobile UX", "shortcode wrapper", "safe rollout"],
    timeframe: "production rollout",
    keyResult: "The new interface was shipped without replacing the CMS or risking the exchange backend.",
    context: [
      "The business logic already worked inside WordPress and could not be replaced quickly.",
      "The old interface reduced trust and was uncomfortable on mobile.",
      "The client needed maintainable templates without heavy build infrastructure.",
    ],
    modules: [
      "New landing and exchange direction screens.",
      "Mobile calculator and application form improvements.",
      "PHP shortcode wrapper around existing plugin output.",
      "CSS component layer for maintainable visual updates.",
    ],
    architecture: ["User", "WordPress page", "shortcode wrapper", "existing plugin", "exchange backend", "operator"],
    media: [
      { title: "Before / after", items: ["old hero", "new hero", "mobile calculator"] },
      { title: "New design", items: ["exchange directions", "request form", "FAQ / rules"] },
      { title: "Engineering", items: ["PHP shortcode wrapper", "CSS component layer"] },
    ],
    challenges: [
      { title: "Do not break the plugin", text: "Business logic was not rewritten: the new markup wrapped existing outputs." },
      { title: "Mobile calculator", text: "Fields, buttons and action order were redesigned for one-handed use." },
      { title: "Client support", text: "Styles and templates stayed in a simple WordPress layer without unnecessary tooling." },
    ],
    resultDetails: [
      "The exchanger received a more trustworthy interface.",
      "The rollout did not require backend replacement.",
      "The client can maintain the visual layer in WordPress.",
    ],
  },
  "tech-rise-academy": {
    title: "Tech Rise Academy - landing with Telegram leads",
    type: "Landing / lead automation",
    category: "Backend",
    shortSummary:
      "Multi-page academy landing with a FastAPI endpoint: leads are validated and sent to the owner in Telegram within seconds.",
    problem:
      "The academy needed a fast domain launch and a reliable lead path without a separate CRM.",
    solution:
      "Static pages are connected to a FastAPI lead endpoint. The backend validates the form and sends a structured lead card to Telegram.",
    result:
      "A lead reaches the owner in Telegram a few seconds after form submission.",
    metrics: ["FastAPI endpoint", "Telegram inbox", "Docker + Nginx"],
    outcomes: ["landing", "lead handler", "Telegram alerts", "deployment"],
    timeframe: "fast domain launch",
    keyResult: "A lead reaches the owner in Telegram within seconds after the form.",
    context: [
      "The academy needed to launch pages and start collecting leads quickly.",
      "A separate CRM would add overhead for the first version.",
      "Contacts, links and offer details had to be editable without code changes.",
    ],
    modules: [
      "Multi-page landing with hero, program sections, course page and lead form.",
      "FastAPI endpoint for validation and Telegram delivery.",
      "config.js for contacts, links and offer settings.",
      "Docker Compose and Nginx deployment setup.",
    ],
    architecture: ["Visitor", "landing form", "FastAPI endpoint", "Telegram Bot API", "owner chat", "Nginx", "Docker"],
    media: [
      { title: "Landing", items: ["hero", "programs", "course page", "lead form"] },
      { title: "Lead flow", items: ["Telegram lead card", "config.js", "lead handler"] },
      { title: "Engineering", items: ["Docker Compose", "Nginx", "FastAPI endpoint"] },
    ],
    challenges: [
      { title: "No CRM", text: "A Telegram chat became the single inbox for leads without a separate database or paid CRM." },
      { title: "Edits without developer", text: "Contacts, links and offer copy were moved into config.js." },
      { title: "Fast reaction", text: "The backend sends the lead to the owner immediately after form validation." },
    ],
    resultDetails: [
      "The academy can collect leads immediately after launch.",
      "The owner gets structured Telegram notifications.",
      "Basic content settings can be changed without touching backend logic.",
    ],
  },
  "gym-progres": {
    title: "gym_progres - workout tracker with auto-save",
    type: "Niche web app",
    category: "Backend",
    shortSummary:
      "Personal workout tracker: SSR on FastAPI, Alpine.js auto-save, public templates and progress history.",
    problem:
      "Workout logging needed to be fast on one screen and should not lose sets while the user trains.",
    solution:
      "SSR screens provide a lightweight interface, while Alpine.js sends debounced auto-save updates to JSON endpoints.",
    result:
      "A workout can be logged on one screen: the user enters sets and the data saves itself.",
    metrics: ["SSR + Alpine.js", "auto-save", "public templates"],
    outcomes: ["workout form", "auto-save", "templates", "progress"],
    timeframe: "own product",
    keyResult: "A workout can be tracked on one screen: enter sets and the data saves automatically.",
    context: [
      "A training tracker needed a fast interface without heavy client-side infrastructure.",
      "Set data had to persist while the user was still editing.",
      "Shared templates needed import without duplicates.",
    ],
    modules: [
      "FastAPI SSR dashboard, workout form and exercise catalog.",
      "Alpine.js auto-save with debounced JSON API updates.",
      "Public templates, import confirmation and share modal.",
      "Progress history and charts.",
    ],
    architecture: ["User", "SSR page", "Alpine.js", "JSON API", "database", "templates", "progress view"],
    media: [
      { title: "Web app", items: ["dashboard", "workout form", "exercise catalog", "progress chart"] },
      { title: "Templates", items: ["public template", "import confirm", "share modal"] },
      { title: "Engineering", items: ["auto-save snippet", "template import", "SSR + JSON architecture"] },
    ],
    challenges: [
      { title: "Auto-save without surprises", text: "Changes are debounced on the client and sent to a JSON API, so the user simply enters data." },
      { title: "Templates without duplicates", text: "Import is idempotent: existing elements do not multiply." },
      { title: "Niche app without React", text: "SSR + Alpine.js gave a fast interface without a heavy client stack." },
    ],
    resultDetails: [
      "Workout entry is fast and resilient to missed save clicks.",
      "Templates can be shared and imported safely.",
      "The product stays lightweight and easy to maintain.",
    ],
  },
  "skillup": {
    title: "SkillUp - AI learning platform",
    type: "AI education product",
    category: "AI",
    shortSummary:
      "Full-stack AI service: onboarding, personal roadmap generation, progress tree, Celery/Redis and Anthropic API.",
    problem:
      "Learners needed a structured plan instead of a long AI text answer, with progress, explanations and quizzes.",
    solution:
      "Onboarding data is sent to an AI pipeline that generates a four-tier roadmap. Long jobs run through Celery, and the frontend renders the plan as an interactive tree.",
    result:
      "The user receives a personal learning plan and sees progress as an interactive tree.",
    metrics: ["4-tier roadmap", "Celery/Redis", "Claude API"],
    outcomes: ["onboarding", "AI roadmap", "progress tree", "quiz"],
    timeframe: "own AI product",
    keyResult: "The user gets a personal learning plan and sees progress as an interactive tree.",
    context: [
      "The product had to turn a vague learning goal into a concrete path.",
      "Long AI tasks needed progress feedback instead of a frozen interface.",
      "The roadmap had to remain structured for explanations, statuses and quizzes.",
    ],
    modules: [
      "Onboarding chat that collects goals and current level.",
      "AI roadmap generation with tiered nodes.",
      "Interactive progress tree with node statuses.",
      "Celery/Redis background tasks and Claude API calls.",
    ],
    architecture: ["User", "onboarding", "AI pipeline", "Celery worker", "Claude API", "database", "progress tree"],
    media: [
      { title: "Product", items: ["onboarding", "plan builder", "tree", "quiz"] },
      { title: "AI pipeline", items: ["onboarding chat", "plan generation", "node explanation", "quiz generation"] },
      { title: "Engineering", items: ["Celery task", "canvas layout", "Claude API call"] },
    ],
    challenges: [
      { title: "Plan instead of text wall", text: "The AI answer is structured into four tiers with nodes, statuses and order." },
      { title: "Long AI jobs", text: "Generation runs in Celery so the frontend can show progress and stay responsive." },
      { title: "Flexible tree layout", text: "Node positions are calculated on the frontend from tier and order_index without storing coordinates in the database." },
    ],
    resultDetails: [
      "The learner receives a structured roadmap instead of generic advice.",
      "Long AI generation does not block the interface.",
      "The tree can grow with new node types and quizzes.",
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
    subtitle: "Small Telegram bot, MVP or one integration.",
    price: `from ${formatDiscountedUsdPrice(48000)}`,
    firstProjectPrice: `first project from ${formatDiscountedUsdPrice(38400)}`,
    term: "1-2 weeks",
    includes: [
      "task diagnostics and a short technical brief",
      "one core user scenario",
      "bot or backend integration",
      "basic database or state storage",
      "deployment and short handoff notes",
    ],
    excludes: ["complex roles and admin panel", "multiple payment providers", "long post-release support"],
    featured: false,
  },
  {
    title: "Standard",
    subtitle:
      "Full bot/backend service with payments, database, admin panel and deployment.",
    price: `from ${formatDiscountedUsdPrice(112000)}`,
    firstProjectPrice: `first project from ${formatDiscountedUsdPrice(89600)}`,
    term: "3-5 weeks",
    includes: [
      "technical scheme and architecture",
      "several user scenarios",
      "payments, database and roles",
      "admin actions and notifications",
      "Docker deployment, logging and testing",
    ],
    excludes: ["complex ML pipeline", "multi-stage analytics", "24/7 support"],
    featured: true,
  },
  {
    title: "Premium",
    subtitle:
      "Complex system: AI, integrations, payments, queues, monitoring and launch support.",
    price: `from ${formatDiscountedUsdPrice(224000)}`,
    firstProjectPrice: `first project from ${formatDiscountedUsdPrice(179200)}`,
    term: "6-10 weeks",
    includes: [
      "detailed architecture and project constraints",
      "AI/LLM or several external integrations",
      "payments, queues, monitoring and roles",
      "documentation, staging and production environments",
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
    "Bug fixes, small improvements, integration updates, error control, post-release help and planning for next iterations.",
};

const budgetGuides: SiteData["budgetGuides"] = [
  {
    title: "Small bot / script",
    price: `from ${formatDiscountedUsdPrice(15000)}`,
    description:
      "Simple automation, notifications and basic logic.",
  },
  {
    title: "Business bot / parser / backend module",
    price: `from ${formatDiscountedUsdPrice(40000)}`,
    description:
      "Database, roles, integrations, API and scheduled jobs.",
  },
  {
    title: "Mini App / AI service / turnkey system",
    price: `from ${formatDiscountedUsdPrice(100000)}`,
    description:
      "Frontend, backend, admin panel, payments, analytics and AI modules.",
  },
];

const processSteps: SiteData["processSteps"] = [
  {
    title: "Task review",
    text:
      "We lock scenarios, roles, data, constraints and first-launch risks.",
    deliverable:
      "A clear MVP boundary and the questions that should be closed before code.",
  },
  {
    title: "Architecture and estimate",
    text:
      "I map the system, integrations, states, acceptance criteria and budget range.",
    deliverable:
      "A system map, delivery stages, timeline and an honest risk estimate.",
  },
  {
    title: "MVP / first result",
    text:
      "I build the first working scenario: bot, Mini App, API, AI module, parser or interface.",
    deliverable:
      "A version that can be opened, checked and shown to the team.",
  },
  {
    title: "Integrations and testing",
    text:
      "I connect payments, CRM, sheets, AI/OCR/RAG, access roles, notifications and checks.",
    deliverable:
      "Connected services, handled errors and a clear smoke-check list.",
  },
  {
    title: "Deploy and handoff",
    text:
      "I prepare Docker/Nginx, environment variables, logs, instructions and the server launch.",
    deliverable:
      "Working production, access details, short documentation and the next-iteration plan.",
  },
];

const trustItems: SiteData["trustItems"] = [
  "5 years of commercial Python development",
  "30+ completed turnkey projects",
  "Experience with payments, refunds, statuses and webhooks",
  "AI/LLM integrations with constraints, roles and knowledge bases",
  "Backend-first approach: data, statuses and errors are planned early",
  "Deployment, logging and post-launch support",
  "Clear work boundaries, timelines and project-specific conditions",
];

const testimonials: SiteData["testimonials"] = [
  {
    quote:
      "We needed not just a bot, but a working service with payments, statuses and admin actions. Ramil quickly mapped the task, showed risks and brought it to launch without extra drama.",
    author: "Founder of a Telegram service",
  },
  {
    quote:
      "We did not want to break the existing exchanger. We got a careful redesign, a clearer request flow and a more mature product feel without rewriting the whole backend.",
    author: "Owner of an exchange project",
  },
  {
    quote:
      "The value was in the engineering thinking: where to store states, how to limit access, what to monitor after release. The internal tool became predictable in operation.",
    author: "Product manager of an internal tool",
  },
];

const faqs: SiteData["faqs"] = [
  {
    question: "Can I start without a ready technical specification?",
    answer:
      "Yes. It is enough to describe the task, users, desired result and constraints. I will help shape the MVP, scenarios, integrations and first-version boundaries.",
  },
  {
    question: "Why is the calculator estimate preliminary?",
    answer:
      "The calculator cannot see details such as design, existing code quality, API complexity, payments, data volume, deadlines and hidden edge cases. The final cost is fixed after a short task review.",
  },
  {
    question: "Can we start with an MVP?",
    answer:
      "Yes. Usually an MVP fixes one main scenario, a minimal set of integrations and a clear hypothesis check. After launch, roles, payments, admin panel and analytics can expand.",
  },
  {
    question: "Do you build Telegram Mini Apps?",
    answer:
      "Yes. I can build a Mini App with Telegram initData authorization, catalog, account area, payments, referrals, admin panel and backend API.",
  },
  {
    question: "Can AI be added to an existing project?",
    answer:
      "Yes, if the project can be deployed or has a clear API. Possible options include an AI assistant, RAG knowledge base, document processing, text classification, content generation and history logging.",
  },
  {
    question: "Do you work with payments, Telegram Stars and crypto?",
    answer:
      "Yes. YooKassa, Telegram Stars, CryptoBot, crypto payments and custom payment flows are possible. Webhooks, statuses, repeated payments and admin operations are checked separately.",
  },
  {
    question: "Can you improve an existing project?",
    answer:
      "Yes, if there is access to code, environment and data for testing. I start with diagnostics: dependencies, architecture, database, deployment and change risks.",
  },
  {
    question: "What happens after I send a request?",
    answer:
      "I review the selected configuration, ask clarifying questions, suggest MVP boundaries and return with a final budget range, timeline and stages after a short discussion.",
  },
];

const siteMeta: SiteData["meta"] = {
  title: "Ramil Kaneev - turnkey AI, backend and Telegram development",
  description:
    "Telegram bots, Mini Apps, AI/ML integrations, backend APIs, parsing, web services, crypto/trading tools, deployment and support.",
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
  openGraphTitle: "Ramil Kaneev - AI, backend and Telegram development",
  openGraphDescription:
    "Telegram bots, Mini Apps, AI modules, backend systems, parsers and integrations from MVP to production.",
};

const ui: SiteData["ui"] = {
  brandName: "Ramil Kaneev",
  header: {
    backToTop: "Back to top",
    navAria: "Main navigation",
    contactCta: "Telegram",
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
    badge: "Telegram / AI / backend / automation",
    headline: ["AI, backend and Telegram", "turnkey"],
    description:
      "I build Telegram bots, Mini Apps, backend systems, AI modules, parsers and integrations - from MVP to a working product with admin panel, payments and analytics.",
    primaryCta: "Estimate a project",
    secondaryCta: "View cases",
    trustBar: ["10+ projects", "Telegram Mini Apps", "AI/OCR/RAG", "Docker/Nginx deploy"],
    bottomNote: "Real cases below",
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
      "Four production lanes instead of a long strip of identical services",
    description:
      "Each lane is built around an outcome: leads, payments, data, automation, interfaces, integrations and launch.",
    taskLabel: "task",
    audienceLabel: "Business task:",
    includesLabel: "What can be built",
    techLabel: "Stack / integrations",
  },
  trust: {
    eyebrow: "Delivery controls",
    title:
      "Modules kept inside the same delivery flow",
    description:
      "Payments, admin panels, AI, parsers, deploy and support stay tied to the launch plan instead of feeling like a separate proof strip.",
    proofLabel: "control",
  },
  configurator: {
    eyebrow: "Project request estimator",
    title: "Build your project configuration",
    description:
      "Choose the solution type, modules and timeline - the site will show a budget range and prepare a request.",
  },
  estimator: {
    steps: [
      "Project type",
      "Estimate",
      "Contacts",
      "Submit",
    ],
    moneyLocale: "en-US",
    currency: "$",
    currencyPosition: "prefix",
    budgetStep: 40,
    budgetMin: 120,
    budgetGap: 80,
    dayShort: "d",
    timelineSuffix: "business days",
    kicker: "Project config",
    title: "Project type -> modules -> request",
    leadTitle: "A quick request instead of a long questionnaire",
    leadDescription:
      "Choose the type and pace, leave Telegram and a short task note. Open modules only when you want a tighter estimate.",
    leadBullets: ["budget range immediately", "2 required fields", "spec can be attached as a link"],
    summaryCta: "Send request with estimate",
    modulesToggle: "Adjust modules",
    presetLabel: "Preset from case",
    stepPrefix: "step",
    typeTitle: "Choose solution type",
    typeDescription:
      "After choosing the type, only relevant modules remain below.",
    complexityTitle: "Complexity",
    complexityDescription:
      "This affects budget and timeline: MVP, business product or complex system.",
    modulesTitle: "Modules",
    modulesDescription: "Options are shown for the {category} category.",
    urgencyTitle: "Timeline",
    urgencyDescription:
      "Choose a comfortable pace. Urgency increases cost, but compresses the work plan.",
    contactsTitle: "Contacts and description",
    contactsDescription:
      "These details will be included in the request together with the selected configuration and estimate.",
    fields: {
      name: "Name",
      namePlaceholder: "How should I address you",
      telegram: "Telegram",
      email: "Email",
      emailPlaceholder: "optional",
      fileUrl: "Spec / file link",
      fileUrlPlaceholder: "Google Docs, Figma, archive",
      comment: "Short task description",
      commentPlaceholder:
        "For example: we need a mini app for a clothing store with catalog, payments and referrals.",
    },
    note:
      "The calculator shows an orientation point. Final cost is fixed after a short discussion of the task, integrations, design and timeline.",
    submit: "Send configuration",
    sendAnother: "Send another",
    telegramFallback: "Write directly in Telegram",
    validationError: "Please add Telegram and briefly describe the task.",
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
      source: "Source",
      category: "Category",
      complexity: "Complexity",
      urgency: "Pace",
    },
    selectedModules: "Selected modules",
    noModules:
      "No modules selected. The estimate is based only on base development.",
    requestFormat: "Request format",
    requestTitle: "New website request",
    requestOptions: "Options",
    requestEstimate: "Estimate",
    baseDevelopment: "base development",
    viewCases: "View cases",
  },
  process: {
    eyebrow: "Scope -> launch",
    title: "How a project moves from scope to launch",
    description:
      "Five clear stages instead of a complex task board: what happens at each step and what the client keeps.",
    deliverableLabel: "Client gets",
    metrics: [
      { label: "Scope", value: "scenarios and boundary" },
      { label: "Estimate", value: "architecture and timeline" },
      { label: "Launch", value: "deploy and handoff" },
    ],
  },
  cases: {
    eyebrow: "Cases",
    title: "Cases that show the working result",
    description:
      "The homepage highlights six projects in one format across Telegram, AI, crypto, backend, Mini App and web work. Details, flows and technical decisions live on a separate page.",
    intro:
      "Each case shows the task, assembled modules and final result. Open the full project for the detailed proof base.",
    allCases: "All cases",
    carouselAria:
      "Selected case showcase with large covers and links to details.",
    controlsAria: "Case navigation",
    previous: "Previous case",
    next: "Next case",
    openCase: "Open case",
    outcomesAria: "Key modules",
    details: "Details",
    similar: "I want a similar project",
    nextStepTitle: "Turn a case into your first scope",
    estimateCta: "Build my scope",
    telegramCta: "Discuss in Telegram",
  },
  casesPage: {
    backHome: "Back home",
    eyebrow: "Case proof base",
    title: "Detailed cases: context, architecture, challenges and result",
    description:
      "On the homepage, cases work as a showcase. Here each project is expanded as a proof base: why it was needed, what was built, where the technical risks were and what working result came after launch.",
    countLabel: "cases",
    countDescription:
      "Telegram bots, Mini Apps, AI modules, crypto automation, backend services and web interfaces in one format.",
    estimateSimilar: "Estimate a similar project",
    navAria: "Case navigation",
    timeframe: "Timeline",
    keyResult: "Key result",
    stack: "Stack",
    sections: {
      context: "Task context",
      modules: "What was implemented",
      integrations: "Integrations and business logic",
      architecture: "Architecture / workflow",
      media: "Screens / video / interfaces",
      challenges: "Challenges and solutions",
      result: "Result",
    },
    mediaNote: "real or stylized mockups",
    outcomes: "outcomes",
    cta: "CTA",
    wantSimilar: "I want a similar project",
    estimateCost: "Estimate cost",
    openProject: "Open project",
    imageAltSeparator: "-",
  },
  services: {
    eyebrow: "Budget guide",
    title: "Budget guide before the estimator",
    description:
      "These amounts help understand the budget order. The exact range is better calculated in the configurator: modules, timeline and integrations change the scope a lot.",
    budgetLabel: "budget",
    finalTitle: "Final cost depends on the details",
    finalDescription:
      "Final cost depends on scenarios, design, integrations, payments, data volume and timeline. After launch, support can be connected separately:",
    estimateCta: "Estimate a project",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions worth closing before the start",
    description:
      "The clearer the scenarios, integrations and constraints are at the start, the fewer surprises appear during development.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Calm engineering work without extra noise",
    description:
      "The wording is anonymized, but reflects a typical request: bring the product to a working state, not just write a separate script.",
  },
  finalCta: {
    eyebrow: "Next step",
    title:
      "Describe the task - I will return with architecture, timeline and budget range.",
    description:
      "The fastest way to start is the estimator: it collects project type, modules, timeline and contact into one request. If you have little input, you can write directly in Telegram.",
    estimateCta: "Build the scope",
    telegramCta: "Write in Telegram",
    footer: "Python, Telegram bots, AI integrations, backend services.",
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
