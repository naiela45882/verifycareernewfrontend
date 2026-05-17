import { Link } from "react-router-dom";
import { normalizeId } from "../../lib/normalizeId";
import RiskBadge from "./RiskBadge";

export default function SimilarReports({ reports = [] }) {
  if (!reports.length) return null;

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <h3 className="mb-4 text-[15px] font-semibold text-luxury-ink">Similar reports</h3>
      <ul className="space-y-3">
        {reports.map((r) => {
          const reportId = normalizeId(r.id);
          if (!reportId) return null;
          return (
          <li key={reportId}>
            <Link
              to={`/community/scam-reports/${reportId}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-luxury-border/60 px-3 py-2 transition-colors hover:border-luxury-accent/35"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-luxury-ink">{r.title}</p>
                <p className="text-[11px] text-luxury-caption">{r.scamType}</p>
              </div>
              <RiskBadge score={r.riskScore} />
            </Link>
          </li>
          );
        })}
      </ul>
    </section>
  );
}
