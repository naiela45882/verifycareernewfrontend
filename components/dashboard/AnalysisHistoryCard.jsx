import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/cn";

function riskTone(score) {
  if (score >= 70) return "danger";
  if (score >= 40) return "warn";
  return "safe";
}

export default function AnalysisHistoryCard({ item }) {
  const score = item.response?.scamScore ?? 0;
  const tone = riskTone(score);

  return (
    <article className="group rounded-xl border border-luxury-border bg-luxury-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-[14px] font-semibold text-luxury-ink">Scam Risk</h3>
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-[12px] font-semibold tabular-nums text-luxury-on-accent",
            tone === "danger" && "bg-luxury-coral",
            tone === "warn" && "bg-luxury-sun text-luxury-ink",
            tone === "safe" && "bg-luxury-accent"
          )}
        >
          {score}%
        </span>
      </header>

      <p className="rounded-lg border border-luxury-border/80 bg-luxury-muted/40 px-3 py-3 text-[13px] leading-relaxed text-luxury-ink">
        {item.response?.summary || "No summary available"}
      </p>

      {item.response?.redFlags?.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-luxury-coral">
            <AlertCircle className="h-3.5 w-3.5" />
            Red flags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.response.redFlags.map((flag, index) => (
              <span
                key={index}
                className="rounded-md border border-luxury-coral/25 bg-luxury-coral/8 px-2 py-1 text-[11px] text-luxury-coral"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      <footer className="mt-4 border-t border-luxury-border/80 pt-3 text-[11px] text-luxury-caption">
        {new Date(item.createdAt).toLocaleString()}
        {item.mode === "ai" && (
          <span className="ml-2 rounded border border-luxury-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
            AI
          </span>
        )}
      </footer>
    </article>
  );
}
