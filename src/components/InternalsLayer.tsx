"use client";
import { useEffect, useRef, useState } from "react";
import { useShell } from "./state";

type R = { k: string; name: string; id?: string; x: number; y: number; vx: number; vy: number; w: number; h: number; depth: number; el: HTMLElement };
type Gap = { k: string; x: number; y1: number; y2: number };

const px = (v: string) => Math.round(parseFloat(v) || 0);

/** Blueprint mode: a designed read of the page's structure.
 *  Sequence: outlines draw → labels populate → measurements animate → connection lines draw.
 *  Desktop adds a callout rail, crosshair guides and a live inspector for whatever is under the pointer. */
export default function InternalsLayer() {
  const { internals } = useShell();
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [rects, setRects] = useState<R[]>([]);
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [vw, setVw] = useState(1440);
  const [hot, setHot] = useState<{ r: DOMRect; name: string; pad: string; mar: string } | null>(null);
  const raf = useRef(0);
  const gx = useRef<HTMLDivElement>(null);
  const gy = useRef<HTMLDivElement>(null);

  // mount / reverse-out: derived from the toggle during render, the unmount waits for the exit animation
  const [prev, setPrev] = useState(internals);
  if (prev !== internals) {
    setPrev(internals);
    if (internals) { setMounted(true); setLeaving(false); } else if (mounted) setLeaving(true);
  }
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => { setMounted(false); setLeaving(false); setRects([]); setGaps([]); setHot(null); }, 380);
    return () => clearTimeout(t);
  }, [leaving]);

  // measure what's on screen
  useEffect(() => {
    if (!internals) return;
    const measure = () => {
      raf.current = 0;
      const vh = window.innerHeight;
      const out: R[] = [];
      const all = Array.from(document.querySelectorAll<HTMLElement>("[data-spec]"));
      all.forEach((el, i) => {
        const b = el.getBoundingClientRect();
        if (b.bottom < 0 || b.top > vh || b.width < 24 || b.height < 16) return;
        let depth = 0, p = el.parentElement;
        while (p) { if (p.dataset?.spec) depth++; p = p.parentElement; }
        out.push({ k: `${el.dataset.spec}-${i}`, name: el.dataset.spec!, id: el.dataset.specId, x: Math.round(b.left), y: Math.round(b.top + window.scrollY), vx: Math.max(0, b.left), vy: b.top, w: Math.round(b.width), h: Math.round(b.height), depth, el });
      });
      const list = out.slice(0, 48);
      // spacing: between each top-level block and the next one below it
      const top = list.filter((r) => r.depth === 0).sort((a, b) => a.vy - b.vy);
      const g: Gap[] = [];
      for (let i = 0; i < top.length - 1; i++) {
        const a = top[i], b = top[i + 1];
        const y1 = a.vy + a.h, y2 = b.vy;
        if (y2 - y1 >= 12) g.push({ k: `${a.k}>${b.k}`, x: Math.max(a.vx, b.vx) + Math.min(a.w, b.w) * 0.5, y1, y2 });
      }
      setRects(list);
      setGaps(g);
      setVw(window.innerWidth);
    };
    const req = () => { if (!raf.current) raf.current = requestAnimationFrame(measure); };
    req();
    const t = setTimeout(req, 650);
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    const mo = new MutationObserver(req);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      mo.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [internals]);

  // crosshair guides + live inspector (fine pointers only). DOM writes for the guides, state only when the target changes.
  useEffect(() => {
    if (!internals || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let last: HTMLElement | null = null, f = 0, mx = 0, my = 0;
    const paint = () => {
      f = 0;
      if (gx.current) { gx.current.style.transform = `translateY(${my}px)`; gx.current.dataset.v = `Y ${Math.round(my)}`; }
      if (gy.current) { gy.current.style.transform = `translateX(${mx}px)`; gy.current.dataset.v = `X ${Math.round(mx)}`; }
      const t = (document.elementFromPoint(mx, my) as HTMLElement | null)?.closest<HTMLElement>("[data-spec]") ?? null;
      if (t === last) return;
      last = t;
      if (!t) { setHot(null); return; }
      const cs = getComputedStyle(t);
      setHot({
        r: t.getBoundingClientRect(), name: t.dataset.spec!,
        pad: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(px).join(" "),
        mar: [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft].map(px).join(" "),
      });
    };
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; if (!f) f = requestAnimationFrame(paint); };
    const scroll = () => { last = null; if (!f) f = requestAnimationFrame(paint); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("scroll", scroll); if (f) cancelAnimationFrame(f); };
  }, [internals]);

  if (!mounted) return null;
  const desk = vw >= 900;
  const gap = Math.round(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--col-gap")) || 24);
  const cols = desk ? 12 : 6;
  // the callout rail: one row per top-level-ish component, leader line to its box
  const callouts = desk ? rects.filter((r) => r.depth <= 1 && r.w < vw * 0.98).slice(0, 9) : [];
  const railX = vw - 196;

  return (
    <div aria-hidden className={`int pointer-events-none fixed inset-0 z-[70] overflow-hidden ${leaving ? "int-out" : ""}`}>
      {rects.map((r, i) => {
        const big = r.w > 260 && r.h > 70;
        return (
          <div key={r.k} className="ib absolute border border-dashed border-accent" style={{ left: r.vx, top: r.vy, width: r.w, height: r.h, ["--d" as string]: `${Math.min(i, 14) * 40}ms` }}>
            <span className="ib-l mono mono-sm absolute -top-[9px] left-0 whitespace-nowrap bg-accent px-1 text-paper">{`<${r.name} />`}</span>
            {big && <span className="ib-m mono mono-sm absolute bottom-0 right-0 whitespace-nowrap bg-paper/90 px-1 text-accent-ink">{r.w} × {r.h}</span>}
            {big && desk && <span className="ib-m mono mono-sm absolute right-0 top-0 whitespace-nowrap bg-paper/90 px-1 text-accent-ink">x {r.x} · y {r.y}</span>}
            {r.id && big && <span className="ib-l mono mono-sm absolute left-0 top-3 whitespace-nowrap px-1 text-accent-ink">SECTION / {r.id}</span>}
            {/* width dimension, drawn like a drawing: tick, line, tick */}
            {big && desk && r.depth === 0 && (
              <span className="ib-m absolute -bottom-3 left-0 right-0 h-2">
                <i className="absolute inset-x-0 top-1/2 h-px bg-accent" /><i className="absolute left-0 top-0 h-full w-px bg-accent" /><i className="absolute right-0 top-0 h-full w-px bg-accent" />
              </span>
            )}
            <i className="absolute -left-2 top-1/2 h-px w-2 bg-accent" />
            <i className="absolute left-1/2 -top-2 h-2 w-px bg-accent" />
          </div>
        );
      })}

      {/* spacing between sections */}
      {gaps.map((g) => (
        <div key={g.k} className="ib-gap absolute w-0" style={{ left: g.x, top: g.y1, height: g.y2 - g.y1 }}>
          <i className="absolute inset-y-0 left-0 w-px bg-signal" />
          <i className="absolute -left-1.5 top-0 h-px w-3 bg-signal" /><i className="absolute -left-1.5 bottom-0 h-px w-3 bg-signal" />
          <span className="mono mono-sm absolute left-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-paper px-1 text-signal">↕ {Math.round(g.y2 - g.y1)}</span>
        </div>
      ))}

      {/* callout rail + leader lines */}
      {callouts.length > 0 && (
        <>
          <svg className="absolute inset-0 h-full w-full">
            {callouts.map((r, i) => {
              const ty = 96 + i * 30, sx = Math.min(r.vx + r.w, railX - 24), sy = Math.max(r.vy + 10, 4);
              return <path key={r.k} className="ib-line" pathLength={1} d={`M${sx} ${sy} L${railX - 40} ${ty} H${railX - 6}`} fill="none" stroke="var(--accent)" strokeWidth="1" style={{ ["--d" as string]: `${i * 50}ms` }} />;
            })}
          </svg>
          <ol className="ib-rail mono mono-sm absolute top-[84px] border border-accent bg-paper/95 px-2 py-1 text-accent-ink" style={{ left: railX }}>
            {callouts.map((r, i) => (
              <li key={r.k} className="flex h-[30px] items-center gap-2 whitespace-nowrap" style={{ ["--d" as string]: `${i * 50}ms` }}>
                <span className="bg-accent px-1 text-paper">{String(i + 1).padStart(2, "0")}</span>{r.name}
              </li>
            ))}
          </ol>
        </>
      )}

      {/* crosshair guides */}
      {desk && (
        <>
          <div ref={gx} className="ib-guide absolute inset-x-0 top-0 h-px bg-accent/50 after:absolute after:left-2 after:top-1 after:font-mono after:text-[10px] after:text-accent-ink after:content-[attr(data-v)]" />
          <div ref={gy} className="ib-guide absolute inset-y-0 left-0 w-px bg-accent/50 after:absolute after:left-1 after:top-16 after:font-mono after:text-[10px] after:text-accent-ink after:content-[attr(data-v)]" />
        </>
      )}

      {/* live inspector: the box under the pointer, solid, with its box model */}
      {hot && (
        <div className="absolute border-2 border-accent bg-accent/[0.06] transition-all duration-150 ease-out" style={{ left: hot.r.left, top: hot.r.top, width: hot.r.width, height: hot.r.height }}>
          <div className={`mono mono-sm absolute left-0 whitespace-nowrap border border-ink bg-ink px-2 py-1 text-paper ${hot.r.top > 80 ? "bottom-full mb-1" : hot.r.bottom < innerHeight - 60 ? "top-full mt-1" : "top-2 ml-2"}`}>
            <span className="text-accent">{`<${hot.name} />`}</span> · {Math.round(hot.r.width)} × {Math.round(hot.r.height)} · PAD {hot.pad} · MAR {hot.mar}
          </div>
        </div>
      )}

      <div className="ib-l mono mono-sm absolute bottom-3 left-[var(--gutter)] border border-accent bg-paper px-2 py-1 text-accent-ink">
        {cols} COL GRID · GAP / {gap} · {rects.length} COMPONENTS IN VIEW · INTERNALS ON
      </div>

      <style>{`
        @keyframes ib-draw { from { clip-path: inset(0 100% 100% 0); opacity: 0 } to { clip-path: inset(0 0 0 0); opacity: 1 } }
        @keyframes ib-pop { from { opacity: 0; transform: translateY(3px) } to { opacity: 1; transform: none } }
        @keyframes ib-grow { from { transform: scaleY(0) } to { transform: scaleY(1) } }
        @keyframes ib-stroke { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
        .ib { animation: ib-draw .42s cubic-bezier(.7,0,.2,1) var(--d, 0ms) both; }
        .ib-l { animation: ib-pop .22s ease-out calc(var(--d, 0ms) + 280ms) both; }
        .ib-m { animation: ib-pop .22s ease-out calc(var(--d, 0ms) + 460ms) both; }
        .ib-gap { transform-origin: top; animation: ib-grow .35s cubic-bezier(.7,0,.2,1) 560ms both; }
        .ib-line { stroke-dasharray: 1; animation: ib-stroke .5s cubic-bezier(.7,0,.2,1) calc(var(--d, 0ms) + 700ms) both; }
        .ib-rail { animation: ib-pop .25s ease-out 620ms both; }
        .ib-rail li { animation: ib-pop .2s ease-out calc(var(--d, 0ms) + 700ms) both; }
        .ib-guide { animation: ib-pop .3s ease-out 400ms both; }
        .int { transition: opacity .35s ease, filter .35s ease; }
        .int-out { opacity: 0; filter: blur(1px); }
        .int-out .ib { animation: ib-draw .3s cubic-bezier(.7,0,.2,1) reverse both; }
        @media (prefers-reduced-motion: reduce) { .int *, .int { animation: none !important; transition: none !important; } }
      `}</style>
    </div>
  );
}
