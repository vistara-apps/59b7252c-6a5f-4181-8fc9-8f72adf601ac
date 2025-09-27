'use client';

import { Moon, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center">
          <Moon className="w-8 h-8 text-red-400" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-primary">
            Something went wrong
          </h2>
          <p className="text-text-secondary">
            We encountered an error while loading SleepTune. Don't worry, your sleep data is safe.
          </p>
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-accent to-primary text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
