"use client";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { PROJECTS, TOOLKIT } from "@/lib/data";
import { Spec } from "./Spec";

/** Hover a technology: lines run to the projects where it was actually used. Evidence, not a skills bar. */
export default function ToolkitMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const toolRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const projRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [sel, setSel] = useState<{ name: string; projects: string[] } | null>(null);

  useLayoutEffect(() => {
    const s = svg.current!, w = wrap.current!;
    s.innerHTML = "";
    if (!sel || window.innerWidth < 900) return;
    const wb = w.getBoundingClientRect();
    const t = toolRefs.current[sel.name]?.getBoundingClientRect();
    if (!t) return;
    const x1 = t.right - wb.left, y1 = t.top + t.height / 2 - wb.top;
    sel.projects.forEach((slug, i) => {
      const pr = projRefs.current[slug]?.getBoundingClientRect();
      if (!pr) return;
      const x2 = pr.left - wb.left, y2 = pr.top + pr.height / 2 - wb.top, mid = x1 + (x2 - x1) * 0.5;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M${x1} ${y1} H${mid} V${y2} H${x2}`);
      path.setAttribute("fill", "none"); path.setAttribute("stroke", "var(--accent)"); path.setAttribute("stroke-width", "2");
      s.appendChild(path);
      const len = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.4, delay: i * 0.05, ease: "power2.out" });
    });
  }, [sel]);

  const hot = (slug: string) => !sel || sel.projects.includes(slug);

  return (
    <Spec name="ToolkitMap" id="EVIDENCE">
      <div ref={wrap} className="relative" onPointerLeave={() => setSel(null)}>
        <svg ref={svg} aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full max-[899px]:hidden" />
        <div className="grid12 gap-y-12">
          <div className="col-span-6 md:col-span-6 space-y-10">
            {TOOLKIT.map((g) => (
              <div key={g.id}>
                <h3 className="display border-b border-ink pb-2 text-[clamp(24px,3vw,44px)]">{g.label}</h3>
                <ul>
                  {g.items.map((it) => {
                    const on = sel?.name === it.name;
                    return (
                      <li key={it.name} className="border-b border-hair">
                        <button
                          ref={(el) => { toolRefs.current[it.name] = el; }}
                          onPointerEnter={() => setSel(it)} onFocus={() => setSel(it)} onClick={() => setSel(on ? null : it)}
                          aria-pressed={on} data-cursor={it.projects.length ? "TRACE →" : ""}
                          className={`flex w-full items-center justify-between py-2.5 text-left transition-colors ${on ? "text-accent-ink" : "hover:text-accent-ink"}`}
                        >
                          <span className="text-lg">{it.name}</span>
                          <span className="mono text-mute">{it.projects.length ? `USED IN ${it.projects.length}${it.also ? " + MORE" : ""}` : it.also ? "SHIPPED WORK" : "TOOLING"}</span>
                        </button>
                        {on && (
                          <div className="mono flex flex-wrap gap-x-3 gap-y-1 pb-2 text-accent-ink">
                            <span className="min-[900px]:hidden">{it.projects.map((s) => `→ ${PROJECTS.find((p) => p.slug === s)?.name}`).join("  ")}</span>
                            {it.also && <span className="text-mute">ALSO: {it.also.join(", ")}</span>}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="col-span-6 md:col-span-4 md:col-start-9 max-[899px]:hidden md:sticky md:top-24 md:self-start">
            <div className="mono mb-3 text-mute">EVIDENCE / WHERE IT WAS USED</div>
            <ul>
              {PROJECTS.map((p) => (
                <li key={p.slug} className="border-b border-hair">
                  <Link ref={(el) => { projRefs.current[p.slug] = el; }} href={`/work/${p.slug}`}
                    className={`flex items-center justify-between py-3 transition-opacity ${hot(p.slug) ? "opacity-100" : "opacity-25"}`} data-cursor="OPEN FIG. →">
                    <span className="display text-2xl">{p.name}</span><span className="mono text-mute">FIG. {p.fig}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Spec>
  );
}
