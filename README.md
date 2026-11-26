# lakar-landing

Landing page for [Lakar](https://github.com/fatmuh/lakar) — the design canvas your coding agents drive.

## Design source

- `lakar-meta/design/lakar-landing.pen` (Pencil 2.25), frame **Lakar landing v2 — desktop**: aloud.sh-style layout —
  near-black page, sentence-case gradient headings, `[01]` section chips, pill buttons, gradient scenes behind real UI
  screenshots, hairline details grid, FAQ accordion and a closing CTA.
- Generator: `lakar-meta/design/gen/gen_landing.py`. Section previews: `lakar-meta/design/previews/landing-*-dark.png`.
- The previous sidealong-style design is kept as `lakar-meta/design/lakar-landing-v1.pen`.

Sections map 1:1 to the frame's children: Nav + hero → 01 Prompt it → 02 See it live → 03 Refine it → 04 Ship it →
the details → Local-first → FAQ → closing CTA → footer (`src/components/{Hero,Steps,Rest}.tsx`).

## Assets

`public/img/*.png` are exported from the `.pen` with the pen CLI (scale 2, window shadows cropped off and redone in CSS):

| File | Node in `lakar-landing.pen` |
|---|---|
| `hero-viewer.png` | `lakar viewer (real ui, 78%)` |
| `dryrun-review.png` | `dry-run review (real ui, 67%)` |
| `presence.png` | `Presence Crop` |
| `activity.png` | `Activity Crop` |
| `comments-pins.png` | `comments & pins (real ui, 69%)` |
| `app-icon.png` | `App Icon` (closing CTA), also `src/app/apple-icon.png` |

`public/img/waves.svg` reproduces the closing section's wave lines (same parameters as the generator).
`src/app/icon.svg` is the bare script-L mark that switches between #17181B and #FFFFFF with `prefers-color-scheme`,
as decided in `lakar-meta/design/lakar-brand.pen`. Everything else (prompt bar, code cards, thread/diff panels,
export window, grid) is built in HTML/CSS.

## Stack

- Next.js 16 (App Router, `output: "standalone"`) + React 19
- Tailwind CSS v4 (`@theme` tokens taken from the `.pen` palette)
- Inter + JetBrains Mono via `next/font`

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck
pnpm build
```

## Docker

```sh
docker build -t lakar-landing .
docker run -p 3000:3000 lakar-landing
```

## Notes

- The design is desktop-only (1440). Breakpoints: mobile < 768, tablet 768–1279, desktop ≥ 1280; grids collapse to one
  column and headings step down (hero 48 / 84 / 112 px).
- Motion: reveal-on-scroll and the FAQ accordion; both are disabled under `prefers-reduced-motion`.
