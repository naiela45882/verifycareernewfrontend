import { FileText, Sparkles } from "lucide-react";

export default function PrimaryResumeCard({ text, updatedAt, lastAtsScore }) {
  const preview = text?.slice(0, 280) + (text?.length > 280 ? "…" : "");
  const dateLabel = updatedAt
    ? new Date(updatedAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <article className="rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-luxury-accent/20 bg-luxury-accent/8 text-luxury-accent">
          <FileText className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-luxury-ink">Primary resume</h3>
          <p className="mt-0.5 text-[12px] text-luxury-caption">
            Last updated {dateLabel}
            {lastAtsScore != null && (
              <span className="ml-2 inline-flex items-center gap-1 text-luxury-accent">
                <Sparkles className="h-3 w-3" />
                ATS {lastAtsScore}
              </span>
            )}
          </p>
        </div>
      </div>
      <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg border border-luxury-border bg-luxury-muted/20 p-4 font-mono text-[12px] leading-relaxed text-luxury-body">
        {preview}
      </pre>
      <p className="mt-2 text-[11px] text-luxury-caption">
        {text?.split(/\s+/).filter(Boolean).length || 0} words
      </p>
    </article>
  );
}
