import Link from "next/link";
import Hero from "@/components/Hero";
import ShippedRail from "@/components/ShippedRail";
import AssemblyPin from "@/components/AssemblyPin";
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

      <Spec name="Statement" id="OPERATING_LOOP" as="section" className="border-y-2 border-ink bg-accent text-ink">
        <div className="frame mono flex justify-between border-b border-ink/30 py-2"><span>FIG. 000 / OPERATING LOOP</span><span className="max-sm:hidden">01 → 02 → 03 → 04 → 01</span></div>
        <div className="frame grid12 items-end gap-y-6 py-10 md:py-14">
        <p className="display col-span-6 md:col-span-8 text-[clamp(44px,7.6vw,128px)]">
          Build. Test.<br />Question. <span className="chip-ink !px-3">Repeat.</span>
        </p>
        <p className="col-span-6 max-w-[40ch] text-[17px] text-ink md:col-span-4 md:pb-3">
          I want to know how things work, then I build them. The site you're on is one of them. Press <kbd className="mono border border-ink bg-paper px-1">I</kbd> to see how.
        </p>
        </div>
      </Spec>

      <AssemblyPin />

      <Spec name="SelectedWork" id="SELECTED_WORK" as="section" className="mt-16 md:mt-24">
        <div className="frame grid12 pb-10">
          <h2 className="display col-span-6 md:col-span-8 text-[clamp(40px,7vw,116px)]">Selected<br />assemblies.</h2>
          <div className="mono col-span-6 mt-4 md:col-span-4 md:self-end md:text-right"><span className="chip">FIG. 001 — 003</span> <span className="text-mute">/ OF {PROJECTS.length}</span></div>
        </div>
        {featured.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
        <div className="frame border-t border-ink pt-6"><Link href="/work" className="btn btn-go mono" data-cursor="OPEN →">ALL {PROJECTS.length} ASSEMBLIES →</Link></div>
      </Spec>

      <div className="mt-16 md:mt-24"><ShippedRail /></div>

      <Affiliations className="mt-16 md:mt-24" />

      <Spec name="BenchTeaser" id="THE_BENCH" as="section" className="frame grid12 mt-16 gap-y-8 md:mt-24">
        <div className="col-span-6 md:col-span-6">
          <div className="mono"><span className="chip">FIG. 02</span> <span className="text-mute">STATUS / UNFINISHED BY DESIGN</span></div>
          <h2 className="display mt-3 text-[clamp(40px,7vw,116px)]">The<br />bench.</h2>
          <p className="mt-5 max-w-[40ch] text-graphite">Things I'm testing, breaking and figuring out. Some of them run right here on the page.</p>
          <Link href="/bench" className="btn btn-go mono mt-6" data-cursor="OPEN →">GO TO THE BENCH →</Link>
        </div>
        <div className="col-span-6 md:col-span-5 md:col-start-8 md:self-end">
          <div className="mono mb-2 flex justify-between"><span>EXP. 002</span><span className="text-mute">PROMISING</span></div>
          <ScrollVelocity />
        </div>
      </Spec>
    </>
  );
}
