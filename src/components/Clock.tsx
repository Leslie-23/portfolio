"use client";
import { useEffect, useState } from "react";

/** Local time in Accra (GMT, no daylight saving). Rendered client-side only to avoid a hydration mismatch. */
export default function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Accra", hour: "2-digit", minute: "2-digit" }).format(new Date()));
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || "--:--"} in Accra</span>;
}
