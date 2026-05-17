import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";

const ACCENT_STYLES = {
  teal: {
    icon: "border-luxury-accent/25 bg-luxury-accent/10 text-luxury-accent",
    hover: "hover:border-luxury-accent/35",
    glow: "bg-luxury-accent/10",
  },
  sun: {
    icon: "border-luxury-sun/30 bg-luxury-sun/12 text-luxury-sun",
    hover: "hover:border-luxury-sun/40",
    glow: "bg-luxury-sun/10",
  },
  coral: {
    icon: "border-luxury-coral/25 bg-luxury-coral/10 text-luxury-coral",
    hover: "hover:border-luxury-coral/35",
    glow: "bg-luxury-coral/10",
  },
};

export default function ActionModule({
  to,
  title,
  description,
  icon: Icon,
  accent = "teal",
  featured = false,
}) {
  const styles = ACCENT_STYLES[accent] ?? ACCENT_STYLES.teal;

  return (
    <Link
      to={to}
      className={cn(
        "action-module group relative flex flex-col justify-between overflow-hidden rounded-xl border border-luxury-border bg-luxury-surface transition-all duration-300 ease-luxury hover:-translate-y-1 hover:shadow-elevated",
        styles.hover,
        featured ? "min-h-[168px] p-6 lg:col-span-4" : "min-h-[120px] p-4 lg:col-span-6"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
          styles.glow
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex items-center justify-center rounded-lg border",
            featured ? "h-11 w-11" : "h-9 w-9",
            styles.icon
          )}
        >
          <Icon className={featured ? "h-5 w-5" : "h-[18px] w-[18px]"} strokeWidth={1.75} />
        </span>
        <ArrowUpRight className="h-4 w-4 text-luxury-caption transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-luxury-accent" />
      </div>
      <div className={cn("relative", featured ? "mt-6" : "mt-4")}>
        <h3
          className={cn(
            "font-semibold text-luxury-ink",
            featured ? "text-[16px]" : "text-[14px]"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-1 leading-relaxed text-luxury-body",
            featured ? "text-[13px]" : "text-[12px] line-clamp-2"
          )}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
