"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GeoPath, GeoPermissibleObjects, GeoProjection } from "d3-geo";
import type { GlobeCls } from "@/lib/globe-data";
import { frameWatch, perfTier } from "@/lib/perf";

/** The footer artwork: a globe you can turn. It spins once, settles, and zooms in on West Africa; after that it is yours
 *  to drag. Hover (or tap) a country for its part in the story. The Gambia (born), Sierra Leone (grew up), Nigeria
 *  (family) and Ghana (home) are solid; seven more are places visited. Outlines are Natural Earth (public domain). */
const FOCUS = { lon: -1, lat: 9.5 };               // where it comes to rest
const ZOOM = 2.0;                                  // how far in it settles (1 = the whole globe)
const SPIN_MS = 3000, ZOOM_MS = 1500;
const D2R = Math.PI / 180;
const VISITED = "Mali, Burkina Faso, Guinea, Liberia, Ivory Coast, Togo and Benin";
// flags are flag-icons SVGs (MIT, see public/flags/LICENSE.txt), keyed by the country names in the map data
const FLAG: Record<string, string> = { Gambia: "gm", "Sierra Leone": "sl", Nigeria: "ng", Ghana: "gh", Mali: "ml", "Burkina Faso": "bf", Guinea: "gn", Liberia: "lr", "Côte d'Ivoire": "ci", Togo: "tg", Benin: "bj" };
const BEEN = [["Mali", "Mali"], ["Burkina Faso", "Burkina Faso"], ["Guinea", "Guinea"], ["Liberia", "Liberia"], ["Côte d'Ivoire", "Ivory Coast"], ["Togo", "Togo"], ["Benin", "Benin"]] as const;
// countries that wear their flag on the globe: the places visited, plus the four countries of the story: Gambia, Sierra Leone, Nigeria and Ghana
const WEAR = new Set<string>([...BEEN.map(([n]) => n), "Nigeria", "Sierra Leone", "Ghana", "Gambia"]);

const SAY: Record<string, string> = { born: "Born in The Gambia", grew: "Grew up in Sierra Leone", descent: "Of Nigerian descent", living: "Living in Ghana" };
type Feat = { name: string; cls: GlobeCls; geom: { type: "MultiPolygon"; coordinates: number[][][][] }; bbox: [number, number, number, number]; centroid: [number, number]; rad: number; rings: Ring[] };
/** One outline, kept as the sines and cosines of each point so a turning frame can be projected with plain arithmetic. */
type Ring = { n: number; sl: Float64Array; cl: Float64Array; sp: Float64Array; cp: Float64Array };
// where each story country's name is written when zoomed in: offset in px, and the text colour
const LABEL: Record<string, { text: string; dx: number; dy: number; on: "ink" | "bg" | "out" }> = {
  Gambia: { text: "THE GAMBIA", dx: -4, dy: -15, on: "out" }, "Sierra Leone": { text: "SIERRA LEONE", dx: -8, dy: 26, on: "out" },
  Ghana: { text: "GHANA", dx: 0, dy: 26, on: "out" }, Nigeria: { text: "NIGERIA", dx: 0, dy: 4, on: "out" },
};

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function OriginsGlobe() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const tipEl = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState("");
  const [tipFlag, setTipFlag] = useState("");
  const [ready, setReady] = useState(false);
  const replay = useRef<() => void>(() => {});
  const nudge = useRef<(dLon: number, dLat: number) => void>(() => {});

  useEffect(() => {
    const canvas = cv.current, wrap = box.current;
    if (!canvas || !wrap) return;
    let dead = false, raf = 0, W = 0, dpr = 1;
    // quality: the device tier sets the pixel density cap and how sharp the outlines are while it moves; the globe also watches its own
    // frame rate and lowers the resolution while turning (it always redraws sharp once it comes to rest)
    const tier = perfTier();
    let qMove = tier === 0 ? 0.6 : tier === 1 ? 0.8 : 1, qNow = 1, moving = false;
    const watch = frameWatch({ slowMs: 26, fastMs: 15, cooldownMs: 600 });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const view = { lon: FOCUS.lon, lat: FOCUS.lat, k: reduce ? ZOOM : 1 };
    let mode: "still" | "intro" = "still", t0 = 0, played = false;
    const vel = { x: 0, y: 0 };                                  // deg per ms, from a drag
    let drag: { x: number; y: number; t: number; moved: boolean; touch: boolean } | null = null;
    let hover = -1;
    const flags: Record<string, HTMLCanvasElement> = {};          // each visited country's flag, rendered once and painted onto it
    let feats: Feat[] = [], proj: GeoProjection, path: GeoPath, geoContains: (o: object, p: [number, number]) => boolean, geoDistance: (a: [number, number], b: [number, number]) => number;
    let sphere: GeoPermissibleObjects, grat: GeoPermissibleObjects, shade: HTMLCanvasElement | null = null;
    const css = getComputedStyle(wrap);
    const col = (n: string, f: string) => css.getPropertyValue(n).trim() || f;
    const C = { soft: col("--soft", "#f1f1ee"), line: col("--line", "#e4e4e1"), bg: col("--bg", "#fbfbf9"), ink: col("--ink", "#111112"), accent: col("--accent", "#34bb78") };
    let ctx: CanvasRenderingContext2D;

    const degPerPx = () => (1 / (W * 0.47 * view.k)) / D2R;

    // a dotted shadow across the lower right, drawn once per size: halftone dots that grow toward the dark side
    const buildShade = () => {
      shade = document.createElement("canvas"); shade.width = shade.height = Math.round(W * dpr);
      const g = shade.getContext("2d")!; g.scale(dpr, dpr); g.fillStyle = C.accent;
      const gap = 7;
      for (let y = gap / 2; y < W; y += gap) for (let x = gap / 2; x < W; x += gap) {
        const t = Math.hypot(x - W * 0.3, y - W * 0.26) / (W * 0.95);
        const s = clamp((t - 0.5) / 0.5, 0, 1), r = 1.7 * s * s * (3 - 2 * s);
        if (r > 0.15) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); }
      }
    };

    // the canvas is drawn at dpr * q pixels per CSS pixel: lower q while it moves on a slow device, 1 when it rests
    const setQ = (q: number) => {
      if (Math.abs(q - qNow) < 0.01 || !W) return;
      qNow = q; canvas.width = canvas.height = Math.round(W * dpr * q); ctx = canvas.getContext("2d")!;
    };

    // ---- the fast path, used while the globe is moving ----
    // d3 rotates, clips and smooths every point of every country on each frame, which is too much for a slow phone. While it turns we
    // project the points ourselves (the plain orthographic formulas) and cut each outline where it meets the horizon. When it comes to
    // rest the exact d3 drawing takes over, so the finished picture is unchanged.
    const toRing = (pts: number[][]): Ring => {
      const n = pts.length, r: Ring = { n, sl: new Float64Array(n), cl: new Float64Array(n), sp: new Float64Array(n), cp: new Float64Array(n) };
      for (let i = 0; i < n; i++) { const l = pts[i][0] * D2R, f = pts[i][1] * D2R; r.sl[i] = Math.sin(l); r.cl[i] = Math.cos(l); r.sp[i] = Math.sin(f); r.cp[i] = Math.cos(f); }
      return r;
    };
    let gratRings: Ring[] = [], maxN = 0;
    let SX = new Float64Array(0), SY = SX, SZ = SX;
    let sl0 = 0, cl0 = 1, sp0 = 0, cp0 = 1;                           // sine and cosine of where the globe is centred
    const project = (r: Ring) => {
      for (let j = 0; j < r.n; j++) {
        const sdl = r.sl[j] * cl0 - r.cl[j] * sl0, cdl = r.cl[j] * cl0 + r.sl[j] * sl0;
        SX[j] = r.cp[j] * sdl; SY[j] = cp0 * r.sp[j] - sp0 * r.cp[j] * cdl; SZ[j] = sp0 * r.sp[j] + cp0 * r.cp[j] * cdl;
      }
    };
    const bb = [0, 0, 0, 0];                                          // bounds of what the last trace drew
    /** Adds one outline to the current path. Where it leaves the visible side it follows the horizon, as the real drawing does. */
    const trace = (r: Ring, R: number, ring: boolean) => {
      project(r);
      const n = r.n, c = W / 2;
      let s0 = -1; for (let j = 0; j < n; j++) if (SZ[j] > 0) { s0 = j; break; }
      if (s0 < 0) return;
      const put = (x: number, y: number, first: boolean) => {
        const px = c + R * x, py = c - R * y;
        if (px < bb[0]) bb[0] = px; if (px > bb[2]) bb[2] = px; if (py < bb[1]) bb[1] = py; if (py > bb[3]) bb[3] = py;
        if (first) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      };
      const cross = (a: number, b: number): [number, number] => {      // where the edge a-b meets the horizon, pushed out onto the rim
        const t = SZ[a] / (SZ[a] - SZ[b]), x = SX[a] + (SX[b] - SX[a]) * t, y = SY[a] + (SY[b] - SY[a]) * t, l = Math.hypot(x, y) || 1;
        return [x / l, y / l];
      };
      if (!ring) {                                                     // an open line (the graticule): only the visible stretches, each cut at the horizon
        if (s0 > 0) { const [x, y] = cross(s0 - 1, s0); put(x, y, true); put(SX[s0], SY[s0], false); } else put(SX[0], SY[0], true);
        let was = true;
        for (let i = s0 + 1; i < n; i++) {
          const vis = SZ[i] > 0;
          if (vis && was) put(SX[i], SY[i], false);
          else if (!vis && was) { const [x, y] = cross(i - 1, i); put(x, y, false); }
          else if (vis && !was) { const [x, y] = cross(i - 1, i); put(x, y, true); put(SX[i], SY[i], false); }
          was = vis;
        }
        return;
      }
      put(SX[s0], SY[s0], true);
      let prev = s0, prevVis = true, exitAng = 0;
      const steps = n;
      for (let k = 1; k <= steps; k++) {
        const i = (s0 + k) % n, vis = SZ[i] > 0;
        if (vis && prevVis) put(SX[i], SY[i], false);
        else if (!vis && prevVis) { const [x, y] = cross(prev, i); put(x, y, false); exitAng = Math.atan2(-y, x); }
        else if (vis && !prevVis) {
          const [x, y] = cross(prev, i), a1 = Math.atan2(-y, x); let d = a1 - exitAng; d -= Math.round(d / (2 * Math.PI)) * 2 * Math.PI;
          ctx.arc(c, c, R, exitAng, exitAng + d, d < 0); put(x, y, false); put(SX[i], SY[i], false);
        }
        prev = i; prevVis = vis;
      }
      ctx.closePath();
    };

    const draw = () => {
      if (!ctx || !feats.length) return;
      const k = dpr * qNow;
      ctx.setTransform(k, 0, 0, k, 0, 0); ctx.clearRect(0, 0, W, W);
      const R = W * 0.47 * view.k;
      proj.precision(moving ? 3 : 0.5).translate([W / 2, W / 2]).scale(R).rotate([-view.lon, -view.lat]);
      const centre: [number, number] = [view.lon, view.lat];
      const fast = moving && gratRings.length > 0;
      if (fast) { sl0 = Math.sin(view.lon * D2R); cl0 = Math.cos(view.lon * D2R); sp0 = Math.sin(view.lat * D2R); cp0 = Math.cos(view.lat * D2R); }
      ctx.fillStyle = C.soft; ctx.beginPath(); path(sphere); ctx.fill();
      ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath();
      if (fast) for (const g of gratRings) trace(g, R, false); else path(grat);
      ctx.stroke();
      feats.forEach((f, i) => {
        if (geoDistance(f.centroid, centre) - f.rad > Math.PI / 2 + 0.03) return;   // wholly on the far side: nothing to draw
        ctx.beginPath();
        let bounds: [[number, number], [number, number]] | null = null;
        if (fast) { bb[0] = bb[1] = Infinity; bb[2] = bb[3] = -Infinity; for (const r of f.rings) trace(r, R, true); bounds = [[bb[0], bb[1]], [bb[2], bb[3]]]; } else path(f.geom);
        ctx.globalAlpha = f.cls === "visited" ? 0.4 : 1;
        ctx.fillStyle = f.cls === "living" || f.cls === "visited" ? C.accent : f.cls === "land" ? (i === hover ? "#cdd1cb" : "#dcdfda") : C.ink;
        ctx.fill(); ctx.globalAlpha = 1;
        const fl = WEAR.has(f.name) && !(moving && view.k < 1.35) ? flags[f.name] : undefined;   // flags are too small to see mid-spin
        if (fl) {                                                       // the flag, fitted to the country and clipped to its outline
          const [[x0, y0], [x1, y1]] = bounds ?? path.bounds(f.geom);
          if (x1 > x0 && y1 > y0 && isFinite(x0 + x1 + y0 + y1)) {
            ctx.save(); ctx.clip();                                     // clips to the outline just filled (the path is still current)
            const sc = Math.max((x1 - x0) / 320, (y1 - y0) / 240), w = 320 * sc, h = 240 * sc;
            ctx.drawImage(fl, x0 + (x1 - x0 - w) / 2, y0 + (y1 - y0 - h) / 2, w, h); ctx.restore();
          }
        }
        let lw = f.cls === "land" ? 0.8 : f.cls === "visited" ? 1.5 : 2;
        if (lw === 2) { const [[a0, b0], [a1, b1]] = bounds ?? path.bounds(f.geom); lw = clamp(Math.min(a1 - a0, b1 - b0) / 12, 0.7, 2); }   // a sliver like the Gambia gets a hairline, so its flag shows
        ctx.strokeStyle = f.cls === "land" || f.cls === "visited" ? C.bg : C.ink; ctx.lineWidth = lw; ctx.lineJoin = "round"; ctx.stroke();
      });
      if (hover >= 0 && feats[hover].cls !== "land") { ctx.beginPath(); path(feats[hover].geom); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.stroke(); }
      if (shade) { ctx.save(); ctx.beginPath(); ctx.arc(W / 2, W / 2, R, 0, Math.PI * 2); ctx.clip(); ctx.drawImage(shade, 0, 0, W, W); ctx.restore(); }
      ctx.strokeStyle = C.accent; ctx.globalAlpha = 0.45; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(W / 2, W / 2, R, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1;
      // the four names, once it is close enough to read them
      const a = clamp((view.k - 1.5) / 0.5, 0, 1);
      if (a > 0) {
        ctx.font = `600 ${W < 420 ? 9 : 10.5}px ui-monospace, "SF Mono", Menlo, monospace`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.globalAlpha = a;
        for (const f of feats) {
          const l = LABEL[f.name]; if (!l || f.cls === "land") continue;
          if (geoDistance(f.centroid, [view.lon, view.lat]) > Math.PI / 2 - 0.08) continue;
          const p = proj(f.centroid); if (!p) continue;
          const x = p[0] + l.dx, y = p[1] + l.dy;
          if (l.on === "out") { ctx.lineWidth = 4; ctx.strokeStyle = C.bg; ctx.strokeText(l.text, x, y); }
          ctx.fillStyle = l.on === "bg" ? "#fff" : C.ink; ctx.fillText(l.text, x, y);
        }
        ctx.globalAlpha = 1;
      }
    };

    let last = 0;
    const loop = (now: number) => {
      raf = 0;
      let again = false;
      if (mode === "intro") {
        const e = now - t0, s = clamp(e / SPIN_MS, 0, 1), z = clamp((e - SPIN_MS) / ZOOM_MS, 0, 1);
        view.lon = FOCUS.lon - 360 * (1 - ease(s)); view.lat = 22 + (FOCUS.lat - 22) * ease(s); view.k = 1 + (ZOOM - 1) * ease(z);
        if (e >= SPIN_MS + ZOOM_MS) { mode = "still"; view.lon = FOCUS.lon; view.lat = FOCUS.lat; view.k = ZOOM; } else again = true;
      } else if (!drag && (Math.abs(vel.x) > 0.0004 || Math.abs(vel.y) > 0.0004)) {      // inertia after a drag
        const dt = Math.min(48, now - (last || now));
        view.lon -= vel.x * dt; view.lat = clamp(view.lat + vel.y * dt, -85, 85);
        const f = Math.pow(0.92, dt / 16); vel.x *= f; vel.y *= f; again = true;
      }
      last = again ? now : 0;
      moving = again || !!drag;
      if (moving) {
        const w = watch.tick(now);                                     // slow frames: draw smaller; fast ones: win some back
        if (w === -1) qMove = Math.max(0.5, qMove * 0.82); else if (w === 1) qMove = Math.min(1, qMove * 1.1);
        setQ(qMove);
      } else { watch.reset(); setQ(1); }                               // at rest it is drawn sharp
      draw();
      if (again) raf = requestAnimationFrame(loop);
      else if (!drag && qNow !== 1) raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const startIntro = () => { vel.x = vel.y = 0; mode = "intro"; t0 = performance.now(); view.k = 1; played = true; kick(); };
    replay.current = () => { if (reduce) { view.lon = FOCUS.lon; view.lat = FOCUS.lat; view.k = ZOOM; kick(); } else startIntro(); };
    nudge.current = (dLon, dLat) => { mode = "still"; view.lon += dLon; view.lat = clamp(view.lat + dLat, -85, 85); kick(); };

    const size = () => {
      const w = wrap.clientWidth; if (!w) return;
      dpr = Math.min(tier === 0 ? 1.5 : 2, devicePixelRatio || 1); W = w; qNow = 1;
      canvas.width = canvas.height = Math.round(W * dpr); canvas.style.height = `${W}px`;
      ctx = canvas.getContext("2d")!; buildShade(); draw();
    };

    // hit-testing: which country is under the pointer
    const pick = (px: number, py: number) => {
      const p = proj.invert?.([px, py]); if (!p) return -1;
      const [lo, la] = p;
      for (let i = feats.length - 1; i >= 0; i--) {
        const b = feats[i].bbox;
        if (b[2] - b[0] < 180 && (lo < b[0] || lo > b[2] || la < b[1] || la > b[3])) continue;
        if (geoContains(feats[i].geom, [lo, la])) return i;
      }
      return -1;
    };
    const say = (i: number) => (i < 0 ? "" : SAY[feats[i].cls] ?? (feats[i].cls === "visited" ? `${feats[i].name}, visited` : feats[i].name));
    const point = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] as const; };
    const showTip = (x: number, y: number, i: number) => {
      hover = i; const t = say(i), fl = i < 0 ? "" : FLAG[feats[i].name] ?? "";
      setTip((o) => (o === t ? o : t)); setTipFlag((o) => (o === fl ? o : fl));
      if (tipEl.current) tipEl.current.style.transform = `translate(${Math.min(x + 14, W - 160)}px, ${Math.max(y - 38, 4)}px)`;
      kick();
    };

    const down = (e: PointerEvent) => {
      const [x, y] = point(e); mode = "still"; vel.x = vel.y = 0;
      drag = { x, y, t: performance.now(), moved: false, touch: e.pointerType === "touch" };
      canvas.setPointerCapture(e.pointerId); canvas.style.cursor = "grabbing";
    };
    let hx = 0, hy = 0, hraf = 0;
    const move = (e: PointerEvent) => {
      const [x, y] = point(e);
      if (!drag) {
        if (e.pointerType === "mouse") { hx = x; hy = y; if (!hraf) hraf = requestAnimationFrame(() => { hraf = 0; showTip(hx, hy, pick(hx, hy)); }); }   // hit-test at most once a frame
        return;
      }
      const dx = x - drag.x, dy = drag.touch ? 0 : y - drag.y, now = performance.now(), dt = Math.max(1, now - drag.t), s = degPerPx();
      if (Math.abs(x - drag.x) + Math.abs(y - drag.y) > 3) drag.moved = true;
      view.lon -= dx * s; view.lat = clamp(view.lat + dy * s, -85, 85);
      vel.x = vel.x * 0.6 + ((dx * s) / dt) * 0.4; vel.y = vel.y * 0.6 + ((dy * s) / dt) * 0.4;
      drag.x = x; drag.y = y; drag.t = now; hover = -1; setTip((o) => (o ? "" : o)); setTipFlag((o) => (o ? "" : o)); kick();
    };
    const up = (e: PointerEvent) => {
      if (!drag) return;
      const [x, y] = point(e), wasTap = !drag.moved, touch = drag.touch; drag = null; canvas.style.cursor = "grab";
      if (wasTap) { vel.x = vel.y = 0; if (touch || e.pointerType === "pen") showTip(x, y, pick(x, y)); }
      else kick();
    };
    const leave = () => { if (!drag) { hover = -1; setTip((o) => (o ? "" : o)); setTipFlag((o) => (o ? "" : o)); kick(); } };
    canvas.addEventListener("pointerdown", down); canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up); canvas.addEventListener("pointerleave", leave);

    const ro = new ResizeObserver(size); ro.observe(wrap);

    // the map and d3 are only fetched when the globe is about to scroll into view, so the page itself loads lighter
    const begin = () => Promise.all([import("d3-geo"), import("@/lib/globe-data")]).then(([d3, { GLOBE_DATA }]) => {
      if (dead) return;
      geoContains = d3.geoContains as typeof geoContains; geoDistance = d3.geoDistance as typeof geoDistance;
      proj = d3.geoOrthographic().clipAngle(90).precision(0.4);
      sphere = { type: "Sphere" }; grat = d3.geoGraticule().step([15, 15])() as GeoPermissibleObjects;
      const order = { land: 0, visited: 1, born: 2, grew: 2, descent: 2, living: 3 };
      feats = GLOBE_DATA.map(([name, cls, coords]) => {
        const geom = { type: "MultiPolygon" as const, coordinates: coords };
        let x0 = 180, y0 = 90, x1 = -180, y1 = -90; for (const p of coords) for (const [x, y] of p[0]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
        const centroid = d3.geoCentroid(geom) as [number, number];
        // how far the country reaches from its centre, so a country can be skipped when all of it is on the far side (huge or antimeridian ones are never skipped)
        const rad = x1 - x0 > 120 || y1 - y0 > 90 ? Math.PI : Math.max(...[[x0, y0], [x1, y0], [x0, y1], [x1, y1]].map((c) => d3.geoDistance(centroid, c as [number, number])));
        return { name, cls, geom, bbox: [x0, y0, x1, y1] as [number, number, number, number], centroid, rad, rings: coords.flatMap((poly) => poly.map(toRing)) };
      }).sort((a, b) => order[a.cls] - order[b.cls]);
      // the graticule for the fast path: 15 degree meridians and parallels as lines sampled every 5 degrees
      const lines: number[][][] = [];
      for (let lo = -180; lo < 180; lo += 15) { const l: number[][] = []; for (let la = -90; la <= 90; la += 5) l.push([lo, la]); lines.push(l); }
      for (let la = -75; la <= 75; la += 15) { const l: number[][] = []; for (let lo = -180; lo <= 180; lo += 5) l.push([lo, la]); lines.push(l); }
      gratRings = lines.map(toRing);
      maxN = Math.max(...feats.flatMap((f) => f.rings.map((r) => r.n)), ...gratRings.map((r) => r.n));
      SX = new Float64Array(maxN); SY = new Float64Array(maxN); SZ = new Float64Array(maxN);
      ctx = canvas.getContext("2d")!;
      path = d3.geoPath(proj, ctx);
      WEAR.forEach((name) => {                                        // the flags load after the globe is up, and appear as they arrive
        fetch(`/flags/${FLAG[name]}.svg`).then((res) => res.text()).then((svg) => {
          const img = new window.Image();
          img.onload = () => { const c = document.createElement("canvas"); c.width = 320; c.height = 240; c.getContext("2d")!.drawImage(img, 0, 0, 320, 240); flags[name] = c; kick(); };
          img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.replace("<svg ", '<svg width="640" height="480" '));
        }).catch(() => {});
      });
      setReady(true); size(); canvas.style.cursor = "grab";
      if (!reduce) {
        const io = new IntersectionObserver(([en]) => { if (en.isIntersecting && !played && !dead) { startIntro(); io.disconnect(); } }, { threshold: 0.5 });
        io.observe(wrap); cleanup.push(() => io.disconnect());
      }
    });
    const cleanup: (() => void)[] = [];
    const near = new IntersectionObserver(([en]) => { if (en.isIntersecting) { near.disconnect(); begin(); } }, { rootMargin: "800px 0px" });
    near.observe(wrap); cleanup.push(() => near.disconnect());
    return () => { dead = true; cancelAnimationFrame(raf); cancelAnimationFrame(hraf); ro.disconnect(); cleanup.forEach((f) => f()); canvas.removeEventListener("pointerdown", down); canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerup", up); canvas.removeEventListener("pointercancel", up); canvas.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <div>
      <div ref={box} className="relative mx-auto aspect-square w-full max-w-[600px]">
        <div aria-hidden className={`absolute inset-[3%] rounded-full bg-soft transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`} />
        <canvas ref={cv} tabIndex={0} aria-roledescription="interactive globe"
          aria-label={`A globe you can turn with the mouse, finger or arrow keys, resting on West Africa. Highlighted: The Gambia where Leslie was born, Sierra Leone where he grew up, Nigeria, his family's country, and Ghana where he lives. Also visited: ${VISITED}.`}
          onKeyDown={(e) => {
            const d = 9 / ZOOM, m: Record<string, [number, number]> = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, d], ArrowDown: [0, -d] };
            if (m[e.key]) { e.preventDefault(); nudge.current(...m[e.key]); } else if (e.key === "Home") { e.preventDefault(); replay.current(); }
          }}
          className="absolute inset-0 block w-full select-none rounded-full outline-offset-4" style={{ touchAction: "pan-y" }} />
        <div ref={tipEl} aria-hidden className={`pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full border border-line bg-bg px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] shadow-[0_8px_24px_-12px_rgba(0,0,0,.35)] transition-opacity duration-150 ${tip ? "opacity-100" : "opacity-0"}`}>{tipFlag && <Image src={`/flags/${tipFlag}.svg`} alt="" width={20} height={15} unoptimized className="mr-2 inline-block h-[15px] w-5 rounded-[2px] object-cover align-[-2px]" />}{tip || " "}</div>
      </div>
      <p className="mt-5 text-[clamp(22px,2vw,28px)] font-medium leading-[1.1] tracking-[-0.035em]">That is why I am building for Africa<span className="dot">.</span></p>
    </div>
  );
}
