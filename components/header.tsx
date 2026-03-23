import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <Sparkles className="h-5 w-5 text-teal-600" />
          <span>Andy</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/new" className="transition-colors hover:text-gray-900">
            New Match
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-gray-900">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
