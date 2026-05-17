export const RISK_TIER_LABELS = {
  safe: "Safe",
  suspicious: "Suspicious",
  "high-risk": "High-Risk",
  "confirmed-scam": "Confirmed Scam",
};

export const SCAN_TYPE_LABELS = {
  "offer-letter": "Offer Letter",
  recruiter: "Recruiter Verification",
};

export function tierVariant(tier) {
  if (tier === "safe") return "safe";
  if (tier === "suspicious") return "default";
  if (tier === "high-risk" || tier === "confirmed-scam") return "danger";
  return "default";
}
