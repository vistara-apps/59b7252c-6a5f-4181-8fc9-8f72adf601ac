export interface User {
  userId: string;
  walletAddress: string;
  preferences: UserPreferences;
  registeredHabits: string[];
  sleepGoals: SleepGoal[];
  subscriptionStatus: SubscriptionTier;
  lastLogin: Date;
}

export interface UserPreferences {
  soundscapeVolume: number;
  reminderTime: string;
  preferredSoundscapes: string[];
  darkMode: boolean;
}

export interface SleepGoal {
  id: string;
  type: 'fall_asleep_faster' | 'wake_up_refreshed' | 'deeper_sleep' | 'consistent_schedule';
  targetValue: number;
  currentValue: number;
  unit: string;
}

export interface Habit {
  habitId: string;
  name: string;
  description: string;
  cueType: 'audio' | 'visual' | 'vibration';
  targetDuration: number; // in minutes
  userId: string;
  isActive: boolean;
  scheduledTime: string;
  streak: number;
}

export interface HabitLog {
  logId: string;
  userId: string;
  habitId: string;
  timestamp: Date;
  completionStatus: 'completed' | 'skipped' | 'partial';
  notes?: string;
  duration?: number;
}

export interface Soundscape {
  soundscapeId: string;
  name: string;
  description: string;
  audioFileUrl: string;
  tags: string[];
  isPremium: boolean;
  duration: number;
  category: 'nature' | 'ambient' | 'white_noise' | 'binaural' | 'guided';
}

export interface Recommendation {
  recommendationId: string;
  userId: string;
  recommendationText: string;
  creationTimestamp: Date;
  actionable: boolean;
  category: 'habit' | 'soundscape' | 'timing' | 'routine';
  priority: 'low' | 'medium' | 'high';
}

export type SubscriptionTier = 'free' | 'premium' | 'coach';

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}
