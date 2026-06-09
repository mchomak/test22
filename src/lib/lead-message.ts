export type LeadMessageFields = {
  category: string;
  complexity: string;
  urgency: string;
  options: string[];
  budget: string;
  timeline: string;
  contactName: string;
  contactTelegram: string;
  contactEmail: string;
  comment: string;
  fileUrl: string;
};

export function formatLeadMessage(lead: LeadMessageFields): string {
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
