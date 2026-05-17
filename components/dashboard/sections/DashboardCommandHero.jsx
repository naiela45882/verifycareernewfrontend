import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ReadinessRing from "../ReadinessRing";
import {
  getDashboardStatusMessage,
  useDashboardNextStep,
} from "../../../hooks/useDashboardNextStep";

export default function DashboardCommandHero({ data, loading }) {
  const nextStep = useDashboardNextStep({
    hasResume: data.hasResume,
    careerGoal: data.careerGoal,
    scansCount: data.scansCount,
  });

  if (loading) {
    return (
      <div className="dashboard-hero-wash h-[200px] animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40 lg:h-[220px]" />
    );
  }

  const firstName = data.displayName?.split(" ")[0] || "there";
  const status = getDashboardStatusMessage({
    hasResume: data.hasResume,
    careerGoal: data.careerGoal,
    scansCount: data.scansCount,
    verificationScore: data.verificationScore,
  });

  return (
    <div
      id="dashboard-readiness"
      className="dashboard-hero-wash relative overflow-hidden rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft lg:p-7"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, var(--vc-ambient) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-luxury-accent">
            Career command center
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-luxury-body">
            {status}
          </p>
          <p className="mt-1 text-[12px] text-luxury-caption">
            Last sign-in {data.lastLogin}
          </p>
          <div className="mt-5">
            <Link
              to={nextStep.to}
              className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-semibold text-luxury-on-accent shadow-soft transition-all duration-300 ease-luxury hover:bg-luxury-accent-hover hover:-translate-y-px"
            >
              {nextStep.label}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <p className="mt-2 text-[12px] text-luxury-caption">
              {nextStep.description}
            </p>
          </div>
        </div>
        <ReadinessRing percent={data.verificationScore} className="sm:mr-2" />
      </div>
    </div>
  );
}
