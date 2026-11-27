"use client";
import { useEffect, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const first = useRef(true);
  useEffect(() => {
    // mechanical re-layout: the grid flashes as the next page snaps into place
    if (first.current) { first.current = false; return; }
    window.dispatchEvent(new Event("grid:flash"));
  }, []);
  return <div className="snap-in">{children}</div>;
}
