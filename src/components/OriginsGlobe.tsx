"use client";
import { useEffect, useRef, useState } from "react";

/** The footer artwork: the same ordered-dither dots as the rest of the site, drawn as a globe turned to West Africa.
 *  Four countries are solid (born, grew up, descent, living); seven more are denser (places visited).
 *  Land comes from a 0.5 degree raster baked from Natural Earth (scripts/build-globe-raster.mjs). */
const VISITED_NAMES = "Mali, Burkina Faso, Guinea, Liberia, Ivory Coast, Togo and Benin";
const CODE: Record<string, number> = { o: 0, l: 1, v: 2, b: 3, s: 4, n: 5, g: 6 };
const LON0 = -3, LAT0 = 10;                       // what the globe is turned to face

const B = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];
const D = Math.PI / 180;
const L = (() => { const v = [-0.5, 0.52, 0.69]; const m = Math.hypot(...v); return v.map((x) => x / m); })();

type Raster = { grid: Uint8Array; cols: number; rows: number; step: number; centers: Record<string, [number, number]> };

export default function OriginsGlobe() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [raster, setRaster] = useState<Raster | null>(null);
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
      const accent = st.getPropertyValue("--accent").trim() || "#34bb78", ink = st.getPropertyValue("--ink").trim() || "#111112";
      const R = css * 0.47, cx = css / 2, cy = css / 2, cell = Math.max(2.6, css / 150);
      const s0 = Math.sin(LAT0 * D), c0 = Math.cos(LAT0 * D);
      
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
          g.fillStyle = k === 6 ? accent : ink; g.fillRect(x, y, cell, cell); continue;
        }
        const base = k === 2 ? 0.78 + 0.22 * lit : k === 1 ? 0.42 + 0.48 * lit : 0.02 + 0.13 * lit;
        const val = base * limb;
        if (val > (B[((Math.floor(y / cell)) & 7) * 8 + ((Math.floor(x / cell)) & 7)] + 0.5) / 64) {
          g.fillStyle = accent; g.fillRect(x, y, cell * 0.72, cell * 0.72);
        }
      }
      g.strokeStyle = accent; g.globalAlpha = 0.35; g.lineWidth = 1; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1;

    };
    draw();
    const ro = new ResizeObserver(draw); ro.observe(canvas);
    return () => ro.disconnect();
  }, [raster]);

  return (
    <div>
      <canvas ref={cv} role="img" aria-label={`A globe turned to West Africa. Highlighted: The Gambia where Leslie was born, Sierra Leone where he grew up, Nigeria, his family's country, and Ghana where he lives. Also visited: ${VISITED_NAMES}.`}
        className="mx-auto block aspect-square w-full max-w-[600px]" />
      <p className="mt-5 text-[clamp(22px,2vw,28px)] font-medium leading-[1.1] tracking-[-0.035em]">That is why I am building for Africa<span className="dot">.</span></p>
    </div>
  );
}
