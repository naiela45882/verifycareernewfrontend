import { useEffect, useState } from "react";
import { AlertCircle, Check, Loader2, RefreshCw } from "lucide-react";

function formatSavedLabel(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 15) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export default function ResumeSaveStatus({
  enabled,
  saving,
  savePending,
  lastSavedAt,
  saveError,
  onRetry,
}) {
  const [, tick] = useState(0);

  useEffect(() => {
    if (!enabled || !lastSavedAt || saving || savePending) return;
    const id = setInterval(() => tick((n) => n + 1), 15000);
    return () => clearInterval(id);
  }, [enabled, lastSavedAt, saving, savePending]);

  if (!enabled) return null;

  if (saveError) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="flex items-center gap-1.5 text-luxury-coral">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          Couldn&apos;t save
        </span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1 font-medium text-luxury-accent hover:underline"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </button>
        )}
      </div>
    );
  }

  if (saving) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-luxury-caption" role="status" aria-live="polite">
        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-luxury-accent" />
        Saving to your account…
      </span>
    );
  }

  if (savePending) {
    return (
      <span className="text-xs text-luxury-caption" role="status" aria-live="polite">
        Saving soon…
      </span>
    );
  }

  if (lastSavedAt) {
    const fullTime = lastSavedAt.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
    return (
      <span
        className="flex items-center gap-1.5 text-xs text-luxury-caption"
        role="status"
        aria-live="polite"
        title={`Last saved ${fullTime}`}
      >
        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
        Saved {formatSavedLabel(lastSavedAt)}
      </span>
    );
  }

  return null;
}
