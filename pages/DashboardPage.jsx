import { useDashboardData } from "../hooks/useDashboardData";
import DashboardCommandHero from "../components/dashboard/sections/DashboardCommandHero";
import QuickActionRail from "../components/dashboard/sections/QuickActionRail";
import ResumeIntelligence from "../components/dashboard/sections/ResumeIntelligence";
import SkillJourney from "../components/dashboard/sections/SkillJourney";
import ActionCenter from "../components/dashboard/sections/ActionCenter";
import ResumeHub from "../components/dashboard/ResumeHub";
import { useResume } from "../hooks/useResume";
import { useUserProfile } from "../hooks/useUserProfile";
import RiskDistributionChart from "../components/dashboard/RiskDistributionChart";
import DashboardGrid, { DashboardCell } from "../components/dashboard/DashboardGrid";

export default function DashboardPage() {
  const data = useDashboardData();
  const { resume, hasResume, loading: resumeLoading } = useResume();
  const { profile, loading: profileLoading, updateCareerGoal } = useUserProfile();
  const careerGoal = profile?.user?.careerGoal || data.careerGoal || "";

  return (
    <div className="dashboard-page mx-auto max-w-[1440px]">
      <DashboardGrid>
        <DashboardCell span={8}>
          <DashboardCommandHero data={data} loading={data.loading} />
        </DashboardCell>

        <DashboardCell span={4}>
          <QuickActionRail />
        </DashboardCell>

        <DashboardCell span={7}>
          <ResumeHub
            resume={resume}
            hasResume={hasResume}
            loading={resumeLoading || profileLoading || data.loading}
            careerGoal={careerGoal}
            onSaveGoal={updateCareerGoal}
          />
        </DashboardCell>

        <DashboardCell span={5}>
          <SkillJourney loading={data.loading} compact />
        </DashboardCell>

        {!data.loading && data.hasResume && (
          <DashboardCell span={12}>
            <ResumeIntelligence
              data={data}
              loading={data.loading}
              hasResume={data.hasResume}
            />
          </DashboardCell>
        )}

        {!data.loading && data.scansCount > 0 && (
          <DashboardCell span={12}>
            <RiskDistributionChart
              highRisk={data.highRiskScans}
              safeOffers={data.safeOffers}
              mediumRisk={data.mediumRiskScans}
            />
          </DashboardCell>
        )}

        <DashboardCell span={12}>
          <ActionCenter />
        </DashboardCell>
      </DashboardGrid>
    </div>
  );
}
