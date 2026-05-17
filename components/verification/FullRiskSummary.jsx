import ScamRiskRadial from "../charts/ScamRiskRadial";
import VerificationSummaryCard from "./VerificationSummaryCard";
import VerificationResultCard from "./VerificationResultCard";
import { toScamRisk } from "../../lib/scamRisk";

export default function FullRiskSummary({ scan }) {
  if (!scan) return null;

  const scamRisk = toScamRisk(scan);

  if (scan.type === "recruiter") {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <ScamRiskRadial score={scamRisk} tier={scan.riskTier} />
        <VerificationResultCard
          result={{
            trustScore: scan.trustScore,
            riskTier: scan.riskTier,
            scanId: scan.id,
            fingerprint: scan.fingerprint,
          }}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ScamRiskRadial score={scamRisk} tier={scan.riskTier} />
      <VerificationSummaryCard
        result={{
          riskScore: scan.riskScore,
          riskTier: scan.riskTier,
          fingerprint: scan.fingerprint,
        }}
      />
    </div>
  );
}
