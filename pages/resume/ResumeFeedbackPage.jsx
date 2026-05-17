import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ResumePageHeader from "../../components/resume/ResumePageHeader";
import FeedbackResults from "../../components/resume/FeedbackResults";
import AIAnalysisProgress from "../../components/resume/AIAnalysisProgress";
import { ResumePageSkeleton } from "../../components/resume/LoadingSkeletons";
import { useResumeAPI } from "../../hooks/useResumeAPI";
import {
  getFeedbackCache,
  setFeedbackCache,
} from "../../lib/resumeSessionCache";

export default function ResumeFeedbackPage() {
  const { getPrimary, getFeedback, loading: apiLoading } = useResumeAPI();
  const location = useLocation();
  const navigate = useNavigate();
  const autoRunRef = useRef(false);
  const shouldAutoRun = useRef(Boolean(location.state?.autoRun));

  const initialFeedback =
    location.state?.feedback || getFeedbackCache() || null;

  const [primaryText, setPrimaryText] = useState(
    () => location.state?.primaryText || ""
  );
  const [feedback, setFeedback] = useState(initialFeedback);
  const [loadingPage, setLoadingPage] = useState(
    () => !initialFeedback && !location.state?.primaryText
  );

  const runFeedback = useCallback(
    async (resumeText = primaryText) => {
      if (!resumeText.trim()) {
        toast.error("Add a primary resume first");
        return;
      }
      try {
        const data = await getFeedback(resumeText);
        setFeedback(data);
        setFeedbackCache(data);
      } catch (err) {
        toast.error(err.message || "Feedback failed");
      }
    },
    [getFeedback, primaryText]
  );

  useEffect(() => {
    if (location.state?.feedback) {
      setFeedbackCache(location.state.feedback);
    }
    if (location.state?.feedback || location.state?.autoRun) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (primaryText) {
      setLoadingPage(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const p = await getPrimary();
        if (!cancelled) {
          setPrimaryText(p?.text || "");
        }
      } catch {
        if (!cancelled) {
          toast.error("Could not load primary resume");
        }
      } finally {
        if (!cancelled) {
          setLoadingPage(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [getPrimary, primaryText]);

  useEffect(() => {
    if (loadingPage || apiLoading || feedback || autoRunRef.current) return;
    if (!shouldAutoRun.current) return;

    const text = primaryText.trim();
    if (!text) return;

    autoRunRef.current = true;
    shouldAutoRun.current = false;
    runFeedback(text);
  }, [apiLoading, feedback, loadingPage, primaryText, runFeedback]);

  if (loadingPage) return <ResumePageSkeleton />;

  const analyzing = apiLoading && !feedback;

  return (
    <div className="mx-auto max-w-3xl">
      <ResumePageHeader
        title="Resume Feedback"
        description="ATS score, missing skills, formatting, and readability analysis powered by AI."
        action={
          <button
            type="button"
            onClick={() => runFeedback()}
            disabled={apiLoading || !primaryText}
            className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-50"
          >
            {apiLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {feedback ? "Re-analyze" : "Analyze resume"}
          </button>
        }
      />

      {!primaryText && (
        <p className="mb-6 rounded-lg border border-luxury-coral/25 bg-luxury-coral/8 px-4 py-3 text-[13px] text-luxury-coral">
          <Link to="/resume" className="font-medium underline">
            Add your primary resume
          </Link>{" "}
          to run feedback.
        </p>
      )}

      <AIAnalysisProgress
        visible={analyzing}
        variant="analyze"
        title="Analyzing your resume"
        detail="Checking ATS fit, skills gaps, and formatting…"
      />

      {!analyzing && feedback && <FeedbackResults feedback={feedback} />}

      {!analyzing && !feedback && (
        <div className="rounded-xl border border-dashed border-luxury-border bg-luxury-muted/20 p-12 text-center">
          <p className="text-[14px] font-medium text-luxury-ink">No analysis yet</p>
          <p className="mt-1 text-[13px] text-luxury-body">
            Click Analyze resume to get ATS score, missing skills, and improvement tips.
          </p>
        </div>
      )}
    </div>
  );
}
