export type LeadMessageFields = {
  category: string;
  complexity: string;
  urgency: string;
  options: string[];
  budget: string;
  timeline: string;
  contactName: string;
  contactChannel?: string;
  contactValue?: string;
  contactTelegram: string;
  contactEmail: string;
  source?: string;
  comment: string;
  fileUrl: string;
};

// Human-readable lead source. Absent source means the legacy configurator path.
const sourceLabels: Record<string, string> = {
  hero: "Быстрая форма в hero",
  final: "Финальная форма",
  sticky: "Быстрая форма (sticky)",
  inline: "Быстрая форма",
};

function resolveSourceLabel(source: string | undefined) {
  if (!source) {
    return "Конфигуратор";
  }
  return sourceLabels[source] ?? source;
}

export function formatLeadMessage(lead: LeadMessageFields): string {
  // Primary contact: the generic value, falling back to the legacy Telegram field.
  const contact = lead.contactValue || lead.contactTelegram;
  // Show a separate Telegram line only when it is distinct from the contact above.
  const separateTelegram =
    lead.contactTelegram && lead.contactTelegram !== contact
      ? lead.contactTelegram
      : "";

  return [
    "Новая заявка с сайта",
    "",
    `Источник: ${resolveSourceLabel(lead.source)}`,
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
    lead.contactChannel ? `Канал: ${lead.contactChannel}` : "",
    `Контакт: ${contact}`,
    separateTelegram ? `Telegram: ${separateTelegram}` : "",
    lead.contactName ? `Имя: ${lead.contactName}` : "",
    lead.contactEmail ? `Email: ${lead.contactEmail}` : "",
    lead.fileUrl ? `ТЗ / файл: ${lead.fileUrl}` : "",
    `Комментарий: ${lead.comment}`,
  ]
    .filter(Boolean)
    .join("\n");
}
