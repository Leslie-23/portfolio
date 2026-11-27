import Link from "next/link";
import Hero from "@/components/Hero";
import ShippedRail from "@/components/ShippedRail";
import ProjectRow from "@/components/ProjectRow";
import ScrollVelocity from "@/components/ScrollVelocity";
import Affiliations from "@/components/Affiliations";
import { Spec } from "@/components/Spec";
import { PROJECTS, SHIPPED } from "@/lib/data";

const LOOP = [
  { n: "01", word: "Build.", tag: "BUILD", mark: false, line: `${PROJECTS.length} case studies and ${PROJECTS.filter((p) => p.live).length + SHIPPED.length} live sites and apps, from a step-challenge game to a voice platform I wrote from scratch.`, href: "/work", cta: "SEE THE WORK" },
  { n: "02", word: "Test.", tag: "TEST", mark: false, line: "40 tests on the voice platform. 36 on the web crawler. A 40-game tournament to find out whether the chess bots were actually getting smarter.", href: "/work/four-man-chess", cta: "HOW I TESTED THE BOTS" },
  { n: "03", word: "Question.", tag: "QUESTION", mark: false, line: "Why does every endpoint look offline? Because nothing ever checked that they were reachable. That bug took a full-stack rehearsal to find.", href: "/infra", cta: "THINGS THAT BIT ME" },
  { n: "04", word: "Repeat.", tag: "REPEAT", mark: true, line: "The bench is where the next thing starts: experiments, half-built ideas and things I'm still breaking on purpose.", href: "/bench", cta: "GO TO THE BENCH" },
];

export default function Home() {
  const featured = PROJECTS.slice(0, 3);
  return (
    <>
      <Hero />

      <Spec name="Statement" id="QUIET" as="section" className="frame py-24 md:py-40">
        <ul>
          {LOOP.map((r) => (
            <li key={r.word} className="grid12 items-end gap-y-3 border-t border-ink py-6 md:py-9">
              <p className={`display col-span-6 text-[clamp(44px,8vw,132px)] md:col-span-7 ${r.mark ? "" : ""}`}>
                {r.mark ? <span className="mark">{r.word}</span> : r.word}
              </p>
              <div className="col-span-6 md:col-span-4 md:col-start-9 md:pb-3">
                <div className="mono text-mute">{r.n} / {r.tag}</div>
                <p className="mt-2 max-w-[34ch] text-[clamp(16px,1.35vw,20px)] leading-snug text-graphite">{r.line}</p>
                <Link href={r.href} className="mono link-u mt-3 inline-block" data-cursor="OPEN →">{r.cta} →</Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mono mt-8 border-t border-ink pt-4 text-mute">
          I want to know how things work, then I build them. The site you&apos;re on is one of them. Press <kbd className="border border-ink px-1 text-ink">I</kbd> to see how.
        </p>
      </Spec>

      <ShippedRail />

      <Spec name="SelectedWork" id="SELECTED_WORK" as="section" className="mt-28 md:mt-40">
        <div className="frame grid12 pb-10">
          <h2 className="display col-span-6 md:col-span-8 text-[clamp(40px,7vw,116px)]">Selected<br />assemblies.</h2>
          <div className="mono col-span-6 mt-4 text-mute md:col-span-4 md:self-end md:text-right">FIG. 001 — 003 / OF {PROJECTS.length}</div>
        </div>
        {featured.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
        <div className="frame border-t border-ink pt-6"><Link href="/work" className="btn mono" data-cursor="OPEN →">ALL {PROJECTS.length} ASSEMBLIES →</Link></div>
      </Spec>

      <Affiliations className="mt-28 md:mt-44" />

      <Spec name="BenchTeaser" id="THE_BENCH" as="section" className="frame grid12 mt-28 gap-y-8 md:mt-44">
        <div className="col-span-6 md:col-span-6">
          <div className="mono text-mute">STATUS / UNFINISHED BY DESIGN</div>
          <h2 className="display mt-3 text-[clamp(40px,7vw,116px)]">The<br />bench.</h2>
          <p className="mt-5 max-w-[40ch] text-graphite">Things I'm testing, breaking and figuring out. Some of them run right here on the page.</p>
          <Link href="/bench" className="btn mono mt-6" data-cursor="OPEN →">GO TO THE BENCH →</Link>
        </div>
        <div className="col-span-6 md:col-span-5 md:col-start-8 md:self-end">
          <div className="mono mb-2 flex justify-between"><span>EXP. 002</span><span className="text-mute">PROMISING</span></div>
          <ScrollVelocity />
        </div>
      </Spec>
    </>
  );
}
