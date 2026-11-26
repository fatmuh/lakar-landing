import Image from "next/image";
import { Mark } from "./Mark";
import { DownloadButton, DownloadMeta } from "./Download";
import { GITHUB_URL, Icon, NavShell, Pill } from "./ui";

/** Star ditampilkan mulai 10 — di bawah itu angka kecil terlihat seperti kekurangan, bukan bukti sosial. */
export function Nav({ stars }: { stars: number | null }) {
  return (
    <NavShell>
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-7 px-5 md:px-10" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.27px]">
          <Mark className="h-[22px] w-auto" />
          Lakar
        </a>
        <span className="flex-1" />
        <div className="hidden items-center gap-7 text-[14px] text-fg-2 md:flex">
          <a href="#how-it-works" className="transition-colors hover:text-fg">How it works</a>
          <a href="#cloud" className="transition-colors hover:text-fg">Lakar Cloud</a>
          <a href="#faq" className="transition-colors hover:text-fg">FAQ</a>
          <a href={GITHUB_URL} className="flex items-center gap-1.5 transition-colors hover:text-fg">
            GitHub
            {stars !== null && stars >= 10 ? (
              <span className="flex items-center gap-1 text-fg-3">
                <Icon name="star" className="size-3" />
                {Intl.NumberFormat("en", { notation: "compact" }).format(stars)}
              </span>
            ) : null}
          </a>
        </div>
        <DownloadButton short size="sm" />
      </nav>
    </NavShell>
  );
}

const HEADLINE = "Prompt it. Watch it draw.".split(" ");

export function Hero() {
  // Muat halaman: kata judul naik satu per satu (70 ms), lalu salinan, tombol, dan baris meta (80 ms).
  const after = HEADLINE.length * 70 + 200;
  return (
    <div id="top">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-[22px] px-5 pt-20 text-center md:px-10 md:pt-24 xl:pt-[110px]">
        <h1 className="text-[48px] leading-[1.06] font-medium tracking-[-0.045em] md:text-[84px] xl:text-[112px]" aria-label="Prompt it. Watch it draw.">
          {HEADLINE.map((w, i) => (
            <span key={i} aria-hidden>
              {i > 0 ? " " : null}
              {/* Gradien per kata: background-clip:text di <h1> tidak terlukis lewat anak yang dianimasikan. */}
              <span className="word grad-head load-in" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                {w}
              </span>
            </span>
          ))}
        </h1>
        <p className="load-in mx-auto max-w-[640px] text-[17px] leading-[1.6] text-fg-2 md:text-[19px]" style={{ "--d": `${after}ms`, "--rise": "16px", "--dur": "600ms" } as React.CSSProperties}>
          Ask your coding agent for a screen. Lakar gives it a real design canvas — boards, tokens, components — and shows you every change live, right
          beside your terminal.
        </p>
        <div className="load-in flex flex-col items-center gap-3 pt-3.5 sm:flex-row" style={{ "--d": `${after + 80}ms`, "--rise": "16px", "--dur": "600ms" } as React.CSSProperties}>
          <DownloadButton />
          <Pill href="#how-it-works" icon={<Icon name="play" className="size-3.5" />}>Watch it draw</Pill>
        </div>
        <div className="load-in relative z-20" style={{ "--d": `${after + 160}ms`, "--rise": "16px", "--dur": "600ms" } as React.CSSProperties}>
          <DownloadMeta />
        </div>
      </div>

      {/* Scene hero: viewer di atas cahaya biru brand; saat di-scroll viewer melayang naik dan cahaya menguat. */}
      <div className="relative mt-10 overflow-hidden bg-page px-4 pt-[56px] pb-[72px] md:pt-[80px] xl:pt-[90px] xl:pb-[134px]">
        <div className="scene-hero hero-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="hero-drift relative mx-auto w-full max-w-[1130px]">
          <div className="viewer-in">
            <Image
              src="/img/hero-viewer.png"
              alt="The Lakar viewer: layers, a canvas with Claude Code's cursor on a board, and the live activity feed"
              width={2261}
              height={1414}
              sizes="(min-width: 1280px) 1130px, 100vw"
              className="shadow-window w-full rounded-[14px]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
