import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export default function RawTextAccordion({ text = "" }) {
  const [open, setOpen] = useState(false);

  if (!text) return null;

  return (
    <section className="rounded-xl border border-luxury-border bg-luxury-surface shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left"
      >
        <span className="text-[15px] font-semibold text-luxury-ink">Raw document text</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-luxury-caption transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="border-t border-luxury-border/60 px-6 pb-6">
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-luxury-muted/40 p-4 text-[12px] leading-relaxed text-luxury-body">
            {text}
          </pre>
        </div>
      )}
    </section>
  );
}
