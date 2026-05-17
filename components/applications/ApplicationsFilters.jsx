import { Search } from "lucide-react";
import { APPLICATION_STATUSES } from "./constants";

const inputClass =
  "rounded-lg border border-luxury-border bg-luxury-muted/30 px-3 py-2 text-[13px] text-luxury-ink outline-none focus:border-luxury-accent/40";

export default function ApplicationsFilters({ filters, onChange }) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-luxury-border bg-luxury-surface p-4 shadow-soft">
      <div className="min-w-[200px] flex-1">
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          Search
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-luxury-caption" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Company or job title"
            className={`${inputClass} w-full pl-9`}
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className={inputClass}
        >
          <option value="">All statuses</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.08em] text-luxury-caption">
          Sort by date
        </label>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className={inputClass}
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
        </select>
      </div>
    </div>
  );
}
