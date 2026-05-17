export default function SkillChipList({ title, skills = [], variant = "default" }) {
  if (!skills.length) return null;

  const chipClass =
    variant === "missing"
      ? "border-luxury-coral/25 bg-luxury-coral/8 text-luxury-coral"
      : "border-luxury-border bg-luxury-muted/50 text-luxury-body";

  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
        {title}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`rounded-lg border px-3 py-1 text-[12px] ${chipClass}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
