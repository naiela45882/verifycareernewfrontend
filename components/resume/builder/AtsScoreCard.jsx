import { Loader2 } from "lucide-react";
import { builderCard } from "./builderTheme";

function scoreColor(score) {
  if (score == null) return "text-luxury-body";
  if (score >= 75) return "text-luxury-accent";
  if (score >= 50) return "text-luxury-sun";
  return "text-luxury-coral";
}

export default function AtsScoreCard({ score, report, scoring }) {
  const weaknesses = report?.weaknesses || report?.breakdown?.weaknesses || [];
  const suggestions = (report?.suggestions || []).slice(0, 3);
  const breakdown = report?.breakdown?.atsBreakdown || report?.breakdown || [];

  return (
    <div className={builderCard}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-luxury-ink">ATS score</h3>
        {scoring && <Loader2 className="h-4 w-4 animate-spin text-luxury-body" />}
      </div>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${scoreColor(score)}`}>
        {score != null ? score : "—"}
        {score != null && <span className="text-lg font-normal text-luxury-body">/100</span>}
      </p>
      <p className="mt-1 text-xs text-luxury-caption">
        {report?.mode === "gemini" ? "AI analysis" : "Instant rules-based check"}
      </p>
      {Array.isArray(breakdown) && breakdown.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-luxury-body">
          {breakdown.slice(0, 3).map((item, i) => (
            <li key={i}>• {typeof item === "string" ? item : item.message}</li>
          ))}
        </ul>
      )}
      {weaknesses.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-medium uppercase text-luxury-caption">Issues</p>
          <ul className="mt-1 space-y-1 text-xs text-luxury-body">
            {weaknesses.slice(0, 2).map((w, i) => (
              <li key={i}>• {w}</li>
            ))}
          </ul>
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-medium uppercase text-luxury-caption">Tips</p>
          <ul className="mt-1 space-y-1 text-xs text-luxury-body">
            {suggestions.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
