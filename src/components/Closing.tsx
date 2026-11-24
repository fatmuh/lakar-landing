import { Eyebrow, Kbd, Reveal, Section } from "./ui";

export function Closing() {
  return (
    <>
      <Section className="pb-10 text-center">
        <Reveal><Eyebrow center>closing</Eyebrow></Reveal>
        <Reveal delay={70}>
          <h2 className="mt-6 text-[38px] leading-[1.05] font-medium tracking-tight md:text-[64px]">
            point your agent at a real canvas.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-relaxed text-fg-2 md:text-[19px]">
            download lakar, add one line to your mcp config, and let your agent draw.
          </p>
        </Reveal>
        <Reveal delay={210}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#download" className="rounded-xl bg-cta px-6 py-3 text-[15px] font-medium text-cta-fg transition-transform hover:scale-[1.03]">
              download for mac
            </a>
            <code className="rounded-xl border border-line-2 bg-panel px-6 py-3 font-mono text-[15px] text-fg">
              npx lakar mcp<span className="caret" />
            </code>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-5 hidden items-center justify-center gap-1.5 font-mono text-xs text-fg-3 md:flex">
            <Kbd>⌃</Kbd>
            <Kbd>⌥</Kbd> anywhere to start watching
          </p>
        </Reveal>
      </Section>
      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-10">
          <div>
            <div className="flex items-center gap-2.5 text-lg font-semibold">
              <span className="grid size-6 place-items-center rounded-md bg-accent text-[13px] font-bold text-white">l</span>
              lakar
            </div>
            <p className="mt-4 font-mono text-xs leading-relaxed text-fg-3">
              a design tool built for agents.
              <br />
              local-first · mcp-native · open.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-xs text-fg-3">
              <span className="text-fg-2">theme</span>
              {["light", "dark", "auto"].map((t, i) => (
                <span key={t} className={`rounded-md border px-2 py-1 ${i === 1 ? "border-accent text-fg" : "border-line-2"}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          {(
            [
              ["product", ["download", "features", "pricing", "changelog"]],
              ["developers", ["docs", "mcp reference", "skills", "github"]],
              ["company", ["blog", "twitter", "contact"]],
            ] as const
          ).map(([head, links]) => (
            <div key={head}>
              <p className="font-mono text-xs text-fg-3">{head}</p>
              <ul className="mt-4 space-y-2.5 text-[14px] text-fg-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-fg transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-line py-5">
          <p className="mx-auto max-w-[1200px] px-5 font-mono text-xs text-fg-3 md:px-10">
            ·✢✳✶✻✽✻✶✳✢&nbsp;&nbsp;© 2026 lakar — made with agents
          </p>
        </div>
      </footer>
    </>
  );
}
