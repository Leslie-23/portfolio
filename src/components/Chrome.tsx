"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { NAV, PROJECTS } from "@/lib/data";
import { useShell } from "./state";
import Exploded from "./Exploded";

function Preview({ k }: { k: string }) {
  const box = "relative aspect-[4/3] w-full border border-ink bg-paper-3 overflow-hidden";
  if (k === "WORK") return <div className={box}><Exploded project={PROJECTS[1]} exploded={false} labels={false} ratio="h-full" className="!h-full" /></div>;
  if (k === "THE BENCH")
    return (
      <div className={box}>
        <svg viewBox="0 0 200 150" className="h-full w-full">
          <g stroke="var(--ink)" fill="var(--paper)" strokeWidth="1">
            <line x1="40" y1="40" x2="120" y2="100" strokeDasharray="3 3" /><line x1="120" y1="100" x2="160" y2="40" strokeDasharray="3 3" />
            <rect x="26" y="28" width="28" height="24" /><rect x="106" y="88" width="28" height="24" /><rect x="146" y="28" width="28" height="24" fill="var(--accent)" />
          </g>
          <text x="10" y="140" className="mono" fontSize="8" fill="var(--mute)">EXP. 003 / DRAG THE NODES</text>
        </svg>
      </div>
    );
  if (k === "ABOUT")
    return (
      <div className={box + " grid place-items-center"}>
        <span className="reg left-3 top-3" /><span className="reg right-3 top-3" /><span className="reg bottom-3 left-3" /><span className="reg bottom-3 right-3" />
        <div className="display text-7xl">LPA</div>
        <div className="mono mono-sm absolute bottom-2 left-3 text-mute">PORTRAIT / PENDING</div>
      </div>
    );
  if (k === "TOOLKIT")
    return (
      <div className={box}>
        <svg viewBox="0 0 200 150" className="h-full w-full" fill="none" stroke="var(--ink)">
          {[30, 62, 94, 126].map((y) => <g key={y}><rect x="14" y={y - 8} width="44" height="16" /><path d={`M58 ${y} H100 V75 H140`} strokeDasharray="3 3" /></g>)}
          <rect x="140" y="63" width="48" height="24" fill="var(--accent)" stroke="var(--accent)" />
        </svg>
      </div>
    );
  if (k === "NOTES")
    return (
      <div className={box + " p-4"}>
        <div className="mono text-mute">NOTE 004</div>
        {[80, 95, 70, 88, 60].map((w, i) => <div key={i} className="mt-2 h-[3px] bg-ink/70" style={{ width: `${w}%` }} />)}
        <div className="mono mono-sm absolute bottom-2 right-3 text-accent-ink">FIG. A →</div>
      </div>
    );
  return (
    <div className={box + " p-4"}>
      <div className="mono text-mute">SPEC SHEET</div>
      {["NAME", "CONTACT", "WHAT ARE WE BUILDING?"].map((l) => <div key={l} className="mono mono-sm mt-3 border-b border-ink pb-1">{l}</div>)}
      <div className="btn mono mono-sm absolute bottom-3 right-3 !py-1">SEND SPEC →</div>
    </div>
  );
}

function IndexNav({ onClose }: { onClose: () => void }) {
  const [hover, setHover] = useState<number>(0);
  const root = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);
  const prev = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = root.current!;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    if (!reducedMotion()) {
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.45, ease: "power4.out" });
      gsap.fromTo(el.querySelectorAll(".row"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.15, ease: "back.out(1.4)" });
    }
    rows.current[0]?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.documentElement.style.overflow = prevOverflow; };
  }, [onClose]);

  useLayoutEffect(() => {
    const r = rows.current[hover], p = prev.current, path = line.current;
    if (!r || !p || !path || window.innerWidth < 900) return;
    const a = r.getBoundingClientRect(), b = p.getBoundingClientRect();
    const x1 = a.right - 8, y1 = a.top + a.height / 2, x2 = b.left, y2 = b.top + b.height / 2;
    const mid = x1 + (x2 - x1) * 0.5;
    path.setAttribute("d", `M${x1} ${y1} H${mid} V${y2} H${x2}`);
    const len = path.getTotalLength();
    gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.35, ease: "power2.out" });
  }, [hover]);

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label="Index" data-no-part className="fixed inset-0 z-[120] overflow-y-auto bg-paper">
      <svg className="pointer-events-none fixed inset-0 z-[121] h-full w-full max-[899px]:hidden"><path ref={line} fill="none" stroke="var(--accent)" strokeWidth="1.5" /><circle r="0" /></svg>
      <div className="frame grid12 min-h-full content-center py-24">
        <div className="col-span-6 md:col-span-7">
          <div className="mono mb-6 flex justify-between text-mute"><span>LESLIE</span><span>INDEX</span></div>
          <nav aria-label="Primary">
            {NAV.map((n, i) => (
              <Link
                key={n.href} href={n.href} ref={(el) => { rows.current[i] = el; }} onClick={onClose}
                onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)}
                aria-current={pathname.startsWith(n.href) ? "page" : undefined}
                className="row group flex items-baseline justify-between border-t border-ink py-3 last:border-b md:py-4"
              >
                <span className={`display text-[clamp(30px,6vw,84px)] transition-all duration-200 ${hover === i ? "translate-x-3 text-accent-ink" : ""}`}>{n.label}</span>
                <span className="mono text-mute">{n.n}</span>
              </Link>
            ))}
          </nav>
          <div className="mono mt-6 text-mute">{NAV[hover].hint}</div>
        </div>
        <div className="col-span-5 col-start-8 self-center max-[899px]:hidden">
          <div ref={prev}><Preview k={NAV[hover].label} /></div>
          <div className="mono mt-2 text-mute">FIG. {NAV[hover].n} / {NAV[hover].label}</div>
        </div>
      </div>
      <button onClick={onClose} className="btn mono fixed right-[var(--gutter)] top-4 z-[122] bg-paper">CLOSE ✕</button>
    </div>
  );
}

export default function Chrome() {
  const { internals, toggleInternals, indexOpen, setIndexOpen } = useShell();
  const pathname = usePathname();
  useEffect(() => setIndexOpen(false), [pathname, setIndexOpen]);
  const close = () => setIndexOpen(false);

  return (
    <>
      <header data-part className="fixed inset-x-0 top-0 z-[80] bg-paper">
        <div className="frame flex h-14 items-center justify-between border-b border-hair">
          <Link href="/" className="flex items-baseline gap-3" data-cursor="HOME">
            <span className="display text-xl">LESLIE</span>
            <span className="mono text-mute max-md:hidden">SOFTWARE ENGINEER / GHANA</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={toggleInternals} aria-pressed={internals} className="btn mono !py-1.5" data-cursor={internals ? "RESTORE" : "INSPECT"}>
              <span className={`inline-block h-2 w-2 ${internals ? "bg-accent" : "border border-ink"}`} />
              <span className="max-sm:hidden">{internals ? "HIDE INTERNALS" : "SHOW INTERNALS"}</span>
              <span className="sm:hidden">{internals ? "HIDE" : "INTERNALS"}</span>
            </button>
            <button onClick={() => setIndexOpen(true)} aria-haspopup="dialog" className="btn mono !py-1.5 bg-ink text-paper hover:!bg-accent hover:!text-ink" data-cursor="OPEN INDEX">INDEX ≡</button>
          </div>
        </div>
      </header>
      {indexOpen && <IndexNav onClose={close} />}
    </>
  );
}
