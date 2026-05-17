import {
  Shield,
  FileText,
  GitCompare,
  Briefcase,
  Users,
} from "lucide-react";
import ActionModule from "../ActionModule";
import DashboardSection from "../DashboardSection";

const FEATURED = [
  {
    to: "/trust/offer-letter",
    title: "Offer Letter Scan",
    description: "Scan against scam patterns and the trust intelligence graph.",
    icon: Shield,
    accent: "teal",
  },
  {
    to: "/resume/tailor",
    title: "Tailor Resume to JD",
    description: "Match score, missing skills, and improvement tips.",
    icon: FileText,
    accent: "sun",
  },
  {
    to: "/resume/feedback",
    title: "Resume Feedback",
    description: "Deep ATS analysis and improvement suggestions.",
    icon: GitCompare,
    accent: "coral",
  },
];

const SECONDARY = [
  {
    to: "/applications",
    title: "Track Applications",
    description: "Pipeline, reminders, and timelines.",
    icon: Briefcase,
    accent: "teal",
  },
  {
    to: "/community/scam-reports",
    title: "Publish Experience",
    description: "Share anonymously on the community board.",
    icon: Users,
    accent: "sun",
  },
];

export default function ActionCenter() {
  return (
    <DashboardSection
      title="What would you like to do?"
      subtitle="Quick paths to your most common career actions."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
        {FEATURED.map((action) => (
          <ActionModule key={action.title} {...action} featured />
        ))}
        {SECONDARY.map((action) => (
          <ActionModule key={action.title} {...action} />
        ))}
      </div>
    </DashboardSection>
  );
}
