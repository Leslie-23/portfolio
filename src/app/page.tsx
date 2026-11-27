import Link from "next/link";
import Hero from "@/components/Hero";
import ShippedRail from "@/components/ShippedRail";
import ProjectRow from "@/components/ProjectRow";
import ScrollVelocity from "@/components/ScrollVelocity";
import Affiliations from "@/components/Affiliations";
import { Spec } from "@/components/Spec";
import { PROJECTS } from "@/lib/data";

export default function Home() {
  const featured = PROJECTS.slice(0, 3);
  return (
    <>
      <Hero />

      <Spec name="Statement" id="QUIET" as="section" className="frame grid12 py-28 md:py-44">
        <p className="display col-span-6 md:col-span-10 text-[clamp(32px,6.4vw,104px)]">
          Build.<br />Test.<br />Question.<br /><span className="mark">Repeat.</span>
        </p>
        <p className="col-span-6 mt-8 max-w-[40ch] text-graphite md:col-span-4 md:col-start-9 md:mt-0 md:self-end">
          I want to know how things work, then I build them. The site you're on is one of them. Press <kbd className="mono border border-ink px-1">I</kbd> to see how.
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
