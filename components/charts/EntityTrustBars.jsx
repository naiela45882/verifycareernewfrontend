import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { trustColor, trustRatingFromNode } from "../../lib/scamRisk";
import { ChartTooltipBox, CHART_TICK } from "./chartTheme";
import { TrustSectionLabel } from "../ui/TrustPanel";
import { cn } from "../../lib/cn";

function TooltipContent({ active, payload }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <ChartTooltipBox>
      <p className="font-medium capitalize text-luxury-ink">{row.type}</p>
      <p className="text-luxury-caption">{row.fullName}</p>
      <p className="mt-1 tabular-nums text-luxury-ink">Trust rating {row.score}/100</p>
    </ChartTooltipBox>
  );
}

export default function EntityTrustBars({ nodes = [], className }) {
  if (!nodes.length) return null;

  const data = nodes.slice(0, 6).map((n) => {
    const raw = n.displayName || n.canonicalKey || "Unknown";
    const score = trustRatingFromNode(n);
    return {
      name: raw.length > 24 ? `${raw.slice(0, 22)}…` : raw,
      fullName: raw,
      type: n.type,
      score,
      fill: trustColor(score),
    };
  });

  return (
    <div className={cn(className)}>
      <TrustSectionLabel className="mb-3">Entity trust ratings</TrustSectionLabel>
      <div className="h-[min(220px,40vw)] min-h-[150px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 0, right: 16, top: 4, bottom: 4 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={108}
              tick={CHART_TICK}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<TooltipContent />}
              cursor={{ fill: "var(--vc-ambient)" }}
            />
            <Bar dataKey="score" radius={[0, 6, 6, 0]} maxBarSize={20}>
              {data.map((entry) => (
                <Cell key={entry.fullName} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
