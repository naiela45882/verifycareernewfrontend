import {
  LayoutDashboard,
  FileText,
  Route,
  Briefcase,
  ShieldCheck,
  Users,
  Settings,
} from "lucide-react";

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED = 68;

/** Dropdown groups first, then single links */
export const SIDEBAR_SECTIONS = [
  {
    id: "expandable",
    label: "Workspace",
    items: [
      {
        id: "resume-hub",
        label: "Resume Hub",
        icon: FileText,
        children: [
          { label: "Resume Builder", to: "/resume" },
          { label: "Resume Versions", to: "/resume/versions" },
          { label: "Tailor to Job (JD Match)", to: "/resume/tailor" },
          { label: "Resume Feedback", to: "/resume/feedback" },
        ],
      },
      {
        id: "trust",
        label: "Trust Intelligence",
        icon: ShieldCheck,
        children: [
          { label: "Offer Letter Scan", to: "/trust/offer-letter" },
          { label: "Recruiter Check", to: "/trust/recruiter" },
          { label: "My Evidence", to: "/trust/history" },
          { label: "Company Trust Lookup", to: "/trust/company" },
        ],
      },
      {
        id: "community",
        label: "Community Forum",
        icon: Users,
        children: [
          { label: "Scam Reports", to: "/community/scam-reports" },
          { label: "Discussions", to: "/community/discussions" },
          { label: "Signal Feed", to: "/community/signals" },
        ],
      },
    ],
  },
  {
    id: "main",
    label: "General",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/dashboard",
      },
      {
        id: "skill-journey",
        label: "Skill Journey",
        icon: Route,
        to: "/journey",
      },
      {
        id: "applications",
        label: "Applications Tracker",
        icon: Briefcase,
        to: "/applications",
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        to: "/settings",
      },
    ],
  },
];

export const SIDEBAR_NAV = SIDEBAR_SECTIONS.flatMap((s) => s.items);

export function isPathActive(pathname, hash, to, itemHash) {
  const [base, embeddedHash] = to.split("#");
  const wanted = (itemHash || embeddedHash || "").replace("#", "");
  const current = (hash || "").replace("#", "");

  if (pathname !== base && !pathname.startsWith(`${base}/`)) return false;
  if (wanted) return pathname === base && current === wanted;
  if (pathname.startsWith(`${base}/`)) return false;
  return pathname === base && !current;
}

export function isGroupActive(pathname, hash, item) {
  if (item.to && isPathActive(pathname, hash, item.to)) return true;
  if (item.children) {
    return item.children.some((c) =>
      isPathActive(pathname, hash, c.to, c.hash)
    );
  }
  return false;
}

const SETTINGS_SECTIONS = {
  account: "Account",
  profile: "Profile",
  appearance: "Appearance",
  faqs: "FAQs",
  help: "Help assistant",
  contact: "Contact us",
};

export function getPageTitle(pathname, hash) {
  if (pathname.startsWith("/settings")) {
    const section = hash.replace("#", "");
    if (section && SETTINGS_SECTIONS[section]) {
      return SETTINGS_SECTIONS[section];
    }
    return "Settings";
  }

  for (const item of SIDEBAR_NAV) {
    if (item.to && isPathActive(pathname, hash, item.to)) return item.label;
    if (item.children) {
      const child = item.children.find((c) =>
        isPathActive(pathname, hash, c.to, c.hash)
      );
      if (child) return child.label;
      if (isGroupActive(pathname, hash, item)) return item.label;
    }
  }
  return "Dashboard";
}

export function getPageMeta(pathname, hash) {
  const title = getPageTitle(pathname, hash);

  if (pathname.startsWith("/settings")) {
    const section = hash.replace("#", "");
    if (section && SETTINGS_SECTIONS[section]) {
      return { title, breadcrumb: ["Settings", SETTINGS_SECTIONS[section]] };
    }
    return { title: "Settings", breadcrumb: ["Settings"] };
  }

  for (const item of SIDEBAR_NAV) {
    if (item.to && isPathActive(pathname, hash, item.to)) {
      return { title, breadcrumb: ["Overview", item.label] };
    }
    if (item.children) {
      const child = item.children.find((c) =>
        isPathActive(pathname, hash, c.to, c.hash)
      );
      if (child) {
        return { title, breadcrumb: [item.label, child.label] };
      }
    }
  }

  if (pathname.startsWith("/journey")) {
    const sub = pathname.split("/")[2];
    const subLabels = {
      target: "Target role",
      roadmap: "Roadmap",
      progress: "Progress",
    };
    if (sub && subLabels[sub]) {
      return { title: subLabels[sub], breadcrumb: ["Skill Journey", subLabels[sub]] };
    }
    return { title: "Skill Journey", breadcrumb: ["Overview", "Skill Journey"] };
  }

  if (pathname.startsWith("/trust")) {
    if (pathname.includes("/history/")) {
      return { title: "Evidence detail", breadcrumb: ["Trust Intelligence", "My Evidence", "Detail"] };
    }
    const sub = pathname.split("/")[2];
    const subLabels = {
      "offer-letter": "Offer Letter Scan",
      recruiter: "Recruiter Signal Check",
      history: "My Evidence",
      company: "Company Trust Lookup",
    };
    if (sub && subLabels[sub]) {
      return { title: subLabels[sub], breadcrumb: ["Trust Intelligence", subLabels[sub]] };
    }
    return { title: "Trust Intelligence", breadcrumb: ["Workspace", "Trust Intelligence"] };
  }

  if (pathname.startsWith("/community/signals")) {
    if (pathname.split("/").length > 3) {
      return { title: "Signal", breadcrumb: ["Community", "Signal Feed", "Details"] };
    }
    return { title: "Signal Feed", breadcrumb: ["Community", "Signal Feed"] };
  }

  if (pathname.startsWith("/applications")) {
    if (pathname.split("/").length > 2) {
      return { title: "Application", breadcrumb: ["Applications Tracker", "Details"] };
    }
    return { title: "Applications Tracker", breadcrumb: ["Overview", "Applications Tracker"] };
  }

  return { title, breadcrumb: ["Overview", title] };
}
