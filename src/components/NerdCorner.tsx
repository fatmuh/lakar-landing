import { Eyebrow, Reveal, Section } from "./ui";

type Hop = { label: string; you?: boolean };

function Lane({
  title,
  hops,
  foot,
  tiles,
  accent,
}: {
  title: string;
  hops: Hop[];
  foot: string;
  tiles: number;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 md:p-7 ${accent ? "border-accent/40 bg-accent-soft" : "border-line bg-panel"}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[13px] text-fg-2">{title}</p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={`size-4 rounded-[4px] border ${i < tiles ? (accent ? "border-accent bg-accent" : "border-agent bg-agent") : "border-line-2 bg-panel-2"}`}
            />
          ))}
          <span className="ml-2 font-mono text-[11px] text-fg-3">rounds in the same time</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[13px]">
        {hops.map((h, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-fg-3">→</span>}
            <span
              className={`rounded-md border px-2.5 py-1 ${
                h.you ? "border-agent/50 bg-agent-soft text-agent" : "border-line-2 bg-panel-2 text-fg-2"
              }`}
            >
              {h.label}
            </span>
          </span>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-fg-3">{foot}</p>
    </div>
  );
}

export function NerdCorner() {
  return (
    <Section>
      <Reveal><Eyebrow>nerd corner</Eyebrow></Reveal>
      <Reveal delay={70}>
        <h2 className="mt-5 text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">if you like diagrams.</h2>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-fg-2 md:text-[18px]">
          same design work. a shorter loop.
        </p>
      </Reveal>
      <Reveal delay={150} className="mt-10 space-y-4">
        <Lane
          title="today · you're the messenger"
          hops={[
            { label: "you", you: true },
            { label: "screenshot" },
            { label: "chat" },
            { label: "claude" },
            { label: "css" },
            { label: "browser" },
            { label: "you", you: true },
          ]}
          foot="7 hops · 3 of them are you copying pixels around"
          tiles={2}
        />
        <Lane
          title="with lakar · the agent sees the canvas"
          hops={[
            { label: "claude" },
            { label: "execute" },
            { label: "canvas" },
            { label: "layout_check" },
            { label: "visual_diff" },
            { label: "you", you: true },
          ]}
          foot="5 hops · you only show up to approve"
          tiles={6}
          accent
        />
      </Reveal>
      <Reveal delay={220}>
        <p className="mt-6 font-mono text-[13px] text-fg-2">you get to the good version sooner.</p>
      </Reveal>
    </Section>
  );
}
