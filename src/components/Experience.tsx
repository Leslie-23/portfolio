import Link from "next/link";
import { EDUCATION, EXPERIENCE } from "@/lib/data";
import { Spec } from "./Spec";

const KIND: Record<string, string> = { EMPLOYMENT: "Employment", FOUNDER: "Founder", CLIENT: "Client engagement", CONTRIBUTION: "Contribution" };

/** Experience as a ledger: period, organisation and role, what it is, link. Then education. */
export default function Experience({ className = "", heading = true }: { className?: string; heading?: boolean }) {
  return (
    <Spec name="Experience" id="EXPERIENCE" as="section" className={`frame ${className}`}>
      <span id="experience" aria-hidden className="block scroll-mt-24" />
      {heading && (
        <div className="grid12 items-end gap-y-4 pb-8">
          <div className="col-span-6 md:col-span-7">
            <div className="mono text-mute"><span className="text-accent-ink">■</span> EXPERIENCE</div>
            <h2 className="display mt-3 text-[clamp(40px,5.6vw,92px)]">Where I&apos;ve built.</h2>
          </div>
          <p className="col-span-6 max-w-[46ch] text-graphite md:col-span-5">
            Employment, a company of my own, and paid client work running in production. Professional work stays at a public level of detail.
          </p>
        </div>
      )}
      <ol className="border-t-2 border-ink">
        {EXPERIENCE.map((r) => {
          const body = (
            <>
              <div className="mono col-span-6 flex items-center gap-2 self-start text-mute md:col-span-2 md:pt-2">
                {r.current && <i aria-hidden className="block h-2 w-2 bg-accent" />}
                {r.period}
              </div>
              <div className="col-span-6 md:col-span-4">
                <h3 className="display text-[clamp(26px,2.6vw,40px)] !leading-[0.95] transition-colors group-hover:text-accent-ink">{r.org}</h3>
                <div className="mt-1 text-[15px] font-medium text-ink">{r.role}</div>
              </div>
              <p className="col-span-6 text-graphite md:col-span-4 md:pt-1">{r.summary}</p>
              <div className="mono col-span-6 flex items-start justify-between gap-3 self-start text-mute md:col-span-2 md:flex-col md:items-end md:gap-2 md:pt-2">
                <span>{KIND[r.kind]}</span>
                {r.href && <span className="text-ink transition-transform group-hover:translate-x-1">{r.internal ? "CASE STUDY →" : "VISIT ↗"}</span>}
              </div>
            </>
          );
          const cls = "group grid12 gap-y-2 border-b border-hair py-6 transition-colors md:py-7";
          return (
            <li key={r.org}>
              {r.href ? (
                r.internal ? <Link href={r.href} className={`${cls} hover:bg-paper-2`} data-cursor="OPEN →">{body}</Link>
                  : <a href={r.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:bg-paper-2`} data-cursor="VISIT ↗">{body}</a>
              ) : <div className={cls}>{body}</div>}
            </li>
          );
        })}
        <li className="grid12 gap-y-2 border-b-2 border-ink bg-paper-2 py-6 md:py-7">
          <div className="mono col-span-6 text-mute md:col-span-2 md:pt-2">{EDUCATION.period}</div>
          <div className="col-span-6 md:col-span-4">
            <h3 className="display text-[clamp(26px,2.6vw,40px)] !leading-[0.95]">{EDUCATION.school}</h3>
            <div className="mt-1 text-[15px] font-medium">{EDUCATION.degree}</div>
          </div>
          <ul className="col-span-6 space-y-1 md:col-span-4 md:pt-1">
            {EDUCATION.awards.map((a) => <li key={a} className="flex items-baseline gap-2 text-graphite"><span className="mono text-accent-ink">AWARD</span>{a}</li>)}
          </ul>
          <div className="mono col-span-6 text-mute md:col-span-2 md:pt-2 md:text-right">Education</div>
        </li>
      </ol>
    </Spec>
  );
}
