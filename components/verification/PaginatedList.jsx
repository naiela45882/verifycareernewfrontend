import { cn } from "../../lib/cn";

export default function PaginatedList({
  children,
  page,
  pages,
  onPageChange,
  loading,
}) {
  return (
    <div>
      <div className="space-y-3">{children}</div>

      {pages > 1 && (
        <nav className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={page <= 1 || loading}
            onClick={() => onPageChange(page - 1)}
            className={cn(
              "rounded-lg border border-luxury-border px-3 py-1.5 text-[13px] font-medium text-luxury-ink",
              "hover:border-luxury-accent/35 disabled:opacity-40"
            )}
          >
            Previous
          </button>
          <span className="px-2 text-[13px] text-luxury-caption">
            Page {page} of {pages}
          </span>
          <button
            type="button"
            disabled={page >= pages || loading}
            onClick={() => onPageChange(page + 1)}
            className={cn(
              "rounded-lg border border-luxury-border px-3 py-1.5 text-[13px] font-medium text-luxury-ink",
              "hover:border-luxury-accent/35 disabled:opacity-40"
            )}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
