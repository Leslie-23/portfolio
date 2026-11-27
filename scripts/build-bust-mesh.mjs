// Turns public/portrait/leslie.png into a compact triangle mesh (public/bust-mesh.json) for the load-in animation.
// Run: node scripts/build-bust-mesh.mjs   (needs `sharp`, which ships with Next, and d3-delaunay)
import sharp from "sharp";
import { Delaunay } from "d3-delaunay";
import fs from "fs";

const W = 340;                                   // mesh space width; height follows the portrait's aspect
const img = sharp(new URL("../public/portrait/leslie.png", import.meta.url).pathname);
const meta = await img.metadata();
const H = Math.round((W * meta.height) / meta.width);
const { data } = await img.resize(W, H).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const px = (x, y) => { const i = (Math.min(H - 1, Math.max(0, Math.round(y))) * W + Math.min(W - 1, Math.max(0, Math.round(x)))) * 4; return [data[i], data[i + 1], data[i + 2], data[i + 3]]; };
const lum = (x, y) => { const [r, g, b] = px(x, y); return 0.3 * r + 0.59 * g + 0.11 * b; };
const inside = (x, y) => px(x, y)[3] > 128;

// deterministic pseudo-random so the mesh is stable between runs
let seed = 7; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

// 1. outline points along the alpha edge
const pts = [];
for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
  if (!inside(x, y)) continue;
  if (!inside(x - 2, y) || !inside(x + 2, y) || !inside(x, y - 2) || !inside(x, y + 2)) pts.push([x, y]);
}
const edge = [];                                   // thin the outline to roughly one point every 8px
for (const p of pts) if (edge.every((q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > 64)) edge.push(p);

// 2. interior points: dense where the picture has detail, sparse where it's flat (poisson-style rejection)
const grad = (x, y) => Math.abs(lum(x + 2, y) - lum(x - 2, y)) + Math.abs(lum(x, y + 2) - lum(x, y - 2));
const pts2 = [...edge];
const tries = 90000;
for (let k = 0; k < tries; k++) {
  const x = rnd() * W, y = rnd() * H;
  if (!inside(x, y) || !inside(x - 4, y) || !inside(x + 4, y) || !inside(x, y - 4) || !inside(x, y + 4)) continue;
  const g = Math.min(1, grad(x, y) / 90);
  const r = 15 - 8 * g;                            // min spacing: 15px in flat areas, 7px on detail
  if (pts2.every((q) => (x - q[0]) ** 2 + (y - q[1]) ** 2 > r * r)) pts2.push([x, y]);
}

// 3. triangulate, keep triangles that sit on the portrait, and colour each from the picture
const d = Delaunay.from(pts2);
const tris = [];
for (let i = 0; i < d.triangles.length; i += 3) {
  const a = d.triangles[i], b = d.triangles[i + 1], c = d.triangles[i + 2];
  const A = pts2[a], B = pts2[b], C = pts2[c];
  const cx = (A[0] + B[0] + C[0]) / 3, cy = (A[1] + B[1] + C[1]) / 3;
  if (!inside(cx, cy)) continue;
  const long = Math.max(Math.hypot(A[0] - B[0], A[1] - B[1]), Math.hypot(B[0] - C[0], B[1] - C[1]), Math.hypot(C[0] - A[0], C[1] - A[1]));
  if (long > 48) continue;                         // drop slivers that bridge across gaps
  // average of the centroid and a point towards each corner: smoother than a single sample
  const s = [lum(cx, cy)];
  for (const P of [A, B, C]) s.push(lum(cx + (P[0] - cx) * 0.5, cy + (P[1] - cy) * 0.5));
  tris.push([a, b, c, Math.round(s.reduce((x, y) => x + y, 0) / s.length)]);
}
// renumber only the points that are used
const used = new Map(); const P = [];
const id = (i) => { if (!used.has(i)) { used.set(i, P.length / 2); P.push(+pts2[i][0].toFixed(1), +pts2[i][1].toFixed(1)); } return used.get(i); };
const T = tris.flatMap(([a, b, c, g]) => [id(a), id(b), id(c), g]);

fs.writeFileSync(new URL("../public/bust-mesh.json", import.meta.url).pathname, JSON.stringify({ w: W, h: H, p: P, t: T }));
console.log(`mesh ${W}x${H}: ${P.length / 2} points, ${T.length / 4} triangles, ${(JSON.stringify({ w: W, h: H, p: P, t: T }).length / 1024).toFixed(0)} KB`);
