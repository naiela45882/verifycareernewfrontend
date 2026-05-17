import { AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "../../lib/cn";
import { TrustSectionLabel } from "../ui/TrustPanel";

export default function SignalBalanceStats({
  warningCount = 0,
  reassuranceCount = 0,
  className,
}) {
  const total = warningCount + reassuranceCount;
  if (total === 0) return null;

  const warnPct = Math.round((warningCount / total) * 100);
  const safePct = 100 - warnPct;

  return (
    <div className={cn(className)}>
      <TrustSectionLabel className="mb-3">Signal balance</TrustSectionLabel>
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={AlertTriangle}
          label="Warnings"
          count={warningCount}
          pct={warnPct}
          tone="warn"
        />
        <StatCard
          icon={ShieldCheck}
          label="Reassurances"
          count={reassuranceCount}
          pct={safePct}
          tone="safe"
        />
      </div>
      <div
        className="mt-3 flex h-2 overflow-hidden rounded-full bg-luxury-muted"
        role="img"
        aria-label={`${warningCount} warnings, ${reassuranceCount} reassurances`}
      >
        {warningCount > 0 && (
          <div
            className="h-full bg-luxury-coral transition-all"
            style={{ width: `${warnPct}%` }}
          />
        )}
        {reassuranceCount > 0 && (
          <div
            className="h-full bg-luxury-accent transition-all"
            style={{ width: `${safePct}%` }}
          />
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, count, pct, tone }) {
  const toneClass =
    tone === "warn"
      ? "border-luxury-coral/25 bg-luxury-coral/[0.06]"
      : "border-luxury-accent/25 bg-luxury-accent/[0.06]";
  const valueClass = tone === "warn" ? "text-luxury-coral" : "text-luxury-accent";
  const iconClass = tone === "warn" ? "text-luxury-coral" : "text-luxury-accent";

  return (
    <div className={cn("rounded-xl border p-4", toneClass)}>
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4 shrink-0", iconClass)} strokeWidth={1.75} />
        <span className="text-[11px] font-medium uppercase tracking-wide text-luxury-caption">
          {label}
        </span>
      </div>
      <p className={cn("mt-2 text-3xl font-semibold tabular-nums tracking-tight", valueClass)}>
        {count}
      </p>
      <p className="mt-0.5 text-[11px] text-luxury-caption">{pct}% of linked signals</p>
    </div>
  );
}
