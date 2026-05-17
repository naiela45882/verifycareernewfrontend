import { Heart } from "lucide-react";
import { cn } from "../../lib/cn";

export default function LikeButton({ liked, count = 0, onClick, readOnly }) {
  if (readOnly) {
    return (
      <span className="inline-flex items-center gap-1 text-[12px] text-luxury-caption">
        <Heart
          className={cn("h-3.5 w-3.5", liked && "fill-luxury-coral text-luxury-coral")}
          strokeWidth={1.75}
        />
        {count}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[12px] font-medium transition-colors",
        liked
          ? "border-luxury-coral/30 bg-luxury-coral/10 text-luxury-coral"
          : "border-luxury-border text-luxury-body hover:border-luxury-accent/35"
      )}
    >
      <Heart
        className={cn("h-3.5 w-3.5", liked && "fill-current")}
        strokeWidth={1.75}
      />
      {count}
    </button>
  );
}
