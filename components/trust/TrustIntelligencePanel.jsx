import { Link } from "react-router-dom";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "../../lib/cn";
import {
  TrustPanel,
  TrustMessageList,
  TrustInlineAlert,
} from "../ui/TrustPanel";

export default function TrustIntelligencePanel({
  trustIntelligence,
  priorReportCount,
  className,
}) {
  const { riskSignals = [], trustSignals = [] } = trustIntelligence || {};
  const hasPrior = priorReportCount > 0;
  const hasWarnings = riskSignals.length > 0;
  const hasReassurances = trustSignals.length > 0;

  if (!hasPrior && !hasWarnings && !hasReassurances) return null;

  return (
    <div className={cn("space-y-4", className)}>
      {hasPrior && (
        <TrustInlineAlert variant="caution">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-luxury-sun" />
          <span>
            This identity has {priorReportCount} prior report
            {priorReportCount !== 1 ? "s" : ""} in the system.
          </span>
        </TrustInlineAlert>
      )}

      {hasWarnings && (
        <TrustPanel
          compact
          title={
            <span className="inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-luxury-coral" />
              Warnings
            </span>
          }
        >
          <TrustMessageList items={riskSignals} variant="warn" />
        </TrustPanel>
      )}

      {hasReassurances && (
        <TrustPanel
          compact
          title={
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-luxury-accent" />
              Reassurances
            </span>
          }
        >
          <TrustMessageList items={trustSignals} variant="safe" />
        </TrustPanel>
      )}

      <p className="text-[11px] text-luxury-caption">
        <Link to="/trust/company" className="text-luxury-accent hover:underline">
          Company trust lookup
        </Link>
        {" · "}
        <Link to="/community/signals" className="text-luxury-accent hover:underline">
          Signal feed
        </Link>
      </p>
    </div>
  );
}
