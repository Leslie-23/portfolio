"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, reducedMotion } from "@/lib/gsap";
import { PERSON, PROJECTS, SHIPPED } from "@/lib/data";
import { useShell } from "./state";
import { Spec } from "./Spec";

const STATS = [
  { n: PROJECTS.length, l: "CASE STUDIES" },
  { n: PROJECTS.filter((p) => p.live).length + SHIPPED.length, l: "LIVE IN PRODUCTION" },
  { n: 2, l: "CLIENT PLATFORMS SHIPPED" },
  { n: PERSON.year - 2022, l: "YEARS BUILDING" },
];

// project fragments pinned to the sheet: real screens, each with a leader line to its figure label
const FRAGS = ["four-man-chess", "ai-sme", "trofficient"].map((slug, i) => {
  const p = PROJECTS.find((x) => x.slug === slug)!;
  return { p, depth: [10, 6, 3][i], box: ["right-[2%] top-[4%] w-[78%]", "right-[30%] top-[34%] w-[70%]", "right-[6%] top-[60%] w-[66%]"][i] };
});

/** A drawing sheet: title block, rulers, a stack of real screens with leader lines, and a facts strip. */
export default function Hero() {
  const { introDone } = useShell();
  const root = useRef<HTMLDivElement>(null);
  const vline = useRef<SVGLineElement>(null);
  const hline = useRef<SVGLineElement>(null);
  const readout = useRef<HTMLDivElement>(null);
  const frags = useRef<(HTMLAnchorElement | null)[]>([]);

  // the sheet assembles: pieces arrive from disconnected positions and lock into the grid
  useEffect(() => {
    if (!introDone || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-asm]", {
        x: () => gsap.utils.random(-90, 90), y: () => gsap.utils.random(-40, 70), opacity: 0,
        rotate: () => gsap.utils.random(-2, 2), duration: 0.7, stagger: 0.05, ease: "back.out(1.5)",
      });
      gsap.from(".hero-tick", { scaleX: 0, transformOrigin: "left", duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.2 });
      gsap.from(".hero-leader", { scaleX: 0, transformOrigin: "right", duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.7 });
    }, root);
    return () => ctx.revert();
  }, [introDone]);

  // measurement: lines follow the pointer. Writes straight to the DOM, no React renders.
  useEffect(() => {
    const el = root.current!;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0, mx = 0, my = 0;
    const draw = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      const x = mx - b.left, y = my - b.top;
      vline.current?.setAttribute("x1", String(x)); vline.current?.setAttribute("x2", String(x));
      hline.current?.setAttribute("y1", String(y)); hline.current?.setAttribute("y2", String(y));
      if (readout.current) {
        readout.current.style.transform = `translate(${x + 10}px, ${y + 10}px)`;
        readout.current.textContent = `X ${Math.round(x).toString().padStart(4, "0")} · Y ${Math.round(y).toString().padStart(4, "0")}`;
      }
      // fragments offset against the pointer by their depth: a measured shift, not a float
      const nx = x / b.width - 0.5, ny = y / b.height - 0.5;
      frags.current.forEach((f, i) => {
        if (!f) return;
        const d = FRAGS[i].depth;
        f.style.translate = `${(-nx * d).toFixed(1)}px ${(-ny * d).toFixed(1)}px`;
        const o = f.querySelector<HTMLElement>(".frag-off");
        if (o) o.textContent = `Δ ${(-nx * d).toFixed(1)} , ${(-ny * d).toFixed(1)}`;
      });
    };
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(draw); };
    const enter = () => { el.dataset.measure = "1"; };
    const leave = () => { el.dataset.measure = "0"; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <Spec as="section" name="Hero" id="HERO" className="overflow-hidden">
      <div ref={root} className="relative flex min-h-[calc(100svh-56px)] flex-col" data-measure="0">
        {/* rulers */}
        <i aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[7px] opacity-70" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--ink) 0 1px, transparent 1px 10px)", maskImage: "linear-gradient(#000, #000)" }} />
        <i aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[13px] opacity-60" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--ink) 0 1px, transparent 1px 100px)" }} />
        <i aria-hidden className="pointer-events-none absolute bottom-0 left-0 top-0 w-[7px] opacity-50 max-md:hidden" style={{ backgroundImage: "repeating-linear-gradient(180deg, var(--ink) 0 1px, transparent 1px 10px)" }} />

        {/* portrait: a light, faded layer behind the type */}
        <div aria-hidden className="pointer-events-none absolute right-[-8%] top-[3%] z-0 h-[40%] w-[74%] md:bottom-0 md:right-0 md:top-[7%] md:h-auto md:w-[52%]" data-no-part>
          <Image
            src="/portrait/leslie.png" alt="" fill priority sizes="(min-width: 900px) 52vw, 78vw"
            className="object-contain object-right-top opacity-[0.17] mix-blend-multiply md:object-right-bottom"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 78% 82% at 66% 55%, #000 38%, transparent 88%)",
              maskImage: "radial-gradient(ellipse 78% 82% at 66% 55%, #000 38%, transparent 88%)",
            }}
          />
        </div>

        {/* pointer measurement */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity [[data-measure='1']_&]:opacity-100">
          <line ref={vline} y1="0" y2="100%" stroke="var(--accent-ink)" strokeWidth="1" strokeDasharray="2 4" />
          <line ref={hline} x1="0" x2="100%" stroke="var(--accent-ink)" strokeWidth="1" strokeDasharray="2 4" />
        </svg>
        <div ref={readout} aria-hidden className="mono mono-sm pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap text-accent-ink opacity-0 [[data-measure='1']_&]:opacity-100" />

        <div className="frame grid12 flex-1 content-center gap-y-10 py-10 md:py-8">
          {/* title block */}
          <div className="col-span-6 md:col-span-12 flex flex-wrap items-start justify-between gap-6" data-asm data-spec="TitleBlock">
            <div className="mono flex w-full flex-wrap items-center justify-between gap-3 border-b border-ink pb-2">
              <span>SOFTWARE ENGINEER &amp; FOUNDER</span>
              <span className="text-mute">{PERSON.place.toUpperCase()}</span>
            </div>
          </div>

          {/* headline */}
          <div className="relative z-20 col-span-6 md:col-span-9 md:self-center" data-spec="Headline" data-spec-id="FIG_001">
            <h1 className="display text-[clamp(56px,10.5vw,176px)]" data-asm>Leslie Paul<br />Ajayi</h1>
            <div className="hero-tick my-6 h-[2px] w-24 bg-accent" />
            <p className="max-w-[24ch] text-[clamp(24px,2.7vw,42px)] font-medium leading-[1.12] tracking-[-0.02em]" data-asm>
              I take systems apart to understand them, <span className="text-accent-ink">then build better ones.</span>
            </p>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-graphite" data-asm>
              Software engineer at Global Icons and founder of Trofficient. I build production systems for real businesses in Ghana: payments, real-time tracking, retail and applied AI.
            </p>
            <div className="mt-7 flex flex-wrap gap-3" data-asm data-spec="Actions">
              <Link href="/work" className="btn btn-go mono" data-cursor="OPEN →">SELECTED WORK →</Link>
              <Link href="/about#experience" className="btn mono">EXPERIENCE</Link>
              <Link href="/contact" className="btn mono">GET IN TOUCH</Link>
            </div>
          </div>

          {/* fragments: page one of the manual has figures */}
          <div aria-label="Selected projects" data-spec="Fragments" className="relative col-span-3 col-start-10 row-start-2 min-h-[440px] max-[1099px]:hidden">
            {FRAGS.map(({ p, box }, i) => (
              <Link
                key={p.slug} href={`/work/${p.slug}`} ref={(el) => { frags.current[i] = el; }} data-asm
                data-cursor="OPEN FIG. →" data-cursor-dim
                className={`group absolute block ${box} transition-[translate] duration-300 ease-out hover:z-10`}
              >
                <span className="block border border-ink bg-ink transition-[transform,outline-color] duration-200 outline outline-2 outline-offset-4 outline-transparent group-hover:-translate-y-1 group-hover:outline-accent">
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <Image src={`/work/${p.media}/desktop.jpg`} alt={`${p.name}`} fill sizes="22vw" priority={i === 0} className="object-cover object-top" />
                  </span>
                </span>
                {/* leader line out to the left, to the figure label */}
                <span aria-hidden className="hero-leader absolute right-full top-[22%] mr-1 h-px w-[42%] origin-right bg-ink" />
                <span aria-hidden className="absolute right-full top-[22%] mr-1 h-1.5 w-1.5 -translate-y-[2.5px] translate-x-[-42%] rounded-full bg-accent" />
                <span className="mono mono-sm absolute right-[calc(100%+42%+12px)] top-[22%] -translate-y-1/2 whitespace-nowrap text-right leading-tight">
                  <span className="block">FIG. {p.fig}</span>
                  <span className="block text-mute group-hover:text-accent-ink">{p.name.toUpperCase()}</span>
                  <span className="frag-off block text-mute opacity-0 transition-opacity [[data-measure='1']_&]:opacity-100">Δ 0.0 , 0.0</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* facts strip, like the footer of a drawing */}
        <div className="border-t border-ink bg-paper-2" data-asm data-spec="FactsStrip">
          <dl className="frame grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.l} className={`py-4 md:py-5 ${i > 0 ? "md:border-l md:border-hair md:pl-6" : ""} ${i % 2 === 1 ? "max-md:border-l max-md:border-hair max-md:pl-4" : ""}`}>
                <dd className="display flex items-start gap-2 text-[clamp(28px,3.4vw,52px)] !leading-none"><i aria-hidden className="mt-1 block h-2 w-2 shrink-0 bg-accent" />{String(s.n).padStart(2, "0")}</dd>
                <dt className="mono mt-1 text-mute">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Spec>
  );
}
