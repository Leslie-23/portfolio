"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type N = { id: string; label: string; sub: string; x: number; y: number };
const START: N[] = [
  { id: "app", label: "APP", sub: "Expo", x: 90, y: 70 },
  { id: "api", label: "API", sub: "Express + Socket.IO", x: 300, y: 60 },
  { id: "redis", label: "REDIS", sub: "queues / cache", x: 510, y: 70 },
  { id: "mongo", label: "MONGODB", sub: "replica set", x: 300, y: 250 },
  { id: "worker", label: "WORKER", sub: "BullMQ jobs", x: 510, y: 250 },
];
const EDGES: [string, string][] = [["app", "api"], ["api", "mongo"], ["api", "redis"], ["redis", "worker"], ["worker", "mongo"]];
const W = 120, H = 52;

/** EXP. 003: StepPool, simplified. Drag any node: the connections stay attached. */
export default function DraggableSystem() {
  const svg = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<N[]>(START);
  const [moved, setMoved] = useState(false);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);

  const pt = (e: React.PointerEvent) => {
    const s = svg.current!; const p = s.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    return p.matrixTransform(s.getScreenCTM()!.inverse());
  };
  const down = (e: React.PointerEvent, n: N) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const p = pt(e); drag.current = { id: n.id, dx: p.x - n.x, dy: p.y - n.y };
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d) return;
    const p = pt(e);
    setNodes((ns) => ns.map((n) => (n.id === d.id ? { ...n, x: Math.max(0, Math.min(600 - W, p.x - d.dx)), y: Math.max(0, Math.min(340 - H, p.y - d.dy)) } : n)));
    setMoved(true);
  };
  const up = () => { drag.current = null; };
  const reset = () => {
    const from = nodes.map((n) => ({ ...n }));
    const t = { v: 0 };
    gsap.to(t, { v: 1, duration: 0.7, ease: "back.out(1.4)", onUpdate: () => setNodes(from.map((n, i) => ({ ...n, x: n.x + (START[i].x - n.x) * t.v, y: n.y + (START[i].y - n.y) * t.v }))), onComplete: () => setMoved(false) });
  };
  const by = (id: string) => nodes.find((n) => n.id === id)!;

  const key = (e: React.KeyboardEvent, n: N) => {
    const s = e.shiftKey ? 30 : 10, m: Record<string, [number, number]> = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] };
    if (!m[e.key]) return; e.preventDefault(); setMoved(true);
    setNodes((ns) => ns.map((x) => x.id === n.id ? { ...x, x: Math.max(0, Math.min(600 - W, x.x + m[e.key][0])), y: Math.max(0, Math.min(340 - H, x.y + m[e.key][1])) } : x));
  };

  return (
    <div>
      <svg ref={svg} viewBox="0 0 600 340" className="w-full touch-none border border-ink bg-paper-3" role="group" aria-label="Draggable system diagram. Use arrow keys on a focused node to move it.">
        <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="var(--ink)" opacity=".2" /></pattern></defs>
        <rect width="600" height="340" fill="url(#dots)" />
        {EDGES.map(([a, b]) => { const A = by(a), B = by(b); return <line key={a + b} x1={A.x + W / 2} y1={A.y + H / 2} x2={B.x + W / 2} y2={B.y + H / 2} stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 4" />; })}
        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x} ${n.y})`} onPointerDown={(e) => down(e, n)} onPointerMove={move} onPointerUp={up} onKeyDown={(e) => key(e, n)} tabIndex={0} style={{ cursor: "grab" }} data-cursor="MOVE">
            <rect width={W} height={H} fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <rect width="6" height={H} fill="var(--accent)" />
            <text x="16" y="22" fontSize="14" fontWeight="800" fill="var(--ink)" style={{ fontFamily: "var(--font-display)" }}>{n.label}</text>
            <text x="16" y="40" fontSize="9" fill="var(--mute)" style={{ fontFamily: "var(--font-mono-label)", textTransform: "uppercase" }}>{n.sub}</text>
          </g>
        ))}
      </svg>
      <div className="mono mt-2 flex items-center justify-between text-mute">
        <span>FIG. 002 / STEPPOOL, SIMPLIFIED · DRAG A NODE</span>
        <button onClick={reset} className={`btn mono !py-1 transition-opacity ${moved ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!moved} tabIndex={moved ? 0 : -1}>RESET SYSTEM ↺</button>
      </div>
    </div>
  );
}
