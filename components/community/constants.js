export function riskLevel(score) {
  if (score >= 76) return "confirmed-scam";
  if (score >= 51) return "high-risk";
  if (score >= 26) return "suspicious";
  return "safe";
}

export const SORT_OPTIONS = [
  { id: "recent", label: "Recent" },
  { id: "hot", label: "Hot" },
  { id: "comments", label: "Most commented" },
];
