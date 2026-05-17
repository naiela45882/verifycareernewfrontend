import { useState } from "react";
import toast from "react-hot-toast";
import { useScamReports, useForumMeta } from "../../hooks/useForum";
import ScamReportCard from "../../components/community/ScamReportCard";
import CreateScamReportForm from "../../components/community/CreateScamReportForm";

export default function ScamReportsPage() {
  const { scamTypes } = useForumMeta();
  const { reports, loading, createReport } = useScamReports();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (payload) => {
    setSubmitting(true);
    try {
      await createReport(payload);
      toast.success("Scam report published with AI analysis");
    } catch (err) {
      toast.error(err.message || "Failed to publish");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Scam Reports
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Anonymous community warnings with automatic risk scoring and red flag extraction.
        </p>
      </header>

      <CreateScamReportForm scamTypes={scamTypes} onSubmit={handleCreate} loading={submitting} />

      <section className="space-y-3">
        {loading && <div className="h-24 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />}
        {!loading && reports.length === 0 && (
          <p className="rounded-xl border border-dashed border-luxury-border p-8 text-center text-[13px] text-luxury-caption">
            No reports yet. Share your experience to protect others.
          </p>
        )}
        {reports.map((report) => (
          <ScamReportCard key={report.id} report={report} />
        ))}
      </section>
    </div>
  );
}
