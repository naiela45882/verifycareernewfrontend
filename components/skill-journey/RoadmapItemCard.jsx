import { ROADMAP_STATUSES, TYPE_LABELS } from "./constants";

export default function RoadmapItemCard({ item, onStatusChange, onDelete }) {
  return (
    <article className="rounded-lg border border-luxury-border bg-luxury-muted/20 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-luxury-caption">
            {TYPE_LABELS[item.type] || item.type}
            {item.skillGroup ? ` · ${item.skillGroup}` : ""}
          </p>
          <h3 className="mt-0.5 text-[14px] font-medium text-luxury-ink">{item.title}</h3>
          {item.description && (
            <p className="mt-1 text-[13px] text-luxury-body">{item.description}</p>
          )}
        </div>
        <select
          value={item.status}
          onChange={(e) => onStatusChange(item.id, e.target.value)}
          className="rounded-md border border-luxury-border bg-luxury-surface px-2 py-1 text-[12px] text-luxury-ink"
        >
          {ROADMAP_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="mt-2 text-[12px] text-luxury-coral hover:underline"
        >
          Remove
        </button>
      )}
    </article>
  );
}
