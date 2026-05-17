import { cn } from "../../lib/cn";

export default function TagFilter({ tags = [], active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("")}
        className={cn(
          "rounded-full border px-3 py-1 text-[12px] font-medium transition-colors",
          !active
            ? "border-luxury-accent/40 bg-luxury-accent/10 text-luxury-accent"
            : "border-luxury-border text-luxury-body hover:border-luxury-accent/30"
        )}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag)}
          className={cn(
            "rounded-full border px-3 py-1 text-[12px] font-medium transition-colors",
            active === tag
              ? "border-luxury-accent/40 bg-luxury-accent/10 text-luxury-accent"
              : "border-luxury-border text-luxury-body hover:border-luxury-accent/30"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
