import { cn } from "../../lib/cn";
import { TrustSectionLabel } from "../ui/TrustPanel";

export default function RedFlagsBreakdown({ flags = [], className, hideLabel }) {
  if (!flags?.length) return null;

  return (
    <div className={cn(className)}>
      {!hideLabel && (
        <TrustSectionLabel className="mb-4">Issues detected</TrustSectionLabel>
      )}
      <ul className="space-y-3">
        {flags.slice(0, 6).map((flag, i) => (
          <li key={`${flag}-${i}`}>
            <div className="mb-1.5 flex items-start justify-between gap-2">
              <span className="text-[12px] leading-snug text-luxury-body">{flag}</span>
              <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-luxury-coral">
                Flag
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-luxury-muted" role="presentation">
              <div
                className="h-full rounded-full bg-luxury-coral/80 transition-all"
                style={{ width: `${Math.max(28, 100 - i * 12)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
