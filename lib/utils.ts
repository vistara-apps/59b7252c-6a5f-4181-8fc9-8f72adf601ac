export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function getTimeUntilBedtime(bedtime: string): string {
  const now = new Date();
  const [hours, minutes] = bedtime.split(':').map(Number);
  const bedtimeToday = new Date(now);
  bedtimeToday.setHours(hours, minutes, 0, 0);

  // If bedtime has passed today, calculate for tomorrow
  if (bedtimeToday <= now) {
    bedtimeToday.setDate(bedtimeToday.getDate() + 1);
  }

  const timeDiff = bedtimeToday.getTime() - now.getTime();
  const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesUntil = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (hoursUntil > 0) {
    return `${hoursUntil}h ${minutesUntil}m`;
  }
  return `${minutesUntil}m`;
}

export function calculateStreak(logs: { timestamp: Date; completionStatus: string }[]): number {
  if (logs.length === 0) return 0;

  const sortedLogs = logs
    .filter(log => log.completionStatus === 'completed')
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  if (sortedLogs.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedLogs.length; i++) {
    const logDate = new Date(sortedLogs[i].timestamp);
    logDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    if (logDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function generateHabitId(): string {
  return `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateLogId(): string {
  return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
