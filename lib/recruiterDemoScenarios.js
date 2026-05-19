/**
 * Demo recruiter check scenarios for UI preview (no API call).
 */

export const RECRUITER_DEMO_OPTIONS = [
  { id: "live", label: "Live verification — use the form below" },
  { id: "legitimate", label: "Demo: Legitimate recruiter" },
  { id: "fake", label: "Demo: Fake recruiter" },
  { id: "scammer", label: "Demo: Confirmed scammer" },
];

const DEMO_FORMS = {
  legitimate: {
    name: "Sarah Mitchell",
    company: "CloudForge Inc",
    email: "sarah.mitchell@cloudforge.example",
    phone: "+1 (415) 555-0142",
    jobUrl: "https://careers.cloudforge.example/jobs/senior-engineer",
  },
  fake: {
    name: "Alex Morgan",
    company: "Global Talent Partners",
    email: "alex.morgan.hiring@gmail.com",
    phone: "+1 (888) 555-9033",
    jobUrl: "https://bit.ly/global-talent-offer",
  },
  scammer: {
    name: "James Cole",
    company: "RapidHire Solutions",
    email: "james.cole@rapidhire-solutions.net",
    phone: "WhatsApp only",
    jobUrl: "",
  },
};

function demoScanId(kind) {
  return `demo-recruiter-${kind}`;
}

function buildDemoResult(kind) {
  const base = {
    isDemo: true,
    scanId: demoScanId(kind),
    historyMatches: [],
  };

  if (kind === "legitimate") {
    return {
      ...base,
      verdict: "Legitimate",
      trustScore: 86,
      riskScore: 14,
      riskTier: "safe",
      riskTierLabel: "Safe",
      badges: ["Corporate email verified", "Job URL provided", "Low pattern risk"],
      flags: [],
      priorReportCount: 0,
      trustIntelligence: {
        nodes: [
          {
            id: "demo-node-cf",
            type: "company",
            displayName: "CloudForge Inc",
            trustScore: 92,
            riskTier: "safe",
          },
        ],
        riskSignals: [],
        trustSignals: [
          { message: "Corporate domain matches known employer website." },
          { message: "No prior scam reports linked to this email domain." },
        ],
      },
    };
  }

  if (kind === "fake") {
    return {
      ...base,
      verdict: "Fake",
      trustScore: 42,
      riskScore: 58,
      riskTier: "suspicious",
      riskTierLabel: "Suspicious",
      badges: ["Job URL provided", "Disposable email flagged"],
      flags: [
        "Recruiter uses a free email provider (Gmail) instead of company domain",
        "Job post URL uses a short-link redirect — not an official careers page",
        "Generic recruiter title with no LinkedIn or corporate profile match",
        "Urgent language patterns detected in typical fake outreach",
      ],
      priorReportCount: 2,
      trustIntelligence: {
        nodes: [
          {
            id: "demo-node-gtp",
            type: "company",
            displayName: "Global Talent Partners",
            trustScore: 38,
            riskTier: "suspicious",
          },
        ],
        riskSignals: [
          { message: "Email domain does not match the stated company website." },
          { message: "Similar outreach reported by 2 other members last month." },
        ],
        trustSignals: [],
      },
      historyMatches: [
        {
          scanId: "demo-prior-1",
          type: "recruiter",
          riskScore: 61,
          riskTier: "high-risk",
          matchedOn: "similar Gmail pattern",
          createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
        },
      ],
    };
  }

  if (kind === "scammer") {
    return {
      ...base,
      verdict: "Scammer",
      trustScore: 6,
      riskScore: 94,
      riskTier: "confirmed-scam",
      riskTierLabel: "Confirmed Scam",
      badges: [
        "Disposable email flagged",
        "Prior scam fingerprint match",
      ],
      flags: [
        "Disposable or unverifiable email domain",
        "MX records missing or invalid for sender domain",
        "Matches fingerprint from a previous scan in archive",
        "Requests upfront equipment or training payment",
        "Interview only via WhatsApp or Telegram",
        "Company name linked to multiple fraud reports in community",
      ],
      priorReportCount: 7,
      trustIntelligence: {
        nodes: [
          {
            id: "demo-node-rh",
            type: "company",
            displayName: "RapidHire Solutions",
            trustScore: 24,
            riskTier: "confirmed-scam",
          },
          {
            id: "demo-node-email",
            type: "domain",
            displayName: "rapidhire-solutions.net",
            trustScore: 18,
            riskTier: "confirmed-scam",
          },
        ],
        riskSignals: [
          { message: "7 prior scam reports mention this company or domain." },
          { message: "Recruiter fingerprint matches archived fraud cases." },
          { message: "Domain registered recently; not on official employer lists." },
        ],
        trustSignals: [],
      },
      historyMatches: [
        {
          scanId: "demo-prior-2",
          type: "recruiter",
          riskScore: 88,
          riskTier: "confirmed-scam",
          matchedOn: "prior scam fingerprint",
          createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
        },
        {
          scanId: "demo-prior-3",
          type: "recruiter",
          riskScore: 91,
          riskTier: "confirmed-scam",
          matchedOn: "same email domain",
          createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
        },
      ],
    };
  }

  return null;
}

export function isRecruiterDemoMode(mode) {
  return mode && mode !== "live";
}

export function getRecruiterDemoForm(mode) {
  return DEMO_FORMS[mode] || null;
}

export function getRecruiterDemoResult(mode) {
  if (!isRecruiterDemoMode(mode)) return null;
  return buildDemoResult(mode);
}
