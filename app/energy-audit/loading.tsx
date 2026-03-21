export default function Loading() {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-foreground/10" />
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="h-6 w-64 animate-pulse rounded bg-foreground/10" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-[44px] w-[44px] animate-pulse rounded-lg bg-foreground/10"
              />
            ))}
          </div>
          <div className="h-16 w-full animate-pulse rounded-lg bg-foreground/10" />
        </div>
        <div className="space-y-3">
          <div className="h-6 w-64 animate-pulse rounded bg-foreground/10" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-[44px] w-[44px] animate-pulse rounded-lg bg-foreground/10"
              />
            ))}
          </div>
          <div className="h-16 w-full animate-pulse rounded-lg bg-foreground/10" />
        </div>
        <div className="h-12 w-full animate-pulse rounded-lg bg-foreground/10" />
      </div>
    </main>
  );
}
