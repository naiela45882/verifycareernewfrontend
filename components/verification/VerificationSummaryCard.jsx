import FingerprintMini from "./FingerprintMini";
import RiskBadge from "./RiskBadge";

export default function VerificationSummaryCard({ result }) {
  if (!result) return null;

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft lg:p-7">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-luxury-ink">
            Verification summary
          </h2>
          <p className="mt-0.5 text-[13px] text-luxury-body">
            Analysis complete · scan saved to your archive
          </p>
        </div>
        <RiskBadge tier={result.riskTier} score={result.riskScore} />
      </header>

      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
            Scam risk
          </dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums text-luxury-ink">
            {result.riskScore}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
            Document fingerprint
          </dt>
          <dd className="mt-1">
            <FingerprintMini value={result.fingerprint} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
