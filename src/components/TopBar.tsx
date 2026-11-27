"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PERSON } from "@/lib/data";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
];
const active = (path: string, href: string) => path === href || path.startsWith(href + "/");

/** One slim bar across the top of every page. Nothing else frames the content. */
export default function TopBar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the sheet after navigating
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { removeEventListener("keydown", k); document.documentElement.style.overflow = prev; };
  }, [open]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--bar)] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Leslie Paul Ajayi, home">
          <Image src="/brand/leslie-avatar-1024.png" alt="" width={32} height={32} priority className="rounded-[9px]" />
          <span className="text-[16px] font-medium tracking-[-0.02em]">Leslie Paul Ajayi</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(path, n.href) ? "page" : undefined}
              className={`relative py-1 transition-colors ${active(path, n.href) ? "text-ink" : "text-mute hover:text-ink"}`}>
              {n.label}
              {active(path, n.href) && <i aria-hidden className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded bg-accent" />}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-solid !h-9 !px-4 !text-[14px]">Contact</Link>
        </nav>

        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M3 3l10 10M13 3L3 13" /> : <path d="M2 5h12M2 11h12" />}
          </svg>
        </button>
      </div>

    </header>
      {open && (
      <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-bg md:hidden">
        <Image src="/portrait/leslie.png" alt="" width={720} height={900} aria-hidden className="pointer-events-none absolute bottom-0 right-[-8%] h-[58%] w-auto max-w-none select-none opacity-[0.55]" />
        <div className="relative flex h-[var(--bar)] shrink-0 items-center justify-between border-b border-line px-5">
          <Link href="/" className="flex items-center gap-3" aria-label="Leslie Paul Ajayi, home">
            <Image src="/brand/leslie-avatar-1024.png" alt="" width={32} height={32} className="rounded-[9px]" />
            <span className="text-[16px] font-medium tracking-[-0.02em]">Leslie Paul Ajayi</span>
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close menu" autoFocus className="grid h-10 w-10 place-items-center rounded-full border border-line">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13" /></svg>
          </button>
        </div>
        <nav aria-label="Primary" className="relative flex flex-1 flex-col justify-center overflow-y-auto px-5 py-6">
          {[{ href: "/", label: "Home" }, ...NAV, { href: "/contact", label: "Contact" }].map((n) => (
            <Link key={n.href} href={n.href} className="flex items-baseline justify-between border-b border-line py-4 text-[clamp(34px,10vw,52px)] font-medium leading-none tracking-[-0.05em]">
              {n.label}{(n.href === "/" ? path === "/" : active(path, n.href)) && <span className="dot text-[0.5em]">●</span>}
            </Link>
          ))}
        </nav>
        <div className="relative shrink-0 border-t border-line px-5 py-5 pb-[calc(20px+env(safe-area-inset-bottom))]">
          <a href={`mailto:${PERSON.email}`} className="btn btn-solid w-full justify-center">{PERSON.email}</a>
        </div>
      </div>
    )}
    </>
  );
}
