"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Eyebrow, Reveal, Section } from "./ui";

const STEPS = [
  "screenshot the frame",
  "describe it in chat",
  "agent writes css, blind",
  "screenshot the result",
  "explain what's off …",
];

export function RoundTrip() {
  const [pos, setPos] = useState(50);
  const [mode, setMode] = useState<"after" | "before">("after");
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const move = useCallback((clientX: number) => {
    const r = track.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const Before = (
    <div className="flex h-full flex-col gap-5 p-6 md:p-10">
      <p className="font-mono text-xs text-danger">before</p>
      <p className="max-w-[380px] text-lg leading-snug text-fg md:text-[22px]">
        screenshot, describe, paste. re-explain the spacing. paste again. lose the thread.
      </p>
      <ol className="space-y-2 font-mono text-[13px] text-fg-3">
        {STEPS.map((s, i) => (
          <li key={s}>
            <span className="mr-3 text-fg-3/70">{String(i + 1).padStart(2, "0")}</span>
            {s}
          </li>
        ))}
      </ol>
      <p className="mt-auto font-mono text-[13px] text-fg-3">10 steps · dozens of times a day</p>
    </div>
  );

  const After = (
    <div className="flex h-full flex-col gap-5 p-6 md:p-10">
      <p className="font-mono text-xs text-success">after</p>
      <p className="max-w-[420px] text-lg leading-snug text-fg md:text-[22px]">
        your agent draws on the canvas. you point at one thing.
      </p>
      <div className="relative mt-auto overflow-hidden rounded-lg border border-line">
        <Image src="/img/rt-after.png" alt="Canvas with comment thread" width={525} height={310} className="w-full" />
      </div>
    </div>
  );

  return (
    <Section>
      <Reveal><Eyebrow>round trip</Eyebrow></Reveal>
      <Reveal delay={70}>
        <h2 className="mt-5 max-w-[720px] text-[34px] leading-[1.08] font-medium tracking-tight md:text-[52px]">
          stop describing the design.
          <br />
          let your agent draw it.
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-4 hidden items-center gap-2 font-mono text-xs text-fg-3 md:flex">
          before · after drag to compare <span className="text-fg-2">←</span>
          <span className="text-fg-2">→</span>
        </p>
        <div className="mt-4 flex gap-2 font-mono text-xs md:hidden">
          {(["before", "after"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md border px-3 py-1 ${mode === m ? "border-accent text-fg" : "border-line-2 text-fg-3"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </Reveal>
      <Reveal delay={160}>
        {/* mobile: toggle sebelum/sesudah */}
        <div className="mt-8 rounded-2xl border border-line bg-panel md:hidden">{mode === "before" ? Before : After}</div>
        {/* desktop: scrub geser */}
        <div
          ref={track}
          className="relative mt-8 hidden overflow-hidden rounded-2xl border border-line bg-panel select-none md:block"
          onPointerDown={(e) => {
            drag.current = true;
            move(e.clientX);
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={(e) => drag.current && move(e.clientX)}
          onPointerUp={() => (drag.current = false)}
          onPointerCancel={() => (drag.current = false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 10));
            if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 10));
          }}
          tabIndex={0}
          role="slider"
          aria-label="before / after comparison"
          aria-valuenow={Math.round(pos)}
        >
          <div className="grid grid-cols-2">
            <div>{Before}</div>
            <div>{After}</div>
          </div>
          {/* selubung clip: sisi kiri before, sisi kanan after */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <div className="grid h-full grid-cols-2 bg-page-2">
              <div className="invisible">{Before}</div>
              <div>{After}</div>
            </div>
          </div>
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div className="grid h-full grid-cols-2">
              <div>{Before}</div>
              <div className="invisible">{After}</div>
            </div>
          </div>
          <div className="scrub-handle absolute top-0 bottom-0 w-px bg-fg-2/60" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-panel-2 text-[13px] text-fg-2 shadow-lg">
              ⇄
            </span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
