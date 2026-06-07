import {
  insertProjectLead,
  updateLeadTelegramStatus,
  type ProjectLeadRecord,
} from "@/lib/database";
import { sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

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
  typeof value === "string" ? value.trim().slice(0, 4000) : "";

const asTextList = (value: unknown) =>
  Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim().slice(0, 400))
        .filter(Boolean)
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
      {
        ok: false,
        error: "Заполните Telegram, описание задачи и конфигурацию.",
      },
      { status: 400 },
    );
  }

  const lead: ProjectLeadRecord = {
    category,
    complexity,
    urgency,
    options,
    budget,
    timeline,
    contactName: name,
    contactTelegram: telegram,
    contactEmail: email,
    comment,
    fileUrl,
    payload: payload as Record<string, unknown>,
  };
  const message = formatLeadMessage(lead);
  let stored = false;
  let leadId: number | null = null;

  try {
    leadId = await insertProjectLead(lead);
    stored = Boolean(leadId);
  } catch (error) {
    console.error("[project-lead:db-insert]", error);
  }

  try {
    const telegramResult = await sendTelegramMessage(message);

    if (leadId) {
      await updateLeadTelegramStatus(
        leadId,
        telegramResult.delivered,
        telegramResult.ok ? "" : telegramResult.error,
      ).catch((error) => {
        console.error("[project-lead:db-status]", error);
      });
    }

    if (!telegramResult.ok) {
      return Response.json(
        {
          ok: false,
          stored,
          delivered: false,
          error: telegramResult.error,
        },
        { status: 502 },
      );
    }

    return Response.json({
      ok: true,
      stored,
      delivered: telegramResult.delivered,
      telegramProxyUsed: telegramResult.proxyUsed,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Telegram delivery failed.";

    if (leadId) {
      await updateLeadTelegramStatus(leadId, false, message).catch(
        (statusError) => {
          console.error("[project-lead:db-status]", statusError);
        },
      );
    }

    return Response.json(
      {
        ok: false,
        stored,
        delivered: false,
        error: message,
      },
      { status: 502 },
    );
  }
}

function formatLeadMessage(lead: ProjectLeadRecord) {
  return [
    "Новая заявка с сайта",
    "",
    `Категория: ${lead.category}`,
    `Сложность: ${lead.complexity}`,
    lead.urgency ? `Сроки: ${lead.urgency}` : "",
    "Опции:",
    ...(lead.options.length
      ? lead.options.map((option) => `- ${option}`)
      : ["- базовая разработка"]),
    "",
    `Оценка: ${lead.budget}`,
    `Срок: ${lead.timeline}`,
    "",
    `Контакт: ${lead.contactTelegram}`,
    lead.contactName ? `Имя: ${lead.contactName}` : "",
    lead.contactEmail ? `Email: ${lead.contactEmail}` : "",
    lead.fileUrl ? `ТЗ / файл: ${lead.fileUrl}` : "",
    `Комментарий: ${lead.comment}`,
  ]
    .filter(Boolean)
    .join("\n");
}
