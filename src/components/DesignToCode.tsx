import Image from "next/image";
import { Eyebrow, Reveal, Section } from "./ui";

export function DesignToCode() {
  return (
    <Section className="grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
      <div>
        <Reveal><Eyebrow>export</Eyebrow></Reveal>
        <Reveal delay={70}>
          <h2 className="mt-5 text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">
            design in.
            <br />
            react out.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-fg-2 md:text-[18px]">
            export any board as react. tailwind v4 or css modules, components with typed props, tokens as css variables.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-7 flex flex-wrap gap-2 font-mono text-xs">
            {["react + tailwind v4", "react + css modules", "typed props · tsx"].map((c) => (
              <span key={c} className="rounded-md border border-line-2 bg-panel px-3 py-1.5 text-fg-2">
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal side delay={100}>
        <Image
          src="/img/export-dialog.png"
          alt="Export code dialog — React + Tailwind"
          width={1010}
          height={665}
          className="w-full rounded-xl border border-line shadow-[0_20px_70px_0_#00000055]"
        />
      </Reveal>
    </Section>
  );
}
