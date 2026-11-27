"use client";
import { useEffect, useRef, useState } from "react";

/** The footer artwork: the same ordered-dither dots as the rest of the site, drawn as a globe turned to West Africa.
 *  Four countries are solid (born, grew up, descent, living); seven more are denser (places visited).
 *  Land comes from a 0.5 degree raster baked from Natural Earth (scripts/build-globe-raster.mjs). */
type Group = "born" | "grew" | "descent" | "living" | "visited";

const STORY: { g: Exclude<Group, "visited">; n: number; tag: string; place: string; cls: string }[] = [
  { g: "born", n: 1, tag: "Born in", place: "The Gambia", cls: "b" },
  { g: "grew", n: 2, tag: "Grew up in", place: "Sierra Leone", cls: "s" },
  { g: "descent", n: 3, tag: "Of", place: "Nigerian descent", cls: "n" },
  { g: "living", n: 4, tag: "Living in", place: "Ghana", cls: "g" },
];
const VISITED_NAMES = "Mali, Burkina Faso, Guinea, Liberia, Ivory Coast, Togo and Benin";
const CODE: Record<string, number> = { o: 0, l: 1, v: 2, b: 3, s: 4, n: 5, g: 6 };
const OFFSET: Record<string, [number, number]> = { b: [-0.12, -0.1], s: [-0.13, 0.1], g: [-0.03, 0.15], n: [0.1, -0.12] };   // where each marker sits, as a share of the globe, away from its country
const LON0 = -3, LAT0 = 10;                       // what the globe is turned to face

const B = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];
const D = Math.PI / 180;
const L = (() => { const v = [-0.5, 0.52, 0.69]; const m = Math.hypot(...v); return v.map((x) => x / m); })();

type Raster = { grid: Uint8Array; cols: number; rows: number; step: number; centers: Record<string, [number, number]> };

export default function OriginsGlobe() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [raster, setRaster] = useState<Raster | null>(null);
  const [hot, setHot] = useState<Group | null>(null);
  const on = (g: Group | null) => ({ onMouseEnter: () => setHot(g), onMouseLeave: () => setHot(null), onFocus: () => setHot(g), onBlur: () => setHot(null) });

  useEffect(() => {
    let dead = false;
    import("@/lib/globe-raster").then(({ ROWS_RLE, STEP, CENTERS }) => {
      if (dead) return;
      const cols = Math.round(360 / STEP), rows = ROWS_RLE.length, grid = new Uint8Array(cols * rows);
      ROWS_RLE.forEach((row, r) => { let c = 0; for (const m of row.matchAll(/([a-z])(\d+)/g)) { const n = +m[2], k = CODE[m[1]]; grid.fill(k, r * cols + c, r * cols + c + n); c += n; } });
      setRaster({ grid, cols, rows, step: STEP, centers: CENTERS });
    });
    return () => { dead = true; };
  }, []);

  useEffect(() => {
    const canvas = cv.current;
    if (!canvas || !raster) return;
    const draw = () => {
      const css = canvas.clientWidth; if (!css) return;
      const dpr = Math.min(2, devicePixelRatio || 1);
      canvas.width = canvas.height = Math.round(css * dpr);
      const g = canvas.getContext("2d")!;
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, css, css);
      const st = getComputedStyle(canvas.parentElement!);
      const accent = st.getPropertyValue("--accent").trim() || "#34bb78", ink = st.getPropertyValue("--ink").trim() || "#111112", bg = st.getPropertyValue("--bg").trim() || "#fbfbf9";
      const R = css * 0.47, cx = css / 2, cy = css / 2, cell = Math.max(3.5, css / 92);
      const s0 = Math.sin(LAT0 * D), c0 = Math.cos(LAT0 * D);
      const gh = (grp: Group | null) => (hot === null || hot === grp ? 1 : 0.2);

      for (let y = cy - R; y < cy + R; y += cell) for (let x = cx - R; x < cx + R; x += cell) {
        const u = (x + cell / 2 - cx) / R, v = (cy - (y + cell / 2)) / R, q = u * u + v * v;
        if (q >= 1) continue;
        const z = Math.sqrt(1 - q);
        const lat = Math.asin(z * s0 + v * c0) / D, lon = LON0 + Math.atan2(u, z * c0 - v * s0) / D;
        const row = Math.min(raster.rows - 1, Math.max(0, Math.floor((90 - lat) / raster.step))), col = Math.floor((((lon + 540) % 360)) / raster.step) % raster.cols;
        const k = raster.grid[row * raster.cols + col];
        const lit = Math.max(0, u * L[0] + v * L[1] + z * L[2]);
        const limb = Math.min(1, z / 0.28);
        if (k >= 3) {                                                   // the four countries of the story: solid
          const grp = k === 3 ? "born" : k === 4 ? "grew" : k === 5 ? "descent" : "living";
          g.globalAlpha = gh(grp); g.fillStyle = k === 6 ? accent : ink; g.fillRect(x, y, cell, cell); g.globalAlpha = 1; continue;
        }
        const base = k === 2 ? 0.78 + 0.22 * lit : k === 1 ? 0.42 + 0.48 * lit : 0.02 + 0.13 * lit;
        const val = base * limb;
        if (val > (B[((Math.floor(y / cell)) & 7) * 8 + ((Math.floor(x / cell)) & 7)] + 0.5) / 64) {
          g.globalAlpha = k === 2 ? (hot === "visited" ? 1 : hot === null ? 1 : 0.25) : hot === null ? 1 : 0.3;
          g.fillStyle = accent; g.fillRect(x, y, cell * 0.82, cell * 0.82); g.globalAlpha = 1;
        }
      }
      g.strokeStyle = accent; g.globalAlpha = 0.35; g.lineWidth = 1; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1;

      // numbered markers, tied to the list beside the globe
      for (const s of STORY) {
        const [lo, la] = raster.centers[s.cls]; const dl = (lo - LON0) * D, p = la * D;
        const px = Math.cos(p) * Math.sin(dl), py = c0 * Math.sin(p) - s0 * Math.cos(p) * Math.cos(dl), pz = s0 * Math.sin(p) + c0 * Math.cos(p) * Math.cos(dl);
        if (pz < 0.05) continue;
        const tx = cx + px * R, ty = cy - py * R, r = Math.max(9, css / 46);
        const [ox, oy] = OFFSET[s.cls], mx = tx + ox * css, my = ty + oy * css;
        g.globalAlpha = gh(s.g);
        g.strokeStyle = ink; g.lineWidth = 1.25; g.beginPath(); g.moveTo(tx, ty); g.lineTo(mx, my); g.stroke();
        g.fillStyle = ink; g.beginPath(); g.arc(tx, ty, 2.4, 0, Math.PI * 2); g.fill();
        g.fillStyle = bg; g.beginPath(); g.arc(mx, my, r + 2.5, 0, Math.PI * 2); g.fill();
        g.fillStyle = ink; g.beginPath(); g.arc(mx, my, r, 0, Math.PI * 2); g.fill();
        g.fillStyle = "#fff"; g.font = `600 ${r * 1.15}px ui-monospace, "SF Mono", Menlo, monospace`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(String(s.n), mx, my + 0.5);
        g.globalAlpha = 1;
      }
    };
    draw();
    const ro = new ResizeObserver(draw); ro.observe(canvas);
    return () => ro.disconnect();
  }, [raster, hot]);

  return (
    <div>
      <canvas ref={cv} role="img" aria-label={`A globe turned to West Africa. Highlighted: The Gambia where Leslie was born, Sierra Leone where he grew up, Nigeria, his family's country, and Ghana where he lives. Also visited: ${VISITED_NAMES}.`}
        className="mx-auto block aspect-square w-full max-w-[600px]" />
      <ul className="mt-4 border-t border-ink">
        {STORY.map((s) => (
          <li key={s.g} tabIndex={0} {...on(s.g)} className="grid cursor-default grid-cols-[28px_1fr] items-baseline gap-x-3 border-b border-line py-3 outline-offset-2">
            <span className="label text-mute">0{s.n}</span>
            <p className="text-[17px] leading-snug tracking-[-0.01em]"><span className="text-mute">{s.tag}</span> <span className="font-medium">{s.place}</span></p>
          </li>
        ))}
        <li tabIndex={0} {...on("visited")} className="grid cursor-default grid-cols-[28px_1fr] items-baseline gap-x-3 border-b border-line py-3 outline-offset-2">
          <span aria-hidden className="mt-1.5 h-[9px] w-[9px] rounded-sm bg-accent" />
          <p className="text-[17px] leading-snug tracking-[-0.01em]"><span className="text-mute">Visited</span> <span className="font-medium">{VISITED_NAMES}</span></p>
        </li>
      </ul>
      <p className="mt-5 text-[clamp(22px,2vw,28px)] font-medium leading-[1.1] tracking-[-0.035em]">That is why I am building for Africa<span className="dot">.</span></p>
    </div>
  );
}
