import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ResumePageHeader from "../../components/resume/ResumePageHeader";
import FeedbackResults from "../../components/resume/FeedbackResults";
import AIAnalysisProgress from "../../components/resume/AIAnalysisProgress";
import ResumeFeatureGuide from "../../components/resume/ResumeFeatureGuide";
import { ResumePageSkeleton } from "../../components/resume/LoadingSkeletons";
import { useResumeAPI } from "../../hooks/useResumeAPI";
import { useResumeSources } from "../../hooks/useResumeSources";
import ResumeSourcePicker from "../../components/resume/ResumeSourcePicker";
import { getFeedbackCache, setFeedbackCache } from "../../lib/resumeSessionCache";

const FEEDBACK_STEPS = [
  {
    title: "Choose which resume to analyze",
    description:
      "Pick your Resume Builder draft or any saved version below. You need at least one with content.",
  },
  {
    title: "Run the analysis",
    description:
      'Click "Get feedback" — we check ATS fit, missing skills, formatting, and readability with AI.',
  },
  {
    title: "Apply the suggestions",
    description:
      "Review strengths and improvements, then update your resume in the builder or save changes as a new version.",
  },
];

export default function ResumeFeedbackPage() {
  const { getFeedback, loading: apiLoading } = useResumeAPI();
  const sources = useResumeSources();
  const location = useLocation();
  const navigate = useNavigate();
  const autoRunRef = useRef(false);
  const shouldAutoRun = useRef(Boolean(location.state?.autoRun));

  const initialFeedback = location.state?.feedback || getFeedbackCache() || null;
  const [feedback, setFeedback] = useState(initialFeedback);

  const runFeedback = useCallback(async () => {
    const resumeText = sources.resumeText.trim();
    if (!resumeText) {
      toast.error("Add resume content in Resume Builder or create a version first");
      return;
    }
    try {
      const data = await getFeedback(resumeText);
      setFeedback(data);
      setFeedbackCache(data);
    } catch (err) {
      toast.error(err.message || "Feedback failed");
    }
  }, [getFeedback, sources.resumeText]);

  useEffect(() => {
    if (location.state?.feedback) {
      setFeedbackCache(location.state.feedback);
    }
    if (location.state?.feedback || location.state?.autoRun) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (sources.loading || apiLoading || feedback || autoRunRef.current) return;
    if (!shouldAutoRun.current) return;
    if (!sources.resumeText.trim()) return;

    autoRunRef.current = true;
    shouldAutoRun.current = false;
    runFeedback();
  }, [apiLoading, feedback, sources.loading, sources.resumeText, runFeedback]);

  if (sources.loading && !feedback) return <ResumePageSkeleton />;

  const analyzing = apiLoading && !feedback;

  return (
    <div className="mx-auto max-w-3xl">
      <ResumePageHeader
        title="Resume Feedback"
        description="Get an ATS score and actionable tips to improve your resume before you apply."
        action={
          <button
            type="button"
            onClick={runFeedback}
            disabled={apiLoading || !sources.hasResume}
            className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-50"
          >
            {apiLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {feedback ? "Run again" : "Get feedback"}
          </button>
        }
      />

      <ResumeFeatureGuide steps={FEEDBACK_STEPS} />

      <ResumeSourcePicker
        loading={sources.loading}
        sources={sources.sources}
        selectedId={sources.selectedId}
        onSelect={sources.setSelectedId}
      />

      <AIAnalysisProgress
        visible={analyzing}
        variant="analyze"
        title="Analyzing your resume"
        detail="Checking ATS fit, skills gaps, and formatting…"
      />

      {!analyzing && feedback && <FeedbackResults feedback={feedback} />}

      {!analyzing && !feedback && sources.hasResume && (
        <div className="rounded-xl border border-dashed border-luxury-border bg-luxury-muted/20 p-12 text-center">
          <p className="text-[14px] font-medium text-luxury-ink">Ready when you are</p>
          <p className="mt-1 text-[13px] text-luxury-body">
            You&apos;ve selected a resume above. Click <strong className="font-medium text-luxury-ink">Get feedback</strong>{" "}
            to see your ATS score and improvement tips.
          </p>
        </div>
      )}
    </div>
  );
}
