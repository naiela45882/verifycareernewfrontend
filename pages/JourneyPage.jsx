import { Link } from "react-router-dom";
import { ArrowUpRight, Target, Map, TrendingUp } from "lucide-react";
import { useSkillJourney } from "../hooks/useSkillJourney";
import NeedleProgress from "../components/dashboard/NeedleProgress";
import SkillChipList from "../components/skill-journey/SkillChipList";

export default function JourneyPage() {
  const { journey, loading } = useSkillJourney();

  if (loading) {
    return <div className="mx-auto max-w-[1440px] h-48 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />;
  }

  if (!journey) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
            Skill Journey
          </h1>
          <p className="mt-1 text-[13px] text-luxury-body">
            Define a career target to map your resume, identify gaps, and track progress.
          </p>
        </header>
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-8 text-center shadow-soft">
          <p className="text-[14px] font-medium text-luxury-ink">No journey started yet</p>
          <p className="mt-2 text-[13px] text-luxury-body">
            Choose a target role and we will build your personalized roadmap.
          </p>
          <Link
            to="/journey/target"
            className="mt-4 inline-flex items-center gap-1 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent"
          >
            Set target role
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    );
  }

  const preview = journey.roadmap?.slice(0, 4) || [];

  return (
    <div className="mx-auto max-w-[1440px] space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
            Skill Journey
          </h1>
          <p className="mt-1 text-[13px] text-luxury-body">
            Roadmap toward {journey.targetRole} · {journey.expectedTimeline}
          </p>
        </div>
        <Link
          to="/journey/target"
          className="text-[13px] font-medium text-luxury-accent hover:underline"
        >
          Update target
        </Link>
      </header>

      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Target role
            </p>
            <p className="mt-1 text-[16px] font-semibold text-luxury-ink">{journey.targetRole}</p>
            {journey.seniorityEstimation && (
              <p className="mt-1 text-[13px] text-luxury-body">{journey.seniorityEstimation}</p>
            )}
          </div>
          <div className="lg:col-span-2">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              Overall progress
            </p>
            <NeedleProgress percent={journey.completionPercent} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
          <SkillChipList title="Your current skills" skills={journey.existingSkills} />
        </section>
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
          <SkillChipList title="Skills to develop" skills={journey.missingSkills} variant="missing" />
        </section>
      </div>

      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-luxury-ink">Roadmap preview</h2>
          <Link
            to="/journey/roadmap"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-luxury-accent"
          >
            View full roadmap
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>
        {preview.length === 0 ? (
          <p className="text-[13px] text-luxury-caption">No items yet.</p>
        ) : (
          <ul className="space-y-2">
            {preview.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-luxury-border/60 px-3 py-2 text-[13px]"
              >
                <span className="text-luxury-ink">{item.title}</span>
                <span className="text-luxury-caption">{item.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <NavCard to="/journey/target" icon={Target} label="Target" desc="Role & motivation" />
        <NavCard to="/journey/roadmap" icon={Map} label="Roadmap" desc="Tasks & milestones" />
        <NavCard to="/journey/progress" icon={TrendingUp} label="Progress" desc="Streak & notes" />
      </div>
    </div>
  );
}

function NavCard({ to, icon: Icon, label, desc }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-luxury-border bg-luxury-surface p-4 shadow-soft transition-colors hover:border-luxury-accent/30"
    >
      <Icon className="h-5 w-5 text-luxury-accent" />
      <p className="mt-2 text-[14px] font-medium text-luxury-ink">{label}</p>
      <p className="text-[12px] text-luxury-caption">{desc}</p>
    </Link>
  );
}
