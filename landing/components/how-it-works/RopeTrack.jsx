import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function RopeTrack({
  height,
  energized = false,
  pulse = false,
  energyHeight,
  reduced: reducedProp,
}) {
  const reduced = reducedProp ?? useReducedMotion();

  return (
    <motion.div
      className={`lp-rope absolute left-1/2 -translate-x-1/2 top-0 w-[12px] ${pulse ? "lp-rope--pulse" : ""}`}
      style={{
        height,
        boxShadow: energized
          ? "0 0 24px var(--glow-sun), 0 0 12px var(--glow-teal)"
          : undefined,
      }}
      layout={false}
    >
      {!reduced && energyHeight && (
        <motion.div
          className="lp-rope-energy lp-rope-energy--flow top-0 left-1/2 -translate-x-1/2"
          style={{ height: energyHeight }}
        />
      )}
    </motion.div>
  );
}
