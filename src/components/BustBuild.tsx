"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import LiveBust from "./LiveBust";
import { frameWatch, perfTier } from "@/lib/perf";

type Mesh = { w: number; h: number; p: number[]; t: number[] };

// What falls in. Each one is something Leslie has actually written code in, or built with.
const LABELS = [
  "Data structures", "Algorithms", "C++", "C#", ".NET", "Java", "Python", "JavaScript", "TypeScript",
  "React", "Node.js", "MongoDB", "PostgreSQL", "Docker", "Next.js", "React Native", "System design", "Redis",
];

const NOSE = { x: 0.4, y: 0.575 };   // where the face is "finished": the last facets land here
const BLUR_W = 210;                  // width the portrait is shrunk to before being stretched back: smaller = softer
const PAD = 0.5;                      // the canvas extends this much beyond the portrait on every side (less on phones)
const KEY = "bust-built";
/** Testing: false = play on every load. Set to true to play once per browser session. */
const PLAY_ONCE = false;
/** A metallic flash and a glint on each facet as it locks into place (METAL picks the colour). Set to false for the quiet green flash. */
const GOLD_SHINE = true;
/** Which metal: "gold" or "silver" (only used while GOLD_SHINE is on). */
const METAL = "silver" as "gold" | "silver";
const PAL = METAL === "gold"
  ? { flash: [255, 201, 60], core: "255,251,225", mid: "255,214,84", edge: "255,190,40", ray: "255,243,190" }
  : { flash: [206, 216, 232], core: "255,255,255", mid: "196,210,235", edge: "170,190,225", ray: "240,246,255" };
const FLASH_A = GOLD_SHINE ? (METAL === "gold" ? 0.5 : 0.62) : 0.28;        // how strongly a landing facet flashes
const FLASH_RGB = GOLD_SHINE ? PAL.flash : [52, 187, 120];
const FW = GOLD_SHINE ? 0.7 : 0.22;                                           // how long the flash lasts, in seconds

/** Add ?bustdebug=1 to the address to see a small panel with the frame rate, canvas size and any error. For debugging on a real phone. */
const DBG = typeof location !== "undefined" && /[?&]bustdebug/.test(location.search);
const dbgLines: string[] = [];
const note = (m: string) => { if (DBG) { dbgLines.push(`${(performance.now() / 1000).toFixed(1)}s ${m}`); if (dbgLines.length > 9) dbgLines.shift(); } };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// The build runs on the GPU: every triangle's flight (where it starts, how it spins, when it lands, its flash) is worked
// out in the vertex shader from one time value, so all ~2000 facets are drawn in a single call. Drawing them one by one
// with a pattern fill on a 2D canvas ran at about 10 fps on a real iPhone.
const VERT = `
precision highp float;
attribute vec2 aPos;        // this corner of the triangle, in mesh units
attribute vec2 aCen;        // the triangle's centre
attribute vec4 aT;          // lands at, takes, spins by, comes in along (angle from the nose)
uniform float uTime, uS, uR;
uniform vec2 uO, uCanvas, uTex;
varying vec2 vUv;
varying float vAlpha, vFlash;
const float FW = ${FW.toFixed(3)};
void main() {
  float k = clamp((uTime - aT.x) / aT.y, 0., 1.);
  float e = 1. - pow(1. - k, 3.), inv = 1. - e;
  vec2 start = aCen + vec2(cos(aT.w), sin(aT.w)) * uR;          // out on a ray from the nose, so everything converges on the face
  vec2 c = aCen + (start - aCen) * inv;
  float rot = aT.z * inv, sc = .55 + .45 * e;
  float cr = cos(rot) * sc, sr = sin(rot) * sc;
  vec2 d = aPos - aCen;
  vec2 p = c + vec2(cr * d.x - sr * d.y, sr * d.x + cr * d.y);    // turned and scaled about its own centre, so the picture travels with the facet
  vec2 px = uO + p * uS;
  gl_Position = vec4(px.x / uCanvas.x * 2. - 1., 1. - px.y / uCanvas.y * 2., 0., 1.);
  vUv = aPos / uTex;
  vAlpha = k > 0. ? min(1., k * 3.) : 0.;
  float el = uTime - aT.x;
  vFlash = (el > aT.y * .9 && el - aT.y < FW) ? max(0., 1. - (uTime - (aT.x + aT.y * .9)) / (FW + aT.y * .1)) : 0.;
}`;
const FRAG = `
precision highp float;
uniform sampler2D uImg;
uniform vec3 uFlash;
uniform float uFlashA;
varying vec2 vUv;
varying float vAlpha, vFlash;
void main() {
  if (vAlpha <= 0.) discard;
  vec4 c = texture2D(uImg, vUv);                                  // premultiplied
  float a = c.a * vAlpha;
  vec3 rgb = c.rgb / max(c.a, .001);
  rgb = mix(rgb, uFlash, uFlashA * vFlash);
  gl_FragColor = vec4(rgb * a, a);
}`;

/** The portrait, built from its own triangles. They arrive from every direction (360°), the outer edge of the head
 *  first and the nose last, with the skills Leslie works in riding in on some of them, and each flashes as it locks
 *  into place. On phones the same animation runs as the faint background behind the text. Any key or a mouse click
 *  skips it, a touch never does, and the real portrait is always underneath. (Replays on every load: see PLAY_ONCE.) */
export default function BustBuild({ className = "" }: { className?: string }) {
  const cv = useRef<HTMLCanvasElement>(null);          // labels and glints, drawn flat over the GPU layer
  const glc = useRef<HTMLCanvasElement>(null);         // the triangles
  const [state, setState] = useState<"pending" | "playing" | "done">("pending");
  const [isDesktop, setIsDesktop] = useState(false);   // the animated bust is for screens with a cursor; on phones it is only a faint background
  const [live, setLive] = useState(false);             // the animated portrait has taken over from the still one
  const onLive = useCallback(() => setLive(true), []);
  const onLost = useCallback(() => { setLive(false); note("webgl context lost: showing the still portrait"); }, []);   // phones reclaim the GPU under memory pressure

  useEffect(() => {
    const q = matchMedia("(min-width: 1024px)"), f = () => setIsDesktop(q.matches && perfTier() > 0);   // the living bust is for desktops that can afford it
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
    let nFrames = 0, worst = 0, lastT = 0, startedAt = 0, summarised = false;
    let panel: HTMLDivElement | null = null, tick = 0;
    if (DBG) {
      panel = document.createElement("div");
      panel.style.cssText = "position:fixed;right:6px;bottom:6px;z-index:99999;max-width:90vw;padding:6px 8px;background:rgba(0,0,0,.82);color:#9fe3b8;font:10px/1.35 ui-monospace,Menlo,monospace;white-space:pre-wrap;pointer-events:none;border-radius:6px";
      document.body.appendChild(panel);
      const onVis = () => note(`page ${document.hidden ? "hidden" : "visible"}`);
      const onShow = (e: PageTransitionEvent) => note(`pageshow${e.persisted ? " (restored from cache)" : ""}`);
      const onSize = () => note(`resize ${innerWidth}x${innerHeight}`);
      document.addEventListener("visibilitychange", onVis); addEventListener("pageshow", onShow); addEventListener("resize", onSize);
      const onErr = (e: ErrorEvent) => note(`error: ${e.message}`); const onRej = (e: PromiseRejectionEvent) => note(`rejection: ${String(e.reason)}`);
      addEventListener("error", onErr); addEventListener("unhandledrejection", onRej);
      let last = performance.now();
      tick = window.setInterval(() => {
        const now = performance.now(), fps = (frames * 1000) / (now - last); frames = 0; last = now;
        const c = glc.current, lv = document.querySelector("canvas.cursor-pointer") as HTMLCanvasElement | null;
        panel!.textContent = `bust ${c ? c.width + "x" + c.height : "-"} dpr ${devicePixelRatio} ${innerWidth}px  ${fps.toFixed(0)} fps\nlive-bust canvas: ${lv ? lv.width + "x" + lv.height : "none"}\n${dbgLines.join("\n")}`;
      }, 500);
      cleanupDbg = () => { document.removeEventListener("visibilitychange", onVis); removeEventListener("pageshow", onShow); removeEventListener("resize", onSize); clearInterval(tick); panel?.remove(); removeEventListener("error", onErr); removeEventListener("unhandledrejection", onRej); };
    }
    const finish = () => {
      if (DBG && !summarised && startedAt) {
        summarised = true; const ms = performance.now() - startedAt;
        note(`${skip ? "skipped by input" : "finished"}: ${nFrames} frames in ${Math.round(ms)}ms = ${((nFrames * 1000) / ms).toFixed(0)} fps avg, worst gap ${Math.round(worst)}ms`);
      }
      if (PLAY_ONCE) { try { sessionStorage.setItem(KEY, "1"); } catch {} }
      setState("done");
    };

    const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new window.Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    Promise.all([fetch("/bust-mesh.json").then((r) => r.json() as Promise<Mesh>), loadImg("/portrait/leslie.png")]).then(([m, photo]) => {
      if (cancelled) return;
      const glCanvas = glc.current!, overlay = cv.current!, box = overlay.parentElement!.getBoundingClientRect();
      const phone = innerWidth < 1024, tier = perfTier();
      // weaker devices get a smaller canvas (less to fill) and a lower pixel density; the build also watches its own frame rate below
      const pad = phone || tier === 0 ? 0.22 : tier === 1 ? 0.35 : PAD;
      const dpr0 = Math.min(phone ? 1.5 : 2, tier === 0 ? 1 : tier === 1 ? 1.25 : 2, devicePixelRatio || 1);
      let q = 1, dp = dpr0;                              // q: resolution scale, stepped down if frames run slow
      const cssW = box.width * (1 + pad * 2), cssH = box.height * (1 + pad * 2);
      for (const c of [glCanvas, overlay]) {
        c.style.left = c.style.top = `${-pad * 100}%`; c.style.width = c.style.height = `${(1 + pad * 2) * 100}%`;
        c.width = Math.round(cssW * dp); c.height = Math.round(cssH * dp);
      }
      const gl = glCanvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
      if (!gl) { note("no WebGL: skipping the build, showing the still portrait"); finish(); return; }
      const x = overlay.getContext("2d")!;
      let s = (box.width / m.w) * dp;                  // mesh unit -> canvas pixels
      let ox = box.width * pad * dp, oy = box.height * pad * dp;
      const nx = NOSE.x * m.w, ny = NOSE.y * m.h;

      // the real portrait, a little soft: shrunk, then stretched back up. This is the picture on every facet.
      const small = document.createElement("canvas"); small.width = BLUR_W; small.height = Math.round((BLUR_W * photo.height) / photo.width);
      small.getContext("2d")!.drawImage(photo, 0, 0, small.width, small.height);
      const soft = document.createElement("canvas"); soft.width = Math.min(Math.round(box.width * dpr0), tier === 2 ? 1400 : 720);   // the picture on the facets is soft anyway: no need for more than this soft.height = Math.round((soft.width * photo.height) / photo.width);
      const sx = soft.getContext("2d")!; sx.imageSmoothingEnabled = true; sx.imageSmoothingQuality = "high"; sx.drawImage(small, 0, 0, soft.width, soft.height);

      type Tri = { a: number; b: number; c: number; cx: number; cy: number; d: number; ang: number; t0: number; dur: number; rot: number; label?: string };
      const tris: Tri[] = [];
      let dmax = 0;
      for (let i = 0; i < m.t.length; i += 4) {
        const a = m.t[i] * 2, b = m.t[i + 1] * 2, c = m.t[i + 2] * 2;
        const cx = (m.p[a] + m.p[b] + m.p[c]) / 3, cy = (m.p[a + 1] + m.p[b + 1] + m.p[c + 1]) / 3;
        const d = Math.hypot(cx - nx, cy - ny); dmax = Math.max(dmax, d);
        tris.push({ a, b, c, cx, cy, d, ang: Math.atan2(cy - ny, cx - nx), t0: 0, dur: 0, rot: 0 });
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

      // ---- the GPU side ----
      const sh = (type: number, src: string) => { const o = gl.createShader(type)!; gl.shaderSource(o, src); gl.compileShader(o); return o; };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { note(`shader failed: ${gl.getProgramInfoLog(prog)}`); finish(); return; }
      gl.useProgram(prog);
      const data = new Float32Array(tris.length * 3 * 8);
      tris.forEach((t, i) => { [t.a, t.b, t.c].forEach((v, j) => data.set([m.p[v], m.p[v + 1], t.cx, t.cy, t.t0, t.dur, t.rot, t.ang], (i * 3 + j) * 8)); });
      const vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const attr = (name: string, size: number, off: number) => { const l = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, size, gl.FLOAT, false, 32, off * 4); };
      attr("aPos", 2, 0); attr("aCen", 2, 2); attr("aT", 4, 4);
      const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, soft);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      let R = Math.hypot(cssW, cssH) / 2 * dp * 0.62;    // how far out they start, in canvas pixels
      const U = (n: string) => gl.getUniformLocation(prog, n);
      const uTime = U("uTime");
      gl.uniform1f(U("uS"), s); gl.uniform1f(U("uR"), R / s);
      gl.uniform2f(U("uO"), ox, oy); gl.uniform2f(U("uCanvas"), glCanvas.width, glCanvas.height);
      gl.uniform2f(U("uTex"), m.w, (m.w * soft.height) / soft.width);
      gl.uniform3f(U("uFlash"), FLASH_RGB[0] / 255, FLASH_RGB[1] / 255, FLASH_RGB[2] / 255); gl.uniform1f(U("uFlashA"), FLASH_A);
      gl.viewport(0, 0, glCanvas.width, glCanvas.height);
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      const applyScale = (nq: number) => {
        q = nq; dp = dpr0 * q;
        for (const c of [glCanvas, overlay]) { c.width = Math.round(cssW * dp); c.height = Math.round(cssH * dp); }
        s = (box.width / m.w) * dp; ox = box.width * pad * dp; oy = box.height * pad * dp; R = Math.hypot(cssW, cssH) / 2 * dp * 0.62;
        gl.uniform1f(U("uS"), s); gl.uniform1f(U("uR"), R / s); gl.uniform2f(U("uO"), ox, oy); gl.uniform2f(U("uCanvas"), glCanvas.width, glCanvas.height);
        gl.viewport(0, 0, glCanvas.width, glCanvas.height);
        note(`slow frames: resolution scale ${q.toFixed(2)} (${glCanvas.width}x${glCanvas.height})`);
      };
      const watch = frameWatch({ slowMs: 34, fastMs: 0 });   // below ~30 fps: step the resolution down (never back up mid-build)
      let tooSlow = 0, drewOverlay = false;
      glCanvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); note("webgl context lost during the build"); skip = true; });

      // ---- the flat side: only the labels and a few glints are drawn in 2D, about 60 facets a frame ----
      const special = tris.filter((t) => t.label || (GOLD_SHINE && t.a % 70 === 0));
      const total = BASE + SPREAD + 0.22 + 1.0;
      const start = performance.now(); startedAt = start;
      note(`build starts: ${glCanvas.width}x${glCanvas.height}px, ${tris.length} facets, ${phone ? "phone" : "desktop"} mode, tier ${tier}, on the GPU`);
      setState("playing");

      const frame = (now: number) => {
        if (cancelled) return;
        if (lastT) worst = Math.max(worst, now - lastT);
        lastT = now; nFrames++;
        if (watch.tick(now) === -1) { if (q > 0.5) applyScale(Math.max(0.5, q * 0.78)); }
        if (q <= 0.5 && watch.avg > 55) { if (++tooSlow > 12) { note("device too slow: ending the build early"); skip = true; } } else tooSlow = 0;
        try { draw(now); frames++; } catch (err) { note(`draw error: ${err instanceof Error ? err.message : String(err)}`); finish(); }
      };
      const draw = (now: number) => {
        const t = (now - start) / 1000;
        gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uTime, t); gl.drawArrays(gl.TRIANGLES, 0, tris.length * 3);

        x.setTransform(1, 0, 0, 1, 0, 0); if (drewOverlay) { x.clearRect(0, 0, overlay.width, overlay.height); drewOverlay = false; }
        const chips: { px: number; py: number; a: number; z: number; label: string }[] = [];
        for (const tr of special) {
          const k = Math.min(1, Math.max(0, (t - tr.t0) / tr.dur));
          if (k <= 0) continue;
          const e = easeOut(k), inv = 1 - e;
          const sxm = tr.cx + Math.cos(tr.ang) * (R / s), sym = tr.cy + Math.sin(tr.ang) * (R / s);
          const cx = tr.cx + (sxm - tr.cx) * inv, cy = tr.cy + (sym - tr.cy) * inv;
          if (tr.label && k < 1) chips.push({ px: ox + cx * s, py: oy + cy * s, a: Math.min(1, k * 6) * (k < 0.8 ? 1 : Math.max(0, 1 - (k - 0.8) / 0.2)), z: 0.8 + 0.5 * e, label: tr.label });
          // some facets also throw a glint as they lock in: a soft glow with a four-point star
          if (GOLD_SHINE && tier === 2 && q >= 0.78 && tr.a % 70 === 0 && k > 0.9 && t - tr.t0 - tr.dur < FW) {
            const f = 1 - Math.min(1, (t - (tr.t0 + tr.dur * 0.9)) / (FW + tr.dur * 0.1));
            if (f > 0) {
              const gx = ox + cx * s, gy = oy + cy * s, rr = (9 + (tr.a % 5) * 3) * dp * (0.55 + 0.9 * f);
              const grad = x.createRadialGradient(gx, gy, 0, gx, gy, rr);
              grad.addColorStop(0, `rgba(${PAL.core},${0.95 * f})`); grad.addColorStop(0.3, `rgba(${PAL.mid},${0.6 * f})`); grad.addColorStop(1, `rgba(${PAL.edge},0)`);
              x.fillStyle = grad; x.beginPath(); x.arc(gx, gy, rr, 0, Math.PI * 2); x.fill();
              x.strokeStyle = `rgba(${PAL.ray},${0.9 * f})`; x.lineWidth = Math.max(1, dp * 0.9); x.lineCap = "round";
              x.beginPath(); x.moveTo(gx - rr * 1.5, gy); x.lineTo(gx + rr * 1.5, gy); x.moveTo(gx, gy - rr * 1.5); x.lineTo(gx, gy + rr * 1.5); x.stroke(); drewOverlay = true;
            }
          }
        }
        // labels ride along upright, grow as they near the face, and stay readable until the last moment
        const base = (innerWidth < 640 ? 14 : 20) * dp;
        x.textBaseline = "middle"; x.textAlign = "center";
        if (chips.length) drewOverlay = true;
        for (const c of chips) {
          const fs = base * c.z;
          x.font = `600 ${fs}px ui-monospace, "SF Mono", Menlo, monospace`;
          const w = x.measureText(c.label).width + fs * 1.3, h = fs * 1.9;
          x.globalAlpha = c.a;
          if (!phone && tier > 0) { x.shadowColor = "rgba(0,0,0,0.18)"; x.shadowBlur = fs * 0.6; x.shadowOffsetY = fs * 0.2; }
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

  const layer = { left: `${-PAD * 100}%`, top: `${-PAD * 100}%`, width: `${(1 + PAD * 2) * 100}%`, height: `${(1 + PAD * 2) * 100}%`, opacity: state === "done" ? 0 : 1, transition: state === "done" ? "opacity .6s ease" : "none" } as const;
  return (
    <div data-state={state} className={`${className} max-lg:opacity-[0.55] max-lg:transition-opacity max-lg:duration-[900ms] max-lg:data-[state=playing]:z-20 max-lg:data-[state=done]:opacity-[0.16] max-lg:data-[state=done]:mix-blend-multiply max-lg:data-[state=done]:[-webkit-mask-image:radial-gradient(ellipse_85%_80%_at_55%_40%,#000_42%,transparent_95%)] max-lg:data-[state=done]:[mask-image:radial-gradient(ellipse_85%_80%_at_55%_40%,#000_42%,transparent_95%)]`}>
      {/* the real portrait: hidden while the build plays, then it fades in over the finished mesh */}
      <Image src="/portrait/leslie.png" alt="Leslie Paul Ajayi, a faceted greyscale portrait" fill priority sizes="(min-width: 1024px) 40vw, 70vw"
        className="bust-img object-contain object-bottom" style={{ opacity: state === "done" && !live ? 1 : 0, transition: state === "done" ? "opacity .6s ease" : "none" }} />
      <noscript><style>{`.bust-img{opacity:1!important}`}</style></noscript>
      {state === "done" && isDesktop && <LiveBust onReady={onLive} onLost={onLost} />}
      <canvas ref={glc} aria-hidden className="pointer-events-none absolute z-10" style={layer} />
      <canvas ref={cv} aria-hidden className="pointer-events-none absolute z-10" style={layer} />
    </div>
  );
}
