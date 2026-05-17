import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Shield,
  FileText,
  Users,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useUploadHistory } from "./hooks/useUploadHistory";
import StatCard from "./components/dashboard/StatCard";
import ActionModule from "./components/dashboard/ActionModule";
import RiskDistributionChart from "./components/dashboard/RiskDistributionChart";
import AiInsightsPanel from "./components/dashboard/AiInsightsPanel";
import SecurityNotices from "./components/dashboard/SecurityNotices";
import DashboardEmptyState from "./components/dashboard/DashboardEmptyState";
import AnalysisHistoryCard from "./components/dashboard/AnalysisHistoryCard";

export default function History() {
  const { hash } = useLocation();
  const { history, loading, stats } = useUploadHistory();
  const { totalScans, highRisk, safeOffers, mediumRisk, aiAnalyses } = stats;

  useEffect(() => {
    if (hash === "#insights") {
      document.getElementById("insights")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="dashboard-page mx-auto max-w-[1440px]">
      <header className="mb-6">
        <p className="text-[13px] text-luxury-body">
          Monitor scam analyses, AI insights, and career safety at a glance.
        </p>
      </header>

      <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatCard
          label="Total Scans"
          value={totalScans}
          icon={BarChart3}
        />
        <StatCard
          label="High Risk"
          value={highRisk}
          icon={AlertTriangle}
          variant="danger"
        />
        <StatCard
          label="Safe Offers"
          value={safeOffers}
          icon={CheckCircle2}
          variant="safe"
        />
        <StatCard
          label="AI Analyses"
          value={aiAnalyses}
          icon={Sparkles}
        />
      </section>

      <section className="mb-5 grid gap-3 lg:grid-cols-12 lg:gap-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2">
          <ActionModule
            to="/analyze"
            title="Analyze New Offer"
            description="Detect scam risks with AI-powered offer analysis."
            icon={Shield}
            accent="teal"
          />
          <ActionModule
            to="/resume"
            title="Resume Analyzer"
            description="Improve ATS score and alignment with target roles."
            icon={FileText}
            accent="ink"
          />
        </div>
        <div className="lg:col-span-2">
          <ActionModule
            to="/community"
            title="Community Forum"
            description="Explore real scam experiences shared by the community."
            icon={Users}
            accent="ink"
          />
        </div>
        <div className="lg:col-span-3">
          <SecurityNotices />
        </div>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RiskDistributionChart
            highRisk={highRisk}
            safeOffers={safeOffers}
            mediumRisk={mediumRisk}
          />
        </div>
        <div className="lg:col-span-4">
          <AiInsightsPanel aiAnalyses={aiAnalyses} />
        </div>
      </section>

      {loading ? (
        <section className="rounded-xl border border-luxury-border bg-luxury-surface px-6 py-12 text-center">
          <p className="text-[14px] text-luxury-body">Loading dashboard…</p>
        </section>
      ) : history.length === 0 ? (
        <DashboardEmptyState />
      ) : (
        <section>
          <header className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-luxury-ink">
              Recent Analyses
            </h2>
            <p className="mt-0.5 text-[13px] text-luxury-body">
              Latest AI scam detection reports and safety summaries.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {history.map((item) => (
              <AnalysisHistoryCard key={item._id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
