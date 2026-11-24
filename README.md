# lakar-landing

Landing page for [Lakar](https://github.com/fatmuh/lakar) — a design tool built for agents.
Source design: `lakar-meta/design/lakar-landing.pen` (sidealong-style, all 48 boards incl. tablet/mobile variants and a 22-row motion spec).

## Stack

- Next.js 16 (App Router, `output: "standalone"`) + React 19
- Tailwind CSS v4 (`@theme` tokens extracted from the `.pen` file)
- Inter + JetBrains Mono via `next/font`

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:3000
```

## Docker

```sh
docker build -t lakar-landing .
docker run -p 3000:3000 lakar-landing
```

## Notes

- Sections mirror the design boards 01–11; breakpoints follow the reflow notes
  (mobile < 768, tablet 768–1279, desktop ≥ 1280).
- Motion follows the spec board `Xz0nu`: marquee (pauses on hover), terminal
  caret, before/after scrub handle (mobile gets a toggle), reveal-on-scroll,
  accordion FAQ, kbd press state — all disabled under `prefers-reduced-motion`.
- Mockup images in `public/img/` are real Lakar screens cropped from the
  design previews.
