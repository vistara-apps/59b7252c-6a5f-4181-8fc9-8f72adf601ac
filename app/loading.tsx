export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 animate-ping"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-surface rounded w-32 mx-auto animate-pulse"></div>
          <div className="h-3 bg-surface rounded w-24 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
