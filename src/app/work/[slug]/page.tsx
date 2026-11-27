import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject, liveFor, type Block } from "@/lib/data";
import Image from "next/image";
import CaseHero from "@/components/CaseHero";
import Deconstruct from "@/components/Deconstruct";
import FlowDiagram from "@/components/FlowDiagram";
import { Spec, Tip } from "@/components/Spec";

export function generateStaticParams() { return PROJECTS.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.name, description: p.blurb } : {};
}

// every case study keeps its own rhythm
const RHYTHM: Record<string, ("big" | "cols" | "stack")[]> = {
  trofficient: ["cols", "big", "stack", "cols", "cols"],
  steppool: ["big", "stack", "big", "cols"],
  "four-man-chess": ["cols", "cols", "big", "stack"],
  "scrapy-mcp": ["big", "stack", "big"],
  "ai-sme": ["cols", "stack", "big"],
  elena: ["big", "cols", "stack"],
};

function Story({ b, kind, i }: { b: Block; kind: "big" | "cols" | "stack"; i: number }) {
  if (kind === "big")
    return (
      <Spec name="Statement" id={b.label.replace(/\W+/g, "_")} className="frame grid12 border-t border-hair py-10 md:py-16">
        <div className="mono col-span-6 text-mute md:col-span-12">{String(i + 1).padStart(2, "0")} / {b.label}</div>
        <p className="display col-span-6 mt-4 text-[clamp(26px,4.4vw,72px)] !leading-[0.98] md:col-span-11">{b.body}</p>
      </Spec>
    );
  if (kind === "stack")
    return (
      <Spec name="Callout" id={b.label.replace(/\W+/g, "_")} className="frame grid12 py-10">
        <div className="col-span-6 border border-ink bg-paper-3 p-6 md:col-span-8 md:col-start-3 md:p-10">
          <div className="mono flex justify-between text-mute"><span>{b.label}</span><span>N{i + 1}</span></div>
          <p className="mt-4 text-[clamp(18px,1.9vw,26px)] leading-snug">{b.body}</p>
        </div>
      </Spec>
    );
  return (
    <Spec name="TextBlock" id={b.label.replace(/\W+/g, "_")} className="frame grid12 border-t border-hair py-8 md:py-10">
      <div className="mono col-span-6 text-mute md:col-span-3">{String(i + 1).padStart(2, "0")} / {b.label}</div>
      <p className="col-span-6 mt-2 max-w-[60ch] text-[19px] leading-relaxed text-graphite md:col-span-7 md:col-start-5 md:mt-0">{b.body}</p>
    </Spec>
  );
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={null}><Case params={params} /></Suspense>;
}

async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const rhythm = RHYTHM[p.slug] ?? [];

  return (
    <article>
      <Spec name="CaseHeader" id={`FIG_${p.fig}`} as="header" className="frame grid12 py-10 md:py-16">
        <div className="mono col-span-6 flex justify-between text-mute md:col-span-12">
          <Link href="/work" className="link-u" data-cursor="← BACK">← WORK</Link>
          <Tip tip="yes, the numbering actually means something.">FIG. {p.fig} / {String(idx + 1).padStart(2, "0")} OF {String(PROJECTS.length).padStart(2, "0")}</Tip>
        </div>
        <h1 className="display col-span-6 mt-6 text-[clamp(40px,8vw,140px)] md:col-span-12">{p.name}</h1>
        <p className="col-span-6 mt-6 max-w-[48ch] text-xl leading-snug md:col-span-6">{p.blurb}</p>
        <dl className="mono col-span-6 mt-8 grid grid-cols-2 gap-x-6 gap-y-4 md:col-span-5 md:col-start-8 md:mt-6">
          <div><dt className="text-mute">YEAR</dt><dd>{p.year}</dd></div>
          <div><dt className="text-mute">ROLE</dt><dd>{p.role}</dd></div>
          <div><dt className="text-mute">STATUS</dt><dd><Tip tip="for now.">{p.status}</Tip></dd></div>
          <div><dt className="text-mute">CATEGORY</dt><dd>{p.categories.join(" / ")}</dd></div>
          <div className="col-span-2"><dt className="text-mute">TECHNOLOGY</dt><dd>{p.stack.join(" · ")}</dd></div>
          <div className="col-span-2 flex flex-wrap gap-3">
            {liveFor(p.slug, p.live) && <a href={liveFor(p.slug, p.live)} target="_blank" rel="noopener noreferrer" className="btn" data-cursor="FOLLOW →">LIVE ↗</a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn" data-cursor="FOLLOW →">SOURCE ↗</a>}
          </div>
        </dl>
      </Spec>

      <section className="frame pb-16"><CaseHero project={p} /></section>

      {p.story.map((b, i) => <Story key={b.label} b={b} i={i} kind={rhythm[i] ?? "cols"} />)}


      {p.media && p.portrait && p.gallery && (
        <Spec name="Screens" id="SCREENS" as="section" className="frame border-t border-ink py-10 md:py-16">
          <div className="mono mb-6 text-mute">FIG. {p.fig}-A / THE APP, SCREEN BY SCREEN</div>
          <ul className="grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {p.gallery.map((g) => (
              <li key={g.src}>
                <figure data-cursor="INSPECT" data-cursor-dim>
                  <div className="relative aspect-[1179/2556] w-full overflow-hidden border border-ink bg-ink"><Image src={g.src} alt={`${p.name}: ${g.caption.toLowerCase()} screen`} fill sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 46vw" className="object-cover object-top" /></div>
                  <figcaption className="mono mt-2 text-mute">{g.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Spec>
      )}
      {p.media && (!p.portrait || p.web) && (
        <Spec name="Screens" id="SCREENS" as="section" className="frame grid12 gap-y-6 border-t border-ink py-10 md:py-16">
          <div className="mono col-span-6 text-mute md:col-span-12">FIG. {p.fig}-A / {p.portrait ? "THE WEBSITE" : "THE REAL THING, IN PRODUCTION"}</div>
          <figure className={`col-span-6 ${p.desktopOnly ? "md:col-span-12" : "md:col-span-9"}`} data-cursor="INSPECT" data-cursor-dim>
            <Image src={`/work/${p.media}/desktop.jpg`} alt={`${p.name} on desktop`} width={p.desktopOnly ? 1600 : 1440} height={p.desktopOnly ? 939 : 900} className="h-auto w-full border border-ink" />
            <figcaption className="mono mt-2 flex justify-between text-mute"><span>{p.desktopOnly ? "TERMINAL" : "DESKTOP"}</span><span>{p.desktopOnly ? "120 × 28" : "1440 × 900"}</span></figcaption>
          </figure>
          {!p.desktopOnly && <figure className="col-span-6 md:col-span-3 md:self-end" data-cursor="INSPECT" data-cursor-dim>
            <Image src={`/work/${p.media}/mobile.jpg`} alt={`${p.name} on a phone`} width={390} height={844} className="mx-auto h-auto w-full max-w-[260px] border border-ink md:max-w-none" />
            <figcaption className="mono mt-2 flex justify-between text-mute"><span>MOBILE</span><span>390 × 844</span></figcaption>
          </figure>}
        </Spec>
      )}

      <Deconstruct project={p} />

      <Spec name="SystemSection" id="SYSTEM" as="section" className="frame grid12 gap-y-10 py-12 md:py-20">
        <div className="col-span-6 md:col-span-5">
          <div className="mono text-mute">FIG. {p.fig}-B / SYSTEM</div>
          <h2 className="display mt-3 text-[clamp(32px,5vw,80px)]">Top to<br />bottom.</h2>
          <p className="mt-4 max-w-[34ch] text-graphite">Hover or focus a layer. Each one only talks to its neighbours.</p>
        </div>
        <div className="col-span-6 md:col-span-7"><FlowDiagram project={p} /></div>
      </Spec>

      <Spec name="KeyDecisions" id="KEY_DECISIONS" as="section" className="frame border-t border-ink py-10 md:py-14">
        <div className="mono mb-8 text-mute">KEY DECISIONS</div>
        <ol>
          {p.decisions.map((d, i) => (
            <li key={d.title} className="grid12 border-t border-hair py-6">
              <span className="mono col-span-1 text-accent-ink">D{i + 1}</span>
              <h3 className="display col-span-5 text-[clamp(22px,2.6vw,38px)] !leading-[0.98] md:col-span-5">{d.title}</h3>
              <p className="col-span-6 mt-3 text-graphite md:col-span-5 md:col-start-8 md:mt-0">{d.body}</p>
            </li>
          ))}
        </ol>
      </Spec>

      <Spec name="Learnings" id="LEARNINGS" as="section" className="frame grid12 py-12 md:py-16">
        <div className="mono col-span-6 text-mute md:col-span-3">LEARNED</div>
        <p className="display col-span-6 text-[clamp(26px,4vw,64px)] !leading-[0.98] md:col-span-9">{p.learnings}</p>
      </Spec>

      <Spec name="NextProject" id="NEXT" as="section" className="border-t border-ink">
        <Link href={`/work/${next.slug}`} className="frame group flex items-end justify-between py-10" data-cursor="OPEN FIG. →">
          <span><span className="mono text-mute">NEXT / FIG. {next.fig}</span><span className="display mt-2 block text-[clamp(36px,7vw,120px)] transition-transform group-hover:translate-x-3 group-hover:text-accent-ink">{next.name}</span></span>
          <span className="display text-6xl">→</span>
        </Link>
      </Spec>
    </article>
  );
}
