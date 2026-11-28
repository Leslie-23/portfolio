"use client";
import { useEffect, useState } from "react";

/** One pill that swaps between a few lines now and then. The width is held by the longest line, so nothing around it jumps.
 *  With reduced motion, or before the page is interactive, it simply shows the first line. Screen readers get every line. */
export default function HeroPill({ lines, every = 4500 }: { lines: string[]; every?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!document.hidden) setI((n) => (n + 1) % lines.length); }, every);
    return () => clearInterval(t);
  }, [lines.length, every]);
  return (
    <p className="pill label relative text-ink">
      <span className="sr-only">{lines.join(". ")}</span>
      <span aria-hidden className="relative grid">
        {lines.map((l, k) => (
          <span key={l} className="col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-500 ease-out" style={{ opacity: k === i ? 1 : 0, transform: k === i ? "none" : "translateY(-5px)" }}>{l}</span>
        ))}
      </span>
    </p>
  );
}
