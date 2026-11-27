"use client";
import Link from "next/link";
import { useState } from "react";
import Dither from "./Dither";

type Item = { t: string; d: string; href?: string };
type Year = {
  y: string; t: string; b: string; h: number; d: number;
  count?: number; langs?: string; lead: string; items: Item[];
};

// Counts and languages are repositories created each year on Leslie-23, checked against the GitHub API on 2026-11-27
// (158 original repositories in total). Everything else is from the repos' own READMEs and dates.
const YEARS: Year[] = [
  {
    y: "2022", t: "Joined GitHub", b: "Started a BSc in Information Technology at Regional Maritime University.", h: 18, d: 0.25,
    lead: "The account came first. The code came a year and a half later.",
    items: [
      { t: "GitHub account created", d: "14 January 2022." },
      { t: "BSc in Information Technology", d: "Regional Maritime University, Accra." },
      { t: "First original repository", d: "June 2023. Everything before that was learning in other people's code." },
    ],
  },
  {
    y: "2023", t: "First code", b: "C++ console programs: payroll and trajectory calculators. Learning the fundamentals.", h: 30, d: 0.38,
    count: 10, langs: "7 of 10 in C++",
    lead: "Console programs, written to understand how a computer actually does the arithmetic.",
    items: [
      { t: "Four C++ console apps in June", d: "A calculator, a general console app, a rating app and an online menu app." },
      { t: "Physics in C++", d: "A projectile motion calculator and a trajectory calculator." },
      { t: "Payroll calculators", d: "Pay worked out from schedules and rates, written twice." },
      { t: "First web pages in October", d: "A writer's website and a to-do list, in HTML, CSS and JavaScript." },
    ],
  },
  {
    y: "2024", t: "Breadth", b: "83 repositories in a year: React and MERN apps, e-commerce, school and church systems.", h: 44, d: 0.52,
    count: 83, langs: "JavaScript 36 · HTML 14 · Python 7",
    lead: "More than a repository a week, nearly all of them full applications.",
    items: [
      { t: "React and MERN apps", d: "An expense tracker, a weather app and a full e-commerce store with Redux Toolkit and Material UI." },
      { t: "Systems for real settings", d: "A school management system, a food delivery app, campus food ordering, church attendance counters and a church management system." },
      { t: "Python on the side", d: "Web scrapers, a Mandelbrot set visualisation and a pull-request fetcher." },
      { t: "Practice", d: "LeetCode problems, a chess game in JavaScript, and C# and Java exercises." },
      { t: "git-helper", d: "A command-line tool to stage, commit and push in one go. It reached npm two years later.", href: "/work/git-helper" },
    ],
  },
  {
    y: "2025", t: "Mobile, AI, a company", b: "Expo apps, a speech-accessibility hackathon project and the first Trofficient build.", h: 58, d: 0.7,
    count: 34, langs: "JavaScript 13 · TypeScript 9 · Python 4",
    lead: "TypeScript arrives, the screen gets smaller, and the projects start to have users in mind.",
    items: [
      { t: "Mobile", d: "Expo and React Native courses and apps, including a fitness app and a campus fitness app." },
      { t: "A speech-accessibility hackathon project", d: "An outline for an AI-driven mobile app, in March." },
      { t: "SmartScan", d: "An AI receipt scanner: OCR, then an LLM to extract vendor, items and totals.", href: "/work/smartscan" },
      { t: "A storefront for a real shop", d: "Nene Collectionz, a wig retailer in Accra.", href: "/work/nenecollectionz" },
      { t: "Trofficient", d: "The specification in September, the first build from December.", href: "/work/trofficient" },
    ],
  },
  {
    y: "2026", t: "Systems and products", b: "VoIP, Beagine, StepPool, scrapy-mcp. A shift from apps to infrastructure and tools.", h: 74, d: 1,
    count: 31, langs: "TypeScript 17 · JavaScript 7",
    lead: "Mostly TypeScript now, and the work moves from apps to the systems underneath them.",
    items: [
      { t: "VoIP", d: "A voice platform, self-hosted, built from scratch.", href: "/work/vop" },
      { t: "Beagine", d: "A home-services marketplace in three mobile apps, as CTO.", href: "/work/beagine" },
      { t: "StepPool", d: "A step-challenge game with a settlement engine.", href: "/work/steppool" },
      { t: "scrapy-mcp and Elena", d: "A safe web crawler for ChatGPT, and a local-first developer assistant.", href: "/work/scrapy-mcp" },
      { t: "4-Man Chess, Stewardly, Attendance, Campus Connect", d: "A multiplayer game and three products for teams.", href: "/work/four-man-chess" },
      { t: "osAfrica", d: "An AI-native operating system, started in May and still in development.", href: "/work/osafrica" },
    ],
  },
];

function Detail({ y }: { y: Year }) {
  return (
    <div key={y.y} className="story-in">
      <p className="text-[clamp(18px,1.5vw,22px)] font-medium leading-snug tracking-[-0.02em]">{y.lead}</p>
      <ul className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
        {y.items.map((it) => (
          <li key={it.t} className="border-t border-line pt-3">
            <h4 className="text-[16px] font-medium tracking-[-0.01em]">
              {it.href ? <Link href={it.href} className="u">{it.t}</Link> : it.t}
            </h4>
            <p className="mt-1 text-[14px] leading-relaxed text-mute">{it.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The timeline. Hover (or tap) a year to see what that year held, from the repositories themselves. */
export default function StoryTimeline() {
  const [on, setOn] = useState(YEARS.length - 1);
  const cur = YEARS[on];

  return (
    <>
      <ol className="mt-8 grid gap-x-3 border-l border-line pl-5 max-lg:space-y-6 md:mt-12 lg:grid-cols-6 lg:items-end lg:gap-y-8 lg:border-0 lg:pl-0">
        {YEARS.map((s, i) => {
          const active = on === i;
          return (
            <li key={s.y} className="relative flex flex-col" onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}>
              <i aria-hidden className={`absolute -left-[25px] top-[13px] h-[9px] w-[9px] rounded-full ring-4 ring-bg lg:hidden ${active ? "bg-accent-ink" : "bg-accent"}`} />
              <button type="button" onClick={() => setOn(i)} onFocus={() => setOn(i)} aria-expanded={active} aria-controls={`story-${s.y}`}
                className={`group flex flex-col text-left outline-offset-8 transition-opacity ${active ? "" : "lg:opacity-60 lg:hover:opacity-100"}`}>
                <span className="text-[clamp(26px,2.6vw,40px)] font-medium tracking-[-0.04em]">{s.y}</span>
                <span className="mt-1 text-[17px] font-medium tracking-[-0.02em]">{s.t}</span>
                <span className="mt-2 text-[15px] leading-relaxed text-mute">{s.b}</span>
                <span className={`mt-4 hidden overflow-hidden rounded-[14px] transition-shadow lg:block lg:h-[var(--bar)] ${active ? "ring-2 ring-ink ring-offset-4 ring-offset-bg" : ""}`} style={{ ["--bar" as string]: `${s.h * 3}px` }}>
                  <Dither shape={{ kind: "fill", density: s.d, fade: "up" }} cell={5} />
                </span>
                <span className="label mt-3 inline-flex items-center gap-1.5 text-mute lg:hidden">{active ? "Hide detail" : "More detail"} <span aria-hidden>{active ? "−" : "+"}</span></span>
              </button>
              {/* phones and tablets: the detail opens right under the year */}
              {active && (
                <div id={`story-${s.y}`} className="mt-4 rounded-[16px] bg-soft p-4 lg:hidden">
                  {s.count && <p className="label mb-3 text-mute">{s.count} repositories · {s.langs}</p>}
                  <Detail y={s} />
                </div>
              )}
            </li>
          );
        })}
        <li className="relative flex flex-col">
          <i aria-hidden className="absolute -left-[25px] top-[13px] h-[9px] w-[9px] rounded-full border-2 border-accent bg-bg ring-4 ring-bg lg:hidden" />
          <p className="text-[clamp(26px,2.6vw,40px)] font-medium tracking-[-0.04em] text-mute">Next</p>
          <a href="#contact" className="u mt-1 self-start text-[17px] font-medium">The next one</a>
          <div className="mt-4 hidden rounded-[14px] border border-dashed border-mute/40 lg:block lg:h-[270px]" />
        </li>
      </ol>

      {/* desktop: one panel under the whole timeline, following whichever year you point at */}
      <div id={`story-${cur.y}`} className="panel mt-10 hidden p-8 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10" aria-live="polite">
        <div>
          <p className="text-[clamp(56px,6vw,96px)] font-medium leading-[0.85] tracking-[-0.06em]">{cur.y}</p>
          <p className="mt-3 text-[18px] font-medium tracking-[-0.02em]">{cur.t}</p>
          {cur.count ? (
            <dl className="mt-6 space-y-3 border-t border-line pt-4">
              <div><dt className="label text-mute">Repositories created</dt><dd className="text-[28px] font-medium leading-none tracking-[-0.04em]">{cur.count}</dd></div>
              <div><dt className="label text-mute">Mostly</dt><dd className="text-[15px]">{cur.langs}</dd></div>
            </dl>
          ) : (
            <p className="mt-6 border-t border-line pt-4 text-[14px] text-mute">No repositories of my own yet.</p>
          )}
        </div>
        <Detail y={cur} />
      </div>
      <p className="mt-4 text-[13px] text-mute">Repository counts are original (non-fork) repositories created each year on GitHub, 158 in all, as of 27 November 2026.</p>
    </>
  );
}
