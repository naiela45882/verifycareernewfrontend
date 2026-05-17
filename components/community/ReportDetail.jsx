import RiskBadge from "./RiskBadge";
import Tags from "./Tags";
import RedFlagList from "../verification/RedFlagList";
import RecruiterExtractCard from "../verification/RecruiterExtractCard";

export default function ReportDetail({ report }) {
  if (!report) return null;

  return (
    <section className="space-y-6">
      <article className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft lg:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
              {report.title}
            </h1>
            <p className="mt-2 text-[13px] text-luxury-body">
              {report.authorDisplay} · {new Date(report.createdAt).toLocaleString()}
            </p>
            <Tags items={report.tags || [report.scamType]} className="mt-3" />
          </div>
          <RiskBadge score={report.riskScore} tier={report.riskTier} />
        </div>

        <p className="mt-6 text-[14px] leading-relaxed text-luxury-ink whitespace-pre-wrap">
          {report.description}
        </p>

        {report.textExtract && (
          <details className="mt-4 rounded-lg border border-luxury-border/60 bg-luxury-muted/30 p-4">
            <summary className="cursor-pointer text-[13px] font-medium text-luxury-ink">
              Attached offer letter text
            </summary>
            <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap text-[12px] text-luxury-body">
              {report.textExtract}
            </pre>
          </details>
        )}
      </article>

      <RedFlagList flags={report.redFlags || []} />
      {(report.recruiter?.email || report.recruiter?.name) && (
        <RecruiterExtractCard recruiter={report.recruiter} />
      )}
    </section>
  );
}
