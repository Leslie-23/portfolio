"use client";
import { useEffect, useRef } from "react";

/** EXP. 002 — driven by scroll velocity, not position. */
export default function ScrollVelocity() {
  const bar = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const trail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY, v = 0, raf = 0, running = true;
    const history: number[] = new Array(60).fill(0);
    const tick = () => {
      if (!running) return;
      const y = window.scrollY;
      const dv = y - last; last = y;
      v += (dv - v) * 0.18;
      const a = Math.min(1, Math.abs(v) / 60);
      if (bar.current) { bar.current.style.transform = `scaleX(${a})`; bar.current.style.background = v < 0 ? "var(--orange)" : "var(--accent)"; }
      if (num.current) num.current.textContent = `${v >= 0 ? "+" : "−"}${Math.abs(Math.round(v * 60)).toString().padStart(4, "0")} PX/S`;
      history.push(a); history.shift();
      if (trail.current) trail.current.innerHTML = history.map((h) => `<i style="height:${Math.max(2, h * 100)}%"></i>`).join("");
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="border border-ink bg-paper-3 p-4">
      <div className="mono flex justify-between"><span>SCROLL VELOCITY</span><span ref={num}>+0000 PX/S</span></div>
      <div className="mt-3 h-3 w-full border border-ink"><div ref={bar} className="h-full origin-left" style={{ transform: "scaleX(0)", background: "var(--accent)" }} /></div>
      <div ref={trail} className="mt-3 flex h-16 items-end gap-[2px] [&>i]:block [&>i]:flex-1 [&>i]:bg-ink/70" aria-hidden />
      <div className="mono mono-sm mt-2 text-mute">SCROLL THE PAGE. ↑ ORANGE = UP, ↓ GREEN = DOWN.</div>
    </div>
  );
}
