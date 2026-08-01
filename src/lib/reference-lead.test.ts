import assert from "node:assert/strict";
import test from "node:test";
import { buildReferenceLeadPayload } from "./reference-lead.ts";

test("buildReferenceLeadPayload preserves the selected reference case", () => {
  const payload = buildReferenceLeadPayload({
    referenceCase: "ByBit Trading Bot",
    name: "Alex",
    contact: "@alex",
    comment: "Нужен бот с похожим сценарием.",
  });

  assert.equal(payload.sourceCase, "ByBit Trading Bot");
  assert.equal(payload.category, "Заявка по похожему проекту");
  assert.equal(payload.contact.value, "@alex");
});

test("buildReferenceLeadPayload works after the reference is cleared", () => {
  const payload = buildReferenceLeadPayload({
    referenceCase: "",
    name: "",
    contact: "+7 900 000-00-00",
    comment: "Нужна автоматизация.",
  });

  assert.equal(payload.sourceCase, "");
  assert.equal(payload.contact.name, "");
  assert.equal(payload.contact.value, "+7 900 000-00-00");
});
