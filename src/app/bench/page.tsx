import type { Metadata } from "next";
import BenchGrid from "@/components/BenchGrid";
import { Spec, Tip } from "@/components/Spec";

export const metadata: Metadata = { title: "The Bench" };

export default function Bench() {
  return (
    <>
      <Spec name="BenchHeader" id="THE_BENCH" as="header" className="frame grid12 py-16 md:py-24">
        <div className="mono col-span-6 text-mute md:col-span-12"><Tip tip="finished things go to /work.">STATUS / UNFINISHED BY DESIGN</Tip></div>
        <h1 className="display col-span-6 mt-4 text-[clamp(52px,11vw,190px)] md:col-span-9">The<br />bench.</h1>
        <p className="col-span-6 mt-6 max-w-[34ch] text-xl leading-snug md:col-span-3 md:self-end">Things I'm testing, breaking and figuring out.</p>
      </Spec>
      <BenchGrid />
    </>
  );
}
