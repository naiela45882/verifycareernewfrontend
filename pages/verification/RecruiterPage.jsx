import { useState } from "react";
import toast from "react-hot-toast";
import { useTrust } from "../../hooks/useTrust";
import TrustIntelligencePanel from "../../components/trust/TrustIntelligencePanel";
import RecruiterForm from "../../components/verification/RecruiterForm";
import BadgeList from "../../components/verification/BadgeList";
import RedFlagList from "../../components/verification/RedFlagList";
import MatchHistoryTable from "../../components/verification/MatchHistoryTable";
import SaveRecruiterButton from "../../components/verification/SaveRecruiterButton";
import ScanResultsLayout from "../../components/verification/ScanResultsLayout";
import VerificationResultCard from "../../components/verification/VerificationResultCard";
import { toScamRisk } from "../../lib/scamRisk";

const EMPTY_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  jobUrl: "",
};

export default function RecruiterPage() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
  const { loading, verifyRecruiter } = useTrust();

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const data = await verifyRecruiter(values);
      setResult(data);
      toast.success("Recruiter check complete");
    } catch (err) {
      toast.error(err.message || "Verification failed");
    }
  };

  return (
    <div className="w-full space-y-4">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
          Recruiter Check
        </h1>
        <p className="mt-1 text-[13px] text-luxury-body">
          Evidence-based checks against the intelligence graph — emails, domains, and prior reports.
        </p>
      </header>

      <RecruiterForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {result && (
        <ScanResultsLayout
          result={{ ...result, type: "recruiter" }}
          type="recruiter"
          summaryCard={
            <VerificationResultCard
              result={{
                trustScore: result.trustScore,
                riskScore: toScamRisk({ ...result, type: "recruiter" }),
                riskTier: result.riskTier,
                scanId: result.scanId,
                fingerprint: result.fingerprint,
              }}
            />
          }
          flags={result.flags}
          flagsList={<RedFlagList flags={result.flags} title="Red flags" />}
          intelligencePanel={
            <TrustIntelligencePanel
              trustIntelligence={result.trustIntelligence}
              priorReportCount={result.priorReportCount}
            />
          }
          extra={
            <>
              <BadgeList badges={result.badges} />
              <MatchHistoryTable matches={result.historyMatches} />
              <SaveRecruiterButton scanId={result.scanId} />
            </>
          }
        />
      )}
    </div>
  );
}
