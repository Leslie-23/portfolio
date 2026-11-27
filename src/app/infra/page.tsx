import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { AWS_BLOCKS, AWS_NOTE, INFRA, LESSONS, TOPOLOGIES } from "@/lib/infra";
import TopologyDiagram from "@/components/TopologyDiagram";
import { Spec, Tip } from "@/components/Spec";

export const metadata: Metadata = { title: "Infrastructure", description: "Servers, networking, data and delivery: what Leslie runs production on, and what he's learned running it." };

const name = (slug: string) => PROJECTS.find((p) => p.slug === slug)?.name ?? slug;

export default function Infra() {
  return (
    <>
      <Spec name="InfraHeader" id="INFRA" as="header" className="frame grid12 py-16 md:py-24">
        <div className="mono col-span-6 text-mute md:col-span-12">FIG. 050 / WHAT IT RUNS ON</div>
        <h1 className="display col-span-6 mt-4 text-[clamp(44px,9vw,160px)] !leading-[1.04] md:col-span-11">Servers.<br />Not just screens.</h1>
        <p className="col-span-6 mt-6 max-w-[48ch] text-xl leading-snug md:col-span-6">
          I like knowing what's underneath. These are the machines, networks and pipelines I run, with the parts that went wrong.
        </p>
      </Spec>

      <section className="frame grid gap-[var(--col-gap)] pb-20" aria-label="Topologies">
        {TOPOLOGIES.map((t) => <TopologyDiagram key={t.id} t={t} />)}
      </section>

      <Spec name="InfraGroups" id="WHAT_I_RUN" as="section" className="frame border-t border-ink py-16 md:py-24">
        <div className="mono mb-10 text-mute">WHAT I RUN</div>
        <div className="space-y-16">
          {INFRA.map((g) => (
            <div key={g.id} className="grid12 gap-y-6">
              <div className="col-span-6 md:col-span-4">
                <h2 className="display text-[clamp(26px,3.4vw,52px)] !leading-[0.96]">{g.label}</h2>
                <p className="mt-3 max-w-[30ch] text-graphite">{g.blurb}</p>
              </div>
              <ul className="col-span-6 md:col-span-8">
                {g.items.map((it) => (
                  <li key={it.name} className="grid grid-cols-1 gap-x-6 border-t border-hair py-4 md:grid-cols-[1fr_1.6fr]">
                    <h3 className="display text-[clamp(18px,1.9vw,26px)] !leading-[1]">{it.name}</h3>
                    <div>
                      <p className="text-graphite">{it.note}</p>
                      <p className="mono mono-sm mt-2 flex flex-wrap gap-x-3 gap-y-1 text-accent-ink">
                        {it.used?.map((s) => <Link key={s} href={`/work/${s}`} className="link-u" data-cursor="OPEN →">→ {name(s)}</Link>)}
                        {it.also?.map((a) => <span key={a} className="text-mute">+ {a}</span>)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Spec>

      <Spec name="AwsAtWork" id="AWS_AT_WORK" as="section" className="border-y border-ink bg-paper-2 py-16 md:py-24">
        <div className="frame">
          <div className="mono text-mute">FIG. 052 / AT WORK</div>
          <h2 className="display mt-3 text-[clamp(36px,6vw,100px)]">AWS, in production.</h2>
          <p className="mono mt-4 max-w-[70ch] text-mute"><Tip tip="on purpose.">{AWS_NOTE}</Tip></p>
          <div className="grid12 mt-10 gap-y-8">
            {AWS_BLOCKS.map((b) => (
              <article key={b.id} className="col-span-6 border border-ink bg-paper-3 p-5 md:col-span-8 md:p-8">
                <div className="mono text-accent-ink">{b.kicker}</div>
                <h3 className="display mt-2 text-[clamp(24px,2.8vw,40px)] !leading-[0.98]">{b.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {b.points.map((p) => (
                    <li key={p} className="flex gap-3 text-graphite"><i className="mt-[0.6em] block h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Spec>

      <Spec name="Lessons" id="THINGS_THAT_BIT_ME" as="section" className="frame py-16 md:py-24">
        <div className="mono mb-8 text-mute">THINGS THAT BIT ME</div>
        <ol>
          {LESSONS.map((l) => (
            <li key={l.n} className="grid12 border-t border-hair py-6">
              <span className="mono col-span-6 text-accent-ink md:col-span-1">{l.n}</span>
              <h3 className="display col-span-6 mt-1 text-[clamp(22px,2.6vw,38px)] !leading-[0.98] md:col-span-5 md:mt-0">{l.head}</h3>
              <div className="col-span-6 mt-3 md:col-span-5 md:col-start-8 md:mt-0">
                <p className="text-graphite">{l.body}</p>
                <p className="mono mono-sm mt-2 text-mute">FROM / {l.from.toUpperCase()}</p>
              </div>
            </li>
          ))}
        </ol>
      </Spec>
    </>
  );
}
