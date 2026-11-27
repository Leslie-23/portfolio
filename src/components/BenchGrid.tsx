"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { EXPERIMENTS, STATUS_TIPS, type ExpStatus, type Experiment } from "@/lib/data";
import { useShell } from "./state";
import { Spec, Tip } from "./Spec";
import ScrollVelocity from "./ScrollVelocity";
import DraggableSystem from "./DraggableSystem";
import ChessBoard from "./ChessBoard";
import ScanPlate from "./ScanPlate";

const TONE: Record<ExpStatus, string> = {
  TESTING: "bg-industrial text-ink", BROKEN: "bg-signal text-paper", WORKING: "bg-tech text-paper",
  ABANDONED: "bg-ink/15 text-ink", PROMISING: "bg-accent text-ink", EXPLORATORY: "border border-ink",
};
// preferred widths (of 12). Rows are packed so every row ends flush: the last card in a row takes what's left.
const WANT: Record<string, number> = { system: 7, board: 5, velocity: 6, lens: 7, disassemble: 6, link: 4 };
const COL = ["", "md:col-span-1", "md:col-span-2", "md:col-span-3", "md:col-span-4", "md:col-span-5", "md:col-span-6", "md:col-span-7", "md:col-span-8", "md:col-span-9", "md:col-span-10", "md:col-span-11", "md:col-span-12"];
function pack(list: Experiment[]): number[] {
  const out: number[] = [];
  let used = 0;
  list.forEach((e) => {
    const w = WANT[e.kind ?? "link"];
    if (used + w > 12 && out.length) { out[out.length - 1] += 12 - used; used = 0; }
    out.push(w); used += w;
  });
  if (out.length && used < 12) out[out.length - 1] += 12 - used;
  return out;
}

function Card({ e, span }: { e: Experiment; span: number }) {
  const { setBroken } = useShell();
  return (
    <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ layout: { type: "spring", stiffness: 380, damping: 36 } }}
      className={`col-span-6 ${COL[span]}`}>
      <Spec name="Experiment" id={`EXP_${e.id}`} className="h-full border border-ink border-t-4 border-t-accent bg-paper-2 p-4 md:p-5">
        <header className="mono flex items-center justify-between">
          <span>EXP. {e.id}</span>
          <span className="text-mute">{e.date}</span>
          <Tip tip={STATUS_TIPS[e.status]} align="right"><span className={`px-1.5 py-0.5 ${TONE[e.status]}`}>{e.status}</span></Tip>
        </header>
        <div className="mono mt-5 text-mute">QUESTION</div>
        <h2 className="display mt-1 text-[clamp(20px,2.2vw,32px)] !leading-[1]">{e.question}</h2>
        <div className="mono mt-4 text-mute">RESULT</div>
        <p className="mt-1 max-w-[52ch] text-graphite">{e.result}</p>
        <div className="mt-5">
          {e.kind === "velocity" && <ScrollVelocity />}
          {e.kind === "system" && <DraggableSystem />}
          {e.kind === "board" && <ChessBoard />}
          {e.kind === "lens" && <ScanPlate />}
          {e.kind === "disassemble" && <button className="btn mono" onClick={() => setBroken(true)} data-cursor="RUN">DISASSEMBLE SITE</button>}
          {e.kind === "link" && e.href && <Link href={e.href} className="btn mono" target="_blank" rel="noopener noreferrer" data-cursor="FOLLOW →">SOURCE ↗</Link>}
        </div>
      </Spec>
    </motion.article>
  );
}

export default function BenchGrid() {
  const [f, setF] = useState<ExpStatus | "ALL">("ALL");
  const statuses: (ExpStatus | "ALL")[] = ["ALL", "WORKING", "PROMISING", "TESTING", "ABANDONED", "EXPLORATORY"];
  const list = EXPERIMENTS.filter((e) => f === "ALL" || e.status === f);
  const spans = pack(list);
  return (
    <>
      <Spec name="IndexFilter" id="INDEX_FILTER" className="frame z-30 md:sticky md:top-14 border-y border-ink bg-paper py-3">
        <div className="mono flex flex-wrap gap-x-1 gap-y-2">
          <span className="mr-3 text-mute">STATUS FILTER</span>
          {statuses.map((s) => (
            <button key={s} onClick={() => setF(s)} aria-pressed={f === s} className={`px-2 py-0.5 transition-colors hover:text-accent-ink ${f === s ? "bg-accent text-ink hover:!text-ink" : ""}`}>[{s}]</button>
          ))}
        </div>
      </Spec>
      <LayoutGroup>
        <div className="frame grid12 gap-y-[var(--col-gap)] py-10">
          <AnimatePresence mode="popLayout" initial={false}>{list.map((e, i) => <Card key={e.id} e={e} span={spans[i]} />)}</AnimatePresence>
        </div>
      </LayoutGroup>
    </>
  );
}
