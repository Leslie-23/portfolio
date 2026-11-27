"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds `.in` to `.reveal` blocks as they enter the viewport. Without JS they're simply visible. */
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    const vh = innerHeight;
    els.forEach((el) => { if (el.getBoundingClientRect().top < vh) el.classList.add("in"); });
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
    return () => io.disconnect();
  }, [path]);
  return null;
}
