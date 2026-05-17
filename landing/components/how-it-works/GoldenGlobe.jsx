import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function GoldenGlobe({ size = 44, glow = false, pulse = false }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`lp-golden-globe relative shrink-0 rounded-full ${glow ? "lp-golden-globe--glow" : ""}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      animate={
        pulse && !reduced
          ? { scale: [1, 1.06, 1] }
          : {}
      }
      transition={{ duration: 2.4, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="lp-golden-globe__sphere absolute inset-0 rounded-full"
        animate={!reduced ? { rotate: [0, 6, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduced && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size * 0.36,
            height: size * 0.2,
            top: "16%",
            left: "20%",
            background: "linear-gradient(135deg, color-mix(in srgb, white 90%, transparent), transparent)",
          }}
        />
      )}
    </motion.div>
  );
}
