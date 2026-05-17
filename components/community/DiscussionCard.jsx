import { Link } from "react-router-dom";
import { ChevronRight, MessageCircle } from "lucide-react";
import Tags from "./Tags";
import LikeButton from "./LikeButton";

export default function DiscussionCard({ post, compact }) {
  return (
    <article className="rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            to={`/community/discussions/${post.id}`}
            className="text-[15px] font-semibold text-luxury-ink hover:text-luxury-accent"
          >
            {post.title}
          </Link>
          {!compact && (
            <p className="mt-2 line-clamp-2 text-[13px] text-luxury-body">{post.body}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Tags items={post.tags} />
            <span className="text-[11px] text-luxury-caption">
              {post.authorName} · {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <Link to={`/community/discussions/${post.id}`} className="shrink-0 text-luxury-caption hover:text-luxury-accent">
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-4 border-t border-luxury-border/50 pt-3">
        <LikeButton liked={post.liked} count={post.likeCount} readOnly />
        <span className="inline-flex items-center gap-1 text-[12px] text-luxury-caption">
          <MessageCircle className="h-3.5 w-3.5" />
          {post.commentCount} comments
        </span>
      </div>
    </article>
  );
}
