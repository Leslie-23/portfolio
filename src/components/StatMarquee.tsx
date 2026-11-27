import { GITHUB } from "@/lib/data";

const STATS: { n: number; l: string; sub: string }[] = [
  { n: GITHUB.total, l: "repositories", sub: "on GitHub since 2022" },
  { n: GITHUB.original, l: "written by me", sub: "the rest are forks" },
  { n: GITHUB.forked, l: "forked", sub: "to learn from or build on" },
  { n: GITHUB.private, l: "private", sub: "all of them mine" },
  { n: GITHUB.public, l: "public", sub: "open for anyone to read" },
];

function Set({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={`marquee-set !gap-0 !pr-0 ${hidden ? "marquee-dup" : ""}`} aria-hidden={hidden || undefined}>
      {STATS.map((s) => (
        <li key={s.l} className="flex items-end gap-5 border-r border-white/15 px-8 md:px-12">
          <span className="text-[clamp(72px,11vw,168px)] font-medium leading-[0.85] tracking-[-0.06em]">{s.n}</span>
          <span className="pb-1 md:pb-3">
            <span className="block whitespace-nowrap text-[clamp(18px,1.8vw,26px)] font-medium tracking-[-0.03em]">{s.l}</span>
            <span className="block whitespace-nowrap text-[14px] text-white/55">{s.sub}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The GitHub totals as a slow strip of big numbers. Verified against the GitHub API (see GITHUB in data.ts). */
export default function StatMarquee() {
  return (
    <div className="marquee marquee-rev bleed mt-8 border-y border-white/15 py-6 md:mt-12 md:py-9" role="group" aria-label={`GitHub: ${GITHUB.total} repositories, ${GITHUB.original} written by me, ${GITHUB.forked} forked, ${GITHUB.private} private, ${GITHUB.public} public`}>
      <div className="marquee-track"><Set /><Set hidden /></div>
    </div>
  );
}
