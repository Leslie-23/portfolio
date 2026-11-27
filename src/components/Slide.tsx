/** A page section: full width, a quiet mono label, no card and no counter. */
export default function Slide({
  id, label, dark = false, className = "", children,
}: { id?: string; label: string; deck?: boolean; dark?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={label} className={`slide reveal ${dark ? "slide-dark" : ""} ${className}`}>
      <div className={`label ${dark ? "text-white/55" : "text-mute"}`}>{label}</div>
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
