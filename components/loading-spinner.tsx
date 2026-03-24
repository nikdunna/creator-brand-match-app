interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Lil' Andy is thinking...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-12 py-24">
      <div className="hand">
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="finger"></div>
        <div className="palm"></div>		
        <div className="thumb"></div>
      </div>
      <p className="text-lg font-medium text-text-secondary">{message}</p>
    </div>
  );
}
