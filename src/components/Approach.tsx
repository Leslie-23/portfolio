"use client";
import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { APPROACH } from "@/lib/data";
import { Spec } from "./Spec";

/** How a problem gets worked, as a sequence. A green line runs through the steps as you scroll; each locks on as it's reached. */
export default function Approach({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".ap-steps", start: "top 75%", end: "bottom 55%", scrub: 0.5 } });
      tl.fromTo(".ap-rail", { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", duration: APPROACH.length }, 0);
      APPROACH.forEach((_, i) => {
        tl.fromTo(`.ap-step-${i} .ap-node`, { backgroundColor: "var(--paper)" }, { backgroundColor: "var(--accent)", duration: 0.2 }, i + 0.1)
          .fromTo(`.ap-step-${i} .ap-copy`, { opacity: 0.35 }, { opacity: 1, duration: 0.4 }, i);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Spec name="Approach" id="APPROACH" as="section" className={`frame ${className}`}>
      <div ref={root}>
        <div className="grid12 items-end gap-y-4 pb-10">
          <div className="col-span-6 md:col-span-7">
            <div className="mono text-mute"><span className="text-accent-ink">■</span> APPROACH</div>
            <h2 className="display mt-3 text-[clamp(40px,5.6vw,92px)]">How I work a problem.</h2>
          </div>
          <p className="col-span-6 max-w-[46ch] text-graphite md:col-span-5">
            The same sequence every time, whether it&apos;s a payments flow or a caching layer. Most of the work happens before the first line of code.
          </p>
        </div>
        <ol className="ap-steps relative grid gap-y-8 md:grid-cols-5 md:gap-x-[var(--col-gap)]">
          {/* the rail: horizontal on desktop, vertical on phones */}
          <i aria-hidden className="absolute left-0 right-0 top-[7px] h-px bg-hair max-md:hidden" />
          <i aria-hidden className="ap-rail absolute left-0 right-0 top-[7px] h-[2px] origin-left bg-accent max-md:hidden" />
          <i aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-hair md:hidden" />
          <i aria-hidden className="ap-rail absolute bottom-0 left-[7px] top-0 w-[2px] origin-top bg-accent md:hidden" />
          {APPROACH.map((s, i) => (
            <li key={s.k} className={`ap-step-${i} relative max-md:pl-8`}>
              <span className="ap-node absolute left-0 top-0 block h-[15px] w-[15px] border-2 border-ink bg-accent" />
              <div className="ap-copy md:pt-8">
                <div className="mono text-accent-ink">{s.k}</div>
                <h3 className="display mt-1 text-[clamp(24px,2.2vw,34px)] !leading-[0.95]">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite">{s.b}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Spec>
  );
}
