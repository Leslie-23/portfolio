import Image from "next/image";
import { AFFILIATIONS } from "@/lib/data";
import { Spec, Tip } from "./Spec";

/** Where Leslie works and who he builds for. Logos and names only: nothing about private work. */
export default function Affiliations({ className = "" }: { className?: string }) {
  const [home, ...rest] = AFFILIATIONS;
  return (
    <Spec name="Affiliations" id="WHERE_I_BUILD" as="section" className={`frame grid12 gap-y-8 ${className}`}>
      <div className="col-span-6 md:col-span-12">
        <div className="mono text-mute">FIG. 040 / AFFILIATIONS</div>
        <h2 className="display mt-3 text-[clamp(32px,5vw,84px)]">Where I build.</h2>
      </div>

      <article className="col-span-6 border border-ink bg-paper-3 p-5 md:col-span-6 md:p-8">
        <div className="mono flex justify-between"><span className="text-accent-ink">{home.role}</span><span className="text-mute">01</span></div>
        <div className="mt-6 flex items-center gap-5">
          <Image src={home.img} alt="" width={home.w} height={home.h} className="h-16 w-auto md:h-20" />
          <h3 className="display text-[clamp(28px,3.4vw,52px)]">{home.name}</h3>
        </div>
        {home.note && <p className="mt-5 max-w-[48ch] text-graphite">{home.note}</p>}
        {home.href && (
          <a href={home.href} target="_blank" rel="noopener noreferrer" className="mono link-u mt-5 inline-block" data-cursor="FOLLOW →">
            {home.href.replace("https://", "").toUpperCase()} ↗
          </a>
        )}
      </article>

      <ul className="col-span-6 grid grid-cols-2 gap-[var(--col-gap)] md:col-span-6">
        {rest.map((a, i) => (
          <li key={a.id} className="flex flex-col border border-hair bg-paper-2 p-4 transition-colors hover:border-ink">
            <div className="mono flex justify-between text-mute"><span>{a.role}</span><span>{String(i + 2).padStart(2, "0")}</span></div>
            <div className="grid flex-1 place-items-center py-6">
              <Image src={a.img} alt={`${a.name} logo`} width={a.w} height={a.h}
                className={a.w === a.h ? "h-20 w-20 rounded-[22%]" : "h-auto max-h-24 w-full max-w-[190px] object-contain"} />
            </div>
            <div className="display text-[clamp(18px,1.8vw,26px)] !leading-[0.98]">
              <Tip tip="I work on this.">{a.name}</Tip>
            </div>
            {a.note && <p className="mono mono-sm mt-2 normal-case text-accent-ink">{a.note}</p>}
          </li>
        ))}
      </ul>
    </Spec>
  );
}
