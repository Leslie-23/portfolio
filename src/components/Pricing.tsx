import Link from "next/link";
import { PERSON } from "@/lib/data";
import { PRICE_DRIVERS, PRICE_MODES, PRICE_OTHER, PRICE_PROJECTS, PRICE_RUNNING } from "@/lib/pricing";

const WEEKS = 20; // the scale: 0 to 20 weeks

/** Pricing, laid out as a price list with a shared timeline scale, three ways of working, and the costs around them. */
export default function Pricing() {
  return (
    <>
      <div className="mt-7 grid gap-5 md:mt-12 md:gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
        <h2 className="t-slide">Pricing up front<span className="dot">.</span></h2>
        <div>
          <p className="t-lead">Starting prices in Ghana cedis for a small build, with typical timelines. Every project is scoped properly before a number becomes a quote.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-solid">Get a quote</Link>
            <a href={`mailto:${PERSON.email}`} className="btn">Email me</a>
          </div>
        </div>
      </div>

      {/* price list: one row per kind of project, with its timeline on a shared scale */}
      <div className="mt-8 md:mt-12">
        <div className="label hidden grid-cols-[1.2fr_160px_1fr] gap-x-8 border-b border-line pb-3 text-mute md:grid">
          <span>Project</span><span>Starts from</span>
          <span className="flex justify-between"><span>Typical timeline</span><span aria-hidden>0 · 5 · 10 · 15 · 20 weeks</span></span>
        </div>
        <ul>
          {PRICE_PROJECTS.map((r) => (
            <li key={r.type} className="grid gap-x-8 gap-y-3 border-b border-line py-6 md:grid-cols-[1.2fr_160px_1fr] md:items-center md:py-7">
              <div>
                <h3 className="text-[clamp(20px,1.8vw,26px)] font-medium tracking-[-0.03em]">{r.type}</h3>
                <p className="mt-1.5 max-w-[46ch] text-[15px] leading-relaxed text-mute">{r.what}</p>
              </div>
              <p className="flex items-baseline gap-1.5 md:block">
                <span className="label text-mute md:hidden">From</span>
                <span className="text-[clamp(28px,2.6vw,40px)] font-medium leading-none tracking-[-0.045em]"><span className="mr-1 text-[0.55em] text-mute">GH₵</span>{r.from}</span>
              </p>
              <div>
                <div className="relative h-[10px] rounded-full bg-soft" role="img" aria-label={`${r.min} to ${r.max} weeks`}>
                  <i className="absolute inset-y-0 rounded-full bg-accent" style={{ left: `${(r.min / WEEKS) * 100}%`, width: `${((r.max - r.min) / WEEKS) * 100}%` }} />
                </div>
                <p className="mt-2 text-[14px] text-body"><span className="font-medium">{r.min}–{r.max} weeks</span></p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* three ways to build it */}
      <div className="mt-12 md:mt-20">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h3 className="t-big">Three ways to work together</h3>
          <p className="max-w-[44ch] text-[15px] text-mute">The more of the build AI takes on, the lower the cost, with trade-offs.</p>
        </div>
        <ol className="grid gap-3 md:grid-cols-3">
          {PRICE_MODES.map((m, i) => (
            <li key={m.name} className={`flex flex-col rounded-[18px] p-5 md:p-7 ${i === 1 ? "bg-ink text-white" : "panel"}`}>
              <p className={`label ${i === 1 ? "text-white/55" : "text-mute"}`}>{m.tag}</p>
              <h4 className="mt-3 text-[22px] font-medium tracking-[-0.03em]">{m.name}</h4>
              <p className="mt-5 text-[clamp(34px,3.4vw,52px)] font-medium leading-none tracking-[-0.05em]">{m.saves}</p>
              <p className={`mt-5 flex-1 text-[15px] leading-relaxed ${i === 1 ? "text-white/75" : "text-body"}`}>{m.what}</p>
              <p className={`mt-5 border-t pt-4 text-[14px] ${i === 1 ? "border-white/15 text-white/70" : "border-line text-mute"}`}><span className="label mr-2">Best for</span>{m.best}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* rates and retainers: no numbers yet */}
      <div className="mt-12 md:mt-20">
        <h3 className="t-big">Day rate and retainers</h3>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {PRICE_OTHER.map((o) => (
            <li key={o.name} className="panel flex flex-col p-5 md:p-7">
              <h4 className="text-[20px] font-medium tracking-[-0.03em]">{o.name}</h4>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-body">{o.what}</p>
              <p className="mt-5 text-[clamp(26px,2.4vw,36px)] font-medium tracking-[-0.04em]">{o.price}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* what moves the price, and what comes after launch */}
      <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-12">
        <div>
          <h3 className="t-big">What drives the cost</h3>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {PRICE_DRIVERS.map(([k, v]) => (
              <div key={k} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[130px_1fr]"><dt className="text-[16px] font-medium">{k}</dt><dd className="text-[15px] leading-relaxed text-mute">{v}</dd></div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="t-big">After launch</h3>
          <p className="mt-2 text-[15px] text-mute">Running costs to plan for. They go to other providers, so they aren&apos;t part of the estimate.</p>
          <dl className="mt-3 divide-y divide-line border-y border-line">
            {PRICE_RUNNING.map(([k, v]) => (
              <div key={k} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[170px_1fr]"><dt className="text-[16px] font-medium">{k}</dt><dd className="text-[15px] leading-relaxed text-mute">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
      <p className="mt-8 text-[13px] text-mute">Indicative starting prices in Ghana cedis, not a quote. Running costs such as hosting are extra.</p>
    </>
  );
}
