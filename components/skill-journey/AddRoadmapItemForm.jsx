import { useState } from "react";
import { Plus } from "lucide-react";
import { ROADMAP_TYPES } from "./constants";

const inputClass =
  "w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40";

export default function AddRoadmapItemForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    type: "task",
    title: "",
    description: "",
    skillGroup: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await onAdd(form);
    setForm({ type: "task", title: "", description: "", skillGroup: "" });
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-luxury-border px-4 py-2.5 text-[13px] font-medium text-luxury-accent hover:border-luxury-accent/40"
      >
        <Plus className="h-4 w-4" />
        Add custom item
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-luxury-border bg-luxury-surface p-4 space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
            Type
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className={inputClass}
          >
            {ROADMAP_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
            Skill group
          </label>
          <input
            value={form.skillGroup}
            onChange={(e) => setForm((f) => ({ ...f, skillGroup: e.target.value }))}
            className={inputClass}
            placeholder="e.g. TypeScript"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
          Title
        </label>
        <input
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className={inputClass}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={2}
          className={inputClass}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-luxury-accent px-4 py-2 text-[13px] font-medium text-luxury-on-accent"
        >
          Add item
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-luxury-border px-4 py-2 text-[13px] text-luxury-body"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
