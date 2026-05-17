import { cn } from "../../lib/cn";
import { STATUS_ORDER } from "./constants";

export default function StatusTimeline({ currentStatus }) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <ol className="flex flex-wrap gap-2">
      {STATUS_ORDER.map((status, index) => {
        const reached = index <= currentIndex;
        const active = status === currentStatus;
        return (
          <li
            key={status}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-[12px] font-medium",
              reached
                ? "border-luxury-accent/30 bg-luxury-accent/10 text-luxury-accent"
                : "border-luxury-border bg-luxury-muted/30 text-luxury-caption",
              active && "ring-1 ring-luxury-accent/40"
            )}
          >
            {status}
          </li>
        );
      })}
    </ol>
  );
}
