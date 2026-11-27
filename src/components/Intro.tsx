"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { useShell } from "./state";

/** THE WEBSITE ASSEMBLES ITSELF. ~2s. Skippable (click / any key). Shown once per session. */
export default function Intro() {
  const { setIntroDone } = useShell();
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    let seen = false;
    try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch {}
    if (seen || reducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only readable on the client
      setGone(true);
      setIntroDone(true);
      return;
    }
    const q = gsap.utils.selector(el);
    const finish = () => {
      try { sessionStorage.setItem("intro-seen", "1"); } catch {}
      tl.kill();
      gsap.to(el, {
        opacity: 0, duration: 0.3, onComplete: () => { setGone(true); setIntroDone(true); },
      });
    };
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });
    tl.set(q(".i-reg"), { opacity: 0 })
      .to(q(".i-reg"), { opacity: 1, duration: 0.2, stagger: 0.05 })
      .fromTo(q(".i-gcol"), { scaleY: 0 }, { scaleY: 1, duration: 0.45, stagger: 0.03, transformOrigin: "top" }, 0.1)
      .fromTo(q(".i-hline"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.06, transformOrigin: "left" }, 0.2)
      .fromTo(q(".i-name span"), { y: 60, opacity: 0, rotate: () => gsap.utils.random(-6, 6) }, { y: 0, opacity: 1, rotate: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.6)" }, 0.55)
      .fromTo(q(".i-meta"), { opacity: 0, x: () => gsap.utils.random(-30, 30) }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.06 }, 0.8)
      .set(q(".i-status"), { textContent: "ASSEMBLY COMPLETE." }, 1.45)
      .to(q(".i-name, .i-meta"), { opacity: 0.0, duration: 0.2 }, 1.85)
      .to(q(".i-grid"), { opacity: 0, duration: 0.25 }, 1.85);
    const skip = () => finish();
    window.addEventListener("keydown", skip, { once: true });
    el.addEventListener("pointerdown", skip, { once: true });
    return () => { tl.kill(); window.removeEventListener("keydown", skip); };
  }, [setIntroDone]);

  if (gone) return null;
  return (
    <div ref={root} className="intro fixed inset-0 z-[200] cursor-pointer bg-paper text-ink" role="status" aria-label="Loading">
      <div className="i-grid absolute inset-0">
        <div className="frame h-full">
          <div className="grid12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <i key={i} className={`i-gcol block h-full border-x border-dashed border-accent/35 ${i >= 6 ? "max-[899px]:hidden" : ""}`} />
            ))}
          </div>
        </div>
        {[22, 50, 78].map((t) => (
          <i key={t} className="i-hline absolute left-0 right-0 border-t border-accent/35" style={{ top: `${t}%` }} />
        ))}
      </div>
      <span className="i-reg reg left-6 top-6" />
      <span className="i-reg reg right-6 top-6" />
      <span className="i-reg reg bottom-6 left-6" />
      <span className="i-reg reg bottom-6 right-6" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="i-name display flex text-[clamp(48px,12vw,168px)]" aria-label="Leslie">
          {"LESLIE".split("").map((c, i) => <span key={i} className="inline-block">{c}</span>)}
        </div>
      </div>
      <div className="i-meta mono absolute left-[var(--gutter)] top-[22%] -translate-y-1/2 text-mute">FIG. 001 / SOFTWARE ENGINEER</div>
      <div className="i-meta mono absolute right-[var(--gutter)] top-[78%] -translate-y-1/2 text-mute">GHANA / 2026</div>
      <div className="mono i-status absolute bottom-8 left-1/2 -translate-x-1/2 text-accent-ink">ASSEMBLING…</div>
      <div className="mono mono-sm absolute bottom-8 right-[var(--gutter)] text-mute max-sm:hidden">PRESS ANY KEY TO SKIP</div>
    </div>
  );
}
