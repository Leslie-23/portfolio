import Image from "next/image";
import Link from "next/link";
import Slide, { H } from "@/components/Slide";
import Dither, { type Shape } from "@/components/Dither";
import WorkCard from "@/components/WorkCard";
import ExperienceList from "@/components/ExperienceList";
import CopyCommand from "@/components/CopyCommand";
import Ask from "@/components/Ask";
import { AFFILIATIONS, NOTES, PROJECTS, SHIPPED } from "@/lib/data";
import { WORK, getWork } from "@/lib/work";

const STRIP = [
  { name: "Trofficient", what: "Transit technology", href: "/work/trofficient", live: false },
  { name: "Beagine", what: "Home-services marketplace", href: "/work/beagine", live: true },
  { name: "Global Icons", what: "Where I work", href: "#experience", live: true },
  { name: "VoIP", what: "Voice infrastructure", href: "/work/vop", live: true },
  { name: "git-helper", what: "Git CLI on npm", href: "/work/git-helper", live: true },
];

// Leslie's own principles (his profile README), each tied to the work that shows it
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

const STORY = [
  { y: "2022", t: "Joined GitHub", b: "Started a BSc in Information Technology at Regional Maritime University.", h: 18, d: 0.25 },
  { y: "2023", t: "First code", b: "C++ console programs: payroll and trajectory calculators. Learning the fundamentals.", h: 30, d: 0.38 },
  { y: "2024", t: "Breadth", b: "83 repositories in a year: React and MERN apps, e-commerce, school and church systems.", h: 44, d: 0.52 },
  { y: "2025", t: "Mobile, AI, a company", b: "Expo apps, a speech-accessibility hackathon project and the first Trofficient build.", h: 58, d: 0.7 },
  { y: "2026", t: "Systems and products", b: "VoIP, Beagine, StepPool, scrapy-mcp. A shift from apps to infrastructure and tools.", h: 74, d: 1 },
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
      <Slide id="cover" label="Leslie Paul Ajayi, profile 2026" deck className="lg:min-h-[calc(100svh-24px)]">
        <div className="grid items-center gap-x-10 lg:grid-cols-[1.08fr_1fr]">
          <div className="order-2 lg:order-1">
            <p className="pill label mt-8 text-ink lg:mt-16">Software engineer · Accra, Ghana</p>
            <H as="h1" className="t-hero mt-6">Understand it. Then build it</H>
            <p className="t-lead mt-7 max-w-[44ch] !text-ink">
              I&apos;m Leslie Paul Ajayi: software engineer at Global Icons, founder of Trofficient and CTO of Beagine. I build systems that go to production, not demos that die in a repo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="btn btn-solid">View the work</Link>
              <a href="#contact" className="btn">Get in touch</a>
            </div>
          </div>
          <div className="order-1 -mx-2 mt-4 h-[210px] sm:h-[340px] lg:order-2 lg:mx-0 lg:mt-0 lg:h-[min(640px,calc(100svh-300px))]">
            <Dither shape={{ kind: "portrait", fit: "contain", align: 0.6 }} cell={3} label="Leslie Paul Ajayi, portrait rendered in green dots" />
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-3 lg:grid-cols-5">
          {STRIP.map((s) => (
            <li key={s.name}>
              <Link href={s.href} className="group block">
                <span className="flex items-center gap-2 text-[19px] font-medium tracking-[-0.02em]">
                  <span className="u">{s.name}</span>
                  <i aria-hidden className={`h-2 w-2 rounded-full ${s.live ? "bg-accent" : "border-2 border-accent"}`} />
                </span>
                <span className="mt-1 block text-[15px] text-mute">{s.what}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Slide>

      {/* 02 THESIS */}
      <Slide id="thesis" label="Thesis" deck>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
          <H className="t-slide max-w-[17ch]">I build systems that go to production, not demos that die in a repo</H>
          <p className="t-lead lg:pt-3">Three working principles. They decide what I build, how I build it and what I leave out.</p>
        </div>
        <ul className="mt-12 grid gap-3 md:grid-cols-3">
          {THESIS.map((c) => (
            <li key={c.t} className="panel overflow-hidden">
              <div className="h-[150px] md:h-[180px]"><Dither shape={c.shape} cell={5} /></div>
              <div className="p-6 md:p-7">
                <p className="label text-mute">{c.tag}</p>
                <h3 className="t-card mt-3">{c.t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body">{c.b}</p>
              </div>
            </li>
          ))}
        </ul>
      </Slide>

      {/* 03 WORK */}
      <Slide id="work" label="Portfolio" deck>
        <H className="t-slide mt-12">What I founded, lead and built</H>
        <div className="mt-10 grid gap-3 md:grid-cols-6">
          <div className="md:col-span-4 md:row-span-2"><WorkCard w={lead} big sizes="(min-width: 1024px) 55vw, 95vw" /></div>
          {rest.map((w) => <div key={w.slug} className="md:col-span-2"><WorkCard w={w} /></div>)}
        </div>
        <Link href="/work" className="u mt-8 inline-block text-[17px] font-medium">See all {WORK.length} projects</Link>
      </Slide>

      {/* 04 EXPERIENCE */}
      <Slide id="experience" label="Experience" deck>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <H className="t-slide">Where I work, and what I own</H>
          <p className="t-lead">Employer and client systems are confidential, so they stay at a public level here. My own products don&apos;t.</p>
        </div>
        <div className="mt-10"><ExperienceList /></div>
        <div className="mt-10">
          <p className="label text-mute">Also affiliated with</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {orgs.map((a) => (
              <li key={a.id} className="panel flex items-center gap-4 p-4">
                <Image src={a.img} alt="" width={a.w} height={a.h} className="h-10 w-auto max-w-[90px] object-contain" />
                <div><p className="text-[16px] font-medium tracking-[-0.02em]">{a.name}</p>{a.note && <p className="text-[13px] text-mute">{a.note}</p>}</div>
              </li>
            ))}
          </ul>
        </div>
      </Slide>

      {/* 05 NUMBERS */}
      <Slide id="numbers" label="Numbers" deck dark>
        <H className="t-slide mt-12">Receipts, not adjectives</H>
        <div className="mt-10 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <div className="panel flex min-h-[300px] flex-col p-6 md:col-span-2 md:row-span-2 md:p-8">
            <p className="label text-white/55">GitHub</p>
            <p className="mt-auto text-[clamp(110px,16vw,240px)] font-medium leading-[0.85] tracking-[-0.06em]">158</p>
            <p className="mt-4 text-[18px] text-white/70">repositories since 2022, 138 of them public</p>
          </div>
          {[
            ["Case studies", String(PROJECTS.length), "products, each with its own write-up"],
            ["VoIP platform", "40", "tests, the PostgreSQL ones on a disposable database"],
            ["4-Man Chess", "25/40", "games won by the Advanced bot against three Hard bots; even is 10"],
            ["npm-git-helper", "v3", "published on npm, now at 3.0.0"],
          ].map(([k, n, l]) => (
            <div key={k} className="panel flex min-h-[200px] flex-col p-6">
              <p className="label text-white/55">{k}</p>
              <p className="mt-auto text-[clamp(48px,5vw,76px)] font-medium leading-none tracking-[-0.05em]">{n}</p>
              <p className="mt-2 text-[15px] leading-snug text-white/65">{l}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 06 STORY */}
      <Slide id="story" label="Story" deck>
        <H className="t-slide mt-12 max-w-[15ch]">From console apps to companies</H>
        <ol className="mt-12 grid gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:items-end">
          {STORY.map((s) => (
            <li key={s.y} className="flex flex-col">
              <p className="text-[clamp(30px,2.6vw,40px)] font-medium tracking-[-0.04em]">{s.y}</p>
              <h3 className="mt-1 text-[17px] font-medium tracking-[-0.02em]">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mute">{s.b}</p>
              <div className="mt-4 h-16 overflow-hidden rounded-[14px] lg:h-[var(--bar)]" style={{ ["--bar" as string]: `${s.h * 3}px` }}>
                <Dither shape={{ kind: "fill", density: s.d, fade: "up" }} cell={5} />
              </div>
            </li>
          ))}
          <li className="flex flex-col">
            <p className="text-[clamp(30px,2.6vw,40px)] font-medium tracking-[-0.04em] text-mute">Next</p>
            <a href="#contact" className="u mt-1 self-start text-[17px] font-medium">The next one</a>
            <div className="mt-4 h-16 rounded-[14px] border border-dashed border-mute/40 lg:h-[270px]" />
          </li>
        </ol>
      </Slide>

      {/* 07 APPROACH */}
      <Slide id="approach" label="Approach" deck>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <H className="t-slide">Build. Test. Question. Repeat</H>
          <p className="t-lead">The loop I run on everything, with the evidence for each step.</p>
        </div>
        <ol className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {LOOP.map((l) => (
            <li key={l.w} className="panel flex flex-col p-6 md:p-7">
              <p className="label text-mute">{l.n}</p>
              <h3 className="mt-6 text-[clamp(34px,3vw,46px)] font-medium tracking-[-0.045em]">{l.w}<span className="dot">.</span></h3>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-body">{l.line}</p>
              <Link href={l.href} className="u mt-6 self-start text-[15px] font-medium">{l.cta}</Link>
            </li>
          ))}
        </ol>
      </Slide>

      {/* 08 TOOLS */}
      <Slide id="tools" label="Open source" deck>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <H className="t-slide">Tools I built and gave away</H>
          <p className="t-lead">Small, public and free. Each one started because I needed it.</p>
        </div>
        <div className="mt-10 divide-y divide-line border-y border-line">
          <div className="grid gap-8 py-10 lg:grid-cols-2">
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
            <div className="rounded-[18px] bg-night p-6 font-mono text-[13px] leading-[1.9] text-white/80 md:p-8">
              <p className="label text-white/45">What it does</p>
              <ul className="mt-4 space-y-2">
                <li><span className="text-accent">→</span> Stages, commits and pushes in one command</li>
                <li><span className="text-accent">→</span> Drafts the commit message from the staged diff</li>
                <li><span className="text-accent">→</span> Uses Claude or GPT, with your own key</li>
              </ul>
            </div>
          </div>
          <div className="grid gap-8 py-10 lg:grid-cols-2">
            <div>
              <p className="label text-mute">Python · MCP server · 36 tests</p>
              <h3 className="t-big mt-3">scrapy-mcp</h3>
              <p className="t-lead mt-3 max-w-[46ch]">{scrapy.blurb} Built around one question: can a language model get a reliable, safe pair of hands on the open web?</p>
              <div className="mt-6 flex gap-6 text-[15px] font-medium">
                <Link href="/work/scrapy-mcp" className="u">Read the case study</Link>
                <a href={scrapy.repo} target="_blank" rel="noopener noreferrer" className="u">Source on GitHub</a>
              </div>
            </div>
            <div className="rounded-[18px] bg-night p-6 font-mono text-[13px] leading-[1.9] text-white/80 md:p-8">
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
        <H className="t-slide mt-12">What I learn, written down</H>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
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
        <Link href="/notes" className="btn btn-solid mt-10">Read all {NOTES.length} notes</Link>
      </Slide>

      {/* 10 CONTACT */}
      <Ask deck />
    </>
  );
}
