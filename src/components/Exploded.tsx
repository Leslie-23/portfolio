"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/lib/data";

const ACCENT = { accent: "var(--accent)", red: "var(--red)", orange: "var(--orange)", green: "var(--green)" } as const;
const SPRING = { type: "spring", stiffness: 340, damping: 30, mass: 0.9 } as const;

/** The finished product, and the same product pulled apart into the layers that hold it up.
 *  Controlled: pass `exploded`. Layers are real DOM faces in CSS 3D, so the motion is physical. */
export default function Exploded({
  project, exploded, className = "", labels = true, ratio = "aspect-[16/10]", active,
}: { project: Project; exploded: boolean; className?: string; labels?: boolean; ratio?: string; active?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(400);
  const [w, setW] = useState(640);
  useEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(([e]) => { setH(e.contentRect.height); setW(e.contentRect.width); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = project.layers.length;
  const BASE = 0.74; // vertical centre of the bottom layer, as a share of the box height
  const gap = h * 0.15;
  const dy = gap * 0.85; // screen-space rise per layer at rotateX(58deg)
  const accent = ACCENT[project.accent];
  const wide = w > 480;
  // phone-first apps: portrait screens fan out side by side instead of stacking as landscape slabs
  const portrait = !!project.portrait && !!project.media;
  const shots = (project.gallery ?? []).slice(0, 3);

  return (
    <div ref={box} className={`plate relative w-full select-none ${ratio} ${className}`} style={{ perspective: 1600 }} aria-hidden>
      {/* leader lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ opacity: exploded && labels && !portrait ? 1 : 0, transition: "opacity .25s" }}>
        {project.layers.map((l, i) => {
          const y = h * BASE - (n - 1 - i) * dy;
          return (
            <g key={l.key}>
              <line x1={w * 0.42} x2={w * 0.6} y1={y} y2={y} stroke="var(--ink)" strokeWidth={1} strokeDasharray="3 3"
                style={{ transition: `stroke-dashoffset .4s ${i * 40}ms` }} />
              <circle cx={w * 0.42} cy={y} r={2.5} fill={accent} />
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {project.layers.map((l, i) => {
          const z = (n - 1 - i) * gap;
          return (
            <motion.div
              key={l.key}
              className="absolute overflow-hidden border border-ink"
              style={{
                transformStyle: "preserve-3d",
                background: portrait ? "#0d0f08" : l.img?.bg ? l.img.bg : active === i ? `color-mix(in srgb, ${accent} 22%, var(--paper-3))` : i === 0 ? "var(--paper-3)" : "color-mix(in srgb, var(--paper-3) 86%, transparent)",
                backgroundImage:
                  i === 0 || l.img ? undefined
                  : "repeating-linear-gradient(135deg, transparent 0 7px, color-mix(in srgb, var(--ink) 9%, transparent) 7px 8px)",
                zIndex: n - i,
              }}
              initial={false}
              animate={
                exploded
                  ? portrait
                    ? { left: `${1.8 + i * 19.3}%`, top: "9%", width: "18.5%", height: "60%", opacity: 1, borderRadius: 12, transform: "rotateX(5deg) rotateY(-18deg) rotateZ(0deg) translateZ(0px) scale(1)" }
                    : { left: "6%", top: "48%", width: "40%", height: "52%", opacity: 1, borderRadius: 0, transform: `rotateX(58deg) rotateY(0deg) rotateZ(-38deg) translateZ(${z}px) scale(1)` }
                  : { left: "0%", top: "0%", width: "100%", height: "100%", opacity: i === 0 ? 1 : 0, borderRadius: 0, transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px) scale(1)" }
              }
              transition={{ ...SPRING, delay: exploded ? (n - 1 - i) * 0.03 : i * 0.02 }}
            >
              {i === 0 ? (
                project.media ? (
                  <>
                    {portrait ? (
                      <>
                        {/* collapsed: three real screens side by side */}
                        <motion.div className="absolute inset-0 flex items-center justify-center gap-[2.5%] px-[6%] pb-[10%] pt-[8%]" initial={false} animate={{ opacity: exploded ? 0 : 1 }} transition={{ duration: 0.18 }}>
                          {shots.map((g, k) => (
                            <div key={g.src} className="relative h-full overflow-hidden rounded-[10px] border border-white/25" style={{ aspectRatio: "1179 / 2556", transform: `translateY(${k === 1 ? "-3%" : "3%"})` }}>
                              <Image src={g.src} alt="" fill sizes="20vw" className="object-cover object-top" />
                            </div>
                          ))}
                        </motion.div>
                        {/* exploded: this layer becomes one phone */}
                        <motion.div className="absolute inset-0" initial={false} animate={{ opacity: exploded ? 1 : 0 }} transition={{ duration: 0.18 }}>
                          <Image src={project.phone ?? `/work/${project.media}/desktop.jpg`} alt="" fill sizes="20vw" className="object-cover object-top" />
                        </motion.div>
                      </>
                    ) : (
                      <Image src={`/work/${project.media}/desktop.jpg`} alt="" fill sizes="(min-width: 900px) 50vw, 100vw" className="object-cover object-top" />
                    )}
                    <motion.div className="absolute inset-0" initial={false} animate={{ opacity: portrait && exploded ? 0 : 1 }} transition={{ duration: 0.15 }}>
                      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-[3%]">
                        <span className="mono bg-paper px-1.5 text-ink">FIG. {project.fig}</span>
                        <span className="mono bg-paper px-1.5" style={{ color: "var(--ink)" }}><span style={{ color: accent }}>●</span> {project.status}</span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-paper/95 px-[3%] pb-[2%] pt-[1.5%]">
                        <div className="display text-[clamp(16px,2.4vw,34px)]">{project.name}</div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <div className="flex h-full flex-col justify-between p-[4%]">
                    <div className="flex items-start justify-between">
                      <span className="mono text-mute">FIG. {project.fig}</span>
                      <span className="mono" style={{ color: accent }}>● {project.status}</span>
                    </div>
                    <div className="display text-[clamp(26px,4.2vw,64px)]">{project.name}</div>
                    <div className="mono flex justify-between text-mute"><span>{project.year}</span><span>{project.categories.join(" / ")}</span></div>
                  </div>
                )
              ) : l.img ? (
                <>
                  <Image src={l.img.src} alt="" fill sizes="(min-width: 900px) 30vw, 60vw"
                    className={l.img.fit === "contain" ? "object-contain p-[14%]" : "object-cover object-top"} />
                  {!portrait && <span className="mono mono-sm absolute left-1.5 top-1.5 bg-paper px-1 text-ink">L{i + 1}</span>}
                </>
              ) : (
                <div className="flex h-full flex-col justify-between p-[6%]">
                  <span className="mono mono-sm text-mute">L{i + 1}</span>
                  <div className="display text-[clamp(13px,1.5vw,22px)] !leading-[0.95]">{l.label}</div>
                  <div className="mono mono-sm text-mute">{l.detail}</div>
                </div>
              )}
              {i === 0 && !(portrait && exploded) && <span className="absolute inset-x-0 bottom-0 h-1" style={{ background: accent }} />}
            </motion.div>
          );
        })}
      </div>

      {/* labels */}
      {labels && (
        <div className="pointer-events-none absolute inset-0">
          {project.layers.map((l, i) => {
            const y = h * BASE - (n - 1 - i) * dy;
            const pos = portrait
              ? { left: `${1.8 + i * 19.3}%`, top: "72%", width: "19%" }
              : { left: "62%", top: y, translateY: "-50%", right: 0 };
            return (
              <motion.div
                key={l.key}
                className="absolute"
                style={pos}
                initial={false}
                animate={{ opacity: exploded ? (active === undefined || active === i ? 1 : 0.3) : 0, x: exploded ? 0 : -10 }}
                transition={{ duration: 0.22, delay: exploded ? 0.12 + i * 0.04 : 0 }}
              >
                <div className="mono leading-tight"><span style={{ color: accent }}>L{i + 1}</span>{portrait && !wide ? "" : ` ${l.label}`}</div>
                {wide && !portrait && <div className="mono mono-sm hidden text-mute lg:block">{l.detail}</div>}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
