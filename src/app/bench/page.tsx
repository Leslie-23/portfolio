import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { EXPERIMENTS } from "@/lib/data";
import BenchGrid from "@/components/BenchGrid";

export const metadata: Metadata = { title: "The Bench" };

export default function Bench() {
  return (
    <>
      <PageHeader
        id="THE_BENCH" fig="02" kicker="EXPERIMENTS & PROTOTYPES" sheet="SHEET 02 / 06"
        title={<>The<br />bench.</>}
        intro="Questions I'm working through in code. Not products: each one exists to answer something, and several run live on this page."
        meta={[
          { k: "EXPERIMENTS", v: String(EXPERIMENTS.length).padStart(2, "0") },
          { k: "RUNNING ON THIS PAGE", v: String(EXPERIMENTS.filter((e) => e.kind && e.kind !== "link").length).padStart(2, "0") },
          { k: "WORKING", v: String(EXPERIMENTS.filter((e) => e.status === "WORKING").length).padStart(2, "0") },
        ]}
      />
      <BenchGrid />
    </>
  );
}
