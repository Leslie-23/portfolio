"use client";
import Link from "next/link";
import { PERSON } from "@/lib/data";
import { useShell } from "./state";
import { Tip } from "./Spec";

export default function Footer() {
  const { setBroken } = useShell();
  return (
    <footer data-spec="Footer" data-spec-id="FOOTER" className="relative mt-32 border-t border-ink bg-paper">
      <div className="frame py-16">
        <h2 className="display text-[clamp(56px,13vw,220px)]">Still<br />curious?</h2>
        <p className="mono mt-4 text-mute">GOOD.</p>
        <div className="grid12 mt-16 gap-y-10">
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
            <button onClick={() => setBroken(true)} className="btn mono" data-cursor="DON'T">DISASSEMBLE SITE</button>
            <p className="mono mono-sm mt-2 text-mute"><Tip tip="you've been warned. it's reversible." align="right">do not press</Tip></p>
          </div>
        </div>
        <div className="mono mono-sm mt-16 flex flex-wrap justify-between gap-2 border-t border-hair pt-4 text-mute">
          <span>BUILD / {PERSON.year}</span>
          <span>NEXT.JS · GSAP · MOTION · SVG</span>
          <span>KEYS: I = INTERNALS</span>
        </div>
      </div>
    </footer>
  );
}
