import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NOTES, getNote } from "@/lib/data";
import { Spec } from "@/components/Spec";

export function generateStaticParams() { return NOTES.map((n) => ({ slug: n.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = getNote((await params).slug);
  return n ? { title: n.title, description: n.summary } : {};
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={null}><Note params={params} /></Suspense>;
}

async function Note({ params }: { params: Promise<{ slug: string }> }) {
  const n = getNote((await params).slug);
  if (!n) notFound();
  return (
    <article className="frame grid12 gap-y-10 py-12 md:py-20">
      <header className="col-span-6 md:col-span-12">
        <Link href="/notes" className="mono link-u text-mute">← NOTES</Link>
        <div className="mono mt-8 text-mute">NOTE {n.n} · {n.date} · {n.minutes} MIN</div>
        <h1 className="display mt-3 max-w-[18ch] text-[clamp(36px,7vw,120px)]">{n.title}</h1>
      </header>
      <div className="col-span-6 md:col-span-7 md:col-start-1">
        {n.body.map((p, i) => <p key={i} className="mb-6 max-w-[62ch] text-[19px] leading-[1.7] text-graphite">{p}</p>)}
      </div>
      <Spec as="aside" name="MarginColumn" id="MARGIN" className="col-span-6 md:col-span-4 md:col-start-9" aria-label="Margin notes">
        <div className="space-y-6 md:sticky md:top-24">
          {n.margin.map((m) => (
            <div key={m.fig} className="border-l-2 border-accent pl-3">
              <div className="mono text-accent-ink">{m.fig}</div>
              <p className="mono mt-1 !normal-case !tracking-normal text-mute">{m.text}</p>
            </div>
          ))}
        </div>
      </Spec>
    </article>
  );
}
