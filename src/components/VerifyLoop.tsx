import { Eyebrow, Kbd, Reveal, Section } from "./ui";

const Chip = ({ tone, children }: { tone: "ok" | "warn" | "plain"; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] ${
      tone === "ok"
        ? "border-success/30 bg-success/10 text-success"
        : tone === "warn"
          ? "border-warning/30 bg-warning/10 text-warning"
          : "border-line-2 bg-panel text-fg-2"
    }`}
  >
    {children}
  </span>
);

const STEPS: {
  n: string;
  title: string;
  desc: string;
  chips: { tone: "ok" | "warn" | "plain"; text: string }[];
}[] = [
  {
    n: "01",
    title: "draw.",
    desc: "execute writes ops to a real document.",
    chips: [
      { tone: "ok", text: "✓ execute +23 ops" },
      { tone: "plain", text: "insert · Feature grid" },
      { tone: "plain", text: "set_tokens · mode: dark" },
    ],
  },
  {
    n: "02",
    title: "check.",
    desc: "layout_check finds overflow, clipping, off-grid.",
    chips: [
      { tone: "warn", text: "! layout_check 1 error" },
      { tone: "plain", text: "Hero — Mobile › headline overflows 14px" },
    ],
  },
  {
    n: "03",
    title: "diff.",
    desc: "visual_diff compares render to intent.",
    chips: [{ tone: "plain", text: "Δ 0.4%" }],
  },
  {
    n: "04",
    title: "fix.",
    desc: "only what failed. then check again.",
    chips: [
      { tone: "ok", text: "✓ update cta.paddingY 8→12" },
      { tone: "ok", text: "✓ layout_check 0 issues" },
      { tone: "ok", text: "✓ visual_diff Δ 0.0%" },
    ],
  },
];

export function VerifyLoop() {
  return (
    <Section>
      <Reveal><Eyebrow>verification loop</Eyebrow></Reveal>
      <Reveal delay={70}>
        <h2 className="mt-5 max-w-[720px] text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">
          a loop it can
          <br />
          check by itself.
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-fg-2 md:text-[18px]">
          no more “looks good to me” from a model that never saw it. agents draw, measure, diff and fix before you look.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 90} className="relative">
            <div className="feature-card flex h-full flex-col gap-3 rounded-2xl border border-line bg-panel p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[38px] font-light text-fg-3">{s.n}</span>
                {i < 3 && <span className="hidden font-mono text-lg text-fg-3 md:block">→</span>}
              </div>
              <h3 className="text-[22px] font-medium">{s.title}</h3>
              <p className="text-[14px] leading-relaxed text-fg-2">{s.desc}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {s.chips.map((c) => (
                  <Chip key={c.text} tone={c.tone}>
                    {c.text}
                  </Chip>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <div className="mt-6 flex items-center justify-between">
          <p className="font-mono text-xs text-fg-3">↺ until layout_check is clean</p>
          <p className="hidden font-mono text-xs text-fg-3 md:block">
            <Kbd>⌃⌥L</Kbd>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
