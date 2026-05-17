import { useState } from "react";
import Tags from "./Tags";
import { cn } from "../../lib/cn";

export default function CreateDiscussionForm({ tags = [], onSubmit, loading }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selected, setSelected] = useState([]);

  const toggleTag = (tag) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit?.({ title, body, tags: selected });
    setTitle("");
    setBody("");
    setSelected([]);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-dashed border-luxury-accent/40 bg-luxury-accent/5 py-4 text-[13px] font-medium text-luxury-accent"
      >
        + Start a discussion
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft space-y-4">
      <header className="flex justify-between">
        <h2 className="text-lg font-semibold text-luxury-ink">New discussion</h2>
        <button type="button" onClick={() => setOpen(false)} className="text-[13px] text-luxury-caption">Cancel</button>
      </header>
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]"
      />
      <textarea
        required
        rows={5}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]"
      />
      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={cn(
                "rounded-full border px-3 py-1 text-[12px]",
                selected.includes(tag)
                  ? "border-luxury-accent bg-luxury-accent/10 text-luxury-accent"
                  : "border-luxury-border text-luxury-body"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" disabled={loading} className="rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-medium text-luxury-on-accent disabled:opacity-50">
        {loading ? "Posting…" : "Post discussion"}
      </button>
    </form>
  );
}
