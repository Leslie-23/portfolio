"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/data";
import Exploded from "./Exploded";

const BP = { "--paper": "#e6f1ea", "--paper-2": "#dcebe2", "--paper-3": "#eef6f1", "--ink": "#0f3a25", "--mute": "#3f7a5a" } as React.CSSProperties;

/** EXP. 005: an inspection lens. Hold ALT (or toggle SCAN): inside the circle, the plate's internals. */
export default function ScanPlate() {
  const box = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [alt, setAlt] = useState(false);
  const p = PROJECTS[2];

  useEffect(() => {
    const k = (e: KeyboardEvent) => setAlt(e.altKey);
    const b = () => setAlt(false);
    window.addEventListener("keydown", k); window.addEventListener("keyup", k); window.addEventListener("blur", b);
    return () => { window.removeEventListener("keydown", k); window.removeEventListener("keyup", k); window.removeEventListener("blur", b); };
  }, []);

  const active = on || alt;
  const move = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    const m = `radial-gradient(circle 96px at ${e.clientX - r.left}px ${e.clientY - r.top}px, #000 97%, transparent 100%)`;
    lens.current!.style.maskImage = m; lens.current!.style.webkitMaskImage = m;
  };

  return (
    <div>
      <div ref={box} onPointerMove={move} className="relative overflow-hidden border border-ink bg-paper-3 p-3" data-cursor={active ? "SCAN" : "HOLD ALT"}>
        <Exploded project={p} exploded={false} labels={false} ratio="aspect-[4/3]" />
        <div ref={lens} aria-hidden className="pointer-events-none absolute inset-0 bg-[#e6f1ea] p-3 transition-opacity duration-150" style={{ ...BP, opacity: active ? 1 : 0, maskImage: "radial-gradient(circle 0px at 0 0, #000, transparent)" }}>
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(#34bb7822 1px, transparent 1px), linear-gradient(90deg, #34bb7822 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <Exploded project={p} exploded labels={false} ratio="aspect-[4/3]" />
        </div>
      </div>
      <div className="mono mt-2 flex items-center justify-between text-mute">
        <span>HOLD ALT · OR</span>
        <button onClick={() => setOn((v) => !v)} aria-pressed={on} className="btn mono !py-1">{on ? "SCAN ON" : "SCAN"}</button>
      </div>
    </div>
  );
}
