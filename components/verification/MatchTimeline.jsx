import RiskBadge from "./RiskBadge";
import { SCAN_TYPE_LABELS } from "./constants";

export default function MatchTimeline({ matches = [] }) {
  if (!matches.length) return null;

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <h3 className="mb-4 text-[15px] font-semibold text-luxury-ink">Match timeline</h3>
      <ol className="relative space-y-6 border-l border-luxury-border pl-6">
        {matches.map((item, index) => (
          <li key={`${item.scanId}-${index}`} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-luxury-accent bg-luxury-surface" />
            <p className="text-[13px] font-medium text-luxury-ink">
              {SCAN_TYPE_LABELS[item.type] || item.type} · {item.matchedOn}
            </p>
            <p className="mt-1 text-[12px] text-luxury-caption">
              {item.createdAt
                ? new Date(item.createdAt).toLocaleString()
                : "Unknown date"}
            </p>
            <div className="mt-2">
              <RiskBadge tier={item.riskTier} score={item.riskScore} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
