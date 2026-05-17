import { cn } from "../../lib/cn";

export default function Tags({ items = [], className }) {
  if (!items.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-luxury-border bg-luxury-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-luxury-body"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
