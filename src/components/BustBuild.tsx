"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Mesh = { w: number; h: number; p: number[]; t: number[] };

// What falls in. Each one is something Leslie has actually written code in, or built with.
const LABELS = [
  "Data structures", "Algorithms", "C++", "C#", ".NET", "Java", "Python", "JavaScript", "TypeScript", "React",
  "Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Docker", "Socket.IO", "React Native", "Next.js", "System design",
  "REST APIs", "Git", "Linux", "MCP",
];

const NOSE = { x: 0.4, y: 0.575 };   // where the face is "finished": the last facets land here
const PAD = 0.5;                      // the canvas extends this much beyond the portrait on every side
const KEY = "bust-built";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** The portrait, built from its own triangles. They arrive from every direction (360°), the outer edge of the head
 *  first and the nose last, with the skills Leslie works in riding in on some of them. One-shot: plays once per
 *  session, any key or click skips it, and the real portrait is always underneath. */
export default function BustBuild({ className = "" }: { className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"pending" | "playing" | "done">("pending");

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch {}
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage and reduced-motion are only known on the client
    if (seen || reduced) { setState("done"); return; }

    let raf = 0, cancelled = false, skip = false;
    const finish = () => { try { sessionStorage.setItem(KEY, "1"); } catch {} setState("done"); };

    fetch("/bust-mesh.json").then((r) => r.json()).then((m: Mesh) => {
      if (cancelled) return;
      const canvas = cv.current!, box = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(2, devicePixelRatio || 1);
      const cssW = box.width * (1 + PAD * 2), cssH = box.height * (1 + PAD * 2);
      canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
      const x = canvas.getContext("2d")!;
      const s = (box.width / m.w) * dpr;               // mesh unit -> canvas pixels
      const ox = box.width * PAD * dpr, oy = box.height * PAD * dpr;
      const nx = NOSE.x * m.w, ny = NOSE.y * m.h;

      type Tri = { a: number; b: number; c: number; g: number; cx: number; cy: number; d: number; ang: number; t0: number; dur: number; rot: number; label?: string };
      const tris: Tri[] = [];
      let dmax = 0;
      for (let i = 0; i < m.t.length; i += 4) {
        const a = m.t[i] * 2, b = m.t[i + 1] * 2, c = m.t[i + 2] * 2;
        const cx = (m.p[a] + m.p[b] + m.p[c]) / 3, cy = (m.p[a + 1] + m.p[b + 1] + m.p[c + 1]) / 3;
        const d = Math.hypot(cx - nx, cy - ny); dmax = Math.max(dmax, d);
        tris.push({ a, b, c, g: m.t[i + 3], cx, cy, d, ang: Math.atan2(cy - ny, cx - nx), t0: 0, dur: 0, rot: 0 });
      }
      // seeded randomness so the build looks the same each time
      let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
      const SPREAD = 1.7, BASE = 0.15;                  // seconds
      for (const t of tris) {
        t.t0 = BASE + (1 - t.d / dmax) * SPREAD + rnd() * 0.22;   // farthest from the nose arrives first, the nose last
        t.dur = 0.7 + rnd() * 0.3;
        t.rot = (rnd() - 0.5) * Math.PI * 1.6;
      }
      // pick triangles to carry labels: spread around the circle, away from the very last (nose) ones
      const cands = tris.filter((t) => t.d / dmax > 0.22).sort((p, q) => p.ang - q.ang);
      LABELS.forEach((label, i) => { const pick = cands[Math.floor(((i + 0.5) / LABELS.length) * cands.length)]; if (pick) pick.label = label; });

      const R = Math.hypot(cssW, cssH) / 2 * dpr * 0.62;  // how far out they start
      const total = BASE + SPREAD + 0.22 + 1.0;
      const start = performance.now();
      setState("playing");

      const frame = (now: number) => {
        if (cancelled) return;
        const t = (now - start) / 1000;
        x.clearRect(0, 0, canvas.width, canvas.height);
        const chips: { px: number; py: number; a: number; label: string }[] = [];
        for (const tr of tris) {
          const k = Math.min(1, Math.max(0, (t - tr.t0) / tr.dur));
          if (k <= 0) continue;
          const e = easeOut(k), inv = 1 - e;
          // start on a ray out from the nose, through this triangle's own position, so everything converges on the face
          const sx = tr.cx + Math.cos(tr.ang) * (R / s) * 1.0, sy = tr.cy + Math.sin(tr.ang) * (R / s) * 1.0;
          const cx = tr.cx + (sx - tr.cx) * inv, cy = tr.cy + (sy - tr.cy) * inv;
          const rot = tr.rot * inv, sc = 0.55 + 0.45 * e;
          const cr = Math.cos(rot) * sc, sr = Math.sin(rot) * sc;
          const pt = (idx: number) => { const dx = m.p[idx] - tr.cx, dy = m.p[idx + 1] - tr.cy; return [ox + (cx + dx * cr - dy * sr) * s, oy + (cy + dx * sr + dy * cr) * s]; };
          const A = pt(tr.a), B = pt(tr.b), C = pt(tr.c);
          x.beginPath(); x.moveTo(A[0], A[1]); x.lineTo(B[0], B[1]); x.lineTo(C[0], C[1]); x.closePath();
          const g = tr.g;
          x.fillStyle = x.strokeStyle = `rgb(${g},${g},${g})`; x.globalAlpha = Math.min(1, k * 3);
          x.lineWidth = 0.7 * dpr; x.fill(); x.stroke(); x.globalAlpha = 1;
          // a brief flash of the accent as a facet locks into place
          if (k > 0.9 && t - tr.t0 - tr.dur < 0.22) {
            const f = 1 - Math.min(1, (t - (tr.t0 + tr.dur * 0.9)) / (0.22 + tr.dur * 0.1));
            if (f > 0) { x.fillStyle = `rgba(52,187,120,${0.32 * f})`; x.fill(); }
          }
          if (tr.label && k < 1) chips.push({ px: ox + cx * s, py: oy + cy * s, a: k < 0.55 ? 1 : Math.max(0, 1 - (k - 0.55) / 0.4), label: tr.label });
        }
        // labels ride along upright, then dissolve into the facet
        x.font = `500 ${11 * dpr}px ui-monospace, "SF Mono", Menlo, monospace`; x.textBaseline = "middle";
        for (const c of chips) {
          const w = x.measureText(c.label).width + 14 * dpr, h = 20 * dpr;
          x.globalAlpha = c.a; x.fillStyle = "#fbfbf9"; x.strokeStyle = "#111"; x.lineWidth = dpr;
          x.beginPath(); x.roundRect(c.px - w / 2, c.py - h / 2, w, h, 4 * dpr); x.fill(); x.stroke();
          x.fillStyle = "#111"; x.textAlign = "center"; x.fillText(c.label, c.px, c.py + dpr * 0.5);
        }
        x.globalAlpha = 1;
        if (skip || t >= total) { finish(); return; }
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }).catch(() => setState("done"));

    const onSkip = () => { skip = true; };
    addEventListener("keydown", onSkip); addEventListener("pointerdown", onSkip);
    return () => { cancelled = true; cancelAnimationFrame(raf); removeEventListener("keydown", onSkip); removeEventListener("pointerdown", onSkip); };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* the real portrait: hidden while the build plays, then it fades in over the finished mesh */}
      <Image src="/portrait/leslie.png" alt="Leslie Paul Ajayi, a faceted greyscale portrait" fill priority sizes="(min-width: 1024px) 40vw, 0px"
        className="bust-img object-contain object-bottom" style={{ opacity: state === "done" ? 1 : 0, transition: state === "done" ? "opacity .6s ease" : "none" }} />
      <noscript><style>{`.bust-img{opacity:1!important}`}</style></noscript>
      <canvas ref={cv} aria-hidden className="pointer-events-none absolute z-10"
        style={{ left: `${-PAD * 100}%`, top: `${-PAD * 100}%`, width: `${(1 + PAD * 2) * 100}%`, height: `${(1 + PAD * 2) * 100}%`, opacity: state === "done" ? 0 : 1, transition: state === "done" ? "opacity .6s ease" : "none" }} />
    </div>
  );
}
