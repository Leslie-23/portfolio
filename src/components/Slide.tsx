import { SLIDES, pad, slideNo, type SlideId } from "@/lib/deck";

/** A deck slide: a rounded card with a mono label and, on the homepage, an "03 / 10" counter. */
export default function Slide({
  id, label, deck = false, dark = false, className = "", children,
}: { id?: string; label: string; deck?: boolean; dark?: boolean; className?: string; children: React.ReactNode }) {
  const n = deck && id ? slideNo(id as SlideId) : 0;
  return (
    <section id={id} data-slide={deck ? id : undefined} aria-label={label} className={`slide reveal ${dark ? "slide-dark" : ""} ${className}`}>
      <div className={`label flex items-center justify-between ${dark ? "text-white/55" : "text-mute"}`}>
        <span>{label}</span>
        {n > 0 && <span aria-hidden>{pad(n)} / {pad(SLIDES.length)}</span>}
      </div>
      {children}
    </section>
  );
}

/** Slide headline ending in an accent mark. Pass the text without its final full stop;
 *  a headline that ends in "?" keeps its question mark, coloured, instead of gaining a full stop. */
export function H({ children, as: Tag = "h2", className = "t-slide", id }: { children: React.ReactNode; as?: "h1" | "h2"; className?: string; id?: string }) {
  const q = typeof children === "string" && children.endsWith("?");
  return <Tag id={id} className={className}>{q ? (children as string).slice(0, -1) : children}<span className="dot">{q ? "?" : "."}</span></Tag>;
}
