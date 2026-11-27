"use client";
import { useEffect, useRef } from "react";

/** Measurement-tool cursor. Desktop / fine pointers only.
 *  Labels come from data-cursor="INSPECT" on any element; data-cursor-dim shows its size. */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const coords = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    document.documentElement.classList.add("cursor-on");
    const el = root.current!;
    el.style.display = "block";
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0, lastLabel = "";
    const loop = () => {
      x += (tx - x) * 0.35; y += (ty - y) * 0.35;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (coords.current) coords.current.textContent = `X ${Math.round(tx)}  Y ${Math.round(ty)}`;
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea");
      let text = "";
      if (t) {
        text = t.dataset.cursor || (t.tagName === "A" ? "FOLLOW →" : t.tagName === "BUTTON" ? "" : "");
        if (t.dataset.cursorDim !== undefined) {
          const r = t.getBoundingClientRect();
          text = `${text ? text + "  " : ""}${Math.round(r.width)} × ${Math.round(r.height)}`;
        }
      }
      if (text !== lastLabel) {
        lastLabel = text;
        if (label.current) label.current.textContent = text;
        el.dataset.active = text ? "1" : "0";
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    const down = () => (el.dataset.down = "1");
    const up = () => (el.dataset.down = "0");
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="group pointer-events-none fixed left-0 top-0 z-[300] hidden mix-blend-difference" style={{ willChange: "transform" }}>
      <div className="relative text-white">
        <span className="absolute -left-4 top-0 h-px w-8 -translate-y-1/2 bg-current transition-all duration-150 group-data-[active='1']:w-12 group-data-[down='1']:scale-x-50" />
        <span className="absolute left-0 -top-4 h-8 w-px -translate-x-1/2 bg-current transition-all duration-150 group-data-[active='1']:h-12 group-data-[down='1']:scale-y-50" />
        <span ref={label} className="mono absolute left-4 top-3 whitespace-nowrap" />
        <span ref={coords} className="mono mono-sm absolute left-4 top-[-22px] whitespace-nowrap opacity-60" />
      </div>
    </div>
  );
}
