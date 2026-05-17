import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  high: "var(--vc-coral)",
  safe: "var(--vc-teal)",
  medium: "var(--vc-sun)",
};

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="rounded-lg border border-luxury-border bg-luxury-surface px-3 py-2 text-[12px] shadow-soft">
      <p className="font-medium text-luxury-ink">{name}</p>
      <p className="text-luxury-caption">{value} scans</p>
    </div>
  );
}

export default function RiskDistributionChart({ highRisk, safeOffers, mediumRisk }) {
  const data = [
    { name: "High Risk", value: highRisk, key: "high" },
    { name: "Safe Offers", value: safeOffers, key: "safe" },
    { name: "Medium Risk", value: mediumRisk, key: "medium" },
  ].filter((d) => d.value > 0);

  const total = highRisk + safeOffers + mediumRisk;
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "No data", value: 1, key: "medium" },
        ];

  return (
    <section className="dashboard-panel flex h-full flex-col rounded-xl border border-luxury-border bg-luxury-surface">
      <header className="flex items-center justify-between border-b border-luxury-border/80 px-5 py-4">
        <div>
          <h2 className="text-[15px] font-semibold text-luxury-ink">
            Risk Distribution
          </h2>
          <p className="mt-0.5 text-[12px] text-luxury-caption">
            Breakdown across all analyzed offers
          </p>
        </div>
        <span className="rounded-md border border-luxury-border bg-luxury-muted/50 px-2.5 py-1 text-[11px] font-medium text-luxury-body">
          {total} total
        </span>
      </header>
      <div className="flex flex-1 flex-col px-4 py-2 sm:px-5">
        <div className="h-[min(340px,42vh)] min-h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={72}
                outerRadius={108}
                paddingAngle={2}
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={COLORS[entry.key] || "var(--vc-caption)"}
                    opacity={total === 0 ? 0.35 : 1}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
