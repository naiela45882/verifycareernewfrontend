import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ResumePageHeader from "../../components/resume/ResumePageHeader";
import ResumeVersionCard from "../../components/resume/ResumeVersionCard";
import ResumeVersionPreviewModal from "../../components/resume/ResumeVersionPreviewModal";
import ResumeEditor from "../../components/resume/ResumeEditor";
import { ResumeCardGridSkeleton } from "../../components/resume/LoadingSkeletons";
import { useResumeAPI } from "../../hooks/useResumeAPI";
export default function ResumeVersionsPage() {
  const api = useResumeAPI();
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [primaryText, setPrimaryText] = useState("");
  const [primaryStructured, setPrimaryStructured] = useState(null);
  const [primaryTemplateId, setPrimaryTemplateId] = useState("classic");
  const [modal, setModal] = useState(null);
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");
  const [saving, setSaving] = useState(false);
  const [viewVersion, setViewVersion] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [list, primary] = await Promise.all([
        api.listVersions(),
        api.getPrimary(),
      ]);
      setVersions(list || []);
      setPrimaryText(primary?.text || "");
      setPrimaryStructured(primary?.structured || null);
      setPrimaryTemplateId(primary?.selectedTemplateId || "classic");
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
    setFormText(primaryText);
    setModal("create");
  };

  const openEdit = (v) => {
    setFormName(v.versionName);
    setFormText(v.text);
    setModal({ type: "edit", id: v.id });
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
        await api.createVersion({
          versionName,
          text,
          structured: primaryStructured || undefined,
          selectedTemplateId: primaryTemplateId,
        });
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
        description="Create tailored copies from your primary resume without overwriting the master."
        action={
          <button
            type="button"
            onClick={openCreate}
            disabled={!primaryText}
            className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            New version
          </button>
        }
      />

      {!primaryText && !loading && (
        <p className="mb-4 rounded-lg border border-luxury-coral/25 bg-luxury-coral/8 px-4 py-3 text-[13px] text-luxury-coral">
          Add a primary resume first before creating versions.
        </p>
      )}

      {loading ? (
        <ResumeCardGridSkeleton count={3} />
      ) : versions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-luxury-border bg-luxury-muted/20 p-10 text-center">
          <p className="text-[14px] font-medium text-luxury-ink">No versions yet</p>
          <p className="mt-1 text-[13px] text-luxury-body">
            Versions are copies of your primary resume for different roles.
          </p>
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
              <label className="mt-4 mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
                Version name
              </label>
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
              />
              <label className="mb-1.5 mt-4 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
                Resume text
              </label>
              <ResumeEditor value={formText} onChange={setFormText} rows={14} />
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
