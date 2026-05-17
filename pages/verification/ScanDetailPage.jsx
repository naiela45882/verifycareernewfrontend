import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useVerificationScan } from "../../hooks/useVerificationHistory";
import { useVerificationHistory } from "../../hooks/useVerificationHistory";
import TrustIntelligencePanel from "../../components/trust/TrustIntelligencePanel";
import VerificationSummaryCard from "../../components/verification/VerificationSummaryCard";
import VerificationResultCard from "../../components/verification/VerificationResultCard";
import RedFlagList from "../../components/verification/RedFlagList";
import RawTextAccordion from "../../components/verification/RawTextAccordion";
import RecruiterExtractCard from "../../components/verification/RecruiterExtractCard";
import MatchTimeline from "../../components/verification/MatchTimeline";
import BadgeList from "../../components/verification/BadgeList";
import ActionButtons from "../../components/verification/ActionButtons";
import ScanResultsLayout from "../../components/verification/ScanResultsLayout";
import { useTrust } from "../../hooks/useTrust";
import { SCAN_TYPE_LABELS } from "../../components/verification/constants";
import { toScamRisk } from "../../lib/scamRisk";

export default function ScanDetailPage() {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const { scan, loading, error } = useVerificationScan(scanId);
  const { deleteScan } = useVerificationHistory({ enabled: false });
  const { publishScan } = useTrust();

  const handleDelete = async () => {
    if (!window.confirm("Delete this scan permanently?")) return;
    try {
      await deleteScan(scanId);
      toast.success("Scan deleted");
      navigate("/trust/history");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="w-full space-y-3">
        <div className="h-52 animate-pulse rounded-2xl border border-luxury-border bg-luxury-muted/40" />
        <p className="text-center text-[13px] text-luxury-caption">Loading evidence…</p>
      </div>
    );
  }

  if (error || !scan) {
    return (
      <div className="w-full text-center">
        <p className="text-[13px] text-luxury-coral">{error?.message || "Scan not found"}</p>
        <Link
          to="/trust/history"
          className="mt-4 inline-block text-[13px] text-luxury-accent hover:underline"
        >
          Back to history
        </Link>
      </div>
    );
  }

  const flags = scan.redFlags?.length ? scan.redFlags : scan.flags;
  const isRecruiter = scan.type === "recruiter";

  return (
    <div className="w-full space-y-4">
      <header>
        <Link
          to="/trust/history"
          className="text-[12px] font-medium text-luxury-accent hover:underline"
        >
          ← Scan history
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-luxury-ink">
          {SCAN_TYPE_LABELS[scan.type] || scan.type}
        </h1>
        <p className="mt-1 text-[13px] text-luxury-caption">
          {new Date(scan.createdAt).toLocaleString()}
        </p>
      </header>

      <ScanResultsLayout
        result={scan}
        type={scan.type}
        summaryCard={
          isRecruiter ? (
            <VerificationResultCard
              result={{
                trustScore: scan.trustScore,
                riskScore: toScamRisk(scan),
                riskTier: scan.riskTier,
                scanId: scan.id,
                fingerprint: scan.fingerprint,
              }}
            />
          ) : (
            <VerificationSummaryCard
              result={{
                riskScore: scan.riskScore,
                riskTier: scan.riskTier,
                fingerprint: scan.fingerprint,
              }}
            />
          )
        }
        flags={flags}
        flagsList={
          flags?.length > 0 ? <RedFlagList flags={flags} title="Red flags" /> : null
        }
        intelligencePanel={
          scan.trustIntelligence ? (
            <TrustIntelligencePanel
              trustIntelligence={scan.trustIntelligence}
              priorReportCount={scan.priorReportCount}
            />
          ) : null
        }
        extra={
          <>
            {isRecruiter && <BadgeList badges={scan.badges} />}
            {scan.type === "offer-letter" && (
              <RecruiterExtractCard recruiter={scan.recruiter} />
            )}
            <MatchTimeline matches={scan.historyMatches} />
            <RawTextAccordion text={scan.text} />
            <div className="flex flex-wrap items-center gap-3 border-t border-luxury-border/60 pt-6">
              <ActionButtons
                scanId={scan.id}
                publishedReportId={scan.publishedReportId}
                onPublish={(id, options) => publishScan(id, options)}
                onReport={() => toast("Report received — thank you.")}
                saved={false}
              />
              <button
                type="button"
                onClick={handleDelete}
                className="text-[13px] font-medium text-luxury-coral hover:underline"
              >
                Delete scan
              </button>
            </div>
          </>
        }
      />
    </div>
  );
}
