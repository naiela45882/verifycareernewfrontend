import { motion } from "framer-motion";
import GlassPanel from "../GlassPanel";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function PipelineStepCard({
  step,
  index,
  unlocked,
  justUnlocked,
  label,
  compact = false,
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative shrink-0"
      initial={false}
      animate={{
        opacity: unlocked ? 1 : 0.38,
        y: unlocked && !reduced ? 0 : 2,
      }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {justUnlocked && !reduced && (
        <>
          <span className="lp-spark" style={{ top: "12%", right: "8%" }} />
          <span className="lp-spark" style={{ top: "40%", right: "14%", animationDelay: "0.15s" }} />
          <span className="lp-spark" style={{ top: "70%", right: "6%", animationDelay: "0.28s" }} />
        </>
      )}

      <GlassPanel
        className={`${compact ? "p-3.5 sm:p-4" : "p-6 sm:p-7"} rounded-xl transition-all duration-600 ${
          unlocked ? "lp-glass--unlocked" : ""
        }`}
      >
        <p className={`lp-label mb-1.5 text-[var(--teal)] ${compact ? "!text-[9px]" : ""}`}>
          {label || `STEP ${index + 1} — ${step.tag}`}
        </p>

        {unlocked && (
          <motion.div
            className={`space-y-1 ${compact ? "mb-2" : "mb-4"}`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {[0, 1, 2].map((line) => (
              <motion.div
                key={line}
                className="lp-circuit-line rounded-full"
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + line * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ width: `${55 + line * 18}%` }}
              />
            ))}
          </motion.div>
        )}

        <h3
          className={`font-display font-semibold text-[var(--ink)] mb-1 tracking-[0.02em] ${
            compact ? "text-base leading-snug" : "text-xl sm:text-2xl mb-2"
          }`}
        >
          {step.title}
        </h3>
        <p className={`text-[var(--ink-soft)] leading-relaxed ${compact ? "text-xs line-clamp-2" : "text-sm"}`}>
          {step.desc}
        </p>
      </GlassPanel>
    </motion.div>
  );
}
