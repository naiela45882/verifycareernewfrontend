import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Plus, Loader2, FileDown } from "lucide-react";
import toast from "react-hot-toast";
import ResumePageHeader from "../../components/resume/ResumePageHeader";
import ResumeVersionCard from "../../components/resume/ResumeVersionCard";
import ResumeVersionPreviewModal from "../../components/resume/ResumeVersionPreviewModal";
import ResumeEditor from "../../components/resume/ResumeEditor";
import ResumeFeatureGuide from "../../components/resume/ResumeFeatureGuide";
import { ResumeCardGridSkeleton } from "../../components/resume/LoadingSkeletons";
import { useResumeAPI } from "../../hooks/useResumeAPI";
import { structuredToPlainText } from "../../lib/structuredToText";
import { hasStructuredContent } from "../../lib/resumeSchema";

const VERSION_GUIDE_STEPS = [
  {
    title: "Create a named copy",
    description:
      "Each version is its own resume (e.g. “Software Engineer” or “Product Manager”). Give it a name and paste or type the content.",
  },
  {
    title: "Optional: start from Resume Builder",
    description:
      "When creating a version, use “Import from builder” to copy your current builder resume — or start from scratch.",
  },
  {
    title: "Use versions elsewhere",
    description:
      "Pick a saved version when running Feedback or Tailor to Job, or attach one to an application.",
  },
];

export default function ResumeVersionsPage() {
  const api = useResumeAPI();
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");
  const [saving, setSaving] = useState(false);
  const [importingBuilder, setImportingBuilder] = useState(false);
  const [viewVersion, setViewVersion] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await api.listVersions();
      setVersions(list || []);
    } catch {
      toast.error("Could not load versions");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setFormName(`Version ${versions.length + 1}`);
    setFormText("");
    setModal("create");
  };

  const openEdit = (v) => {
    setFormName(v.versionName);
    setFormText(v.text);
    setModal({ type: "edit", id: v.id });
  };

  const fillFromBuilder = async () => {
    setImportingBuilder(true);
    try {
      const primary = await api.getPrimary();
      const text =
        primary?.text?.trim() ||
        (hasStructuredContent(primary?.structured)
          ? structuredToPlainText(primary.structured)
          : "");
      if (!text) {
        toast.error("Resume Builder is empty — add content there first, or paste text here.");
        return;
      }
      setFormText(text);
      toast.success("Imported from Resume Builder");
    } catch (err) {
      toast.error(err.message || "Could not load builder resume");
    } finally {
      setImportingBuilder(false);
    }
  };

  const handleSave = async () => {
    const versionName = formName.trim();
    const text = formText.trim();
    if (!versionName || !text) {
      toast.error("Name and resume text are required");
      return;
    }
    setSaving(true);
    try {
      if (modal === "create") {
        await api.createVersion({ versionName, text });
        toast.success("Version created");
      } else if (modal?.type === "edit") {
        await api.updateVersion(modal.id, { versionName, text });
        toast.success("Version updated");
      }
      setModal(null);
      await load();
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicate = async (v) => {
    try {
      await api.createVersion({
        versionName: `${v.versionName} (copy)`,
        text: v.text,
        structured: v.structured,
        selectedTemplateId: v.selectedTemplateId,
      });
      toast.success("Duplicated");
      await load();
    } catch (err) {
      toast.error(err.message || "Duplicate failed");
    }
  };

  const handleDelete = async (v) => {
    if (!window.confirm(`Delete "${v.versionName}"?`)) return;
    try {
      await api.deleteVersion(v.id);
      toast.success("Deleted");
      if (viewVersion?.id === v.id) setViewVersion(null);
      await load();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <ResumePageHeader
        title="Resume Versions"
        description="Save separate resumes for different roles. Versions are independent — you don't need a primary resume to create one."
        action={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover"
          >
            <Plus className="h-4 w-4" />
            New version
          </button>
        }
      />

      <ResumeFeatureGuide steps={VERSION_GUIDE_STEPS} />

      {loading ? (
        <ResumeCardGridSkeleton count={3} />
      ) : versions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-luxury-border bg-luxury-muted/20 p-10 text-center">
          <p className="text-[14px] font-medium text-luxury-ink">No versions yet</p>
          <p className="mx-auto mt-2 max-w-md text-[13px] text-luxury-body">
            Click <strong className="font-medium text-luxury-ink">New version</strong>, name it
            (e.g. “Backend role”), then paste your resume text — or import from{" "}
            <Link to="/resume" className="font-medium text-luxury-accent hover:underline">
              Resume Builder
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2 text-[13px] font-medium text-luxury-on-accent"
          >
            <Plus className="h-4 w-4" />
            Create your first version
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {versions.map((v) => (
            <ResumeVersionCard
              key={v.id}
              version={v}
              onOpen={() => setViewVersion(v)}
              onEdit={() => openEdit(v)}
              onDuplicate={() => handleDuplicate(v)}
              onDelete={() => handleDelete(v)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {viewVersion && (
          <ResumeVersionPreviewModal
            key={viewVersion.id}
            version={viewVersion}
            onClose={() => setViewVersion(null)}
          />
        )}
      </AnimatePresence>

      {modal && (
        <ModalOverlay onClose={() => setModal(null)}>
          <>
            <h2 className="text-lg font-semibold text-luxury-ink">
              {modal === "create" ? "New version" : "Edit version"}
            </h2>
            <p className="mt-1 text-[12px] text-luxury-body">
              {modal === "create"
                ? "Paste or type the full resume for this role-specific copy."
                : "Update the name or text for this saved version."}
            </p>
            <label className="mt-4 mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Version name
            </label>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Software Engineer — Acme Corp"
              className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
            />
            {modal === "create" && (
              <button
                type="button"
                onClick={fillFromBuilder}
                disabled={importingBuilder}
                className="mt-3 inline-flex items-center gap-2 text-[12px] font-medium text-luxury-accent hover:underline disabled:opacity-60"
              >
                {importingBuilder ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <FileDown className="h-3.5 w-3.5" />
                )}
                Import from Resume Builder (optional)
              </button>
            )}
            <label className="mb-1.5 mt-4 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Resume text
            </label>
            <ResumeEditor
              value={formText}
              onChange={setFormText}
              rows={14}
              placeholder="Paste your full resume here…"
            />
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save version
            </button>
          </>
        </ModalOverlay>
      )}
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-elevated"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button
          type="button"
          onClick={onClose}
          className="mb-2 text-[12px] text-luxury-caption hover:text-luxury-ink"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
