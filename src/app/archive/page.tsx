import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { ARCHIVE } from "@/lib/data";

export const metadata: Metadata = { title: "Archive" };

export default function Archive() {
  return (
    <>
      <PageHeader
        id="ARCHIVE" fig="07" kicker="SMALLER PROJECTS, EXPERIMENTS, HISTORY" sheet="APPENDIX"
        title="Archive."
        intro="The smaller things: deployments, utilities and early builds. Each one links to its source."
        meta={[
          { k: "ITEMS", v: String(ARCHIVE.length).padStart(2, "0") },
          { k: "OLDEST", v: Math.min(...ARCHIVE.map((a) => parseInt(a.year)).filter(Boolean)) },
        ]}
      />
      <ul className="frame grid12 gap-y-[var(--col-gap)] border-t border-ink pt-10">
        {ARCHIVE.map((a, i) => (
          <li key={a.name} className={`col-span-6 ${i % 5 === 0 ? "md:col-span-6" : i % 3 === 0 ? "md:col-span-4" : "md:col-span-3"}`}>
            <a href={a.href} target="_blank" rel="noopener noreferrer" data-cursor="FOLLOW →" className="group block h-full border border-hair bg-paper-2 p-4 transition-colors hover:border-ink hover:bg-paper-3">
              <div className="mono flex justify-between text-mute"><span>{a.type}</span><span>{a.year}</span></div>
              <h2 className="display mt-6 text-[clamp(22px,2.4vw,36px)] !leading-[0.98] break-words group-hover:text-accent-ink">{a.name}</h2>
              {a.blurb && <p className="mt-3 text-sm text-graphite">{a.blurb}</p>}
              <div className="mono mono-sm mt-4 text-mute">{a.lang} ↗</div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
