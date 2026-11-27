"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Spec } from "./Spec";

const BARS: [string, number][] = [
  ["CURIOSITY", 12], ["BUILDING", 12], ["QUESTIONING ABSTRACTIONS", 11], ["SHIPPING THE MVP FIRST", 10], ["LEAVING INTERESTING THINGS ALONE", 2],
];

export function OperatingCharacteristics() {
  return (
    <Spec name="OperatingCharacteristics" id="OPERATING_CHARACTERISTICS" className="border border-ink bg-paper-3 p-5 md:p-8">
      <div className="mono flex justify-between"><span>OPERATING CHARACTERISTICS</span><span className="text-mute">NOT SCIENTIFIC</span></div>
      <ul className="mt-6 space-y-4">
        {BARS.map(([l, n], i) => (
          <li key={l}>
            <div className="mono">{l}</div>
            <div className="mt-1 flex gap-[3px]" aria-label={`${n} of 12`}>
              {Array.from({ length: 12 }).map((_, k) => (
                <motion.i key={k} className={`block h-4 flex-1 ${k < n ? "bg-ink" : "border border-hair"}`}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ delay: i * 0.08 + k * 0.025, type: "spring", stiffness: 500, damping: 30 }} style={{ originY: 1 }} />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="mono mono-sm mt-6 text-mute">SELF-REPORTED. DELIBERATELY UNSCIENTIFIC.</p>
    </Spec>
  );
}

const STEPS = ["SEE INTERESTING SYSTEM", "WONDER HOW IT WORKS", "INVESTIGATE", "BUILD OWN VERSION", "DISCOVER 14 NEW PROBLEMS", "EXCELLENT."];

export function FlowChain() {
  const [i, setI] = useState(-1);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only preference, unknown during SSR
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setI(STEPS.length - 1); return; }
    const id = setInterval(() => setI((v) => (v + 1) % (STEPS.length + 2)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <Spec name="DefaultBehaviour" id="DEFAULT_BEHAVIOUR">
      <ol className="mx-auto max-w-[520px]">
        {STEPS.map((s, k) => {
          const lit = k <= i && i < STEPS.length ? k === i : k <= i && i >= STEPS.length;
          const past = k < i;
          return (
            <li key={s} className="relative">
              <div className={`mono border px-4 py-3 text-center transition-all duration-200 ${lit ? "scale-[1.03] border-accent bg-accent text-ink" : past ? "border-ink" : "border-hair text-mute"}`}>{s}</div>
              {k < STEPS.length - 1 && <div className={`mx-auto h-6 w-px transition-colors ${past ? "bg-ink" : "bg-hair"}`} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </Spec>
  );
}
