import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

export default function SaveRecruiterButton({ scanId, disabled }) {
  if (!scanId) return null;

  return (
    <Link
      to={`/trust/history/${scanId}`}
      className={cn(
        "inline-flex rounded-lg bg-luxury-accent px-5 py-2.5 text-[13px] font-medium text-luxury-on-accent shadow-soft",
        "hover:bg-luxury-accent-hover transition-all",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      View evidence detail
    </Link>
  );
}
