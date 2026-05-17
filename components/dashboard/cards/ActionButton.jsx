import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../../lib/cn";

export default function ActionButton({ to, label, description, icon: Icon }) {
  return (
    <Link
      to={to}
      className={cn(
        "va-action-btn group relative flex flex-col justify-between overflow-hidden rounded-xl border border-luxury-border/70 bg-luxury-surface/50 p-5 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-luxury-accent/30 hover:shadow-[0_12px_40px_var(--vc-ambient)]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--vc-teal) 6%, transparent), transparent 55%)",
        }}
      />
      <div className="relative flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-luxury-accent/20 bg-luxury-accent/8 text-luxury-accent">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <ArrowUpRight className="h-4 w-4 text-luxury-caption transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-luxury-accent" />
      </div>
      <div className="relative mt-4">
        <p className="text-[14px] font-semibold text-luxury-ink">{label}</p>
        {description && (
          <p className="mt-1 text-[12px] leading-relaxed text-luxury-caption">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
