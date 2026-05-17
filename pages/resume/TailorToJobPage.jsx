import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Copy, Check, FileText } from "lucide-react";
import toast from "react-hot-toast";
import ResumePageHeader from "../../components/resume/ResumePageHeader";
import ResumeEditor from "../../components/resume/ResumeEditor";
import TailorResults from "../../components/resume/TailorResults";
import AIAnalysisProgress from "../../components/resume/AIAnalysisProgress";
import ResumeVersionPreviewModal from "../../components/resume/ResumeVersionPreviewModal";
import { ResumeTwoColumnSkeleton } from "../../components/resume/LoadingSkeletons";
import { structuredFromPlainText } from "../../lib/versionPreviewData";
import { useResumeAPI } from "../../hooks/useResumeAPI";

export default function TailorToJobPage() {
  const { getPrimary, tailorResume, parseResumeText, loading: apiLoading } = useResumeAPI();
  const [primaryText, setPrimaryText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loadingPrimary, setLoadingPrimary] = useState(true);
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(null);
  const [preparingPreview, setPreparingPreview] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getPrimary()
      .then((p) => {
        if (!cancelled) setPrimaryText(p?.text || "");
      })
      .catch(() => {
        if (!cancelled) toast.error("Could not load primary resume");
      })
      .finally(() => {
        if (!cancelled) setLoadingPrimary(false);
      });
    return () => {
      cancelled = true;
    };
  }, [getPrimary]);

  const handleTailor = async () => {
    if (!jobDescription.trim()) {
      toast.error("Paste a job description");
      return;
    }
    if (!primaryText.trim()) {
      toast.error("Add a primary resume first");
      return;
    }
    try {
      const data = await tailorResume({
        jobDescription,
        primaryResumeText: primaryText,
      });
      setResult(data);
      toast.success("Resume tailored");
    } catch (err) {
      toast.error(err.message || "Tailoring failed");
    }
  };

  const handleCopy = async () => {
    if (!result?.tailoredResume) return;
    await navigator.clipboard.writeText(result.tailoredResume);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClassicPreview = async () => {
    if (!result?.tailoredResume) return;
    setPreparingPreview(true);
    try {
      let structured;
      try {
        const parsed = await parseResumeText(result.tailoredResume);
        structured = parsed.structured;
      } catch {
        structured = structuredFromPlainText(result.tailoredResume);
      }
      setPreviewVersion({
        versionName: "Tailored resume",
        text: result.tailoredResume,
        structured,
        selectedTemplateId: "classic",
      });
      setPreviewOpen(true);
    } catch (err) {
      toast.error(err.message || "Could not build preview");
    } finally {
      setPreparingPreview(false);
    }
  };

  if (loadingPrimary) return <ResumeTwoColumnSkeleton />;

  return (
    <div className="mx-auto max-w-6xl">
      <ResumePageHeader
        title="Tailor to Job"
        description="Match your primary resume to a job description with AI-powered improvements."
      />

      {!primaryText && (
        <p className="mb-4 rounded-lg border border-luxury-coral/25 bg-luxury-coral/8 px-4 py-3 text-[13px] text-luxury-coral">
          <Link to="/resume" className="font-medium underline">
            Add your primary resume
          </Link>{" "}
          before tailoring.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft">
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-luxury-caption">
            Job description
          </h2>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={14}
            placeholder="Paste the full job posting…"
            className="w-full resize-y rounded-lg border border-luxury-border bg-luxury-muted/30 px-4 py-3 text-[13px] leading-relaxed text-luxury-ink outline-none focus:border-luxury-accent/40"
          />
          <button
            type="button"
            onClick={handleTailor}
            disabled={apiLoading || !primaryText}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-luxury-accent py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-60 sm:w-auto sm:px-6"
          >
            {apiLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Tailor my resume
          </button>
        </section>

        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-luxury-caption">
              Tailored resume
            </h2>
            {result?.tailoredResume && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClassicPreview}
                  disabled={preparingPreview}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-luxury-accent/35 bg-luxury-accent/10 px-2.5 py-1.5 text-[12px] font-medium text-luxury-accent hover:bg-luxury-accent/18 disabled:opacity-60"
                >
                  {preparingPreview ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <FileText className="h-3.5 w-3.5" />
                  )}
                  Classic preview
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-luxury-accent hover:underline"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  Copy
                </button>
              </div>
            )}
          </div>
          <AIAnalysisProgress
            visible={apiLoading}
            variant="tailor"
            title="Tailoring your resume"
            detail="Aligning skills and wording to the job description…"
          />

          {!apiLoading && result?.tailoredResume ? (
            <ResumeEditor value={result.tailoredResume} readOnly rows={14} />
          ) : !apiLoading ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-luxury-border text-[13px] text-luxury-caption">
              Tailored output appears here
            </div>
          ) : null}
        </section>
      </div>

      {result && (
        <div className="mt-6">
          <TailorResults result={result} />
        </div>
      )}
      <AnimatePresence>
        {previewOpen && previewVersion && (
          <ResumeVersionPreviewModal
            key="tailored-preview"
            version={previewVersion}
            onClose={() => {
              setPreviewOpen(false);
              setPreviewVersion(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
