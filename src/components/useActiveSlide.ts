"use client";
import { useEffect, useState } from "react";

/** Which deck slide is crossing the middle of the viewport. */
export function useActiveSlide(enabled: boolean) {
  const [active, setActive] = useState<string>("cover");
  useEffect(() => {
    if (!enabled) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.slide!); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-slide]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}
