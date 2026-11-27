import Link from "next/link";
import Hero from "@/components/Hero";
import ShippedRail from "@/components/ShippedRail";
import AssemblyPin from "@/components/AssemblyPin";
import ProjectRow from "@/components/ProjectRow";
import Experience from "@/components/Experience";
import Approach from "@/components/Approach";
import Interests from "@/components/Interests";
import { Spec } from "@/components/Spec";
import { PROJECTS } from "@/lib/data";

export default function Home() {
  const featured = PROJECTS.slice(0, 3);
  return (
    <>
      <Hero />

      <Experience className="mt-16 md:mt-24" />

      <Spec name="SelectedWork" id="SELECTED_WORK" as="section" className="mt-16 md:mt-24">
        <div className="frame grid12 items-end gap-y-4 pb-8">
          <div className="col-span-6 md:col-span-7">
            <div className="mono text-mute"><span className="text-accent-ink">■</span> SELECTED WORK</div>
            <h2 className="display mt-3 text-[clamp(40px,5.6vw,92px)]">Selected assemblies.</h2>
          </div>
          <p className="col-span-6 max-w-[46ch] text-graphite md:col-span-5">
            Three of {PROJECTS.length} case studies. Hover a plate to see the layers it&apos;s built from; open it for the decisions behind them.
          </p>
        </div>
        {featured.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
        <div className="frame border-t border-ink pt-6"><Link href="/work" className="btn btn-go mono" data-cursor="OPEN →">ALL {PROJECTS.length} CASE STUDIES →</Link></div>
      </Spec>

      <Approach className="mt-16 md:mt-24" />

      <div className="mt-16 md:mt-24"><AssemblyPin /></div>

      <div className="mt-16 md:mt-24"><ShippedRail /></div>

      <Interests className="mt-16 md:mt-24" />

      <Spec name="BenchLink" id="THE_BENCH" as="section" className="frame mt-10">
        <Link href="/bench" className="group grid12 items-center gap-y-2 border-y border-ink py-5 hover:bg-paper-2" data-cursor="OPEN →">
          <span className="mono col-span-6 text-mute md:col-span-3">ALSO / THE BENCH</span>
          <span className="col-span-6 text-lg md:col-span-7">Experiments and prototypes: questions I&apos;m working through, some of them running live on the page.</span>
          <span className="mono col-span-6 transition-transform group-hover:translate-x-1 md:col-span-2 md:text-right">OPEN THE BENCH →</span>
        </Link>
      </Spec>
    </>
  );
}
