/**
 * Demo company lookup scenarios (frontend preview).
 * Slugs match backend/scripts/seedDevData.js when seed-dev has been run.
 */

function toListItem(c) {
  const ratings = c.communityRatings || [];
  const avg =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, r) => a + r.rating, 0) / ratings.length) * 10) / 10
      : null;

  let trustLabel = "Use caution";
  if (c.verificationStatus === "flagged" || (c.trustScore ?? 50) < 35) {
    trustLabel = "High scam risk";
  } else if (c.claimStatus === "verified" && (c.trustScore ?? 0) >= 75) {
    trustLabel = "Trusted";
  } else if ((c.trustScore ?? 50) >= 60) {
    trustLabel = "Generally trusted";
  }

  return {
    id: c.slug,
    name: c.name,
    slug: c.slug,
    website: c.website,
    domain: c.domain,
    description: c.description,
    claimStatus: c.claimStatus,
    trustScore: c.trustScore,
    verificationStatus: c.verificationStatus,
    averageRating: avg,
    ratingCount: ratings.length,
    trustLabel,
    isDemo: true,
  };
}

const MOCK_COMPANIES = [
  {
    slug: "mock-acme-corp",
    name: "Acme Corporation",
    website: "https://www.acmecorp.example",
    domain: "acmecorp.example",
    description:
      "Enterprise software and cloud services. Strong community trust; domain verified by multiple members.",
    claimStatus: "verified",
    verificationStatus: "approved",
    trustScore: 84,
    communityRatings: [
      { rating: 5, review: "Legitimate employer — clear interview process and official offer letter." },
      { rating: 4, review: "Responded promptly on corporate email; no upfront fees." },
    ],
  },
  {
    slug: "mock-cloudforge",
    name: "CloudForge Inc",
    website: "https://cloudforge.example",
    domain: "cloudforge.example",
    description: "Cloud infrastructure provider. Highly rated by members; verified domain.",
    claimStatus: "verified",
    verificationStatus: "approved",
    trustScore: 92,
    communityRatings: [
      { rating: 5, review: "Transparent process, official Workday portal." },
      { rating: 5, review: "Recruiter LinkedIn matched company page." },
    ],
  },
  {
    slug: "mock-vertex-labs",
    name: "Vertex Labs",
    website: "https://vertexlabs.example",
    domain: "vertexlabs.example",
    description: "Biotech and research tools. Verified employer with positive scan history.",
    claimStatus: "verified",
    verificationStatus: "approved",
    trustScore: 89,
    communityRatings: [{ rating: 5, review: "Offer letter matched careers@vertexlabs domain." }],
  },
  {
    slug: "mock-nimbus-tech",
    name: "Nimbus Technologies",
    website: "https://nimbustech.example",
    domain: "nimbustech.example",
    description: "Mid-size SaaS company. Profile not yet claimed by the company.",
    claimStatus: "unclaimed",
    verificationStatus: "pending",
    trustScore: 72,
    communityRatings: [{ rating: 4, review: "Interview was professional; offer matched market rate." }],
  },
  {
    slug: "mock-zenith-consulting",
    name: "Zenith Consulting Group",
    website: "https://zenithconsulting.example",
    domain: "zenithconsulting.example",
    description: "Management consulting. Unclaimed profile with moderate trust from member scans.",
    claimStatus: "unclaimed",
    verificationStatus: "pending",
    trustScore: 64,
    communityRatings: [],
  },
  {
    slug: "mock-pacific-health",
    name: "Pacific Health Systems",
    website: "https://pacifichealth.example",
    domain: "pacifichealth.example",
    description: "Regional healthcare network. Verification pending; mixed community signals.",
    claimStatus: "pending",
    verificationStatus: "pending",
    trustScore: 56,
    communityRatings: [{ rating: 3, review: "Slow HR response but role appears real on their site." }],
  },
  {
    slug: "mock-horizon-staffing",
    name: "Horizon Staffing LLC",
    website: "https://horizon-staff-now.biz",
    domain: "horizon-staff-now.biz",
    description:
      "Flagged by community: fake job offers, Gmail recruiters, and equipment-fee requests.",
    claimStatus: "unclaimed",
    verificationStatus: "flagged",
    trustScore: 31,
    communityRatings: [
      { rating: 1, review: "Asked for $400 equipment deposit before start date." },
      { rating: 2, review: "Recruiter refused video call; only WhatsApp." },
    ],
  },
  {
    slug: "mock-rapidhire-solutions",
    name: "RapidHire Solutions",
    website: "https://rapidhire-solutions.net",
    domain: "rapidhire-solutions.net",
    description:
      "Multiple fraud alerts: impersonation, Telegram interviews, crypto payment requests.",
    claimStatus: "unclaimed",
    verificationStatus: "flagged",
    trustScore: 24,
    communityRatings: [
      { rating: 1, review: "Job offer PDF had wrong logo and typos." },
      { rating: 1, review: "They wanted my SSN before any interview." },
    ],
  },
];

export const COMPANY_DEMO_OPTIONS = [
  { id: "live", label: "Live search — type a company name or domain" },
  { id: "all", label: "Demo: All sample companies (8)" },
  { id: "trusted", label: "Demo: Trusted employers" },
  { id: "flagged", label: "Demo: Flagged / high scam risk" },
  { id: "single-acme", label: "Demo: Acme Corporation" },
  { id: "single-horizon", label: "Demo: Horizon Staffing (flagged)" },
  { id: "single-rapidhire", label: "Demo: RapidHire Solutions (scam)" },
];

export function isCompanyDemoMode(mode) {
  return mode && mode !== "live";
}

export function getCompanyDemoResults(mode) {
  if (!isCompanyDemoMode(mode)) return [];

  let filtered = MOCK_COMPANIES;

  if (mode === "trusted") {
    filtered = MOCK_COMPANIES.filter(
      (c) => c.claimStatus === "verified" || (c.trustScore ?? 0) >= 80
    );
  } else if (mode === "flagged") {
    filtered = MOCK_COMPANIES.filter(
      (c) => c.verificationStatus === "flagged" || (c.trustScore ?? 100) < 40
    );
  } else if (mode === "single-acme") {
    filtered = MOCK_COMPANIES.filter((c) => c.slug === "mock-acme-corp");
  } else if (mode === "single-horizon") {
    filtered = MOCK_COMPANIES.filter((c) => c.slug === "mock-horizon-staffing");
  } else if (mode === "single-rapidhire") {
    filtered = MOCK_COMPANIES.filter((c) => c.slug === "mock-rapidhire-solutions");
  }

  return filtered.map(toListItem);
}

export function getCompanyDemoDetail(slugOrId) {
  const raw = MOCK_COMPANIES.find((c) => c.slug === slugOrId || c.slug === slugOrId?.toLowerCase());
  if (!raw) return null;

  const list = toListItem(raw);
  return {
    ...list,
    isDemo: true,
    reviews: (raw.communityRatings || []).map((r, i) => ({
      id: `demo-review-${i}`,
      rating: r.rating,
      review: r.review,
      createdAt: new Date().toISOString(),
    })),
    linkedSignals: [],
    evidenceCount: raw.verificationStatus === "flagged" ? 3 : 0,
    node: {
      displayName: raw.name,
      trustScore: raw.trustScore,
      riskTier: raw.trustScore >= 70 ? "safe" : raw.trustScore >= 40 ? "suspicious" : "high-risk",
    },
    trustIntelligence: {
      nodes: [{ displayName: raw.name, trustScore: raw.trustScore }],
      riskSignals:
        raw.verificationStatus === "flagged"
          ? [{ message: "Community flagged this employer for scam patterns." }]
          : [],
      trustSignals:
        raw.claimStatus === "verified"
          ? [{ message: "Verified domain and positive member reports." }]
          : [],
    },
    priorReportCount: raw.verificationStatus === "flagged" ? 5 : 0,
  };
}

export function getCompanyDemoSearchQuery(mode) {
  const map = {
    all: "demo companies",
    trusted: "verified",
    flagged: "flagged",
    "single-acme": "Acme",
    "single-horizon": "Horizon",
    "single-rapidhire": "RapidHire",
  };
  return map[mode] || "";
}
