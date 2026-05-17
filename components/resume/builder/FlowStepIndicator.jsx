import clsx from "clsx";

export default function FlowStepIndicator({ steps, currentId }) {
  const currentIndex = steps.findIndex((s) => s.id === currentId);

  return (
    <nav aria-label="Progress" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2">
        {steps.map((step, index) => {
          const done = index < currentIndex;
          const active = step.id === currentId;
          return (
            <li key={step.id} className="flex items-center gap-2">
              {index > 0 && (
                <span
                  className={clsx(
                    "hidden h-px w-6 sm:block",
                    done ? "bg-luxury-accent" : "bg-luxury-border"
                  )}
                  aria-hidden
                />
              )}
              <span
                className={clsx(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                  active && "bg-luxury-accent text-luxury-on-accent",
                  done && !active && "bg-luxury-accent/15 text-luxury-accent",
                  !done && !active && "bg-luxury-muted/50 text-luxury-caption"
                )}
              >
                <span
                  className={clsx(
                    "flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                    active && "bg-luxury-on-accent/20",
                    done && !active && "bg-luxury-accent/25",
                    !done && !active && "bg-luxury-border"
                  )}
                >
                  {done ? "✓" : index + 1}
                </span>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
