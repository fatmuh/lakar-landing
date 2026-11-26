import Image from "next/image";
import { Mark } from "./Mark";
import { DOWNLOAD_URL, Icon, Pill, Reveal } from "./ui";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-page/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-7 px-5 md:px-10" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.27px]">
          <Mark className="h-[22px] w-auto" />
          Lakar
        </a>
        <span className="flex-1" />
        <div className="hidden items-center gap-7 text-[14px] text-fg-2 md:flex">
          <a href="#how-it-works" className="transition-colors hover:text-fg">How it works</a>
          <a href="#local-first" className="transition-colors hover:text-fg">Local-first</a>
          <a href="#faq" className="transition-colors hover:text-fg">FAQ</a>
        </div>
        <Pill href={DOWNLOAD_URL} primary size="sm" icon={<Icon name="download" className="size-3.5" />}>
          Download
        </Pill>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <div id="top">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-[22px] px-5 pt-20 text-center md:px-10 md:pt-24 xl:pt-[110px]">
        <Reveal>
          <h1 className="grad-head text-[48px] font-medium md:text-[84px] xl:text-[112px]">
            Prompt it. Watch it draw.
          </h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto max-w-[640px] text-[17px] leading-[1.6] text-fg-2 md:text-[19px]">
            Ask your coding agent for a screen. Lakar gives it a real design canvas — boards, tokens, components — and shows you
            every change live, right beside your terminal.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="flex flex-col items-center gap-3 pt-3.5 sm:flex-row">
            <Pill href={DOWNLOAD_URL} primary icon={<Icon name="download" />}>Download for Mac</Pill>
            <Pill href="#how-it-works" icon={<Icon name="play" className="size-3.5" />}>Watch it draw</Pill>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-mono text-[12px] text-fg-3 md:text-[13px]">
            Free&nbsp;&nbsp;·&nbsp;&nbsp;macOS&nbsp;&nbsp;·&nbsp;&nbsp;Windows&nbsp;&nbsp;·&nbsp;&nbsp;Linux&nbsp;&nbsp;·&nbsp;&nbsp;npx lakar mcp
          </p>
        </Reveal>
      </div>

      {/* Scene hero: viewer + prompt bar di atas cahaya biru brand. */}
      <div className="scene-hero relative mt-10 overflow-hidden px-4 pt-[64px] pb-[72px] md:pt-[100px] xl:pt-[120px] xl:pb-[134px]">
        <Reveal delay={160} className="relative mx-auto w-full max-w-[1130px]">
          <Image
            src="/img/hero-viewer.png"
            alt="The Lakar viewer: layers, a canvas with Claude Code's cursor on a board, and the live activity feed"
            width={2261}
            height={1414}
            sizes="(min-width: 1280px) 1130px, 100vw"
            className="shadow-window w-full rounded-[14px]"
            priority
          />
          <div className="absolute top-0 left-1/2 flex h-[48px] w-[min(640px,92%)] -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl bg-[#fafafa] px-2.5 shadow-[0_18px_50px_#00000080] md:h-[60px] md:px-3">
            <span className="hidden size-9 shrink-0 items-center justify-center rounded-[9px] border border-[#e4e4e7] text-[#3f3f46] sm:flex">
              <Icon name="terminal" className="size-[17px]" />
            </span>
            <span className="min-w-0 flex-1 truncate text-left text-[14px] text-[#52525b] md:text-[15px]">Design a pricing page with three tiers</span>
            <span className="hidden items-center gap-2 rounded-lg border border-[#e4e4e7] px-2.5 py-1.5 text-[13px] font-medium text-[#18181b] md:flex">
              Claude Code <span className="font-mono text-[11px] text-[#a1a1aa]">⌘↵</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-[#e4e4e7] px-2.5 py-1.5 text-[13px] font-medium text-[#18181b]">
              Send <Icon name="enter" className="size-[13px] text-[#71717a]" />
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
