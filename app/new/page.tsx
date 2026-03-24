import type { Metadata } from "next";
import { SessionForm } from "@/components/session-form";

export const metadata: Metadata = {
  title: "New Match | Lil' Andy",
  description: "Tell Andy about your startup to find the perfect creator partners.",
};

export default function NewSessionPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <div className="text-center">
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
          Find Your Creator Match
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Tell Lil&apos; Andy about your startup and he&apos;ll suggest the perfect
          creator partners.
        </p>
      </div>

      <div className="mt-8 border border-border bg-linear-to-b from-primary-muted to-surface to-30% p-6">
        <SessionForm />
      </div>
    </main>
  );
}
