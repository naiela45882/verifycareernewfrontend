import { useMemo } from "react";

export function getDashboardStatusMessage({
  hasResume,
  careerGoal,
  scansCount,
  verificationScore,
}) {
  if (!hasResume) {
    return "Add a resume to unlock ATS scoring and job matching.";
  }
  if (!careerGoal?.trim()) {
    return "Set a career goal to personalize your action plan.";
  }
  if (scansCount === 0) {
    return "Run a verification scan to strengthen your safety profile.";
  }
  return `Profile ${verificationScore}% ready — keep momentum with tailoring and tracking.`;
}

export function useDashboardNextStep({ hasResume, careerGoal, scansCount }) {
  return useMemo(() => {
    if (!hasResume) {
      return {
        label: "Build your resume",
        description: "Upload or create a resume to unlock ATS insights.",
        to: "/resume",
      };
    }
    if (!careerGoal?.trim()) {
      return {
        label: "Set career goal",
        description: "Define your target role for personalized recommendations.",
        to: "/journey/target",
      };
    }
    if (scansCount === 0) {
      return {
        label: "Run your first scan",
        description: "Verify an offer letter against scam patterns.",
        to: "/trust/offer-letter",
      };
    }
    return {
      label: "Tailor resume to job",
      description: "Match your resume against a job description.",
      to: "/resume/tailor",
    };
  }, [hasResume, careerGoal, scansCount]);
}
