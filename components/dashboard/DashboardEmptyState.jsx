import { Link } from "react-router-dom";
import { ScanSearch } from "lucide-react";

export default function DashboardEmptyState() {
  return (
    <section className="dashboard-empty relative overflow-hidden rounded-xl border border-dashed border-luxury-border bg-luxury-surface/80 px-6 py-16 text-center">
      <div className="relative mx-auto max-w-md">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-luxury-border bg-luxury-muted/60">
          <ScanSearch
            className="h-6 w-6 text-luxury-accent"
            strokeWidth={1.5}
          />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-luxury-ink">
          No analysis history yet
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-luxury-body">
          Upload a suspicious job offer or resume to generate your first
          AI-powered safety report.
        </p>
        <div className="relative mt-8 inline-block">
          <span
            className="empty-needle-glow pointer-events-none absolute -top-6 left-1/2 h-8 w-px -translate-x-1/2"
            aria-hidden
          />
          <Link
            to="/analyze"
            className="inline-flex items-center justify-center rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-semibold text-luxury-on-accent shadow-soft transition-all duration-300 hover:bg-luxury-accent-hover hover:-translate-y-px"
          >
            Start first analysis
          </Link>
        </div>
      </div>
    </section>
  );
}
