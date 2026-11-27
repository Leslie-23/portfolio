import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Slide, { H } from "@/components/Slide";
import ExperienceList from "@/components/ExperienceList";
import Ask from "@/components/Ask";
import { AFFILIATIONS, APPROACH, INTERESTS, TOOLKIT, PERSON } from "@/lib/data";
import { INFRA, LESSONS } from "@/lib/infra";
import { getWork } from "@/lib/work";

export const metadata: Metadata = { title: "About", description: "Who Leslie Paul Ajayi is, how he thinks, where he works, what he builds with and what he's learned the hard way." };

// Each theme is grounded in something he actually built (see the linked work)
const THINKING = [
  { t: "Engineering", b: "I learn a system by taking it apart, then building my own version and finding where it breaks: a voice platform behind NAT, a chess engine with no dependencies, a crawler that refuses private addresses.", link: { label: "VoIP", href: "/work/vop" } },
  { t: "Product", b: "The decisions that matter are about people. In StepPool your payout depends only on your own goal, never your rank. In Beagine there's a receipt for every job and approval before any price changes. Trust is a feature.", link: { label: "StepPool", href: "/work/steppool" } },
  { t: "Entrepreneurship", b: "I founded Trofficient to modernise a transit network nobody centrally controls, and I'm CTO at Beagine. In a company, architecture has to serve delivery, so I ship the executable version first.", link: { label: "Trofficient", href: "/work/trofficient" } },
];

// BRIEF §4: employer and affiliate systems are names and logos only. Drop any capability whose only evidence is that work.
const PRIVATE = /transport for ghana|tap n'? ?go|moveet|global icons|nss|at work/i;
const publicEvidence = (it: { projects: string[]; also?: string[] }) => it.projects.length > 0 || !(it.also ?? []).some((a) => PRIVATE.test(a));

const SKILL_LABEL: Record<string, string> = { interfaces: "Interfaces", systems: "Backend and data", infra: "Infrastructure", product: "Product engineering" };

export default function About() {
  return (
    <>
      <Slide label="About">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <H as="h1" className="t-hero">About</H>
          <p className="t-lead">The person behind the work: how I think, where I work, what I build with, and what I&apos;ve learned the hard way.</p>
        </div>

        {/* profile */}
        <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-[minmax(240px,380px)_1fr]">
          <div className="panel relative aspect-[4/5] overflow-hidden bg-[#e7ece9]">
            <Image src="/portrait/leslie.png" alt="Leslie Paul Ajayi, a faceted greyscale portrait" fill sizes="(min-width: 768px) 380px, 90vw" className="object-contain object-bottom" priority />
          </div>
          <div>
            <p className="max-w-[24ch] text-[clamp(26px,2.6vw,38px)] font-medium leading-[1.15] tracking-[-0.035em]">
              Software engineer in Accra. I build systems that go to production, not demos that die in a repo.
            </p>
            <div className="mt-6 max-w-[62ch] space-y-4 text-[17px] leading-[1.7] text-body">
              <p>I work at Global Icons, a technology company in Accra. I&apos;m the founder of <Link href="/work/trofficient" className="u text-ink">Trofficient</Link>, transit technology for Ghana&apos;s informal trotro network, and CTO of <Link href="/work/beagine" className="u text-ink">Beagine</Link>, a home-services marketplace.</p>
              <p>I studied Information Technology at Regional Maritime University. Most of what I know I learned by taking something apart and then building my own version of it.</p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
              {[["Based", PERSON.place], ["Works at", "Global Icons"], ["Studied", "BSc IT, RMU"], ["On GitHub since", "January 2022"]].map(([k, v]) => (
                <div key={k}><dt className="text-[13px] text-mute">{k}</dt><dd className="mt-1 text-[15px] font-medium">{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </Slide>

      <Slide label="How I think">
        <H className="t-slide mt-10 max-w-[16ch]">I keep asking why, until I can build it</H>
        <ul className="mt-10 grid gap-3 md:grid-cols-3">
          {THINKING.map((x) => (
            <li key={x.t} className="panel flex flex-col p-6 md:p-7">
              <h3 className="t-card">{x.t}</h3>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-body">{x.b}</p>
              <Link href={x.link.href} className="u mt-5 self-start text-[15px] font-medium">See it in {x.link.label}</Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-14 text-[clamp(24px,2.2vw,32px)] font-medium tracking-[-0.035em]">Problem solving, as a sequence</h3>
        <ol className="mt-6 grid gap-6 border-t-2 border-ink pt-6 sm:grid-cols-2 lg:grid-cols-5">
          {APPROACH.map((s) => (
            <li key={s.k}>
              <p className="label text-accent-ink">{s.k}</p>
              <h4 className="mt-2 text-[19px] font-medium tracking-[-0.02em]">{s.t}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">{s.b}</p>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide id="experience" label="Experience">
        <H className="t-slide mt-10">Experience</H>
        <div className="mt-10"><ExperienceList /></div>
        <p className="label mt-10 text-mute">Organisations</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {AFFILIATIONS.map((a) => (
            <li key={a.id} className="panel flex flex-col gap-3 p-4">
              <Image src={a.img} alt="" width={a.w} height={a.h} className="h-10 w-auto max-w-[100px] object-contain object-left" />
              <div><p className="text-[15px] font-medium">{a.name}</p><p className="text-[13px] text-mute">{a.id === "global-icons" ? "Where I work" : a.note ?? "Affiliation"}</p></div>
            </li>
          ))}
        </ul>
      </Slide>

      <Slide label="Capabilities">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <H className="t-slide">What I build with</H>
          <p className="t-lead">Grouped by what it&apos;s for, and linked to the work where I used it. No percentages.</p>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {TOOLKIT.map((g) => (
            <div key={g.id}>
              <h3 className="border-b border-line pb-3 text-[19px] font-medium tracking-[-0.02em]">{SKILL_LABEL[g.id] ?? g.label}</h3>
              <ul className="mt-3 space-y-3">
                {g.items.filter(publicEvidence).map((it) => {
                  const used = it.projects.map((s) => getWork(s)).filter(Boolean).slice(0, 3);
                  return (
                    <li key={it.name}>
                      <p className="text-[15px] font-medium">{it.name}</p>
                      <p className="text-[13px] leading-relaxed text-mute">
                        {used.length > 0 ? used.map((w, k) => <span key={w!.slug}>{k > 0 && ", "}<Link href={`/work/${w!.slug}`} className="hover:text-ink hover:underline">{w!.name}</Link></span>) : it.also?.join(", ")}
                        {it.projects.length > 3 && ` +${it.projects.length - 3}`}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Slide>

      <Slide id="infrastructure" label="Infrastructure">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <H className="t-slide">Servers, networks and delivery</H>
          <p className="t-lead">From my own projects only. Each line traces to a real config or doc in the repo.</p>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {INFRA.map((g) => (
            <section key={g.id} className="panel p-6 md:p-7">
              <h3 className="label text-accent-ink">{g.label}</h3>
              <p className="mt-2 text-[15px] text-mute">{g.blurb}</p>
              <ul className="mt-5 space-y-4">
                {g.items.map((it) => <li key={it.name}><p className="text-[16px] font-medium tracking-[-0.01em]">{it.name}</p><p className="mt-0.5 text-[15px] leading-relaxed text-body">{it.note}</p></li>)}
              </ul>
            </section>
          ))}
        </div>
        <h3 className="mt-14 text-[clamp(24px,2.2vw,32px)] font-medium tracking-[-0.035em]">Things that bit me</h3>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {LESSONS.map((l) => (
            <li key={l.n} className="grid gap-2 py-6 md:grid-cols-[220px_1fr]">
              <p className="label pt-1 text-mute">{l.from}</p>
              <div><p className="text-[18px] font-medium tracking-[-0.02em]">{l.head}</p><p className="mt-1.5 max-w-[68ch] text-[16px] leading-relaxed text-body">{l.body}</p></div>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide label="Interests">
        <H className="t-slide mt-10">What I&apos;m drawn to</H>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {INTERESTS.map((x) => (
            <li key={x.t} className="panel flex flex-col p-6">
              <h3 className="text-[20px] font-medium leading-tight tracking-[-0.025em]">{x.t}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">{x.b}</p>
              <Link href={x.proof.href} className="u mt-5 self-start text-[14px] font-medium">{x.proof.label}</Link>
            </li>
          ))}
        </ul>
      </Slide>

      <Ask />
    </>
  );
}
