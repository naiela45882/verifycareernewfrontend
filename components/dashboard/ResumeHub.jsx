import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Sparkles,
  Target,
  ArrowUpRight,
  Pencil,
  CheckCircle2,
  Circle,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "../../lib/cn";

const ONBOARDING_STEPS = [
  { id: "resume", label: "Build or upload your resume", to: "/resume" },
  { id: "goal", label: "Set your career goal", to: "/journey/target" },
  { id: "scan", label: "Run your first offer scan", to: "/trust/offer-letter" },
];

export default function ResumeHub({
  resume,
  hasResume,
  loading,
  careerGoal,
  onSaveGoal,
}) {
  const [goalInput, setGoalInput] = useState(careerGoal || "");
  const [savingGoal, setSavingGoal] = useState(false);

  const handleSaveGoal = async () => {
    setSavingGoal(true);
    try {
      await onSaveGoal(goalInput);
      toast.success("Career goal saved");
    } catch {
      toast.error("Could not save goal");
    } finally {
      setSavingGoal(false);
    }
  };

  return (
    <section className="flex h-full flex-col rounded-xl border border-luxury-border bg-luxury-surface p-5 lg:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex rounded-full border border-luxury-accent/25 bg-luxury-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-luxury-accent">
            Primary
          </span>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-luxury-ink">
            Resume Hub
          </h2>
          <p className="mt-1 max-w-xl text-[13px] text-luxury-body">
            Build with templates, live ATS scoring, and PDF export — powers tailoring and versions.
          </p>
        </div>
        <Link
          to="/resume"
          className="inline-flex items-center gap-2 rounded-lg bg-luxury-accent px-4 py-2.5 text-[13px] font-medium text-luxury-on-accent transition-colors hover:bg-luxury-accent-hover"
        >
          <Pencil className="h-4 w-4" />
          {hasResume ? "Open builder" : "Build resume"}
        </Link>
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        <div
          className={cn(
            "rounded-lg border p-5",
            hasResume
              ? "border-luxury-accent/30 bg-luxury-accent/5"
              : "border-dashed border-luxury-border bg-luxury-muted/20"
          )}
        >
          {loading ? (
            <p className="text-[13px] text-luxury-body">Loading resume…</p>
          ) : hasResume ? (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-luxury-accent/25 bg-luxury-accent/10 text-luxury-accent">
                  <FileText className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-luxury-ink">
                    Primary resume
                  </p>
                  <p className="text-[12px] text-luxury-caption">
                    {resume?.lastAtsScore != null
                      ? `Last ATS: ${resume.lastAtsScore}%`
                      : "Ready for analysis"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/resume/feedback"
                  className="inline-flex items-center gap-1 rounded-lg border border-luxury-border px-3 py-1.5 text-[12px] font-medium text-luxury-ink hover:bg-luxury-muted/50"
                >
                  <Sparkles className="h-3.5 w-3.5 text-luxury-accent" />
                  Resume feedback
                </Link>
                <Link
                  to="/resume/tailor"
                  className="inline-flex items-center gap-1 rounded-lg border border-luxury-border px-3 py-1.5 text-[12px] font-medium text-luxury-ink hover:bg-luxury-muted/50"
                >
                  Tailor to job
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="relative">
              <span
                className="empty-needle-glow pointer-events-none absolute left-6 top-0 h-10 w-px"
                aria-hidden
              />
              <p className="text-[14px] font-medium text-luxury-ink">
                Get started in three steps
              </p>
              <p className="mt-1 text-[13px] text-luxury-body">
                Unlock ATS scoring, tailoring, and your personalized action plan.
              </p>
              <ol className="mt-5 space-y-3">
                {ONBOARDING_STEPS.map((step, i) => (
                  <li key={step.id}>
                    <Link
                      to={step.to}
                      className="group flex items-center gap-3 rounded-lg border border-luxury-border/80 bg-luxury-surface/60 px-3 py-2.5 transition-colors hover:border-luxury-accent/30 hover:bg-luxury-muted/40"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-luxury-border text-[11px] font-semibold text-luxury-caption group-hover:border-luxury-accent/40 group-hover:text-luxury-accent">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-[13px] font-medium text-luxury-ink">
                        {step.label}
                      </span>
                      <Circle className="h-4 w-4 text-luxury-border group-hover:hidden" />
                      <ArrowUpRight className="hidden h-4 w-4 text-luxury-accent group-hover:block" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-luxury-border bg-luxury-muted/20 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-luxury-accent" />
            <h3 className="text-[14px] font-semibold text-luxury-ink">
              Career Goal → Action Plan
            </h3>
            {careerGoal && (
              <CheckCircle2 className="ml-auto h-4 w-4 text-luxury-accent" aria-hidden />
            )}
          </div>
          {careerGoal ? (
            <p className="mb-3 text-[13px] leading-relaxed text-luxury-body">
              Goal: <span className="font-medium text-luxury-ink">{careerGoal}</span>
            </p>
          ) : (
            <p className="mb-3 text-[13px] text-luxury-body">
              Set a career goal to get skill, experience, and course recommendations.
            </p>
          )}
          <textarea
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="e.g. Senior full-stack engineer at a fintech startup"
            rows={2}
            className="w-full resize-none rounded-lg border border-luxury-border bg-luxury-surface px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40"
          />
          <button
            type="button"
            onClick={handleSaveGoal}
            disabled={savingGoal || !goalInput.trim()}
            className="mt-2 rounded-lg bg-luxury-ink px-3 py-2 text-[12px] font-medium text-luxury-surface transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {savingGoal ? "Saving…" : careerGoal ? "Update Goal" : "Set Career Goal"}
          </button>
        </div>
      </div>
    </section>
  );
}
