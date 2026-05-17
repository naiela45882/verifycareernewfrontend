import { Link } from "react-router-dom";
import { useUploadHistory } from "../hooks/useUploadHistory";

export default function VerificationHistoryPage() {
  const { history, loading } = useUploadHistory();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-semibold text-luxury-ink">Scan History</h1>
      <p className="mt-2 text-[13px] text-luxury-body">
        Past offer letter and verification analyses.
      </p>

      <div className="mt-8 space-y-3">
        {loading && (
          <p className="text-[13px] text-luxury-caption">Loading history…</p>
        )}
        {!loading && history.length === 0 && (
          <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
            No scans yet.{" "}
            <Link to="/analyze" className="text-luxury-accent hover:underline">
              Verify an offer letter
            </Link>
          </p>
        )}
        {history.map((item) => {
          const score = item.response?.scamScore;
          const badge =
            score == null
              ? "Pending"
              : score >= 70
                ? "Suspicious"
                : score >= 40
                  ? "Review"
                  : "Verified";

          return (
            <article
              key={item._id}
              className="rounded-xl border border-luxury-border/70 bg-luxury-surface/50 px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-medium text-luxury-ink">
                  Offer scan · {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <span
                  className={
                    badge === "Verified"
                      ? "text-[11px] font-medium text-luxury-accent"
                      : badge === "Suspicious"
                        ? "text-[11px] font-medium text-luxury-coral"
                        : "text-[11px] font-medium text-luxury-caption"
                  }
                >
                  {badge}
                  {score != null ? ` · ${score}% risk` : ""}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
