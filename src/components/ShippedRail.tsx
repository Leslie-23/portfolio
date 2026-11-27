"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { PROJECTS, SHIPPED } from "@/lib/data";
import { Spec } from "./Spec";
import Shot from "./Shot";

/**
 * Real screens from real products, on a rail. Scroll moves the rail sideways (1:1, no easing lag).
 * Every screenshot is clean (no caption beneath), has its own personality, and opens the real product.
 * Phones / reduced motion: no pin, a normal swipeable strip.
 */
type Item = { slug: string; name: string; phones?: string[]; web?: boolean; mobile?: boolean; caseStudy: boolean };

// UAT Tracker is left off: its live site is only a login box. It keeps its case study.
const FROM_SHIPPED = ["sellis", "captivating-home", "nenecollectionz"];
const ITEMS: Item[] = [
  ...PROJECTS.filter((p) => p.media && p.slug !== "uat-tracker").map((p) => ({
    slug: p.slug, name: p.name, caseStudy: true,
    phones: p.portrait && p.gallery ? p.gallery.slice(0, 3).map((g) => g.src) : undefined,
    mobile: !p.portrait && !p.desktopOnly && !["elena"].includes(p.slug),
  })),
  ...SHIPPED.filter((s) => FROM_SHIPPED.includes(s.slug)).map((s) => ({ slug: s.slug, name: s.name, caseStudy: false, mobile: true })),
];

export default function ShippedRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const n = ITEMS.length;

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px) and (hover: hover)");
    if (reducedMotion() || !desktop.matches) return;
    const ctx = gsap.context(() => {
      const el = track.current!;
      const dist = () => Math.max(0, el.scrollWidth - window.innerWidth);
      gsap.to(el, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top+=56",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: true, // 1:1 with the wheel; Lenis already smooths it
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setIdx(Math.min(n - 1, Math.round(self.progress * (n - 1)))),
        },
      });
    }, root);
    return () => ctx.revert();
  }, [n]);

  return (
    <Spec name="ShippedRail" id="REAL_SCREENS" as="div">
      <section
        ref={root}
        aria-label="Screens from the products I've built. Each one opens the real product."
        className="relative flex flex-col justify-center overflow-hidden border-y border-ink bg-paper-2 max-[899px]:py-12 min-[900px]:h-[calc(100svh-56px)]"
      >
        <div className="frame flex items-end justify-between pb-6 max-[899px]:pb-4">
          <div>
            <div className="mono text-mute">FIG. 000 / SCREENS FROM THE REAL THING</div>
            <h2 className="display mt-2 text-[clamp(28px,4vw,64px)]">Shipped,<br className="md:hidden" /> not mocked.</h2>
          </div>
          <div className="mono text-right">
            <span className="text-accent-ink">{String(idx + 1).padStart(2, "0")}</span>
            <span className="text-mute"> / {String(n).padStart(2, "0")}</span>
            <div className="mt-1 text-mute max-[899px]:hidden">SCROLL →</div>
            <div className="mt-1 text-mute min-[900px]:hidden">SWIPE →</div>
          </div>
        </div>

        <div className="max-[899px]:snap-x max-[899px]:snap-mandatory max-[899px]:scroll-pl-[var(--gutter)] max-[899px]:overflow-x-auto max-[899px]:pb-6 min-[900px]:overflow-visible">
          <div ref={track} className="flex w-max gap-5 px-[var(--gutter)] py-3 will-change-transform">
            {ITEMS.map((it) => (
              <article key={it.slug} className="relative w-[84vw] shrink-0 snap-start min-[900px]:w-[min(52vw,calc((100svh-16rem)*1.6))]">
                <Shot slug={it.slug} name={it.name} label className="aspect-[16/10] w-full">
                  {it.phones ? (
                    <span className="absolute inset-0 flex items-center justify-center gap-[2.5%] bg-ink px-[8%] py-[5%]">
                      {it.phones.map((src) => (
                        <span key={src} className="relative block h-full overflow-hidden rounded-[10px] border border-white/25" style={{ aspectRatio: "1179 / 2556" }}>
                          <Image src={src} alt="" fill sizes="20vw" className="object-cover object-top" />
                        </span>
                      ))}
                    </span>
                  ) : (
                    <>
                      <Image src={`/work/${it.slug === "captivating-home" || it.slug === "sellis" || it.slug === "nenecollectionz" ? it.slug : PROJECTS.find((p) => p.slug === it.slug)!.media}/desktop.jpg`}
                        alt={`${it.name}: a real screen`} fill sizes="(min-width: 900px) 52vw, 84vw" className="object-cover object-top" />
                      {it.mobile && (
                        <span className="absolute bottom-3 right-3 block aspect-[390/844] w-[15%] overflow-hidden rounded-[8px] border border-ink bg-ink">
                          <Image src={`/work/${it.slug === "captivating-home" || it.slug === "sellis" || it.slug === "nenecollectionz" ? it.slug : PROJECTS.find((p) => p.slug === it.slug)!.media}/mobile.jpg`}
                            alt="" fill sizes="10vw" className="object-cover object-top" />
                        </span>
                      )}
                    </>
                  )}
                </Shot>
                {it.caseStudy && (
                  <Link href={`/work/${it.slug}`} className="mono absolute right-2 top-2 z-50 bg-paper px-1.5 text-ink hover:bg-ink hover:text-paper" data-cursor="CASE STUDY →">
                    CASE STUDY →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="frame pt-7 max-[899px]:hidden" aria-hidden>
          <div className="flex gap-1">
            {ITEMS.map((it, i) => (
              <i key={it.slug} className={`h-1 flex-1 transition-colors duration-200 ${i < idx ? "bg-ink" : i === idx ? "bg-accent" : "bg-ink/15"}`} />
            ))}
          </div>
        </div>
      </section>
    </Spec>
  );
}
