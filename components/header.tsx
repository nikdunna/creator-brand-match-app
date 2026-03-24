import Link from "next/link";
import { BrainCog } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-text-primary">
          <BrainCog className="h-5 w-5 text-primary" />
          <span className="text-xl font-semibold font-sans tracking-tight text-text-primary">Lil&apos; Andy</span>
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
