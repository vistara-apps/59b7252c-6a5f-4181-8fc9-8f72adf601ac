'use client';

import { useState } from 'react';
import { Check, Clock, Flame, Play } from 'lucide-react';
import { Habit, HabitLog } from '@/lib/types';
import { formatDuration } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  variant?: 'active' | 'completed' | 'disabled';
  onComplete?: (habitId: string) => void;
  onPlayCue?: (habitId: string) => void;
  recentLogs?: HabitLog[];
}

export function HabitCard({ 
  habit, 
  variant = 'active',
  onComplete,
  onPlayCue,
  recentLogs = []
}: HabitCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    if (variant === 'completed' || variant === 'disabled') return;
    
    setIsCompleting(true);
    try {
      await onComplete?.(habit.habitId);
    } finally {
      setIsCompleting(false);
    }
  };

  const handlePlayCue = () => {
    onPlayCue?.(habit.habitId);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'completed':
        return 'bg-green-500 bg-opacity-20 border-green-500 border-opacity-30';
      case 'disabled':
        return 'bg-surface bg-opacity-30 border-gray-600 border-opacity-30 opacity-60';
      default:
        return 'glass-card hover:bg-opacity-60';
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'disabled':
        return 'bg-gray-600 text-gray-400 cursor-not-allowed';
      default:
        return 'bg-gradient-to-br from-accent to-primary text-white hover:scale-105';
    }
  };

  return (
    <div className={`p-4 rounded-2xl transition-all duration-300 ${getVariantStyles()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary mb-1">{habit.name}</h3>
          <p className="text-sm text-text-secondary mb-2">{habit.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(habit.targetDuration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>{habit.streak} day streak</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {habit.cueType === 'audio' && (
            <button
              onClick={handlePlayCue}
              className="p-2 rounded-full bg-surface hover:bg-opacity-80 transition-all duration-200"
              disabled={variant === 'disabled'}
            >
              <Play className="w-4 h-4 text-text-secondary" />
            </button>
          )}
          
          <button
            onClick={handleComplete}
            disabled={isCompleting || variant === 'completed' || variant === 'disabled'}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${getButtonStyles()}`}
          >
            {isCompleting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : variant === 'completed' ? (
              <Check className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      {recentLogs.length > 0 && (
        <div className="flex items-center gap-1">
          {Array.from({ length: 7 }).map((_, index) => {
            const dayLog = recentLogs[6 - index];
            const isCompleted = dayLog?.completionStatus === 'completed';
            
            return (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : 'bg-surface'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
