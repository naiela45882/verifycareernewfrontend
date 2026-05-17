export function ResumePageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse space-y-6">
      <div className="h-8 w-48 rounded-lg bg-luxury-muted/50" />
      <div className="h-4 w-96 max-w-full rounded bg-luxury-muted/40" />
      <div className="rounded-xl border border-luxury-border bg-luxury-muted/30 p-6">
        <div className="h-64 rounded-lg bg-luxury-muted/40" />
      </div>
    </div>
  );
}

export function ResumeCardGridSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-luxury-border bg-luxury-surface animate-pulse"
        >
          <div className="h-[min(42vw,300px)] max-h-[300px] bg-luxury-muted/40" />
          <div className="space-y-2 border-t border-luxury-border p-4">
            <div className="h-5 w-2/3 rounded bg-luxury-muted/50" />
            <div className="h-3 w-1/3 rounded bg-luxury-muted/35" />
            <div className="mt-3 flex gap-2">
              <div className="h-8 w-14 rounded-lg bg-luxury-muted/40" />
              <div className="h-8 w-14 rounded-lg bg-luxury-muted/35" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResumeTwoColumnSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="h-80 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/30" />
      <div className="h-80 animate-pulse rounded-xl border border-luxury-border bg-luxury-muted/30" />
    </div>
  );
}
