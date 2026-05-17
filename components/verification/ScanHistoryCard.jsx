import { Link } from "react-router-dom";
import { ChevronRight, FileText, UserCheck } from "lucide-react";
import RiskBadge from "./RiskBadge";
import FingerprintMini from "./FingerprintMini";
import { SCAN_TYPE_LABELS } from "./constants";
import { toScamRisk } from "../../lib/scamRisk";

const TYPE_ICONS = {
  "offer-letter": FileText,
  recruiter: UserCheck,
};

export default function ScanHistoryCard({ scan }) {
  const Icon = TYPE_ICONS[scan.type] || FileText;
  const scamRisk = toScamRisk(scan);

  return (
    <Link
      to={`/trust/history/${scan.id}`}
      className="group flex items-center justify-between gap-4 rounded-xl border border-luxury-border bg-luxury-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-luxury-accent/35 hover:shadow-soft"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-luxury-accent/25 bg-luxury-accent/10 text-luxury-accent">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-luxury-ink">
            {SCAN_TYPE_LABELS[scan.type] || scan.type}
          </p>
          <p className="mt-0.5 text-[12px] text-luxury-caption">
            {new Date(scan.createdAt).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <FingerprintMini value={scan.fingerprint} className="mt-2" />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <RiskBadge tier={scan.riskTier} score={scamRisk} />
        <ChevronRight className="h-4 w-4 text-luxury-caption transition-transform group-hover:translate-x-0.5 group-hover:text-luxury-accent" />
      </div>
    </Link>
  );
}
