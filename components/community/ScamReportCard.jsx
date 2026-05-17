import { Link } from "react-router-dom";
import { ChevronRight, ShieldAlert } from "lucide-react";
import { normalizeId } from "../../lib/normalizeId";
import RiskBadge from "./RiskBadge";
import Tags from "./Tags";

export default function ScamReportCard({ report }) {
  const reportId = normalizeId(report.id) || normalizeId(report._id);
  if (!reportId) return null;

  return (
    <Link
      to={`/community/scam-reports/${reportId}`}
      className="group flex items-start justify-between gap-4 rounded-xl border border-luxury-border bg-luxury-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-luxury-coral/30 hover:shadow-soft"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-luxury-coral/25 bg-luxury-coral/10 text-luxury-coral">
            <ShieldAlert className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-luxury-ink group-hover:text-luxury-coral">
              {report.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-[13px] text-luxury-body">
              {report.summary || report.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Tags items={report.tags || [report.scamType]} />
              <span className="text-[11px] text-luxury-caption">
                {report.authorDisplay} · {new Date(report.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <RiskBadge score={report.riskScore} tier={report.riskTier} />
        <ChevronRight className="h-4 w-4 text-luxury-caption group-hover:text-luxury-coral" />
      </div>
    </Link>
  );
}
