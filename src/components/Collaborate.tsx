import Image from "next/image";
import { Eyebrow, Reveal, Section } from "./ui";

const LABELS = ["comments tab", "pins & threads on the canvas", "agent replies inline"];

export function Collaborate() {
  return (
    <Section className="text-center">
      <Reveal><Eyebrow center>agent collaboration</Eyebrow></Reveal>
      <Reveal delay={70}>
        <h2 className="mt-5 text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">
          pin it. your agent reads it.
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-relaxed text-fg-2 md:text-[18px]">
          comments live on the canvas. agents answer in the thread, show up on the page they edit, and every tool call
          lands in the activity feed.
        </p>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {LABELS.map((l) => (
            <span key={l} className="flex items-center gap-2 font-mono text-[13px] text-fg-2">
              <span className="size-1.5 rounded-full bg-agent" />
              {l}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={120} className="mt-10">
        <Image
          src="/img/collab-viewer.png"
          alt="Comment pins and threads on the Lakar canvas"
          width={940}
          height={600}
          className="mx-auto w-full max-w-[980px] rounded-xl border border-line shadow-[0_20px_70px_0_#00000055]"
        />
      </Reveal>
    </Section>
  );
}
