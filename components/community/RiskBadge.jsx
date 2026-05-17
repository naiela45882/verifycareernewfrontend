import VerificationRiskBadge from "../verification/RiskBadge";
import { riskLevel } from "./constants";

export default function RiskBadge({ score, tier, className }) {
  const resolvedTier = tier || riskLevel(score ?? 0);
  return (
    <VerificationRiskBadge tier={resolvedTier} score={score} className={className} />
  );
}
