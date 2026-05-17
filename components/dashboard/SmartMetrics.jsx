import { BarChart3, FileText, ScanSearch, Shield } from "lucide-react";
import StatCard from "./StatCard";

export default function SmartMetrics({
  atsScore,
  comparisonsDone,
  offersAnalyzed,
  verificationScore,
}) {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <StatCard
        label="Resume ATS Score"
        value={atsScore != null ? `${atsScore}%` : "—"}
        icon={FileText}
        variant={atsScore >= 70 ? "safe" : atsScore != null ? "danger" : "default"}
      />
      <StatCard
        label="Comparisons Done"
        value={comparisonsDone}
        icon={BarChart3}
      />
      <StatCard
        label="Offers Analyzed"
        value={offersAnalyzed}
        icon={ScanSearch}
      />
      <StatCard
        label="Verification Score"
        value={verificationScore != null ? `${verificationScore}%` : "—"}
        icon={Shield}
        variant={verificationScore >= 60 ? "safe" : "default"}
      />
    </section>
  );
}
