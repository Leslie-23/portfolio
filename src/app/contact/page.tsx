import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Spec } from "@/components/Spec";
import { PERSON } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <Spec name="Contact" id="CONTACT" as="div" className="frame grid12 gap-y-12 py-16 md:py-24">
      <div className="col-span-6 md:col-span-6">
        <div className="mono text-mute">FIG. 030 / CONTACT</div>
        <h1 className="display mt-4 text-[clamp(44px,7.4vw,130px)]">Have a<br />problem<br />worth<br /><span className="mark">building?</span></h1>
        <ul className="mono mt-10 space-y-2">
          <li><span className="text-mute">EMAIL </span><a className="link-u" href={`mailto:${PERSON.email}`}>{PERSON.email}</a></li>
          <li><span className="text-mute">GITHUB </span><a className="link-u" href={PERSON.links.github} target="_blank" rel="noopener noreferrer">github.com/Leslie-23 ↗</a></li>
          <li><span className="text-mute">LINKEDIN </span><a className="link-u" href={PERSON.links.linkedin} target="_blank" rel="noopener noreferrer">leslie-paul-ajayi ↗</a></li>
          <li><span className="text-mute">X </span><a className="link-u" href={PERSON.links.x} target="_blank" rel="noopener noreferrer">@_iam_leslie ↗</a></li>
          <li className="text-mute">{PERSON.place.toUpperCase()}</li>
        </ul>
      </div>
      <div className="col-span-6 md:col-span-5 md:col-start-8 md:self-end"><ContactForm /></div>
    </Spec>
  );
}
