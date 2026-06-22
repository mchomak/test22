import {
  insertProjectLead,
  updateLeadTelegramStatus,
  type ProjectLeadRecord,
} from "@/lib/database";
import { formatLeadMessage } from "@/lib/lead-message";
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
  sourceCase?: unknown;
  source?: unknown;
  contact?: {
    name?: unknown;
    channel?: unknown;
    value?: unknown;
    telegram?: unknown;
    email?: unknown;
    phone?: unknown;
    whatsapp?: unknown;
  };
  comment?: unknown;
  fileUrl?: unknown;
};

const contactChannelLabels: Record<string, string> = {
  email: "Email",
  phone: "Телефон",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
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

const firstText = (...values: string[]) => values.find(Boolean) ?? "";

function resolveContactChannel({
  channel,
  contactValue,
  email,
  phone,
  telegram,
  whatsapp,
}: {
  channel: string;
  contactValue: string;
  email: string;
  phone: string;
  telegram: string;
  whatsapp: string;
}) {
  const normalizedChannel = channel.toLowerCase();

  if (contactChannelLabels[normalizedChannel]) {
    return contactChannelLabels[normalizedChannel];
  }

  if (contactValue === telegram) return contactChannelLabels.telegram;
  if (contactValue === phone) return contactChannelLabels.phone;
  if (contactValue === whatsapp) return contactChannelLabels.whatsapp;
  if (contactValue === email) return contactChannelLabels.email;

  return channel || "Контакт";
}

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
  const source = asText(payload.source);
  const sourceCase = asText(payload.sourceCase);
  const name = asText(payload.contact?.name);
  const channel = asText(payload.contact?.channel);
  const value = asText(payload.contact?.value);
  const telegram = asText(payload.contact?.telegram);
  const email = asText(payload.contact?.email);
  const phone = asText(payload.contact?.phone);
  const whatsapp = asText(payload.contact?.whatsapp);
  const contactValue = firstText(value, telegram, phone, whatsapp, email);
  const contactChannel = resolveContactChannel({
    channel,
    contactValue,
    email,
    phone,
    telegram,
    whatsapp,
  });
  const comment = asText(payload.comment);
  const fileUrl = asText(payload.fileUrl);

  if (!category || !complexity || !contactValue || !comment || !budget || !timeline) {
    return Response.json(
      {
        ok: false,
        error: "Оставьте контакт, описание задачи и конфигурацию.",
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
    source,
    sourceCase,
    contactName: name,
    contactChannel,
    contactValue,
    contactTelegram: telegram,
    contactEmail: email,
    comment,
    fileUrl,
    payload: payload as Record<string, unknown>,
  };

  let leadId: number | null = null;

  try {
    leadId = await insertProjectLead(lead);
  } catch (error) {
    console.error("[project-lead:db-insert]", error);
  }

  // Respond immediately — Telegram delivery happens in the background.
  // The retry scheduler (instrumentation.ts) handles re-delivery on failure.
  const message = formatLeadMessage(lead);
  void deliverViaTelegram(leadId, message);

  return Response.json({ ok: true, stored: Boolean(leadId) });
}

async function deliverViaTelegram(leadId: number | null, message: string) {
  try {
    const result = await sendTelegramMessage(message);

    if (!result.skipped && leadId) {
      const error = result.ok ? "" : result.error;
      await updateLeadTelegramStatus(leadId, result.delivered, error).catch((err) =>
        console.error("[project-lead:db-status]", err),
      );
    }
  } catch (err) {
    console.error("[project-lead:telegram]", err);
    if (leadId) {
      const errMsg = err instanceof Error ? err.message : String(err);
      await updateLeadTelegramStatus(leadId, false, errMsg).catch((dbErr) =>
        console.error("[project-lead:db-status]", dbErr),
      );
    }
  }
}
