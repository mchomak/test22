export type CaseProjectKind = "commercial" | "personal";

export type CaseLocaleContent = {
  title: string;
  summary: string;
  type: string;
  sections: {
    task: string[];
    delivered: string[];
    flow: string[];
    functions: string[];
    considerations: string[];
    result: string[];
  };
};

export type PortfolioCase = {
  slug: string;
  projectKind: CaseProjectKind;
  client: string;
  stack: string[];
  media:
    | { kind: "gallery"; folder: string; files: string[] }
    | { kind: "placeholder" };
  ru: CaseLocaleContent;
  en: CaseLocaleContent;
};

export const portfolioCases: PortfolioCase[] = [
  {
    slug: "yandex-zen-automation",
    projectKind: "commercial",
    client: "Dameo",
    stack: ["Python", "Playwright", "GigaChat", "PostgreSQL", "Docker"],
    media: { kind: "placeholder" },
    ru: {
      title: "Yandex Zen Automation",
      summary:
        "AI-сервис для работы с комментариями канала Dameo в Яндекс Дзене: собирает контекст и готовит ответ в тоне бренда.",
      type: "AI-автоматизация коммуникаций",
      sections: {
        task: [
          "Помочь команде Dameo отвечать на новые комментарии под публикациями без ручного просмотра каждой ветки.",
          "До разработки контекст статьи и обсуждения приходилось разбирать вручную, а ответ нужно было формулировать в тоне бренда.",
        ],
        delivered: [
          "Сервис чтения комментариев, сохранения их контекста и подготовки AI-ответов.",
          "Логи обработки и статусы, которые не дают повторно отвечать на уже обработанный комментарий.",
          "Правила для нейтральных и лидогенерационных ответов без навязчивой рекламы.",
        ],
        flow: [
          "Сервис находит новые комментарии в Дзен Студии.",
          "Считывает ветку и тему публикации.",
          "AI готовит ответ или отмечает спорный случай для пропуска.",
          "Результат и статус обработки сохраняются в журнале.",
        ],
        functions: [
          "Проверка новых комментариев и контекста ветки.",
          "Генерация ответов в заданном тоне бренда.",
          "Защита от дублей и контроль статусов обработки.",
        ],
        considerations: [
          "У Дзена нет публичного API для публикации комментариев, поэтому используется браузерная автоматизация Дзен Студии.",
          "Safe e2e-режим формирует и сохраняет ответы без публикации; автопубликация остаётся отдельным серверным гейтом.",
          "Система учитывает ошибки публикации и не помечает ответ успешным без подтверждения.",
        ],
        result: [
          "Коммерческий проект для Dameo. Реализация и локальные проверки ведутся поэтапно.",
          "Сервис не представлен как запущенная автопубликация: перед этим требуется серверная safe e2e-проверка.",
        ],
      },
    },
    en: {
      title: "Yandex Zen Automation",
      summary:
        "An AI service for handling comments on Dameo's Yandex Zen channel: it collects context and prepares on-brand replies.",
      type: "AI communication automation",
      sections: {
        task: [
          "Help the Dameo team respond to new post comments without reviewing every thread manually.",
          "Before the system, article context and discussion had to be reviewed by hand, while each reply still needed to match the brand voice.",
        ],
        delivered: [
          "A service for reading comments, storing their context and preparing AI replies.",
          "Processing logs and statuses that prevent a second reply to an already handled comment.",
          "Rules for neutral and lead-oriented replies without intrusive promotion.",
        ],
        flow: [
          "The service finds new comments in Zen Studio.",
          "It reads the discussion thread and article topic.",
          "AI prepares a reply or marks an uncertain case to skip.",
          "The outcome and processing status are saved in the log.",
        ],
        functions: [
          "Checking new comments and thread context.",
          "Generating replies in the required brand voice.",
          "Duplicate prevention and processing-status tracking.",
        ],
        considerations: [
          "Zen has no public API for posting comments, so the project uses browser automation in Zen Studio.",
          "Safe e2e mode prepares and stores replies without publishing; auto-publishing remains a separate server-side gate.",
          "Publication errors are tracked and are not marked as successful without confirmation.",
        ],
        result: [
          "A commercial project for Dameo, implemented and checked in stages locally.",
          "It is not presented as live auto-publishing: a server-side safe e2e check is still required first.",
        ],
      },
    },
  },
  {
    slug: "bybit-trading-bot",
    projectKind: "commercial",
    client: "Private client",
    stack: ["Python", "asyncio", "Bybit API", "PostgreSQL", "Docker", "Telegram Bot API"],
    media: {
      kind: "gallery",
      folder: "bybit-trading-bot",
      files: ["preview_rec.webp", "1.webp", "2.webp"],
    },
    ru: {
      title: "ByBit Trading Bot",
      summary:
        "Система для поиска импульсных движений рынка и автоматизации спотовых сделок на Bybit.",
      type: "Автоматизация криптотрейдинга",
      sections: {
        task: [
          "Автоматизировать поиск торговых сигналов и управление спотовыми позициями без постоянного ручного мониторинга рынка.",
          "Сигнал строится на сочетании аномального объёма и ускорения цены.",
        ],
        delivered: [
          "Асинхронный торговый сервис, который получает рыночные данные, оценивает сигналы стратегии и ведёт позиции.",
          "Хранилище данных и уведомления о ключевых событиях в Telegram.",
        ],
        flow: [
          "Сервис получает данные рынка и отбирает подходящие пары.",
          "Стратегия проверяет объём и ценовое ускорение.",
          "При подходящем сигнале формируется торговое действие и контролируется позиция.",
          "Ключевые события отправляются в Telegram.",
        ],
        functions: [
          "Непрерывный мониторинг рынка и отбор сигналов.",
          "Автоматическое управление спотовыми позициями с ограничением риска.",
          "Уведомления о событиях торгового цикла.",
        ],
        considerations: [
          "Интеграция с REST и WebSocket API Bybit, а также внешними данными о капитализации.",
          "Асинхронная обработка и PostgreSQL нужны для устойчивой работы и истории действий.",
          "Стратегия имеет риск ложных сигналов, поэтому режим проверки отделён от реальных ордеров.",
        ],
        result: [
          "Коммерческий проект для частного заказчика; весь заявленный функционал реализован.",
          "Текущий статус — dry-run стратегии. Реальные ордера и оценка P&L ещё не заявлены как результат.",
        ],
      },
    },
    en: {
      title: "ByBit Trading Bot",
      summary:
        "A system for detecting market momentum and automating spot trades on Bybit.",
      type: "Crypto trading automation",
      sections: {
        task: [
          "Automate signal discovery and spot-position management without continuous manual market monitoring.",
          "The strategy combines abnormal volume with price acceleration.",
        ],
        delivered: [
          "An asynchronous trading service that receives market data, evaluates strategy signals and manages positions.",
          "Data storage and Telegram notifications for key events.",
        ],
        flow: [
          "The service receives market data and selects eligible pairs.",
          "The strategy checks volume and price acceleration.",
          "A matching signal triggers a trading action and position control.",
          "Key trading-cycle events are sent to Telegram.",
        ],
        functions: [
          "Continuous market monitoring and signal selection.",
          "Automated spot-position management with risk limits.",
          "Notifications about trading-cycle events.",
        ],
        considerations: [
          "Integration with Bybit REST and WebSocket APIs and external market-capitalization data.",
          "Async processing and PostgreSQL provide reliable operation and an activity history.",
          "The strategy can produce false signals, so validation mode is separated from real orders.",
        ],
        result: [
          "A commercial project for a private client; the stated functionality is implemented.",
          "Current status: strategy dry-run. Real orders and P&L evaluation are not claimed as delivered results.",
        ],
      },
    },
  },
  {
    slug: "vpn-subscription-bot",
    projectKind: "commercial",
    client: "Private client",
    stack: ["Python", "aiogram 3", "aiohttp", "PostgreSQL", "Docker"],
    media: {
      kind: "gallery",
      folder: "subscription-bot",
      files: ["preview_rec.webp", "1.webp", "2.webp"],
    },
    ru: {
      title: "VPN Subscription Bot",
      summary:
        "Telegram-бот и административная панель для продажи VPN и прокси-доступа.",
      type: "Telegram-сервис подписок",
      sections: {
        task: [
          "Собрать покупку VPN или прокси-доступа внутри Telegram: от выбора тарифа до выдачи данных после оплаты.",
          "Операторам требовалась отдельная панель для управления продуктами, пользователями и платежами.",
        ],
        delivered: [
          "Telegram-бот, платёжные webhook-обработчики и веб-панель в одном приложении.",
          "Интеграции с VPN- и прокси-бэкендами для выдачи доступа.",
          "Планировщик для задач подписок, курсов и рассылок.",
        ],
        flow: [
          "Пользователь выбирает продукт и условия в боте.",
          "Платёж проходит через подключённый провайдер.",
          "После подтверждения оплаты система выдаёт данные доступа.",
          "Оператор управляет продуктами и нестандартными случаями в панели.",
        ],
        functions: [
          "Продажа подписок и автоматическая выдача VPN/прокси-доступа.",
          "Управление товарами, пользователями, платежами и рассылками.",
          "Реферальная механика и напоминания об окончании подписки.",
        ],
        considerations: [
          "В одном сервере объединены бот, платёжные webhooks и административная панель.",
          "Подключены несколько платёжных сценариев и отдельные бэкенды для VPN и прокси.",
          "Webhook-проверки и закрытая административная зона защищают критические операции.",
        ],
        result: [
          "Коммерческий проект для частного заказчика.",
          "Репозиторный статус проекта отмечен как приостановленный; страница не заявляет действующий публичный сервис.",
        ],
      },
    },
    en: {
      title: "VPN Subscription Bot",
      summary:
        "A Telegram bot and admin panel for selling VPN and proxy access.",
      type: "Telegram subscription service",
      sections: {
        task: [
          "Build a VPN or proxy purchase flow inside Telegram, from plan selection to access delivery after payment.",
          "Operators also needed a separate panel to manage products, users and payments.",
        ],
        delivered: [
          "A Telegram bot, payment-webhook handlers and web admin panel in one application.",
          "VPN and proxy backend integrations for access delivery.",
          "A scheduler for subscription tasks, exchange rates and broadcasts.",
        ],
        flow: [
          "The user selects a product and terms in the bot.",
          "A connected provider processes the payment.",
          "After payment confirmation, the system delivers access details.",
          "The operator manages products and exceptional cases in the admin panel.",
        ],
        functions: [
          "Subscription sales and automated VPN/proxy access delivery.",
          "Managing products, users, payments and broadcasts.",
          "Referral mechanics and subscription-expiration reminders.",
        ],
        considerations: [
          "One server combines the bot, payment webhooks and admin panel.",
          "Several payment flows and dedicated VPN and proxy backends are integrated.",
          "Webhook verification and a protected admin area secure critical operations.",
        ],
        result: [
          "A commercial project for a private client.",
          "The repository marks the project as paused; this page does not claim a currently live public service.",
        ],
      },
    },
  },
  {
    slug: "sapsanex",
    projectKind: "commercial",
    client: "Private client",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    media: {
      kind: "gallery",
      folder: "sapsanex-mini-app",
      files: ["preview_rec.webp", "1.webp", "2.webp", "3.webp"],
    },
    ru: {
      title: "SapsanEx",
      summary:
        "Telegram Mini App для расчёта и оформления заявок на обмен криптовалюты и фиата.",
      type: "Telegram Mini App для обмена",
      sections: {
        task: [
          "Дать пользователям Telegram интерфейс обмена без перехода в браузер и ручного заполнения внешней формы.",
          "Нужно было рассчитывать курс, создавать заявку и показывать её статус внутри мессенджера.",
        ],
        delivered: [
          "React Mini App и FastAPI-бэкенд, который работает со сторонним обменным API.",
          "Отдельный Telegram-бот для уведомлений и PostgreSQL для истории заявок.",
        ],
        flow: [
          "Пользователь открывает приложение в Telegram и рассчитывает курс.",
          "Подтверждает условия и создаёт заявку.",
          "Бэкенд записывает заявку и передаёт её во внешний сервис.",
          "Статус обновляется в приложении, бот уведомляет об изменениях.",
        ],
        functions: [
          "Расчёт курса и создание обменной заявки.",
          "Отслеживание статуса и уведомления через Telegram.",
          "Русская и английская локализация интерфейса.",
        ],
        considerations: [
          "Telegram initData валидируется HMAC-SHA256 без сессий и JWT.",
          "Внешнее API использует form-data, поэтому бэкенд изолирует этот контракт от интерфейса Mini App.",
          "Фоновая задача отменяет заявки, которые слишком долго ожидают обработки.",
        ],
        result: [
          "Коммерческий проект для частного заказчика.",
          "Текущий статус — активная разработка; production-деплой и реальные пользователи указаны следующей вехой.",
        ],
      },
    },
    en: {
      title: "SapsanEx",
      summary:
        "A Telegram Mini App for calculating and creating crypto-to-fiat exchange requests.",
      type: "Telegram exchange Mini App",
      sections: {
        task: [
          "Give Telegram users an exchange interface without browser redirects or manual completion of an external form.",
          "The app needed to calculate a rate, create a request and show its status inside the messenger.",
        ],
        delivered: [
          "A React Mini App and FastAPI backend that works with a third-party exchange API.",
          "A separate Telegram bot for notifications and PostgreSQL for request history.",
        ],
        flow: [
          "The user opens the app in Telegram and calculates a rate.",
          "They confirm the terms and create a request.",
          "The backend records the request and sends it to the external service.",
          "The status updates in the app and the bot notifies about changes.",
        ],
        functions: [
          "Rate calculation and exchange-request creation.",
          "Status tracking and Telegram notifications.",
          "Russian and English interface localization.",
        ],
        considerations: [
          "Telegram initData is validated with HMAC-SHA256, without sessions or JWT.",
          "The external API uses form-data, so the backend isolates that contract from the Mini App interface.",
          "A background task cancels requests that wait too long for processing.",
        ],
        result: [
          "A commercial project for a private client.",
          "Current status: active development. Production deployment and real users are the next milestone.",
        ],
      },
    },
  },
  {
    slug: "checks-documents",
    projectKind: "commercial",
    client: "ООО МСК Авиа",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Tesseract OCR"],
    media: { kind: "placeholder" },
    ru: {
      title: "Обработка чеков и документов",
      summary:
        "Внутренний веб-сервис для распознавания, проверки и учёта банковских чеков подрядчиков.",
      type: "Внутренний кабинет и обработка документов",
      sections: {
        task: [
          "Убрать ручной перенос данных из чеков и дать подрядчикам и кассиру общий контролируемый процесс.",
          "До веб-версии логика работала в Telegram-боте, а работа с чеками требовала отдельных ручных шагов.",
        ],
        delivered: [
          "Веб-приложение с ролями подрядчика и кассира.",
          "Загрузка PDF и изображений, распознавание полей, ручная корректировка и сохранение чека.",
          "Общий реестр для модерации и ledger-учёт баланса подрядчика.",
        ],
        flow: [
          "Подрядчик загружает чек.",
          "Сервис извлекает данные из текстового слоя PDF или через OCR.",
          "Подрядчик проверяет и сохраняет поля.",
          "Кассир подтверждает или отклоняет чек; при подтверждении обновляется баланс.",
        ],
        functions: [
          "Распознавание чеков из PDF и изображений.",
          "Ролевой доступ, история чеков и статусы модерации.",
          "Дедупликация и атомарное начисление или реверс в ledger.",
        ],
        considerations: [
          "PDF сначала читается как текст, а OCR применяется как запасной сценарий; изображения проходят OCR и предобработку.",
          "Денежные значения хранятся как Decimal/Numeric, а подтверждение и начисление выполняются в одной транзакции.",
          "Проверки статусов исключают повторное начисление при повторных действиях.",
        ],
        result: [
          "Коммерческий проект для ООО МСК Авиа.",
          "MVP-цикл от входа до модерации и начисления реализован и пройден; сервис описан как локальное веб-приложение.",
        ],
      },
    },
    en: {
      title: "Receipt and document processing",
      summary:
        "An internal web service for recognizing, checking and accounting for contractors' bank receipts.",
      type: "Internal portal and document processing",
      sections: {
        task: [
          "Remove manual data transfer from receipts and provide contractors and a cashier with one controlled workflow.",
          "Before the web version, the logic lived in a Telegram bot and receipt handling required separate manual steps.",
        ],
        delivered: [
          "A web application with contractor and cashier roles.",
          "PDF and image upload, field recognition, manual correction and receipt saving.",
          "A shared moderation registry and ledger-based contractor-balance accounting.",
        ],
        flow: [
          "A contractor uploads a receipt.",
          "The service extracts data from a PDF text layer or with OCR.",
          "The contractor reviews and saves the fields.",
          "The cashier approves or rejects the receipt; approval updates the balance.",
        ],
        functions: [
          "Receipt recognition from PDFs and images.",
          "Role-based access, receipt history and moderation statuses.",
          "Duplicate prevention and atomic ledger credit or reversal.",
        ],
        considerations: [
          "PDF text is read first, with OCR as a fallback; images go through OCR and preprocessing.",
          "Monetary values use Decimal/Numeric, and approval plus credit run in one transaction.",
          "Status checks prevent a second credit from repeated actions.",
        ],
        result: [
          "A commercial project for MCK Avia LLC.",
          "The MVP flow from sign-in through moderation and balance credit is implemented and passed; the service is described as a local web application.",
        ],
      },
    },
  },
  {
    slug: "tg-manager",
    projectKind: "personal",
    client: "Personal product",
    stack: ["Python", "aiogram 3", "PostgreSQL", "Redis", "ClickUp API", "LLM APIs"],
    media: { kind: "placeholder" },
    ru: {
      title: "tg-manager",
      summary:
        "Личная система управления задачами фриланс-разработчика через Telegram, AI и связку Obsidian с ClickUp.",
      type: "Собственный продукт",
      sections: {
        task: [
          "Собрать в одном рабочем процессе быстрый захват задач, планирование и передачу задач AI-агентам.",
          "До системы входящие из разных источников приходилось вручную превращать в задачи, относить к проектам и планировать.",
        ],
        delivered: [
          "Telegram-бот для текста, голоса, фото и пересланных сообщений.",
          "AI-контур, который оформляет задачи, предлагает проект, приоритет и дедлайн, а затем даёт их проверить.",
          "Диспетчеризация, живая доска плана, дайджесты и связка с ClickUp и Obsidian.",
        ],
        flow: [
          "Пользователь передаёт задачу в Telegram в удобном формате.",
          "Система объединяет контекст и готовит черновик задачи.",
          "После подтверждения задача попадает в нужный проект и план.",
          "Планировщик показывает очередь, зависимости и актуальный статус в дайджесте.",
        ],
        functions: [
          "Многоформатный захват и AI-оформление задач.",
          "Автоматическое распределение по проектам с возможностью корректировки.",
          "Планирование, зависимости, дайджесты и запуск задач через агентный контур.",
        ],
        considerations: [
          "Obsidian остаётся источником правды по проектам, а ClickUp и база синхронизируются с ним.",
          "Токены защищены шифрованием, а логи очищаются от секретов.",
          "Мультитенантный контур и очереди ограничивают фоновые действия и требуют явных гейтов для чувствительных шагов.",
        ],
        result: [
          "Собственный продукт, не коммерческая клиентская система.",
          "Основные контуры захвата, диспетчеризации, исполнения и плановой доски реализованы; разработка продолжается.",
        ],
      },
    },
    en: {
      title: "tg-manager",
      summary:
        "A personal task-management system for a freelance developer, built around Telegram, AI and an Obsidian–ClickUp workflow.",
      type: "Personal product",
      sections: {
        task: [
          "Bring fast task capture, planning and handoff to AI agents into one working flow.",
          "Before the system, inputs from different sources had to be manually turned into tasks, assigned to projects and planned.",
        ],
        delivered: [
          "A Telegram bot for text, voice, photos and forwarded messages.",
          "An AI layer that formats tasks, proposes a project, priority and deadline, then lets the user review them.",
          "Dispatching, a live planning board, digests and connections to ClickUp and Obsidian.",
        ],
        flow: [
          "The user sends a task to Telegram in a convenient format.",
          "The system combines context and prepares a task draft.",
          "After confirmation, the task goes to the appropriate project and plan.",
          "The planner shows the queue, dependencies and current status in a digest.",
        ],
        functions: [
          "Multi-format capture and AI task formatting.",
          "Automatic project assignment with an option to correct it.",
          "Planning, dependencies, digests and task launching through an agent workflow.",
        ],
        considerations: [
          "Obsidian remains the source of truth for projects, while ClickUp and the database synchronize with it.",
          "Tokens are encrypted and logs are redacted for secrets.",
          "A multi-tenant workflow and queues limit background actions and require explicit gates for sensitive steps.",
        ],
        result: [
          "A personal product, not a commercial client system.",
          "The core capture, dispatching, execution and planning-board workflows are implemented; development continues.",
        ],
      },
    },
  },
];

export function getPortfolioCase(slug: string) {
  return portfolioCases.find((item) => item.slug === slug);
}
