import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const locales = ["ru", "en"];
const caseImageSources = [
  ["subscription-bot", "vpn_bot"],
  ["sapsanex-mini-app", "mini_app"],
  ["seedream-tryon", "seedream_bot"],
  ["ai-reply-assistant", "help_bot"],
  ["bybit-trading-bot", "ByBit_bot"],
  ["eps-bot", "EPS_bot"],
  ["frax-redesign", "frax"],
  ["tech-rise-academy", "tech_rise"],
  ["gym-progres", "gym_progres"],
  ["skillup", "SkillUp"],
];

const root = process.cwd();
const sourceRoot = path.join(root, "img");
const targetRoot = path.join(root, "public", "cases");

for (const locale of locales) {
  const localeSource = path.join(sourceRoot, locale);
  const localeTarget = path.join(targetRoot, locale);

  rmSync(localeTarget, { recursive: true, force: true });

  if (!existsSync(localeSource)) continue;

  for (const [slug, sourceFolder] of caseImageSources) {
    const source = path.join(localeSource, sourceFolder);
    if (!existsSync(source)) continue;

    const target = path.join(localeTarget, slug);
    mkdirSync(path.dirname(target), { recursive: true });
    cpSync(source, target, { recursive: true });
  }
}
