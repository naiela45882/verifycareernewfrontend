import { Gauge, FileText, Layers, Copy } from "lucide-react";
import StatCard from "../StatCard";
import DashboardSection from "../DashboardSection";

export default function ResumeIntelligence({ data, loading, hasResume }) {
  if (!hasResume && !loading) {
    return null;
  }

  if (loading) {
    return (
      <DashboardSection title="Resume intelligence" className="col-span-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[80px] animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40"
            />
          ))}
        </div>
      </DashboardSection>
    );
  }

  const atsVariant =
    data.atsScore >= 70 ? "safe" : data.atsScore != null ? "danger" : "default";

  return (
    <DashboardSection
      title="Resume intelligence"
      subtitle="ATS score, strength, and alignment from your stored resume."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        <StatCard
          label="ATS Score"
          value={data.atsScore != null ? `${data.atsScore}%` : "—"}
          icon={Gauge}
          variant={atsVariant}
        />
        <StatCard
          label="Resume Strength"
          value={data.resumeStrength ?? "—"}
          icon={FileText}
        />
        <StatCard
          label="JD Match"
          value={data.matchScore != null ? `${data.matchScore}%` : "—"}
          icon={Layers}
        />
        <StatCard label="Versions" value={data.resumeVersions} icon={Copy} />
      </div>
    </DashboardSection>
  );
}
