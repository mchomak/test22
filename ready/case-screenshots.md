# Скрины для кейсов

Сайт читает изображения из `public/cases/<lang>/<slug>/`.
Исходники лежат в `img/<project>/<lang>/` и синхронизируются в `public/cases` перед `npm run dev` и `npm run build`.

## Имена, которые понимает сайт

Для каждого проекта:

- `preview_sq.png` — квадратное превью для карусели на главной.
- `preview_rec.png` — прямоугольное превью для подробной страницы кейса.
- `1.png`, `2.png`, `3.png` — остальные скрины в порядке показа.

На странице кейса порядок всегда такой:

- сначала `preview_rec`;
- потом числовые файлы от меньшего к большему: `1`, `2`, `3`, `10`.

Если `preview_rec` временно нет, страница использует `preview_sq`, чтобы не ломать верстку.

## Папки

- `public/cases/subscription-bot/`
- `public/cases/sapsanex-mini-app/`
- `public/cases/seedream-tryon/`
- `public/cases/ai-reply-assistant/`
- `public/cases/bybit-trading-bot/`
- `public/cases/eps-bot/`
- `public/cases/frax-redesign/`
- `public/cases/tech-rise-academy/`
- `public/cases/gym-progres/`
- `public/cases/skillup/`

Поддерживаемые расширения: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`.

`originals/` можно оставлять рядом как архив исходников, но на сайт лучше подключать уже выбранные и очищенные файлы из `public/cases/<slug>/`.

Детальные чек-листы по проектам лежат в `ready/<slug>.md`.
