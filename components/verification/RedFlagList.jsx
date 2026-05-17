import { AlertTriangle } from "lucide-react";

export default function RedFlagList({ flags = [], title = "Red flags" }) {
  if (!flags.length) {
    return (
      <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
        <h3 className="text-[15px] font-semibold text-luxury-ink">{title}</h3>
        <p className="mt-2 text-[13px] text-luxury-body">No significant red flags detected.</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-luxury-coral/20 bg-luxury-surface p-6 shadow-soft">
      <header className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-luxury-coral/25 bg-luxury-coral/10 text-luxury-coral">
          <AlertTriangle className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <h3 className="text-[15px] font-semibold text-luxury-ink">{title}</h3>
      </header>
      <ul className="space-y-2">
        {flags.map((flag) => (
          <li
            key={flag}
            className="rounded-lg border border-luxury-coral/15 bg-luxury-coral/5 px-3 py-2 text-[13px] text-luxury-ink"
          >
            {flag}
          </li>
        ))}
      </ul>
    </section>
  );
}
