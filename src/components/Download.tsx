"use client";

// Tombol download per OS + toggle channel + menu "Other platforms"
// (desain: board "Download — states" di lakar-meta/design/lakar-landing.pen).

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { NIGHTLY_RELEASES_URL, RELEASES_URL, type Asset, type Channel, type Os, type Release } from "@/lib/release";
import { Icon } from "./ui";

const OS_NAME: Record<Os, string> = { mac: "Mac", windows: "Windows", linux: "Linux" };
const PRIMARY: Record<Os, Asset["id"]> = { mac: "mac-arm", windows: "win-exe", linux: "linux-appimage" };
const STORAGE_KEY = "lakar-download-channel";

/** OS dari browser. Ponsel/tablet dan sistem lain → null (tombol tetap "Download for Mac"). */
function detectOs(): Os | null {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string; mobile?: boolean } };
  const ua = nav.userAgent.toLowerCase();
  if (nav.userAgentData?.mobile || /iphone|ipad|ipod|android/.test(ua)) return null;
  const platform = (nav.userAgentData?.platform || nav.platform || "").toLowerCase();
  if (platform.includes("mac") || ua.includes("mac os x")) return "mac";
  if (platform.includes("win") || ua.includes("windows")) return "windows";
  if (platform.includes("linux") || ua.includes("linux") || ua.includes("x11")) return "linux";
  return null;
}

type Ctx = { stable: Release | null; nightly: Release | null; channel: Channel; setChannel: (c: Channel) => void; os: Os | null };
const DownloadCtx = createContext<Ctx | null>(null);

export function DownloadProvider({ stable, nightly, children }: { stable: Release | null; nightly: Release | null; children: ReactNode }) {
  const [channel, setChannelState] = useState<Channel>("stable");
  const [os, setOs] = useState<Os | null>(null);
  useEffect(() => {
    setOs(detectOs());
    try {
      if (localStorage.getItem(STORAGE_KEY) === "nightly" && nightly) setChannelState("nightly");
    } catch {
      /* penyimpanan diblokir: tetap Stable */
    }
  }, [nightly]);
  const setChannel = (c: Channel) => {
    setChannelState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* abaikan */
    }
  };
  return <DownloadCtx.Provider value={{ stable, nightly, channel, setChannel, os }}>{children}</DownloadCtx.Provider>;
}

function useDownload() {
  const ctx = useContext(DownloadCtx);
  if (!ctx) throw new Error("DownloadProvider missing");
  const release = ctx.channel === "nightly" ? ctx.nightly : ctx.stable;
  const fallback = ctx.channel === "nightly" ? NIGHTLY_RELEASES_URL : `${RELEASES_URL}/latest`;
  const primary = release?.assets.find((a) => a.id === PRIMARY[ctx.os ?? "mac"]);
  return { ...ctx, release, href: primary?.url ?? fallback, fallback };
}

/** Pill download: label mengikuti OS ("Download for Windows"), href ke installer channel aktif. */
export function DownloadButton({ short = false, size = "md" }: { short?: boolean; size?: "sm" | "md" }) {
  const { os, href, release } = useDownload();
  const label = short ? "Download" : release ? `Download for ${OS_NAME[os ?? "mac"]}` : "Download";
  const sz = size === "sm" ? "h-[34px] px-4 text-[14px] gap-2" : "h-12 px-6 text-[16px] gap-2.5";
  return (
    <a href={href} className={`inline-flex shrink-0 items-center justify-center rounded-full bg-cta font-medium text-cta-fg transition-colors hover:bg-white ${sz}`}>
      <Icon name="download" className={size === "sm" ? "size-3.5" : "size-4"} />
      {label}
    </a>
  );
}

function ChannelToggle() {
  const { channel, setChannel } = useDownload();
  return (
    <div role="radiogroup" aria-label="Release channel" className="flex gap-0.5 rounded-full border border-line-2 bg-chip p-[3px]">
      {(["stable", "nightly"] as const).map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={channel === c}
          onClick={() => setChannel(c)}
          className={`rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors ${channel === c ? "bg-[#262626] text-fg" : "text-fg-3 hover:text-fg-2"}`}
        >
          {c === "stable" ? "Stable" : "Nightly"}
        </button>
      ))}
    </div>
  );
}

function MenuRow({ asset, mine }: { asset: Asset; mine: boolean }) {
  return (
    <a
      role="menuitem"
      href={asset.url}
      className={`flex h-9 items-center gap-2 rounded-lg px-3 text-[14px] transition-colors hover:bg-[#1f1f1f] ${mine ? "bg-[#1f1f1f] font-medium text-fg" : "text-fg-2"}`}
    >
      {asset.label}
      {mine ? <span className="rounded-full bg-[#2563eb33] px-2 py-0.5 text-[11px] font-medium text-[#7fb2ff]">Your system</span> : null}
      <span className="flex-1" />
      <span className="font-mono text-[12px] text-fg-3">{asset.ext}</span>
    </a>
  );
}

function OtherPlatforms() {
  const { release, channel, os, fallback } = useDownload();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const groups: [Os, string][] = [["mac", "macOS"], ["windows", "Windows"], ["linux", "Linux"]];
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-[13px] font-medium text-fg-2 transition-colors hover:text-fg"
      >
        Other platforms <Icon name="chevronDown" className={`size-[13px] text-fg-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute top-full left-1/2 z-30 mt-3 flex w-[340px] max-w-[calc(100vw-40px)] -translate-x-1/2 flex-col gap-0.5 rounded-[14px] border border-line-2 bg-[#141414] p-1.5 text-left shadow-[0_20px_50px_#000000a6]"
        >
          {release ? (
            <>
              <div className="flex items-center px-3 py-2.5">
                <span className="text-[13px] font-semibold">Lakar v{release.version}</span>
                <span className="flex-1" />
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${channel === "nightly" ? "bg-[#fbbf2422] text-[#fbbf24]" : "bg-[#262626] text-fg-2"}`}>
                  {channel === "nightly" ? "Nightly" : "Stable"}
                </span>
              </div>
              {channel === "nightly" ? (
                <p className="flex items-center gap-2 rounded-lg bg-[#fbbf2414] px-3 py-2 text-[12px] text-fg-2">
                  <Icon name="triangleAlert" className="size-[13px] shrink-0 text-[#fbbf24]" /> Built every night from dev. It can break.
                </p>
              ) : null}
              {groups.map(([g, title]) => (
                <div key={g} className="flex flex-col">
                  <p className="px-3 pt-2 pb-1 font-mono text-[11px] text-fg-3">{title}</p>
                  {release.assets.filter((a) => a.os === g).map((a) => (
                    <MenuRow key={a.id} asset={a} mine={os === g && PRIMARY[g] === a.id} />
                  ))}
                </div>
              ))}
              <hr className="my-1 border-line" />
              <a role="menuitem" href={release.sums} className="flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] text-fg-2 hover:bg-[#1f1f1f]">
                <Icon name="fileCheck" className="size-3.5 text-fg-3" /> SHA256SUMS.txt
              </a>
            </>
          ) : null}
          <a role="menuitem" href={release ? release.page : fallback} className="flex h-9 items-center rounded-lg px-3 text-[13px] text-fg-2 hover:bg-[#1f1f1f]">
            {release ? "All releases on GitHub" : "See all downloads on GitHub"}
            <span className="flex-1" />
            <Icon name="arrowUpRight" className="size-3.5 text-fg-3" />
          </a>
        </div>
      ) : null}
    </div>
  );
}

/** Baris meta di bawah tombol: toggle channel, versi, platform, menu installer lain. */
export function DownloadMeta() {
  const { stable, nightly, release } = useDownload();
  const meta = ["Free", release ? `v${release.version}` : null, "macOS", "Windows", "Linux"].filter(Boolean).join("  ·  ");
  if (!stable && !nightly) {
    return <p className="font-mono text-[12px] whitespace-pre text-fg-3 md:text-[13px]">{meta}</p>;
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      <ChannelToggle />
      <p className="font-mono text-[12px] whitespace-pre text-fg-3 md:text-[13px]">{meta}</p>
      <OtherPlatforms />
    </div>
  );
}
