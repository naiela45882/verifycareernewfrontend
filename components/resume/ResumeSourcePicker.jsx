import { Link } from "react-router-dom";

const BUILDER_SOURCE_ID = "builder";

export default function ResumeSourcePicker({
  loading,
  sources,
  selectedId,
  onSelect,
  emptyMessage,
}) {
  if (loading) {
    return (
      <div className="mb-4 rounded-lg border border-luxury-border bg-luxury-muted/20 px-4 py-3 text-[13px] text-luxury-caption">
        Loading your resumes…
      </div>
    );
  }

  if (!sources.length) {
    return (
      <div className="mb-4 rounded-lg border border-luxury-coral/25 bg-luxury-coral/8 px-4 py-3 text-[13px] text-luxury-coral">
        {emptyMessage || (
          <>
            You need resume content first.{" "}
            <Link to="/resume" className="font-medium underline">
              Open Resume Builder
            </Link>{" "}
            and add your details, or create a version under Versions.
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-lg border border-luxury-border bg-luxury-surface p-4 shadow-soft">
      <label
        htmlFor="resume-source"
        className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption"
      >
        Which resume should we use?
      </label>
      <select
        id="resume-source"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
      >
        {sources.map((s) => (
          <option key={s.id} value={s.id}>
            {s.id === BUILDER_SOURCE_ID ? `Resume Builder — ${s.label}` : s.label}
          </option>
        ))}
      </select>
      {selectedId && (
        <p className="mt-2 text-[12px] text-luxury-body">
          {sources.find((s) => s.id === selectedId)?.description}
          {" · "}
          <Link to="/resume" className="font-medium text-luxury-accent hover:underline">
            Edit in builder
          </Link>
        </p>
      )}
    </div>
  );
}
