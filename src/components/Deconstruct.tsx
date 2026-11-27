"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import type { Project } from "@/lib/data";
import Exploded from "./Exploded";
import { Spec } from "./Spec";

/** Scroll-driven decomposition: the finished product separates, each layer is explained, then it reassembles. */
export default function Deconstruct({ project: p }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  const [state, setState] = useState<{ exploded: boolean; active?: number; done: boolean }>({ exploded: false, done: false });
  const last = useRef("");
  const n = p.layers.length;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only preference, unknown during SSR
    if (reducedMotion()) { setState({ exploded: true, done: false }); return; }
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current, start: "top top", end: `+=${(n + 2) * 70}%`, pin: true, anticipatePin: 1,
          onUpdate: (self) => {
            const t = self.progress, seg = 1 / (n + 2);
            let next: { exploded: boolean; active?: number; done: boolean };
            if (t < seg * 0.6) next = { exploded: false, done: false };
            else if (t < seg * 0.6 + seg * n) next = { exploded: true, active: Math.min(n - 1, Math.floor((t - seg * 0.6) / seg)), done: false };
            else if (t < 1 - seg * 0.35) next = { exploded: true, done: false };
            else next = { exploded: false, done: true };
            const key = JSON.stringify(next);
            if (key !== last.current) { last.current = key; setState(next); }
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, [n]);

  const a = state.active;
  return (
    <Spec as="div" name="Deconstruction" id="DECONSTRUCTION">
      <section ref={root} className="relative flex h-[100svh] flex-col justify-center overflow-hidden border-y border-ink bg-paper-2">
        <div className="frame grid12 gap-y-6">
          <div className="col-span-6 md:col-span-4 md:self-center">
            <div className="mono text-mute">FIG. {p.fig} / DECONSTRUCTION</div>
            <div className="display mt-3 min-h-[2.6em] text-[clamp(28px,4vw,64px)]" aria-live="polite">
              {state.done ? "SYSTEM COMPLETE." : a === undefined ? (state.exploded ? "ALL LAYERS" : "THE FINISHED PRODUCT") : p.layers[a].label}
            </div>
            <p className="mt-3 max-w-[34ch] text-graphite">
              {state.done ? "Reassembled. Same product, now you know what's inside it." : a === undefined ? (state.exploded ? "Five layers hold it up." : "Scroll to take it apart.") : p.layers[a].detail}
            </p>
            <div className="mono mt-6 flex gap-1" aria-hidden>
              {p.layers.map((_, i) => <i key={i} className={`h-1 w-8 ${a === i ? "bg-accent" : "bg-ink/20"}`} />)}
            </div>
          </div>
          <div className="col-span-6 md:col-span-8">
            <Exploded project={p} exploded={state.exploded} active={a} ratio="aspect-[16/11] max-h-[68svh]" />
          </div>
        </div>
      </section>
    </Spec>
  );
}
