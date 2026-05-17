import { useMouseGlow } from "../hooks/useMouseGlow";

export default function ScanCursor() {
  const { pos, enabled } = useMouseGlow();

  if (!enabled) return null;

  return (
    <div
      className="lp-cursor-halo hidden lg:block"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    />
  );
}
