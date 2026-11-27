"use client";
import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { useShell } from "./state";

/** The real 12-col grid, drawn on top of the page. Flashes during transitions,
 *  stays up in internals mode. It uses the same .frame/.grid12 classes as the page,
 *  so what you see is the layout the page is actually built on. */
export default function GridOverlay() {
  const root = useRef<HTMLDivElement>(null);
  const { internals } = useShell();
  const first = useRef(true);
  const internalsRef = useRef(internals);
  useEffect(() => { internalsRef.current = internals; }, [internals]);

  useEffect(() => {
    const el = root.current!;
    const cols = el.querySelectorAll(".gcol");
    const flash = () => {
      if (reducedMotion() || internalsRef.current) return;
      gsap.killTweensOf([el, cols]);
      gsap
        .timeline()
        .set(el, { opacity: 1 })
        .fromTo(cols, { scaleY: 0 }, { scaleY: 1, duration: 0.28, stagger: 0.012, ease: "power3.out", transformOrigin: "top" })
        .to(el, { opacity: 0, duration: 0.25, delay: 0.08 });
    };
    // exit half of a page transition: the grid comes up and stays until the next page arrives
    const hold = (e: Event) => {
      if (reducedMotion()) return;
      const to = (e as CustomEvent<string>).detail ?? "";
      const lbl = el.querySelector(".g-route");
      if (lbl) lbl.textContent = `RECONFIGURING → ${to.toUpperCase()}`;
      gsap.killTweensOf([el, cols, el.querySelectorAll(".g-reg, .g-route")]);
      gsap.timeline()
        .set(el, { opacity: 1 })
        .fromTo(cols, { scaleY: 0 }, { scaleY: 1, duration: 0.26, stagger: 0.012, ease: "power3.out", transformOrigin: "top" })
        .fromTo(el.querySelectorAll(".g-reg"), { scale: 2.4, opacity: 0, rotate: 45 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.22, ease: "back.out(2)", stagger: 0.03 }, 0.05)
        .fromTo(el.querySelectorAll(".g-route"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.18 }, 0.12);
    };
    const flashOrRelease = () => {
      if (gsap.getProperty(el, "opacity") === 1 && !internalsRef.current) {
        gsap.killTweensOf(el);
        gsap.timeline().to(el.querySelectorAll(".g-reg, .g-route"), { opacity: 0, duration: 0.2 }, 0.25).to(el, { opacity: 0, duration: 0.3 }, 0.35);
      } else flash();
    };
    window.addEventListener("grid:hold", hold);
    window.addEventListener("grid:flash", flashOrRelease);
    return () => { window.removeEventListener("grid:flash", flashOrRelease); window.removeEventListener("grid:hold", hold); };
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = root.current!;
    const cols = el.querySelectorAll(".gcol");
    gsap.killTweensOf([el, cols]);
    if (internals) {
      gsap.set(el, { opacity: 1 });
      if (reducedMotion()) gsap.set(cols, { scaleY: 1 });
      else gsap.fromTo(cols, { scaleY: 0 }, { scaleY: 1, duration: 0.5, stagger: 0.03, ease: "power3.out", transformOrigin: "top" });
    } else {
      gsap.to(el, { opacity: 0, duration: 0.35 });
    }
  }, [internals]);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[60] opacity-0">
      <div className="frame h-full">
        <div className="grid12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <i
              key={i}
              className={`gcol block h-full border-x border-dashed border-accent/40 bg-accent/[0.035] ${i >= 6 ? "max-[899px]:hidden" : ""}`}
            />
          ))}
        </div>
      </div>
      <span className="g-reg reg left-4 top-[68px] text-accent-ink opacity-0" />
      <span className="g-reg reg right-4 top-[68px] text-accent-ink opacity-0" />
      <span className="g-reg reg bottom-4 left-4 text-accent-ink opacity-0" />
      <span className="g-reg reg bottom-4 right-4 text-accent-ink opacity-0" />
      <span className="g-route mono absolute bottom-4 left-1/2 -translate-x-1/2 bg-paper px-2 text-accent-ink opacity-0" />
    </div>
  );
}
