# Wave 08 - Asset audit

Дата аудита: 2026-06-15.

Этап: `00 - Asset audit и выбор направления`.

## Источники

- `ready/*.md` - описания и публичные ограничения кейсов.
- `ready/case-screenshots.md` - правила именования и порядок галереи.
- `public/cases/*` - текущие ассеты, которые видит сайт при fallback-резолве.
- `img/*` - исходники с `ru/en`, которые копируются скриптом.
- `scripts/sync-case-images.mjs` - slug -> source folder mapping.
- `src/data/case-images.ts` - логика выбора `preview_sq`, `preview_rec` и числовых файлов.
- `src/data/site.ru.ts`, `src/data/site.en.ts` - порядок, тексты и категории кейсов.

Код сайта на этом этапе не менялся.

## Инвентарь

`public/cases` содержит 10 плоских папок кейсов и по два preview-файла почти в каждой папке: `preview_sq` для обложки/карусели и `preview_rec` для галереи кейса. Также в `public/cases` есть пустые `ru` и `en`; при `npm run dev` / `npm run build` скрипт `sync-case-images` копирует локализованные исходники из `img/<source>/<locale>` в `public/cases/<locale>/<slug>`.

Важные технические наблюдения:

- `bybit-trading-bot/preview_sq.png` имеет пропорцию 1672x941, а `preview_rec.png` - 1254x1254. По смыслу они выглядят перепутанными: широкий asset лучше для hero/showcase, квадратный - для карточки.
- `skillup/preview_sq.png` и `skillup/preview_rec.png` оба 1448x1086 и выглядят как один и тот же 4:3 poster. Для квадратной карточки нужен отдельный crop или новый asset.
- `seedream-tryon`, `subscription-bot`, `sapsanex-mini-app` и `ai-reply-assistant` имеют наиболее полный набор supporting screenshots.
- `ready/vpn-bot.md` сейчас не является описанием case asset plan; для `subscription-bot` опираться на `src/data/site.*`, `img/vpn_bot/*` и реальные изображения в `public/cases/subscription-bot`.

## Выбранное направление

Основной визуальный ход для redesign: `Production Circuit` как editorial system map из реальных фрагментов проектов. Не строить hero вокруг абстрактного sci-fi dashboard. Карта должна показывать производственный контур: Telegram surface -> backend/API -> payments/AI/data -> admin/logs/deploy, а скриншоты должны быть маленькими proof-фрагментами внутри этой схемы.

Главная подборка должна давать 6 разных доказательств:

1. Telegram Mini App и exchange flow.
2. Telegram subscription/payments/admin.
3. AI image workflow и монетизация.
4. AI assistant / proxy / payments, только в нейтральной публичной подаче.
5. Crypto/trading automation.
6. AI product / education workflow.

## Main shortlist

| Приоритет | Slug | Роль на главной | Hero / showcase cover | Square preview | Supporting screenshot | Needs regeneration |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | `sapsanex-mini-app` | Mini App flagship: Telegram WebApp, exchange, status tracking | `public/cases/sapsanex-mini-app/preview_rec.png` | `public/cases/sapsanex-mini-app/preview_sq.png` | `public/cases/sapsanex-mini-app/1.png` или `2.png` для phone-flow | no |
| 02 | `subscription-bot` | Telegram payments/subscription proof: тарифы, провайдеры, админка | `public/cases/subscription-bot/preview_rec.png` | `public/cases/subscription-bot/preview_sq.png` | `public/cases/subscription-bot/5.png` или `7.png` для админки/платежей | no |
| 03 | `seedream-tryon` | AI/image workflow: bot + admin + Stars/YooKassa | `public/cases/seedream-tryon/preview_rec.png` | `public/cases/seedream-tryon/preview_sq.png` | `public/cases/seedream-tryon/2.png`, `8.png` или `9.png` | no |
| 04 | `ai-reply-assistant` | AI assistant proof: scenarios, GPT-4o, proxy, YooKassa | `public/cases/ai-reply-assistant/preview_rec.png` | `public/cases/ai-reply-assistant/preview_sq.png` | `public/cases/ai-reply-assistant/1.png` или `3.png` | no, but neutral-only |
| 05 | `bybit-trading-bot` | Crypto/trading automation: chart, signal, Telegram alert | `public/cases/bybit-trading-bot/preview_sq.png` | `public/cases/bybit-trading-bot/preview_rec.png` | `public/cases/bybit-trading-bot/1.png` | yes: fix preview naming/crops |
| 06 | `skillup` | AI product / education flagship: roadmap tree, onboarding | `public/cases/skillup/preview_rec.png` | use current `preview_sq.png` only temporarily | `public/cases/skillup/1.png` | yes: true square crop + more screenshots |

### Secondary pool

| Slug | Decision | Reason |
| --- | --- | --- |
| `tech-rise-academy` | Use as supporting proof / CTA fragment | Strong lead-flow story and good `preview_rec`, but less central than Telegram/AI/crypto for first redesign pass. |
| `eps-bot` | Use as optional technical fragment | Strong R&D/ML/on-chain visual, but duplicates the crypto lane already covered by Bybit. |
| `frax-redesign` | Keep for case archive / web redesign proof | Good clean images, but current redesign direction is production systems, not web-design portfolio first. |
| `gym-progres` | Keep for case archive / small internal-tool fragment | Useful dashboard texture, but not strong enough as one of the 6 main proof cases. |

## Hero mosaic fragments

Use these as 6-10 small pieces inside the `Production Circuit` hero/system map. Crops should favor recognizable UI surfaces, not full-page reading.

| # | Asset | Use in mosaic | Crop guidance |
| --- | --- | --- | --- |
| 1 | `public/cases/sapsanex-mini-app/1.png` | Telegram Mini App node | Phone center with calculator/status card. |
| 2 | `public/cases/subscription-bot/5.png` | Admin/payments node | Laptop table area, keep payment/admin context visible. |
| 3 | `public/cases/seedream-tryon/2.png` | AI result node | Phone chat with generated try-on/result moment. |
| 4 | `public/cases/seedream-tryon/8.png` | Admin/tariffs node | Laptop admin surface with colored plan/payment blocks. |
| 5 | `public/cases/bybit-trading-bot/preview_sq.png` | Crypto strategy node | Wide chart + phone alert; despite name this is the best wide hero crop. |
| 6 | `public/cases/skillup/preview_sq.png` | AI product / roadmap node | Tree center, avoid cropping out SkillUp identity entirely. |
| 7 | `public/cases/ai-reply-assistant/1.png` | AI assistant node | Phone with scenario/menu; keep wording neutral. |
| 8 | `public/cases/tech-rise-academy/preview_rec.png` | Lead capture / Telegram proof node | Laptop-to-phone split with Telegram lead. |
| 9 | `public/cases/eps-bot/preview_rec.png` | Optional ML/on-chain node | Use only if crypto/ML needs extra density beyond Bybit. |

## Asset actions for next stages

- Keep existing assets for stages 01-04; do not generate new images before layout proves where covers are weak.
- In stage 04, treat Bybit specially: use the wide image as showcase cover and the square image as square preview, regardless of current filenames, or rename in a dedicated asset pass.
- In stage 04/09, create a proper square SkillUp cover and add 2-4 supporting screenshots if SkillUp remains a main case.
- Keep `ai-reply-assistant` neutral: no dating/flirt wording, no romantic iconography, no real conversations in crops.
- Prefer `sapsanex-mini-app`, `subscription-bot`, `seedream-tryon`, `bybit-trading-bot`, `skillup` for the strongest first viewport proof. Add `ai-reply-assistant` when a sixth case is needed for AI assistant/proxy/payment breadth.

## Readiness criteria

- Images for hero, cases and proof are selected.
- Assets that need replacement/regeneration are identified: Bybit preview naming/crops and SkillUp square/supporting set.
- Site code remains unchanged in this stage.
