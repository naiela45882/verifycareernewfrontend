/** Document scam risk: 0–100, higher = more dangerous. */
export function toScamRisk(scanOrResult) {
  if (!scanOrResult) return 0;
  if (scanOrResult.type === "recruiter") {
    const trust = scanOrResult.trustScore ?? 50;
    return Math.min(100, Math.max(0, 100 - trust));
  }
  return Math.min(100, Math.max(0, scanOrResult.riskScore ?? 0));
}

export function trustRatingFromNode(node) {
  return Math.min(100, Math.max(0, node?.trustScore ?? 0));
}

export function trustColor(score) {
  if (score >= 70) return "var(--vc-teal)";
  if (score >= 40) return "var(--vc-sun)";
  return "var(--vc-coral)";
}
