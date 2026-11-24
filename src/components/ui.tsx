"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Ornament marquee: kata-kata dipisah glyph ✢✳✶. */
export function Marquee({ words, className = "" }: { words: string[]; className?: string }) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center font-mono text-[13px] text-fg-3" aria-hidden={key === "b"}>
      {words.concat(words).map((w, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="mx-5 text-accent tracking-[0.1em]">·✢✳✶✻✽✻✶✳✢</span>
          <span>{w}</span>
        </span>
      ))}
      <span className="mx-5 text-accent tracking-[0.1em]">·✢✳✶✻✽✻✶✳✢</span>
    </div>
  );
  return (
    <div className={`marquee overflow-hidden border-y border-line py-3 select-none ${className}`} role="presentation">
      <div className="marquee-track">{row("a")}{row("b")}</div>
    </div>
  );
}

/** Eyebrow: glyph aksen + label mono. */
export function Eyebrow({ children, center }: { children: string; center?: boolean }) {
  return (
    <p className={`font-mono text-[13px] text-fg-3 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="eyebrow-glyph">·✢✳✶✻</span>
      <span>{children}</span>
    </p>
  );
}

/** Keycap ala kbd. */
export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="kbd">{children}</kbd>;
}

/** Pembungkus reveal saat masuk viewport (IntersectionObserver). */
export function Reveal({
  children,
  delay = 0,
  side = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  side?: boolean;
  className?: string;
}) {
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${side ? "reveal-side" : "reveal"} ${className}`} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/** Wadah seksi konsisten. */
export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1200px] px-5 md:px-10 py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}
