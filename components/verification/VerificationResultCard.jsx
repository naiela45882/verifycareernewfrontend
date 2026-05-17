import RiskBadge from "./RiskBadge";
import FingerprintMini from "./FingerprintMini";
import { toScamRisk } from "../../lib/scamRisk";

export default function VerificationResultCard({ result }) {
  if (!result) return null;

  const scamRisk =
    result.riskScore != null && result.trustScore == null
      ? result.riskScore
      : toScamRisk({ trustScore: result.trustScore, type: "recruiter" });

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-luxury-ink">
          Verification result
        </h2>
        <RiskBadge tier={result.riskTier} score={scamRisk} />
      </header>

      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
            Scam risk
          </dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums text-luxury-ink">
            {scamRisk}
          </dd>
        </div>
        {result.trustScore != null && (
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Entity trust rating
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-luxury-accent">
              {result.trustScore}
            </dd>
          </div>
        )}
        {result.scanId && (
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Scan ID
            </dt>
            <dd className="mt-1 font-mono text-[12px] text-luxury-body">{result.scanId}</dd>
          </div>
        )}
      </dl>

      {result.fingerprint && (
        <div className="mt-4 border-t border-luxury-border/60 pt-4">
          <FingerprintMini value={result.fingerprint} />
        </div>
      )}
    </section>
  );
}
