export default function JournalLoading() {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-foreground/10" />
      <div className="space-y-6">
        {/* Morning skeleton */}
        <div className="rounded-2xl border border-foreground/5 p-6 space-y-3">
          <div className="h-3 w-16 animate-pulse rounded bg-foreground/10" />
          <div className="h-4 w-48 animate-pulse rounded bg-foreground/10" />
          <div className="h-20 w-full animate-pulse rounded-lg bg-foreground/10" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-foreground/10" />
        </div>
        {/* Evening skeleton */}
        <div className="rounded-2xl border border-foreground/5 p-6 space-y-3">
          <div className="h-3 w-16 animate-pulse rounded bg-foreground/10" />
          <div className="h-4 w-32 animate-pulse rounded bg-foreground/10" />
        </div>
      </div>
    </main>
  );
}
