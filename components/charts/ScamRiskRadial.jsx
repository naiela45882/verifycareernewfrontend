import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "../../lib/cn";
import { tierVariant } from "../verification/constants";
import RiskBadge from "../verification/RiskBadge";

const TRACK = [{ value: 100 }];

export default function ScamRiskRadial({ score = 0, tier, label = "Scam risk", className }) {
  const clamped = Math.min(100, Math.max(0, score));
  const variant = tierVariant(tier);
  const fill =
    variant === "safe"
      ? "var(--vc-teal)"
      : variant === "danger"
        ? "var(--vc-coral)"
        : "var(--vc-sun)";
  const data = [{ value: clamped }, { value: 100 - clamped }];

  return (
    <article
      className={cn(
        "rounded-xl border border-luxury-border bg-luxury-surface p-4 shadow-soft",
        className
      )}
    >
      <div className="relative mx-auto h-[200px] w-full max-w-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={TRACK}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={88}
              strokeWidth={0}
              isAnimationActive={false}
            >
              <Cell fill="var(--vc-border)" opacity={0.45} />
            </Pie>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={88}
              startAngle={90}
              endAngle={-270}
              strokeWidth={0}
              animationDuration={800}
            >
              <Cell fill={fill} />
              <Cell fill="transparent" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn(
              "text-4xl font-semibold tabular-nums tracking-tight",
              variant === "safe" && "text-luxury-accent",
              variant === "danger" && "text-luxury-coral",
              variant === "default" && "text-luxury-ink"
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {clamped}
          </motion.span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-luxury-caption">
            / 100
          </span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          {label}
        </p>
        {tier && <RiskBadge tier={tier} />}
      </div>
    </article>
  );
}
