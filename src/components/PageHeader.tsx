import { Spec, Tip } from "./Spec";

type Meta = { k: string; v: React.ReactNode; tip?: string };

/** The title block of a drawing sheet: FIG chip + kicker rule, headline, and beside it
 *  the intro and a small spec table. Everything is real counts from the data, nothing invented. */
export default function PageHeader({
  id, fig, kicker, sheet, title, intro, meta = [],
}: { id: string; fig: string; kicker: string; sheet?: string; title: React.ReactNode; intro?: React.ReactNode; meta?: Meta[] }) {
  return (
    <Spec name="PageHeader" id={id} as="header" className="frame pb-8 pt-8 md:pb-12 md:pt-12">
      <div className="mono flex items-center justify-between gap-4 border-b-2 border-ink pb-2">
        <span className="flex items-center gap-3">
          <Tip tip="yes, the numbering actually means something."><span className="bg-accent px-1.5 py-0.5 text-ink">FIG. {fig}</span></Tip>
          <span className="text-mute">{kicker}</span>
        </span>
        {sheet && <span className="text-mute max-sm:hidden">{sheet}</span>}
      </div>
      <div className="grid12 mt-6 items-end gap-y-6 md:mt-8">
        <h1 className="display col-span-6 text-[clamp(56px,10vw,168px)] md:col-span-7">{title}</h1>
        <div className="col-span-6 md:col-span-5 md:pb-2">
          {intro && <p className="max-w-[44ch] text-[17px] leading-snug text-graphite md:text-lg">{intro}</p>}
          {meta.length > 0 && (
            <dl className={`mono mt-5 grid border-t border-ink ${meta.length % 3 === 0 ? "grid-cols-3" : "grid-cols-2"}`}>
              {meta.map((m) => (
                <div key={m.k} className="border-b border-hair py-2.5 pr-3">
                  <dt className="mono-sm text-mute">{m.k}</dt>
                  <dd className="mt-0.5 text-accent-ink">{m.tip ? <Tip tip={m.tip}>{m.v}</Tip> : m.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </Spec>
  );
}
