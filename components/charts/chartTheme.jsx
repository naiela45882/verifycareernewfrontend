export const CHART_COLORS = {
  risk: "var(--vc-coral)",
  safe: "var(--vc-teal)",
  medium: "var(--vc-sun)",
  muted: "var(--vc-caption)",
  track: "var(--vc-border)",
  warn: "var(--vc-coral)",
  reassure: "var(--vc-teal)",
};

export const CHART_TICK = {
  fontSize: 11,
  fill: "var(--vc-caption)",
};

export const CHART_GRID = {
  stroke: "var(--vc-border)",
  strokeOpacity: 0.45,
};

export function ChartTooltipBox({ children }) {
  return (
    <div className="rounded-lg border border-luxury-border bg-luxury-surface px-3 py-2 text-[12px] shadow-elevated">
      {children}
    </div>
  );
}
