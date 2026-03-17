export default function HistoryLoading() {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded bg-foreground/10" />
        <div className="h-4 w-12 animate-pulse rounded bg-foreground/10" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-foreground/10 p-5 space-y-3"
          >
            <div className="h-4 w-48 animate-pulse rounded bg-foreground/10" />
            <div className="flex gap-8">
              <div className="space-y-1">
                <div className="h-3 w-12 animate-pulse rounded bg-foreground/10" />
                <div className="h-8 w-8 animate-pulse rounded bg-foreground/10" />
              </div>
              <div className="space-y-1">
                <div className="h-3 w-14 animate-pulse rounded bg-foreground/10" />
                <div className="h-8 w-8 animate-pulse rounded bg-foreground/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
