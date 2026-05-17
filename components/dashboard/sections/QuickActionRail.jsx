import { Link } from "react-router-dom";
import { FileUp, Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "../../../lib/cn";

const ACTIONS = [
  { to: "/resume", icon: FileUp, label: "Upload resume" },
  { to: "/resume/tailor", icon: Sparkles, label: "Tailor resume" },
  { to: "/trust/offer-letter", icon: ShieldCheck, label: "Offer scan" },
];

export default function QuickActionRail() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-luxury-border bg-luxury-surface p-4 shadow-soft lg:p-5">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-luxury-caption">
        Quick actions
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {ACTIONS.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex min-w-[140px] flex-1 items-center gap-3 rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-3 text-[13px] font-medium text-luxury-ink transition-all duration-300 ease-luxury",
              "hover:border-luxury-accent/35 hover:bg-luxury-muted/60 hover:shadow-soft lg:min-w-0"
            )}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-luxury-accent/20 bg-luxury-accent/10 text-luxury-accent">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
