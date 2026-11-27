"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FILTERS, type Filter, type WorkItem } from "@/lib/work";
import WorkCard from "./WorkCard";

/** The one directory: every project, filterable by plain text controls. The filter lives in the URL. */
export default function WorkDirectory({ items }: { items: WorkItem[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("filter");
  const f: Filter | "All" = FILTERS.includes(q as Filter) ? (q as Filter) : "All";
  const list = f === "All" ? items : items.filter((w) => w.filters.includes(f));
  const set = (v: Filter | "All") => router.replace(v === "All" ? "/work" : `/work?filter=${encodeURIComponent(v)}`, { scroll: false });
  const count = (v: Filter | "All") => (v === "All" ? items.length : items.filter((w) => w.filters.includes(v)).length);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-line pb-4 text-[15px]">
        {(["All", ...FILTERS] as const).map((v) => (
          <button key={v} onClick={() => set(v)} aria-pressed={f === v}
            className={`relative pb-1 transition-colors ${f === v ? "text-ink" : "text-mute hover:text-ink"}`}>
            {v} <span className="label !text-[10px] text-mute">{count(v)}</span>
            {f === v && <i aria-hidden className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-accent" />}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} projects shown</p>
      <ul className="mt-8 grid gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => <li key={w.slug}><WorkCard w={w} /></li>)}
      </ul>
    </>
  );
}
