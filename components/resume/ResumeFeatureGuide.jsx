export default function ResumeFeatureGuide({ title = "How it works", steps }) {
  if (!steps?.length) return null;

  return (
    <section className="mb-6 rounded-xl border border-luxury-border bg-luxury-muted/15 p-4 sm:p-5">
      <h2 className="text-[13px] font-semibold text-luxury-ink">{title}</h2>
      <ol className="mt-3 space-y-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-luxury-accent/15 text-[11px] font-semibold text-luxury-accent"
              aria-hidden
            >
              {index + 1}
            </span>
            <div>
              <p className="text-[13px] font-medium text-luxury-ink">{step.title}</p>
              {step.description && (
                <p className="mt-0.5 text-[12px] leading-relaxed text-luxury-body">{step.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
