import { cn } from "../../lib/cn";

export default function ResumeStatsCard({
  label,
  value,
  sublabel,
  variant = "default",
}) {
  return (
    <article
      className={cn(
        "rounded-xl border p-4 shadow-soft",
        variant === "safe" && "border-luxury-accent/25 bg-luxury-surface",
        variant === "danger" && "border-luxury-coral/25 bg-luxury-surface",
        variant === "default" && "border-luxury-border bg-luxury-surface"
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-luxury-ink">
        {value}
      </p>
      {sublabel && (
        <p className="mt-1 text-[12px] text-luxury-body">{sublabel}</p>
      )}
    </article>
  );
}
