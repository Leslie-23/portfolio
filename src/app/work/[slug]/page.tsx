import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Slide from "@/components/Slide";
import Dither from "@/components/Dither";
import Ask from "@/components/Ask";
import { ownership } from "@/components/WorkCard";
import { WORK, getWork, sentence, type WorkItem } from "@/lib/work";

export function generateStaticParams() { return WORK.map((w) => ({ slug: w.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const w = getWork((await params).slug);
  return w ? { title: w.name, description: w.blurb, openGraph: w.image ? { images: [w.image] } : undefined } : {};
}


function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-x-10 gap-y-3 border-t border-line py-7 md:grid-cols-[220px_1fr] md:gap-y-4 md:py-12">
      <h2 className="text-[clamp(24px,2.2vw,32px)] font-medium tracking-[-0.035em]">{label}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Hero({ w }: { w: WorkItem }) {
  const p = w.project;
  if (w.phones && p?.gallery)
    return (
      <div className="panel flex items-center justify-center gap-[3%] overflow-hidden bg-[#e5ebe7] px-[5%] py-[6%] md:gap-[2.5%] md:px-[6%] md:py-[5%]">
        {p.gallery.slice(0, 4).map((g, i) => (
          <div key={g.src} className={`relative w-[30%] overflow-hidden rounded-[12%/6%] border-[3px] border-ink bg-ink sm:w-[22%] sm:border-[4px] ${i === 3 ? "max-sm:hidden" : ""}`} style={{ aspectRatio: "1179 / 2556", transform: `translateY(${i % 2 ? "-3%" : "3%"})` }}>
            <Image src={g.src} alt={`${w.name}: ${g.caption.toLowerCase()} screen`} fill sizes="22vw" className="object-cover object-top" priority={i < 2} />
          </div>
        ))}
      </div>
    );
  if (w.image)
    return (
      <a href={w.live ?? w.repo} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Open ${w.name}`}>
        <div className="frame-img aspect-[16/9] !rounded-[18px] border border-line">
          <Image src={w.image} alt={`${w.name}, the live product`} fill sizes="(min-width: 1024px) 80vw, 95vw" className="object-cover object-top" priority />
        </div>
      </a>
    );
  return <div className="panel h-[260px] overflow-hidden md:h-[360px]"><Dither shape={{ kind: "rings", cx: 0.75, cy: 0.35 }} cell={6} /></div>;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const w = getWork((await params).slug);
  if (!w) notFound();
  const p = w.project;
  const i = WORK.findIndex((x) => x.slug === w.slug);
  const next = WORK[(i + 1) % WORK.length];
  const meta = [
    ["Role", w.role],
    ["Category", w.category],
    ["Year", w.year],
    ["Status", w.status ? sentence(w.status) : "—"],
  ];
  // Trofficient's phone captures show personal data (BRIEF §4): only its public website captures appear here
  const showPhones = !!p?.gallery && w.slug !== "trofficient";
  const showWeb = !!p?.media && (!p.portrait || p.web);

  return (
    <>
      <Slide label={`Work · ${ownership(w.role)}`}>
        <Link href="/work" className="u mt-6 inline-block text-[15px] md:mt-8">All work</Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="text-[clamp(48px,7.4vw,116px)] font-medium leading-[0.95] tracking-[-0.055em]">{w.name}</h1>
            <p className="t-lead mt-5 max-w-[56ch]">{w.blurb}</p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {w.live && <a href={w.live} target="_blank" rel="noopener noreferrer" className="btn btn-solid">{w.slug === "git-helper" ? "View on npm" : "Visit the live product"}</a>}
            {w.repo && <a href={w.repo} target="_blank" rel="noopener noreferrer" className="btn">Source on GitHub</a>}
          </div>
        </div>

        <div className="mt-7 md:mt-10"><Hero w={w} /></div>

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 md:mt-10 md:grid-cols-4 md:gap-y-5">
          {meta.map(([k, v]) => <div key={k}><dt className="text-[13px] text-mute">{k}</dt><dd className="mt-1 text-[16px] font-medium tracking-[-0.01em]">{v}</dd></div>)}
        </dl>

        <div className="mt-10">
          {p ? (
            <>
              {p.story.map((b) => (
                <Row key={b.label} label={sentence(b.label)}>
                  <p className="max-w-[64ch] text-[17px] leading-[1.7] text-body md:text-[18px]">{b.body}</p>
                </Row>
              ))}
              <Row label="How it's built">
                <ol className="divide-y divide-line rounded-[16px] border border-line">
                  {p.layers.map((l, k) => (
                    <li key={l.key} className="grid gap-1 px-5 py-4 sm:grid-cols-[40px_1fr_1.3fr] sm:items-baseline">
                      <span className="label text-accent-ink">{String(k + 1).padStart(2, "0")}</span>
                      <span className="text-[16px] font-medium tracking-[-0.01em]">{sentence(l.label)}</span>
                      <span className="text-[15px] text-mute">{l.detail}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-[13px] text-mute">Top: what the user touches. Bottom: what holds it up.</p>
              </Row>
              {p.decisions.length > 0 && (
                <Row label="Key decisions">
                  <ul className="grid gap-3 lg:grid-cols-2">
                    {p.decisions.map((d) => (
                      <li key={d.title} className="panel p-5 md:p-6">
                        <h3 className="text-[19px] font-medium tracking-[-0.02em]">{d.title}</h3>
                        <p className="mt-2 text-[16px] leading-relaxed text-body">{d.body}</p>
                      </li>
                    ))}
                  </ul>
                </Row>
              )}
              <Row label="What I learned"><p className="max-w-[46ch] text-[clamp(22px,2vw,28px)] font-medium leading-snug tracking-[-0.025em]">{p.learnings}</p></Row>
            </>
          ) : (
            <Row label="Overview">
              <p className="max-w-[64ch] text-[18px] leading-[1.7] text-body">{w.blurb}</p>
              {w.note && <p className="mt-4 text-[15px] text-mute">{w.note}</p>}
              <p className="mt-4 text-[15px] text-mute">A smaller build, so there&apos;s no full write-up. The {w.repo ? "source" : "live product"} is the best place to see it.</p>
            </Row>
          )}

          {w.stack.length > 0 && (
            <Row label="Stack">
              <ul className="flex flex-wrap gap-2">{w.stack.map((s) => <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-[14px]">{s}</li>)}</ul>
            </Row>
          )}

          {p && (showPhones || showWeb) && (
            <Row label="Screens">
              {showPhones && (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {p.gallery!.map((g) => (
                    <li key={g.src}>
                      <div className="relative overflow-hidden rounded-[14px] border border-line bg-ink" style={{ aspectRatio: "1179 / 2556" }}>
                        <Image src={g.src} alt={`${w.name}: ${g.caption.toLowerCase()} screen`} fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-cover object-top" />
                      </div>
                      <p className="mt-2 text-[13px] text-mute">{sentence(g.caption)}</p>
                    </li>
                  ))}
                </ul>
              )}
              {showWeb && (
                <div className={`grid gap-3 ${p.desktopOnly ? "" : "md:grid-cols-[1fr_220px]"} ${showPhones ? "mt-6" : ""}`}>
                  <div className="frame-img border border-line"><Image src={`/work/${p.media}/desktop.jpg`} alt={`${w.name} on desktop`} width={1440} height={900} className="h-auto w-full" /></div>
                  {!p.desktopOnly && <div className="frame-img border border-line md:self-end"><Image src={`/work/${p.media}/mobile.jpg`} alt={`${w.name} on a phone`} width={390} height={844} className="h-auto w-full" /></div>}
                </div>
              )}
            </Row>
          )}
        </div>

        <Link href={`/work/${next.slug}`} className="group mt-6 flex items-end justify-between gap-6 border-t border-line pt-8">
          <span><span className="text-[13px] text-mute">Next project</span><span className="mt-1 block text-[clamp(28px,3.4vw,48px)] font-medium tracking-[-0.045em] group-hover:text-accent-ink">{next.name}</span></span>
          <span className="text-[28px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
        </Link>
      </Slide>
      <Ask />
    </>
  );
}
