import { cn } from "../../../lib/cn";

export default function MetricCard({
  label,
  value,
  hint,
  icon: Icon,
  className,
}) {
  return (
    <article
      className={cn(
        "va-metric-card group relative overflow-hidden rounded-xl border border-luxury-border/70 bg-luxury-surface/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-luxury-accent/25 hover:shadow-[0_8px_32px_var(--vc-ambient)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--vc-teal) 8%, transparent), transparent)",
        }}
      />
      <div className="relative">
        <HeaderRow Icon={Icon} label={label} />
        <p className="mt-2 text-xl font-semibold tabular-nums tracking-tight text-luxury-ink">
          {value ?? "—"}
        </p>
        {hint && (
          <p className="mt-2 max-h-0 overflow-hidden text-[11px] leading-relaxed text-luxury-caption opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
            {hint}
          </p>
        )}
      </div>
    </article>
  );
}

function HeaderRow({ Icon, label }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-luxury-caption">
        {label}
      </p>
      {Icon && (
        <Icon className="h-4 w-4 shrink-0 text-luxury-caption opacity-60 transition-colors group-hover:text-luxury-accent" />
      )}
    </div>
  );
}
