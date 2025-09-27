import { SubscriptionPlan, Soundscape } from './types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    tier: 'free',
    name: 'Basic',
    price: 0,
    features: [
      'Basic habit tracking',
      '3 soundscapes',
      'Simple reminders',
      'Basic progress tracking'
    ]
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: 5,
    features: [
      'Advanced habit tracking',
      'Full soundscape library',
      'AI-powered recommendations',
      'Advanced analytics',
      'Custom habit creation'
    ],
    isPopular: true
  },
  {
    tier: 'coach',
    name: 'Sleep Coach',
    price: 15,
    features: [
      'Everything in Premium',
      'Personalized coaching',
      '1:1 session discount',
      'Priority support',
      'Custom soundscape creation'
    ]
  }
];

export const SAMPLE_SOUNDSCAPES: Soundscape[] = [
  {
    soundscapeId: '1',
    name: 'Ocean Waves',
    description: 'Gentle ocean waves for deep relaxation',
    audioFileUrl: '/audio/ocean-waves.mp3',
    tags: ['nature', 'water', 'calming'],
    isPremium: false,
    duration: 3600,
    category: 'nature'
  },
  {
    soundscapeId: '2',
    name: 'Forest Rain',
    description: 'Soft rain falling in a peaceful forest',
    audioFileUrl: '/audio/forest-rain.mp3',
    tags: ['nature', 'rain', 'forest'],
    isPremium: false,
    duration: 2700,
    category: 'nature'
  },
  {
    soundscapeId: '3',
    name: 'Deep Space Ambient',
    description: 'Ethereal ambient sounds from the cosmos',
    audioFileUrl: '/audio/deep-space.mp3',
    tags: ['ambient', 'space', 'ethereal'],
    isPremium: true,
    duration: 4500,
    category: 'ambient'
  },
  {
    soundscapeId: '4',
    name: 'Binaural Sleep Waves',
    description: 'Scientifically designed binaural beats for sleep',
    audioFileUrl: '/audio/binaural-sleep.mp3',
    tags: ['binaural', 'scientific', 'sleep'],
    isPremium: true,
    duration: 3600,
    category: 'binaural'
  }
];

export const DEFAULT_HABITS = [
  {
    name: 'Brush Teeth',
    description: 'Maintain dental hygiene before bed',
    cueType: 'audio' as const,
    targetDuration: 3
  },
  {
    name: 'Read for 15 minutes',
    description: 'Wind down with a good book',
    cueType: 'audio' as const,
    targetDuration: 15
  },
  {
    name: 'Meditation',
    description: 'Clear your mind with mindful breathing',
    cueType: 'audio' as const,
    targetDuration: 10
  },
  {
    name: 'Journal Writing',
    description: 'Reflect on your day and set intentions',
    cueType: 'audio' as const,
    targetDuration: 5
  },
  {
    name: 'Gentle Stretching',
    description: 'Release tension with light stretches',
    cueType: 'audio' as const,
    targetDuration: 8
  }
];
