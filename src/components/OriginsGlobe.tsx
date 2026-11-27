import { GLOBE, GLOBE_GRID, GLOBE_LAND, type GlobeCountry } from "@/lib/globe-art";

/** The footer artwork: a globe turned to West Africa. Real country outlines (Natural Earth, public domain) in orthographic
 *  projection, baked by scripts/build-globe.mjs. The Gambia (born), Sierra Leone (grew up), Nigeria (family) and Ghana
 *  (home) are solid; seven countries visited are tinted. A dithered shadow keeps it in the site's visual language. */
const VISITED = "Mali, Burkina Faso, Guinea, Liberia, Ivory Coast, Togo and Benin";

const fill = (c: GlobeCountry["cls"]) => (c === "living" ? "var(--accent)" : c === "visited" ? "var(--accent)" : c === "land" ? "#dcdfda" : "var(--ink)");

export default function OriginsGlobe() {
  const { cx, cy, r } = GLOBE;
  return (
    <div>
      <svg viewBox="0 0 1000 1000" role="img" className="mx-auto block h-auto w-full max-w-[600px]"
        aria-label={`A globe turned to West Africa. Highlighted: The Gambia where Leslie was born, Sierra Leone where he grew up, Nigeria, his family's country, and Ghana where he lives. Also visited: ${VISITED}.`}>
        <defs>
          <clipPath id="og-sphere"><circle cx={cx} cy={cy} r={r} /></clipPath>
          <pattern id="og-dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.5" fill="var(--accent)" /></pattern>
          <radialGradient id="og-shade" cx="0.3" cy="0.26" r="0.95"><stop offset="0.5" stopColor="#000" /><stop offset="1" stopColor="#fff" /></radialGradient>
          <mask id="og-shadow"><rect width="1000" height="1000" fill="url(#og-shade)" /></mask>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="var(--soft)" />
        <g clipPath="url(#og-sphere)">
          <path d={GLOBE_GRID} fill="none" stroke="var(--line)" strokeWidth="1.4" />
          {GLOBE_LAND.map((c) => (
            <path key={c.id} d={c.d} fill={fill(c.cls)} fillOpacity={c.cls === "visited" ? 0.4 : 1} stroke="var(--bg)" strokeWidth={c.cls === "land" ? 0.9 : 1.6} strokeLinejoin="round" />
          ))}
          <rect width="1000" height="1000" fill="url(#og-dots)" mask="url(#og-shadow)" opacity="0.9" />
        </g>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="2" />
      </svg>
      <p className="mt-5 text-[clamp(22px,2vw,28px)] font-medium leading-[1.1] tracking-[-0.035em]">That is why I am building for Africa<span className="dot">.</span></p>
    </div>
  );
}
