import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { NOTES } from "@/lib/data";

export const metadata: Metadata = { title: "Notes" };

export default function Notes() {
  return (
    <>
      <PageHeader
        id="NOTEBOOK" fig="05" kicker="TECHNICAL NOTEBOOK" sheet="SHEET 05 / 06"
        title="Notes."
        intro="Things I learned while building the things. Short, specific, occasionally wrong."
        meta={[
          { k: "ENTRIES", v: String(NOTES.length).padStart(2, "0") },
          { k: "TOTAL READING", v: `${NOTES.reduce((n, x) => n + x.minutes, 0)} MIN` },
        ]}
      />
      <ul className="border-t border-ink">
        {NOTES.map((n) => (
          <li key={n.slug} className="border-b border-hair">
            <Link href={`/notes/${n.slug}`} className="frame group grid12 items-baseline gap-y-2 py-8 hover:bg-paper-2" data-cursor="READ →">
              <div className="mono col-span-6 text-mute md:col-span-2">NOTE {n.n}<br />{n.date}</div>
              <h2 className="display col-span-6 text-[clamp(26px,3.6vw,56px)] !leading-[0.98] transition-transform group-hover:translate-x-2 group-hover:text-accent-ink md:col-span-7">{n.title}</h2>
              <div className="mono col-span-6 text-mute md:col-span-3 md:text-right">READING TIME / {n.minutes} MIN</div>
              <p className="col-span-6 max-w-[56ch] text-graphite md:col-span-7 md:col-start-3">{n.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
