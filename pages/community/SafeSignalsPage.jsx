import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useSignalsFeed } from "../../hooks/useTrust";
import { cn } from "../../lib/cn";
import SignalActivityArea from "../../components/charts/SignalActivityArea";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "risk", label: "Warnings" },
  { id: "trust", label: "Reassurances" },
];

export default function SafeSignalsPage() {
  const [filter, setFilter] = useState("all");
  const { signals, loading } = useSignalsFeed(filter);

  const stats = useMemo(() => {
    const warnings = signals.filter((s) => s.category === "risk").length;
    const reassurances = signals.filter((s) => s.category === "trust").length;
    return { total: signals.length, warnings, reassurances };
  }, [signals]);

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Signal feed
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Recent warnings and reassurances from scans and community reports.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Total signals", value: stats.total },
          { label: "Warnings", value: stats.warnings, accent: "text-luxury-coral" },
          { label: "Reassurances", value: stats.reassurances, accent: "text-luxury-accent" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-luxury-border bg-luxury-surface px-4 py-3"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              {card.label}
            </p>
            <p className={cn("mt-1 text-2xl font-semibold tabular-nums", card.accent || "text-luxury-ink")}>
              {loading ? "—" : card.value}
            </p>
          </div>
        ))}
      </div>

      <SignalActivityArea signals={signals} className="rounded-xl border border-luxury-border bg-luxury-surface p-4" />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors",
              filter === f.id
                ? "bg-luxury-accent text-luxury-on-accent"
                : "border border-luxury-border text-luxury-body hover:bg-luxury-muted/50"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <section className="space-y-3">
        {loading && (
          <div className="h-24 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />
        )}
        {!loading && signals.length === 0 && (
          <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
            No signals yet. Run a recruiter check or submit a scam report to grow the graph.
          </p>
        )}
        {!loading &&
          signals.map((s) => (
            <Link
              key={s.id}
              to={`/community/signals/${s.id}`}
              className={cn(
                "group block rounded-xl border border-luxury-border bg-luxury-surface p-4 transition-all",
                "hover:border-luxury-accent/35 hover:shadow-soft",
                s.category === "risk" ? "border-l-red-200/60" : "border-l-emerald-200/60",
                "border-l-4"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-luxury-ink group-hover:text-luxury-accent">
                    {s.headline}
                  </p>
                  {s.node && (
                    <p className="mt-1 text-[11px] text-luxury-caption">
                      {s.node.type} · Trust rating {s.node.trustScore}/100
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-luxury-caption">
                    {new Date(s.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-[12px] font-medium text-luxury-accent">
                  View
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
}
