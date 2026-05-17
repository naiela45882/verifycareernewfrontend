import { Link } from "react-router-dom";
import RiskBadge from "./RiskBadge";
import { SCAN_TYPE_LABELS } from "./constants";

export default function MatchHistoryTable({ matches = [] }) {
  if (!matches.length) {
    return (
      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-luxury-ink">Match history</h3>
        <p className="mt-2 text-[13px] text-luxury-body">
          No prior scans matched this recruiter fingerprint.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft overflow-x-auto">
      <h3 className="mb-4 text-[15px] font-semibold text-luxury-ink">Match history</h3>
      <table className="w-full min-w-[480px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-luxury-border text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
            <th className="pb-2 pr-4 font-medium">Type</th>
            <th className="pb-2 pr-4 font-medium">Matched on</th>
            <th className="pb-2 pr-4 font-medium">Risk</th>
            <th className="pb-2 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((row) => (
            <tr key={`${row.scanId}-${row.matchedOn}`} className="border-b border-luxury-border/50">
              <td className="py-3 pr-4 text-luxury-ink">
                {SCAN_TYPE_LABELS[row.type] || row.type}
              </td>
              <td className="py-3 pr-4 text-luxury-body">{row.matchedOn}</td>
              <td className="py-3 pr-4">
                <RiskBadge tier={row.riskTier} score={row.riskScore} />
              </td>
              <td className="py-3">
                {row.scanId ? (
                  <Link
                    to={`/trust/history/${row.scanId}`}
                    className="text-luxury-accent hover:underline"
                  >
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleDateString()
                      : "View"}
                  </Link>
                ) : (
                  <span className="text-luxury-caption">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
