import {
  FileText,
  ShieldCheck,
  Users,
  LayoutDashboard,
  Route,
  Briefcase,
  ScanLine,
  UserSearch,
  History,
  Building2,
  Radio,
  MessageSquare,
  Flag,
  Sparkles,
  GitCompare,
  MessageCircle,
} from "lucide-react";

export const WORKSPACES = [
  {
    id: "resume",
    icon: FileText,
    title: "Resume Hub",
    tagline: "Build, version, and tailor resumes with ATS-aware guidance.",
    accent: "teal",
    link: "/resume",
    cta: "Open Resume Hub",
    features: [
      { label: "Resume Builder", to: "/resume" },
      { label: "Resume Versions", to: "/resume/versions" },
      { label: "Tailor to Job (JD match)", to: "/resume/tailor" },
      { label: "Resume Feedback", to: "/resume/feedback" },
    ],
  },
  {
    id: "trust",
    icon: ShieldCheck,
    title: "Trust Intelligence",
    tagline: "Scan offers and recruiters, save evidence, and look up company trust.",
    accent: "coral",
    link: "/trust/offer-letter",
    cta: "Run a scan",
    features: [
      { label: "Offer Letter Scan", to: "/trust/offer-letter" },
      { label: "Recruiter Check", to: "/trust/recruiter" },
      { label: "My Evidence (scan history)", to: "/trust/history" },
      { label: "Company Trust Lookup", to: "/trust/company" },
    ],
  },
  {
    id: "community",
    icon: Users,
    title: "Community Forum",
    tagline: "Report scams, discuss employers, and browse the live Signal feed.",
    accent: "sun",
    link: "/community/signals",
    cta: "View Signal feed",
    features: [
      { label: "Scam Reports", to: "/community/scam-reports" },
      { label: "Discussions", to: "/community/discussions" },
      { label: "Signal Feed", to: "/community/signals" },
    ],
  },
];

export const PLATFORM_TOOLS = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "Scam risk overview, recent scans, and quick actions in one place.",
    to: "/dashboard",
  },
  {
    icon: Route,
    title: "Skill Journey",
    desc: "Set a target role, roadmap milestones, and track learning progress.",
    to: "/journey",
  },
  {
    icon: Briefcase,
    title: "Applications Tracker",
    desc: "Log applications, stages, and notes — linked to your verification workflow.",
    to: "/applications",
  },
];

export const CAPABILITIES = [
  {
    icon: ScanLine,
    title: "Offer letter scan",
    desc: "Paste or upload offer text — scam risk score, red flags, and document fingerprint.",
    to: "/trust/offer-letter",
  },
  {
    icon: UserSearch,
    title: "Recruiter check",
    desc: "Verify email domain, phone, job URL, and prior reports on the intelligence graph.",
    to: "/trust/recruiter",
  },
  {
    icon: History,
    title: "Evidence library",
    desc: "Every scan saved with full detail — publish named or anonymous to the community.",
    to: "/trust/history",
  },
  {
    icon: Building2,
    title: "Company trust lookup",
    desc: "Search employers and view trust ratings plus linked warnings.",
    to: "/trust/company",
  },
  {
    icon: Radio,
    title: "Signal feed",
    desc: "Community-wide warnings and reassurances — open any signal for full context.",
    to: "/community/signals",
  },
  {
    icon: Flag,
    title: "Scam reports",
    desc: "Browse and contribute structured scam reports with trust intelligence attached.",
    to: "/community/scam-reports",
  },
  {
    icon: MessageSquare,
    title: "Forum discussions",
    desc: "Ask questions, share experiences, and learn from other job seekers.",
    to: "/community/discussions",
  },
  {
    icon: Sparkles,
    title: "Resume builder",
    desc: "Structured sections, import from PDF, and export-ready layouts.",
    to: "/resume",
  },
  {
    icon: GitCompare,
    title: "Tailor to job",
    desc: "Match your resume against a job description with gap highlights.",
    to: "/resume/tailor",
  },
  {
    icon: MessageCircle,
    title: "Resume feedback",
    desc: "Actionable suggestions on clarity, impact, and ATS compatibility.",
    to: "/resume/feedback",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    tag: "SCAN",
    title: "Verify offer or recruiter",
    desc: "Run an offer letter scan or recruiter check — get scam risk, red flags, and entity trust ratings.",
  },
  {
    tag: "REVIEW",
    title: "Read evidence detail",
    desc: "Open My Evidence for the full breakdown: warnings, reassurances, badges, and raw text.",
  },
  {
    tag: "SHARE",
    title: "Publish to community",
    desc: "Publish with your name or anonymously — feeds the Signal feed and helps others.",
  },
  {
    tag: "TRACK",
    title: "Manage your career",
    desc: "Use Resume Hub, Applications Tracker, and Skill Journey alongside verification.",
  },
  {
    tag: "STAY SAFE",
    title: "Follow the Signal feed",
    desc: "Watch community signals, report scams, and look up company trust before you reply.",
  },
];

export const FOOTER_LINKS = {
  trust: [
    { label: "Offer Letter Scan", to: "/trust/offer-letter" },
    { label: "Recruiter Check", to: "/trust/recruiter" },
    { label: "My Evidence", to: "/trust/history" },
    { label: "Company Lookup", to: "/trust/company" },
  ],
  resume: [
    { label: "Resume Builder", to: "/resume" },
    { label: "Versions", to: "/resume/versions" },
    { label: "Tailor to Job", to: "/resume/tailor" },
    { label: "Feedback", to: "/resume/feedback" },
  ],
  community: [
    { label: "Signal Feed", to: "/community/signals" },
    { label: "Scam Reports", to: "/community/scam-reports" },
    { label: "Discussions", to: "/community/discussions" },
  ],
};
