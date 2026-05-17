import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { APPLICATION_STATUSES } from "./constants";

const EMPTY = {
  jobTitle: "",
  companyName: "",
  jobLink: "",
  jobDescription: "",
  status: "Saved",
  appliedDate: "",
  notes: "",
  resumeVersionUsed: "",
  jobPostingText: "",
};

const inputClass =
  "w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40";

export default function ApplicationFormModal({
  open,
  onClose,
  onSubmit,
  initial,
  resumeVersions = [],
  saving,
}) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        jobTitle: initial.jobTitle || "",
        companyName: initial.companyName || "",
        jobLink: initial.jobLink || "",
        jobDescription: initial.jobDescription || "",
        status: initial.status || "Saved",
        appliedDate: initial.appliedDate
          ? new Date(initial.appliedDate).toISOString().slice(0, 10)
          : "",
        notes: initial.notes || "",
        resumeVersionUsed: initial.resumeVersionUsed || "",
        jobPostingText: initial.jobPostingText || "",
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, initial]);

  if (!open) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      appliedDate: form.appliedDate || null,
    });
  };

  return (
    <ModalOverlay onClose={onClose}>
      <h2 className="text-lg font-semibold text-luxury-ink">
        {initial ? "Edit application" : "New application"}
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <Field label="Job title" required>
          <input value={form.jobTitle} onChange={set("jobTitle")} required className={inputClass} />
        </Field>
        <Field label="Company" required>
          <input value={form.companyName} onChange={set("companyName")} required className={inputClass} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Status">
            <select value={form.status} onChange={set("status")} className={inputClass}>
              {APPLICATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Applied date">
            <input type="date" value={form.appliedDate} onChange={set("appliedDate")} className={inputClass} />
          </Field>
        </div>
        <Field label="Job link">
          <input type="url" value={form.jobLink} onChange={set("jobLink")} className={inputClass} placeholder="https://" />
        </Field>
        <Field label="Resume version used">
          <select value={form.resumeVersionUsed} onChange={set("resumeVersionUsed")} className={inputClass}>
            <option value="">Primary resume</option>
            {resumeVersions.map((v) => (
              <option key={v.id} value={v.versionName}>
                {v.versionName}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Job description">
          <textarea value={form.jobDescription} onChange={set("jobDescription")} rows={3} className={inputClass} />
        </Field>
        <Field label="Job posting text (optional)">
          <textarea value={form.jobPostingText} onChange={set("jobPostingText")} rows={3} className={inputClass} />
        </Field>
        <Field label="Notes">
          <textarea value={form.notes} onChange={set("notes")} rows={3} className={inputClass} />
        </Field>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {initial ? "Save changes" : "Create application"}
        </button>
      </form>
    </ModalOverlay>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
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
        <button type="button" onClick={onClose} className="mb-2 text-[12px] text-luxury-caption hover:text-luxury-ink">
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
