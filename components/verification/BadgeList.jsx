import { BadgeCheck } from "lucide-react";
import { cn } from "../../lib/cn";

export default function BadgeList({ badges = [], title = "Verification badges" }) {
  if (!badges.length) {
    return (
      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-luxury-ink">{title}</h3>
        <p className="mt-2 text-[13px] text-luxury-body">No badges earned for this check.</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <h3 className="mb-4 text-[15px] font-semibold text-luxury-ink">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {badges.map((badge) => {
          const negative = /flagged|match|disposable/i.test(badge);
          return (
            <li
              key={badge}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium",
                negative
                  ? "border-luxury-coral/25 bg-luxury-coral/8 text-luxury-coral"
                  : "border-luxury-accent/25 bg-luxury-accent/8 text-luxury-accent"
              )}
            >
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
              {badge}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
