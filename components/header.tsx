import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold text-text-primary">
          <span className="text-primary text-xl font-semibold font-sans tracking-tight">Lil&apos; Andy</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-text-secondary">
          <Link href="/new" className="transition-colors hover:text-text-primary">
            New Match
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-text-primary">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
