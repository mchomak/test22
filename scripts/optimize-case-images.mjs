import { spawnSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  statSync,
} from "node:fs";
import path from "node:path";

const caseImageRoots = [
  path.join(process.cwd(), "img"),
  path.join(process.cwd(), "public", "cases"),
].filter(existsSync);
const sourceExtensions = new Set([".png", ".jpg", ".jpeg"]);
const quality = process.env.CASE_WEBP_QUALITY ?? "74";

if (caseImageRoots.length === 0) {
  console.log("No case image directories found.");
  process.exit(0);
}

const sources = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      sources.push(fullPath);
    }
  }
}

caseImageRoots.forEach(walk);

let converted = 0;
let skipped = 0;

for (const source of sources) {
  const output = source.replace(/\.(png|jpe?g)$/i, ".webp");

  if (
    existsSync(output) &&
    statSync(output).mtimeMs >= statSync(source).mtimeMs
  ) {
    skipped += 1;
    continue;
  }

  const result = spawnSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      source,
      "-frames:v",
      "1",
      "-c:v",
      "libwebp",
      "-q:v",
      quality,
      "-compression_level",
      "6",
      output,
    ],
    { stdio: "inherit" },
  );

  if (result.error) {
    console.error(`Failed to start ffmpeg: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`Failed to optimize ${path.relative(process.cwd(), source)}`);
    process.exit(result.status ?? 1);
  }

  converted += 1;
}

console.log(
  `Case image WebP optimization complete: ${converted} converted, ${skipped} skipped.`,
);
