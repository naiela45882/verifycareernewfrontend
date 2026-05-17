import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "../../lib/cn";
import { trustColor } from "../../lib/scamRisk";

const TRACK = [{ value: 100 }];

export default function TrustRatingRadial({ score = 0, label = "Trust rating", className }) {
  const clamped = Math.min(100, Math.max(0, score));
  const fill = trustColor(clamped);
  const data = [{ value: clamped }, { value: 100 - clamped }];

  return (
    <article
      className={cn(
        "rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft",
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
              <Cell fill="var(--luxury-border)" opacity={0.5} />
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
        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-4xl font-semibold tabular-nums tracking-tight text-luxury-ink">
            {clamped}
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-luxury-caption">
            / 100
          </span>
        </motion.div>
      </div>
      <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
        {label}
      </p>
    </article>
  );
}
