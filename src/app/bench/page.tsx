import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { EXPERIMENTS } from "@/lib/data";
import BenchGrid from "@/components/BenchGrid";

export const metadata: Metadata = { title: "The Bench" };

export default function Bench() {
  return (
    <>
      <PageHeader
        id="THE_BENCH" fig="02" kicker="STATUS / UNFINISHED BY DESIGN" sheet="SHEET 02 / 06"
        title={<>The<br />bench.</>}
        intro="Things I'm testing, breaking and figuring out. Some of them run right here on the page."
        meta={[
          { k: "EXPERIMENTS", v: String(EXPERIMENTS.length).padStart(2, "0") },
          { k: "RUNNING ON THIS PAGE", v: String(EXPERIMENTS.filter((e) => e.kind && e.kind !== "link").length).padStart(2, "0"), tip: "go on, touch them" },
          { k: "WORKING", v: String(EXPERIMENTS.filter((e) => e.status === "WORKING").length).padStart(2, "0"), tip: "for now." },
        ]}
      />
      <BenchGrid />
    </>
  );
}
