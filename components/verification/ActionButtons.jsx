import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { cn } from "../../lib/cn";
import { normalizeId } from "../../lib/normalizeId";

function resolvePublishedReportId(data, publishedReportId) {
  return (
    normalizeId(data?.scamReportId) ||
    normalizeId(data?.report?.id) ||
    normalizeId(publishedReportId)
  );
}

export default function ActionButtons({
  scanId,
  publishedReportId,
  onPublish,
  onReport,
  saved = true,
}) {
  const navigate = useNavigate();
  const [publishing, setPublishing] = useState(false);
  const [reportId, setReportId] = useState(() => normalizeId(publishedReportId));

  useEffect(() => {
    const next = normalizeId(publishedReportId);
    if (next) setReportId(next);
  }, [publishedReportId]);

  const published = Boolean(reportId);

  const goToReport = (id) => {
    const safeId = normalizeId(id);
    if (!safeId) {
      toast.error("Report was published but the link is missing. Open Scam Reports from the sidebar.");
      return;
    }
    navigate(`/community/scam-reports/${safeId}`);
  };

  const handlePublish = async (anonymous) => {
    if (!scanId || !onPublish || published) return;
    setPublishing(true);
    try {
      const data = await onPublish(scanId, { anonymous });
      const id = resolvePublishedReportId(data, publishedReportId);
      if (!id) {
        throw new Error("Published, but no report id returned. Restart the backend and try again.");
      }
      setReportId(id);
      const publishedLabel = anonymous
        ? "Published anonymously to Scam Reports."
        : "Published to Scam Reports with your name.";
      toast.success(
        (t) => (
          <span>
            {publishedLabel}{" "}
            <button
              type="button"
              className="font-medium underline"
              onClick={() => {
                toast.dismiss(t.id);
                goToReport(id);
              }}
            >
              View report
            </button>
          </span>
        ),
        { duration: 6000 }
      );
    } catch (err) {
      toast.error(err.message || "Could not publish");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <section className="flex flex-wrap gap-2">
      {published ? (
        <button
          type="button"
          onClick={() => goToReport(reportId)}
          className={cn(
            "rounded-lg border border-luxury-accent/35 bg-luxury-accent/10 px-4 py-2.5",
            "text-[13px] font-medium text-luxury-accent hover:bg-luxury-accent/15"
          )}
        >
          View in Scam Reports
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => handlePublish(false)}
            disabled={!scanId || publishing}
            className={cn(
              "rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent shadow-soft",
              "hover:bg-luxury-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {publishing ? "Publishing…" : "Publish"}
          </button>
          <button
            type="button"
            onClick={() => handlePublish(true)}
            disabled={!scanId || publishing}
            className={cn(
              "rounded-lg border border-luxury-border bg-luxury-muted/40 px-4 py-2.5 text-[13px] font-medium",
              "text-luxury-ink transition-all hover:border-luxury-accent/35 hover:shadow-soft",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {publishing ? "Publishing…" : "Publish Anonymously"}
          </button>
        </>
      )}

      {saved && scanId && !published && (
        <Link
          to={`/trust/history/${scanId}`}
          className="rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent shadow-soft hover:bg-luxury-accent-hover"
        >
          Save Scan · View detail
        </Link>
      )}

      <button
        type="button"
        onClick={onReport}
        className="rounded-lg border border-luxury-coral/25 px-4 py-2.5 text-[13px] font-medium text-luxury-coral hover:bg-luxury-coral/5"
      >
        Report Problem
      </button>
    </section>
  );
}
