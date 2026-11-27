import Link from "next/link";
import { INTERESTS } from "@/lib/data";
import { Spec } from "./Spec";

/** What he's drawn to, and the work that proves it. */
export default function Interests({ className = "" }: { className?: string }) {
  return (
    <Spec name="Interests" id="INTERESTS" as="section" className={`frame ${className}`}>
      <div className="grid12 items-end gap-y-4 pb-8">
        <div className="col-span-6 md:col-span-7">
          <div className="mono text-mute"><span className="text-accent-ink">■</span> INTERESTS</div>
          <h2 className="display mt-3 text-[clamp(40px,5.6vw,92px)]">What I&apos;m drawn to.</h2>
        </div>
        <p className="col-span-6 max-w-[46ch] text-graphite md:col-span-5">Each one comes with the project where I&apos;ve actually worked on it.</p>
      </div>
      <ul className="grid border-l border-t border-ink md:grid-cols-2 xl:grid-cols-4">
        {INTERESTS.map((x, i) => (
          <li key={x.t} className="flex flex-col border-b border-r border-ink">
            <i aria-hidden className="block h-1 bg-accent" />
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="mono text-mute">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="display mt-3 text-[clamp(26px,2.4vw,36px)] !leading-[0.95]">{x.t}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-graphite">{x.b}</p>
              <Link href={x.proof.href} className="mono mt-5 flex items-center justify-between border-t border-hair pt-3 hover:text-accent-ink" data-cursor="OPEN →">
                <span className="text-mute">EVIDENCE</span><span>{x.proof.label} →</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Spec>
  );
}
