import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const R = 36;
const C = 2 * Math.PI * R;

export default function MetricRing({
  value,
  display,
  label,
  color = "var(--teal)",
  delay = 0,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const pct = Math.min(100, Math.max(0, value));
  const offset = C - (pct / 100) * C;
  const shown = display ?? `${value}%`;

  return (
    <motion.div ref={ref} className="flex flex-col items-center">
      <div className="relative w-[88px] h-[88px]">
        <svg className="lp-metric-ring w-full h-full" viewBox="0 0 88 88" aria-hidden>
          <circle className="lp-metric-ring-track" cx="44" cy="44" r={R} />
          <motion.circle
            className="lp-metric-ring-fill"
            cx="44"
            cy="44"
            r={R}
            stroke={color}
            fill="none"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: C }}
            transition={{
              duration: reduced ? 0.01 : 1.4,
              delay: reduced ? 0 : delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-sm sm:text-base font-semibold text-[var(--ink)] tabular-nums text-center px-1">
          {shown}
        </span>
      </div>
      <p className="lp-label mt-3 !text-[10px] text-center max-w-[120px]">{label}</p>
    </motion.div>
  );
}
