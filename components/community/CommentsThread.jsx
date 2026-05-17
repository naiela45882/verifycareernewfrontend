import { useState } from "react";
import { cn } from "../../lib/cn";

export default function CommentsThread({ comments = [], onSubmit, loading }) {
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim() || !onSubmit) return;
    await onSubmit(body.trim());
    setBody("");
  };

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <h3 className="mb-4 text-[15px] font-semibold text-luxury-ink">
        Comments ({comments.length})
      </h3>

      <ul className="mb-6 space-y-3">
        {comments.length === 0 && (
          <li className="text-[13px] text-luxury-caption">No comments yet. Be the first.</li>
        )}
        {comments.map((c) => (
          <li
            key={c.id}
            className="rounded-lg border border-luxury-border/60 bg-luxury-muted/30 px-4 py-3"
          >
            <p className="text-[12px] font-medium text-luxury-caption">
              {c.authorDisplay || c.authorName} ·{" "}
              {new Date(c.createdAt).toLocaleString()}
            </p>
            <p className="mt-1 text-[13px] text-luxury-ink">{c.body}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Add a comment…"
          className={cn(
            "w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2",
            "text-[13px] text-luxury-ink focus:border-luxury-accent/40 focus:outline-none focus:ring-2 focus:ring-luxury-accent/15"
          )}
        />
        <button
          type="submit"
          disabled={loading || !body.trim()}
          className="rounded-lg bg-luxury-accent px-4 py-2 text-[13px] font-medium text-luxury-on-accent hover:bg-luxury-accent-hover disabled:opacity-50"
        >
          {loading ? "Posting…" : "Post comment"}
        </button>
      </form>
    </section>
  );
}
