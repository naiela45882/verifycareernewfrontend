import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useApplications } from "../hooks/useApplications";
import { useResumeAPI } from "../hooks/useResumeAPI";
import StatusBadge from "../components/applications/StatusBadge";
import StatusTimeline from "../components/applications/StatusTimeline";
import ApplicationFormModal from "../components/applications/ApplicationFormModal";
import { APPLICATION_STATUSES } from "../components/applications/constants";

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplication, updateApplication, deleteApplication } = useApplications();
  const resumeApi = useResumeAPI();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resumeVersions, setResumeVersions] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [app, versions] = await Promise.all([
        getApplication(id),
        resumeApi.listVersions().catch(() => []),
      ]);
      setApplication(app);
      setResumeVersions(versions || []);
    } catch {
      toast.error("Application not found");
      navigate("/applications");
    } finally {
      setLoading(false);
    }
  }, [getApplication, id, navigate, resumeApi]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (status) => {
    try {
      const updated = await updateApplication(id, { status });
      setApplication(updated);
      toast.success("Status updated");
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleResumeChange = async (resumeVersionUsed) => {
    try {
      const updated = await updateApplication(id, { resumeVersionUsed });
      setApplication(updated);
      toast.success("Resume version updated");
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleEdit = async (payload) => {
    setSaving(true);
    try {
      const updated = await updateApplication(id, { ...payload, regenerateInsights: true });
      setApplication(updated);
      setEditOpen(false);
      toast.success("Application saved");
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      toast.success("Application deleted");
      navigate("/applications");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-4xl h-64 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />;
  }

  if (!application) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        to="/applications"
        className="inline-flex items-center gap-1 text-[13px] font-medium text-luxury-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        All applications
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
            {application.jobTitle}
          </h1>
          <p className="mt-1 text-[13px] text-luxury-body">{application.companyName}</p>
          <div className="mt-2">
            <StatusBadge status={application.status} />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="inline-flex items-center gap-1 rounded-lg border border-luxury-border px-3 py-2 text-[13px] text-luxury-ink hover:bg-luxury-muted/40"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1 rounded-lg border border-luxury-coral/30 px-3 py-2 text-[13px] text-luxury-coral hover:bg-luxury-coral/8"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </header>

      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-4">
        <h2 className="text-[15px] font-semibold text-luxury-ink">Status timeline</h2>
        <StatusTimeline currentStatus={application.status} />
        <div className="flex flex-wrap gap-2 pt-2">
          {APPLICATION_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleStatusChange(s)}
              className="rounded-md border border-luxury-border px-2 py-1 text-[12px] text-luxury-body hover:border-luxury-accent/40 hover:text-luxury-accent"
            >
              Set {s}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-3">
        <h2 className="text-[15px] font-semibold text-luxury-ink">Resume version</h2>
        <select
          value={application.resumeVersionUsed || ""}
          onChange={(e) => handleResumeChange(e.target.value)}
          className="w-full max-w-md rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink"
        >
          <option value="">Primary resume</option>
          {resumeVersions.map((v) => (
            <option key={v.id} value={v.versionName}>
              {v.versionName}
            </option>
          ))}
        </select>
      </section>

      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-3">
        <h2 className="text-[15px] font-semibold text-luxury-ink">Notes</h2>
        <p className="whitespace-pre-wrap text-[13px] text-luxury-body">
          {application.notes || "No notes yet."}
        </p>
      </section>

      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-3">
        <h2 className="text-[15px] font-semibold text-luxury-ink">AI insights</h2>
        <p className="text-[11px] text-luxury-caption">Placeholder — real AI analysis coming soon.</p>
        <p className="whitespace-pre-wrap text-[13px] text-luxury-body">
          {application.autoInsights || "Insights will appear after you save this application."}
        </p>
      </section>

      {application.jobLink && (
        <p className="text-[13px]">
          <a href={application.jobLink} target="_blank" rel="noreferrer" className="text-luxury-accent hover:underline">
            View job posting
          </a>
        </p>
      )}

      <ApplicationFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEdit}
        initial={application}
        resumeVersions={resumeVersions}
        saving={saving}
      />
    </div>
  );
}
