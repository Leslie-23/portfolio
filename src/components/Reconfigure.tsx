"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap, reducedMotion } from "@/lib/gsap";
import { useShell } from "./state";

/** Page transitions as re-layout. Click an internal link: the current page's blocks detach from the grid,
 *  the grid and registration marks come up, then the next route mounts and its blocks lock in (see template.tsx).
 *  Pure presentation: navigation itself is a normal router.push, and modified clicks are left alone. */
export default function Reconfigure() {
  const router = useRouter();
  const { broken } = useShell();

  useEffect(() => {
    let busy = false;
    const click = (e: MouseEvent) => {
      if (busy || broken || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
      if (reducedMotion()) return;
      e.preventDefault();
      busy = true;
      const href = url.pathname + url.search + url.hash;
      window.dispatchEvent(new CustomEvent("grid:hold", { detail: url.pathname }));
      const blocks = Array.from(document.querySelectorAll<HTMLElement>("main [data-page] > *")).filter((el) => {
        const b = el.getBoundingClientRect();
        return b.bottom > 0 && b.top < innerHeight; // only what you can see; the rest just goes
      });
      gsap.to(blocks, {
        x: (i) => (i % 2 ? 1 : -1) * gsap.utils.random(30, 90),
        y: () => gsap.utils.random(-30, 20),
        opacity: 0,
        duration: 0.32,
        ease: "power3.in",
        stagger: { each: 0.03, from: "random" },
        onComplete: () => { router.push(href); busy = false; },
      });
      // safety: never strand the visitor if the tween is killed
      setTimeout(() => { if (busy) { busy = false; router.push(href); } }, 900);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [router, broken]);

  return null;
}
