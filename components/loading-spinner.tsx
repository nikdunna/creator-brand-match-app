import { Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Andy is thinking…",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <Sparkles className="h-8 w-8 animate-pulse text-teal-600" />
      <p className="text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
}
