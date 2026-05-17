import { BadgeCheck, AlertTriangle, Clock } from "lucide-react";
import { cn } from "../../lib/cn";

const CONFIG = {
  approved: {
    label: "Verified",
    icon: BadgeCheck,
    className: "border-luxury-accent/30 bg-luxury-accent/10 text-luxury-accent",
  },
  pending: {
    label: "Pending review",
    icon: Clock,
    className: "border-luxury-border bg-luxury-muted/50 text-luxury-body",
  },
  flagged: {
    label: "Flagged",
    icon: AlertTriangle,
    className: "border-luxury-coral/30 bg-luxury-coral/10 text-luxury-coral",
  },
};

export default function VerifiedBadge({ status = "pending" }) {
  const cfg = CONFIG[status] || CONFIG.pending;
  const Icon = cfg.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        cfg.className
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      {cfg.label}
    </span>
  );
}
