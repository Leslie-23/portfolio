"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SLIDES, pad } from "@/lib/deck";
import { useActiveSlide } from "./useActiveSlide";

export const NAV = [
  { href: "/", label: "Deck" },
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Writing" },
  { href: "/about", label: "About" },
];
export const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

/** Desktop rail: brand mark, the deck's slide thumbnails (home only), and the site nav. */
export default function Rail() {
  const path = usePathname();
  const home = path === "/";
  const active = useActiveSlide(home);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[var(--rail)] flex-col items-center py-4 lg:flex" aria-label="Site">
      <Link href="/" aria-label="Leslie Paul Ajayi, home" className="block overflow-hidden rounded-[12px] transition-transform hover:scale-[1.04]">
        <Image src="/brand/leslie-avatar-1024.png" alt="" width={44} height={44} priority />
      </Link>

      {home && (
        <nav aria-label="Slides" className="mt-5 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 py-1 [scrollbar-width:none]">
          {SLIDES.map((s, i) => {
            const on = active === s.id;
            const dark = "dark" in s && s.dark;
            return (
              <a key={s.id} href={`#${s.id}`} aria-current={on ? "true" : undefined} aria-label={`${pad(i + 1)} ${s.label}`}
                className={`relative block h-[54px] w-[86px] shrink-0 overflow-hidden rounded-[9px] p-1.5 text-left transition-all ${dark ? "bg-night text-white" : "bg-card text-ink"} ${on ? "outline outline-2 outline-offset-2 outline-ink" : "opacity-80 hover:opacity-100"}`}>
                <span className="block text-[6.5px] font-medium leading-[1.15] tracking-[-0.02em]">{s.title}</span>
                <span className="label absolute bottom-1 left-1.5 !text-[8px] !tracking-normal">{i + 1}</span>
                <i aria-hidden className={`absolute bottom-1.5 right-1.5 h-2.5 w-2.5 rounded-full ${on ? "bg-accent" : "bg-accent/30"}`} />
              </a>
            );
          })}
        </nav>
      )}

      <nav aria-label="Primary" className="mt-auto flex flex-col items-center gap-2.5 pt-4 text-[14px]">
        {NAV.map((n) => {
          const on = isActive(path, n.href);
          return (
            <Link key={n.href} href={n.href} aria-current={on ? "page" : undefined}
              className={`relative pb-0.5 transition-colors ${on ? "text-ink" : "text-mute hover:text-ink"}`}>
              {n.label}
              {on && <i aria-hidden className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded bg-accent" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
