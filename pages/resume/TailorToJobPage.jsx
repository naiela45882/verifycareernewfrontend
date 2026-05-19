import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Copy, Check, FileText, Save } from "lucide-react";
import toast from "react-hot-toast";
import ResumePageHeader from "../../components/resume/ResumePageHeader";
import ResumeEditor from "../../components/resume/ResumeEditor";
import TailorResults from "../../components/resume/TailorResults";
import AIAnalysisProgress from "../../components/resume/AIAnalysisProgress";
import ResumeVersionPreviewModal from "../../components/resume/ResumeVersionPreviewModal";
import ResumeFeatureGuide from "../../components/resume/ResumeFeatureGuide";
import { ResumeTwoColumnSkeleton } from "../../components/resume/LoadingSkeletons";
import { structuredFromPlainText } from "../../lib/versionPreviewData";
import { useResumeAPI } from "../../hooks/useResumeAPI";
import { useResumeSources } from "../../hooks/useResumeSources";
import ResumeSourcePicker from "../../components/resume/ResumeSourcePicker";

const TAILOR_STEPS = [
  {
    title: "Select your base resume",
    description:
      "Choose the Resume Builder draft or a saved version you want to customize for this job.",
  },
  {
    title: "Paste the job posting",
    description:
      "Copy the full job description from the company site or LinkedIn — include requirements and responsibilities.",
  },
  {
    title: "Tailor and review",
    description:
      'Click "Tailor my resume", then review the rewritten resume and skill alignment notes on the right.',
  },
  {
    title: "Save or copy",
    description:
      "Copy the result, preview it, or save it as a new version to use when applying.",
  },
];

const JOB_PLACEHOLDER = `Paste the full job posting here. Example:

Software Engineer — Example Corp
We are looking for a developer with 3+ years of experience in React, Node.js, and REST APIs.
Responsibilities: build features, code review, collaborate with product.
Requirements: Bachelor's degree or equivalent, strong communication skills.`;

export default function TailorToJobPage() {
  const { tailorResume, parseResumeText, createVersion, loading: apiLoading } = useResumeAPI();
  const sources = useResumeSources();
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(null);
  const [preparingPreview, setPreparingPreview] = useState(false);
  const [savingVersion, setSavingVersion] = useState(false);

  const handleTailor = async () => {
    if (!jobDescription.trim()) {
      toast.error("Paste the job description first (step 2)");
      return;
    }
    if (!sources.resumeText.trim()) {
      toast.error("Select a resume with content (step 1)");
      return;
    }
    try {
      const data = await tailorResume({
        jobDescription,
        primaryResumeText: sources.resumeText,
      });
      setResult(data);
      toast.success("Resume tailored — review the output on the right");
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

  const handleSaveAsVersion = async () => {
    if (!result?.tailoredResume) return;
    const defaultName = jobDescription.trim().split("\n")[0]?.slice(0, 48) || "Tailored resume";
    const versionName = window.prompt("Name this version", `Tailored — ${defaultName}`);
    if (!versionName?.trim()) return;

    setSavingVersion(true);
    try {
      let structured;
      try {
        const parsed = await parseResumeText(result.tailoredResume);
        structured = parsed.structured;
      } catch {
        structured = structuredFromPlainText(result.tailoredResume);
      }
      await createVersion({
        versionName: versionName.trim(),
        text: result.tailoredResume,
        structured,
        selectedTemplateId: sources.selected?.templateId || "classic",
      });
      toast.success("Saved as a new version");
      await sources.reload();
    } catch (err) {
      toast.error(err.message || "Could not save version");
    } finally {
      setSavingVersion(false);
    }
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

  if (sources.loading) return <ResumeTwoColumnSkeleton />;

  return (
    <div className="mx-auto max-w-6xl">
      <ResumePageHeader
        title="Tailor to Job"
        description="Rewrite your resume to match a specific job posting — keywords, skills, and phrasing aligned to what employers ask for."
      />

      <ResumeFeatureGuide steps={TAILOR_STEPS} />

      <ResumeSourcePicker
        loading={sources.loading}
        sources={sources.sources}
        selectedId={sources.selectedId}
        onSelect={sources.setSelectedId}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft">
          <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-luxury-caption">
            Step 2 — Job description
          </h2>
          <p className="mb-3 text-[12px] text-luxury-body">
            Paste everything from the job listing: title, requirements, and responsibilities.
          </p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={14}
            placeholder={JOB_PLACEHOLDER}
            className="w-full resize-y rounded-lg border border-luxury-border bg-luxury-muted/30 px-4 py-3 text-[13px] leading-relaxed text-luxury-ink outline-none focus:border-luxury-accent/40"
          />
          <button
            type="button"
            onClick={handleTailor}
            disabled={apiLoading || !sources.hasResume}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-luxury-accent py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-60 sm:w-auto sm:px-6"
          >
            {apiLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Tailor my resume
          </button>
          {!sources.hasResume && (
            <p className="mt-3 text-[12px] text-luxury-coral">
              Complete step 1: add a resume in{" "}
              <Link to="/resume" className="underline">
                Resume Builder
              </Link>{" "}
              or{" "}
              <Link to="/resume/versions" className="underline">
                Versions
              </Link>
              .
            </p>
          )}
        </section>

        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-luxury-caption">
                Step 3 — Tailored resume
              </h2>
              <p className="text-[12px] text-luxury-body">Your AI-adjusted resume appears here.</p>
            </div>
            {result?.tailoredResume && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveAsVersion}
                  disabled={savingVersion}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-luxury-border bg-luxury-muted/30 px-2.5 py-1.5 text-[12px] font-medium text-luxury-ink hover:bg-luxury-muted/50 disabled:opacity-60"
                >
                  {savingVersion ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  Save as version
                </button>
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
                  Preview
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-luxury-accent hover:underline"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
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
            <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-luxury-border px-4 text-center text-[13px] text-luxury-caption">
              <p>Your tailored resume will show here.</p>
              <p className="text-[12px] text-luxury-body">
                Select a resume, paste the job description, then click Tailor my resume.
              </p>
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
