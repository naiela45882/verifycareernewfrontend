import { motion } from "framer-motion";
import { useNeedleScroll } from "../context/NeedleScrollContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CompassNeedle({ size = 32, className = "" }) {
  const { needleRotation, snapping } = useNeedleScroll();
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`compass-needle ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" fill="none" className="compass-needle__ring">
        <circle cx="20" cy="20" r="18" stroke="var(--stone)" strokeWidth="1" />
        <circle cx="20" cy="20" r="2" fill="var(--teal)" />
      </svg>
      <motion.div
        className="compass-needle__shaft"
        animate={{ rotate: needleRotation }}
        transition={
          reduced
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: snapping ? 420 : 260,
                damping: snapping ? 28 : 22,
                mass: 0.45,
              }
        }
      >
        <span className="compass-needle__tip" />
        <span className="compass-needle__tail" />
      </motion.div>
    </motion.div>
  );
}
