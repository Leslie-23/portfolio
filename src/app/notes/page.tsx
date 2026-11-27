import type { Metadata } from "next";
import Link from "next/link";
import Slide, { H } from "@/components/Slide";
import Dither, { type Shape } from "@/components/Dither";
import Ask from "@/components/Ask";
import { NOTES } from "@/lib/data";

export const metadata: Metadata = { title: "Writing", description: "Short notes on engineering decisions, drawn from the projects they came from." };
const COVERS: Shape[] = [{ kind: "sphere", cx: 0.3, cy: 0.75, r: 0.55 }, { kind: "rings", cx: 0.7, cy: 0.4 }, { kind: "fill", density: 0.55, fade: "up" }, { kind: "sphere", cx: 0.75, cy: 0.2, r: 0.5 }];

export default function Notes() {
  return (
    <>
      <Slide label="Writing">
        <div className="mt-7 grid gap-5 md:mt-10 md:gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <H as="h1" className="t-hero">Writing</H>
          <p className="t-lead">Short notes on decisions I made while building, and why. Each one comes from a real project.</p>
        </div>
        <ul className="mt-8 grid gap-x-6 gap-y-10 md:mt-12 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3">
          {NOTES.map((n, i) => (
            <li key={n.slug}>
              <Link href={`/notes/${n.slug}`} className="group block">
                <div className="frame-img aspect-[16/10] bg-[#eef3ef]"><div className="absolute inset-0"><Dither shape={COVERS[i % COVERS.length]} cell={5} /></div></div>
                <div className="label mt-4 flex justify-between text-mute"><span>{n.date}</span><span>{n.minutes} min read</span></div>
                <h2 className="t-card mt-3 group-hover:text-accent-ink">{n.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-mute">{n.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Slide>
      <Ask />
    </>
  );
}
