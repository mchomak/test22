# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

---

# PROJECT CONTEXT — YClients Push Automation

**Goal:** Server-side automation that reads leads from a Google Sheet and sends push
notifications to clients through the YClients web cabinet, then writes the result back
to the same sheet.

**Why a browser, not pure API:** YClients exposes client-base operations via API, but
push broadcasts are documented only through the web UI (push reaches clients who have the
YClients app installed with notifications enabled). So client lookup/create *may* use the
API, but the push-send step MUST go through the UI via Playwright.

**Flow:**
```
Google Sheets (rows: phone, push text, extra fields, status)
  → Python backend (polling every 15–60s; optional Apps Script webhook)
  → task queue (1 task = 1 row; processed strictly serially)
  → Playwright worker (persistent Chromium profile, logged-in YClients session)
  → YClients UI: find client by phone → create if missing (no dupes) → send push
  → write status back to the sheet
```
Result statuses written back: sent · client-created · client-already-existed · error
(+message) · skipped · no-push-channel · reprocessed.

**Stack:** Python · Playwright (persistent context, Chromium) · Google Sheets API (gspread
or google-api-python-client) · FastAPI (webhook + manual trigger) · PostgreSQL (queue +
state) · Docker / Docker Compose · loguru · healthcheck endpoint + Docker restart policy.
Deployed on a Russian VPS (Ubuntu, Docker Compose).

**Key invariants / risks:**
- Process strictly one row at a time in the browser — prevents duplicate clients and UI
  conflicts.
- Idempotency via row status + internal `task_id`.
- Persistent browser profile in a Docker volume so a container restart restores the
  logged-in session.
- Main fragility: YClients markup changes, modal dialogs, and slow loads — error handling
  here is the core of the work.

**Chosen approach (locked; detail in the Obsidian project note):** Variant 3 — a single
persistent browser worker + task queue, with **every** action done through the YClients UI
via Playwright (no API; variants 1 and 2 are dropped — the client's whole process is
UI-based and testing runs on the client's own accounts). Built incrementally: MVP = Sheets
polling + persistent Playwright worker + Docker, processing rows strictly one at a time;
then add the Apps Script webhook (a reaction accelerator, not a replacement for polling)
and a durable queue. Concurrency is always 1 to prevent duplicate clients and UI conflicts;
idempotency via row status + internal `task_id`; the logged-in session lives in a persistent
Chromium profile in a Docker volume.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

# PROJECT WORKFLOW & CONVENTIONS

This project runs as a three-role pipeline. This file is the shared contract:
it is loaded into every agent (orchestrator, coder, tester), so the conventions
below apply to all of them. Role-specific behavior lives in each agent's own
definition file; the rules here are the common ground.

## 5. Roles

- **Orchestrator** — the main session (Opus). Plans, owns all Obsidian notes,
  delegates work, decides what to do on failures. The ONLY role that edits notes.
- **coder** — subagent (Sonnet). Implements exactly one stage from its stage note,
  then commits. Never edits notes.
- **tester** — subagent (Sonnet). Read-only. Verifies the last commit against the
  stage note and returns a PASS/FAIL verdict. Never edits code or notes.

Hard rules for all roles:
- Subagents cannot spawn other subagents. coder and tester report back to the
  orchestrator only via their final message.
- On an ambiguous, contradictory, or underspecified plan: STOP. Do not improvise.
  coder/tester surface the problem to the orchestrator; the orchestrator re-reads
  context and resolves it (see §1).
- **A stage is "done" ONLY after tester returns PASS.** Nothing else marks completion.

## 6. Obsidian Vault Conventions (via the Obsidian MCP server)

The Obsidian vault is the single source of truth and the only reliable channel
between orchestrator and subagents (a subagent starts with fresh context and sees
only the prompt it's handed). The orchestrator passes a stage-note path; coder and
tester open and read that note themselves before doing anything.

The vault has its OWN authoritative `CLAUDE.md` at its root with the full
conventions (complete tag taxonomy, folder→frontmatter table, templates, move
rules). The agents run from the CODE repo and reach the vault only over MCP, so
the vault's `CLAUDE.md` is NOT auto-loaded into their context — the rules the
pipeline depends on are reproduced below. If anything about vault mechanics is
unclear, read the vault's own `CLAUDE.md` over MCP first; it wins on conflicts.

### Where pipeline notes live
Freelance/client projects go under `Projects/Work/<Project>/`; personal projects
under `Projects/Personal/<Project>/` (same layout, omit `client`).

**Note layout — root vs wave-folders.** The project root holds only durable,
*current* notes: the main project note, the live architecture/tech doc(s), decision
notes, and key references. Stage/implementation notes are grouped into **wave
subfolders** — one folder per development wave or redesign (e.g. SkillUp has
`pipeline-v1-frequency-core/`, `mvp-gamification/`, `redesign-v2-topdown/`). This
keeps the root a clean snapshot of the system as it is now, while superseded
build-logs stay preserved but out of the way. A new stage note goes into the
**current** wave's folder.

**MCP mechanics for filing a stage note:** `create_note` cannot target a subfolder —
it always lands the note flat in the project root. So filing is two steps:
`create_note` (root) → `move_note` into the current wave folder. Moving only changes
the folder, so `[[wiki-links]]` are untouched (Obsidian resolves them by filename).
There is no `create_folder` over MCP: if the current wave folder doesn't exist yet,
ask the human to create it, then move into it. Don't let stage notes pile up in the
root.

- **Main project note** — title `<project-slug>`, `type: project`
  - frontmatter: `type: project`, `project_status`, `client: "[[…]]"` (Work only),
    >=1 Тематика tag
  - body: purpose, overall architecture, key decisions, data model, and
    `[[links]]` to every stage note
- **Stage notes** — title `NN-stage-slug` (e.g. `01-foundation`), `type: note`
  - frontmatter: `type: note`, `project: "[[<project-slug>]]"`, >=1 Тематика tag
  - body: stage goal · architecture for the stage · surface-level logic ·
    concrete details (what/how to use, available data, interfaces) ·
    **Acceptance criteria (testable)** · implementation checklist
- **Decision notes** — title `decision-<slug>`, `type: decision`
  - Logged whenever the orchestrator resolves a FAIL or makes a non-trivial
    architectural call, so the reasoning survives across sessions.
  - frontmatter: `type: decision`, `decision_status: proposed|accepted|rejected`,
    `date`, `project: "[[…]]"`, >=1 Тематика tag
  - any numbers in a decision (e.g. a contrast target) must be code-computed (§10),
    never estimated
- Prefer the matching `note_type` template if the vault applies one.

**Acceptance criteria** are explicit, binary, testable statements — e.g.
"button text contrast >= 4.5:1 (AA normal), computed via code", "invalid email is
rejected before submit", "yearly toggle recomputes all three prices". They are
exactly what the tester checks, and they are what lets delegation prompts stay
thin (§11). A vague criterion ("looks good") is a bug in the note — fix the note.

### Vault mechanics the agents MUST follow
- **Links**: always `[[Note name without extension]]` (or `[[Note|display text]]`).
  Never markdown `[text](path.md)` — Obsidian won't show it in the graph.
- **Filenames**: cyrillic/latin, digits, spaces, hyphens only. Forbidden chars:
  `: / \ * ? " < > | # ^ [ ]`. So note titles use hyphens/spaces and NEVER a colon
  (e.g. `02-auth-flow`, not `stage-02: auth`). The git commit message in §8 may use
  a colon; that restriction is for filenames only.
- **Tags**: only from the vault's approved list, in YAML `tags:`. The Тематика
  category — required for project/note/decision notes — is: `ml`, `ai`,
  `education`, `dev-tools`, `prompt-engineering`, `obsidian`, `social`, `youtube`,
  `gamedev`, `dataset`, `object-detection`, `startup`, `web`.
- **Never touch `.obsidian/`** — don't read or write it.
- **Never hard-delete** a note. Soft-move to `Archive/<original-folder>/` and add
  `archived_at: <ISO date>`.
- Before mass edits (>10 notes), show the plan first.

### Checklist semantics (inside stage notes)
- `- [ ]` = pending
- `- [x]` = done — set by the orchestrator ONLY after tester returns PASS

### Note discipline
- Only the orchestrator writes/edits notes. coder and tester are read-only on notes.
- Keep heavy detail in the notes, not in chat. This keeps the orchestrator's context
  clean and lets any fresh subagent reconstruct full context from the note alone.
- Each stage note must be self-contained enough that coder/tester need nothing beyond
  it plus the codebase to do their job.

## 7. Stage Loop (run once per stage)

Delegate with the thin contract in §11 — point coder/tester at the note, don't
re-paste it. Delegations are idempotent: coder commits are atomic per stage and the
tester is read-only, so any delegation can be safely re-run if interrupted (e.g. a
usage limit) without corrupting state.

1. Orchestrator delegates to **coder** with the stage-note path.
   → coder implements ONLY that stage (§2, §3, §9), then commits (§8).
2. Orchestrator delegates to **tester** with the same stage-note path and the commit hash.
   → tester diffs that commit against the note's acceptance criteria and returns PASS or FAIL.
3. **PASS** → orchestrator checks off completed items in the stage note, then moves
   to the next stage.
4. **FAIL** → orchestrator re-reads the project context and the stage note, identifies
   the root cause, fixes/clarifies the note if the plan was at fault, and logs any
   non-trivial architectural decision as a decision note (§6; numbers in it computed
   via code, §10). Then re-delegates to coder (thin re-pass prompt, §11), then to
   tester again. Repeat until PASS — or, if blocked by genuine ambiguity, stop and
   ask the human.

## 8. Commits

- coder commits per stage with a clear message that names the stage
  (e.g. `stage-02: <slug> — <what>`), so tester can reliably review "the last commit."
- One stage = one coherent commit (or a small, related set). Don't bundle multiple
  stages into one commit; tester verifies against a single stage note.

## 9. Scope Discipline (reinforces §2 and §3 for the pipeline)

- coder implements only the current stage. No future-stage work, no speculative
  abstractions, no touching code outside what the stage requires.
- coder must NOT knowingly commit code that violates the stage note's acceptance
  criteria. If a criterion cannot be met within the stage's scope, coder STOPS and
  reports to the orchestrator (with code-computed numbers where relevant) instead of
  committing a known-failing result. A known violation is not a "deviation note" — it's
  a stop.
- tester reports issues precisely (file/line, expected vs actual, computed numbers).
  It never fixes code and never edits notes — fixing is the next coder pass, decided
  by the orchestrator.

## 10. Numeric & Factual Verification (all roles)

Any numeric or factual claim that can be computed or checked MUST be produced by
running code — never estimated from intuition. This covers contrast ratios, font
sizes, percentages, timings, element counts, and similar. Always state the computed
value next to the threshold/expected value it is compared against.

- The **coder** computes (e.g. python via Bash) before claiming a number; it never
  writes a figure it didn't compute.
- The **tester** recomputes independently and NEVER trusts numbers reported by the
  coder or written in commit messages — if the coder says "3.6:1", the tester
  derives its own value and judges against that.
- The **orchestrator** computes (or has the tester compute) any number it puts into
  a decision note.

(Rationale: a single contrast value was once hand-estimated four different ways
across the roles; only the code-computed value was correct.)

## 11. Thin Delegation Contract

The stage note already carries the full plan and acceptance criteria, so the
orchestrator must NOT copy that content into delegation prompts. Re-pasting bloats
the expensive (Opus) context and duplicates the source of truth. Delegate with the
minimum the subagent can't derive itself:

- **To coder:** `Implement stage <NN> per its note: <note-path>. Repo: <repo-path>.`
  On a re-pass after FAIL, add ONLY: the specific failed criterion, a one-line
  pointer to the tester's finding, and the decision-note path if one exists.
- **To tester:** `Verify commit <hash> against stage <NN> note: <note-path>. Repo: <repo-path>.`
  Nothing else — the tester reads the acceptance criteria itself and uses its own
  response format.

Add a line of genuinely out-of-note context only if needed (e.g. an environment
quirk). Never paste the note's checklist into the prompt.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ This is Next.js 16 — not the version you were trained on

APIs, conventions, and file structure differ from older Next.js. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code**, and heed deprecation notices. Confirmed breaking changes that already shape this repo:

- **Middleware is renamed to "Proxy".** There is no `middleware.ts`. The locale logic lives in [src/proxy.ts](src/proxy.ts), which exports a `proxy(request)` function plus `config.matcher`. See `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.
- **`params` is async.** Page / layout / `generateMetadata` receive `params: Promise<{ lang: string }>` and must `await` it (see [src/app/[lang]/layout.tsx](src/app/[lang]/layout.tsx)).
- **`images.qualities` must be allow-listed** in [next.config.ts](next.config.ts) (`next/image` rejects qualities not in the array).

## Commands

```bash
npm run dev      # dev server on :3000 (predev runs sync:case-images first)
npm run build    # production build (prebuild runs sync:case-images first)
npm start        # prestart runs prepare-standalone.mjs, then serves .next/standalone/server.js
npm run lint     # eslint (eslint-config-next: core-web-vitals + typescript)

npm run sync:case-images      # copy img/<source>/<locale> → public/cases/<locale>/<slug>
npm run optimize:case-images  # ffmpeg PNG/JPG → WebP in img/ and public/cases/ (needs ffmpeg on PATH)
```

There is **no test runner** configured. "Production check" is `npm run lint && npm run build && npm start`.

Path alias: `@/*` → `src/*`.

## Architecture

Bilingual (ru/en) single-page marketing site for a freelance dev, plus a cases archive, a lead-capture API, and a private admin dashboard. App Router, React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), TypeScript strict.

### Localization is the backbone
- Locales are `["ru", "en"]`, default `en` (defined in both [src/data/site.ts](src/data/site.ts) and [src/proxy.ts](src/proxy.ts) — keep them in sync).
- [src/proxy.ts](src/proxy.ts) resolves the locale for every non-asset request: `site-locale` cookie → CIS country header (geo) → `Accept-Language`. It redirects `/` → `/{locale}`, persists the cookie, and sets an `x-site-locale` request header.
- Localized routes live under [src/app/[lang]/](src/app/[lang]/). The `[lang]` segment is validated by `getLocaleFromParams` — an unknown lang triggers `notFound()`.
- The [src/app/(redirects)/](src/app/(redirects)/) route group holds the bare `/` and `/cases` entries that redirect into the default locale (these paths are excluded from the proxy matcher).

### Content lives in data files, not components
- **All copy, cases, service packages, FAQ, and the estimator config** are in [src/data/site.ru.ts](src/data/site.ru.ts) and [src/data/site.en.ts](src/data/site.en.ts).
- [src/data/site.ts](src/data/site.ts) is the aggregator. `SiteData = typeof ruSiteData` — **the Russian file is the canonical shape; the English file must structurally match it** or types break. Use `getSiteData(locale)` to read, `getLocalizedHref(locale, href)` to build locale-aware links.
- Sections in [src/components/sections/](src/components/sections/) and interactive bits in [src/components/interactive/](src/components/interactive/) receive `site` data as props from [src/app/[lang]/page.tsx](src/app/[lang]/page.tsx); they don't fetch.

### Case-image pipeline (two stages)
1. **Build-time sync** ([scripts/sync-case-images.mjs](scripts/sync-case-images.mjs), runs in predev/prebuild): copies source images from `img/<sourceFolder>/[locale]/` into `public/cases/<locale>/<slug>/`. The `slug → sourceFolder` mapping table is hardcoded in that script — add new cases there.
2. **Request-time resolution** ([src/data/case-images.ts](src/data/case-images.ts)): picks the best available extension (preference `avif > webp > jpg > png`), treats `preview_sq` as the cover and `preview_rec` + numeric-named files as the gallery, with fallbacks to the static `coverImage` in the data file.
- `optimize:case-images` is a separate manual step that shells out to **ffmpeg** to generate `.webp` siblings.

### Backend (API route handlers, `runtime = "nodejs"`)
- [src/app/api/project-leads/route.ts](src/app/api/project-leads/route.ts): validates a lead → `insertProjectLead` (Postgres) → `sendTelegramMessage` → `updateLeadTelegramStatus`. Returns `502` on Telegram failure but still reports whether the lead was `stored`.
- [src/app/api/analytics/page-view/route.ts](src/app/api/analytics/page-view/route.ts): records a visit per [src/components/analytics-tracker.tsx](src/components/analytics-tracker.tsx). Raw IP is never stored — only a salted SHA-256 hash (`ANALYTICS_SALT`). Skips `/admin` paths.

### Persistence & integrations (`server-only`)
- [src/lib/database.ts](src/lib/database.ts): one `pg` Pool cached on `globalThis`; schema is **auto-created lazily** (`CREATE TABLE IF NOT EXISTS`) on first query via `ensureSchema`. Tables: `project_leads`, `site_visits`. Every query goes through `withDatabase()`, **which returns `null` when `DATABASE_URL` is unset — the whole app degrades gracefully with no database.**
- [src/lib/telegram.ts](src/lib/telegram.ts): raw `node:https` POST to the Bot API with an optional outbound proxy (`TELEGRAM_PROXY_URL` via `proxy-agent`, since the Bot API has no proxy field). Stubs to `console.info` when token/chat are unset.
- [src/lib/admin-auth.ts](src/lib/admin-auth.ts): `/admin` is gated by an HMAC-signed (`ADMIN_SESSION_SECRET`) session cookie scoped to `/admin`; credentials come from `ADMIN_USERNAME`/`ADMIN_PASSWORD`. Login/logout are server actions in [src/app/admin/actions.ts](src/app/admin/actions.ts). `requireAdminSession()` redirects unauthenticated users to `/admin/login`.

### Deployment
`output: "standalone"`. `npm start` runs [scripts/prepare-standalone.mjs](scripts/prepare-standalone.mjs) to copy `.next/static` and `public/` into `.next/standalone/` (Next doesn't bundle those), then runs the standalone server. `deploymentId` comes from `DEPLOYMENT_VERSION`. Ships via [docker-compose.yml](docker-compose.yml) (app + a `postgres` service); see [README.md](README.md) for the full server/Nginx flow.

### Environment variables
Optional in dev, but feature-gating: `DATABASE_URL` (no DB → leads/analytics silently skip persistence), `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` (+ `TELEGRAM_PROXY_URL`), `ADMIN_USERNAME`/`ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET`, `ANALYTICS_SALT`, `NEXT_PUBLIC_SITE_URL`, `DEPLOYMENT_VERSION`. Copy `.env.example` → `.env`. Full reference is in [README.md](README.md).

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer
rewrites due to overcomplication, clarifying questions come before implementation
rather than after mistakes, every stage in Obsidian is checked off only after a real
PASS, every number that gates a PASS was computed by code (not estimated), and
ClickUp receives only end-of-run follow-ups rather than per-stage noise.