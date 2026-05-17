import ResumeStatsCard from "./ResumeStatsCard";
import { cn } from "../../lib/cn";

export default function FeedbackResults({ feedback }) {
  if (!feedback) return null;

  const scoreVariant =
    feedback.atsScore >= 75 ? "safe" : feedback.atsScore >= 50 ? "default" : "danger";

  return (
    <div className="space-y-6">
      {feedback.atsScore != null && (
        <ResumeStatsCard
          label="ATS score"
          value={`${feedback.atsScore}%`}
          sublabel={
            feedback.atsScore >= 75
              ? "Strong alignment for applicant tracking systems"
              : feedback.atsScore >= 50
                ? "Room to improve keywords and structure"
                : "Needs significant optimization"
          }
          variant={scoreVariant}
        />
      )}

      <FeedbackSection title="Strengths" items={feedback.strengths} variant="safe" />
      <FeedbackSection title="Weaknesses" items={feedback.weaknesses} variant="danger" />
      <FeedbackSection title="Missing skills" items={feedback.missingSkills} />
      <FeedbackSection title="Improvements" items={feedback.improvements} />
      <FeedbackSection title="Formatting" items={feedback.formattingFeedback} />
      <FeedbackSection title="Readability" items={feedback.readabilityFeedback} />
    </div>
  );
}

function FeedbackSection({ title, items, variant }) {
  if (!items?.length) return null;

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-5 shadow-soft">
      <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-luxury-caption">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-2 text-[13px] leading-relaxed text-luxury-body",
              variant === "safe" && "text-luxury-ink",
              variant === "danger" && "text-luxury-coral/90"
            )}
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-luxury-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
