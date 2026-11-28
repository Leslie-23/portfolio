import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Ask from "@/components/Ask";
import Slide, { H } from "@/components/Slide";
import { BIG, CREW, CREW_SITE, HOUSE_RULES, RECEIPTS, TEAM_STORY, type Member } from "@/lib/team";

export const metadata: Metadata = {
  title: "Team",
  description: "400: the four-person product crew from Accra that Leslie Paul Ajayi built with friends from university. How it came together, who owns what, and who carried which part of the big projects.",
};

const byId = (id: Member["id"]) => CREW.find((m) => m.id === id)!;
const POSTER = (["efo", "leslie", "joyce", "elton"] as const).map(byId);   // the poster's order
const Who = ({ m }: { m: Member }) => (
  <span className={`inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[13px] font-medium ${m.me ? "border-ink bg-ink text-bg" : "border-line bg-bg text-ink"}`}>{m.me && <i aria-hidden className="h-[6px] w-[6px] rounded-full bg-accent" />}{m.name}</span>
);

export default function TeamPage() {
  return (
    <>
      <Slide label="Team" className="relative isolate overflow-hidden">
        {/* the four of us, lightly, like a film poster: Selorm, Leslie, Joyce, Elton */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex h-[64%] items-end justify-center px-0 opacity-[0.2] mix-blend-multiply [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_22%,#000_100%)] [mask-image:linear-gradient(to_top,transparent_0%,#000_22%,#000_100%)] md:h-[92%] md:px-0">
          {POSTER.map((m, i) => (
            <Image key={m.id} src={m.bust.src} alt="" width={m.bust.w} height={m.bust.h} priority={i < 2} sizes="(min-width: 1024px) 32vw, 40vw"
              className={`h-full w-auto min-w-0 max-w-[46%] shrink object-contain object-bottom md:max-w-[34%] ${i ? "-ml-[15%] md:-ml-[5%]" : ""} ${i % 2 ? "" : "h-[88%]"}`} />
          ))}
        </div>
        <div className="mt-7 grid gap-5 md:mt-10 md:gap-8 lg:grid-cols-[1fr_400px] lg:items-end">
          <H as="h1" className="t-hero">A crew of four</H>
          <p className="t-lead">
            400 is the product crew I put together with three friends from university. It began as a semester group chat. On 14 October 2025 I said we should run the projects as a company, and we did.
          </p>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-line pt-6 md:mt-12 md:grid-cols-4 md:pt-8">
          {RECEIPTS.map((r) => (
            <li key={r.l}>
              <span className="block text-[clamp(44px,5.6vw,84px)] font-medium leading-none tracking-[-0.05em]">{r.n}<span className="dot">.</span></span>
              <span className="mt-2 block max-w-[24ch] text-[15px] leading-snug text-mute">{r.l}</span>
            </li>
          ))}
        </ul>
      </Slide>

      <Slide label="The crew, and what each person owns" id="crew">
        <H className="t-slide mt-7 max-w-[18ch] md:mt-10">Four equals, four lanes</H>
        <p className="t-lead mt-4 max-w-[60ch]">No boss and no fixed titles. These are what each of us usually does and what each of us owns, as the crew writes it.</p>
        <ul className="swipe mt-8 grid gap-3 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
          {CREW.map((m) => (
            <li key={m.id} className={`panel flex flex-col p-5 md:p-6 ${m.me ? "ring-1 ring-ink" : ""}`}>
              <div aria-hidden className="relative -mx-5 -mt-5 mb-5 h-[210px] overflow-hidden rounded-t-[inherit] bg-[#eef1ee] md:-mx-6 md:-mt-6 md:h-[230px]">
                <Image src={m.bust.src} alt="" width={m.bust.w} height={m.bust.h} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 85vw" className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-full object-contain object-bottom" />
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-[22px] font-medium leading-none tracking-[-0.03em]">{m.name}{m.me && <span className="label ml-2 text-accent-ink">That&apos;s me</span>}</h3>
                  {m.also && <p className="mt-1 text-[13px] text-mute">&ldquo;{m.also}&rdquo; in the chat</p>}
                </div>
              </div>
              <p className="mt-5 text-[17px] font-medium leading-snug tracking-[-0.02em]">{m.usually}</p>
              <p className="label mt-5 text-mute">Owns</p>
              <ul className="mt-2 space-y-1.5 text-[15px]">
                {m.owns.map((o) => (<li key={o} className="flex gap-2"><i aria-hidden className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />{o}</li>))}
              </ul>
              <p className="label mt-5 text-mute">Works in</p>
              <p className="mt-2 flex flex-wrap gap-1.5">{m.stack.map((t) => (<span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[13px] text-body">{t}</span>))}</p>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-body">{m.bio}</p>
              <p className="mt-4 border-t border-line pt-4 text-[14px] italic text-mute">&ldquo;{m.motto}&rdquo;</p>
              {m.href && <a href={m.href} target="_blank" rel="noopener noreferrer" className="u mt-3 self-start text-[14px] font-medium">Meet {m.name} properly</a>}
            </li>
          ))}
        </ul>
      </Slide>

      <Slide label="Big projects, and who carried what" id="projects">
        <H className="t-slide mt-7 max-w-[20ch] md:mt-10">What we built together, and who did what</H>
        <ul className="mt-8 border-t-2 border-ink md:mt-12">
          {BIG.map((b) => (
            <li key={b.name} className="grid gap-5 border-b border-line py-7 md:grid-cols-[minmax(240px,0.8fr)_1.4fr] md:gap-10 md:py-9">
              <div>
                <h3 className="t-big">{b.name}</h3>
                <p className="mt-3 max-w-[40ch] text-[16px] leading-relaxed text-body">{b.what}</p>
                {b.slug && <Link href={`/work/${b.slug}`} className="u mt-4 inline-block text-[15px] font-medium">The case study</Link>}
              </div>
              <ul className="space-y-3.5">
                {b.parts.map((p) => (
                  <li key={p.did} className="grid items-start gap-2 sm:grid-cols-[minmax(150px,auto)_1fr] sm:gap-4">
                    <span className="flex flex-wrap gap-1.5">
                      {p.who === "crew" ? <span className="inline-flex h-7 items-center rounded-full border border-dashed border-ink/40 px-2.5 text-[13px] font-medium">The crew</span> : p.who.map((id) => <Who key={id} m={byId(id)} />)}
                    </span>
                    <span className="text-[16px] leading-relaxed text-body">{p.did}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[64ch] text-[14px] leading-relaxed text-mute">Presenting to someone is not a partnership or an endorsement, and we do not claim either. The Ministry of Transport has not replied yet.</p>
      </Slide>

      <Slide label="How it came together" id="story">
        <H className="t-slide mt-7 max-w-[18ch] md:mt-10">A semester chat that became a company</H>
        <ol className="mt-8 md:mt-12">
          {TEAM_STORY.map((s) => (
            <li key={s.date} className={`grid gap-1 border-t py-5 md:grid-cols-[200px_1fr] md:gap-10 md:py-6 ${s.key ? "border-ink" : "border-line"}`}>
              <p className={`label pt-1.5 ${s.key ? "text-accent-ink" : "text-mute"}`}>{s.date}</p>
              <div>
                <h3 className={`font-medium tracking-[-0.03em] ${s.key ? "t-big" : "text-[22px] leading-tight md:text-[24px]"}`}>{s.t}</h3>
                <p className="mt-2 max-w-[60ch] text-[16px] leading-relaxed text-body">{s.b}</p>
                {s.quote && <p className="mt-4 max-w-[28ch] border-l-2 border-accent pl-4 text-[clamp(22px,2.4vw,32px)] font-medium leading-[1.15] tracking-[-0.03em]">&ldquo;{s.quote}&rdquo;<span className="mt-2 block text-[14px] font-normal tracking-normal text-mute">Me, in the group chat</span></p>}
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide label="How we work" id="how">
        <H className="t-slide mt-7 max-w-[16ch] md:mt-10">Four house rules</H>
        <ol className="mt-8 grid gap-8 border-t-2 border-ink pt-6 sm:grid-cols-2 md:mt-12 md:gap-x-12 md:gap-y-10 md:pt-8 lg:grid-cols-4">
          {HOUSE_RULES.map((r, i) => (
            <li key={r.t}>
              <p className="label text-mute">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-card mt-3">{r.t}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-body">{r.b}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6 md:mt-14">
          <a href={CREW_SITE} target="_blank" rel="noopener noreferrer" className="btn btn-solid">See the crew&apos;s own site</a>
          <a href={`${CREW_SITE}/track-record`} target="_blank" rel="noopener noreferrer" className="btn">The dated receipts</a>
          <p className="w-full text-[14px] text-mute md:ml-2 md:w-auto">Everything above is from the crew&apos;s site, as of 27 November 2026.</p>
          <p className="w-full text-[14px] text-mute">The command palette (press <kbd className="rounded border border-line px-1 font-mono text-[12px]">/</kbd>) and the terminal (<kbd className="rounded border border-line px-1 font-mono text-[12px]">~</kbd>) on this site were inspired by{" "}
            <a href="https://bio-ten-nu.vercel.app" target="_blank" rel="noopener noreferrer" className="u text-ink">Elton&apos;s portfolio</a>.</p>
        </div>
      </Slide>
      <Ask />
    </>
  );
}
