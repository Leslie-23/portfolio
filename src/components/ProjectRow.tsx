"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import type { Project } from "@/lib/data";
import Exploded from "./Exploded";
import { Spec, Tip } from "./Spec";

export default function ProjectRow({ project: p, index = 0 }: { project: Project; index?: number }) {
  const router = useRouter();
  const [exploded, setExploded] = useState(false);
  const opening = useRef(false);
  const fine = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  // INSPECT → ASSEMBLE → ENTER
  const open = () => {
    if (opening.current) return;
    opening.current = true;
    setExploded(false);
    setTimeout(() => router.push(`/work/${p.slug}`), 380);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ layout: { type: "spring", stiffness: 380, damping: 36 }, duration: 0.2 }}
      className="border-t border-ink"
    >
      <Spec name="ProjectRow" id={`FIG_${p.fig}`} className="frame grid12 gap-y-6 py-8 md:py-12">
        <div className="col-span-6 md:col-span-5 md:flex md:flex-col md:justify-between">
          <div>
            <div className="mono flex items-center justify-between text-mute md:justify-start md:gap-6">
              <Tip tip="yes, the numbering actually means something.">FIG. {p.fig}</Tip>
              <span>{String(index + 1).padStart(2, "0")} / {p.year}</span>
            </div>
            <h2 className="display mt-3 text-[clamp(36px,5.6vw,92px)]">
              <Link
                href={`/work/${p.slug}`}
                onFocus={() => setExploded(true)} onBlur={() => setExploded(false)}
                className="outline-offset-4 hover:text-accent-ink"
                data-cursor="OPEN FIG. →"
              >
                {p.name}
              </Link>
            </h2>
            <div className="mono mt-3 flex flex-wrap gap-x-4 text-mute"><span>{p.categories.join(" / ")}</span><span>{p.role}</span></div>
            <p className="mt-5 max-w-[44ch] text-graphite">{p.blurb}</p>
          </div>
          <Link href={`/work/${p.slug}`} className="btn mono mt-6 w-fit" data-cursor="OPEN FIG. →">INSPECT PROJECT →</Link>
        </div>

        <div className="col-span-6 md:col-span-7">
          <button
            type="button"
            aria-label={`Inspect ${p.name}: ${exploded ? "assemble" : "explode"} layers`}
            onPointerEnter={(e) => e.pointerType === "mouse" && setExploded(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setExploded(false)}
            onClick={() => (fine() ? open() : exploded ? open() : setExploded(true))}
            data-cursor={exploded ? "OPEN FIG. →" : "INSPECT"} data-cursor-dim
            className="block w-full border border-hair bg-paper-3 p-3 text-left transition-colors hover:border-ink md:p-5"
          >
            <Exploded project={p} exploded={exploded} />
            <div className="mono mt-3 flex justify-between text-mute"><span>{exploded ? "EXPLODED VIEW" : "ASSEMBLED"}</span><span>{p.layers.length} LAYERS</span></div>
          </button>
        </div>
      </Spec>
    </motion.article>
  );
}
