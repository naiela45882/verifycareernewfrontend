import { cn } from "../../lib/cn";

export default function StatCard({
  label,
  value,
  icon: Icon,
  variant = "default",
  trend,
}) {
  return (
    <article
      className={cn(
        "dashboard-stat-card group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ease-luxury hover:-translate-y-0.5",
        variant === "danger" &&
          "border-luxury-coral/25 bg-luxury-surface hover:border-luxury-coral/40 hover:shadow-[0_8px_24px_rgba(228,95,90,0.08)]",
        variant === "safe" &&
          "border-luxury-accent/25 bg-luxury-surface hover:border-luxury-accent/40 hover:shadow-[0_8px_24px_var(--vc-ambient)]",
        variant === "default" &&
          "border-luxury-border bg-luxury-surface hover:border-luxury-border hover:shadow-soft"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-luxury-ink">
            {value}
          </p>
          {trend && (
            <p className="mt-1 text-[11px] text-luxury-caption">{trend}</p>
          )}
        </div>
        {Icon && (
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
              variant === "danger" &&
                "border-luxury-coral/20 bg-luxury-coral/8 text-luxury-coral",
              variant === "safe" &&
                "border-luxury-accent/20 bg-luxury-accent/8 text-luxury-accent",
              variant === "default" &&
                "border-luxury-border bg-luxury-muted/60 text-luxury-body"
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
        )}
      </div>
    </article>
  );
}
