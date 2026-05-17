import {
  Pencil,
  Copy,
  Trash2,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "../../lib/cn";

export default function ResumeListCard({
  versionName,
  preview,
  updatedAt,
  onOpen,
  onEdit,
  onDuplicate,
  onDelete,
}) {
  const dateLabel = updatedAt
    ? new Date(updatedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article className="rounded-xl border border-luxury-border bg-luxury-surface p-4 shadow-soft transition-all duration-300 hover:border-luxury-accent/20">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-[14px] font-semibold text-luxury-ink">
            {versionName}
          </h3>
          <p className="mt-0.5 text-[11px] text-luxury-caption">Updated {dateLabel}</p>
        </div>
        <MoreHorizontal className="h-4 w-4 shrink-0 text-luxury-caption" />
      </div>

      <p className="mb-4 line-clamp-3 text-[12px] leading-relaxed text-luxury-body">
        {preview || "No content"}
      </p>

      <div className="flex flex-wrap gap-2">
        <CardAction icon={ExternalLink} label="Open" onClick={onOpen} />
        <CardAction icon={Pencil} label="Edit" onClick={onEdit} />
        <CardAction icon={Copy} label="Duplicate" onClick={onDuplicate} />
        <CardAction
          icon={Trash2}
          label="Delete"
          onClick={onDelete}
          variant="danger"
        />
      </div>
    </article>
  );
}

function CardAction({ icon: Icon, label, onClick, variant }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-colors",
        variant === "danger"
          ? "border-luxury-coral/25 text-luxury-coral hover:bg-luxury-coral/8"
          : "border-luxury-border text-luxury-body hover:border-luxury-accent/30 hover:text-luxury-ink"
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
      {label}
    </button>
  );
}
