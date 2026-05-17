import { cn } from "../../lib/cn";
import { STATUS_STYLES } from "./constants";

export default function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium",
        STATUS_STYLES[status] || STATUS_STYLES.Saved
      )}
    >
      {status}
    </span>
  );
}
