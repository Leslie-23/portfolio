import Image from "next/image";
import Link from "next/link";
import Slide, { H } from "@/components/Slide";
import Dither, { type Shape } from "@/components/Dither";
import WorkCard, { ownership } from "@/components/WorkCard";
import ExperienceList from "@/components/ExperienceList";
import AppMarquee from "@/components/AppMarquee";
import StoryTimeline from "@/components/StoryTimeline";
import BustBuild from "@/components/BustBuild";
import StatMarquee from "@/components/StatMarquee";
import CopyCommand from "@/components/CopyCommand";
import Ask from "@/components/Ask";
import { AFFILIATIONS, NOTES, PROJECTS, SHIPPED } from "@/lib/data";
import { WORK, getWork } from "@/lib/work";

const STRIP = [
  { icon: "/work/icons/trofficient.png", name: "Trofficient", what: "Transit technology", href: "/work/trofficient", live: false },
  { icon: "/work/icons/beagine.png", name: "Beagine", what: "Home-services marketplace", href: "/work/beagine", live: true },
  { icon: "/work/icons/global-icons.svg", name: "Global Icons", what: "Where I work", href: "#experience", live: true },
  { icon: "/work/icons/vop.svg", name: "VoIP", what: "Voice infrastructure", href: "/work/vop", live: true },
  { icon: "/work/icons/git-helper.svg", name: "git-helper", what: "Git CLI on npm", href: "/work/git-helper", live: true },
];

// Leslie's own principles (his profile README), each tied to the work that shows it
const THESIS_LINK: Record<string, string> = { Trofficient: "trofficient", VoIP: "vop", Beagine: "beagine" };
const THESIS: { tag: string; t: string; b: string; shape: Shape }[] = [
  { tag: "Trofficient", t: "Ship the executable MVP, then layer", b: "I've killed my own over-engineered microservice plans when a monolith shipped faster. Architecture serves delivery, not the reverse.", shape: { kind: "sphere", cx: 0.5, cy: 1.05, r: 0.62 } },
  { tag: "VoIP", t: "Backend by preference", b: "Full-stack by necessity. Most interested in what users never see: data models, payments and the failure modes nobody plans for.", shape: { kind: "rings", cx: 0.5, cy: 0.5 } },
  { tag: "Beagine", t: "Ghana-first constraints", b: "Mobile Money over cards. Intermittent connectivity. Low-end devices. Here they aren't edge cases; they are the market.", shape: { kind: "fill", density: 0.62, fade: "down" } },
];

// Leslie's "loop", in his words, with the evidence behind each step
const LOOP = [
  { n: "01", w: "Build", line: `${PROJECTS.length} case studies and ${PROJECTS.filter((p) => p.live).length + SHIPPED.length} live sites and apps, from a step-challenge game to a voice platform.`, href: "/work", cta: "See the work" },
  { n: "02", w: "Test", line: "40 tests on the voice platform. 36 on the web crawler. A 40-game tournament to find out whether the chess bots were actually getting smarter.", href: "/work/four-man-chess", cta: "The bot tournament" },
  { n: "03", w: "Question", line: "Why does every endpoint look offline? Because nothing ever checked that they were reachable. That bug took a full-stack rehearsal to find.", href: "/about#infrastructure", cta: "What bit me" },
  { n: "04", w: "Repeat", line: "Tools and experiments are where the next thing starts: half-built ideas and things I'm still breaking on purpose.", href: "/work?filter=Tools", cta: "Tools and experiments" },
];


const NOTE_COVERS: Shape[] = [{ kind: "sphere", cx: 0.3, cy: 0.75, r: 0.55 }, { kind: "rings", cx: 0.7, cy: 0.4 }, { kind: "fill", density: 0.55, fade: "up" }];

export default function Home() {
  const featured = ["trofficient", "beagine", "vop", "steppool", "four-man-chess", "ai-sme"].map((s) => getWork(s)!);
  const [lead, ...rest] = featured;
  const scrapy = getWork("scrapy-mcp")!;
  const orgs = AFFILIATIONS.slice(1);

  return (
    <>
      {/* 01 COVER */}
      <Slide id="cover" label="Leslie Paul Ajayi, profile 2026" deck className="overflow-x-clip lg:min-h-[calc(100svh-var(--bar))]">
        <div className="relative z-10 grid items-center gap-x-10 lg:grid-cols-[1.7fr_1fr]">
          <div className="order-2 lg:order-1">
            <p className="pill label mt-6 text-ink lg:mt-16">Software engineer · Accra, Ghana</p>
            <H as="h1" className="t-hero mt-5 !text-[clamp(28px,8.4vw,40px)] md:mt-6 md:!text-[clamp(39px,5.1vw,84px)]">Built for Africa.<br />Systems for society.<br />Engineered for impact</H>
            <p className="t-lead mt-5 max-w-[44ch] !text-ink md:mt-7">
              I&apos;m Leslie Paul Ajayi: software engineer at Global Icons, founder of Trofficient and CTO of Beagine. I build systems that go to production, not demos that die in a repo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="btn btn-solid">View the work</Link>
              <a href="#contact" className="btn">Get in touch</a>
            </div>
          </div>
          <div className="contents lg:order-2 lg:mt-0 lg:block lg:h-[min(640px,calc(100svh-300px))]">
            <BustBuild className="absolute right-[-22%] top-[1%] -z-10 w-[104%] aspect-[687/1083] lg:relative lg:right-auto lg:top-auto lg:z-auto lg:mx-auto lg:h-full lg:w-auto" />
          </div>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-line pt-6 sm:grid-cols-3 md:mt-10 md:pt-7 lg:grid-cols-5">
          {STRIP.map((s) => (
            <li key={s.name} className="group/li relative">
              <Image src={s.icon} alt="" aria-hidden width={64} height={64} className="pointer-events-none absolute left-5 top-1/2 h-14 w-14 -translate-y-1/2 rotate-[-12deg] select-none rounded-[22%] object-contain opacity-[0.16] transition-opacity duration-300 group-hover/li:rotate-[-6deg] group-hover/li:opacity-30 md:h-16 md:w-16" />
              <Link href={s.href} className="group relative block">
                <span className="flex items-center gap-2 text-[17px] font-medium tracking-[-0.02em] md:text-[19px]">
                  <span className="u">{s.name}</span>
                  <i aria-hidden className={`h-2 w-2 rounded-full ${s.live ? "bg-accent" : "border-2 border-accent"}`} />
                </span>
                <span className="mt-0.5 block text-[14px] leading-snug text-mute md:text-[15px]">{s.what}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Slide>

      {/* 02 PRINCIPLES: dark, loud and ruled. The type is the graphic. */}
      <Slide id="thesis" label="Principles / 02" deck dark className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:25%_100%]" />
        <div className="relative">
          <h2 className="mt-8 text-[clamp(40px,8.4vw,144px)] font-semibold uppercase leading-[0.86] tracking-[-0.06em] md:mt-14">
            I build systems that go to <span className="text-accent">production.</span>
            <span className="mt-[0.1em] block text-white/30">Not demos that die in a repo.</span>
          </h2>
          <p aria-hidden className="label absolute -right-1 top-[-6px] hidden rotate-[4deg] bg-accent px-4 py-3 text-[11px] text-black shadow-[10px_10px_0_rgba(255,255,255,.1)] md:block lg:right-[4%] lg:top-[-24px]">Shipped, not demoed</p>
        </div>
        <ol className="relative mt-14 border-t border-white/25 md:mt-24">
          {THESIS.map((c, i) => (
            <li key={c.t} className="border-b border-white/25">
              <Link href={`/work/${THESIS_LINK[c.tag]}`} className="group grid gap-x-8 gap-y-3 px-1 py-7 transition-[padding,background-color,color] duration-300 hover:bg-accent hover:px-5 hover:text-black md:grid-cols-[72px_minmax(0,1.15fr)_minmax(0,1fr)_32px] md:items-center md:py-9">
                <span className="label text-white/45 group-hover:text-black/60">{String(i + 1).padStart(2, "0")}<span className="md:hidden"> · {c.tag}</span></span>
                <h3 className="text-[clamp(26px,3.6vw,56px)] font-semibold uppercase leading-[0.95] tracking-[-0.05em]">{c.t}</h3>
                <div>
                  <p className="label mb-2 hidden text-accent group-hover:text-black/70 md:block">{c.tag}</p>
                  <p className="max-w-[44ch] text-[16px] leading-relaxed text-white/60 group-hover:text-black/80">{c.b}</p>
                </div>
                <span aria-hidden className="hidden text-[26px] leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:block">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </Slide>

      {/* 03 WORK: the lead runs edge to edge */}
      <Slide id="work" label="Portfolio" deck>
        <H className="t-slide mt-7 md:mt-12">What I founded, lead and built</H>
        <AppMarquee />
        {lead.image && (
          <Link href={`/work/${lead.slug}`} className="group bleed mt-8 block md:mt-12">
            <div className="relative h-[52vw] max-h-[620px] min-h-[240px] overflow-hidden bg-soft">
              <Image src={lead.image} alt={`${lead.name}: a screen from the real product`} fill priority sizes="100vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.012]" />
            </div>
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-end justify-between gap-x-10 gap-y-3 px-5 pt-5 sm:px-8 lg:px-14">
              <div>
                <p className="label text-mute">{ownership(lead.role)} · {lead.year}</p>
                <h3 className="t-big mt-2">{lead.name}</h3>
              </div>
              <p className="max-w-[52ch] text-[16px] leading-relaxed text-body">{lead.blurb}</p>
            </div>
          </Link>
        )}
        <div className="mt-12 md:mt-16">
          <ul className="swipe grid gap-3 md:grid-cols-5">
            {rest.map((w) => <li key={w.slug}><WorkCard w={w} sizes="(min-width: 1024px) 20vw, 90vw" /></li>)}
          </ul>
        </div>
        <Link href="/work" className="u mt-8 inline-block text-[17px] font-medium">See all {WORK.length} projects</Link>
      </Slide>

      {/* 04 EXPERIENCE */}
      <Slide id="experience" label="Experience" deck>
        <div className="mt-7 grid gap-5 md:mt-12 md:gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <H className="t-slide">Where I work, and what I own</H>
          <p className="t-lead">Employer and client systems are confidential, so they stay at a public level here. My own products don&apos;t.</p>
        </div>
        <div className="mt-6 md:mt-10"><ExperienceList /></div>
        <div className="mt-10">
          <p className="label text-mute">Also affiliated with</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {orgs.map((a) => (
              <li key={a.id} className="panel flex flex-col items-start gap-3 p-4 md:flex-row md:items-center md:gap-4">
                <Image src={a.img} alt="" width={a.w} height={a.h} className="h-8 w-auto max-w-[110px] object-contain md:h-10 md:max-w-[90px]" />
                <div><p className="text-[16px] font-medium tracking-[-0.02em]">{a.name}</p>{a.note && <p className="text-[13px] text-mute">{a.note}</p>}</div>
              </li>
            ))}
          </ul>
        </div>
      </Slide>

      {/* 05 NUMBERS */}
      <Slide id="numbers" label="Numbers" deck dark>
        <H className="t-slide mt-7 md:mt-12">Receipts, not adjectives</H>
        <StatMarquee />
        <div className="mt-6 grid grid-cols-2 gap-2 md:mt-10 md:grid-cols-4 md:gap-3">
          {[
            ["Case studies", String(PROJECTS.length), "products, each with its own write-up"],
            ["VoIP platform", "40", "tests, the PostgreSQL ones on a disposable database"],
            ["4-Man Chess", "25/40", "games won by the Advanced bot against three Hard bots; even is 10"],
            ["npm-git-helper", "v3", "published on npm, now at 3.0.0"],
          ].map(([k, n, l]) => (
            <div key={k} className="panel flex min-h-[156px] flex-col p-4 md:min-h-[200px] md:p-6">
              <p className="label text-white/55">{k}</p>
              <p className="mt-auto pt-4 text-[clamp(40px,5vw,76px)] font-medium leading-none tracking-[-0.05em]">{n}</p>
              <p className="mt-2 text-[13px] leading-snug text-white/65 md:text-[15px]">{l}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 06 STORY */}
      <Slide id="story" label="Story" deck>
        <H className="t-slide mt-7 md:mt-12 max-w-[15ch]">From console apps to companies</H>
        <StoryTimeline />
      </Slide>

      {/* 07 APPROACH: four words, each with its evidence */}
      <Slide id="approach" label="Approach" deck>
        <ol className="mt-8 md:mt-14">
          {LOOP.map((l, i) => (
            <li key={l.w} className={`grid items-end gap-x-10 gap-y-3 border-t border-ink py-6 md:grid-cols-[1.1fr_1fr] md:py-9 ${i === LOOP.length - 1 ? "border-b" : ""}`}>
              <h3 className="t-hero !text-[clamp(52px,10vw,160px)]">{l.w}<span className="dot">.</span></h3>
              <div className="md:pb-3">
                <p className="label text-mute">{l.n}</p>
                <p className="mt-2 max-w-[40ch] text-[clamp(16px,1.35vw,19px)] leading-snug text-body">{l.line}</p>
                <Link href={l.href} className="u mt-4 inline-block text-[15px] font-medium">{l.cta}</Link>
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      {/* 08 TOOLS */}
      <Slide id="tools" label="Open source" deck>
        <div className="mt-7 grid gap-5 md:mt-12 md:gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <H className="t-slide">Tools I built and gave away</H>
          <p className="t-lead">Small, public and free. Each one started because I needed it.</p>
        </div>
        <div className="mt-7 divide-y divide-line border-y border-line md:mt-10">
          <div className="grid gap-6 py-8 md:py-10 lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="label text-mute">Node.js · Published on npm · v3.0.0</p>
              <h3 className="t-big mt-3">git-helper</h3>
              <p className="t-lead mt-3 max-w-[46ch]">The Git CLI that writes your commit messages. Stage, commit and push in one command; with a key set, Claude or GPT drafts the message from the staged diff.</p>
              <CopyCommand cmd="npm i -g npm-git-helper" />
              <div className="mt-6 flex gap-6 text-[15px] font-medium">
                <a href="https://www.npmjs.com/package/npm-git-helper" target="_blank" rel="noopener noreferrer" className="u">View on npm</a>
                <a href="https://github.com/Leslie-23/git-helper" target="_blank" rel="noopener noreferrer" className="u">Source on GitHub</a>
              </div>
            </div>
            <div className="rounded-[16px] bg-night p-5 font-mono text-[12px] leading-[1.8] text-white/80 md:rounded-[18px] md:p-8 md:text-[13px] md:leading-[1.9]">
              <p className="label text-white/45">What it does</p>
              <ul className="mt-4 space-y-2">
                <li><span className="text-accent">→</span> Stages, commits and pushes in one command</li>
                <li><span className="text-accent">→</span> Drafts the commit message from the staged diff</li>
                <li><span className="text-accent">→</span> Uses Claude or GPT, with your own key</li>
              </ul>
            </div>
          </div>
          <div className="grid gap-6 py-8 md:py-10 lg:grid-cols-2 lg:gap-8">
            <div>
              <p className="label text-mute">Python · MCP server · 36 tests</p>
              <h3 className="t-big mt-3">scrapy-mcp</h3>
              <p className="t-lead mt-3 max-w-[46ch]">{scrapy.blurb} Built around one question: can a language model get a reliable, safe pair of hands on the open web?</p>
              <div className="mt-6 flex gap-6 text-[15px] font-medium">
                <Link href="/work/scrapy-mcp" className="u">Read the case study</Link>
                <a href={scrapy.repo} target="_blank" rel="noopener noreferrer" className="u">Source on GitHub</a>
              </div>
            </div>
            <div className="rounded-[16px] bg-night p-5 font-mono text-[12px] leading-[1.8] text-white/80 md:rounded-[18px] md:p-8 md:text-[13px] md:leading-[1.9]">
              <p className="label text-white/45">Three tools, one safety layer</p>
              <ul className="mt-4 space-y-2">
                <li><span className="text-accent">scrape_page</span> title, description, readable text, links</li>
                <li><span className="text-accent">extract</span> values for named CSS or XPath selectors</li>
                <li><span className="text-accent">crawl_site</span> same-host crawl, ≤50 pages, depth ≤3</li>
                <li className="pt-2 text-white/55">Private, loopback and cloud-metadata addresses are refused, before the crawl and on every redirect.</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* 09 WRITING */}
      <Slide id="writing" label="Writing" deck>
        <H className="t-slide mt-7 md:mt-12">What I learn, written down</H>
        <ul className="swipe mt-7 grid gap-6 md:mt-10 md:grid-cols-3">
          {NOTES.slice(0, 3).map((n, i) => (
            <li key={n.slug}>
              <Link href={`/notes/${n.slug}`} className="group block">
                <div className="frame-img aspect-[16/10] bg-[#eef3ef]">
                  <div className="absolute inset-0"><Dither shape={NOTE_COVERS[i]} cell={5} /></div>
                </div>
                <div className="label mt-4 flex justify-between text-mute"><span>{n.date}</span><span>{n.minutes} min read</span></div>
                <h3 className="t-card mt-3 group-hover:text-accent-ink">{n.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-mute">{n.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/notes" className="btn btn-solid mt-8 md:mt-10">Read all {NOTES.length} notes</Link>
      </Slide>

      {/* 10 CONTACT */}
      <Ask deck />
    </>
  );
}
