import { useState } from "react";
import { Link } from "react-router-dom";
import { useVerificationHistory } from "../../hooks/useVerificationHistory";
import ScanHistoryCard from "../../components/verification/ScanHistoryCard";
import PaginatedList from "../../components/verification/PaginatedList";

export default function HistoryPage() {
  const [page, setPage] = useState(1);
  const { scans, pagination, loading } = useVerificationHistory({ page, limit: 12 });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          My Evidence
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Your saved offer letter scans and recruiter signal checks.
        </p>
      </header>

      {loading && scans.length === 0 ? (
        <div className="h-32 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />
      ) : null}

      {!loading && scans.length === 0 ? (
        <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
          No scans yet.{" "}
          <Link
            to="/trust/offer-letter"
            className="text-luxury-accent hover:underline"
          >
            Verify an offer letter
          </Link>
        </p>
      ) : (
        <PaginatedList
          page={pagination.page}
          pages={pagination.pages}
          onPageChange={setPage}
          loading={loading}
        >
          {scans.map((scan) => (
            <ScanHistoryCard key={scan.id} scan={scan} />
          ))}
        </PaginatedList>
      )}
    </div>
  );
}
