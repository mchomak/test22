import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";

const locales = ["ru", "en"];
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
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
  const localeTarget = path.join(targetRoot, locale);

  rmSync(localeTarget, { recursive: true, force: true });

  for (const [slug, sourceFolder] of caseImageSources) {
    const source = getCaseImageSource(sourceFolder, locale);
    if (!source) continue;

    const target = path.join(localeTarget, slug);
    copyImageFiles(source, target);
  }
}

function getCaseImageSource(sourceFolder, locale) {
  const candidates = [
    path.join(sourceRoot, sourceFolder, locale),
    path.join(sourceRoot, sourceFolder),
    path.join(sourceRoot, locale, sourceFolder),
  ];

  return candidates.find(hasImageFiles) ?? null;
}

function hasImageFiles(directory) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    return false;
  }

  return readdirSync(directory).some((file) => {
    const filePath = path.join(directory, file);
    return (
      statSync(filePath).isFile() &&
      imageExtensions.has(path.extname(file).toLowerCase())
    );
  });
}

function copyImageFiles(source, target) {
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });

  for (const file of readdirSync(source)) {
    const sourceFile = path.join(source, file);
    if (!statSync(sourceFile).isFile()) continue;
    if (!imageExtensions.has(path.extname(file).toLowerCase())) continue;

    copyFileSync(sourceFile, path.join(target, file));
  }
}
