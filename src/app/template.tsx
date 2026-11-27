"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

// template.tsx remounts on every navigation, so "first load" has to live outside the component
let booted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    // the intro owns the first load. Flip the flag a frame later so StrictMode's double effect run doesn't count as a navigation
    if (!booted) { requestAnimationFrame(() => { booted = true; }); return; }
    window.dispatchEvent(new Event("grid:flash"));
    if (reducedMotion()) return;
    // the next page's blocks arrive from offset positions and lock into the grid
    const blocks = Array.from(root.current!.children) as HTMLElement[];
    const tw = gsap.fromTo(
      blocks,
      { x: (i) => (i % 2 ? 40 : -40), y: 18, opacity: 0, clipPath: "inset(0 0 100% 0)" },
      { x: 0, y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.45, ease: "back.out(1.3)", stagger: 0.06, clearProps: "transform,opacity,clipPath",
        // pins were measured while blocks were still offset: measure again once everything has locked in
        onComplete: () => ScrollTrigger.refresh() },
    );
    return () => { tw.kill(); };
  }, []);
  return <div ref={root} data-page>{children}</div>;
}
