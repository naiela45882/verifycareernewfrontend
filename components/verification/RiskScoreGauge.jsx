import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { tierVariant } from "./constants";
import RiskBadge from "./RiskBadge";

export default function RiskScoreGauge({ score = 0, tier, label = "Risk score" }) {
  const clamped = Math.min(100, Math.max(0, score));
  const variant = tierVariant(tier);

  return (
    <article className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <motion.div
          className={cn(
            "text-4xl font-semibold tabular-nums tracking-tight",
            variant === "safe" && "text-luxury-accent",
            variant === "danger" && "text-luxury-coral",
            variant === "default" && "text-luxury-ink"
          )}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {clamped}
        </motion.div>
        {tier && <RiskBadge tier={tier} />}
      </header>

      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
        {label}
      </p>

      <motion.div
        className="mt-4 h-2 overflow-hidden rounded-full bg-luxury-border/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className={cn(
            "h-full rounded-full",
            variant === "safe" && "bg-luxury-accent",
            variant === "danger" && "bg-luxury-coral",
            variant === "default" && "bg-luxury-ink/40"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </motion.div>
    </article>
  );
}
