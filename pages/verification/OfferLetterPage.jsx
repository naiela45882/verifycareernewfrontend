import { useState } from "react";
import toast from "react-hot-toast";
import { useTrust } from "../../hooks/useTrust";
import TrustIntelligencePanel from "../../components/trust/TrustIntelligencePanel";
import { normalizeId } from "../../lib/normalizeId";
import TextUploadBox from "../../components/verification/TextUploadBox";
import VerificationSummaryCard from "../../components/verification/VerificationSummaryCard";
import RedFlagList from "../../components/verification/RedFlagList";
import RecruiterExtractCard from "../../components/verification/RecruiterExtractCard";
import ActionButtons from "../../components/verification/ActionButtons";
import ScanResultsLayout from "../../components/verification/ScanResultsLayout";

export default function OfferLetterPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [publishedReportId, setPublishedReportId] = useState(null);
  const { loading, analyzeOfferLetter, publishScan } = useTrust();

  const handleSubmit = async () => {
    try {
      const data = await analyzeOfferLetter(text);
      setResult(data);
      toast.success("Offer letter verified and saved");
    } catch (err) {
      toast.error(err.message || "Verification failed");
    }
  };

  return (
    <div className="w-full space-y-4">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Offer Letter Scan
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Scan offer text against scam patterns and the career intelligence graph.
        </p>
      </header>

      <TextUploadBox
        value={text}
        onChange={setText}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {result && (
        <ScanResultsLayout
          result={result}
          type="offer-letter"
          summaryCard={<VerificationSummaryCard result={result} />}
          flags={result.redFlags}
          flagsList={<RedFlagList flags={result.redFlags} />}
          intelligencePanel={
            <TrustIntelligencePanel trustIntelligence={result.trustIntelligence} />
          }
          extra={
            <>
              <RecruiterExtractCard recruiter={result.recruiter} />
              <ActionButtons
                scanId={result.scanId}
                publishedReportId={publishedReportId}
                onPublish={async (id, options) => {
                  const data = await publishScan(id, options);
                  const reportId =
                    normalizeId(data.scamReportId) || normalizeId(data.report?.id);
                  setPublishedReportId(reportId);
                  return { ...data, scamReportId: reportId };
                }}
                onReport={() => toast("Thanks — our team will review this scan.")}
              />
            </>
          }
        />
      )}
    </div>
  );
}
