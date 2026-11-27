import { PERSON } from "@/lib/data";
import Slide, { H } from "./Slide";
import Dither from "./Dither";
import Clock from "./Clock";

const LINKS = [
  { k: "GitHub", v: "Leslie-23 · 138 public repositories", href: PERSON.links.github },
  { k: "LinkedIn", v: "/in/leslie-paul-ajayi", href: PERSON.links.linkedin },
  { k: "X", v: "@_iam_leslie", href: PERSON.links.x },
  { k: "npm", v: "npm-git-helper, v3.0.0", href: "https://www.npmjs.com/package/npm-git-helper" },
];

/** The closing slide on every page: how to reach Leslie. */
export default function Ask({ deck = false }: { deck?: boolean }) {
  return (
    <Slide id="contact" label="Contact" deck={deck} className="overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[62%] w-[52%] max-md:h-[34%] max-md:w-[70%]" aria-hidden>
        <Dither shape={{ kind: "sphere", cx: 0.82, cy: 1.05, r: 0.95 }} cell={4} />
      </div>
      <div className="relative max-w-[980px]">
        <p className="pill label mt-8 text-ink md:mt-16">Based in Accra, Ghana</p>
        <H className="t-hero mt-6 !text-[clamp(50px,7.2vw,116px)]">Have a problem worth solving?</H>
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
    </Slide>
  );
}
