import { useMemo, useState } from "react";
import { cn } from "../../lib/cn";

function CommentNode({ comment, replies, onReply, depth = 0 }) {
  const [replying, setReplying] = useState(false);
  const [replyBody, setReplyBody] = useState("");

  const submitReply = async (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return;
    await onReply(replyBody.trim(), comment.id);
    setReplyBody("");
    setReplying(false);
  };

  return (
    <li className={cn(depth > 0 && "ml-6 border-l border-luxury-border pl-4")}>
      <div className="rounded-lg border border-luxury-border/60 bg-luxury-muted/30 px-4 py-3">
        <p className="text-[12px] font-medium text-luxury-caption">
          {comment.authorName} · {new Date(comment.createdAt).toLocaleString()}
        </p>
        <p className="mt-1 text-[13px] text-luxury-ink">{comment.body}</p>
        {depth < 2 && (
          <button
            type="button"
            onClick={() => setReplying((v) => !v)}
            className="mt-2 text-[12px] text-luxury-accent hover:underline"
          >
            Reply
          </button>
        )}
      </div>

      {replying && (
        <form onSubmit={submitReply} className="mt-2 space-y-2">
          <textarea
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-luxury-border bg-luxury-surface px-3 py-2 text-[13px]"
            placeholder="Write a reply…"
          />
          <button type="submit" className="text-[12px] font-medium text-luxury-accent">
            Post reply
          </button>
        </form>
      )}

      {replies.length > 0 && (
        <ul className="mt-3 space-y-3">
          {replies.map((r) => (
            <CommentNode
              key={r.id}
              comment={r}
              replies={[]}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ThreadedComments({ comments = [], onSubmit }) {
  const [body, setBody] = useState("");

  const tree = useMemo(() => {
    const roots = comments.filter((c) => !c.parentId);
    const byParent = comments.reduce((acc, c) => {
      const key = c.parentId ? String(c.parentId) : "";
      if (!acc[key]) acc[key] = [];
      acc[key].push(c);
      return acc;
    }, {});

    return roots.map((root) => ({
      ...root,
      replies: byParent[String(root.id)] || [],
    }));
  }, [comments]);

  const handleTop = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    await onSubmit?.(body.trim(), null);
    setBody("");
  };

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <h3 className="mb-4 text-[15px] font-semibold text-luxury-ink">Discussion thread</h3>

      <ul className="mb-6 space-y-4">
        {tree.map((node) => (
          <CommentNode
            key={node.id}
            comment={node}
            replies={node.replies}
            onReply={onSubmit}
          />
        ))}
      </ul>

      <form onSubmit={handleTop} className="space-y-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Join the discussion…"
          className="w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px]"
        />
        <button
          type="submit"
          disabled={!body.trim()}
          className="rounded-lg bg-luxury-accent px-4 py-2 text-[13px] font-medium text-luxury-on-accent disabled:opacity-50"
        >
          Post comment
        </button>
      </form>
    </section>
  );
}
