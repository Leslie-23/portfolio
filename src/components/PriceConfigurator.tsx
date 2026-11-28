"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { BASE, DEFAULTS, DESIGNS, FEATURES, MODES, PACES, SIZES, cedi, estimate, type Selection } from "@/lib/pricing";
import { PERSON } from "@/lib/data";

function Step({ n, title, hint, children, setRef }: { n: string; title: string; hint?: string; children: React.ReactNode; setRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div ref={setRef} className="step-in scroll-mt-[calc(var(--bar)+16px)]"><fieldset className="border-t border-line pt-6 md:pt-8">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-baseline gap-4" aria-hidden>
        <span className="label text-accent-ink">{n}</span>
        <h3 className="t-big">{title}</h3>
      </div>
      {hint && <p className="mt-2 max-w-[60ch] text-[15px] text-mute md:ml-[calc(11px*2+1rem)]">{hint}</p>}
      <div className="mt-5">{children}</div>
    </fieldset></div>
  );
}

/** One choice, as a card. Radio or checkbox underneath, so keyboard and screen readers work as normal controls. */
function Choice({ type, name, checked, onChange, title, body, aside }: {
  type: "radio" | "checkbox"; name: string; checked: boolean; onChange: () => void; title: string; body: string; aside?: string;
}) {
  return (
    <label className="relative block cursor-pointer">
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex h-full flex-col rounded-[16px] border border-line bg-card p-4 transition-colors peer-checked:border-ink peer-checked:bg-soft peer-hover:border-ink/50 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-ink md:p-5">
        <span className="flex items-start justify-between gap-3">
          <span className="text-[17px] font-medium leading-snug tracking-[-0.02em]">{title}</span>
          <i aria-hidden className={`mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center border-2 ${type === "radio" ? "rounded-full" : "rounded-[5px]"} ${checked ? "border-ink bg-ink" : "border-mute/50"}`}>
            {checked && <i className={`block bg-white ${type === "radio" ? "h-[6px] w-[6px] rounded-full" : "h-[8px] w-[8px] rounded-[2px]"}`} />}
          </i>
        </span>
        <span className="mt-1.5 text-[14px] leading-relaxed text-mute">{body}</span>
        {aside && <span className="mt-3 text-[14px] font-medium text-body">{aside}</span>}
      </span>
    </label>
  );
}

export default function PriceConfigurator() {
  const [sel, setSel] = useState<Selection>(DEFAULTS);
  const [shown, setShown] = useState(1);            // how many steps are revealed (they all stay on the page)
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const est = useMemo(() => estimate(sel), [sel]);
  const TOTAL = 6;
  // reveal the next step, then bring it into view. Revealed steps are never hidden again.
  const advance = (from: number) => {
    if (from + 1 >= TOTAL && shown >= TOTAL) return;
    setShown((n) => Math.max(n, Math.min(TOTAL, from + 2)));
    setTimeout(() => refs.current[from + 1]?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }), 60);
  };
  useEffect(() => { refs.current = refs.current.slice(0, TOTAL); }, []);
  // arriving with ?type=mobile (Elena sends people this way): pick what they are building and show both steps
  useEffect(() => {
    const t = new URLSearchParams(location.search).get("type");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the address is only known on the client
    if (t && BASE.some((b) => b.id === t)) { setSel((s) => ({ ...s, type: t })); setShown((n) => Math.max(n, 2)); }
  }, []);
  const pick = <K extends keyof Selection>(k: K, v: Selection[K], step: number) => { setSel((s) => ({ ...s, [k]: v })); if (step + 1 >= shown) advance(step); };
  const toggle = (id: string) => setSel((s) => ({ ...s, features: s.features.includes(id) ? s.features.filter((x) => x !== id) : [...s.features, id] }));

  const summary = useMemo(() => {
    if (!est) return "";
    const g = <T extends { id: string; label: string }>(a: T[], id: string) => a.find((x) => x.id === id)!.label;
    const feats = FEATURES.filter((f) => sel.features.includes(f.id)).map((f) => f.label);
    return [
      "Hi Leslie, I built this estimate on your pricing page.", "",
      `Size: ${g(SIZES, sel.size ?? "medium")}`, `Building: ${g(BASE, sel.type!)}`,
      `Features: ${feats.length ? feats.join(", ") : "none beyond the basics"}`,
      `Design: ${g(DESIGNS, sel.design ?? "template")}`, `How we work: ${g(MODES, sel.mode ?? "sprints")}`, `Pace: ${g(PACES, sel.pace ?? "standard")}`, "",
      `Estimate: ${cedi(est.low)} to ${cedi(est.high)}, about ${est.weeksLow}–${est.weeksHigh} weeks.`, "",
      "A bit about the project:", "",
    ].join("\n");
  }, [est, sel]);
  const mailto = `mailto:${PERSON.email}?subject=${encodeURIComponent("Project estimate")}&body=${encodeURIComponent(summary)}`;
  const dirty = JSON.stringify(sel) !== JSON.stringify(DEFAULTS);

  const result = (compact = false) => (
    <div aria-live="polite">
      {est ? (
        <>
          <p className="label text-mute">Your estimate</p>
          <p className={`mt-2 font-medium leading-[0.95] tracking-[-0.05em] ${compact ? "text-[26px]" : "text-[clamp(34px,3.4vw,52px)]"}`}>{cedi(est.low)} <span className="text-mute">to</span> {cedi(est.high)}</p>
          <p className={`${compact ? "text-[14px]" : "mt-2 text-[17px]"} text-body`}>About <span className="font-medium">{est.weeksLow}–{est.weeksHigh} weeks</span></p>
        </>
      ) : (
        <>
          <p className="label text-mute">Your estimate</p>
          <p className={`mt-2 leading-snug text-body ${compact ? "text-[14px]" : "text-[17px]"}`}>Answer the first two questions to see a price range and timeline.</p>
        </>
      )}
    </div>
  );

  return (
    <div className="mt-8 grid gap-10 pb-24 md:mt-14 lg:grid-cols-[1fr_390px] lg:gap-14 lg:pb-0">
      <form id="builder" onSubmit={(e) => e.preventDefault()} className="space-y-9 md:space-y-12" aria-label="Project estimate">
        <Step n="01" title="How big is it?" hint="A screen is a page or view, such as sign-in, a product list or checkout." setRef={(el) => { refs.current[0] = el; }}>
          <div className="grid gap-3 md:grid-cols-3">
            {SIZES.map((x) => <Choice key={x.id} type="radio" name="size" checked={sel.size === x.id} onChange={() => pick("size", x.id, 0)} title={x.label} body={x.what} />)}
          </div>
        </Step>

        {shown > 1 && (
          <Step n="02" title="What are you building?" setRef={(el) => { refs.current[1] = el; }}>
            <div className="grid gap-3 sm:grid-cols-2">
              {BASE.map((x) => <Choice key={x.id} type="radio" name="type" checked={sel.type === x.id} onChange={() => pick("type", x.id, 1)} title={x.label} body={x.what} aside={`From ${cedi(x.from)}`} />)}
            </div>
          </Step>
        )}

        {shown > 2 && (
          <Step n="03" title="What should it do?" hint="Tick everything you need. Leave it empty if you only need the basics." setRef={(el) => { refs.current[2] = el; }}>
            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => <Choice key={f.id} type="checkbox" name="features" checked={sel.features.includes(f.id)} onChange={() => toggle(f.id)} title={f.label} body={f.what} />)}
            </div>
            {shown === 3 && <button type="button" onClick={() => advance(2)} className="btn btn-solid mt-6">{sel.features.length ? "Continue" : "Nothing extra, continue"}</button>}
          </Step>
        )}

        {shown > 3 && (
          <Step n="04" title="How should it look?" setRef={(el) => { refs.current[3] = el; }}>
            <div className="grid gap-3 md:grid-cols-3">
              {DESIGNS.map((d) => <Choice key={d.id} type="radio" name="design" checked={sel.design === d.id} onChange={() => pick("design", d.id, 3)} title={d.label} body={d.what} />)}
            </div>
          </Step>
        )}

        {shown > 4 && (
          <Step n="05" title="How should we work?" hint="I use AI across the build. The more of it AI takes on, the less you pay, with trade-offs." setRef={(el) => { refs.current[4] = el; }}>
            <div className="grid gap-3 md:grid-cols-3">
              {MODES.map((m) => <Choice key={m.id} type="radio" name="mode" checked={sel.mode === m.id} onChange={() => pick("mode", m.id, 4)} title={m.label} body={m.what} aside={m.note} />)}
            </div>
          </Step>
        )}

        {shown > 5 && (
          <Step n="06" title="How soon do you need it?" setRef={(el) => { refs.current[5] = el; }}>
            <div className="grid gap-3 md:grid-cols-3">
              {PACES.map((p) => <Choice key={p.id} type="radio" name="pace" checked={sel.pace === p.id} onChange={() => pick("pace", p.id, 5)} title={p.label} body={p.what} />)}
            </div>
          </Step>
        )}

        {shown < TOTAL && <p className="label text-mute" aria-live="polite">Step {shown} of {TOTAL}</p>}

        <div className="lg:hidden"><div className="panel p-5">{result()}</div></div>
      </form>

      {/* desktop: a summary that stays in view while you choose */}
      <aside className="hidden lg:block" aria-label="Estimate summary">
        <div className="panel sticky top-[calc(var(--bar)+24px)] p-6 md:p-7">
          {result()}
          {est && (
            <>
              <dl className="mt-6 divide-y divide-line border-y border-line text-[15px]">
                {est.lines.map((l) => <div key={l.label} className="flex justify-between gap-4 py-2.5"><dt className="text-mute">{l.label}</dt><dd className="font-medium">{l.value}</dd></div>)}
              </dl>
              <p className="mt-4 text-[13px] leading-snug text-mute">An indicative range for design, development, testing and launch, not a quote. Hosting and other running costs are extra.</p>
              <a href={mailto} className="btn btn-solid mt-5 w-full justify-center">Send me this estimate</a>
            </>
          )}
          {dirty && <button type="button" onClick={() => { setSel(DEFAULTS); setShown(1); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="u mt-4 text-[14px] text-mute">Start again</button>}
        </div>
      </aside>

      {/* phones: a bar that stays at the bottom */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          {result(true)}
          {est && <a href={mailto} className="btn btn-solid shrink-0 !h-10 !px-4 !text-[14px]">Send</a>}
        </div>
      </div>
    </div>
  );
}
