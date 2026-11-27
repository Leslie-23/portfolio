import Link from "next/link";
import Slide, { H } from "@/components/Slide";
import Dither from "@/components/Dither";

export default function NotFound() {
  return (
    <Slide label="404" className="min-h-[calc(100svh-24px)] overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[55%] w-[50%]" aria-hidden><Dither shape={{ kind: "sphere", cx: 0.8, cy: 1.05, r: 0.9 }} cell={4} /></div>
      <div className="relative">
        <H as="h1" className="t-hero mt-16 max-w-[10ch]">This page doesn&apos;t exist</H>
        <p className="t-lead mt-6 max-w-[44ch]">The link may be old: this site was reorganised into Work, About and Writing.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-solid">Back to the start</Link>
          <Link href="/work" className="btn">See the work</Link>
        </div>
      </div>
    </Slide>
  );
}
