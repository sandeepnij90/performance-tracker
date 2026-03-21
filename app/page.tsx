import Link from "next/link";

const tools = [
  {
    name: "Energy Audit",
    description: "Track your daily mental and physical energy levels",
    href: "/energy-audit",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">Performance Tracker</h1>
      <div className="space-y-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block rounded-xl border border-foreground/10 p-5 transition-colors hover:bg-foreground/5"
          >
            <h2 className="text-lg font-medium">{tool.name}</h2>
            <p className="mt-1 text-sm text-foreground/60">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
