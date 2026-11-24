import Image from "next/image";
import { Eyebrow, Kbd, Reveal } from "./ui";

export function Hero() {
  return (
    <div id="top" className="mx-auto max-w-[1200px] px-5 pt-32 pb-16 text-center md:px-10 md:pt-40">
      <Reveal><Eyebrow center>design tool · for agents</Eyebrow></Reveal>
      <Reveal delay={70}>
        <h1 className="mt-6 text-[42px] leading-[1.05] font-medium tracking-tight md:text-[68px]">
          the canvas your agent can draw on.
        </h1>
      </Reveal>
      <Reveal delay={140}>
        <p className="mx-auto mt-6 max-w-[620px] text-[16px] leading-relaxed text-fg-2 md:text-[19px]">
          lakar is a real design tool your agent drives through code.
          <br className="hidden md:block" /> boards, tokens, components, comments. right beside your terminal.
        </p>
      </Reveal>
      <Reveal delay={210}>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            id="download"
            href="#download"
            className="rounded-xl bg-cta px-6 py-3 text-[15px] font-medium text-cta-fg transition-transform hover:scale-[1.03]"
          >
            download for mac
          </a>
          <code className="rounded-xl border border-line-2 bg-panel px-6 py-3 font-mono text-[15px] text-fg">
            npx lakar mcp<span className="caret" />
          </code>
        </div>
      </Reveal>
      <Reveal delay={280}>
        <p className="mt-5 hidden items-center justify-center gap-1.5 font-mono text-xs text-fg-3 md:flex">
          hold <Kbd>⌃</Kbd>
          <Kbd>⌥</Kbd> to watch claude draw this page
        </p>
        <p className="mt-5 font-mono text-xs text-fg-3 md:hidden">▸ tap to watch claude draw this page</p>
      </Reveal>
      <Reveal delay={200} className="mt-12">
        <div className="mx-auto max-w-[880px] rounded-2xl border border-line bg-panel p-2 shadow-[0_20px_80px_0_#00000066]">
          <Image
            src="/img/hero-viewer.png"
            alt="Lakar viewer — agent drawing on the canvas"
            width={850}
            height={540}
            className="w-full rounded-xl"
            priority
          />
        </div>
      </Reveal>
    </div>
  );
}
