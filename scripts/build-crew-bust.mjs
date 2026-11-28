// Faceted, high-contrast grayscale "geometric bust" from a cut-out portrait (RGBA png), in the style of public/portrait/leslie.png:
// big clean light/shadow planes on the skin, crisp real detail over eyes, nose, lips and hair.
// Run: node scripts/build-crew-bust.mjs <cutout.png> <out.png> <cropX cropY cropW cropH> [detailBoxes JSON]
// detailBoxes: [[x0,y0,x1,y1],...] in the cut-out's own pixels (eyes, nose, mouth, hair). Needs sharp and d3-delaunay. Deterministic.
import sharp from "sharp";
import { Delaunay } from "d3-delaunay";

const [src, out, cx, cy, cw, ch, detail = "[]"] = process.argv.slice(2);
const OUT_W = 900;
const box = { left: +cx, top: +cy, width: +cw, height: +ch };
const W = OUT_W, H = Math.round((W * box.height) / box.width);
const sc = W / box.width;

const crop = () => sharp(src).extract(box).resize(W, H);
const { data: rgba } = await crop().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const alphaAt = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) alphaAt[i] = rgba[i * 4 + 3];

// tonal base: grey, evened out (local contrast), then a punchy curve. `smooth` also takes out skin blemishes for the facets.
const grey = async (smooth) => {
  let p = crop().removeAlpha().greyscale().normalise({ lower: 1, upper: 99 }).clahe({ width: Math.max(3, Math.round(W / 7)), height: Math.max(3, Math.round(H / 7)), maxSlope: 2 });
  p = smooth ? p.median(5).sharpen({ sigma: 9, m1: 0.5, m2: 2.2 }) : p.median(3);
  return p.raw().toBuffer();
};
const K = +(process.env.CONTRAST || 1);   // extra contrast for flat photos
const curve = (v) => { const x = Math.pow(Math.min(1, Math.max(0, (v / 255 - 0.03) / 0.92)), +(process.env.GAMMA || 0.6)); const s = x * x * (3 - 2 * x); const y = 255 * (0.45 * x + 0.55 * s); return Math.min(255, Math.max(0, 128 + (y - 128) * K)); };
const gSmooth = await grey(true);
// a soft light from the top left gives every face the same volume (flat phone-photo lighting reads flat as facets)
const light = (i) => { const x = (i % W) / W, y = Math.floor(i / W) / H; return 1.12 - 0.34 * (0.6 * x + 0.4 * y); };
const L = new Float32Array(W * H); for (let i = 0; i < W * H; i++) L[i] = Math.min(255, curve(gSmooth[i]) * light(i));
// a blurred copy steers where facets get small (edges of real forms), so skin noise does not shatter the planes
const gBlur = await sharp(gSmooth, { raw: { width: W, height: H, channels: 1 } }).blur(2.5).raw().toBuffer();
const LB = new Float32Array(W * H); for (let i = 0; i < W * H; i++) LB[i] = curve(gBlur[i]) * light(i);
const at = (x, y) => Math.min(H - 1, Math.max(0, Math.round(y))) * W + Math.min(W - 1, Math.max(0, Math.round(x)));
const lum = (x, y) => L[at(x, y)];
const inside = (x, y) => alphaAt[at(x, y)] > 128;

let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

// 1. outline
const edgeRaw = [];
for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
  if (!inside(x, y)) continue;
  if (!inside(x - 2, y) || !inside(x + 2, y) || !inside(x, y - 2) || !inside(x, y + 2)) edgeRaw.push([x, y]);
}
const pts = [];
for (const p of edgeRaw) if (pts.every((q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > 49)) pts.push(p);

// 2. interior: bigger planes on flat skin and cloth, denser where the light turns (nose, brows, jaw, folds)
const lb = (x, y) => LB[at(x, y)];
const grad = (x, y) => Math.abs(lb(x + 5, y) - lb(x - 5, y)) + Math.abs(lb(x, y + 5) - lb(x, y - 5));
for (let k = 0; k < 500000; k++) {
  const x = rnd() * W, y = rnd() * H;
  if (!inside(x, y) || !inside(x - 4, y) || !inside(x + 4, y) || !inside(x, y - 4) || !inside(x, y + 4)) continue;
  const g = Math.min(1, grad(x, y) / 26);
  const r = (42 - 27 * g) * (y > H * 0.58 ? 1.5 : 1);   // clothing gets bigger planes than the face
  if (pts.every((q) => (x - q[0]) ** 2 + (y - q[1]) ** 2 > r * r)) pts.push([x, y]);
}

// 3. triangulate, flat-shade each triangle from the evened-out picture
const d = Delaunay.from(pts);
const polys = [];
for (let i = 0; i < d.triangles.length; i += 3) {
  const A = pts[d.triangles[i]], B = pts[d.triangles[i + 1]], C = pts[d.triangles[i + 2]];
  const gx = (A[0] + B[0] + C[0]) / 3, gy = (A[1] + B[1] + C[1]) / 3;
  if (!inside(gx, gy)) continue;
  const long = Math.max(Math.hypot(A[0] - B[0], A[1] - B[1]), Math.hypot(B[0] - C[0], B[1] - C[1]), Math.hypot(C[0] - A[0], C[1] - A[1]));
  if (long > 150) continue;
  const s = [lum(gx, gy), lum(gx, gy)];
  for (const P of [A, B, C]) s.push(lum(gx + (P[0] - gx) * 0.5, gy + (P[1] - gy) * 0.5));
  const v = Math.round(s.reduce((a, b) => a + b, 0) / s.length);
  polys.push(`<polygon points="${A[0].toFixed(1)},${A[1].toFixed(1)} ${B[0].toFixed(1)},${B[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)}" fill="rgb(${v},${v},${v})" stroke="rgb(${v},${v},${v})" stroke-width="0.7" stroke-linejoin="round"/>`);
}
const facets = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${polys.join("")}</svg>`)).png().toBuffer();

// 4. the real picture, evened out and sharpened, shows through over the features (feathered)
const boxes = JSON.parse(detail).map(([x0, y0, x1, y1]) => [(x0 - box.left) * sc, (y0 - box.top) * sc, (x1 - box.left) * sc, (y1 - box.top) * sc]);
let withReal = facets;
if (boxes.length) {
  const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><filter id="b" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${(16 * sc).toFixed(1)}"/></filter></defs><rect width="100%" height="100%" fill="black"/><g filter="url(#b)" fill="white">${boxes.map(([x0, y0, x1, y1]) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="${Math.min(x1 - x0, y1 - y0) / 2.4}"/>`).join("")}</g></svg>`;
  const maskCh = await sharp(Buffer.from(maskSvg)).greyscale().extractChannel(0).raw().toBuffer();
  const gReal = await grey(false);
  const realRgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) { const v = Math.round(curve(gReal[i])); realRgba[i * 4] = realRgba[i * 4 + 1] = realRgba[i * 4 + 2] = v; realRgba[i * 4 + 3] = maskCh[i]; }
  const real = await sharp(realRgba, { raw: { width: W, height: H, channels: 4 } }).sharpen({ sigma: 1.1 }).png().toBuffer();
  withReal = await sharp(facets).composite([{ input: real }]).png().toBuffer();
}

// 5. keep the cut-out's soft edge, fade the bottom so the cut isn't a hard line
const a = Buffer.alloc(W * H);
const fadeFrom = H * 0.86;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const f = y < fadeFrom ? 1 : Math.max(0, 1 - (y - fadeFrom) / (H - fadeFrom));
  a[y * W + x] = Math.round(alphaAt[y * W + x] * f);
}
const rgb = await sharp(withReal).removeAlpha().raw().toBuffer();
const outBuf = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) { outBuf[i * 4] = rgb[i * 3]; outBuf[i * 4 + 1] = rgb[i * 3 + 1]; outBuf[i * 4 + 2] = rgb[i * 3 + 2]; outBuf[i * 4 + 3] = a[i]; }
await sharp(outBuf, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile(out);
console.log(`${out}: ${W}x${H}, ${pts.length} points, ${polys.length} facets`);
