import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/lib/work";
import Dither from "./Dither";

/** Ownership, stated plainly from the role field. Never upgraded. */
export function ownership(role: string) {
  if (/founder/i.test(role)) return "Founded";
  if (/cto/i.test(role)) return "CTO";
  if (/architect/i.test(role)) return "Architect";
  if (/team/i.test(role)) return "Team project";
  if (/author/i.test(role)) return "Built";
  return "Built";
}

export function Cover({ w, big = false, sizes }: { w: WorkItem; big?: boolean; sizes: string }) {
  if (w.phones)
    return (
      <div className={`frame-img flex items-center justify-center gap-[3%] bg-[#e5ebe7] px-[8%] ${big ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
        {w.phones.map((src, i) => (
          <div key={src} className="relative h-[84%] overflow-hidden rounded-[12%/6%] border-[3px] border-ink bg-ink" style={{ aspectRatio: "1179 / 2556", transform: `translateY(${i === 1 ? "-3%" : "3%"})` }}>
            <Image src={src} alt="" fill sizes="12vw" className="object-cover object-top" />
          </div>
        ))}
      </div>
    );
  if (w.image)
    return (
      <div className="frame-img aspect-[16/10]">
        <Image src={w.image} alt={`${w.name}: a screen from the real product`} fill sizes={sizes} className="object-cover object-top" />
      </div>
    );
  return (
    <div className="frame-img relative aspect-[16/10] bg-[#eef3ef]">
      <div className="absolute inset-0"><Dither shape={{ kind: "rings", cx: 0.78, cy: 0.3 }} cell={5} /></div>
      <span className="absolute bottom-4 left-4 text-[clamp(22px,2.4vw,34px)] font-medium tracking-[-0.04em]">{w.name}</span>
    </div>
  );
}

/** `row`: on phones the card becomes a compact list row (thumbnail left, text right) so a long directory stays scannable. */
export default function WorkCard({ w, big = false, row = false, sizes = "(min-width: 1024px) 30vw, 90vw" }: { w: WorkItem; big?: boolean; row?: boolean; sizes?: string }) {
  return (
    <Link href={`/work/${w.slug}`} className={`group panel flex h-full flex-col p-2 transition-colors hover:bg-[#ececea] ${row ? "max-md:flex-row max-md:items-center max-md:gap-1" : ""}`}>
      <div className={row ? "max-md:w-[42%] max-md:shrink-0" : ""}><Cover w={w} big={big} sizes={sizes} /></div>
      <div className={`flex min-w-0 flex-1 flex-col ${big ? "p-3 pb-4 md:p-6" : "p-3 pb-4 md:p-4"} ${row ? "max-md:py-1 max-md:pb-1 max-md:pr-1" : ""}`}>
        <div className={`label flex items-center justify-between gap-3 text-mute ${row ? "max-md:!text-[10px]" : ""}`}>
          <span className="flex items-center gap-2"><i className="h-[7px] w-[7px] rounded-full bg-accent" aria-hidden />{ownership(w.role)}</span>
          <span>{w.year}</span>
        </div>
        <h3 className={`${big ? "t-big" : "t-card"} mt-2 ${row ? "max-md:mt-1 max-md:!text-[19px] max-md:leading-tight" : ""}`}>{w.name}</h3>
        <p className={`mt-1 text-[15px] text-mute ${row ? "max-md:mt-0.5 max-md:text-[13px] max-md:leading-snug" : ""}`}>{w.category}</p>
        {big && <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-body">{w.blurb}</p>}
        <span className="mt-auto hidden pt-3 text-[14px] font-medium opacity-0 md:block transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{w.tier === "case" ? "Read the case study →" : "View details →"}</span>
      </div>
    </Link>
  );
}
