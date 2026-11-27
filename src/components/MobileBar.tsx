"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SLIDES, pad } from "@/lib/deck";
import { NAV, isActive } from "./Rail";
import { useActiveSlide } from "./useActiveSlide";

/** Phones and tablets: a bottom bar. On the deck it pages slide by slide; elsewhere it carries the nav. */
export default function MobileBar() {
  const path = usePathname();
  const home = path === "/";
  const active = useActiveSlide(home);
  const [open, setOpen] = useState(false);
  const i = Math.max(0, SLIDES.findIndex((s) => s.id === active));
  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the sheet after navigating
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);

  const go = (d: number) => document.getElementById(SLIDES[Math.min(SLIDES.length - 1, Math.max(0, i + d))].id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 backdrop-blur lg:hidden">
        <div className="flex h-16 items-center justify-between gap-3 px-4">
          <Link href="/" aria-label="Home" className="shrink-0 overflow-hidden rounded-[10px]"><Image src="/brand/leslie-avatar-1024.png" alt="" width={36} height={36} /></Link>
          {home ? (
            <div className="flex items-center gap-2">
              <button onClick={() => go(-1)} disabled={i === 0} aria-label="Previous slide" className="grid h-9 w-9 place-items-center rounded-full text-mute disabled:opacity-30">‹</button>
              <span className="label min-w-[110px] text-center !tracking-[0.06em]" aria-live="polite"><span className="text-ink">{pad(i + 1)} / {pad(SLIDES.length)}</span> <span className="normal-case">{SLIDES[i].label}</span></span>
              <button onClick={() => go(1)} disabled={i === SLIDES.length - 1} aria-label="Next slide" className="grid h-9 w-9 place-items-center rounded-full text-ink disabled:opacity-30">›</button>
            </div>
          ) : (
            <nav aria-label="Primary" className="flex gap-4 text-[15px]">
              {NAV.slice(1).map((n) => <Link key={n.href} href={n.href} className={isActive(path, n.href) ? "text-ink" : "text-mute"}>{n.label}</Link>)}
            </nav>
          )}
          <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5" /><rect x="9" y="1" width="6" height="6" rx="1.5" /><rect x="1" y="9" width="6" height="6" rx="1.5" /><rect x="9" y="9" width="6" height="6" rx="1.5" /></svg>
          </button>
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-bg p-2 lg:hidden">
          <div className="slide flex flex-1 flex-col overflow-y-auto">
            <div className="label flex items-center justify-between text-mute"><span>Menu</span>
              <button onClick={() => setOpen(false)} className="btn !h-9 !px-4" autoFocus>Close</button>
            </div>
            <nav aria-label="Primary" className="mt-6 flex flex-col">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="t-big flex items-baseline justify-between border-b border-line py-3">
                  {n.label}{isActive(path, n.href) && <span className="dot text-[0.6em]">●</span>}
                </Link>
              ))}
            </nav>
            {home && (
              <ol className="mt-8 grid grid-cols-2 gap-2">
                {SLIDES.map((s, k) => (
                  <li key={s.id}><a href={`#${s.id}`} onClick={() => setOpen(false)} className={`block rounded-xl border p-3 ${k === i ? "border-ink" : "border-line"}`}>
                    <span className="label text-mute">{pad(k + 1)}</span><span className="mt-1 block text-[15px] font-medium tracking-[-0.02em]">{s.label}</span>
                  </a></li>
                ))}
              </ol>
            )}
          </div>
        </div>
      )}
    </>
  );
}
