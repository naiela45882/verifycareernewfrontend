import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

export default function NeedleProgress({
  percent = 0,
  label,
  className,
  showPercent = true,
  size = "md",
}) {
  const [hovered, setHovered] = useState(false);
  const clamped = Math.min(100, Math.max(0, percent));

  const trackHeight = size === "sm" ? "h-1.5" : "h-2.5";
  const markerSize = size === "sm" ? "h-2.5 w-2.5" : "h-3.5 w-3.5";
  const paddingY = size === "sm" ? "py-2" : "py-3";

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn("flex items-center gap-3", showPercent && "gap-4")}>
        <div className={cn("relative min-w-0 flex-1", paddingY)}>
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-full border border-luxury-border/70 bg-luxury-muted/60 shadow-inner",
              trackHeight
            )}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-luxury-accent/50 via-luxury-accent to-luxury-accent"
              initial={{ width: 0 }}
              animate={{ width: `${clamped}%` }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
            {clamped > 0 && (
              <motion.div
                className={cn(
                  "absolute top-1/2 z-10 rounded-full border-2 border-luxury-surface bg-luxury-accent shadow-[0_0_0_1px_color-mix(in_srgb,var(--vc-teal)_35%,transparent),0_2px_8px_color-mix(in_srgb,var(--vc-teal)_25%,transparent)]",
                  markerSize
                )}
                style={{ left: `${clamped}%` }}
                animate={{
                  y: "-50%",
                  x: "-50%",
                  scale: hovered ? 1.12 : 1,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              />
            )}
          </div>
        </div>

        {showPercent && (
          <span className="shrink-0 text-right text-[15px] font-semibold tabular-nums tracking-tight text-luxury-accent">
            {clamped}%
          </span>
        )}
      </div>

      {label && (
        <p className="mt-1.5 text-[11px] text-luxury-caption">{label}</p>
      )}
    </div>
  );
}
