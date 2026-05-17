import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import NeedleProgress from "../NeedleProgress";
import { useSkillJourney } from "../../../hooks/useSkillJourney";

export default function SkillJourney({ loading: dashboardLoading, compact = true }) {
  const { journey, loading: journeyLoading } = useSkillJourney();
  const loading = dashboardLoading || journeyLoading;

  if (loading) {
    return (
      <section className="h-full min-h-[200px] animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />
    );
  }

  const targetRole = journey?.targetRole || "Define your target role";
  const percent = journey?.completionPercent ?? 0;
  const gapCount = journey?.missingSkills?.length ?? 0;
  const skills = journey?.existingSkills?.slice(0, 3) || [];

  return (
    <section className="flex h-full flex-col rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft lg:p-6">
      <header className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-luxury-ink">
            Skill journey
          </h2>
          <p className="mt-0.5 text-[13px] text-luxury-body">
            {journey
              ? `${percent}% toward your target`
              : "Map skills to your career target"}
          </p>
        </div>
        <Link
          to={journey ? "/journey" : "/journey/target"}
          className="inline-flex shrink-0 items-center gap-0.5 text-[12px] font-medium text-luxury-accent hover:text-luxury-accent-hover"
        >
          {journey ? "View all" : "Set target"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </header>

      <div className="space-y-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
            Target
          </p>
          <p className="mt-1 line-clamp-2 text-[14px] font-medium text-luxury-ink">
            {targetRole}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Gap skills
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-luxury-accent">
              {gapCount}
            </p>
          </div>
          {!compact && skills.length > 0 && (
            <div className="flex flex-wrap justify-end gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-luxury-border bg-luxury-muted/50 px-2 py-0.5 text-[11px] text-luxury-body"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
            Progress
          </p>
          <NeedleProgress percent={percent} showPercent size="sm" />
        </div>
      </div>
    </section>
  );
}
