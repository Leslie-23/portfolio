"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EDUCATION, EXPERIENCE } from "@/lib/data";

/** Chronological experience. Each row opens to show responsibilities and the stack. */
export default function ExperienceList({ education = true }: { education?: boolean }) {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <ol className="border-t border-line">
      {EXPERIENCE.map((r, i) => {
        const on = open === i, more = !!(r.points?.length || r.stack?.length);
        const id = `exp-${i}`;
        return (
          <li key={r.org} className="relative border-b border-line">
            <div className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[180px_1fr_auto]">
              <div className="label pt-1.5 text-mute">
                {r.period}
                <div className="mt-1 normal-case tracking-normal">{r.kind}</div>
              </div>
              <div>
                <h3 className="t-card">
                  {r.href ? (r.internal ? <Link href={r.href} className="u">{r.org}</Link> : <a href={r.href} target="_blank" rel="noopener noreferrer" className="u">{r.org}</a>) : r.org}
                </h3>
                <p className="mt-1 text-[15px] font-medium text-accent-ink">{r.role}</p>
                <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-body">{r.summary}</p>
                {more && on && (
                  <div id={id} className="mt-4">
                    {r.points && <ul className="space-y-1.5">{r.points.map((p) => <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-body"><i aria-hidden className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />{p}</li>)}</ul>}
                    {r.stack && <p className="label mt-4 text-mute">{r.stack.join(" · ")}</p>}
                  </div>
                )}
              </div>
              {more && (
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} aria-controls={id} aria-label={`${on ? "Hide" : "Show"} details for ${r.org}`}
                  className="grid h-8 w-8 place-items-center self-start rounded-full border border-line text-mute transition-colors hover:border-ink hover:text-ink max-md:absolute max-md:right-6 max-md:-mt-1 md:mt-1">
                  {on ? "−" : "+"}
                </button>
              )}
            </div>
          </li>
        );
      })}
      {education && (
        <li className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[180px_1fr_auto]">
          <div className="label pt-1.5 text-mute">{EDUCATION.period}<div className="mt-1 normal-case tracking-normal">Education</div></div>
          <div className="flex items-start gap-4 md:gap-5">
            <Image src={EDUCATION.logo.src} alt="Regional Maritime University crest" width={EDUCATION.logo.w} height={EDUCATION.logo.h} className="h-14 w-auto shrink-0 object-contain md:h-[72px]" />
            <div>
              <h3 className="t-card">{EDUCATION.school}</h3>
              <p className="mt-1 text-[15px] font-medium text-accent-ink">{EDUCATION.degree}</p>
              <ul className="mt-3 flex flex-wrap gap-2">{EDUCATION.awards.map((a) => <li key={a} className="label rounded-full border border-line px-3 py-1.5 text-ink">Award · {a}</li>)}</ul>
            </div>
          </div>
        </li>
      )}
    </ol>
  );
}
