import { useState } from "react";
import toast from "react-hot-toast";
import { useDiscussions, useForumMeta } from "../../hooks/useForum";
import DiscussionCard from "../../components/community/DiscussionCard";
import CreateDiscussionForm from "../../components/community/CreateDiscussionForm";
import TagFilter from "../../components/community/TagFilter";
import SortTabs from "../../components/community/SortTabs";

export default function DiscussionsPage() {
  const [sort, setSort] = useState("recent");
  const [tag, setTag] = useState("");
  const { discussionTags } = useForumMeta();
  const { posts, tags, loading, createPost } = useDiscussions({ sort, tag });
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (payload) => {
    setSubmitting(true);
    try {
      await createPost(payload);
      toast.success("Discussion posted");
    } catch (err) {
      toast.error(err.message || "Failed to post");
    } finally {
      setSubmitting(false);
    }
  };

  const filterTags = discussionTags.length ? discussionTags : tags;

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Discussions
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Career Q&A, job search advice, and fraud alerts from the community.
        </p>
      </header>

      <CreateDiscussionForm tags={filterTags} onSubmit={handleCreate} loading={submitting} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SortTabs value={sort} onChange={setSort} />
        <TagFilter tags={filterTags} active={tag} onChange={setTag} />
      </div>

      <section className="space-y-3">
        {loading && <div className="h-24 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />}
        {!loading && posts.length === 0 && (
          <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
            No discussions yet. Start the conversation.
          </p>
        )}
        {posts.map((post) => (
          <DiscussionCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
