import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "./chartTheme";

function bucketByDay(signals, days = 14) {
  const now = new Date();
  const buckets = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    buckets.push({
      date: key,
      label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      warnings: 0,
      reassurances: 0,
      total: 0,
    });
  }
  const map = Object.fromEntries(buckets.map((b) => [b.date, b]));
  for (const s of signals) {
    if (!s.createdAt) continue;
    const key = new Date(s.createdAt).toISOString().slice(0, 10);
    if (!map[key]) continue;
    map[key].total += 1;
    if (s.category === "risk") map[key].warnings += 1;
    else if (s.category === "trust") map[key].reassurances += 1;
  }
  return buckets;
}

export default function SignalActivityArea({ signals = [], className }) {
  const data = useMemo(() => bucketByDay(signals), [signals]);

  if (!signals.length) return null;

  return (
    <div className={className}>
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
        Activity (last 14 days)
      </p>
      <div className="h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="signalArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.safe} stopOpacity={0.35} />
                <stop offset="100%" stopColor={CHART_COLORS.safe} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "var(--luxury-caption)" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 10, fill: "var(--luxury-caption)" }}
              axisLine={false}
              tickLine={false}
              width={24}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid var(--luxury-border)",
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke={CHART_COLORS.safe}
              fill="url(#signalArea)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
