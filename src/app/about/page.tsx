import type { Metadata } from "next";
import { Spec } from "@/components/Spec";
import { FlowChain, OperatingCharacteristics } from "@/components/Characteristics";
import Affiliations from "@/components/Affiliations";

export const metadata: Metadata = { title: "About" };

const LOG = [
  ["2022", "Joins GitHub."],
  ["2024", "First full-stack builds: a MERN task gamifier, a campus food-ordering platform, a school management system."],
  ["2025", "A hackathon project aimed at a global speech-impairment problem, plus more full-stack and mobile builds (e-commerce, fitness app, React Native)."],
  ["2026", "Ships to production (sellisspa.com, captivatinghometrade.com), publishes an npm package, starts osAfrica, and builds StepPool, 4-Man Chess, scrapy-mcp and Elena."],
];

// all from the bio below: nothing here that isn't already said on the page
const FACTS: [string, string][] = [
  ["BASED", "ACCRA, GHANA"],
  ["WORKS AT", "GLOBAL ICONS"],
  ["FOUNDER", "TROFFICIENT"],
  ["ALSO", "ENGINEERING LEAD, RETAIL"],
  ["STUDIED", "IT / REGIONAL MARITIME UNIV."],
  ["ON GITHUB SINCE", "2022"],
];

export default function About() {
  return (
    <>
      <Spec name="AboutHeader" id="ABOUT" as="header" className="frame pb-10 pt-8 md:pb-14 md:pt-12">
        <div className="mono flex items-center justify-between border-b-2 border-ink pb-2">
          <span className="flex items-center gap-3"><span className="chip">FIG. 03</span><span className="text-mute">HOW I THINK</span></span>
          <span className="text-mute max-sm:hidden">SHEET 03 / 06</span>
        </div>
        <div className="grid12 mt-6 items-end gap-y-8 md:mt-8">
          <div className="col-span-6 md:col-span-7">
            <h1 className="display text-[clamp(56px,9vw,160px)]">I keep<br />asking why.</h1>
            <p className="display mt-4 text-[clamp(30px,4.6vw,80px)]"><span className="mark">Until I can</span><br /><span className="mark">build it.</span></p>
          </div>
          <dl className="mono col-span-6 grid grid-cols-2 border-t border-ink md:col-span-5">
            {FACTS.map(([k, v]) => (
              <div key={k} className="border-b border-hair py-3 pr-3">
                <dt className="mono-sm text-mute">{k}</dt>
                <dd className="mt-0.5 text-accent-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Spec>

      <Spec name="Story" id="STORY" as="section" className="frame grid12 gap-y-10 border-t border-ink py-12 md:py-16">
        <div className="col-span-6 md:col-span-5">
          <div className="mono"><span className="chip">01</span> <span className="text-mute">WHO</span></div>
          <p className="display mt-5 max-w-[14ch] text-[clamp(32px,3.8vw,60px)] !leading-[0.95]">Systems that go to production, <span className="text-accent-ink">not demos that die in a repo.</span></p>
        </div>
        <div className="col-span-6 space-y-5 text-[19px] leading-relaxed text-graphite md:col-span-6 md:col-start-7">
          <p>I'm Leslie Paul Ajayi, a software engineer in Accra. I build systems that go to production, not demos that die in a repo.</p>
          <p>I work at Global Icons, a technology company in Accra, and I'm the founder of Trofficient, transit technology for Ghana's informal trotro network. I'm also engineering lead at a retail company where the software I write moves real inventory and real money.</p>
          <p>I studied Information Technology at Regional Maritime University. Most of what I know I learned by taking something apart and then building my own version of it.</p>
        </div>
      </Spec>

      <Affiliations className="border-t border-ink py-12 md:py-16" />

      <Spec name="HowIWork" id="HOW_I_WORK" as="section" className="frame border-t border-ink py-12 md:py-16">
        <div className="mono mb-8"><span className="chip">02</span> <span className="text-mute">HOW I WORK</span></div>
        {[
          ["Ship the executable MVP, then layer.", "I've killed my own over-engineered microservice plans when a monolith shipped faster. Architecture serves delivery, not the reverse."],
          ["Full-stack by necessity, backend by preference.", "I'm most interested in the parts users never see: data models, payment integration, the failure modes nobody plans for."],
          ["Ghana-first constraints.", "Mobile money over cards. Intermittent connectivity. Low-end devices. Building for this market is a forcing function for discipline."],
        ].map(([t, b], i) => (
          <div key={t} className="grid12 border-t border-hair py-6">
            <span className="mono col-span-6 text-accent-ink md:col-span-1">0{i + 1}</span>
            <h3 className="display col-span-6 mt-2 text-[clamp(24px,3.2vw,48px)] !leading-[0.98] md:col-span-6 md:mt-0">{t}</h3>
            <p className="col-span-6 mt-3 text-graphite md:col-span-4 md:col-start-9 md:mt-0">{b}</p>
          </div>
        ))}
      </Spec>

      <section className="frame grid12 gap-y-16 border-t border-ink py-12 md:py-16">
        <div className="col-span-6 md:col-span-6"><div className="mono mb-4"><span className="chip">03</span> <span className="text-mute">DEFAULT BEHAVIOUR</span></div><FlowChain /></div>
        <div className="col-span-6 md:col-span-6"><OperatingCharacteristics /></div>
      </section>

      <Spec name="CommitLog" id="COMMIT_LOG" as="section" className="frame border-t border-ink py-12 md:py-16">
        <div className="mono mb-8"><span className="chip">04</span> <span className="text-mute">FROM THE COMMIT LOG</span></div>
        <ol>
          {LOG.map(([y, t]) => (
            <li key={y} className="grid12 border-t border-hair py-5">
              <span className="display col-span-6 text-[clamp(28px,3.6vw,56px)] md:col-span-3">{y}</span>
              <p className="col-span-6 mt-2 max-w-[60ch] text-graphite md:col-span-7 md:col-start-5 md:mt-0">{t}</p>
            </li>
          ))}
        </ol>
      </Spec>
    </>
  );
}
