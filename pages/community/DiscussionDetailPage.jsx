import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDiscussion } from "../../hooks/useForum";
import Tags from "../../components/community/Tags";
import LikeButton from "../../components/community/LikeButton";
import ThreadedComments from "../../components/community/ThreadedComments";

export default function DiscussionDetailPage() {
  const { id } = useParams();
  const { post, comments, loading, addComment, toggleLike } = useDiscussion(id);

  if (loading) {
    return <div className="mx-auto max-w-3xl h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />;
  }

  if (!post) {
    return (
      <p className="text-center text-[13px] text-luxury-coral">
        Post not found. <Link to="/community/discussions" className="text-luxury-accent">Back</Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/community/discussions" className="text-[12px] text-luxury-accent hover:underline">
        ← Discussions
      </Link>

      <article className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink">{post.title}</h1>
        <p className="mt-2 text-[13px] text-luxury-caption">
          {post.authorName} · {new Date(post.createdAt).toLocaleString()}
        </p>
        <Tags items={post.tags} className="mt-3" />
        <p className="mt-6 whitespace-pre-wrap text-[14px] leading-relaxed text-luxury-ink">{post.body}</p>
        <div className="mt-6 border-t border-luxury-border/50 pt-4">
          <LikeButton
            liked={post.liked}
            count={post.likeCount}
            onClick={async () => {
              try {
                await toggleLike();
              } catch (err) {
                toast.error(err.message || "Could not like");
              }
            }}
          />
        </div>
      </article>

      <ThreadedComments
        comments={comments}
        onSubmit={async (body, parentId) => {
          try {
            await addComment(body, parentId);
            toast.success("Comment posted");
          } catch (err) {
            toast.error(err.message || "Comment failed");
          }
        }}
      />
    </div>
  );
}
