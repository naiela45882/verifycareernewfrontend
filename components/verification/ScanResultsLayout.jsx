import ScamRiskRadial from "../charts/ScamRiskRadial";
import RedFlagsBreakdown from "../charts/RedFlagsBreakdown";
import HowToReadScan from "./HowToReadScan";
import { toScamRisk } from "../../lib/scamRisk";
import { TrustPanel } from "../ui/TrustPanel";

export default function ScanResultsLayout({
  result,
  type = "offer-letter",
  summaryCard,
  flags = [],
  flagsList,
  intelligencePanel,
  extra,
}) {
  const scamRisk = toScamRisk({ ...result, type });
  const flagItems = flags?.length ? flags : result?.redFlags || result?.flags || [];

  return (
    <div className="space-y-4">
      <HowToReadScan />

      <div className="grid gap-4 lg:grid-cols-2">
        <ScamRiskRadial score={scamRisk} tier={result.riskTier} />
        {summaryCard}
      </div>

      {flagItems.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <TrustPanel compact title="Issues detected">
            <RedFlagsBreakdown flags={flagItems} className="p-0" hideLabel />
          </TrustPanel>
          {flagsList}
        </div>
      ) : (
        flagsList
      )}

      {intelligencePanel}
      {extra}
    </div>
  );
}
