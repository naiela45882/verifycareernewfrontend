import { cn } from "../../lib/cn";

export default function TailorResults({ result }) {
  if (!result) return null;

  const { diffs, suggestedReplacements, skillAlignment } = result;

  return (
    <div className="space-y-4">
      {skillAlignment && (
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-4">
          <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-luxury-caption">
            Skill alignment
          </h3>
          {skillAlignment.score != null && (
            <p className="mb-3 text-2xl font-semibold text-luxury-accent">
              {skillAlignment.score}%
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <SkillList label="Matched" items={skillAlignment.matched} variant="safe" />
            <SkillList label="Missing" items={skillAlignment.missing} variant="danger" />
          </div>
        </section>
      )}

      {diffs?.length > 0 && (
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-4">
          <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-luxury-caption">
            Changes
          </h3>
          <ul className="space-y-2">
            {diffs.map((d, i) => (
              <li
                key={i}
                className="rounded-lg border border-luxury-border bg-luxury-muted/20 px-3 py-2 text-[13px] text-luxury-body"
              >
                <span
                  className={cn(
                    "mr-2 text-[10px] font-semibold uppercase",
                    d.type === "added" && "text-luxury-accent",
                    d.type === "removed" && "text-luxury-coral",
                    d.type === "changed" && "text-luxury-body"
                  )}
                >
                  {d.type}
                </span>
                {d.summary}
              </li>
            ))}
          </ul>
        </section>
      )}

      {suggestedReplacements?.length > 0 && (
        <section className="rounded-xl border border-luxury-border bg-luxury-surface p-4">
          <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-luxury-caption">
            Suggested replacements
          </h3>
          <ul className="space-y-3">
            {suggestedReplacements.map((r, i) => (
              <li
                key={i}
                className="rounded-lg border border-luxury-border bg-luxury-muted/20 p-3 text-[13px]"
              >
                <p className="text-luxury-caption line-through">{r.original}</p>
                <p className="mt-1 font-medium text-luxury-accent">{r.suggested}</p>
                {r.reason && (
                  <p className="mt-1 text-[12px] text-luxury-body">{r.reason}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function SkillList({ label, items, variant }) {
  if (!items?.length) {
    return (
      <div>
        <p className="mb-1 text-[11px] font-medium text-luxury-caption">{label}</p>
        <p className="text-[12px] text-luxury-body">None listed</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-1 text-[11px] font-medium text-luxury-caption">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span
            key={s}
            className={cn(
              "rounded-md px-2 py-0.5 text-[11px] font-medium",
              variant === "safe" && "bg-luxury-accent/12 text-luxury-accent",
              variant === "danger" && "bg-luxury-coral/12 text-luxury-coral"
            )}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
