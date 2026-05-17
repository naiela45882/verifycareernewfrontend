import { useMemo } from "react";
import { useUploadHistory } from "./hooks/useUploadHistory";
import { useResume } from "./hooks/useResume";
import { useUserProfile } from "./hooks/useUserProfile";
import SmartMetrics from "./components/dashboard/SmartMetrics";
import ResumeHub from "./components/dashboard/ResumeHub";
import OfferLetterCard from "./components/dashboard/OfferLetterCard";
import JobComparisonCard from "./components/dashboard/JobComparisonCard";
import CommunityCard from "./components/dashboard/CommunityCard";

function computeVerificationScore({ totalScans, safeOffers, atsScore, hasResume }) {
  let score = 40;
  if (hasResume) score += 20;
  if (atsScore != null) score += Math.min(20, Math.floor(atsScore / 5));
  if (totalScans > 0) score += 10;
  if (safeOffers > 0) score += Math.min(10, safeOffers * 5);
  return Math.min(100, score);
}

export default function Dashboard() {
  const { history, loading: historyLoading, stats } = useUploadHistory();
  const {
    resume,
    loading: resumeLoading,
    uploading,
    hasResume,
    uploadResume,
  } = useResume();
  const { profile, loading: profileLoading, updateCareerGoal } = useUserProfile();

  const comparisonsDone = useMemo(() => {
    return history.filter((h) => h.response?.matchScore != null).length;
  }, [history]);

  const verificationScore = useMemo(
    () =>
      computeVerificationScore({
        totalScans: stats.totalScans,
        safeOffers: stats.safeOffers,
        atsScore: resume?.lastAtsScore,
        hasResume,
      }),
    [stats, resume, hasResume]
  );

  const careerGoal = profile?.user?.careerGoal || "";

  return (
    <div className="dashboard-page mx-auto max-w-[1200px] space-y-6">
      <header>
        <h2 className="text-xl font-semibold tracking-tight text-luxury-ink">
          Welcome back
        </h2>
        <p className="mt-1 text-[13px] text-luxury-body">
          Your verified career workspace — resume, offers, and community in one place.
        </p>
      </header>

      <SmartMetrics
        atsScore={resume?.lastAtsScore}
        comparisonsDone={comparisonsDone}
        offersAnalyzed={stats.totalScans}
        verificationScore={verificationScore}
      />

      <ResumeHub
        resume={resume}
        hasResume={hasResume}
        loading={resumeLoading || profileLoading}
        uploading={uploading}
        careerGoal={careerGoal}
        onUpload={uploadResume}
        onSaveGoal={updateCareerGoal}
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        <OfferLetterCard />
        <JobComparisonCard />
        <CommunityCard />
      </section>

      {!historyLoading && stats.totalScans > 0 && (
        <p className="text-center text-[12px] text-luxury-caption">
          {stats.totalScans} offer letter{stats.totalScans !== 1 ? "s" : ""} analyzed
          · {stats.highRisk} flagged high risk
        </p>
      )}
    </div>
  );
}
