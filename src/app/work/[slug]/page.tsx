import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Slide from "@/components/Slide";
import Dither from "@/components/Dither";
import Ask from "@/components/Ask";
import { ownership } from "@/components/WorkCard";
import JsonLd from "@/components/JsonLd";
import { WORK, getWork, sentence, type WorkItem } from "@/lib/work";
import { SITE_URL, abs, breadcrumbLd } from "@/lib/seo";

export function generateStaticParams() { return WORK.map((w) => ({ slug: w.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const w = getWork((await params).slug);
  if (!w) return {};
  const url = `/work/${w.slug}`;
  const images = w.image ? [w.image] : undefined;
  return {
    title: w.name,
    description: w.blurb,
    alternates: { canonical: url },
    // openGraph/twitter replace the layout's objects wholesale, so restate what must survive
    openGraph: { type: "website", url, title: w.name, description: w.blurb, siteName: "Leslie Paul Ajayi", locale: "en_GH", images },
    twitter: { card: "summary_large_image", title: w.name, description: w.blurb, images },
  };
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
  if (w.phones && w.phones.length)
    return (
      <div className="panel flex items-center justify-center gap-[3%] overflow-hidden bg-[#e5ebe7] px-[5%] py-[6%] md:gap-[2.5%] md:px-[6%] md:py-[5%]">
        {w.phones.slice(0, 4).map((src, i) => (
          <div key={src} className={`relative w-[30%] overflow-hidden rounded-[12%/6%] border-[2px] border-ink bg-ink sm:w-[22%] sm:border-[2.5px] ${i === 3 ? "max-sm:hidden" : ""}`} style={{ aspectRatio: "1179 / 2556", transform: `translateY(${i % 2 ? "-3%" : "3%"})` }}>
            <Image src={src} alt={`${w.name}: a screen from the app`} fill sizes="22vw" className="object-cover object-top" priority={i < 2} />
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

const APP_ICON: Record<string, string> = { "Rider app": "/work/icons/trofficient.png", "Driver app": "/work/icons/trofficient-driver.png" };

/** Desktop screenshots in a grid, then phone screenshots in phone-shaped frames. For the smaller builds that have no full write-up. */
function Shots({ shots, name }: { shots: NonNullable<WorkItem["shots"]>; name: string }) {
  const wide = shots.filter((x) => !x.phone), phones = shots.filter((x) => x.phone);
  return (
    <div className="space-y-9">
      <ul className="grid gap-x-3 gap-y-6 md:grid-cols-2">
        {wide.map((g, i) => (
          <li key={g.src} className={i === 0 ? "md:col-span-2" : ""}>
            <div className="frame-img border border-line"><Image src={g.src} alt={`${name}: ${g.caption.toLowerCase()}`} width={1280} height={800} sizes={i === 0 ? "(min-width: 1024px) 80vw, 95vw" : "(min-width: 1024px) 40vw, 95vw"} className="h-auto w-full" /></div>
            <p className="mt-2 text-[13px] text-mute">{sentence(g.caption)}</p>
          </li>
        ))}
      </ul>
      {phones.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {phones.map((g) => (
            <li key={g.src}>
              <div className="relative overflow-hidden rounded-[14px] border border-line bg-ink" style={{ aspectRatio: "390 / 844" }}>
                <Image src={g.src} alt={`${name}: ${g.caption.toLowerCase()}`} fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-cover object-top" />
              </div>
              <p className="mt-2 text-[13px] text-mute">{sentence(g.caption)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Phone screens, grouped by app when a project ships more than one (Trofficient: rider and driver). */
function Screens({ gallery, name }: { gallery: NonNullable<WorkItem["gallery"]>; name: string }) {
  const groups: { app?: string; items: typeof gallery }[] = [];
  for (const g of gallery) {
    const last = groups[groups.length - 1];
    if (last && last.app === g.app) last.items.push(g); else groups.push({ app: g.app, items: [g] });
  }
  return (
    <div className="space-y-9">
      {groups.map((grp, gi) => (
        <div key={gi}>
          {grp.app && (
            <div className="mb-4 flex items-center gap-3">
              {APP_ICON[grp.app] && <Image src={APP_ICON[grp.app]} alt="" width={40} height={40} className="rounded-[10px]" />}
              <h3 className="text-[19px] font-medium tracking-[-0.02em]">{grp.app}</h3>
            </div>
          )}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {grp.items.map((g) => (
              <li key={g.src}>
                <div className="relative overflow-hidden rounded-[14px] border border-line bg-ink" style={{ aspectRatio: "1179 / 2556" }}>
                  <Image src={g.src} alt={`${name}: ${g.caption.toLowerCase()} screen`} fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-cover object-top" />
                </div>
                <p className="mt-2 text-[13px] text-mute">{sentence(g.caption)}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
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
  const gallery = w.gallery;
  const showPhones = !!gallery && gallery.length > 0;
  const showWeb = !!p?.media && (!p.portrait || !!p.web);

  return (
    <>
      <JsonLd data={[
        {
          "@type": "CreativeWork",
          name: w.name,
          description: w.blurb,
          url: abs(`/work/${w.slug}`),
          genre: w.category,
          dateCreated: w.year,
          keywords: w.stack.join(", "),
          ...(w.image ? { image: w.image.startsWith("http") ? w.image : abs(w.image) } : {}),
          // "contributor", not "creator": the role field states real ownership and this must not inflate it
          contributor: { "@id": `${SITE_URL}/#person` },
          ...(w.live ? { sameAs: [w.live] } : {}),
        },
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }, { name: w.name, path: `/work/${w.slug}` }]),
      ]} />
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
              {!w.shots?.length && <p className="mt-4 text-[15px] text-mute">A smaller build, so there&apos;s no full write-up. The {w.repo ? "source" : "live product"} is the best place to see it.</p>}
            </Row>
          )}

          {w.stack.length > 0 && (
            <Row label="Stack">
              <ul className="flex flex-wrap gap-2">{w.stack.map((s) => <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-[14px]">{s}</li>)}</ul>
            </Row>
          )}

          {!p && !!w.shots?.length && <Row label="Screens"><Shots shots={w.shots} name={w.name} /></Row>}

          {(showPhones || (p && showWeb)) && (
            <Row label="Screens">
              {showPhones && <Screens gallery={gallery!} name={w.name} />}
              {p && showWeb && (
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
