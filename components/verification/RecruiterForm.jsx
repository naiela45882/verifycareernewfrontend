import { cn } from "../../lib/cn";

const FIELDS = [
  { key: "name", label: "Recruiter name", required: true },
  { key: "company", label: "Company", required: false },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "phone", label: "Phone", required: false },
  { key: "jobUrl", label: "Job post URL (optional)", type: "url", required: false },
];

export default function RecruiterForm({ values, onChange, onSubmit, loading }) {
  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <header className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-luxury-ink">
          Recruiter details
        </h2>
        <p className="mt-0.5 text-[13px] text-luxury-body">
          We validate email domain, patterns, and cross-match prior scam fingerprints.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {FIELDS.map((field) => (
          <label
            key={field.key}
            className={cn(field.key === "jobUrl" && "sm:col-span-2")}
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
              {field.label}
              {field.required && " *"}
            </span>
            <input
              type={field.type || "text"}
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              required={field.required}
              className={cn(
                "mt-1.5 w-full rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2.5",
                "text-[13px] text-luxury-ink focus:border-luxury-accent/40 focus:outline-none focus:ring-2 focus:ring-luxury-accent/15"
              )}
            />
          </label>
        ))}

        <div className="sm:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-medium text-luxury-on-accent shadow-soft",
              "hover:bg-luxury-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {loading ? "Verifying…" : "Verify recruiter"}
          </button>
        </div>
      </form>
    </section>
  );
}
