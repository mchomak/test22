export type LeadMessageFields = {
  category: string;
  complexity: string;
  urgency: string;
  options: string[];
  budget: string;
  timeline: string;
  source?: string;
  sourceCase?: string;
  contactName: string;
  contactChannel?: string;
  contactValue: string;
  contactTelegram?: string;
  contactEmail?: string;
  comment: string;
  fileUrl: string;
};

const sourceLabels: Record<string, string> = {
  final: "Финальная форма",
  hero: "Быстрая форма в hero",
  inline: "Встроенная форма",
  sticky: "Мобильная sticky-форма",
};

export function formatLeadMessage(lead: LeadMessageFields): string {
  const contactValue = lead.contactValue || lead.contactTelegram || lead.contactEmail;
  const source = lead.source ? sourceLabels[lead.source] ?? lead.source : "Конфигуратор";
  const channel = lead.contactChannel || (lead.contactTelegram ? "Telegram" : "Контакт");
  const shouldShowTelegram =
    Boolean(lead.contactTelegram) && lead.contactTelegram !== contactValue;
  const shouldShowEmail =
    Boolean(lead.contactEmail) && lead.contactEmail !== contactValue;

  return [
    "Новая заявка с сайта",
    `Источник: ${source}`,
    "",
    `Категория: ${lead.category}`,
    `Сложность: ${lead.complexity}`,
    lead.urgency ? `Сроки: ${lead.urgency}` : "",
    lead.sourceCase ? `Кейс-ориентир: ${lead.sourceCase}` : "",
    "Опции:",
    ...(lead.options.length
      ? lead.options.map((option) => `- ${option}`)
      : ["- базовая разработка"]),
    "",
    `Оценка: ${lead.budget}`,
    `Срок: ${lead.timeline}`,
    "",
    `Канал: ${channel}`,
    `Контакт: ${contactValue}`,
    lead.contactName ? `Имя: ${lead.contactName}` : "",
    shouldShowTelegram ? `Telegram: ${lead.contactTelegram}` : "",
    shouldShowEmail ? `Email: ${lead.contactEmail}` : "",
    lead.fileUrl ? `ТЗ / файл: ${lead.fileUrl}` : "",
    `Задача: ${lead.comment}`,
  ]
    .filter(Boolean)
    .join("\n");
}
