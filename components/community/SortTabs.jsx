import { cn } from "../../lib/cn";
import { SORT_OPTIONS } from "./constants";

export default function SortTabs({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SORT_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors",
            value === opt.id
              ? "border-luxury-accent/40 bg-luxury-accent/10 text-luxury-accent"
              : "border-luxury-border text-luxury-body hover:border-luxury-accent/30"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
