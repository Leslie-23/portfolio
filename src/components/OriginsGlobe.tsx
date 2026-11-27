"use client";
import { useEffect, useRef, useState } from "react";
import type { GeoPath, GeoPermissibleObjects, GeoProjection } from "d3-geo";
import type { GlobeCls } from "@/lib/globe-data";

/** The footer artwork: a globe you can turn. It spins once, settles, and zooms in on West Africa; after that it is yours
 *  to drag. Hover (or tap) a country for its part in the story. The Gambia (born), Sierra Leone (grew up), Nigeria
 *  (family) and Ghana (home) are solid; seven more are places visited. Outlines are Natural Earth (public domain). */
const FOCUS = { lon: -1, lat: 9.5 };               // where it comes to rest
const ZOOM = 2.0;                                  // how far in it settles (1 = the whole globe)
const SPIN_MS = 3000, ZOOM_MS = 1500;
const D2R = Math.PI / 180;
const VISITED = "Mali, Burkina Faso, Guinea, Liberia, Ivory Coast, Togo and Benin";

const SAY: Record<string, string> = { born: "Born in The Gambia", grew: "Grew up in Sierra Leone", descent: "Of Nigerian descent", living: "Living in Ghana" };
type Feat = { name: string; cls: GlobeCls; geom: { type: "MultiPolygon"; coordinates: number[][][][] }; bbox: [number, number, number, number]; centroid: [number, number] };
// where each story country's name is written when zoomed in: offset in px, and the text colour
const LABEL: Record<string, { text: string; dx: number; dy: number; on: "ink" | "bg" | "out" }> = {
  Gambia: { text: "THE GAMBIA", dx: -4, dy: -15, on: "out" }, "Sierra Leone": { text: "SIERRA LEONE", dx: -8, dy: 26, on: "out" },
  Ghana: { text: "GHANA", dx: 0, dy: 0, on: "ink" }, Nigeria: { text: "NIGERIA", dx: 0, dy: 4, on: "bg" },
};

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function OriginsGlobe() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const tipEl = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState("");
  const [ready, setReady] = useState(false);
  const replay = useRef<() => void>(() => {});
  const nudge = useRef<(dLon: number, dLat: number) => void>(() => {});

  useEffect(() => {
    const canvas = cv.current, wrap = box.current;
    if (!canvas || !wrap) return;
    let dead = false, raf = 0, W = 0, dpr = 1;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const view = { lon: FOCUS.lon, lat: FOCUS.lat, k: reduce ? ZOOM : 1 };
    let mode: "still" | "intro" = "still", t0 = 0, played = false;
    const vel = { x: 0, y: 0 };                                  // deg per ms, from a drag
    let drag: { x: number; y: number; t: number; moved: boolean; touch: boolean } | null = null;
    let hover = -1;
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

    const draw = () => {
      if (!ctx || !feats.length) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, W);
      const R = W * 0.47 * view.k;
      proj.translate([W / 2, W / 2]).scale(R).rotate([-view.lon, -view.lat]);
      ctx.fillStyle = C.soft; ctx.beginPath(); path(sphere); ctx.fill();
      ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath(); path(grat); ctx.stroke();
      feats.forEach((f, i) => {
        ctx.beginPath(); path(f.geom);
        ctx.globalAlpha = f.cls === "visited" ? 0.4 : 1;
        ctx.fillStyle = f.cls === "living" || f.cls === "visited" ? C.accent : f.cls === "land" ? (i === hover ? "#cdd1cb" : "#dcdfda") : C.ink;
        ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = C.bg; ctx.lineWidth = f.cls === "land" ? 0.8 : 1.5; ctx.lineJoin = "round"; ctx.stroke();
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
      draw();
      if (again) raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const startIntro = () => { vel.x = vel.y = 0; mode = "intro"; t0 = performance.now(); view.k = 1; played = true; kick(); };
    replay.current = () => { if (reduce) { view.lon = FOCUS.lon; view.lat = FOCUS.lat; view.k = ZOOM; kick(); } else startIntro(); };
    nudge.current = (dLon, dLat) => { mode = "still"; view.lon += dLon; view.lat = clamp(view.lat + dLat, -85, 85); kick(); };

    const size = () => {
      const w = wrap.clientWidth; if (!w) return;
      dpr = Math.min(2, devicePixelRatio || 1); W = w;
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
      hover = i; const t = say(i);
      setTip((o) => (o === t ? o : t));
      if (tipEl.current) tipEl.current.style.transform = `translate(${Math.min(x + 14, W - 160)}px, ${Math.max(y - 38, 4)}px)`;
      kick();
    };

    const down = (e: PointerEvent) => {
      const [x, y] = point(e); mode = "still"; vel.x = vel.y = 0;
      drag = { x, y, t: performance.now(), moved: false, touch: e.pointerType === "touch" };
      canvas.setPointerCapture(e.pointerId); canvas.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      const [x, y] = point(e);
      if (!drag) { if (e.pointerType === "mouse") showTip(x, y, pick(x, y)); return; }
      const dx = x - drag.x, dy = drag.touch ? 0 : y - drag.y, now = performance.now(), dt = Math.max(1, now - drag.t), s = degPerPx();
      if (Math.abs(x - drag.x) + Math.abs(y - drag.y) > 3) drag.moved = true;
      view.lon -= dx * s; view.lat = clamp(view.lat + dy * s, -85, 85);
      vel.x = vel.x * 0.6 + ((dx * s) / dt) * 0.4; vel.y = vel.y * 0.6 + ((dy * s) / dt) * 0.4;
      drag.x = x; drag.y = y; drag.t = now; hover = -1; setTip((o) => (o ? "" : o)); kick();
    };
    const up = (e: PointerEvent) => {
      if (!drag) return;
      const [x, y] = point(e), wasTap = !drag.moved, touch = drag.touch; drag = null; canvas.style.cursor = "grab";
      if (wasTap) { vel.x = vel.y = 0; if (touch || e.pointerType === "pen") showTip(x, y, pick(x, y)); }
      else kick();
    };
    const leave = () => { if (!drag) { hover = -1; setTip((o) => (o ? "" : o)); kick(); } };
    canvas.addEventListener("pointerdown", down); canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up); canvas.addEventListener("pointerleave", leave);

    const ro = new ResizeObserver(size); ro.observe(wrap);

    // data and d3 load on demand, so the page itself stays light
    Promise.all([import("d3-geo"), import("@/lib/globe-data")]).then(([d3, { GLOBE_DATA }]) => {
      if (dead) return;
      geoContains = d3.geoContains as typeof geoContains; geoDistance = d3.geoDistance as typeof geoDistance;
      proj = d3.geoOrthographic().clipAngle(90).precision(0.4);
      sphere = { type: "Sphere" }; grat = d3.geoGraticule().step([15, 15])() as GeoPermissibleObjects;
      const order = { land: 0, visited: 1, born: 2, grew: 2, descent: 2, living: 3 };
      feats = GLOBE_DATA.map(([name, cls, coords]) => {
        const geom = { type: "MultiPolygon" as const, coordinates: coords };
        let x0 = 180, y0 = 90, x1 = -180, y1 = -90; for (const p of coords) for (const [x, y] of p[0]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
        return { name, cls, geom, bbox: [x0, y0, x1, y1] as [number, number, number, number], centroid: d3.geoCentroid(geom) as [number, number] };
      }).sort((a, b) => order[a.cls] - order[b.cls]);
      ctx = canvas.getContext("2d")!;
      path = d3.geoPath(proj, ctx);
      setReady(true); size(); canvas.style.cursor = "grab";
      if (!reduce) {
        const io = new IntersectionObserver(([en]) => { if (en.isIntersecting && !played && !dead) { startIntro(); io.disconnect(); } }, { threshold: 0.5 });
        io.observe(wrap); cleanup.push(() => io.disconnect());
      }
    });
    const cleanup: (() => void)[] = [];
    return () => { dead = true; cancelAnimationFrame(raf); ro.disconnect(); cleanup.forEach((f) => f()); canvas.removeEventListener("pointerdown", down); canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerup", up); canvas.removeEventListener("pointercancel", up); canvas.removeEventListener("pointerleave", leave); };
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
        <div ref={tipEl} aria-hidden className={`pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-full border border-line bg-bg px-3 py-1.5 text-[13px] font-medium tracking-[-0.01em] shadow-[0_8px_24px_-12px_rgba(0,0,0,.35)] transition-opacity duration-150 ${tip ? "opacity-100" : "opacity-0"}`}>{tip || " "}</div>
      </div>
      <div className="mx-auto mt-3 flex max-w-[600px] items-center justify-between gap-3">
        <p className="label text-mute">Drag to turn it</p>
        <button type="button" onClick={() => replay.current()} className="label inline-flex h-8 items-center gap-2 rounded-full border border-line px-3 text-mute transition-colors hover:border-ink hover:text-ink">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M10.2 6A4.2 4.2 0 1 1 8.9 3M9 1v2.2H6.8" /></svg>Replay
        </button>
      </div>
      <p className="mt-5 text-[clamp(22px,2vw,28px)] font-medium leading-[1.1] tracking-[-0.035em]">That is why I am building for Africa<span className="dot">.</span></p>
    </div>
  );
}
