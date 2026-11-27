"use client";
import Link from "next/link";
import { PERSON } from "@/lib/data";
import { useShell } from "./state";

export default function Footer() {
  const { setBroken } = useShell();
  return (
    <footer data-spec="Footer" data-spec-id="FOOTER" className="relative mt-16 border-t-4 border-accent bg-paper text-ink md:mt-24"
      style={{ "--paper": "#151515", "--paper-2": "#1d1d1d", "--paper-3": "#222", "--ink": "#f2f0e9", "--graphite": "#d6d4cc", "--mute": "#9d9c94", "--hair": "rgba(242,240,233,0.16)", "--accent-ink": "#34bb78" } as React.CSSProperties}>
      <div className="frame py-12 md:py-14">
        <div className="grid12 items-end gap-y-4">
          <h2 className="display col-span-6 text-[clamp(52px,9vw,150px)] md:col-span-8">Have a problem<br /><span className="text-accent">worth building?</span></h2>
          <div className="col-span-6 md:col-span-4 md:pb-4">
            <p className="max-w-[36ch] text-graphite">Open to engineering roles, product collaborations and well-scoped client work.</p>
            <a href={`mailto:${PERSON.email}`} className="btn btn-go mono mt-5" data-cursor="EMAIL →">{PERSON.email.toUpperCase()} →</a>
          </div>
        </div>
        <div className="grid12 mt-10 gap-y-8">
          <nav aria-label="Footer" className="col-span-6 md:col-span-4">
            <ul className="space-y-1">
              {[["WORK", "/work"], ["BENCH", "/bench"], ["ABOUT", "/about"], ["TOOLKIT", "/toolkit"], ["INFRA", "/infra"], ["NOTES", "/notes"], ["ARCHIVE", "/archive"], ["CONTACT", "/contact"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="display link-u text-2xl">{l}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="col-span-6 md:col-span-4 mono space-y-1">
            <div>LESLIE PAUL AJAYI</div>
            <div className="text-mute">SOFTWARE ENGINEER</div>
            <div className="text-mute">{PERSON.country}</div>
            <div className="pt-3 space-y-1">
              <a className="link-u block" href={PERSON.links.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
              <a className="link-u block" href={PERSON.links.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
              <a className="link-u block" href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
            </div>
          </div>
          <div className="col-span-6 md:col-span-4 md:text-right">
            <button onClick={() => setBroken(true)} className="mono link-u text-mute hover:text-ink" data-cursor="TAKE APART">DISASSEMBLE THIS SITE ↺</button>
            <p className="mono mono-sm mt-2 text-mute">Fully reversible. Press I anywhere for internals.</p>
          </div>
        </div>
        <div className="mono mono-sm mt-10 flex flex-wrap justify-between gap-2 border-t border-hair pt-4 text-mute">
          <span>BUILD / {PERSON.year}</span>
          <span>NEXT.JS · GSAP · MOTION · SVG</span>
          <span>KEYS: I = INTERNALS</span>
        </div>
      </div>
    </footer>
  );
}
