import { cn } from "../../lib/cn";

export default function TextUploadBox({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder = "Paste the full offer letter text here…",
}) {
  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface p-6 shadow-soft">
      <header className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight text-luxury-ink">
          Offer letter text
        </h2>
        <p className="mt-0.5 text-[13px] text-luxury-body">
          Paste the letter body only. We run pattern, behaviour, duplicate, and risk scoring.
        </p>
      </header>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        placeholder={placeholder}
        className={cn(
          "w-full resize-y rounded-lg border border-luxury-border bg-luxury-muted/30 px-4 py-3",
          "text-[13px] leading-relaxed text-luxury-ink placeholder:text-luxury-caption",
          "focus:border-luxury-accent/40 focus:outline-none focus:ring-2 focus:ring-luxury-accent/15"
        )}
      />

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[11px] text-luxury-caption">
          {value.length} characters · minimum 40 required
        </p>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || value.trim().length < 40}
          className={cn(
            "rounded-lg px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ease-luxury",
            "bg-luxury-accent text-luxury-on-accent hover:bg-luxury-accent-hover shadow-soft",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {loading ? "Analyzing…" : "Run verification"}
        </button>
      </div>
    </section>
  );
}
