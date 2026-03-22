export default function JournalHistoryLoading() {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded bg-foreground/10" />
        <div className="h-4 w-12 animate-pulse rounded bg-foreground/10" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-foreground/5 p-6 space-y-3"
          >
            <div className="h-3 w-40 animate-pulse rounded bg-foreground/10" />
            <div className="h-4 w-64 animate-pulse rounded bg-foreground/10" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-foreground/10" />
              <div className="h-8 w-12 animate-pulse rounded bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
