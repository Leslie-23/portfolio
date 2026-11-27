"use client";
import { useEffect, useRef } from "react";

/* Ordered (Bayer 8×8) dithering on a canvas, in the accent colour.
   The only decorative graphic on the site: a portrait, a sphere, bars or rings rendered as dots.
   Static once drawn; a short "develop" on first view unless the visitor prefers reduced motion. */

const B = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];

export type Shape =
  | { kind: "portrait"; fit?: "contain" | "cover"; align?: number }
  | { kind: "sphere"; cx?: number; cy?: number; r?: number }
  | { kind: "fill"; density: number; fade?: "up" | "down" | "none" }
  | { kind: "rings"; cx?: number; cy?: number };

const imgCache: Record<string, Promise<HTMLImageElement>> = {};
const load = (src: string) =>
  (imgCache[src] ??= new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }));

export default function Dither({ shape, cell = 5, className = "", label }: { shape: Shape; cell?: number; className?: string; label?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const key = JSON.stringify(shape); // shapes are small literals; compare by value, not identity

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let field: Float32Array | null = null, cols = 0, rows = 0, raf = 0, progress = 1, cancelled = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      if (!field) return;
      const dpr = Math.min(2, devicePixelRatio || 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = getComputedStyle(cv).color;
      const s = cell * 0.82;
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const v = field[y * cols + x] * progress;
        if (v > (B[(y & 7) * 8 + (x & 7)] + 0.5) / 64) ctx.fillRect(x * cell, y * cell, s, s);
      }
    };

    const build = async () => {
      const w = cv.clientWidth, h = cv.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(2, devicePixelRatio || 1);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cols = Math.floor(w / cell); rows = Math.floor(h / cell);
      const f = new Float32Array(cols * rows);
      if (shape.kind === "portrait") {
        const img = await load("/portrait/leslie-480.png");
        if (cancelled) return;
        const off = document.createElement("canvas"); off.width = cols; off.height = rows;
        const o = off.getContext("2d", { willReadFrequently: true })!;
        const ar = img.width / img.height, br = cols / rows;
        const cover = shape.fit === "cover";
        const dw = (cover ? ar > br : ar < br) ? rows * ar : cols, dh = dw / ar;
        o.drawImage(img, (cols - dw) * (shape.align ?? 0.5), rows - dh, dw, dh);
        const d = o.getImageData(0, 0, cols, rows).data;
        let lo = 1, hi = 0;
        const L = new Float32Array(cols * rows);
        for (let i = 0; i < cols * rows; i++) {
          L[i] = (0.3 * d[i * 4] + 0.59 * d[i * 4 + 1] + 0.11 * d[i * 4 + 2]) / 255;
          if (d[i * 4 + 3] > 200) { lo = Math.min(lo, L[i]); hi = Math.max(hi, L[i]); }
        }
        const span = Math.max(0.05, hi - lo);
        for (let i = 0; i < cols * rows; i++) {
          const a = d[i * 4 + 3] / 255, n = Math.min(1, Math.max(0, (L[i] - lo) / span));
          f[i] = a * (0.08 + 0.92 * Math.pow(1 - n, 1.25));
        }
      } else {
        for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
          const px = x * cell, py = y * cell;
          let v = 0;
          if (shape.kind === "sphere") {
            const r = (shape.r ?? 0.48) * Math.min(w, h), cx = (shape.cx ?? 0.5) * w, cy = (shape.cy ?? 0.5) * h;
            const d = Math.hypot(px - cx, py - cy);
            if (d <= r) v = Math.min(1, 0.22 + Math.hypot(px - (cx - r * 0.42), py - (cy - r * 0.42)) / (r * 1.55));
          } else if (shape.kind === "fill") {
            const t = shape.fade === "up" ? 1 - py / h : shape.fade === "down" ? py / h : 1;
            v = shape.density * (0.55 + 0.45 * t);
          } else {
            const cx = (shape.cx ?? 0.5) * w, cy = (shape.cy ?? 0.5) * h, d = Math.hypot(px - cx, py - cy);
            v = (0.5 + 0.5 * Math.sin(d / 14)) * Math.max(0, 1 - d / Math.max(w, h));
          }
          f[y * cols + x] = v;
        }
      }
      field = f;
      paint();
    };

    // develop once, when it first scrolls into view
    const develop = () => {
      if (reduced) { progress = 1; paint(); return; }
      const t0 = performance.now();
      const step = (t: number) => { progress = Math.min(1, (t - t0) / 900); progress = 1 - Math.pow(1 - progress, 3); paint(); if (progress < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    };
    progress = reduced ? 1 : 0;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); develop(); } }, { threshold: 0.15 });
    io.observe(cv);
    let rt = 0;
    const ro = new ResizeObserver(() => { clearTimeout(rt); rt = window.setTimeout(build, 80); });
    ro.observe(cv);
    build();
    return () => { cancelled = true; io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); clearTimeout(rt); };
  }, [key, cell]); // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={ref} className={`block h-full w-full text-accent ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} />;
}
