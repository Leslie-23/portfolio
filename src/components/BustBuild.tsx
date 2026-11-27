"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import LiveBust from "./LiveBust";

type Mesh = { w: number; h: number; p: number[]; t: number[] };

// What falls in. Each one is something Leslie has actually written code in, or built with.
const LABELS = [
  "Data structures", "Algorithms", "C++", "C#", ".NET", "Java", "Python", "JavaScript", "TypeScript",
  "React", "Node.js", "MongoDB", "PostgreSQL", "Docker", "Next.js", "React Native", "System design", "Redis",
];

const NOSE = { x: 0.4, y: 0.575 };   // where the face is "finished": the last facets land here
const BLUR_W = 210;                  // width the portrait is shrunk to before being stretched back: smaller = softer
const PAD = 0.5;                      // the canvas extends this much beyond the portrait on every side
const KEY = "bust-built";
/** Testing: false = play on every load. Set to true to play once per browser session. */
const PLAY_ONCE = false;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** The portrait, built from its own triangles. On phones the same animation runs as the faint background behind the text. (Currently set to replay on every load, see PLAY_ONCE.) They arrive from every direction (360°), the outer edge of the head
 *  first and the nose last, with the skills Leslie works in riding in on some of them. One-shot: plays once per
 *  session, any key or click skips it, and the real portrait is always underneath. */
export default function BustBuild({ className = "" }: { className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"pending" | "playing" | "done">("pending");
  const [live, setLive] = useState(false);       // the animated portrait has taken over from the still one
  const onLive = useCallback(() => setLive(true), []);

  useEffect(() => {
    let seen = false;
    if (PLAY_ONCE) { try { seen = sessionStorage.getItem(KEY) === "1"; } catch {} }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage and reduced-motion are only known on the client
    if (seen || reduced) { setState("done"); return; }

    let raf = 0, cancelled = false, skip = false;
    const finish = () => { if (PLAY_ONCE) { try { sessionStorage.setItem(KEY, "1"); } catch {} } setState("done"); };

    const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new window.Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    Promise.all([fetch("/bust-mesh.json").then((r) => r.json() as Promise<Mesh>), loadImg("/portrait/leslie.png")]).then(([m, photo]) => {
      if (cancelled) return;
      const canvas = cv.current!, box = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(2, devicePixelRatio || 1);
      const cssW = box.width * (1 + PAD * 2), cssH = box.height * (1 + PAD * 2);
      canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
      const x = canvas.getContext("2d")!;
      const s = (box.width / m.w) * dpr;               // mesh unit -> canvas pixels
      const ox = box.width * PAD * dpr, oy = box.height * PAD * dpr;
      const nx = NOSE.x * m.w, ny = NOSE.y * m.h;

      // the real portrait, a little soft: shrunk, then stretched back up (works in every browser, no canvas filters)
      const small = document.createElement("canvas"); small.width = BLUR_W; small.height = Math.round((BLUR_W * photo.height) / photo.width);
      small.getContext("2d")!.drawImage(photo, 0, 0, small.width, small.height);
      const soft = document.createElement("canvas"); soft.width = Math.round(box.width * dpr); soft.height = Math.round((soft.width * photo.height) / photo.width);
      const sx = soft.getContext("2d")!; sx.imageSmoothingEnabled = true; sx.imageSmoothingQuality = "high"; sx.drawImage(small, 0, 0, soft.width, soft.height);
      const fill = x.createPattern(soft, "no-repeat")!;
      fill.setTransform(new DOMMatrix().scale(m.w / soft.width, m.w / soft.width));   // pattern now spans mesh space

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
      // pick triangles to carry labels: spread evenly around the circle, well away from the nose so they never crowd it
      const cands = tris.filter((t) => t.d / dmax > 0.4).sort((p, q) => p.ang - q.ang);
      LABELS.forEach((label, i) => { const pick = cands[Math.floor(((i + 0.5) / LABELS.length) * cands.length)]; if (pick) pick.label = label; });

      const R = Math.hypot(cssW, cssH) / 2 * dpr * 0.62;  // how far out they start
      const total = BASE + SPREAD + 0.22 + 1.0;
      const start = performance.now();
      setState("playing");

      const frame = (now: number) => {
        if (cancelled) return;
        const t = (now - start) / 1000;
        x.clearRect(0, 0, canvas.width, canvas.height);
        const chips: { px: number; py: number; a: number; z: number; label: string }[] = [];
        for (const tr of tris) {
          const k = Math.min(1, Math.max(0, (t - tr.t0) / tr.dur));
          if (k <= 0) continue;
          const e = easeOut(k), inv = 1 - e;
          // start on a ray out from the nose, through this triangle's own position, so everything converges on the face
          const sx = tr.cx + Math.cos(tr.ang) * (R / s) * 1.0, sy = tr.cy + Math.sin(tr.ang) * (R / s) * 1.0;
          const cx = tr.cx + (sx - tr.cx) * inv, cy = tr.cy + (sy - tr.cy) * inv;
          const rot = tr.rot * inv, sc = 0.55 + 0.45 * e;
          const cr = Math.cos(rot) * sc, sr = Math.sin(rot) * sc;
          // map mesh space -> canvas, rotated and scaled about this triangle's own centre, so the picture travels with the facet
          x.setTransform(s * cr, s * sr, -s * sr, s * cr, ox + s * (cx - tr.cx * cr + tr.cy * sr), oy + s * (cy - tr.cx * sr - tr.cy * cr));
          x.beginPath(); x.moveTo(m.p[tr.a], m.p[tr.a + 1]); x.lineTo(m.p[tr.b], m.p[tr.b + 1]); x.lineTo(m.p[tr.c], m.p[tr.c + 1]); x.closePath();
          x.globalAlpha = Math.min(1, k * 3);
          x.fillStyle = x.strokeStyle = fill; x.lineWidth = 0.9 / s * dpr * 0.6; x.fill(); x.stroke(); x.globalAlpha = 1;
          // a brief flash of the accent as a facet locks into place
          if (k > 0.9 && t - tr.t0 - tr.dur < 0.22) {
            const f = 1 - Math.min(1, (t - (tr.t0 + tr.dur * 0.9)) / (0.22 + tr.dur * 0.1));
            if (f > 0) { x.fillStyle = `rgba(52,187,120,${0.28 * f})`; x.fill(); }
          }
          x.setTransform(1, 0, 0, 1, 0, 0);
          if (tr.label && k < 1) chips.push({ px: ox + cx * s, py: oy + cy * s, a: Math.min(1, k * 6) * (k < 0.8 ? 1 : Math.max(0, 1 - (k - 0.8) / 0.2)), z: 0.8 + 0.5 * e, label: tr.label });
        }
        // labels ride along upright, grow as they near the face, and stay readable until the last moment
        const base = (innerWidth < 640 ? 14 : 20) * dpr;
        x.textBaseline = "middle"; x.textAlign = "center";
        for (const c of chips) {
          const fs = base * c.z;
          x.font = `600 ${fs}px ui-monospace, "SF Mono", Menlo, monospace`;
          const w = x.measureText(c.label).width + fs * 1.3, h = fs * 1.9;
          x.globalAlpha = c.a;
          x.shadowColor = "rgba(0,0,0,0.18)"; x.shadowBlur = fs * 0.6; x.shadowOffsetY = fs * 0.2;
          x.fillStyle = "#fbfbf9"; x.beginPath(); x.roundRect(c.px - w / 2, c.py - h / 2, w, h, fs * 0.45); x.fill();
          x.shadowColor = "transparent"; x.shadowBlur = 0; x.shadowOffsetY = 0;
          x.strokeStyle = "#111"; x.lineWidth = Math.max(1, fs * 0.09); x.stroke();
          x.fillStyle = "#34bb78"; x.beginPath(); x.arc(c.px - w / 2 + fs * 0.55, c.py, fs * 0.17, 0, Math.PI * 2); x.fill();
          x.fillStyle = "#111"; x.fillText(c.label, c.px + fs * 0.25, c.py + fs * 0.04);
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
    <div data-state={state} className={`${className} max-lg:opacity-[0.55] max-lg:mix-blend-multiply max-lg:transition-opacity max-lg:duration-[900ms] max-lg:data-[state=playing]:z-20 max-lg:data-[state=done]:opacity-[0.16] max-lg:[-webkit-mask-image:radial-gradient(ellipse_85%_80%_at_55%_40%,#000_42%,transparent_95%)] max-lg:[mask-image:radial-gradient(ellipse_85%_80%_at_55%_40%,#000_42%,transparent_95%)]`}>
      {/* the real portrait: hidden while the build plays, then it fades in over the finished mesh */}
      <Image src="/portrait/leslie.png" alt="Leslie Paul Ajayi, a faceted greyscale portrait" fill priority sizes="(min-width: 1024px) 40vw, 70vw"
        className="bust-img object-contain object-bottom" style={{ opacity: state === "done" && !live ? 1 : 0, transition: state === "done" ? "opacity .6s ease" : "none" }} />
      <noscript><style>{`.bust-img{opacity:1!important}`}</style></noscript>
      {state === "done" && <LiveBust onReady={onLive} />}
      <canvas ref={cv} aria-hidden className="pointer-events-none absolute z-10"
        style={{ left: `${-PAD * 100}%`, top: `${-PAD * 100}%`, width: `${(1 + PAD * 2) * 100}%`, height: `${(1 + PAD * 2) * 100}%`, opacity: state === "done" ? 0 : 1, transition: state === "done" ? "opacity .6s ease" : "none" }} />
    </div>
  );
}
