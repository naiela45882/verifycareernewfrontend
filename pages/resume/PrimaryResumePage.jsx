import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Pencil,
  Replace,
  Download,
  Sparkles,
  Save,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import ResumePageHeader from "../../components/resume/ResumePageHeader";
import ResumeEditor from "../../components/resume/ResumeEditor";
import PrimaryResumeCard from "../../components/resume/PrimaryResumeCard";
import { ResumePageSkeleton } from "../../components/resume/LoadingSkeletons";
import { useResumeAPI } from "../../hooks/useResumeAPI";

export default function PrimaryResumePage() {
  const api = useResumeAPI();
  const navigate = useNavigate();
  const [primary, setPrimary] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [mode, setMode] = useState("view");
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setPageLoading(true);
    setLoadError(null);
    try {
      const data = await api.getPrimary();
      setPrimary(data);
      setDraft(data?.text || "");
    } catch (err) {
      const message = err?.message || "Could not load resume";
      setLoadError(message);
      toast.error(message);
    } finally {
      setPageLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  const hasPrimary = Boolean(primary?.text);

  const handleSave = async () => {
    const text = draft.trim();
    if (!text) {
      toast.error("Resume text cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const updated = hasPrimary
        ? await api.updatePrimary(text)
        : await api.savePrimary(text);
      setPrimary(updated);
      setDraft(updated.text);
      setMode("view");
      toast.success(hasPrimary ? "Resume updated" : "Primary resume saved");
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([primary?.text || draft], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "primary-resume.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

  const handleInsights = () => {
    if (!primary?.text?.trim()) {
      toast.error("Add resume text before generating insights");
      return;
    }
    navigate("/resume/feedback", {
      state: { autoRun: true, primaryText: primary.text },
    });
  };

  if (pageLoading) return <ResumePageSkeleton />;

  if (loadError) {
    return (
      <div className="mx-auto max-w-3xl">
        <ResumePageHeader
          title="Primary Resume"
          description="Your master resume as plain text — used for tailoring, versions, and ATS feedback."
        />
        <div className="rounded-xl border border-luxury-coral/30 bg-luxury-muted/30 p-6 text-center">
          <p className="text-[14px] font-medium text-luxury-ink">Could not load your resume</p>
          <p className="mt-2 text-[13px] text-luxury-body">{loadError}</p>
          <button
            type="button"
            onClick={load}
            className="mt-4 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ResumePageHeader
        title="Primary Resume"
        description="Your master resume as plain text — used for tailoring, versions, and ATS feedback."
      />

      {mode === "view" && hasPrimary ? (
        <>
          <PrimaryResumeCard
            text={primary.text}
            updatedAt={primary.updatedAt}
            lastAtsScore={primary.lastAtsScore}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <ActionBtn
              icon={Pencil}
              label="Edit resume"
              onClick={() => {
                setDraft(primary.text);
                setMode("edit");
              }}
            />
            <ActionBtn
              icon={Replace}
              label="Replace resume"
              onClick={() => {
                setDraft("");
                setMode("replace");
              }}
            />
            <ActionBtn icon={Download} label="Export text" onClick={handleExport} />
            <ActionBtn
              icon={Sparkles}
              label="Generate insights"
              onClick={handleInsights}
              primary
            />
          </div>
        </>
      ) : (
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft">
          <h2 className="mb-3 text-[14px] font-semibold text-luxury-ink">
            {hasPrimary && mode === "edit" ? "Edit resume" : "Add primary resume"}
          </h2>
          <ResumeEditor value={draft} onChange={setDraft} rows={18} />
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save primary resume
            </button>
            {hasPrimary && (
              <button
                type="button"
                onClick={() => {
                  setDraft(primary.text);
                  setMode("view");
                }}
                className="rounded-lg border border-luxury-border px-4 py-2.5 text-[13px] font-medium text-luxury-body hover:text-luxury-ink"
              >
                Cancel
              </button>
            )}
          </div>
        </section>
      )}

      {hasPrimary && (
        <p className="mt-6 text-[12px] text-luxury-caption">
          Create variants in{" "}
          <Link to="/resume/versions" className="text-luxury-accent hover:underline">
            Resume Versions
          </Link>
          {" "}or tailor for a role in{" "}
          <Link to="/resume/tailor" className="text-luxury-accent hover:underline">
            Tailor to Job
          </Link>
          .
        </p>
      )}
    </div>
  );
}

function ActionBtn({ icon: Icon, label, onClick, loading, primary }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={
        primary
          ? "inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-3 py-2 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-60"
          : "inline-flex items-center gap-2 rounded-lg border border-luxury-border px-3 py-2 text-[13px] font-medium text-luxury-body hover:border-luxury-accent/30 hover:text-luxury-ink disabled:opacity-60"
      }
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      )}
      {label}
    </button>
  );
}
