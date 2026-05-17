import { Fingerprint } from "lucide-react";
import { cn } from "../../lib/cn";

export default function FingerprintMini({ value, className }) {
  if (!value) return null;

  const short = `${value.slice(0, 8)}…${value.slice(-6)}`;

  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] text-luxury-caption",
        className
      )}
      title={value}
    >
      <Fingerprint className="h-3 w-3 shrink-0" strokeWidth={1.75} />
      {short}
    </p>
  );
}
