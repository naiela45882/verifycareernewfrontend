export const SIGNAL_TYPE_LABELS = {
  scam_report: "Scam report",
  fingerprint_reuse: "Fingerprint reuse",
  disposable_email: "Disposable email",
  domain_mx_fail: "Domain MX failure",
  verified_company: "Verified company",
  community_confirm: "Community confirmation",
  no_negative_18mo: "Clean 18-month record",
  domain_mx_valid: "Valid domain MX",
  high_risk_scan: "High-risk scan",
  graph_propagation: "Graph propagation",
  community_rating: "Community rating",
};

export function signalTypeLabel(type) {
  return SIGNAL_TYPE_LABELS[type] || type?.replace(/_/g, " ") || "Signal";
}
