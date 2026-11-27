"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/** The portrait, alive. The real picture is drawn through a WebGL grid that is bent in a few small places:
 *  the irises follow the cursor, the lids blink, the head turns a little toward you, and the jaw drops in time with the letters of whatever it is saying. Nothing here is a recording.
 *  Coordinates below are pixels of public/portrait/leslie.png (687 x 1083). */
const W = 687, H = 1083;
const PAD = 0.12;                    // spare canvas around the portrait so a head turn is never clipped
const COLS = 96, ROWS = 150;

const LINES = [
  "Hi, I'm Leslie.",
  "I build systems that go to production.",
  "Founder of Trofficient. CTO of Beagine.",
  "Servers. Not just screens.",
  "Based in Accra. Say hi if you have a problem worth solving.",
];

const VERT = `
precision highp float;
attribute vec2 aUv;
uniform vec2 uGaze;      // -1..1, where the eyes and head are looking
uniform float uOpen, uBlink, uBreath, uPad;
varying vec2 vSrc;
const vec2 RES = vec2(${W}., ${H}.);
float g(vec2 r, float s) { return exp(-dot(r, r) / (2. * s * s)); }
void main() {
  vec2 q = aUv * RES;
  vec2 d = vec2(0.);

  // the head turns toward the cursor: features shift more than the outline, so it reads as a turn, not a slide
  vec2 face = (q - vec2(255., 600.)) / vec2(230., 330.);
  float depth = exp(-dot(face, face));
  d += uGaze * vec2(15., 8.) * depth;

  // irises follow the cursor
  vec2 eL = vec2(133., 457.), eR = vec2(403., 467.);
  d += uGaze * vec2(11., 6.5) * (g(q - eL, 19.) + g(q - eR, 19.));

  // blink: the eye region collapses toward its own centre line
  vec2 bl = (q - eL) / vec2(64., 38.), br = (q - eR) / vec2(64., 38.);
  d.y += (eL.y - q.y) * 0.86 * uBlink * exp(-dot(bl, bl));
  d.y += (eR.y - q.y) * 0.86 * uBlink * exp(-dot(br, br));

  // talking: everything under the lip line drops, most at the lips, less toward the chin, none at the neck
  float below = smoothstep(738., 752., q.y);
  float taper = 1. - smoothstep(780., 1010., q.y);
  float across = exp(-pow((q.x - 255.) / 260., 2.));
  d.y += uOpen * 46. * below * taper * across;

  vec2 p = q + d;
  // a slow sway about the base of the neck, and a breath
  float ang = uGaze.x * 0.04;
  vec2 pv = vec2(330., ${H}.);
  vec2 r = p - pv;
  p = pv + vec2(cos(ang) * r.x - sin(ang) * r.y, sin(ang) * r.x + cos(ang) * r.y);
  p.y = ${H}. + (p.y - ${H}.) * (1. + 0.005 * uBreath);

  vec2 u = p / RES;
  float k = 1. + 2. * uPad;
  gl_Position = vec4((u.x + uPad) / k * 2. - 1., 1. - (u.y + uPad) / k * 2., 0., 1.);
  vSrc = q;
}`;

const FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform float uOpen;
varying vec2 vSrc;
void main() {
  vec4 c = texture2D(uTex, vSrc / vec2(${W}., ${H}.));
  // the band between the lips is stretched open by the jaw; paint it as the inside of a mouth
  float band = smoothstep(735., 738., vSrc.y) * (1. - smoothstep(748., 753., vSrc.y));
  float xw = 1. - smoothstep(.5, 1., abs(vSrc.x - 255.) / 116.);
  float k = clamp(uOpen * 3.5, 0., 1.) * band * xw;
  float teeth = (1. - smoothstep(739.5, 742., vSrc.y)) * clamp(uOpen * 2., 0., 1.);
  vec3 inside = mix(vec3(.07, .045, .05), vec3(.78, .78, .76), teeth * .8);
  gl_FragColor = vec4(mix(c.rgb, inside * c.a, k), c.a);
}`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
/** how open the mouth is for a letter: vowels wide, lip-closers shut, the rest in between */
const openFor = (ch: string) => {
  const c = ch.toLowerCase();
  if ("aou".includes(c)) return 0.95;
  if ("ei".includes(c)) return 0.6;
  if ("mbp".includes(c)) return 0;
  if (c === " ") return 0.12;
  if (/[a-z]/.test(c)) return 0.38;
  return 0.05;
};

export default function LiveBust({ onReady }: { onReady: () => void }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [said, setSaid] = useState("");
  const [talking, setTalking] = useState(false);
  const speak = useRef<(i?: number) => void>(() => {});
  const next = useRef(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = cv.current!;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: true });
    if (!gl) return;

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // a grid of (COLS+1) x (ROWS+1) points over the picture
    const uv = new Float32Array((COLS + 1) * (ROWS + 1) * 2);
    for (let j = 0, n = 0; j <= ROWS; j++) for (let i = 0; i <= COLS; i++) { uv[n++] = i / COLS; uv[n++] = j / ROWS; }
    const idx = new Uint16Array(COLS * ROWS * 6);
    for (let j = 0, n = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
      const a = j * (COLS + 1) + i, b = a + 1, c = a + COLS + 1, d = c + 1;
      idx.set([a, b, c, b, d, c], n); n += 6;
    }
    const vb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, vb); gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aUv"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uGaze = U("uGaze"), uOpen = U("uOpen"), uBlink = U("uBlink"), uBreath = U("uBreath"), uPad = U("uPad");
    gl.uniform1f(uPad, PAD);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0, cancelled = false, visible = true;
    const mouse = { x: 0, y: 0, seen: 0 };
    const st = { gx: 0, gy: 0, open: 0, blink: 0, nextBlink: 1.8, blinkAt: -1, };
    let line: { text: string; t0: number } | null = null, hideAt = 0, spoken = 0;

    const say = (i?: number) => {
      const n = i ?? next.current++ % LINES.length;
      line = { text: LINES[n], t0: performance.now() / 1000 };
      hideAt = 0; setTalking(true);
    };
    speak.current = say;

    const img = new window.Image();
    img.onload = () => {
      if (cancelled) return;
      const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const size = () => {
        const b = canvas.parentElement!.getBoundingClientRect();
        const dpr = Math.min(2, devicePixelRatio || 1);
        const w = Math.round(b.width * (1 + 2 * PAD) * dpr), h = Math.round(b.height * (1 + 2 * PAD) * dpr);
        if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      size();
      const ro = new ResizeObserver(size); ro.observe(canvas.parentElement!);

      const start = performance.now();
      let last = start / 1000, first = true;
      const frame = (now: number) => {
        if (cancelled) return;
        raf = requestAnimationFrame(frame);
        if (!visible || document.hidden) { last = now / 1000; return; }
        const t = now / 1000, dt = Math.min(0.05, t - last); last = t;

        // gaze: toward the cursor if it has moved lately, otherwise a slow wander
        const box = canvas.parentElement!.getBoundingClientRect();
        const fx = box.left + box.width * 0.5, fy = box.top + box.height * 0.42;
        let tx: number, ty: number;
        if (t - mouse.seen < 4) { tx = clamp((mouse.x - fx) / (innerWidth * 0.45), -1, 1); ty = clamp((mouse.y - fy) / (innerHeight * 0.45), -1, 1); }
        else { tx = Math.sin(t * 0.37) * 0.35 + Math.sin(t * 0.91) * 0.15; ty = Math.sin(t * 0.29 + 1) * 0.18; }
        const ke = 1 - Math.exp(-dt * 9);
        st.gx += (tx - st.gx) * ke; st.gy += (ty - st.gy) * ke;

        // blink, now and then, sometimes twice
        if (st.blinkAt < 0 && t > st.nextBlink) { st.blinkAt = t; }
        if (st.blinkAt >= 0) {
          const k = (t - st.blinkAt) / 0.2;
          st.blink = k < 1 ? Math.sin(k * Math.PI) : 0;
          if (k >= 1) { st.blinkAt = -1; st.nextBlink = t + (Math.random() < 0.18 ? 0.25 : 2.4 + Math.random() * 3.2); }
        }

        // speech: the mouth follows the letters being typed
        let openT = 0;
        if (line) {
          const e = t - line.t0, n = Math.floor(e * 16);
          if (n < line.text.length) {
            if (n !== spoken) { spoken = n; setSaid(line.text.slice(0, n + 1)); }
            const ch = line.text[n] ?? " ";
            const wob = 0.85 + 0.15 * Math.sin(t * 38);
            openT = openFor(ch) * wob;
          } else {
            if (!hideAt) { hideAt = t + 3.2; setSaid(line.text); setTalking(false); spoken = -1; }
            if (t > hideAt) { line = null; setSaid(""); spoken = -1; }
          }
        }
        st.open += (openT - st.open) * (1 - Math.exp(-dt * 24));

        gl.uniform2f(uGaze, st.gx, st.gy);
        gl.uniform1f(uOpen, st.open); gl.uniform1f(uBlink, st.blink);
        gl.uniform1f(uBreath, Math.sin(t * 1.3));
        gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
        if (first) { first = false; onReady(); setTimeout(() => !cancelled && say(0), 900); }
      };
      raf = requestAnimationFrame(frame);
      cleanup.push(() => ro.disconnect());
    };
    img.src = "/portrait/leslie.png";

    const cleanup: (() => void)[] = [];
    const move = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.seen = performance.now() / 1000; };
    addEventListener("pointermove", move, { passive: true });
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas.parentElement!);
    return () => { cancelled = true; cancelAnimationFrame(raf); removeEventListener("pointermove", move); io.disconnect(); cleanup.forEach((f) => f()); };
  }, [onReady]);

  const poke = useCallback(() => speak.current(), []);

  return (
    <>
      <canvas ref={cv} aria-hidden onClick={poke} className="absolute z-10 cursor-pointer"
        style={{ left: `${-PAD * 100}%`, top: `${-PAD * 100}%`, width: `${(1 + PAD * 2) * 100}%`, height: `${(1 + PAD * 2) * 100}%` }} />
      {/* what it is saying: only where there is room beside the portrait */}
      <div aria-hidden className="pointer-events-none absolute bottom-[8%] left-[-30%] z-20 hidden w-[62%] max-w-[260px] lg:block">
        <p className={`rounded-2xl rounded-br-sm border border-line bg-bg px-4 py-3 text-[15px] font-medium leading-snug tracking-[-0.01em] shadow-[0_8px_30px_-12px_rgba(0,0,0,.25)] transition-all duration-300 ${said ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
          {said || " "}{talking && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" />}
        </p>
      </div>
      <button type="button" onClick={poke} className="label absolute bottom-[1%] left-[-30%] z-20 hidden h-8 items-center gap-2 rounded-full border border-line bg-bg px-3 text-mute hover:text-ink lg:flex">
        <i aria-hidden className="h-[7px] w-[7px] rounded-full bg-accent" />Say something
      </button>
    </>
  );
}
