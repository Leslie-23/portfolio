import type { Metadata } from "next";
import { Suspense } from "react";
import Slide, { H } from "@/components/Slide";
import WorkDirectory from "@/components/WorkDirectory";
import WorkCard from "@/components/WorkCard";
import Ask from "@/components/Ask";
import { WORK, CASE_COUNT } from "@/lib/work";

export const metadata: Metadata = { title: "Work", description: "Every project in one place: products Leslie founded or leads, systems work, client sites and open-source tools." };

export default function Work() {
  return (
    <>
      <Slide label="Work" className="md:min-h-[60svh]">
        <div className="mt-7 grid gap-5 md:mt-10 md:gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <H as="h1" className="t-hero">Work</H>
          <p className="t-lead">
            All {WORK.length} projects in one place: products I founded or lead, {CASE_COUNT} case studies, live sites and the tools I gave away. Each one opens its own page.
          </p>
        </div>
        {/* without JS (or before hydration) the whole directory is still there, unfiltered */}
        <Suspense fallback={<ul className="mt-24 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{WORK.map((w) => <li key={w.slug}><WorkCard w={w} row /></li>)}</ul>}>
          <WorkDirectory items={WORK} />
        </Suspense>
      </Slide>
      <Ask />
    </>
  );
}
