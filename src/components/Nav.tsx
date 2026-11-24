"use client";

import { useState } from "react";
import { Kbd } from "./ui";

const LINKS = [
  { href: "#features", label: "features" },
  { href: "#docs", label: "docs" },
  { href: "#changelog", label: "changelog" },
  { href: "#github", label: "github" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-page/85 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <span className="grid size-6 place-items-center rounded-md bg-accent text-[13px] font-bold text-white">l</span>
          lakar
        </a>
        <div className="hidden items-center gap-7 text-sm text-fg-2 md:flex">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-fg transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#download"
            className="hidden rounded-lg bg-cta px-4 py-1.5 text-[15px] font-medium text-cta-fg transition-transform hover:scale-[1.03] md:block"
          >
            download
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg border border-line-2 text-fg-2 md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-line px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-fg-2">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="py-1 hover:text-fg">
                {l.label}
              </a>
            ))}
            <a href="#download" className="mt-1 rounded-lg bg-cta px-4 py-2 text-center font-medium text-cta-fg" onClick={() => setOpen(false)}>
              download
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
