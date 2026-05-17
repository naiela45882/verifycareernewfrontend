import { cn } from "../../lib/cn";

const SIZE = 96;
const STROKE = 7;

export default function ReadinessRing({
  percent = 0,
  size = "md",
  className,
  label = "Ready",
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  const dim = size === "sm" ? 72 : SIZE;
  const stroke = size === "sm" ? 5 : STROKE;
  const r = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className
      )}
      role="img"
      aria-label={`${label}: ${clamped}%`}
    >
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        className="-rotate-90"
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-luxury-border/80"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="text-luxury-accent transition-[stroke-dashoffset] duration-700 ease-luxury"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            "font-semibold tabular-nums tracking-tight text-luxury-ink",
            size === "sm" ? "text-lg" : "text-2xl"
          )}
        >
          {clamped}%
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-luxury-caption">
          {label}
        </span>
      </div>
    </div>
  );
}
