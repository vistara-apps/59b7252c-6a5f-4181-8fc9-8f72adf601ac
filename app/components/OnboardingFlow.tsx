'use client';

import { useState } from 'react';
import { ChevronRight, Moon, Target, Clock, CheckCircle } from 'lucide-react';
import { DEFAULT_HABITS } from '@/lib/constants';

interface OnboardingFlowProps {
  variant?: 'welcome' | 'permissions' | 'habitSetup' | 'goalSetting';
  onComplete?: (data: OnboardingData) => void;
}

interface OnboardingData {
  sleepGoals: string[];
  selectedHabits: string[];
  bedtime: string;
  wakeTime: string;
}

export function OnboardingFlow({ variant = 'welcome', onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    sleepGoals: [],
    selectedHabits: [],
    bedtime: '22:00',
    wakeTime: '07:00'
  });

  const steps = [
    { id: 'welcome', title: 'Welcome to SleepTune', icon: Moon },
    { id: 'goals', title: 'Set Your Sleep Goals', icon: Target },
    { id: 'habits', title: 'Choose Your Habits', icon: CheckCircle },
    { id: 'schedule', title: 'Set Your Schedule', icon: Clock }
  ];

  const sleepGoals = [
    { id: 'fall_asleep_faster', label: 'Fall asleep faster', description: 'Reduce time to fall asleep' },
    { id: 'deeper_sleep', label: 'Get deeper sleep', description: 'Improve sleep quality' },
    { id: 'wake_up_refreshed', label: 'Wake up refreshed', description: 'Feel more energized in the morning' },
    { id: 'consistent_schedule', label: 'Consistent schedule', description: 'Maintain regular sleep times' }
  ];

  const handleGoalToggle = (goalId: string) => {
    setOnboardingData(prev => ({
      ...prev,
      sleepGoals: prev.sleepGoals.includes(goalId)
        ? prev.sleepGoals.filter(id => id !== goalId)
        : [...prev.sleepGoals, goalId]
    }));
  };

  const handleHabitToggle = (habitName: string) => {
    setOnboardingData(prev => ({
      ...prev,
      selectedHabits: prev.selectedHabits.includes(habitName)
        ? prev.selectedHabits.filter(name => name !== habitName)
        : [...prev.selectedHabits, habitName]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.(onboardingData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return onboardingData.sleepGoals.length > 0;
      case 2: return onboardingData.selectedHabits.length > 0;
      default: return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-float">
              <Moon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome to SleepTune</h2>
              <p className="text-text-secondary">
                Your AI bedtime ritual conductor. Let's create a personalized sleep routine that works for you.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">What are your sleep goals?</h2>
              <p className="text-text-secondary">Select all that apply to personalize your experience.</p>
            </div>
            <div className="space-y-3">
              {sleepGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    onboardingData.sleepGoals.includes(goal.id)
                      ? 'bg-accent bg-opacity-20 border-accent border-2'
                      : 'glass-card hover:bg-opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary">{goal.label}</h3>
                      <p className="text-sm text-text-secondary">{goal.description}</p>
                    </div>
                    {onboardingData.sleepGoals.includes(goal.id) && (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Choose your bedtime habits</h2>
              <p className="text-text-secondary">Select habits you'd like to include in your routine.</p>
            </div>
            <div className="space-y-3">
              {DEFAULT_HABITS.map((habit) => (
                <button
                  key={habit.name}
                  onClick={() => handleHabitToggle(habit.name)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    onboardingData.selectedHabits.includes(habit.name)
                      ? 'bg-accent bg-opacity-20 border-accent border-2'
                      : 'glass-card hover:bg-opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary">{habit.name}</h3>
                      <p className="text-sm text-text-secondary">{habit.description}</p>
                      <p className="text-xs text-text-secondary mt-1">{habit.targetDuration} minutes</p>
                    </div>
                    {onboardingData.selectedHabits.includes(habit.name) && (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Set your sleep schedule</h2>
              <p className="text-text-secondary">When do you typically go to bed and wake up?</p>
            </div>
            <div className="space-y-4">
              <div className="glass-card p-4 rounded-xl">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Bedtime
                </label>
                <input
                  type="time"
                  value={onboardingData.bedtime}
                  onChange={(e) => setOnboardingData(prev => ({ ...prev, bedtime: e.target.value }))}
                  className="w-full p-3 bg-surface rounded-lg text-text-primary border border-gray-600 focus:border-accent focus:outline-none"
                />
              </div>
              <div className="glass-card p-4 rounded-xl">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Wake time
                </label>
                <input
                  type="time"
                  value={onboardingData.wakeTime}
                  onChange={(e) => setOnboardingData(prev => ({ ...prev, wakeTime: e.target.value }))}
                  className="w-full p-3 bg-surface rounded-lg text-text-primary border border-gray-600 focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg p-4 flex flex-col">
      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index <= currentStep 
                ? 'bg-accent text-white' 
                : 'bg-surface text-text-secondary'
            }`}>
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-2 ${
                index < currentStep ? 'bg-accent' : 'bg-surface'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          {renderStep()}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            currentStep === 0
              ? 'text-text-secondary cursor-not-allowed'
              : 'text-text-primary hover:bg-surface'
          }`}
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 ${
            canProceed()
              ? 'bg-gradient-to-br from-accent to-primary text-white hover:scale-105'
              : 'bg-surface text-text-secondary cursor-not-allowed'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
