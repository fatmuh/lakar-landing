import Image from "next/image";
import type { ReactNode } from "react";
import { CountUp, Icon, Reveal, Section, SectionHead, SectionLabel, TwoTone } from "./ui";

/* ---------- kepingan kecil yang dipakai beberapa section ---------- */

type Tok = [string, string?];

/** Blok kode mono kecil; tiap baris = deret token [teks, kelas warna]. */
function Code({ lines, className = "", typed = false }: { lines: Tok[][]; className?: string; typed?: boolean }) {
  return (
    <pre className={`overflow-x-auto rounded-[10px] border border-line-2 bg-[#0b0b0b] px-[18px] py-4 font-mono text-[12px] leading-[1.75] ${className}`}>
      {lines.map((l, i) => (
        <div key={i} className={typed ? "code-line" : undefined} style={typed ? ({ "--i": i } as React.CSSProperties) : undefined}>
          {l.length === 0 ? " " : l.map(([t, c], j) => <span key={j} className={c ?? "text-fg-2"}>{t}</span>)}
        </div>
      ))}
    </pre>
  );
}

function FeatureCard({ title, children, art, delay = 0 }: { title: string; children: ReactNode; art: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full" rise={24}>
    <div className="card-lift flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-card">
      <div className="flex h-[230px] items-center justify-center overflow-hidden border-b border-line bg-card-2 px-6">{art}</div>
      <div className="flex flex-col gap-2.5 px-6 pt-[22px] pb-[26px]">
        <h3 className="text-[17px] font-semibold">{title}</h3>
        <p className="text-[15px] leading-[1.55] text-fg-2">{children}</p>
      </div>
    </div>
    </Reveal>
  );
}

function Count({ sign, n, label, tone }: { sign: string; n: string; label: string; tone: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[10px] border border-line-2 bg-[#151515] px-3 py-2.5">
      <span className={`flex size-[22px] items-center justify-center rounded-md font-mono text-[12px] ${tone}`}>{sign}</span>
      <span className="text-[15px] font-semibold">{n}</span>
      <span className="text-[13px] text-fg-3">{label}</span>
    </div>
  );
}

const K = "text-code-k", S = "text-code-s", N = "text-code-n", C = "text-code-c", P = "text-fg-2", T = "text-code-t";

/* ---------- 01 · Prompt it ---------- */

export function PromptIt() {
  return (
    <Section id="how-it-works">
      <SectionHead num="01" name="Prompt it" title={<>Your agent finally<br className="hidden md:block" /> has a canvas</>} lead="Ask for a screen like you’d ask for a function.">
        Claude Code calls Lakar’s MCP tools and draws on a typed document — boards, auto layout, tokens, components — instead of guessing at HTML.
      </SectionHead>

      <div className="mt-16 flex flex-col gap-5">
        <div className="scroll-scale scene-sky relative overflow-hidden rounded-[18px] border border-line px-[5%] pt-[2.8%] pb-16 md:pb-[2%]">
          <Image
            src="/img/dryrun-review.png"
            alt="Lakar's dry-run review: 12 added, 5 updated, 2 deleted, waiting to be applied"
            width={1921}
            height={1201}
            sizes="(min-width: 1280px) 960px, 90vw"
            className="shadow-window mx-auto w-full max-w-[960px] rounded-xl"
          />
          <Reveal delay={200} rise={24} className="absolute bottom-3 left-1/2 flex h-[54px] w-[min(620px,92%)] -translate-x-1/2 items-center gap-3.5 rounded-[14px] border border-line-2 bg-[#141414ee] pr-2.5 pl-[18px] shadow-[0_16px_40px_#00000099] md:bottom-[30px]">
            <span className="size-2 shrink-0 rounded-full bg-agent" />
            <span className="font-mono text-[13px] text-fg">lakar · execute</span>
            <span className="hidden font-mono text-[13px] text-fg-3 sm:inline">dry-run · 23 ops</span>
            <span className="flex-1" />
            <CountUp to={12} prefix="+" className="font-mono text-[13px] text-success" />
            <CountUp to={5} prefix="~" className="font-mono text-[13px] text-warning" />
            <CountUp to={2} prefix="−" className="font-mono text-[13px] text-danger" />
            <span className="flex items-center gap-1.5 rounded-lg bg-cta px-2.5 py-1.5 text-[13px] font-medium text-cta-fg">
              Apply <Icon name="enter" className="size-[13px] text-[#52525b]" />
            </span>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            delay={0}
            title="One call, a whole board"
            art={
              <Code
                lines={[
                  [["b", "text-fg"], [" = ", P], ["Insert", C], ["(document, {", P]],
                  [["  type", K], [": ", P], ['"frame"', S], [", name: ", P], ['"Pricing"', S]],
                  [["  layout", K], [": ", P], ['"vertical"', S], [", gap: ", P], ["48", N]],
                  [["})", P]],
                  [["for", K], [" (t of tiers) ", P], ["Insert", C], ["(b, card(t))", P]],
                ]}
              />
            }
          >
            Agents write small scripts against the document: insert, update, move, delete.
          </FeatureCard>
          <FeatureCard
            delay={90}
            title="Dry-run first"
            art={
              <div className="flex flex-col gap-2">
                <Count sign="+" n="12" label="added" tone="bg-[#14532d] text-success" />
                <Count sign="~" n="5" label="updated" tone="bg-[#422006] text-warning" />
                <Count sign="−" n="2" label="deleted" tone="bg-[#450a0a] text-danger" />
              </div>
            }
          >
            Every change lands as a list you review before it touches the file.
          </FeatureCard>
          <FeatureCard
            delay={180}
            title="Zero config"
            art={
              <Code
                lines={[
                  [["{ ", P], ['"mcpServers"', K], [": {", P]],
                  [['  "lakar"', S], [": {", P]],
                  [['    "command"', K], [": ", P], ['"npx"', S], [",", P]],
                  [['    "args"', K], [": [", P], ['"lakar"', S], [", ", P], ['"mcp"', S], ["]", P]],
                  [["} }", P]],
                ]}
              />
            }
          >
            One MCP server entry. Claude Code, Codex and any MCP client see the tools.
          </FeatureCard>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 02 · See it live ---------- */

function CaptionCard({ src, w, h, alt, lead, children, delay = 0 }: { src: string; w: number; h: number; alt: string; lead: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} rise={24} className="h-full">
    <div className="card-lift flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-card">
      <div className="border-b border-line bg-card-2">
        <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 1280px) 690px, 100vw" className="h-auto w-full" />
      </div>
      <p className="px-6 pt-5 pb-[22px] text-[15px] leading-[1.55] text-fg-2">
        <span className="block font-medium text-fg">{lead}</span>
        {children}
      </p>
    </div>
    </Reveal>
  );
}

export function SeeItLive() {
  return (
    <Section>
      <SectionHead num="02" name="See it live" title={<>Watch every change<br className="hidden md:block" /> as it lands</>} lead="The viewer updates while the agent works.">
        Its cursor on the board, every tool call in the feed and what the checks found — no screenshots, no “can you show me?”.
      </SectionHead>
      <div className="mt-16 grid gap-5 xl:grid-cols-[690fr_490fr]">
        <CaptionCard src="/img/presence.png" w={1380} h={800} alt="Claude Code's cursor and label on a card it is adding to the feature grid" lead="Presence on the board.">
          The agent’s cursor and the layer it is editing, in its own color.
        </CaptionCard>
        <CaptionCard src="/img/activity.png" w={980} h={800} alt="The activity feed: a live Claude Code session and its recent tool calls" lead="Every call in the feed." delay={90}>
          What ran, how long, and what the checks found.
        </CaptionCard>
      </div>
    </Section>
  );
}

/* ---------- 03 · Refine it ---------- */

function Msg({ who, initial, tone, note, children, delay = 0 }: { who: string; initial: string; tone: string; note?: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} rise={12} className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <span className={`flex size-6 items-center justify-center rounded-full text-[11px] font-semibold text-white ${tone}`}>{initial}</span>
        <span className="text-[14px] font-semibold">{who}</span>
        {note ? <span className="font-mono text-[11px] text-fg-3">{note}</span> : null}
      </div>
      <p className="text-[16px] leading-[1.6]">{children}</p>
    </Reveal>
  );
}

function Diff({ layer, prop, before, after, delay = 0 }: { layer: string; prop: string; before: string; after: string; delay?: number }) {
  return (
    <Reveal delay={delay} rise={12} className="flex flex-wrap items-center gap-4 border-b border-line py-3.5">
      <div className="flex w-[200px] flex-col gap-1">
        <span className="text-[14px] font-medium">{layer}</span>
        <span className="font-mono text-[12px] text-fg-3">{prop}</span>
      </div>
      <span className="flex items-center gap-2.5 rounded-lg border border-line-2 bg-[#161616] px-2.5 py-[5px] font-mono text-[13px]">
        <span className="diff-before text-fg-3">{before}</span>
        <Icon name="arrowRight" className="size-[13px] text-fg-3" />
        <span className="diff-after">{after}</span>
      </span>
    </Reveal>
  );
}

function Panel({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[400px] flex-col gap-[22px] rounded-2xl border border-line-2 bg-[#121212] px-6 py-[26px] md:px-8">
      <div className="flex items-center justify-between gap-4 text-[13px]">
        <span className="font-semibold text-fg-2">{title}</span>
        <span className="text-fg-3">{meta}</span>
      </div>
      {children}
    </div>
  );
}

const TABS: { icon: Parameters<typeof Icon>[0]["name"]; label: string }[] = [
  { icon: "message", label: "Comments" },
  { icon: "swatch", label: "Tokens & modes" },
  { icon: "component", label: "Components" },
  { icon: "sliders", label: "Inspector" },
  { icon: "history", label: "History" },
];

export function RefineIt() {
  return (
    <Section>
      <SectionHead num="03" name="Refine it" title={<>“Warmer, and smaller<br className="hidden md:block" /> on mobile.” Done.</>} lead="Pin a comment on the layer that’s off.">
        The agent reads the thread, answers in it and edits the document. Every change is a real property you can see, keep or undo.
      </SectionHead>

      <Reveal className="mt-16">
        <div className="grid grid-cols-[minmax(0,1fr)] items-stretch gap-2 xl:grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)]">
          <Panel title="On the canvas" meta="3 messages · Hero — Mobile">
            <Msg who="Maya" initial="M" tone="bg-maya" note="pinned to Visual" delay={0}>This gradient feels cold, and the headline is too big on mobile.</Msg>
            <Msg who="Claude Code" initial="C" tone="bg-agent" delay={150}>Warming the gradient stops and dropping the mobile headline to 40. I’ll run layout_check after.</Msg>
            <Msg who="Maya" initial="M" tone="bg-maya" delay={300}>Perfect. Tighten the tracking a little too.</Msg>
          </Panel>
          <div className="hidden items-center justify-center text-fg-3 xl:flex">
            <Icon name="arrowRight" className="size-[18px]" />
          </div>
          <Panel title="In the document" meta="4 changes · rev 43">
            <div>
              <Diff layer="Visual" prop="fill · stop 1" before="#FF6A3D" after="#FF8552" delay={450} />
              <Diff layer="Headline — Mobile" prop="fontSize" before="48" after="40" delay={600} />
              <Diff layer="Headline — Mobile" prop="letterSpacing" before="−1" after="−1.5" delay={750} />
              <Diff layer="Thread" prop="status" before="open" after="resolved" delay={900} />
            </div>
          </Panel>
        </div>
        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[13px] text-fg-3">
          <span><span className="mr-2.5 font-mono text-[12px] text-fg-2">pinned</span>a comment on a layer, not on a screenshot</span>
          <span><span className="mr-2.5 font-mono text-[12px] text-fg-2">rev 43</span>every edit lands in History, one click from restored</span>
        </p>
      </Reveal>

      <Reveal className="mt-14 flex flex-col gap-7 pt-14">
        <div className="grid items-end gap-6 xl:grid-cols-[560px_1fr] xl:gap-20">
          <h3 className="grad-head text-[30px] font-semibold md:text-[36px]">Or change it yourself</h3>
          <p className="text-[16px] leading-[1.6] text-fg-2">
            Layers, inspector, tokens and components work on the same document the agent writes, so nothing gets out of sync.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {TABS.map((t, i) => (
            <span
              key={t.label}
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] font-medium ${
                i === 0 ? "border-[#3a3a3a] bg-[#1a1a1a] text-fg" : "border-line-2 text-fg-2"
              }`}
            >
              <Icon name={t.icon} className={`size-[15px] ${i === 0 ? "text-fg" : "text-fg-3"}`} />
              {t.label}
            </span>
          ))}
        </div>
        <div className="scroll-scale scene-dusk overflow-hidden rounded-[18px] border border-line px-[8.3%] pt-[4.2%] pb-[7%]">
          <Image
            src="/img/comments-pins.png"
            alt="The Lakar viewer with a comment pinned on the hero, the agent's reply thread and the design inspector"
            width={2001}
            height={1251}
            sizes="(min-width: 1280px) 1000px, 90vw"
            className="shadow-window mx-auto w-full max-w-[1000px] rounded-xl"
          />
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------- 04 · Ship it ---------- */

function Check({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <Icon name="check" className="mt-1 size-4 shrink-0 text-fg-2" />
      <p className="text-[16px] leading-[1.55] text-fg-2">
        <span className="block font-medium text-fg">{lead}</span>
        {children}
      </p>
    </div>
  );
}

export function ShipIt() {
  return (
    <Section>
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 xl:grid-cols-[560px_minmax(0,1fr)] xl:gap-10">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel num="04">Ship it</SectionLabel>
          <h2 className="grad-head text-[38px] font-semibold md:text-[52px] xl:text-[60px]">
            From board to<br className="hidden md:block" /> React in one export
          </h2>
          <TwoTone lead="Export any board as React.">Tailwind v4 or CSS modules, components with typed props, tokens as CSS variables.</TwoTone>
          <hr className="border-line" />
          <Check lead="Same output, both ways.">You and the agent’s export_code tool produce identical files.</Check>
          <Check lead="Tokens travel with it.">tokens.css and theme.css ship with every export, modes included.</Check>
          <Check lead="Or just send a link.">Snapshot links open in any browser; viewers never need an account.</Check>
        </Reveal>

        <Reveal delay={100} className="xl:justify-self-end">
          <div className="scene-dusk relative w-full overflow-hidden rounded-[18px] border border-line px-5 pt-14 pb-[120px] md:px-[50px] xl:w-[600px]">
            <div className="shadow-window overflow-hidden rounded-[14px] border border-[#2f2f2f] bg-[#0f0f0f]">
              <div className="flex h-10 items-center border-b border-line-2 px-3.5">
                <span className="flex gap-[7px]">
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="size-[11px] rounded-full" style={{ background: c }} />)}
                </span>
                <span className="flex-1 text-center text-[13px] font-medium text-fg-2">Export code — Hero / Desktop</span>
                <span className="w-[47px]" />
              </div>
              <div className="flex gap-1 px-3.5 pt-3">
                <span className="flex items-center gap-1.5 rounded-[7px] bg-[#1c1c1c] px-2.5 py-1.5 font-mono text-[12px]"><Icon name="fileCode" className="size-[13px]" />HeroDesktop.tsx</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[12px] text-fg-3"><Icon name="file" className="size-[13px]" />tokens.css</span>
                <span className="hidden items-center gap-1.5 px-2.5 py-1.5 font-mono text-[12px] text-fg-3 sm:flex"><Icon name="file" className="size-[13px]" />theme.css</span>
              </div>
              <div className="p-3.5">
                <Code
                  typed
                  className="text-[12.5px]"
                  lines={[
                    [["export function", K], [" HeroDesktop", C], ["() {", P]],
                    [["  return", K], [" (", P]],
                    [["    <section", T], [" className", K], ['="flex flex-col gap-6"', S], [">", T]],
                    [["      <Nav", C], [" brand", K], ['="Halcyon"', S], [" />", C]],
                    [["      <h1", T], [" className", K], ['="text-display"', S], [">", T]],
                    [["        Make bold work, faster than ever.", "text-fg"]],
                    [["      </h1>", T]],
                    [["      <Card", C], [" title", K], ['="Spatial design"', S], [" tone", K], ['="accent"', S], [" />", C]],
                    [["    </section>", T]],
                    [["  )", P]],
                    [["}", P]],
                  ]}
                />
              </div>
            </div>
            <div className="share-pop absolute bottom-[50px] left-1/2 flex h-[50px] max-w-[92%] -translate-x-1/2 items-center gap-3 rounded-full border border-[#333] bg-[#141414e6] pr-[18px] pl-2.5 whitespace-nowrap shadow-[0_14px_36px_#00000099]">
              <span className="flex size-[30px] items-center justify-center rounded-full bg-[#262626]"><Icon name="link" className="size-3.5" /></span>
              <span className="text-[15px] font-medium">Copy share link</span>
              <span className="hidden font-mono text-[12px] text-fg-3 sm:inline">app.lakar.dev/s/Cw7Q2k</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
