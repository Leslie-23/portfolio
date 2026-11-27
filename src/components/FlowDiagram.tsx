"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import type { Project } from "@/lib/data";
import { Spec } from "./Spec";

/** A vertical system diagram that draws itself as it scrolls into view. Nodes respond to hover. */
export default function FlowDiagram({ project: p }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const n = p.layers.length;
  const H = 96, G = 52;
  const total = n * H + (n - 1) * G + 20;

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set(".fd-line", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".fd-node", { opacity: 0, x: -30 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
      p.layers.forEach((_, i) => {
        tl.to(`.fd-node-${i}`, { opacity: 1, x: 0, duration: 1, ease: "back.out(1.6)" }, i * 1.2);
        if (i < n - 1) tl.to(`.fd-line-${i}`, { strokeDashoffset: 0, duration: 0.9, ease: "none" }, i * 1.2 + 0.7);
      });
    }, root);
    return () => ctx.revert();
  }, [p, n]);

  return (
    <Spec name="SystemDiagram" id="SYSTEM">
      <div ref={root}>
        <svg viewBox={`0 0 760 ${total}`} className="w-full max-w-[860px]" role="img" aria-label={`${p.name} system layers, top to bottom: ${p.layers.map((l) => l.label).join(", ")}`}>
          {p.layers.map((l, i) => {
            const y = 10 + i * (H + G);
            const on = hover === i;
            return (
              <g key={l.key}>
                {i < n - 1 && <path className={`fd-line fd-line-${i}`} pathLength={1} d={`M120 ${y + H} V${y + H + G}`} fill="none" stroke="var(--accent)" strokeWidth={2} />}
                <g className={`fd-node fd-node-${i}`} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} tabIndex={0} onFocus={() => setHover(i)} onBlur={() => setHover(null)} style={{ cursor: "pointer", outline: "none" }}>
                  <rect x="20" y={y} width="720" height={H} fill={on ? "var(--ink)" : "var(--paper-3)"} stroke="var(--ink)" strokeWidth={1.5} style={{ transition: "fill .2s" }} />
                  <rect x="20" y={y} width="12" height={H} fill="var(--accent)" />
                  <text x="58" y={y + 34} fontSize="12" fill={on ? "var(--paper)" : "var(--mute)"} style={{ fontFamily: "var(--font-mono-label)" }}>L{i + 1}</text>
                  <text x="58" y={y + 66} fontSize="38" fontWeight="400" fill={on ? "var(--paper)" : "var(--ink)"} style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}>{l.label}</text>
                  <text x="720" y={y + 34} textAnchor="end" fontSize="12" fill={on ? "var(--paper)" : "var(--mute)"} style={{ fontFamily: "var(--font-mono-label)" }}>{l.detail.toUpperCase().slice(0, 52)}</text>
                  <text x="720" y={y + 82} textAnchor="end" fontSize="11" fill="var(--accent-ink)" style={{ fontFamily: "var(--font-mono-label)" }}>{on ? "◂ INSPECTING" : ""}</text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </Spec>
  );
}
