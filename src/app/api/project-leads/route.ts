type LeadPayload = {
  category?: unknown;
  complexity?: unknown;
  urgency?: unknown;
  options?: unknown;
  estimate?: {
    budget?: unknown;
    timeline?: unknown;
  };
  contact?: {
    name?: unknown;
    telegram?: unknown;
    email?: unknown;
  };
  comment?: unknown;
  fileUrl?: unknown;
};

const asText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const asTextList = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Некорректный JSON в заявке." },
      { status: 400 },
    );
  }

  const category = asText(payload.category);
  const complexity = asText(payload.complexity);
  const urgency = asText(payload.urgency);
  const options = asTextList(payload.options);
  const budget = asText(payload.estimate?.budget);
  const timeline = asText(payload.estimate?.timeline);
  const name = asText(payload.contact?.name);
  const telegram = asText(payload.contact?.telegram);
  const email = asText(payload.contact?.email);
  const comment = asText(payload.comment);
  const fileUrl = asText(payload.fileUrl);

  if (!category || !complexity || !telegram || !comment || !budget || !timeline) {
    return Response.json(
      { ok: false, error: "Заполните Telegram, описание задачи и конфигурацию." },
      { status: 400 },
    );
  }

  const message = [
    "Новая заявка с сайта",
    "",
    `Категория: ${category}`,
    `Сложность: ${complexity}`,
    urgency ? `Сроки: ${urgency}` : "",
    "Опции:",
    ...(options.length ? options.map((option) => `* ${option}`) : ["* базовая разработка"]),
    "",
    `Оценка: ${budget}`,
    `Срок: ${timeline}`,
    "",
    `Контакт: ${telegram}`,
    name ? `Имя: ${name}` : "",
    email ? `Email: ${email}` : "",
    fileUrl ? `ТЗ / файл: ${fileUrl}` : "",
    `Комментарий: ${comment}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.info("[project-lead:stub]\n%s", message);
    return Response.json({ ok: true, delivered: false });
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    return Response.json(
      { ok: false, error: "Telegram Bot API не принял заявку." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, delivered: true });
}
