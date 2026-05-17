import {
  LayoutDashboard,
  FileText,
  GitCompare,
  ScanSearch,
  Users,
  Settings,
} from "lucide-react";

export const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        title: "Dashboard",
        breadcrumb: ["Main", "Dashboard"],
      },
      {
        to: "/resume",
        label: "My Resume",
        icon: FileText,
        title: "My Resume",
        breadcrumb: ["Main", "My Resume"],
      },
      {
        to: "/compare",
        label: "Job Comparison",
        icon: GitCompare,
        title: "Job Comparison",
        breadcrumb: ["Main", "Job Comparison"],
      },
      {
        to: "/analyze",
        label: "Offer Letter Scanner",
        icon: ScanSearch,
        title: "Offer Letter Scanner",
        breadcrumb: ["Main", "Offer Letter Scanner"],
      },
      {
        to: "/community",
        label: "Community Forum",
        icon: Users,
        title: "Community Forum",
        breadcrumb: ["Main", "Community Forum"],
      },
      {
        to: "/settings",
        label: "Settings",
        icon: Settings,
        title: "Settings",
        breadcrumb: ["Main", "Settings"],
      },
    ],
  },
];

export const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

export function getPageMeta(pathname) {
  const exact = ALL_NAV_ITEMS.find(
    (item) => item.to === pathname || item.to.split("#")[0] === pathname
  );
  if (exact) return { title: exact.title, breadcrumb: exact.breadcrumb };

  if (pathname.startsWith("/analyze")) {
    return {
      title: "Offer Letter Scanner",
      breadcrumb: ["Main", "Offer Letter Scanner"],
    };
  }

  return { title: "Dashboard", breadcrumb: ["Main", "Dashboard"] };
}

export function isNavActive(item, pathname, hash = "") {
  if (item.match) return item.match(pathname, hash);
  const base = item.to.split("#")[0];
  return pathname === base || pathname.startsWith(`${base}/`);
}
