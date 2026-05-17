import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSignal } from "../../hooks/useTrust";
import { normalizeId } from "../../lib/normalizeId";
import { cn } from "../../lib/cn";
import { signalTypeLabel } from "../../components/community/signalConstants";
import RedFlagList from "../../components/verification/RedFlagList";
import RiskBadge from "../../components/verification/RiskBadge";

function OpenLink({ to, label, description }) {
  if (!to) return null;
  return (
    <Link
      to={to}
      className="group flex items-center justify-between gap-3 rounded-xl border border-luxury-border bg-luxury-surface px-4 py-3 transition-all hover:border-luxury-accent/35 hover:shadow-soft"
    >
      <div>
        <p className="text-[13px] font-medium text-luxury-ink">{label}</p>
        {description && (
          <p className="mt-0.5 text-[12px] text-luxury-caption">{description}</p>
        )}
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-luxury-caption transition-transform group-hover:translate-x-0.5 group-hover:text-luxury-accent" />
    </Link>
  );
}

export default function SignalDetailPage() {
  const { id: routeId } = useParams();
  const signalId = normalizeId(routeId);
  const navigate = useNavigate();
  const { signal, loading, error } = useSignal(signalId);

  if (routeId && !signalId) {
    navigate("/community/signals", { replace: true });
    return null;
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />
    );
  }

  if (error || !signal) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[13px] text-luxury-coral">{error?.message || "Signal not found"}</p>
        <Link
          to="/community/signals"
          className="mt-4 inline-block text-[13px] text-luxury-accent hover:underline"
        >
          Back to signal feed
        </Link>
      </div>
    );
  }

  const { links, evidence, node } = signal;
  const companyPath = links.companySlug
    ? `/trust/company/${links.companySlug}`
    : links.companyId
      ? `/trust/company/${links.companyId}`
      : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <Link
          to="/community/signals"
          className="text-[12px] text-luxury-accent hover:underline"
        >
          ← Signal feed
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
              signal.category === "risk"
                ? "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-200"
                : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
            )}
          >
            {signal.category === "risk" ? "Warning" : "Reassurance"}
          </span>
          <span className="text-[11px] text-luxury-caption">
            {signalTypeLabel(signal.type)}
          </span>
        </div>
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-luxury-ink">
          {signal.headline}
        </h1>
        <p className="mt-1 text-[13px] text-luxury-caption">
          {new Date(signal.createdAt).toLocaleString()}
          {signal.weight != null && (
            <> · Impact {signal.weight > 0 ? "+" : ""}{signal.weight} on trust graph</>
          )}
        </p>
      </header>

      {node && (
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5">
          <h2 className="text-[13px] font-semibold text-luxury-ink">Linked entity</h2>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
                Type
              </dt>
              <dd className="mt-1 capitalize text-[13px] text-luxury-ink">{node.type}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
                Name
              </dt>
              <dd className="mt-1 text-[13px] text-luxury-ink">
                {node.displayName || node.canonicalKey}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
                Trust rating
              </dt>
              <dd className="mt-1 text-[13px] tabular-nums text-luxury-ink">
                {node.trustScore ?? "—"}/100
              </dd>
            </div>
          </dl>
        </section>
      )}

      {evidence?.kind === "signal_report" && (
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5 space-y-4">
          <h2 className="text-[13px] font-semibold text-luxury-ink">Source evidence</h2>
          {evidence.title && (
            <p className="text-[14px] font-medium text-luxury-ink">{evidence.title}</p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <RiskBadge tier={evidence.riskTier} score={evidence.riskScore} />
            <span className="text-[12px] capitalize text-luxury-caption">
              {evidence.source?.replace(/_/g, " ")}
            </span>
          </div>
          {evidence.redFlags?.length > 0 && (
            <RedFlagList flags={evidence.redFlags} />
          )}
        </section>
      )}

      {evidence?.kind === "company" && (
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5">
          <h2 className="text-[13px] font-semibold text-luxury-ink">Company</h2>
          <p className="mt-2 text-[14px] font-medium text-luxury-ink">{evidence.name}</p>
          {evidence.domain && (
            <p className="mt-1 text-[12px] text-luxury-caption">{evidence.domain}</p>
          )}
        </section>
      )}

      <section className="space-y-2">
        <h2 className="text-[13px] font-semibold text-luxury-ink">Open related</h2>
        <OpenLink
          to={links.scanId ? `/trust/history/${links.scanId}` : null}
          label="View verification scan"
          description="See the full offer letter or recruiter check that produced this signal"
        />
        <OpenLink
          to={links.scamReportId ? `/community/scam-reports/${links.scamReportId}` : null}
          label="View scam report"
          description="Read the community report tied to this signal"
        />
        <OpenLink
          to={companyPath}
          label="View company trust"
          description="Company trust rating and linked intelligence"
        />
        {node && links.nodeId && !companyPath && (
          <p className="rounded-lg border border-dashed border-luxury-border px-4 py-3 text-[12px] text-luxury-caption">
            Entity details for this {node.type} are shown above. Run a{" "}
            <Link to="/trust/company" className="text-luxury-accent hover:underline">
              company lookup
            </Link>{" "}
            if you have a company name.
          </p>
        )}
      </section>

      {signal.label && (
        <p className="text-[12px] text-luxury-caption">
          Note: {signal.label}
        </p>
      )}
    </div>
  );
}
