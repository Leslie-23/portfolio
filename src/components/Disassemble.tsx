"use client";
import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { useShell } from "./state";

const SEL = "[data-part], main h1, main h2, main h3, main p, main figure, main li, main .plate, header, footer a, footer h2";

function parts(): HTMLElement[] {
  const all = Array.from(document.querySelectorAll<HTMLElement>(SEL)).filter((e) => !e.closest("[data-no-part]"));
  const set = new Set(all);
  // outermost only: nested transforms would compound
  return all.filter((e) => { let p = e.parentElement; while (p) { if (set.has(p)) return false; p = p.parentElement; } return true; }).slice(0, 140);
}

/** DISASSEMBLE SITE. Always reversible. Touches transforms only, never data or navigation. */
export default function Disassemble() {
  const { broken, setBroken } = useShell();
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef<HTMLElement[]>([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const ov = ref.current!;
    const q = gsap.utils.selector(ov);
    if (broken) {
      const els = parts();
      tracked.current = els;
      if (reducedMotion()) {
        gsap.set(els, { opacity: 0.25 });
      } else {
        gsap.to(els, {
          x: () => gsap.utils.random(-window.innerWidth * 0.35, window.innerWidth * 0.35),
          y: () => gsap.utils.random(-120, window.innerHeight * 0.5),
          rotate: () => gsap.utils.random(-24, 24),
          duration: 0.9, ease: "power3.out", stagger: { amount: 0.45, from: "random" },
        });
      }
      gsap.set(ov, { display: "grid" });
      gsap.fromTo(q(".broke > *"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.12, delay: 0.55, ease: "power3.out" });
    } else if (tracked.current.length) {
      const els = tracked.current;
      gsap.to(q(".broke > *"), { opacity: 0, duration: 0.2 });
      gsap.to(els, {
        x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.8, ease: "back.out(1.3)", stagger: { amount: 0.5, from: "random" },
        onComplete: () => { gsap.set(els, { clearProps: "x,y,rotate,opacity,transform" }); gsap.set(ov, { display: "none" }); tracked.current = []; },
      });
    }
  }, [broken]);

  useEffect(() => {
    if (!broken) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setBroken(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [broken, setBroken]);

  return (
    <div ref={ref} data-no-part style={{ display: "none" }} className="pointer-events-none fixed inset-0 z-[250] place-items-center">
      <div className="broke pointer-events-auto text-center">
        <div className="display text-[clamp(40px,9vw,120px)] text-ink">YOU BROKE IT.</div>
        <div className="mono mt-2 text-mute">good.</div>
        <button onClick={() => setBroken(false)} className="btn mono mt-8 bg-paper" data-cursor="REASSEMBLE">REASSEMBLE ↺</button>
      </div>
    </div>
  );
}
