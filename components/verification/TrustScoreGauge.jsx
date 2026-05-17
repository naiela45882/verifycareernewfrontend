import RiskScoreGauge from "./RiskScoreGauge";

export default function TrustScoreGauge({ score = 0, tier }) {
  const riskEquivalent = Math.max(0, 100 - score);
  const displayTier =
    score >= 75 ? "safe" : score >= 50 ? "suspicious" : score >= 25 ? "high-risk" : "confirmed-scam";

  return (
    <RiskScoreGauge
      score={score}
      tier={tier || displayTier}
      label="Trust score"
    />
  );
}
