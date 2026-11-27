"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Writing" },
  { href: "/about", label: "About" },
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
    return () => removeEventListener("keydown", k);
  }, [open]);

  return (
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

      {open && (
        <nav aria-label="Primary" className="border-t border-line bg-bg px-5 pb-5 pt-2 md:hidden">
          {[...NAV, { href: "/contact", label: "Contact" }].map((n) => (
            <Link key={n.href} href={n.href} className="t-big flex items-baseline justify-between border-b border-line py-3">
              {n.label}{active(path, n.href) && <span className="dot text-[0.6em]">●</span>}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
