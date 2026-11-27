import type { Metadata } from "next";
import ToolkitMap from "@/components/ToolkitMap";
import ToolkitMachine from "@/components/ToolkitMachine";
import { Spec } from "@/components/Spec";

export const metadata: Metadata = { title: "Toolkit" };

export default function Toolkit() {
  return (
    <>
      <Spec name="ToolkitHeader" id="TOOLKIT" as="header" className="frame grid12 py-16 md:py-24">
        <div className="mono col-span-6 text-mute md:col-span-12">ORGANISED BY PURPOSE, NOT BY LOGO</div>
        <h1 className="display col-span-6 mt-4 text-[clamp(44px,8.4vw,148px)] md:col-span-10">Engineering<br />toolkit.</h1>
        <p className="col-span-6 mt-6 max-w-[40ch] text-graphite md:col-span-4 md:col-start-9 md:self-end">
          No percentages. Instead, evidence: hover (or tap) a technology and trace it to the projects where I used it. For servers and networks, see <a href="/infra" className="link-u">the infrastructure page</a>.
        </p>
      </Spec>
      <section className="frame pb-24"><ToolkitMap /></section>
      <section className="frame border-t border-ink py-20 md:py-32">
        <div className="mono mb-6 text-mute">FIG. 010 / ASSEMBLY</div>
        <ToolkitMachine />
      </section>
    </>
  );
}
