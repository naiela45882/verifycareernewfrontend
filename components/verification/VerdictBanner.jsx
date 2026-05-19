import { cn } from "../../lib/cn";
import { AlertTriangle, ShieldCheck, ShieldX } from "lucide-react";

const VERDICT_STYLES = {
  Legitimate: {
    icon: ShieldCheck,
    className:
      "border-luxury-accent/35 bg-luxury-accent/10 text-luxury-accent",
    subtitle: "This profile matches patterns of a real corporate recruiter.",
  },
  Fake: {
    icon: AlertTriangle,
    className: "border-luxury-sun/35 bg-luxury-sun/10 text-luxury-ink",
    subtitle: "Multiple red flags — treat as suspicious and verify independently.",
  },
  Scammer: {
    icon: ShieldX,
    className: "border-luxury-coral/40 bg-luxury-coral/12 text-luxury-coral",
    subtitle: "High-confidence scam signals — do not share personal data or pay fees.",
  },
};

export default function VerdictBanner({ verdict, className }) {
  if (!verdict) return null;

  const config = VERDICT_STYLES[verdict] || VERDICT_STYLES.Fake;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 sm:px-5 sm:py-4",
        config.className,
        className
      )}
      role="status"
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] opacity-80">
          Verdict
        </p>
        <p className="text-xl font-semibold tracking-tight">{verdict}</p>
        {config.subtitle && (
          <p className="mt-1 text-[13px] leading-relaxed opacity-90">{config.subtitle}</p>
        )}
      </div>
    </div>
  );
}
