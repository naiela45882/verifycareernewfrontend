import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useMouseGlow() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    if (reduced || window.innerWidth < 1024) return;

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return { pos, enabled: !reduced && typeof window !== "undefined" && window.innerWidth >= 1024 };
}
