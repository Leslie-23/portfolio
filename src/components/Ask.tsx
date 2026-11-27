import { PERSON } from "@/lib/data";
import Slide, { H } from "./Slide";
import OriginsGlobe from "./OriginsGlobe";
import Clock from "./Clock";

const LINKS = [
  { k: "GitHub", v: "Leslie-23 · 171 public repositories", href: PERSON.links.github },
  { k: "LinkedIn", v: "/in/leslie-paul-ajayi", href: PERSON.links.linkedin },
  { k: "X", v: "@_iam_leslie", href: PERSON.links.x },
  { k: "npm", v: "npm-git-helper, v3.0.0", href: "https://www.npmjs.com/package/npm-git-helper" },
];

/** The closing slide on every page: how to reach Leslie. */
export default function Ask({ deck = false }: { deck?: boolean }) {
  return (
    <Slide id="contact" label="Contact" deck={deck} className="overflow-hidden">
      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] lg:items-end lg:gap-16">
      <div>
        <p className="pill label mt-8 text-ink md:mt-16">Based in Accra, Ghana</p>
        <H className="t-hero mt-6 !text-[clamp(44px,5.6vw,92px)]">Have a problem worth solving?</H>
        <p className="t-lead mt-7 max-w-[46ch] !text-ink">
          I&apos;m interested in engineering roles, product collaborations and well-scoped builds. Email is the fastest way to reach me.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={`mailto:${PERSON.email}`} className="btn btn-solid">{PERSON.email}</a>
          <a href={PERSON.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 md:mt-10 md:grid-cols-4 md:gap-x-8 md:pt-8">
          {LINKS.map((l) => (
            <li key={l.k}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="u text-[17px] font-medium">{l.k}</a>
              <p className="mt-1 text-[13px] leading-snug text-mute md:text-[14px]">{l.v}</p>
            </li>
          ))}
        </ul>
        <div className="label mt-10 flex flex-wrap justify-between gap-x-4 gap-y-1 text-mute md:mt-12">
          <span>© {PERSON.year} Leslie Paul Ajayi</span>
          <Clock />
        </div>
      </div>
      <div className="max-w-[560px] lg:max-w-none"><p className="label mb-2 text-mute">Where I am from, and where I build</p><OriginsGlobe /></div>
      </div>
    </Slide>
  );
}
