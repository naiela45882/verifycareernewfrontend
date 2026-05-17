import { Star } from "lucide-react";
import { cn } from "../../lib/cn";

export default function RatingStars({ value = 0, onChange, readOnly, size = "md" }) {
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={cn(!readOnly && "cursor-pointer hover:scale-110 transition-transform")}
        >
          <Star
            className={cn(
              sizeClass,
              star <= (value || 0)
                ? "fill-amber-400 text-amber-400"
                : "text-luxury-border"
            )}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}
