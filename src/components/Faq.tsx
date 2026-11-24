"use client";

import { useState } from "react";
import { Eyebrow, Reveal, Section } from "./ui";

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: "isn't this just figma with an api?",
    a: "no. the document model is built for agents: typed ops, tokens, components, and checks like layout_check and visual_diff that return real numbers, not screenshots.",
  },
  {
    q: "does it work offline?",
    a: (
      <>
        yes — everything is local. the only network hop is to your agent.
        <span className="mt-2 block font-mono text-xs text-fg-3">$ lakar bench → ops 0.4ms · render 31ms</span>
      </>
    ),
  },
  { q: "which agents are supported?", a: "any mcp client. claude code, codex, gemini cli — plus acp clients like zed." },
  {
    q: "how do humans edit it?",
    a: "in the desktop app or the browser viewer. same canvas, same file. comments work both directions.",
  },
  { q: "what about my existing designs?", a: "import .pen and svg today. figma import is on the roadmap." },
  { q: "where's the ai?", a: "in your harness, not ours. lakar is the canvas — the model is yours." },
  { q: "is it open source?", a: "source-available, self-hostable, files are plain json on disk." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
      <div>
        <Reveal><Eyebrow>faq</Eyebrow></Reveal>
        <Reveal delay={70}>
          <h2 className="mt-5 text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">
            13 answered.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-[380px] text-[16px] leading-relaxed text-fg-2 md:text-[18px]">
            the questions agents and designers actually ask. the rest are in the docs.
          </p>
        </Reveal>
      </div>
      <Reveal delay={100}>
        <div className="divide-y divide-line border-y border-line">
          {QA.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-medium hover:text-fg transition-colors"
                aria-expanded={open === i}
              >
                {item.q}
                <span className="acc-icon shrink-0 font-mono text-lg text-fg-3">+</span>
              </button>
              <div className="acc" data-open={open === i ? "" : undefined}>
                <div>
                  <p className="pb-6 pr-8 text-[15px] leading-relaxed text-fg-2">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
