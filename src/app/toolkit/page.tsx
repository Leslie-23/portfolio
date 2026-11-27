import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { TOOLKIT } from "@/lib/data";
import ToolkitMap from "@/components/ToolkitMap";
import ToolkitMachine from "@/components/ToolkitMachine";

export const metadata: Metadata = { title: "Toolkit" };

export default function Toolkit() {
  return (
    <>
      <PageHeader
        id="TOOLKIT" fig="04" kicker="ORGANISED BY PURPOSE, NOT BY LOGO" sheet="SHEET 04 / 06"
        title={<>Engineering<br />toolkit.</>}
        intro="No percentages. Instead, evidence: hover (or tap) a technology and trace it to the projects where I used it."
        meta={[
          { k: "GROUPS", v: String(TOOLKIT.length).padStart(2, "0") },
          { k: "TOOLS", v: String(TOOLKIT.reduce((n, g) => n + g.items.length, 0)).padStart(2, "0") },
          { k: "ORGANISED BY", v: "PURPOSE" },
        ]}
      />
      <section className="frame pb-14"><ToolkitMap /></section>
      <section className="frame border-t border-ink py-12 md:py-20">
        <div className="mono mb-6 text-mute">FIG. 010 / ASSEMBLY</div>
        <ToolkitMachine />
      </section>
    </>
  );
}
