import { useState } from "react";
import { cn } from "../../lib/cn";

export default function CreateScamReportForm({ scamTypes = [], onSubmit, loading }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    scamType: scamTypes[0] || "Other",
    textExtract: "",
    anonymous: true,
  });

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit?.(form);
    setForm({
      title: "",
      description: "",
      scamType: scamTypes[0] || "Other",
      textExtract: "",
      anonymous: true,
    });
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-dashed border-luxury-coral/40 bg-luxury-coral/5 py-4 text-[13px] font-medium text-luxury-coral hover:border-luxury-coral/60"
      >
        + Publish a scam report
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-4"
    >
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-luxury-ink">New scam report</h2>
        <button type="button" onClick={() => setOpen(false)} className="text-[13px] text-luxury-caption">
          Cancel
        </button>
      </header>

      <label className="block">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">Title</span>
        <input
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]"
        />
      </label>

      <label className="block">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">Scam type</span>
        <select
          value={form.scamType}
          onChange={(e) => set("scamType", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]"
        >
          {scamTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">Your experience</span>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]"
        />
      </label>

      <label className="block">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          Offer letter text (optional)
        </span>
        <textarea
          rows={3}
          value={form.textExtract}
          onChange={(e) => set("textExtract", e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]"
        />
      </label>

      <label className="flex items-center gap-2 text-[13px] text-luxury-body">
        <input
          type="checkbox"
          checked={form.anonymous}
          onChange={(e) => set("anonymous", e.target.checked)}
          className="rounded border-luxury-border"
        />
        Publish anonymously
      </label>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "rounded-lg bg-luxury-coral px-5 py-2.5 text-[13px] font-medium text-white",
          "hover:opacity-90 disabled:opacity-50"
        )}
      >
        {loading ? "Analyzing & publishing…" : "Publish report"}
      </button>
    </form>
  );
}
