import { cn } from "../../lib/cn";
import { RISK_TIER_LABELS, tierVariant } from "./constants";

export default function RiskBadge({ tier, score, className }) {
  const label = RISK_TIER_LABELS[tier] || tier || "Unknown";
  const variant = tierVariant(tier);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        variant === "safe" &&
          "border-luxury-accent/30 bg-luxury-accent/10 text-luxury-accent",
        variant === "danger" &&
          "border-luxury-coral/30 bg-luxury-coral/10 text-luxury-coral",
        variant === "default" &&
          "border-luxury-border bg-luxury-muted/50 text-luxury-body",
        className
      )}
    >
      {label}
      {score != null && (
        <span className="tabular-nums text-luxury-caption">· {score}</span>
      )}
    </span>
  );
}
