"use client";
import { useEffect, useRef, useState } from "react";
import { useShell } from "./state";

type R = { k: string; name: string; id?: string; x: number; y: number; w: number; h: number };

/** Blueprint mode: a designed read of the page's structure. Boxes, names, dimensions, coordinates. */
export default function InternalsLayer() {
  const { internals } = useShell();
  const [rects, setRects] = useState<R[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clear measurements when the mode turns off
    if (!internals) { setRects([]); return; }
    const measure = () => {
      raf.current = 0;
      const vh = window.innerHeight, vw = window.innerWidth;
      const out: R[] = [];
      document.querySelectorAll<HTMLElement>("[data-spec]").forEach((el, i) => {
        const b = el.getBoundingClientRect();
        if (b.bottom < 0 || b.top > vh || b.width < 24 || b.height < 16) return;
        out.push({
          k: `${el.dataset.spec}-${i}`, name: el.dataset.spec!, id: el.dataset.specId,
          x: Math.round(b.left), y: Math.round(b.top + window.scrollY), w: Math.round(b.width), h: Math.round(b.height),
        });
        const r = out[out.length - 1];
        // clamp to viewport for display
        (r as R & { vx: number; vy: number }).vx = Math.max(0, b.left);
        (r as R & { vx: number; vy: number }).vy = b.top;
      });
      void vw;
      setRects(out.slice(0, 48));
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
    };
  }, [internals]);

  if (!internals) return null;
  const gap = typeof window !== "undefined" ? Math.round(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--col-gap")) || 24) : 24;
  const cols = typeof window !== "undefined" && window.innerWidth >= 900 ? 12 : 6;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {rects.map((r, i) => {
        const v = r as R & { vx: number; vy: number };
        return (
          <div key={r.k} className="ib absolute border border-dashed border-accent" style={{ left: v.vx, top: v.vy, width: r.w, height: r.h, animationDelay: `${Math.min(i, 14) * 45}ms` }}>
            <span className="mono mono-sm absolute -top-[9px] left-0 whitespace-nowrap bg-accent px-1 text-paper">{`<${r.name} />`}</span>
            <span className="mono mono-sm absolute bottom-0 right-0 whitespace-nowrap bg-paper/90 px-1 text-accent-ink">{r.w} × {r.h}</span>
            <span className="mono mono-sm absolute right-0 top-0 whitespace-nowrap bg-paper/90 px-1 text-accent-ink">x {r.x} · y {r.y}</span>
            {r.id && <span className="mono mono-sm absolute left-0 top-3 whitespace-nowrap px-1 text-accent-ink">SECTION / {r.id}</span>}
            <i className="absolute -left-2 top-1/2 h-px w-2 bg-accent" />
            <i className="absolute left-1/2 -top-2 h-2 w-px bg-accent" />
          </div>
        );
      })}
      <div className="mono mono-sm absolute bottom-3 left-[var(--gutter)] border border-accent bg-paper px-2 py-1 text-accent-ink">
        {cols} COL GRID · GAP / {gap} · INTERNALS ON
      </div>
      <style>{`
        @keyframes ib-draw { from { clip-path: inset(0 100% 100% 0); opacity: 0 } to { clip-path: inset(0 0 0 0); opacity: 1 } }
        .ib { animation: ib-draw .45s cubic-bezier(.7,0,.2,1) both; }
      `}</style>
    </div>
  );
}
