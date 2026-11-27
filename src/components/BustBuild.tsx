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
/** Testing: a metallic flash and a glint on each facet as it locks into place. Set to false to go back to the quiet green flash. */
const GOLD_SHINE = true;
/** Which metal: "gold" or "silver" (only used while GOLD_SHINE is on). */
const METAL = "silver" as "gold" | "silver";
const PAL = METAL === "gold"
  ? { flash: "255,201,60", core: "255,251,225", mid: "255,214,84", edge: "255,190,40", ray: "255,243,190" }
  : { flash: "206,216,232", core: "255,255,255", mid: "196,210,235", edge: "170,190,225", ray: "240,246,255" };

/** Add ?bustdebug=1 to the address to see a small panel with the frame rate, canvas size and any error. For debugging on a real phone. */
const DBG = typeof location !== "undefined" && /[?&]bustdebug/.test(location.search);
const dbgLines: string[] = [];
const note = (m: string) => { if (DBG) { dbgLines.push(`${(performance.now() / 1000).toFixed(1)}s ${m}`); if (dbgLines.length > 9) dbgLines.shift(); } };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** The portrait, built from its own triangles. On phones the same animation runs as the faint background behind the text. (Currently set to replay on every load, see PLAY_ONCE.) They arrive from every direction (360°), the outer edge of the head
 *  first and the nose last, with the skills Leslie works in riding in on some of them. One-shot: plays once per
 *  session, any key or click skips it, and the real portrait is always underneath. */
export default function BustBuild({ className = "" }: { className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"pending" | "playing" | "done">("pending");
  const [isDesktop, setIsDesktop] = useState(false);   // the animated bust is for screens with a cursor; on phones it is only a faint background
  const [live, setLive] = useState(false);       // the animated portrait has taken over from the still one
  const onLive = useCallback(() => setLive(true), []);
  const onLost = useCallback(() => { setLive(false); note("webgl context lost: showing the still portrait"); }, []);   // the GPU dropped the animated bust (phones do this): show the still portrait again

  useEffect(() => {
    const q = matchMedia("(min-width: 1024px)"), f = () => setIsDesktop(q.matches);
    f(); q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    let cleanupDbg = () => {};
    let seen = false;
    if (PLAY_ONCE) { try { seen = sessionStorage.getItem(KEY) === "1"; } catch {} }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage and reduced-motion are only known on the client
    if (seen || reduced) { setState("done"); return; }

    let raf = 0, cancelled = false, skip = false, frames = 0;
    let panel: HTMLDivElement | null = null, tick = 0;
    if (DBG) {
      panel = document.createElement("div");
      panel.style.cssText = "position:fixed;left:6px;bottom:6px;z-index:99999;max-width:94vw;padding:6px 8px;background:rgba(0,0,0,.82);color:#9fe3b8;font:10px/1.35 ui-monospace,Menlo,monospace;white-space:pre-wrap;pointer-events:none;border-radius:6px";
      document.body.appendChild(panel);
      const onErr = (e: ErrorEvent) => note(`error: ${e.message}`); const onRej = (e: PromiseRejectionEvent) => note(`rejection: ${String(e.reason)}`);
      addEventListener("error", onErr); addEventListener("unhandledrejection", onRej);
      let last = performance.now();
      tick = window.setInterval(() => {
        const now = performance.now(), fps = (frames * 1000) / (now - last); frames = 0; last = now;
        const c = cv.current, gl = document.querySelector("canvas.cursor-pointer") as HTMLCanvasElement | null;
        panel!.textContent = `bust ${c ? c.width + "x" + c.height : "-"} dpr ${devicePixelRatio} ${innerWidth}px  ${fps.toFixed(0)} fps\nlive-bust canvas: ${gl ? gl.width + "x" + gl.height : "none"}\n${dbgLines.join("\n")}`;
      }, 500);
      cleanupDbg = () => { clearInterval(tick); panel?.remove(); removeEventListener("error", onErr); removeEventListener("unhandledrejection", onRej); };
    }
    const finish = () => { if (PLAY_ONCE) { try { sessionStorage.setItem(KEY, "1"); } catch {} } setState("done"); };

    const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new window.Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    Promise.all([fetch("/bust-mesh.json").then((r) => r.json() as Promise<Mesh>), loadImg("/portrait/leslie.png")]).then(([m, photo]) => {
      if (cancelled) return;
      const canvas = cv.current!, box = canvas.parentElement!.getBoundingClientRect();
      // phones: a smaller canvas, at lower resolution. It is a faint background there, and a 3-megapixel canvas redrawn
      // every frame is what made the build stutter on real devices.
      const phone = innerWidth < 1024;
      const pad = phone ? 0.22 : PAD, dpr = Math.min(phone ? 1.25 : 2, devicePixelRatio || 1);
      canvas.style.left = canvas.style.top = `${-pad * 100}%`; canvas.style.width = canvas.style.height = `${(1 + pad * 2) * 100}%`;
      const cssW = box.width * (1 + pad * 2), cssH = box.height * (1 + pad * 2);
      canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
      const x = canvas.getContext("2d")!;
      const bake = document.createElement("canvas"); bake.width = canvas.width; bake.height = canvas.height;   // facets that have landed are drawn here once
      const bx = bake.getContext("2d")!;
      const s = (box.width / m.w) * dpr;               // mesh unit -> canvas pixels
      const ox = box.width * pad * dpr, oy = box.height * pad * dpr;
      const nx = NOSE.x * m.w, ny = NOSE.y * m.h;

      // the real portrait, a little soft: shrunk, then stretched back up (works in every browser, no canvas filters)
      const small = document.createElement("canvas"); small.width = BLUR_W; small.height = Math.round((BLUR_W * photo.height) / photo.width);
      small.getContext("2d")!.drawImage(photo, 0, 0, small.width, small.height);
      const soft = document.createElement("canvas"); soft.width = Math.round(box.width * dpr); soft.height = Math.round((soft.width * photo.height) / photo.width);
      const sx = soft.getContext("2d")!; sx.imageSmoothingEnabled = true; sx.imageSmoothingQuality = "high"; sx.drawImage(small, 0, 0, soft.width, soft.height);
      const fill = x.createPattern(soft, "no-repeat")!;
      fill.setTransform(new DOMMatrix().scale(m.w / soft.width, m.w / soft.width));   // pattern now spans mesh space

      type Tri = { a: number; b: number; c: number; g: number; cx: number; cy: number; d: number; ang: number; t0: number; dur: number; rot: number; label?: string; baked?: boolean; done?: boolean };
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
      note(`build starts: ${canvas.width}x${canvas.height}px, ${tris.length} facets, ${phone ? "phone" : "desktop"} mode`);
      setState("playing");

      const FW = GOLD_SHINE ? 0.7 : 0.22;
      const flashAt = (tr: Tri, t: number) => (t - tr.t0 > tr.dur * 0.9 && t - tr.t0 - tr.dur < FW ? Math.max(0, 1 - (t - (tr.t0 + tr.dur * 0.9)) / (FW + tr.dur * 0.1)) : 0);
      const flashFill = (f: number) => (GOLD_SHINE ? `rgba(${PAL.flash},${(METAL === "gold" ? 0.5 : 0.62) * f})` : `rgba(52,187,120,${0.28 * f})`);
      const path = (c: CanvasRenderingContext2D, tr: Tri) => { c.beginPath(); c.moveTo(m.p[tr.a], m.p[tr.a + 1]); c.lineTo(m.p[tr.b], m.p[tr.b + 1]); c.lineTo(m.p[tr.c], m.p[tr.c + 1]); c.closePath(); };

      const frame = (now: number) => {
        if (cancelled) return;
        try { draw(now); frames++; } catch (err) { note(`draw error: ${err instanceof Error ? err.message : String(err)}`); finish(); }
      };
      const draw = (now: number) => {
        const t = (now - start) / 1000;
        x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, canvas.width, canvas.height); x.drawImage(bake, 0, 0);
        const chips: { px: number; py: number; a: number; z: number; label: string }[] = [];
        const glints: { px: number; py: number; a: number; r: number }[] = [];
        for (const tr of tris) {
          if (tr.done) continue;
          const k = Math.min(1, Math.max(0, (t - tr.t0) / tr.dur));
          if (k <= 0) continue;
          const f = flashAt(tr, t);
          if (tr.baked) {                                              // already in the baked layer: only the flash is left to draw
            if (f <= 0) { tr.done = true; continue; }
            x.setTransform(s, 0, 0, s, ox, oy); path(x, tr); x.fillStyle = flashFill(f); x.fill(); x.setTransform(1, 0, 0, 1, 0, 0);
            if (GOLD_SHINE && (tr.a % 70 === 0)) glints.push({ px: ox + tr.cx * s, py: oy + tr.cy * s, a: f, r: (9 + (tr.a % 5) * 3) * dpr });
            continue;
          }
          const e = easeOut(k), inv = 1 - e;
          // start on a ray out from the nose, through this triangle's own position, so everything converges on the face
          const sx = tr.cx + Math.cos(tr.ang) * (R / s) * 1.0, sy = tr.cy + Math.sin(tr.ang) * (R / s) * 1.0;
          const cx = tr.cx + (sx - tr.cx) * inv, cy = tr.cy + (sy - tr.cy) * inv;
          const rot = tr.rot * inv, sc = 0.55 + 0.45 * e;
          const cr = Math.cos(rot) * sc, sr = Math.sin(rot) * sc;
          // map mesh space -> canvas, rotated and scaled about this triangle's own centre, so the picture travels with the facet
          x.setTransform(s * cr, s * sr, -s * sr, s * cr, ox + s * (cx - tr.cx * cr + tr.cy * sr), oy + s * (cy - tr.cx * sr - tr.cy * cr));
          path(x, tr); x.globalAlpha = Math.min(1, k * 3);
          x.fillStyle = x.strokeStyle = fill; x.lineWidth = 0.9 / s * dpr * 0.6; x.fill(); x.stroke(); x.globalAlpha = 1;
          if (f > 0) {                                                 // a brief metallic flash as the facet locks into place
            x.fillStyle = flashFill(f); x.fill();
            if (GOLD_SHINE && (tr.a % 70 === 0)) glints.push({ px: ox + cx * s, py: oy + cy * s, a: f, r: (9 + (tr.a % 5) * 3) * dpr });
          }
          x.setTransform(1, 0, 0, 1, 0, 0);
          if (k >= 1) {                                                // landed: draw it once into the baked layer and never redraw its picture
            bx.setTransform(s, 0, 0, s, ox, oy); path(bx, tr); bx.fillStyle = bx.strokeStyle = fill; bx.lineWidth = 0.9 / s * dpr * 0.6; bx.fill(); bx.stroke(); bx.setTransform(1, 0, 0, 1, 0, 0);
            tr.baked = true;
          }
          if (tr.label && k < 1) chips.push({ px: ox + cx * s, py: oy + cy * s, a: Math.min(1, k * 6) * (k < 0.8 ? 1 : Math.max(0, 1 - (k - 0.8) / 0.2)), z: 0.8 + 0.5 * e, label: tr.label });
        }
        // gold glints: a soft glow with a four-point star, drawn in screen space over the finished facets
        for (const g of glints) {
          const rr = g.r * (0.55 + 0.9 * g.a);
          const grad = x.createRadialGradient(g.px, g.py, 0, g.px, g.py, rr);
          grad.addColorStop(0, `rgba(${PAL.core},${0.95 * g.a})`); grad.addColorStop(0.3, `rgba(${PAL.mid},${0.6 * g.a})`); grad.addColorStop(1, `rgba(${PAL.edge},0)`);
          x.fillStyle = grad; x.beginPath(); x.arc(g.px, g.py, rr, 0, Math.PI * 2); x.fill();
          x.strokeStyle = `rgba(${PAL.ray},${0.9 * g.a})`; x.lineWidth = Math.max(1, dpr * 0.9); x.lineCap = "round";
          x.beginPath(); x.moveTo(g.px - rr * 1.5, g.py); x.lineTo(g.px + rr * 1.5, g.py); x.moveTo(g.px, g.py - rr * 1.5); x.lineTo(g.px, g.py + rr * 1.5); x.stroke();
        }
        // labels ride along upright, grow as they near the face, and stay readable until the last moment
        const base = (innerWidth < 640 ? 14 : 20) * dpr;
        x.textBaseline = "middle"; x.textAlign = "center";
        for (const c of chips) {
          const fs = base * c.z;
          x.font = `600 ${fs}px ui-monospace, "SF Mono", Menlo, monospace`;
          const w = x.measureText(c.label).width + fs * 1.3, h = fs * 1.9;
          x.globalAlpha = c.a;
          if (!phone) { x.shadowColor = "rgba(0,0,0,0.18)"; x.shadowBlur = fs * 0.6; x.shadowOffsetY = fs * 0.2; }
          x.fillStyle = "#fbfbf9"; x.beginPath(); if (x.roundRect) x.roundRect(c.px - w / 2, c.py - h / 2, w, h, fs * 0.45); else x.rect(c.px - w / 2, c.py - h / 2, w, h); x.fill();
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
    }).catch((err) => { note(`could not start: ${String(err)}`); setState("done"); });

    // a keypress or a mouse click skips; a touch never does (on a phone a touch is just a scroll or a tap)
    const onKey = () => { skip = true; };
    const onPointer = (e: PointerEvent) => { if (e.pointerType === "mouse") skip = true; };
    addEventListener("keydown", onKey); addEventListener("pointerdown", onPointer);
    return () => { cleanupDbg(); cancelled = true; cancelAnimationFrame(raf); removeEventListener("keydown", onKey); removeEventListener("pointerdown", onPointer); };
  }, []);

  return (
    <div data-state={state} className={`${className} max-lg:opacity-[0.55] max-lg:transition-opacity max-lg:duration-[900ms] max-lg:data-[state=playing]:z-20 max-lg:data-[state=done]:opacity-[0.16] max-lg:data-[state=done]:mix-blend-multiply max-lg:data-[state=done]:[-webkit-mask-image:radial-gradient(ellipse_85%_80%_at_55%_40%,#000_42%,transparent_95%)] max-lg:data-[state=done]:[mask-image:radial-gradient(ellipse_85%_80%_at_55%_40%,#000_42%,transparent_95%)]`}>
      {/* the real portrait: hidden while the build plays, then it fades in over the finished mesh */}
      <Image src="/portrait/leslie.png" alt="Leslie Paul Ajayi, a faceted greyscale portrait" fill priority sizes="(min-width: 1024px) 40vw, 70vw"
        className="bust-img object-contain object-bottom" style={{ opacity: state === "done" && !live ? 1 : 0, transition: state === "done" ? "opacity .6s ease" : "none" }} />
      <noscript><style>{`.bust-img{opacity:1!important}`}</style></noscript>
      {state === "done" && isDesktop && <LiveBust onReady={onLive} onLost={onLost} />}
      <canvas ref={cv} aria-hidden className="pointer-events-none absolute z-10"
        style={{ left: `${-PAD * 100}%`, top: `${-PAD * 100}%`, width: `${(1 + PAD * 2) * 100}%`, height: `${(1 + PAD * 2) * 100}%`, opacity: state === "done" ? 0 : 1, transition: state === "done" ? "opacity .6s ease" : "none" }} />
    </div>
  );
}
