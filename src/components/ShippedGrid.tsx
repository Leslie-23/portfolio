"use client";
import Image from "next/image";
import { motion } from "motion/react";
import type { Shipped } from "@/lib/data";
import { liveFor } from "@/lib/data";
import { Spec } from "./Spec";

export default function ShippedGrid({ list }: { list: Shipped[] }) {
  return (
    <ul className="frame grid12 gap-y-[var(--col-gap)] pb-6">
      {list.map((s, i) => {
        const href = liveFor(s.slug, s.live)!;
        return (
          <motion.li layout key={s.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ layout: { type: "spring", stiffness: 380, damping: 36 }, duration: 0.2 }}
            className={`col-span-6 ${i % 5 === 0 ? "md:col-span-6" : "md:col-span-3"}`}>
            <Spec name="ShippedCard" id={s.slug.toUpperCase().replace(/-/g, "_")} className="group border border-hair bg-paper-2 transition-colors hover:border-ink">
              <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="VISIT ↗" data-cursor-dim className="relative block aspect-[16/10] overflow-hidden border-b border-hair bg-paper-3">
                <Image src={`/work/${s.slug}/desktop.jpg`} alt={`${s.name} home page`} fill sizes="(min-width:900px) 40vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                <Image src={`/work/${s.slug}/mobile.jpg`} alt={`${s.name} on a phone`} width={390} height={844}
                  className="absolute -bottom-6 right-4 w-[17%] border border-ink bg-paper shadow-none transition-transform duration-300 group-hover:-translate-y-3" />
                <span className="mono absolute left-2 top-2 bg-paper px-1.5">{s.kind}</span>
              </a>
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="display text-[clamp(20px,2vw,30px)] !leading-[0.98]">{s.name}</h3>
                  <span className="mono text-mute">{s.year}</span>
                </div>
                <p className="mt-2 text-sm text-graphite">{s.blurb}</p>
                {s.stack && <p className="mono mono-sm mt-2 text-mute">{s.stack.join(" · ")}</p>}
                <div className="mono mt-3 flex gap-4">
                  <a className="link-u" href={href} target="_blank" rel="noopener noreferrer">LIVE ↗</a>
                  {s.repo && <a className="link-u" href={s.repo} target="_blank" rel="noopener noreferrer">SOURCE ↗</a>}
                </div>
              </div>
            </Spec>
          </motion.li>
        );
      })}
    </ul>
  );
}
