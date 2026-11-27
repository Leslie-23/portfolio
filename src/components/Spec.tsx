import { createElement } from "react";

/** Wrap a region so SHOW INTERNALS can draw its bounding box, name and dimensions. */
export function Spec({
  name, id, as = "div", className = "", children, ...rest
}: {
  name: string; id?: string; as?: string; className?: string; children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return createElement(as, { "data-spec": name, "data-spec-id": id, className: `relative ${className}`, ...rest }, children);
}

/** Tiny label with a hidden second line. Reward curiosity. */
export function Tip({ tip, children, className = "", align = "left" }: { tip: string; children: React.ReactNode; className?: string; align?: "left" | "right" }) {
  return (
    <span tabIndex={0} className={`group/tip relative inline-block cursor-help outline-offset-2 ${className}`}>
      {children}
      <span role="tooltip" className={`mono mono-sm pointer-events-none absolute ${align === "right" ? "right-0" : "left-0"} top-full z-30 mt-1 w-max max-w-[min(220px,calc(100vw-2rem))] translate-y-1 border border-ink bg-paper px-2 py-1 normal-case tracking-normal text-ink opacity-0 transition group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus/tip:translate-y-0 group-focus/tip:opacity-100`}>
        {tip}
      </span>
    </span>
  );
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`mono text-mute ${className}`}>{children}</span>;
}
