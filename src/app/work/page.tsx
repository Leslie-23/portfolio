import type { Metadata } from "next";
import WorkIndex from "@/components/WorkIndex";
import { Spec } from "@/components/Spec";
import { PROJECTS, SHIPPED } from "@/lib/data";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <>
      <Spec name="WorkHeader" id="CATALOGUE" as="header" className="frame grid12 py-16 md:py-24">
        <div className="mono col-span-6 text-mute md:col-span-12">CATALOGUE / {PROJECTS.length} CASE STUDIES + {SHIPPED.length} SHIPPED</div>
        <h1 className="display col-span-6 mt-4 text-[clamp(44px,8.4vw,148px)] md:col-span-10">Things<br />I've built.</h1>
        <p className="col-span-6 mt-6 max-w-[44ch] text-graphite md:col-span-4 md:col-start-9 md:self-end">
          Hover (or tap) a plate to take it apart. Click to go inside. Below the case studies: everything else that shipped, with live links.
        </p>
      </Spec>
      <WorkIndex />
      <Spec name="Packages" id="PUBLISHED" as="section" className="frame mt-16 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink py-6">
        <span className="mono text-mute">ALSO PUBLISHED</span>
        <a href="https://www.npmjs.com/package/npm-git-helper" target="_blank" rel="noopener noreferrer" className="display link-u text-2xl" data-cursor="FOLLOW →">npm-git-helper ↗</a>
        <span className="mono text-mute">GIT WORKFLOW TOOLING · ON NPM</span>
      </Spec>
    </>
  );
}
