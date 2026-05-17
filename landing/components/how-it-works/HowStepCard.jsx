import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function HowStepCard({ step, index, label, active, isCurrent }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: "-48px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className={`rounded-xl border p-4 sm:p-5 ${
          isCurrent ? "lp-glass lp-glass--active" : "lp-glass"
        }`}
        animate={{
          opacity: active ? 1 : 0.55,
          y: isCurrent && !reduced ? 0 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          borderLeftWidth: 3,
          borderLeftColor: isCurrent ? "var(--teal)" : "var(--stone)",
        }}
      >
        <p
          className="lp-label mb-2"
          style={{ color: isCurrent ? "var(--teal)" : "var(--ink-soft)" }}
        >
          {label || `STEP ${index + 1} — ${step.tag}`}
        </p>
        <h3 className="font-display text-base sm:text-lg font-semibold text-[var(--ink)] mb-1 tracking-[0.02em]">
          {step.title}
        </h3>
        <p className="text-sm text-ink-soft leading-relaxed">{step.desc}</p>
      </motion.div>
    </motion.article>
  );
}
