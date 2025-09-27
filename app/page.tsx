'use client';

import { useState, useEffect } from 'react';
import { Play, Moon, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { AppShell } from './components/AppShell';
import { SoundscapePlayer } from './components/SoundscapePlayer';
import { HabitCard } from './components/HabitCard';
import { OnboardingFlow } from './components/OnboardingFlow';
import { SAMPLE_SOUNDSCAPES, DEFAULT_HABITS } from '@/lib/constants';
import { Habit, HabitLog, Soundscape } from '@/lib/types';
import { generateHabitId, getTimeUntilBedtime } from '@/lib/utils';

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentSoundscape, setCurrentSoundscape] = useState<Soundscape>(SAMPLE_SOUNDSCAPES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userHabits, setUserHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasOnboarded = localStorage.getItem('sleeptune-onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    } else {
      // Load user habits from localStorage
      const savedHabits = localStorage.getItem('sleeptune-habits');
      if (savedHabits) {
        setUserHabits(JSON.parse(savedHabits));
      }
    }
  }, []);

  const handleOnboardingComplete = (data: any) => {
    // Create habits from onboarding data
    const habits: Habit[] = data.selectedHabits.map((habitName: string) => {
      const defaultHabit = DEFAULT_HABITS.find(h => h.name === habitName);
      return {
        habitId: generateHabitId(),
        name: habitName,
        description: defaultHabit?.description || '',
        cueType: 'audio' as const,
        targetDuration: defaultHabit?.targetDuration || 5,
        userId: 'current-user',
        isActive: true,
        scheduledTime: data.bedtime,
        streak: 0
      };
    });

    setUserHabits(habits);
    localStorage.setItem('sleeptune-habits', JSON.stringify(habits));
    localStorage.setItem('sleeptune-onboarded', 'true');
    setShowOnboarding(false);
  };

  const handleHabitComplete = (habitId: string) => {
    // Mark habit as completed and update streak
    setUserHabits(prev => prev.map(habit => 
      habit.habitId === habitId 
        ? { ...habit, streak: habit.streak + 1 }
        : habit
    ));
    
    // Add to habit logs
    const newLog: HabitLog = {
      logId: `log_${Date.now()}`,
      userId: 'current-user',
      habitId,
      timestamp: new Date(),
      completionStatus: 'completed'
    };
    
    setHabitLogs(prev => [...prev, newLog]);
  };

  const handlePlayHabitCue = (habitId: string) => {
    const habit = userHabits.find(h => h.habitId === habitId);
    if (habit) {
      // In a real app, this would play an audio cue
      console.log(`Playing audio cue for: ${habit.name}`);
      // For demo, we'll show a notification
      alert(`🔔 Time for: ${habit.name}`);
    }
  };

  const completedHabitsToday = habitLogs.filter(log => {
    const today = new Date();
    const logDate = new Date(log.timestamp);
    return logDate.toDateString() === today.toDateString() && 
           log.completionStatus === 'completed';
  }).length;

  const totalHabits = userHabits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedHabitsToday / totalHabits) * 100) : 0;

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <AppShell>
      <div className="space-y-6 pb-24">
        {/* Welcome Section */}
        <div className="glass-card p-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-float">
            <Moon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Good evening! 🌙</h2>
            <p className="text-text-secondary">
              {getTimeUntilBedtime('22:00')} until your bedtime routine
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-surface bg-opacity-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-accent">{completedHabitsToday}</div>
              <div className="text-xs text-text-secondary">Habits completed</div>
            </div>
            <div className="bg-surface bg-opacity-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-primary">{completionRate}%</div>
              <div className="text-xs text-text-secondary">Completion rate</div>
            </div>
          </div>
        </div>

        {/* Current Soundscape */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Tonight's Soundscape</h3>
            <button className="text-sm text-accent hover:text-opacity-80">
              Browse all
            </button>
          </div>
          <SoundscapePlayer 
            soundscape={currentSoundscape}
            variant={isPlaying ? 'playing' : 'idle'}
            onPlayStateChange={setIsPlaying}
          />
        </div>

        {/* Today's Habits */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Evening Routine</h3>
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <TrendingUp className="w-4 h-4" />
              <span>{completionRate}% complete</span>
            </div>
          </div>
          
          {userHabits.length > 0 ? (
            <div className="space-y-3">
              {userHabits.map((habit) => {
                const isCompleted = habitLogs.some(log => 
                  log.habitId === habit.habitId && 
                  new Date(log.timestamp).toDateString() === new Date().toDateString() &&
                  log.completionStatus === 'completed'
                );
                
                return (
                  <HabitCard
                    key={habit.habitId}
                    habit={habit}
                    variant={isCompleted ? 'completed' : 'active'}
                    onComplete={handleHabitComplete}
                    onPlayCue={handlePlayHabitCue}
                  />
                );
              })}
            </div>
          ) : (
            <div className="glass-card p-6 text-center">
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-semibold text-text-primary mb-2">No habits yet</h4>
              <p className="text-sm text-text-secondary mb-4">
                Start building your perfect bedtime routine
              </p>
              <button 
                onClick={() => setShowOnboarding(true)}
                className="bg-gradient-to-br from-accent to-primary text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-200"
              >
                Set up routine
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="glass-card p-4 text-center hover:bg-opacity-60 transition-all duration-200">
            <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
            <span className="text-sm text-text-primary">Sleep Timer</span>
          </button>
          <button className="glass-card p-4 text-center hover:bg-opacity-60 transition-all duration-200">
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-sm text-text-primary">AI Insights</span>
          </button>
        </div>

        {/* Upgrade Prompt */}
        <div className="glass-card p-6 bg-gradient-to-br from-accent to-primary bg-opacity-10 border-accent border-opacity-30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent bg-opacity-20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text-primary mb-1">Unlock Premium Features</h4>
              <p className="text-sm text-text-secondary mb-3">
                Get access to advanced soundscapes, AI recommendations, and detailed analytics.
              </p>
              <button className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all duration-200">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
