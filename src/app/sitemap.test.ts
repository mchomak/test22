import assert from "node:assert/strict";
import test from "node:test";
import sitemap from "./sitemap";

test("the sitemap publishes every localized portfolio case route", () => {
  const expectedPaths = [
    "/ru/cases/yandex-zen-automation",
    "/en/cases/yandex-zen-automation",
    "/ru/cases/bybit-trading-bot",
    "/en/cases/bybit-trading-bot",
    "/ru/cases/vpn-subscription-bot",
    "/en/cases/vpn-subscription-bot",
    "/ru/cases/sapsanex",
    "/en/cases/sapsanex",
    "/ru/cases/checks-documents",
    "/en/cases/checks-documents",
    "/ru/cases/tg-manager",
    "/en/cases/tg-manager",
  ];

  const paths = sitemap().map((entry) => new URL(entry.url).pathname);

  assert.deepEqual(
    expectedPaths.filter((path) => path.includes("/cases/")).sort(),
    paths.filter((path) => path.includes("/cases/")).sort(),
  );
});
