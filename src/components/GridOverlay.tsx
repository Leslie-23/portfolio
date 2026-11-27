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

  useEffect(() => {
    const el = root.current!;
    const cols = el.querySelectorAll(".gcol");
    const flash = () => {
      if (reducedMotion()) return;
      gsap.killTweensOf([el, cols]);
      gsap
        .timeline()
        .set(el, { opacity: 1 })
        .fromTo(cols, { scaleY: 0 }, { scaleY: 1, duration: 0.28, stagger: 0.012, ease: "power3.out", transformOrigin: "top" })
        .to(el, { opacity: 0, duration: 0.25, delay: 0.08 });
    };
    window.addEventListener("grid:flash", flash);
    return () => window.removeEventListener("grid:flash", flash);
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
    </div>
  );
}
