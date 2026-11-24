import Image from "next/image";
import { Eyebrow, Reveal, Section } from "./ui";

const ROWS = [
  ["ops", "insert · update · move · delete"],
  ["layout", "auto layout, gap, fill, fit"],
  ["safe", "dry-run before anything lands"],
] as const;

export function AgentsDraw() {
  return (
    <Section className="grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
      <div>
        <Reveal><Eyebrow>execute</Eyebrow></Reveal>
        <Reveal delay={70}>
          <h2 className="mt-5 text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">
            one call.
            <br />a whole board.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-fg-2 md:text-[18px]">
            agents write small scripts against a typed document. boards, frames, auto layout, tokens and components land
            on a real canvas, not in an html soup.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <dl className="mt-8 space-y-3 font-mono text-[13px]">
            {ROWS.map(([k, v]) => (
              <div key={k} className="flex gap-6">
                <dt className="w-16 shrink-0 text-accent">{k}</dt>
                <dd className="text-fg-2">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      <div className="relative">
        <Reveal side delay={80}>
          <Image
            src="/img/draw-viewer.png"
            alt="Lakar viewer with dry-run review dialog"
            width={780}
            height={490}
            className="w-full rounded-xl border border-line opacity-90"
          />
        </Reveal>
        <Reveal side delay={220} className="relative z-10 -mt-16 ml-4 max-w-[560px] md:-mt-24 md:ml-10">
          <div className="rounded-xl border border-line-2 bg-page-2 shadow-[0_16px_50px_0_#00000088]">
            <Image src="/img/draw-code.png" alt="claude → lakar.execute script" width={700} height={370} className="w-full rounded-xl" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
