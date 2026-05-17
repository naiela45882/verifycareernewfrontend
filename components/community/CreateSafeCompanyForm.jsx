import { useState } from "react";

export default function CreateSafeCompanyForm({ onSubmit, loading }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit?.({ name, website, description });
    setName("");
    setWebsite("");
    setDescription("");
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-dashed border-luxury-accent/40 bg-luxury-accent/5 py-4 text-[13px] font-medium text-luxury-accent"
      >
        + Nominate a safe company
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-4">
      <header className="flex justify-between">
        <h2 className="text-lg font-semibold text-luxury-ink">Nominate employer</h2>
        <button type="button" onClick={() => setOpen(false)} className="text-[13px] text-luxury-caption">Cancel</button>
      </header>
      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Company name" className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]" />
      <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Why is this employer trustworthy?" className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]" />
      <button type="submit" disabled={loading} className="rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-medium text-luxury-on-accent disabled:opacity-50">
        {loading ? "Submitting…" : "Submit for review"}
      </button>
    </form>
  );
}
