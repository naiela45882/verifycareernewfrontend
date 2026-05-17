import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useScamReport } from "../../hooks/useForum";
import { normalizeId } from "../../lib/normalizeId";
import ReportDetail from "../../components/community/ReportDetail";
import SimilarReports from "../../components/community/SimilarReports";
import CommentsThread from "../../components/community/CommentsThread";
import TrustIntelligencePanel from "../../components/trust/TrustIntelligencePanel";

export default function ScamReportDetailPage() {
  const { id: routeId } = useParams();
  const reportId = normalizeId(routeId);
  const navigate = useNavigate();
  const { report, loading, addComment, deleteReport } = useScamReport(reportId);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (routeId && !reportId) {
      navigate("/community/scam-reports", { replace: true });
    }
  }, [routeId, reportId, navigate]);

  const handleComment = async (body) => {
    setCommentLoading(true);
    try {
      await addComment(body);
      toast.success("Comment added");
    } catch (err) {
      toast.error(err.message || "Failed to comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this report?")) return;
    try {
      await deleteReport();
      toast.success("Report deleted");
      navigate("/community/scam-reports", { replace: true });
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-3xl h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />;
  }

  if (!report) {
    return (
      <p className="text-center text-[13px] text-luxury-coral">
        Report not found. <Link to="/community/scam-reports" className="text-luxury-accent">Back</Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/community/scam-reports" className="text-[12px] text-luxury-accent hover:underline">
        ← Scam reports
      </Link>

      <ReportDetail report={report} />

      {report.trustIntelligence && (
        <TrustIntelligencePanel trustIntelligence={report.trustIntelligence} />
      )}

      <SimilarReports reports={report.similarReports} />
      <CommentsThread comments={report.comments || []} onSubmit={handleComment} loading={commentLoading} />

      {report.isOwner && (
        <button type="button" onClick={handleDelete} className="text-[13px] font-medium text-luxury-coral hover:underline">
          Delete my report
        </button>
      )}
    </div>
  );
}
