"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Mark } from "./Mark";
import { DOWNLOAD_URL, GITHUB_URL, Icon, Pill, Reveal, Section, TwoTone } from "./ui";

/* ---------- The details: grid bergaris rambut 3×2 ---------- */

const DETAILS: { icon: Parameters<typeof Icon>[0]["name"]; title: string; body: string }[] = [
  { icon: "fileCode", title: "Real files you can diff", body: ".pen is typed JSON with CSS semantics. Commit it, review it, merge it like code." },
  { icon: "scanEye", title: "Real pixels, not guesses", body: "lakard renders every board with Playwright, so the agent checks what you will actually see." },
  { icon: "history", title: "Nothing is final", body: "Every change, yours or the agent’s, lands in History — one click from restored." },
  { icon: "swatch", title: "Tokens & DTCG", body: "Variables with light and dark modes. Import and export design tokens in the DTCG format." },
  { icon: "listChecks", title: "Checks before you look", body: "layout_check flags layout and legibility problems before the agent says done." },
  { icon: "terminal", title: "MCP over stdio", body: "npx lakar mcp. No plugin, no browser extension, no API key to paste." },
];

export function Details() {
  return (
    <Section className="xl:pt-[180px]">
      <Reveal>
        <h2 className="grad-head max-w-[900px] text-[38px] font-semibold md:text-[52px] xl:text-[60px]">
          And the details,<br className="hidden md:block" /> done properly
        </h2>
      </Reveal>
      <Reveal delay={80} className="mt-14">
        <div className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {DETAILS.map((d) => (
            <div key={d.title} className="flex flex-col gap-3.5 bg-page px-8 pt-[34px] pb-[38px]">
              <Icon name={d.icon} className="size-5 text-fg" />
              <h3 className="text-[17px] font-semibold">{d.title}</h3>
              <p className="text-[15px] leading-[1.6] text-fg-2">{d.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- Local-first ---------- */

export function LocalFirst() {
  return (
    <Section id="local-first" className="xl:pt-[180px]">
      <div className="grid gap-10 xl:grid-cols-[540px_1fr] xl:gap-20">
        <Reveal className="flex flex-col gap-[22px]">
          <p className="flex items-center gap-2 font-mono text-[13px] text-fg-3">
            <Icon name="lock" className="size-3.5" /> Local-first
          </p>
          <h2 className="grad-head text-[38px] font-semibold md:text-[52px] xl:text-[60px]">
            Your designs stay<br className="hidden md:block" /> on your machine
          </h2>
        </Reveal>
        <Reveal delay={80} className="flex flex-col gap-8">
          <TwoTone lead="Files, rendering and the viewer all run on this computer.">
            lakard listens on 127.0.0.1 only and serves the viewer from the same loopback port. You sign in once at first launch; your work only goes
            online when you share a link or open a room.
          </TwoTone>
          <hr className="border-line" />
          <dl className="grid gap-8 sm:grid-cols-3">
            {[
              ["127.0.0.1", "the only address lakard listens on"],
              [".pen", "plain JSON on your disk, in your repo"],
              ["Opt-in", "share links and live rooms, per design"],
            ].map(([v, l]) => (
              <div key={v} className="flex flex-col gap-1.5">
                <dt className="text-[34px] font-semibold tracking-[-1.2px]">{v}</dt>
                <dd className="text-[14px] leading-[1.5] text-fg-3">{l}</dd>
              </div>
            ))}
          </dl>
          <a href="#faq" className="flex w-fit items-center gap-2 text-[15px] font-medium hover:underline">
            How Lakar stays local <Icon name="arrowRight" className="size-[15px]" />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- FAQ: akordeon +/− ---------- */

const QA: { q: string; a: ReactNode }[] = [
  {
    q: "What does Lakar actually do?",
    a: "It gives your coding agent a real design canvas. Claude Code, Codex or any MCP client draws boards, tokens and components through Lakar’s MCP tools, and you watch, comment and edit in the viewer.",
  },
  {
    q: "Do I need an account?",
    a: (
      <>
        Yes — you sign in once when the app first opens, with Google, GitHub or an email link. It powers share links and live rooms; your .pen files
        stay on your disk either way. Self-hosting lakard with <code className="font-mono text-[14px]">LAKAR_CLOUD_URL=off</code> skips sign-in entirely.
      </>
    ),
  },
  {
    q: "Which coding agents does it work with?",
    a: (
      <>
        Anything that speaks MCP: Claude Code, Codex and ACP clients. Add <code className="font-mono text-[14px]">npx lakar mcp</code> as an MCP server and
        the tools show up.
      </>
    ),
  },
  { q: "Does it work offline?", a: "After the first sign-in, yes. Files, rendering and the viewer all run on 127.0.0.1; only share links and live rooms go online." },
  {
    q: "What can the agent actually do?",
    a: "Draw and restructure boards, edit tokens and components, read and answer comments, export code, and check its own work against the real render with layout_check.",
  },
  {
    q: "Can I send a design to someone who doesn’t use Lakar?",
    a: "Yes. A snapshot link opens in any browser and viewers never need an account. Or export the board as React and hand over the code.",
  },
  {
    q: "Which platforms does it run on?",
    a: "Desktop apps for macOS, Windows and Linux. Or run lakard and open the viewer in any browser at 127.0.0.1:7466/app/.",
  },
  {
    q: "Is it open source?",
    a: "The desktop app, the lakard daemon and the MCP server are MIT-licensed on GitHub. Lakar Cloud, which runs share links and rooms, is a separate hosted service.",
  },
];

export function Faq() {
  // Desain menampilkan dua pertanyaan pertama terbuka.
  const [open, setOpen] = useState<Set<number>>(() => new Set([0, 1]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <Section id="faq" className="pb-24 md:pb-32 xl:pt-[180px] xl:pb-40">
      <div className="grid gap-10 xl:grid-cols-[480px_1fr] xl:gap-20">
        <Reveal className="flex flex-col gap-[18px]">
          <h2 className="grad-head text-[38px] font-semibold md:text-[52px] xl:text-[60px]">Questions</h2>
          <p className="text-[15px] text-fg-2">
            Anything else? Ask on{" "}
            <a href={`${GITHUB_URL}/discussions`} className="text-fg underline underline-offset-2">GitHub Discussions</a>.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="border-b border-line">
            {QA.map((item, i) => {
              const isOpen = open.has(i);
              return (
                <div key={item.q} className="border-t border-line">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-0.5 py-6 text-left text-[17px] font-medium"
                  >
                    {item.q}
                    <Icon name={isOpen ? "minus" : "plus"} className="size-[18px] shrink-0 text-fg-3" />
                  </button>
                  <div id={`faq-${i}`} className="acc" data-open={isOpen ? "" : undefined}>
                    <div>
                      <p className="max-w-[620px] px-0.5 pb-6 text-[16px] leading-[1.6] text-fg-2">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- CTA penutup ---------- */

export function Closing() {
  return (
    <section id="download" className="relative overflow-hidden border-t border-line">
      <Image src="/img/waves.svg" alt="" fill sizes="100vw" className="pointer-events-none object-cover" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0a0a 0%, #0a0a0a00 25%, #0a0a0a00 75%, #0a0a0a 100%), radial-gradient(37.5% 40% at 50% 45%, #0a0a0af2, #0a0a0ab3 50%, #0a0a0a00 100%)",
        }}
      />
      <Reveal className="relative mx-auto flex max-w-[900px] flex-col items-center gap-[26px] px-5 pt-28 pb-28 text-center md:pt-[150px] md:pb-[150px]">
        <Image src="/img/app-icon.png" alt="Lakar app icon" width={104} height={104} className="drop-shadow-[0_12px_40px_#2563eb59]" />
        <h2 className="grad-head text-[40px] font-semibold md:text-[60px] xl:text-[72px]">Next time, just prompt it</h2>
        <p className="text-[17px] text-fg-2 md:text-[18px]">Free for macOS, Windows and Linux.</p>
        <Pill href={DOWNLOAD_URL} primary icon={<Icon name="download" />}>Download for Mac</Pill>
        <p className="font-mono text-[13px] text-fg-3">or run&nbsp;&nbsp;npx lakar mcp</p>
      </Reveal>
    </section>
  );
}

/* ---------- Footer ---------- */

const COLS: { title: string; links: [string, string][] }[] = [
  { title: "Lakar", links: [["How it works", "#how-it-works"], ["Local-first", "#local-first"], ["FAQ", "#faq"], ["Download", DOWNLOAD_URL]] },
  { title: "Developers", links: [["GitHub", GITHUB_URL], ["Docs", `${GITHUB_URL}#readme`], ["MCP setup", "#faq"], ["Changelog", `${GITHUB_URL}/releases`]] },
  { title: "More", links: [["Releases on GitHub", `${GITHUB_URL}/releases`], ["Privacy", "#local-first"], ["Terms", `${GITHUB_URL}/blob/main/LICENSE`]] },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-14 px-5 pt-16 pb-10 md:px-10">
        <div className="flex flex-col gap-12 xl:flex-row">
          <div className="flex flex-col gap-[18px]">
            <a href="#top" className="flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.27px]">
              <Mark className="h-[22px] w-auto" /> Lakar
            </a>
            <p className="text-[14px] leading-[1.55] text-fg-2">
              The design canvas your coding
              <br /> agents drive.
            </p>
          </div>
          <span className="flex-1" />
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:gap-0">
            {COLS.map((c) => (
              <div key={c.title} className="flex flex-col gap-3.5 xl:w-[200px]">
                <p className="text-[14px] font-semibold">{c.title}</p>
                {c.links.map(([l, h]) => (
                  <a key={l} href={h} className="text-[14px] text-fg-2 transition-colors hover:text-fg">{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-7 text-[13px] text-fg-3">
          <span>© 2026 Lakar</span>
          <span>Made for coding agents</span>
        </div>
      </div>
    </footer>
  );
}
