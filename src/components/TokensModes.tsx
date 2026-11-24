import Image from "next/image";
import { Eyebrow, Reveal, Section } from "./ui";

export function TokensModes() {
  return (
    <Section className="grid items-center gap-10 md:grid-cols-[7fr_5fr] md:gap-14">
      <Reveal side className="order-2 md:order-1">
        <Image
          src="/img/tokens-mockup.png"
          alt="Theme tokens panel and DTCG export"
          width={930}
          height={740}
          className="w-full rounded-xl border border-line"
        />
      </Reveal>
      <div className="order-1 md:order-2">
        <Reveal><Eyebrow>tokens · modes</Eyebrow></Reveal>
        <Reveal delay={70}>
          <h2 className="mt-5 text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">
            one token.
            <br />
            every mode.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-fg-2 md:text-[18px]">
            color, type, radius and spacing as typed tokens. flip a board to dark and every bound layer follows. export
            it as w3c dtcg json.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-7 flex gap-2 font-mono text-xs">
            {["light", "dark", "high contrast"].map((m) => (
              <span key={m} className="rounded-md border border-line-2 bg-panel px-3 py-1.5 text-fg-2">
                {m}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
