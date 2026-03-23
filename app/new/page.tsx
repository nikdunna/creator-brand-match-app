import { SessionForm } from "@/components/session-form";
import { Sparkles } from "lucide-react";

export default function NewSessionPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <div className="text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
          <Sparkles className="h-5 w-5 text-teal-600" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-200">
          Find Your Creator Match
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Tell Andy about your startup and he&apos;ll suggest the perfect
          creator partners.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <SessionForm />
      </div>
    </main>
  );
}
