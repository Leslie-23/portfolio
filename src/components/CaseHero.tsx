"use client";
import { motion } from "motion/react";
import type { Project } from "@/lib/data";
import Exploded from "./Exploded";

/** ENTER: the plate the visitor just clicked on arrives assembled, then settles. */
export default function CaseHero({ project }: { project: Project }) {
  return (
    <motion.div initial={{ scale: 0.94, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 28 }} className="border border-ink bg-paper-3 p-3 md:p-6" data-cursor-dim>
      <Exploded project={project} exploded={false} labels={false} ratio="aspect-[16/8]" />
    </motion.div>
  );
}
