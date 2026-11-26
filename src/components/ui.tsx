"use client";

import { useEffect, useRef, type ReactNode } from "react";

export const DOWNLOAD_URL = "https://github.com/fatmuh/lakar/releases/latest";
export const GITHUB_URL = "https://github.com/fatmuh/lakar";

/** Pembungkus reveal saat masuk viewport (IntersectionObserver). */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/** Wadah section: lebar isi 1200, padding atas besar seperti aloud. */
export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1280px] scroll-mt-20 px-5 pt-24 md:px-10 md:pt-32 xl:pt-40 ${className}`}>
      {children}
    </section>
  );
}

/** Label section: chip mono bernomor + nama ("[01] Prompt it"). */
export function SectionLabel({ num, children }: { num: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[15px] font-medium">
      <span className="rounded-[5px] border border-line-2 px-1.5 py-0.5 font-mono text-[12px] leading-none text-fg-2">{num}</span>
      {children}
    </p>
  );
}

/** Paragraf dua nada: kalimat pembuka putih, sisanya abu. */
export function TwoTone({ lead, children, className = "" }: { lead: string; children: ReactNode; className?: string }) {
  return (
    <p className={`max-w-[760px] text-[17px] leading-[1.6] text-fg-2 md:text-[19px] ${className}`}>
      <span className="font-medium text-fg">{lead}</span> {children}
    </p>
  );
}

/** Kepala section bernomor: label, judul gradien, paragraf dua nada. */
export function SectionHead({ num, name, title, lead, children }: { num: string; name: string; title: ReactNode; lead: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <Reveal><SectionLabel num={num}>{name}</SectionLabel></Reveal>
      <Reveal delay={60}>
        <h2 className="grad-head max-w-[900px] text-[38px] font-semibold md:text-[52px] xl:text-[60px]">{title}</h2>
      </Reveal>
      <Reveal delay={120}><TwoTone lead={lead}>{children}</TwoTone></Reveal>
    </div>
  );
}

/** Tombol pill: primer putih atau sekunder gelap. */
export function Pill({
  href,
  children,
  primary = false,
  size = "md",
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  size?: "sm" | "md";
  icon?: ReactNode;
  className?: string;
}) {
  const sz = size === "sm" ? "h-[34px] px-4 text-[14px] gap-2" : "h-12 px-6 text-[16px] gap-2.5";
  const tone = primary ? "bg-cta text-cta-fg hover:bg-white" : "border border-line-2 bg-chip text-fg hover:border-[#3a3a3a]";
  return (
    <a href={href} className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-colors ${sz} ${tone} ${className}`}>
      {icon}
      {children}
    </a>
  );
}

/** Ikon garis kecil (subset lucide yang dipakai desain), digambar inline supaya tanpa dependensi. */
const ICONS: Record<string, ReactNode> = {
  download: <><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></>,
  play: <path d="M6 4.5v15l13-7.5z" />,
  terminal: <><path d="m7 11 2-2-2-2" /><path d="M11 13h4" /><rect width="18" height="18" x="3" y="3" rx="2" /></>,
  enter: <><path d="M20 4v7a4 4 0 0 1-4 4H4" /><path d="m9 10-5 5 5 5" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  minus: <path d="M5 12h14" />,
  lock: <><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  file: <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></>,
  fileCode: <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="m10 12-2 2 2 2" /><path d="m14 12 2 2-2 2" /></>,
  scanEye: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="1" /><path d="M18.94 12.34a7.5 7.5 0 0 1-13.88 0 .79.79 0 0 1 0-.68 7.5 7.5 0 0 1 13.88 0 .79.79 0 0 1 0 .68" /></>,
  history: <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></>,
  swatch: <><path d="M10 2a2 2 0 0 1 2 2v14a4 4 0 0 1-8 0V4a2 2 0 0 1 2-2Z" /><path d="M7 18h.01" /><path d="m12 7.5 3.3-3.3a2 2 0 0 1 2.8 0l1.7 1.7a2 2 0 0 1 0 2.8L12 16.5" /><path d="M16.5 12H20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7" /></>,
  listChecks: <><path d="m3 17 2 2 4-4" /><path d="m3 7 2 2 4-4" /><path d="M13 6h8" /><path d="M13 12h8" /><path d="M13 18h8" /></>,
  message: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M7 8h10" /><path d="M7 12h7" /></>,
  component: <><path d="M15.54 8.46 12 12l-3.54-3.54L12 4.93z" /><path d="M19.07 12 15.54 15.54 12 12l3.54-3.54z" /><path d="M12 12l3.54 3.54L12 19.07l-3.54-3.53z" /><path d="M8.46 8.46 12 12l-3.54 3.54L4.93 12z" /></>,
  sliders: <><path d="M21 4h-7" /><path d="M10 4H3" /><path d="M21 12h-9" /><path d="M8 12H3" /><path d="M21 20h-5" /><path d="M12 20H3" /><path d="M14 2v4" /><path d="M8 10v4" /><path d="M16 18v4" /></>,
};

export function Icon({ name, className = "size-4" }: { name: keyof typeof ICONS; className?: string }) {
  const filled = name === "play";
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name]}
    </svg>
  );
}
