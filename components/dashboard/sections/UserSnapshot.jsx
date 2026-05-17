import { Link } from "react-router-dom";
import { FileUp, Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "../../../lib/cn";

export default function UserSnapshot({ data, loading }) {
  if (loading) {
    return (
      <section className="h-[160px] animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/40" />
    );
  }

  const resumeStatus = data.hasResume
    ? `On file · ${data.resumeFileName || "resume.pdf"}`
    : "No resume uploaded";

  const firstName = data.displayName?.split(" ")[0] || "there";

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft lg:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-luxury-ink sm:text-2xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-[13px] text-luxury-body">
            Last sign-in {data.lastLogin} · Monitor your career safety at a glance.
          </p>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Resume" value={resumeStatus} />
            <Stat
              label="Applications"
              value={
                data.applicationsCount > 0
                  ? `${data.applicationsCount} tracked`
                  : "None yet"
              }
            />
            <Stat
              label="Verifications"
              value={`${data.scansCount} scans · ${data.verificationScore}% score`}
            />
            <Stat
              label="Career target"
              value={data.careerGoal || "Set in Skill Journey"}
            />
          </dl>
        </div>

        <div className="flex flex-wrap gap-2 lg:flex-col">
          <QuickLink to="/resume" icon={FileUp} label="Upload Resume" primary />
          <QuickLink to="/resume/tailor" icon={Sparkles} label="Tailor Resume" />
          <QuickLink to="/trust/offer-letter" icon={ShieldCheck} label="Offer Scan" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
        {label}
      </dt>
      <dd className="mt-1 text-[13px] font-medium leading-snug text-luxury-ink">{value}</dd>
    </div>
  );
}

function QuickLink({ to, icon: Icon, label, primary }) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ease-luxury",
        primary
          ? "bg-luxury-accent text-luxury-on-accent hover:bg-luxury-accent-hover shadow-soft"
          : "border border-luxury-border bg-luxury-muted/40 text-luxury-ink hover:border-luxury-accent/35 hover:shadow-soft"
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
      {label}
    </Link>
  );
}
