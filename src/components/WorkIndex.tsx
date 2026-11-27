"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { CATEGORIES, PROJECTS, SHIPPED, type Category } from "@/lib/data";
import ProjectRow from "./ProjectRow";
import ShippedGrid from "./ShippedGrid";
import { Spec } from "./Spec";

export default function WorkIndex() {
  const [cat, setCat] = useState<Category | "ALL">("ALL");
  const list = useMemo(() => PROJECTS.filter((p) => cat === "ALL" || p.categories.includes(cat)), [cat]);
  const shipped = useMemo(() => SHIPPED.filter((p) => cat === "ALL" || p.categories.includes(cat)), [cat]);
  const count = (c: Category | "ALL") => (c === "ALL" ? PROJECTS.length + SHIPPED.length : [...PROJECTS, ...SHIPPED].filter((p) => p.categories.includes(c)).length);

  return (
    <>
      <Spec name="IndexFilter" id="INDEX_FILTER" className="frame z-30 md:sticky md:top-14 border-y border-ink bg-paper py-3">
        <div className="mono flex flex-wrap items-center gap-x-1 gap-y-2">
          <span className="mr-3 text-mute">INDEX FILTER</span>
          {(["ALL", ...CATEGORIES] as const).map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} data-cursor="FILTER"
              className={`px-2 py-0.5 transition-colors hover:text-accent-ink ${cat === c ? "bg-accent text-ink hover:!text-ink" : ""}`}>
              [{c}<sup className="ml-0.5 opacity-60">{count(c)}</sup>]
            </button>
          ))}
          <span className="ml-auto text-mute max-sm:hidden">SHOWING {list.length + shipped.length} / {PROJECTS.length + SHIPPED.length}</span>
        </div>
      </Spec>
      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
        </AnimatePresence>
        {shipped.length > 0 && (
          <section className="mt-12 border-t border-ink pt-8" aria-label="Shipped and live">
            <Spec name="ShippedHeader" id="SHIPPED_AND_LIVE" className="frame grid12 pb-8">
              <h2 className="display col-span-6 text-[clamp(32px,5vw,84px)] md:col-span-8">Shipped<br />&amp; live.</h2>
              <p className="mono col-span-6 mt-3 text-mute md:col-span-4 md:self-end md:text-right">{shipped.length} MORE, EACH ONE ON THE INTERNET RIGHT NOW</p>
            </Spec>
            <AnimatePresence mode="popLayout" initial={false}><ShippedGrid list={shipped} /></AnimatePresence>
          </section>
        )}
      </LayoutGroup>
    </>
  );
}
