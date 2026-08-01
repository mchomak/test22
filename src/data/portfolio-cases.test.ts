import assert from "node:assert/strict";
import test from "node:test";

test("the portfolio catalogue exposes all six requested localized cases", async () => {
  const catalogue = await import("./portfolio-cases").catch(() => null);

  assert.ok(catalogue, "the portfolio case catalogue must exist");
  assert.equal(catalogue.portfolioCases.length, 6);

  for (const item of catalogue.portfolioCases) {
    assert.ok(item.ru.title);
    assert.ok(item.en.title);
    assert.ok(item.ru.sections.task.length > 0);
    assert.ok(item.en.sections.task.length > 0);
  }
});

test("the catalogue distinguishes commercial work from the personal product", async () => {
  const { getPortfolioCase } = await import("./portfolio-cases");

  assert.equal(getPortfolioCase("tg-manager")?.projectKind, "personal");
  assert.equal(getPortfolioCase("yandex-zen-automation")?.projectKind, "commercial");
  assert.equal(getPortfolioCase("checks-documents")?.client, "ООО МСК Авиа");
});
