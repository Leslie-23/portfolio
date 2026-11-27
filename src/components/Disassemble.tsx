"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, Draggable, reducedMotion } from "@/lib/gsap";
import { useShell } from "./state";

const SEL = "[data-part], main h1, main h2, main h3, main p, main figure, main li, main .plate, main .btn, header, footer a, footer h2";

function parts(): HTMLElement[] {
  const all = Array.from(document.querySelectorAll<HTMLElement>(SEL)).filter((e) => !e.closest("[data-no-part]"));
  const set = new Set(all);
  const vh = window.innerHeight;
  // outermost only (nested transforms would compound), and only what's on screen: off-screen parts stay put
  return all
    .filter((e) => { let p = e.parentElement; while (p) { if (set.has(p)) return false; p = p.parentElement; } return true; })
    .filter((e) => { const b = e.getBoundingClientRect(); return b.bottom > -40 && b.top < vh + 40 && b.width > 0; })
    .slice(0, 120);
}

/** DISASSEMBLE SITE. The parts scatter over the grid and can be dragged around.
 *  REASSEMBLE locks every part back into place. Transforms only: never data, never navigation. */
export default function Disassemble() {
  const { broken, setBroken } = useShell();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef<HTMLElement[]>([]);
  const drags = useRef<Draggable[]>([]);
  const first = useRef(true);
  const [loose, setLoose] = useState(0);
  const [moved, setMoved] = useState(0);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const ov = ref.current!;
    const q = gsap.utils.selector(ov);
    const count = q(".dz-count")[0] as HTMLElement | undefined;

    document.documentElement.classList.toggle("is-broken", broken);
    window.getSelection()?.removeAllRanges();
    if (broken) {
      const els = parts();
      tracked.current = els;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the count comes from the live DOM
      setLoose(els.length);
      setMoved(0);
      gsap.set(ov, { display: "block" });
      gsap.fromTo(q(".dz-col"), { scaleY: 0 }, { scaleY: 1, duration: 0.4, stagger: 0.02, ease: "power3.out", transformOrigin: "top" });
      gsap.fromTo(q(".dz-reg"), { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(2)" });
      if (reducedMotion()) {
        gsap.set(els, { opacity: 0.25 });
      } else {
        // a brief shudder, then everything lets go
        gsap.timeline()
          .to(els, { x: () => gsap.utils.random(-3, 3), y: () => gsap.utils.random(-2, 2), duration: 0.05, repeat: 3, yoyo: true, ease: "none" })
          .to(els, {
            x: () => gsap.utils.random(-window.innerWidth * 0.35, window.innerWidth * 0.35),
            y: () => gsap.utils.random(-120, window.innerHeight * 0.5),
            rotate: () => gsap.utils.random(-24, 24),
            duration: 0.9, ease: "power3.out", stagger: { amount: 0.45, from: "random" },
            onComplete: () => {
              // now the pieces are yours
              if (!window.matchMedia("(pointer: fine)").matches) return;
              drags.current = els.map((el) => {
                el.dataset.cursor = "MOVE";
                return Draggable.create(el, {
                  type: "x,y", zIndexBoost: true, dragClickables: true, minimumMovement: 4,
                  onPress() { gsap.to(el, { scale: 1.04, duration: 0.15 }); },
                  onRelease() { gsap.to(el, { scale: 1, duration: 0.25, ease: "back.out(2)" }); },
                  onDragEnd() { setMoved((m) => m + 1); },
                })[0];
              });
            },
          });
      }
      gsap.fromTo(q(".broke > *"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.12, delay: 0.85, ease: "power3.out" });
    } else if (tracked.current.length) {
      const els = tracked.current;
      drags.current.forEach((d) => d.kill());
      drags.current = [];
      els.forEach((el) => { if (el.dataset.cursor === "MOVE") delete el.dataset.cursor; });
      let locked = 0;
      gsap.to(q(".broke > *"), { opacity: 0, duration: 0.2 });
      gsap.timeline({
        onComplete: () => {
          gsap.set(els, { clearProps: "x,y,rotate,scale,opacity,transform,zIndex" });
          tracked.current = [];
        },
      })
        .to(els, {
          x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)", stagger: { amount: 0.6, from: "random" },
          onUpdate() {
            const n = Math.round(this.progress() * els.length);
            if (n !== locked && count) { locked = n; count.textContent = `${String(n).padStart(3, "0")} / ${String(els.length).padStart(3, "0")} LOCKED`; }
          },
        })
        .to(q(".dz-done"), { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" })
        .to(q(".dz-col"), { scaleY: 0, transformOrigin: "bottom", duration: 0.35, stagger: 0.015, ease: "power3.in" }, "+=0.35")
        .to(q(".dz-reg, .dz-done, .dz-count"), { opacity: 0, duration: 0.25 }, "<")
        .set(ov, { display: "none" })
        .set(q(".dz-done"), { scale: 0.8 })
        .set(q(".dz-count"), { opacity: 1, textContent: "" });
    }
  }, [broken]);

  // while broken: Esc reassembles, and clicks on loose parts don't navigate anywhere
  useEffect(() => {
    if (!broken) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setBroken(false);
    const block = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-no-part]")) return;
      if (tracked.current.some((el) => el.contains(t))) { e.preventDefault(); e.stopPropagation(); }
    };
    window.addEventListener("keydown", esc);
    document.addEventListener("click", block, true);
    return () => { window.removeEventListener("keydown", esc); document.removeEventListener("click", block, true); };
  }, [broken, setBroken]);

  // never carry a broken site onto another route (back/forward still work)
  useEffect(() => { setBroken(false); }, [pathname, setBroken]);

  return (
    <div ref={ref} data-no-part style={{ display: "none" }} className="pointer-events-none fixed inset-0 z-[250]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="frame h-full"><div className="grid12 h-full">
          {Array.from({ length: 12 }).map((_, i) => <i key={i} className={`dz-col block h-full border-x border-dashed border-accent/45 ${i >= 6 ? "max-[899px]:hidden" : ""}`} />)}
        </div></div>
        <span className="dz-reg reg left-4 top-4 text-accent-ink" /><span className="dz-reg reg right-4 top-4 text-accent-ink" />
        <span className="dz-reg reg bottom-4 left-4 text-accent-ink" /><span className="dz-reg reg bottom-4 right-4 text-accent-ink" />
      </div>
      <div className="grid h-full place-items-center">
        <div className="broke pointer-events-auto border border-ink bg-paper/90 px-8 py-6 text-center backdrop-blur-[2px]" role="alertdialog" aria-label="The site is disassembled">
          <div className="display text-[clamp(44px,8vw,112px)] text-ink">Disassembled.</div>
          <div className="mono mt-1 text-mute">EVERY PART OF THIS PAGE IS LOOSE. NOTHING IS LOST.</div>
          <div className="mono mono-sm mt-3 text-mute" aria-live="polite">
            {loose} PARTS LOOSE{moved > 0 ? ` · ${moved} MOVED` : " · DRAG TO INSPECT"}
          </div>
          <button onClick={() => setBroken(false)} className="btn mono mt-6 bg-paper" data-cursor="REASSEMBLE">REASSEMBLE ↺</button>
        </div>
      </div>
      <div className="dz-count mono absolute bottom-6 left-1/2 -translate-x-1/2 text-accent-ink" aria-hidden />
      <div className="dz-done display pointer-events-none absolute inset-0 grid scale-[0.8] place-items-center text-[clamp(36px,6vw,96px)] text-accent-ink opacity-0">
        <span className="bg-paper px-4">Assembly complete.</span>
      </div>
    </div>
  );
}
