"use client";
import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { Spec } from "./Spec";

const ROWS = [
  { l: "FRONTEND", s: "React · Next.js · Expo" },
  { l: "BACKEND", s: "Node · Express · Fastify · Python" },
  { l: "CLOUD", s: "Vercel · Cloudflare · Render" },
  { l: "PRODUCT", s: "Payments · AI · system design" },
];

/** The toolkit assembles into one thing, driven by scroll. */
export default function ToolkitMachine() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set(".tm-line", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".tm-box", { opacity: 0, x: -24 });
      gsap.set(".tm-out", { opacity: 0, scale: 0.92, transformOrigin: "left center" });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 55%", scrub: 0.6 } });
      ROWS.forEach((_, i) => {
        tl.to(`.tm-box-${i}`, { opacity: 1, x: 0, duration: 1, ease: "back.out(1.5)" }, i * 0.9)
          .to(`.tm-line-${i}`, { strokeDashoffset: 0, duration: 1, ease: "none" }, i * 0.9 + 0.6);
      });
      tl.to(".tm-out", { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(2)" }, 4.4);
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <Spec name="ToolkitMachine" id="MACHINE">
      <div ref={root}>
        <svg viewBox="0 0 960 440" className="w-full" role="img" aria-label="Frontend, backend, cloud and product combine into: product engineer">
          {ROWS.map((r, i) => {
            const y = 20 + i * 104;
            return (
              <g key={r.l}>
                <path className={`tm-line tm-line-${i}`} pathLength={1} d={`M330 ${y + 40} H${520} V220 H620`} fill="none" stroke="var(--accent)" strokeWidth="2" />
                <g className={`tm-box tm-box-${i}`}>
                  <rect x="10" y={y} width="320" height="80" fill="var(--paper-3)" stroke="var(--ink)" strokeWidth="1.5" />
                  <rect x="10" y={y} width="8" height="80" fill="var(--accent)" />
                  <text x="36" y={y + 40} fontSize="34" fontWeight="400" fill="var(--ink)" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}>{r.l}</text>
                  <text x="36" y={y + 60} fontSize="12" fill="var(--mute)" style={{ fontFamily: "var(--font-mono-label)", textTransform: "uppercase" }}>{r.s}</text>
                </g>
              </g>
            );
          })}
          <g className="tm-out">
            <rect x="620" y="160" width="330" height="120" fill="var(--accent)" />
            <text x="644" y="214" fontSize="46" fontWeight="400" fill="var(--paper)" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}>PRODUCT</text>
            <text x="644" y="258" fontSize="46" fontWeight="400" fill="var(--paper)" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}>ENGINEER</text>
          </g>
        </svg>
      </div>
    </Spec>
  );
}
