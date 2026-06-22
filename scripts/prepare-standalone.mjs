import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const staticSource = path.join(root, ".next", "static");
const staticTarget = path.join(standaloneDir, ".next", "static");
const publicSource = path.join(root, "public");
const publicTarget = path.join(standaloneDir, "public");

if (!existsSync(standaloneDir)) {
  throw new Error("Standalone output is missing. Run `npm run build` first.");
}

if (existsSync(staticSource)) {
  mkdirSync(path.dirname(staticTarget), { recursive: true });
  cpSync(staticSource, staticTarget, { recursive: true });
}

if (existsSync(publicSource)) {
  cpSync(publicSource, publicTarget, { recursive: true });
}
