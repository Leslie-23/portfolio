import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkIndex from "@/components/WorkIndex";
import { Spec } from "@/components/Spec";
import { CATEGORIES, PROJECTS, SHIPPED } from "@/lib/data";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
  return (
    <>
      <PageHeader
        id="CATALOGUE" fig="01" kicker="CATALOGUE" sheet="SHEET 01 / 06"
        title={<>Things<br />I&apos;ve built.</>}
        intro="Hover (or tap) a plate to take it apart. Click to go inside. Below the case studies: everything else that shipped, with live links."
        meta={[
          { k: "CASE STUDIES", v: String(PROJECTS.length).padStart(2, "0") },
          { k: "SHIPPED + LIVE", v: String(SHIPPED.length).padStart(2, "0") },
          { k: "CATEGORIES", v: String(CATEGORIES.length).padStart(2, "0") },
        ]}
      />
      <WorkIndex />
      <Spec name="Packages" id="PUBLISHED" as="section" className="frame mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink py-6">
        <span className="mono text-mute">ALSO PUBLISHED</span>
        <a href="https://www.npmjs.com/package/npm-git-helper" target="_blank" rel="noopener noreferrer" className="display link-u text-2xl" data-cursor="FOLLOW →">npm-git-helper ↗</a>
        <span className="mono text-mute">GIT WORKFLOW TOOLING · ON NPM</span>
      </Spec>
    </>
  );
}
