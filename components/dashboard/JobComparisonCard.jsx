import ActionModule from "./ActionModule";
import { GitCompare } from "lucide-react";

export default function JobComparisonCard() {
  return (
    <ActionModule
      to="/resume/tailor"
      title="Job Description vs Resume"
      description="Compare a job description against your stored resume for match score, missing skills, and fit insights."
      icon={GitCompare}
      accent="ink"
    />
  );
}
