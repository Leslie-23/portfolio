"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import type { Topology, TNode, TEdge } from "@/lib/infra";
import { Spec } from "./Spec";


function route(a: TNode, b: TNode, side: TEdge["side"]) {
  if (side === "v") {
    const down = b.y > a.y;
    const x1 = a.x + a.w / 2, y1 = down ? a.y + a.h : a.y, x2 = b.x + b.w / 2, y2 = down ? b.y : b.y + b.h;
    const my = (y1 + y2) / 2;
    return { d: Math.abs(x1 - x2) < 2 ? `M${x1} ${y1} V${y2}` : `M${x1} ${y1} V${my} H${x2} V${y2}`, lx: (x1 + x2) / 2, ly: my };
  }
  const right = b.x > a.x;
  const x1 = right ? a.x + a.w : a.x, y1 = a.y + a.h / 2, x2 = right ? b.x : b.x + b.w, y2 = b.y + b.h / 2;
  const mx = (x1 + x2) / 2;
  return { d: Math.abs(y1 - y2) < 2 ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} H${mx} V${y2} H${x2}`, lx: mx, ly: Math.min(y1, y2) + Math.abs(y1 - y2) / 2 };
}

/** A system topology that draws itself when it scrolls into view. Hover or focus a part to trace what it touches. */
export default function TopologyDiagram({ t }: { t: Topology }) {
  const root = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState<string | null>(null);
  const byId = useMemo(() => Object.fromEntries(t.nodes.map((n) => [n.id, n])), [t]);
  const edges = useMemo(() => t.edges.map((e) => ({ e, ...route(byId[e.from], byId[e.to], e.side) })), [t, byId]);
  const linked = (id: string) => hot === id || t.edges.some((e) => (e.from === hot && e.to === id) || (e.to === hot && e.from === id));

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set(".td-edge", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".td-node", { opacity: 0, y: 14 });
      gsap.set(".td-label, .td-dash", { opacity: 0 });
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 78%", once: true } })
        .to(".td-node", { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "back.out(1.5)" })
        .to(".td-edge", { strokeDashoffset: 0, duration: 0.5, stagger: 0.06, ease: "power2.inOut" }, 0.2)
        .to(".td-dash", { opacity: 1, duration: 0.4 }, 0.5)
        .to(".td-label", { opacity: 1, duration: 0.3, stagger: 0.04 }, 0.7);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Spec name="Topology" id={t.id.toUpperCase()} as="div" className="border border-ink bg-paper-3">
      <div ref={root}>
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink p-4 md:p-6">
          <div>
            <div className="mono text-mute">{t.kicker}</div>
            <h3 className="display mt-1 text-[clamp(24px,3vw,44px)]">{t.title}</h3>
          </div>
          {t.link && <Link href={t.link.href} className="btn mono" data-cursor="OPEN →">{t.link.label} →</Link>}
        </div>
        <p className="max-w-[70ch] px-4 pt-4 text-graphite md:px-6">{t.blurb}</p>

        {/* desktop: the drawing */}
        <div className="p-4 max-md:hidden md:p-6">
          <svg viewBox={`0 0 ${t.vb[0]} ${t.vb[1]}`} className="block h-auto w-full" role="img" aria-label={`${t.title}: ${t.nodes.map((n) => n.label).join(", ")}`}>
            {t.groups?.map((g) => (
              <g key={g.label}>
                <rect x={g.x} y={g.y} width={g.w} height={g.h} fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="5 5" opacity=".5" />
                <text x={g.x + 12} y={g.y + 18} fontSize="10" fill="var(--mute)" style={{ fontFamily: "var(--font-mono-label)", letterSpacing: "0.06em" }}>{g.label}</text>
              </g>
            ))}
            {edges.map(({ e, d, lx, ly }, i) => {
              const on = hot && (e.from === hot || e.to === hot);
              return (
                <g key={i} style={{ opacity: hot && !on ? 0.2 : 1, transition: "opacity .2s" }}>
                  <path className={e.dashed ? "td-dash" : "td-edge"} pathLength={e.dashed ? undefined : 1} d={d} fill="none" stroke={on ? "var(--accent-ink)" : "var(--ink)"} strokeWidth={on ? 2.5 : 1.5} strokeDasharray={e.dashed ? "5 4" : undefined} />
                  {e.label && (
                    <g className="td-label">
                      <rect x={lx - e.label.length * 3.1 - 5} y={ly - 9} width={e.label.length * 6.2 + 10} height={16} fill="var(--paper-3)" />
                      <text x={lx} y={ly + 3} textAnchor="middle" fontSize="10" fill="var(--accent-ink)" style={{ fontFamily: "var(--font-mono-label)" }}>{e.label}</text>
                    </g>
                  )}
                </g>
              );
            })}
            {t.nodes.map((n) => {
              const dim = hot && !linked(n.id);
              const accent = n.tone === "accent";
              return (
                <g key={n.id} className="td-node" tabIndex={0} onPointerEnter={() => setHot(n.id)} onPointerLeave={() => setHot(null)} onFocus={() => setHot(n.id)} onBlur={() => setHot(null)} style={{ cursor: "pointer", outline: "none", opacity: dim ? 0.3 : undefined }} data-cursor="TRACE">
                  <rect x={n.x} y={n.y} width={n.w} height={n.h} fill={accent ? "var(--accent)" : "var(--paper)"} stroke="var(--ink)" strokeWidth={hot === n.id ? 2.5 : 1.5} />
                  <text x={n.x + 12} y={n.y + (n.sub ? n.h / 2 - 2 : n.h / 2 + 5)} fontSize={n.label.length > 14 ? 13 : 15} fontWeight="800" fill="#151515" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>{n.label}</text>
                  {n.sub && <text x={n.x + 12} y={n.y + n.h / 2 + 15} fontSize="10" fill={accent ? "#151515" : "var(--mute)"} style={{ fontFamily: "var(--font-mono-label)", textTransform: "uppercase" }}>{n.sub}</text>}
                </g>
              );
            })}
          </svg>
          <div className="mono mono-sm mt-2 text-mute">HOVER A PART TO TRACE WHAT IT TOUCHES · DASHED = PRIVATE / CONTROL</div>
        </div>

        {/* phones: the same parts as a plain list */}
        <ol className="space-y-0 p-4 md:hidden">
          {t.nodes.map((n, i) => (
            <li key={n.id} className="flex gap-3 border-t border-hair py-2.5">
              <span className="mono text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <span><span className="display text-lg">{n.label}</span>{n.sub && <span className="mono mt-0.5 block text-mute">{n.sub}</span>}</span>
            </li>
          ))}
        </ol>
      </div>
    </Spec>
  );
}
