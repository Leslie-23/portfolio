// Turns a cut-out portrait (RGBA png) into a faceted, grayscale "geometric bust" like public/portrait/leslie.png.
// Run: node scripts/build-elena-bust.mjs <cutout.png> <out.png> [cropX cropY cropW cropH] [detailBoxes]
// detailBoxes: JSON [[x0,y0,x1,y1],...] in the cut-out's own pixels. The real picture shows through there (eyes, glasses, lips), softly feathered.
// Needs `sharp` (ships with Next) and d3-delaunay. Deterministic: same input gives the same facets.
import sharp from "sharp";
import { Delaunay } from "d3-delaunay";

const [src, out, cx = 0, cy = 0, cw, ch, detail = "[]"] = process.argv.slice(2);
const OUT_W = 900;                                  // final width in px
const base = sharp(src);
const m = await base.metadata();
const box = { left: +cx, top: +cy, width: cw ? +cw : m.width - +cx, height: ch ? +ch : m.height - +cy };
const W = OUT_W, H = Math.round((W * box.height) / box.width);
const { data } = await sharp(src).extract(box).resize(W, H).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const at = (x, y) => (Math.min(H - 1, Math.max(0, Math.round(y))) * W + Math.min(W - 1, Math.max(0, Math.round(x)))) * 4;
// gentle lift so a very dark picture still shows its facets on a light page
const lum = (x, y) => { const i = at(x, y); const v = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]; return 255 * Math.pow(v / 255, 0.72); };
const alpha = (x, y) => data[at(x, y) + 3];
const inside = (x, y) => alpha(x, y) > 128;

let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

// 1. outline
const edgeRaw = [];
for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
  if (!inside(x, y)) continue;
  if (!inside(x - 2, y) || !inside(x + 2, y) || !inside(x, y - 2) || !inside(x, y + 2)) edgeRaw.push([x, y]);
}
const pts = [];
for (const p of edgeRaw) if (pts.every((q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > 36)) pts.push(p);

// 2. interior: dense on detail (eyes, glasses, lips, braids), sparse on flat skin and cloth
const grad = (x, y) => Math.abs(lum(x + 2, y) - lum(x - 2, y)) + Math.abs(lum(x, y + 2) - lum(x, y - 2));
for (let k = 0; k < 400000; k++) {
  const x = rnd() * W, y = rnd() * H;
  if (!inside(x, y) || !inside(x - 4, y) || !inside(x + 4, y) || !inside(x, y - 4) || !inside(x, y + 4)) continue;
  const g = Math.min(1, grad(x, y) / 70);
  const r = 30 - 22 * g;                            // 30px apart on flat areas, 8px on detail
  if (pts.every((q) => (x - q[0]) ** 2 + (y - q[1]) ** 2 > r * r)) pts.push([x, y]);
}

// 3. triangulate and flat-shade each triangle from the picture
const d = Delaunay.from(pts);
const polys = [];
for (let i = 0; i < d.triangles.length; i += 3) {
  const A = pts[d.triangles[i]], B = pts[d.triangles[i + 1]], C = pts[d.triangles[i + 2]];
  const gx = (A[0] + B[0] + C[0]) / 3, gy = (A[1] + B[1] + C[1]) / 3;
  if (!inside(gx, gy)) continue;
  const long = Math.max(Math.hypot(A[0] - B[0], A[1] - B[1]), Math.hypot(B[0] - C[0], B[1] - C[1]), Math.hypot(C[0] - A[0], C[1] - A[1]));
  if (long > 90) continue;
  const s = [lum(gx, gy)];
  for (const P of [A, B, C]) s.push(lum(gx + (P[0] - gx) * 0.45, gy + (P[1] - gy) * 0.45));
  const v = Math.round(s.reduce((a, b) => a + b, 0) / s.length);
  polys.push(`<polygon points="${A[0].toFixed(1)},${A[1].toFixed(1)} ${B[0].toFixed(1)},${B[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)}" fill="rgb(${v},${v},${v})" stroke="rgb(${v},${v},${v})" stroke-width="0.6" stroke-linejoin="round"/>`);
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${polys.join("")}</svg>`;
const facets = await sharp(Buffer.from(svg)).png().toBuffer();

// 4. let the real picture show through in the detail boxes (feathered), so eyes, glasses and lips stay crisp
const sc = W / box.width;
const boxes = JSON.parse(detail).map(([x0, y0, x1, y1]) => [(x0 - box.left) * sc, (y0 - box.top) * sc, (x1 - box.left) * sc, (y1 - box.top) * sc]);
let facetsFinal = facets;
if (boxes.length) {
  const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${(14 * sc).toFixed(1)}"/></filter></defs><rect width="100%" height="100%" fill="black"/><g filter="url(#b)" fill="white">${boxes.map(([x0, y0, x1, y1]) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="${Math.min(x1 - x0, y1 - y0) / 2.2}"/>`).join("")}</g></svg>`;
  const maskPng = await sharp(Buffer.from(maskSvg)).greyscale().png().toBuffer();
  const real = await sharp(src).extract(box).resize(W, H).removeAlpha().modulate({ brightness: 1.0 }).gamma(1.4).greyscale().toBuffer();   // gamma 1.4 in sharp == the same lift as the facets
  const realWithMask = await sharp(real).joinChannel(await sharp(maskPng).extractChannel(0).toBuffer()).png().toBuffer();
  facetsFinal = await sharp(facets).composite([{ input: realWithMask }]).png().toBuffer();
}

// 5. keep the real picture's soft edge and a gentle fade at the bottom so the cut isn't a hard line
const a = Buffer.alloc(W * H);
const fadeFrom = H * 0.86;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const f = y < fadeFrom ? 1 : Math.max(0, 1 - (y - fadeFrom) / (H - fadeFrom));
  a[y * W + x] = Math.round(data[at(x, y) + 3] * f);
}
const rgb = await sharp(facetsFinal).removeAlpha().raw().toBuffer();
const rgba = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) { rgba[i * 4] = rgb[i * 3]; rgba[i * 4 + 1] = rgb[i * 3 + 1]; rgba[i * 4 + 2] = rgb[i * 3 + 2]; rgba[i * 4 + 3] = a[i]; }
await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile(out);
console.log(`${out}: ${W}x${H}, ${pts.length} points, ${polys.length} facets`);
