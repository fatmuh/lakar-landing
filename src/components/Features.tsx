import { Eyebrow, Reveal, Section } from "./ui";

const FEATURES: { glyph: string; title: string; desc: string }[] = [
  { glyph: "▤", title: "auto layout", desc: "real flex-style layout, not absolute css. gap, padding, fill, fit." },
  { glyph: "◈", title: "components & props", desc: "component() once. instances everywhere, typed props." },
  { glyph: "⌘", title: "shortcuts", desc: "full keymap for humans. claude doesn't need it." },
  { glyph: "◐", title: "modes", desc: "light, dark, high contrast. one token, every theme." },
  { glyph: "⛶", title: "pen-native svg", desc: "the canvas is svg. icons, curves and glyphs stay sharp." },
  { glyph: "⚡", title: "local-first", desc: "every call under 2ms. no network on your canvas." },
  { glyph: "✎", title: "sketch to vector", desc: "pencil doodles become bezier paths. roughness is a prop." },
  { glyph: "⇪", title: "open in", desc: "hand a board to figma, or keep it here. your call." },
  { glyph: "⌁", title: "mcp over lsp", desc: "the same mcp toolset agents already speak." },
  { glyph: "⧉", title: "multi-page files", desc: "pages, boards, components — one file, real structure." },
  { glyph: "✓", title: "checks", desc: "layout_check, visual_diff, analyze. agents see results." },
  { glyph: "⌗", title: "versioned history", desc: "rev bumps, snapshots, restore. agents can undo too." },
  { glyph: "↔", title: "comment round-trip", desc: "you pin a comment. the agent replies in the thread." },
];

export function Features() {
  return (
    <Section id="features">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Reveal><Eyebrow>features</Eyebrow></Reveal>
          <Reveal delay={70}>
            <h2 className="mt-5 text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">
              13 and counting.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={100} className="hidden md:block">
          <p className="font-mono text-xs text-fg-3">grid · 5 col</p>
        </Reveal>
      </div>
      {/* mobile: daftar bernomor tanpa glyph */}
      <ol className="mt-10 divide-y divide-line md:hidden">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 30}>
            <li className="flex gap-4 py-4">
              <span className="font-mono text-xs text-fg-3 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[15px] font-medium">{f.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-2">{f.desc}</p>
              </div>
            </li>
          </Reveal>
        ))}
        <li className="pt-5">
          <div className="rounded-2xl bg-accent p-5">
            <p className="text-[18px] font-semibold text-white">local-first.</p>
            <p className="mt-1 text-[13px] text-white/80">works offline. every call under 2ms.</p>
          </div>
        </li>
      </ol>
      {/* tablet/desktop: grid kartu */}
      <div className="mt-10 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-5">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 5) * 60}>
            <div className="feature-card flex h-full flex-col gap-4 rounded-2xl border border-line bg-panel p-5" tabIndex={0}>
              <span className="font-mono text-xl text-fg-2">{f.glyph}</span>
              <div className="mt-auto">
                <p className="text-[15px] font-medium">{f.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-fg-3">{f.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={120} className="lg:col-span-2">
          <div className="feature-card flex h-full flex-col justify-between gap-6 rounded-2xl bg-accent p-5">
            <p className="text-[24px] font-semibold leading-tight text-white">local-first.</p>
            <div>
              <p className="font-mono text-xs text-white/80">works offline.</p>
              <p className="font-mono text-xs text-white/80">every call under 2ms.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
