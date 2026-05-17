import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useResume } from "./useResume";
import { useUserProfile } from "./useUserProfile";
import { useVerificationHistory } from "./useVerificationHistory";
import { useAuthedFetch } from "./useAuthedFetch";

export function useDashboardData() {
  const { user, isLoaded: clerkLoaded } = useUser();
  const { resume, hasResume, loading: resumeLoading } = useResume();
  const { profile, loading: profileLoading } = useUserProfile();
  const { scans, loading: historyLoading, stats } = useVerificationHistory({
    limit: 50,
  });
  const authedFetch = useAuthedFetch();
  const [applicationsCount, setApplicationsCount] = useState(0);

  useEffect(() => {
    if (!clerkLoaded) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await authedFetch("/api/applications");
        const data = await res.json();
        if (!cancelled && res.ok && data.success !== false) {
          setApplicationsCount(data.applications?.length ?? 0);
        }
      } catch {
        if (!cancelled) setApplicationsCount(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authedFetch, clerkLoaded]);

  const loading = !clerkLoaded || resumeLoading || profileLoading || historyLoading;

  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    profile?.user?.name ||
    "Member";

  const lastLogin = user?.lastSignInAt
    ? new Date(user.lastSignInAt).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Just now";

  const careerGoal = profile?.user?.careerGoal || "";
  const atsScore = resume?.lastAtsScore ?? null;
  const matchScore = resume?.lastMatchScore ?? null;

  const resumeStrength =
    atsScore == null ? null : atsScore >= 75 ? "Strong" : atsScore >= 50 ? "Moderate" : "Needs work";

  const skillLevel = useMemo(() => {
    if (atsScore == null) return { label: "Not assessed", percent: 0 };
    if (atsScore >= 80) return { label: "Advanced", percent: 85 };
    if (atsScore >= 60) return { label: "Intermediate", percent: 58 };
    if (atsScore >= 40) return { label: "Developing", percent: 35 };
    return { label: "Foundation", percent: 18 };
  }, [atsScore]);

  const verificationScore = useMemo(() => {
    let score = 35;
    if (hasResume) score += 25;
    if (atsScore != null) score += Math.min(25, Math.floor(atsScore / 4));
    if (stats.totalScans > 0) score += 15;
    return Math.min(100, score);
  }, [hasResume, atsScore, stats.totalScans]);

  return {
    loading,
    displayName,
    email: user?.primaryEmailAddress?.emailAddress || profile?.user?.email,
    lastLogin,
    hasResume,
    resumeFileName: resume?.fileName,
    atsScore,
    matchScore,
    resumeStrength,
    careerGoal,
    skillLevel,
    verificationScore,
    scansCount: stats.totalScans,
    highRiskScans: stats.highRisk,
    safeOffers: stats.safeOffers,
    mediumRiskScans: stats.mediumRisk,
    applicationsCount,
    resumeVersions: hasResume ? 1 : 0,
    history: scans,
  };
}
