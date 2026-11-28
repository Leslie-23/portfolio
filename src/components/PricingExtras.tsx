import { PERSON } from "@/lib/data";
import { PRICE_DRIVERS, PRICE_OTHER, PRICE_RUNNING } from "@/lib/pricing";

/** What the estimate leaves out or depends on: other ways of working, what moves the price, and costs after launch. */
export default function PricingExtras() {
  return (
    <>
      <div className="mt-14 md:mt-24">
        <h2 className="t-big">Day rate and retainers</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {PRICE_OTHER.map((o) => (
            <li key={o.name} className="panel flex flex-col p-5 md:p-7">
              <h3 className="text-[20px] font-medium tracking-[-0.03em]">{o.name}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-body">{o.what}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={`mailto:${PERSON.email}?subject=${encodeURIComponent(o.subject)}`} className="btn btn-solid">{o.cta}</a>
                <p className="label text-mute">{o.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="t-big">What drives the cost</h2>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {PRICE_DRIVERS.map(([k, v]) => <div key={k} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[130px_1fr]"><dt className="text-[16px] font-medium">{k}</dt><dd className="text-[15px] leading-relaxed text-mute">{v}</dd></div>)}
          </dl>
        </div>
        <div>
          <h2 className="t-big">After launch</h2>
          <p className="mt-2 text-[15px] text-mute">Running costs to plan for. They go to other providers, so they aren&apos;t part of the estimate.</p>
          <dl className="mt-3 divide-y divide-line border-y border-line">
            {PRICE_RUNNING.map(([k, v]) => <div key={k} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[170px_1fr]"><dt className="text-[16px] font-medium">{k}</dt><dd className="text-[15px] leading-relaxed text-mute">{v}</dd></div>)}
          </dl>
        </div>
      </div>
    </>
  );
}
