import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useApplications } from "../hooks/useApplications";
import { useResumeAPI } from "../hooks/useResumeAPI";
import ApplicationsFilters from "../components/applications/ApplicationsFilters";
import ApplicationsTable from "../components/applications/ApplicationsTable";
import ApplicationFormModal from "../components/applications/ApplicationFormModal";

export default function ApplicationsPage() {
  const [filters, setFilters] = useState({ status: "", search: "", sort: "date-desc" });
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resumeVersions, setResumeVersions] = useState([]);

  const queryFilters = useMemo(
    () => ({
      status: filters.status || undefined,
      search: filters.search || undefined,
      sort: filters.sort,
    }),
    [filters]
  );

  const { applications, loading, createApplication } = useApplications(queryFilters);
  const resumeApi = useResumeAPI();

  const openCreate = async () => {
    try {
      const versions = await resumeApi.listVersions();
      setResumeVersions(versions || []);
    } catch {
      setResumeVersions([]);
    }
    setModalOpen(true);
  };

  const handleCreate = async (payload) => {
    setSaving(true);
    try {
      await createApplication(payload);
      toast.success("Application created");
      setModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to create");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
            Applications Tracker
          </h1>
          <p className="mt-1 text-[13px] text-luxury-body">
            Track every role, status, and resume version in your hiring pipeline.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover"
        >
          <Plus className="h-4 w-4" />
          New application
        </button>
      </header>

      <ApplicationsFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />
      ) : applications.length === 0 && !filters.search && !filters.status ? (
        <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
          No applications yet. Add your first role to start tracking.
        </p>
      ) : (
        <ApplicationsTable applications={applications} />
      )}

      <ApplicationFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        resumeVersions={resumeVersions}
        saving={saving}
      />
    </div>
  );
}
