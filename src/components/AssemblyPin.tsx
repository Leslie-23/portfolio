"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { PROJECTS } from "@/lib/data";
import { Spec } from "./Spec";

const P = PROJECTS[0]; // Trofficient: real layers, real screens
const PARTS = P.layers.slice(1).filter((l) => l.img);
// docked centre (percent of the stage), desktop / mobile, and where each piece starts: scattered, tilted
const DOCK = [
  { x: 24, y: 29, xm: 17, ym: 24, fx: -0.2, fy: 0.06, r: -10 },
  { x: 24, y: 71, xm: 17, ym: 76, fx: -0.12, fy: 0.12, r: 7 },
  { x: 76, y: 29, xm: 83, ym: 24, fx: 0.18, fy: 0.08, r: 9 },
  { x: 76, y: 71, xm: 83, ym: 76, fx: 0.2, fy: 0.1, r: -6 },
];

/** PINNED ASSEMBLY. Disconnected parts of a real product sit around the screen.
 *  Scroll: each part snaps into place, a line connects it, the app comes alive, SYSTEM COMPLETE, it moves on. */
export default function AssemblyPin() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const asm = useRef<HTMLDivElement>(null);
  // the lines are drawn in real pixels (pathLength dashes don't survive a stretched viewBox)
  const [box, setBox] = useState({ w: 1200, h: 600, md: true });
  useEffect(() => {
    const el = asm.current!;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height, md: window.innerWidth >= 768 }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion()) {
      const r = root.current!;
      r.querySelector(".ap-count")!.textContent = `${PARTS.length} / ${PARTS.length}`;
      r.querySelector(".ap-status")!.textContent = "SYSTEM COMPLETE.";
      return;
    }
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const st = stage.current!;
      const count = q(".ap-count")[0] as HTMLElement;
      const status = q(".ap-status")[0] as HTMLElement;
      gsap.set(q(".ap-line"), { strokeDasharray: 1, strokeDashoffset: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current, start: "top top+=56", end: "+=260%", pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            const n = Math.max(0, Math.min(PARTS.length, Math.floor((self.progress - 0.08) / 0.15) + 1));
            count.textContent = `${n} / ${PARTS.length}`;
            status.textContent = self.progress > 0.74 ? "SYSTEM COMPLETE." : n ? "ASSEMBLING…" : "DISCONNECTED";
            status.dataset.done = self.progress > 0.74 ? "1" : "0";
          },
        },
      });

      // start: scattered
      tl.set(q(".ap-part"), {
        x: (i) => DOCK[i].fx * st.clientWidth, y: (i) => DOCK[i].fy * st.clientHeight, rotate: (i) => DOCK[i].r, scale: 0.86,
      }, 0);
      tl.set(q(".ap-tag"), { opacity: 0, x: -8 }, 0);
      tl.set(q(".ap-dot"), { opacity: 0 }, 0);

      // each part: travel, lock (with a little overshoot), connect, label
      PARTS.forEach((_, i) => {
        const t = 0.4 + i * 1;
        tl.to(q(".ap-part")[i], { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.8, ease: "back.out(1.6)" }, t)
          .fromTo(q(".ap-lock")[i], { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power4.out" }, t + 0.75)
          .to(q(".ap-line")[i], { strokeDashoffset: 0, duration: 0.5 }, t + 0.7)
          .to(q(".ap-tag")[i], { opacity: 1, x: 0, duration: 0.3 }, t + 0.85);
        const dot = q(".ap-dot")[i];
        if (dot) tl.to(dot, { opacity: 1, duration: 0.1 }, t + 0.95);
      });

      // the app itself comes alive
      const live = 0.4 + PARTS.length;
      tl.to(q(".ap-slot"), { opacity: 0, duration: 0.3 }, live)
        .fromTo(q(".ap-phone"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.inOut" }, live)
        .fromTo(q(".ap-dims"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, live + 0.6)
        .to({}, { duration: 0.8 })
        // the finished object moves on
        .to(q(".ap-assembly"), { yPercent: -18, scale: 0.82, opacity: 0, duration: 1, ease: "power2.in" })
        .fromTo(q(".ap-next"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, ">-0.3");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Spec name="AssemblyPin" id="PINNED_ASSEMBLY" as="div">
      <section ref={root} aria-label={`${P.name}, assembled from its parts: ${P.layers.map((l) => l.label).join(", ")}`}
        className="relative flex h-[calc(100svh-56px)] flex-col overflow-hidden border-y border-ink bg-paper-3">
        <div className="frame flex items-end justify-between gap-4 pt-6">
          <div>
            <div className="mono text-mute"><span className="text-accent-ink">■</span> SYSTEMS THINKING / {P.name.toUpperCase()}</div>
            <h2 className="display mt-2 text-[clamp(34px,4.6vw,76px)]">A product is<br />its parts, connected.</h2>
          </div>
          <div className="mono text-right">
            <div className="text-mute">CONNECTED</div>
            <div className="ap-count display text-[clamp(28px,3vw,48px)] !leading-none">0 / {PARTS.length}</div>
            <div className="ap-status mt-1 text-mute data-[done='1']:bg-accent data-[done='1']:px-1 data-[done='1']:text-ink">DISCONNECTED</div>
          </div>
        </div>

        <div ref={stage} className="relative mx-auto my-4 w-full max-w-[1200px] flex-1 px-[var(--gutter)]">
          <div ref={asm} className="ap-assembly absolute inset-0">
            {/* faint grid only inside the stage: the drawing surface */}
            <div aria-hidden className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(var(--hair) 1px, transparent 1px), linear-gradient(90deg, var(--hair) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)" }} />

            {/* connection lines */}
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox={`0 0 ${box.w} ${box.h}`}>
              {PARTS.map((_, i) => {
                const d = DOCK[i], { w, h } = box;
                const x = ((box.md ? d.x : d.xm) / 100) * w, y = ((box.md ? d.y : d.ym) / 100) * h, mid = (x + w / 2) / 2;
                return (
                  <path key={i} className="ap-line" pathLength={1} fill="none" stroke="var(--accent)" strokeWidth={2}
                    d={box.md ? `M${x} ${y} H${mid} V${h / 2} H${w / 2}` : `M${x} ${y} H${w / 2}`} />
                );
              })}
              {/* junction dots where each line meets the spine */}
              {box.md && PARTS.map((_, i) => <circle key={i} className="ap-dot" cx={((DOCK[i].x / 100) * box.w + box.w / 2) / 2} cy={box.h / 2} r={3.5} fill="var(--accent)" />)}
            </svg>

            {/* the slot, then the app */}
            <div className="absolute left-1/2 top-1/2 h-[84%] -translate-x-1/2 -translate-y-1/2 max-md:h-[62%]" style={{ aspectRatio: "1179 / 2556" }}>
              <div className="ap-slot mono mono-sm absolute inset-0 grid place-items-center rounded-[18px] border border-dashed border-ink bg-paper text-center text-mute">[ SLOT ]<br />{P.layers[0].label}</div>
              <div className="ap-phone absolute inset-0 overflow-hidden rounded-[18px] border-2 border-ink bg-ink">
                <Image src={P.phone!} alt="" fill sizes="(min-width: 900px) 20vw, 30vw" className="object-cover object-top" />
              </div>
              <div className="ap-dims mono mono-sm absolute -bottom-5 left-0 right-0 flex justify-between whitespace-nowrap text-accent-ink max-md:justify-center"><span>L1 / {P.layers[0].label}</span><span className="max-md:hidden">1179 × 2556</span></div>
            </div>

            {/* the parts */}
            {PARTS.map((l, i) => (
              <div key={l.key} className="ap-part absolute left-[var(--xm)] top-[var(--ym)] h-[26%] -translate-x-1/2 -translate-y-1/2 md:left-[var(--x)] md:top-[var(--y)] md:h-[40%]"
                style={{ aspectRatio: "1179 / 2556", "--x": `${DOCK[i].x}%`, "--y": `${DOCK[i].y}%`, "--xm": `${DOCK[i].xm}%`, "--ym": `${DOCK[i].ym}%` } as React.CSSProperties}>
                <div className="absolute inset-0 overflow-hidden rounded-[10px] border border-ink bg-ink">
                  <Image src={l.img!.src} alt="" fill sizes="12vw" className="object-cover object-top" />
                </div>
                <span className="ap-lock absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center bg-accent text-[9px] text-ink" aria-hidden>✓</span>
                <div className={`ap-tag mono mono-sm absolute w-max max-w-[18ch] leading-tight max-md:top-full max-md:mt-1.5 md:top-3 ${DOCK[i].x < 50 ? "max-md:left-0 md:right-full md:mr-4 md:text-right" : "max-md:right-0 max-md:text-right md:left-full md:ml-4"}`}>
                  <span className="text-accent-ink">L{i + 2}</span> {l.label}
                  <div className="text-mute max-md:hidden">{l.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ap-next pointer-events-none absolute inset-0 grid place-items-center opacity-0">
            <div className="pointer-events-auto text-center">
              <div className="mono text-mute">FIG. {P.fig} / {P.name.toUpperCase()}</div>
              <div className="display mt-2 text-[clamp(40px,7vw,120px)]">System<br />complete.</div>
              <Link href={`/work/${P.slug}`} className="btn btn-go mono mt-6" data-cursor="OPEN →">READ THE CASE STUDY →</Link>
            </div>
          </div>
        </div>
      </section>
    </Spec>
  );
}
