"use client";
import { useState } from "react";
import { AFRICA_H, AFRICA_W, COUNTRIES } from "@/lib/africa-map";

/** Why I build for Africa, as a map. Four countries carry the story (born, grew up, descent, living); seven more are
 *  places I have been. Outlines come from Natural Earth (see scripts/build-africa-map.mjs). */
type Group = "born" | "grew" | "descent" | "living" | "visited";

const STORY: { g: Exclude<Group, "visited">; n: number; tag: string; place: string; id: string }[] = [
  { g: "born", n: 1, tag: "Born in", place: "The Gambia", id: "GMB" },
  { g: "grew", n: 2, tag: "Grew up in", place: "Sierra Leone", id: "SLE" },
  { g: "descent", n: 3, tag: "Of", place: "Nigerian descent", id: "NGA" },
  { g: "living", n: 4, tag: "Living in", place: "Ghana", id: "GHA" },
];
const VISITED = ["MLI", "BFA", "GIN", "LBR", "CIV", "TGO", "BEN"];
const VISITED_NAMES = "Mali, Burkina Faso, Guinea, Liberia, Ivory Coast, Togo and Benin";

// the frame is a crop of the continent, so let its top and right edges fade out instead of ending in a hard line
const MASK = "radial-gradient(ellipse 92% 100% at 50% 64%, #000 62%, transparent 100%)";

const groupOf = (id: string): Group | null => STORY.find((s) => s.id === id)?.g ?? (VISITED.includes(id) ? "visited" : null);

export default function AfricaMap() {
  const [hot, setHot] = useState<Group | null>(null);
  const on = (g: Group | null) => ({ onMouseEnter: () => setHot(g), onMouseLeave: () => setHot(null), onFocus: () => setHot(g), onBlur: () => setHot(null) });

  return (
    <div>
      <svg viewBox={`0 0 ${AFRICA_W} ${AFRICA_H}`} role="img" aria-label={`West Africa. Highlighted: The Gambia where Leslie was born, Sierra Leone where he grew up, Nigeria, his family's country, and Ghana where he lives. Also visited: ${VISITED_NAMES}.`} className="block h-auto w-full" style={{ WebkitMaskImage: MASK, maskImage: MASK }}>
        {COUNTRIES.map((c) => {
          const g = groupOf(c.id);
          const dim = hot && g !== hot;
          const fill = g === "living" ? "var(--accent)" : g === "visited" ? "var(--accent)" : g ? "var(--ink)" : "var(--soft)";
          const op = g === "visited" ? (hot === "visited" ? 0.55 : 0.28) : dim ? 0.28 : 1;
          return <path key={c.id} d={c.d} fill={fill} fillOpacity={dim && g === "visited" ? 0.1 : op} stroke="var(--bg)" strokeWidth={g ? 2 : 1.4} strokeLinejoin="round" style={{ transition: "fill-opacity .25s" }} />;
        })}
        {STORY.map((s) => {
          const c = COUNTRIES.find((x) => x.id === s.id)!;
          const dim = hot && hot !== s.g;
          return (
            <g key={s.id} transform={`translate(${c.cx} ${c.cy})`} style={{ opacity: dim ? 0.35 : 1, transition: "opacity .25s" }}>
              <circle r={20} fill="var(--bg)" /><circle r={16} fill={s.g === "living" ? "var(--ink)" : "var(--accent)"} />
              <text textAnchor="middle" dominantBaseline="central" fontSize={20} fontWeight={600} fill={s.g === "living" ? "#fff" : "var(--ink)"} style={{ fontFamily: "var(--font-mono-face), ui-monospace, monospace" }}>{s.n}</text>
            </g>
          );
        })}
      </svg>

      <ul className="mt-5 border-t border-ink">
        {STORY.map((s) => (
          <li key={s.g} tabIndex={0} {...on(s.g)} className="grid cursor-default grid-cols-[28px_1fr] items-baseline gap-x-3 border-b border-line py-3 outline-offset-2">
            <span className="label text-mute">0{s.n}</span>
            <p className="text-[17px] leading-snug tracking-[-0.01em]"><span className="text-mute">{s.tag}</span> <span className="font-medium">{s.place}</span></p>
          </li>
        ))}
        <li tabIndex={0} {...on("visited")} className="grid cursor-default grid-cols-[28px_1fr] items-baseline gap-x-3 border-b border-line py-3 outline-offset-2">
          <span aria-hidden className="mt-1.5 h-[9px] w-[9px] rounded-sm bg-accent/40" />
          <p className="text-[17px] leading-snug tracking-[-0.01em]"><span className="text-mute">Visited</span> <span className="font-medium">{VISITED_NAMES}</span></p>
        </li>
      </ul>
      <p className="mt-5 text-[clamp(22px,2vw,28px)] font-medium leading-[1.1] tracking-[-0.035em]">That is why I am building for Africa<span className="dot">.</span></p>
    </div>
  );
}
