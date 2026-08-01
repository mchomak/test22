export type ReferenceLeadInput = {
  referenceCase: string;
  name: string;
  contact: string;
  comment: string;
};

export function buildReferenceLeadPayload({
  referenceCase,
  name,
  contact,
  comment,
}: ReferenceLeadInput) {
  return {
    category: "Заявка по похожему проекту",
    complexity: "не указана",
    urgency: "обсудить",
    options: [],
    estimate: {
      budget: "после обсуждения",
      timeline: "после обсуждения",
    },
    sourceCase: referenceCase.trim(),
    source: "reference-case-modal",
    contact: {
      name: name.trim(),
      channel: "contact",
      value: contact.trim(),
      telegram: "",
      email: "",
    },
    comment: comment.trim(),
    fileUrl: "",
  };
}
