'use client';

import { Check, Crown, Star } from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';

interface SubscriptionTierCardProps {
  plan: SubscriptionPlan;
  variant?: 'free' | 'premium' | 'coach';
  isCurrentPlan?: boolean;
  onSelect?: (tier: string) => void;
}

export function SubscriptionTierCard({ 
  plan, 
  variant = plan.tier as any,
  isCurrentPlan = false,
  onSelect 
}: SubscriptionTierCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'premium':
        return 'border-accent border-2 bg-accent bg-opacity-10';
      case 'coach':
        return 'border-primary border-2 bg-primary bg-opacity-10';
      default:
        return 'glass-card';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'premium':
        return <Star className="w-5 h-5 text-accent" />;
      case 'coach':
        return <Crown className="w-5 h-5 text-primary" />;
      default:
        return null;
    }
  };

  const handleSelect = () => {
    if (!isCurrentPlan) {
      onSelect?.(plan.tier);
    }
  };

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${getVariantStyles()}`}>
      {plan.isPopular && (
        <div className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
          Most Popular
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-2">
        {getIcon()}
        <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
      </div>
      
      <div className="mb-4">
        <span className="text-3xl font-bold text-text-primary">
          ${plan.price}
        </span>
        {plan.price > 0 && (
          <span className="text-text-secondary">/month</span>
        )}
      </div>
      
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <span className="text-sm text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={handleSelect}
        disabled={isCurrentPlan}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          isCurrentPlan
            ? 'bg-surface text-text-secondary cursor-not-allowed'
            : variant === 'premium'
            ? 'bg-accent text-white hover:bg-opacity-90'
            : variant === 'coach'
            ? 'bg-primary text-white hover:bg-opacity-90'
            : 'bg-surface text-text-primary hover:bg-opacity-80'
        }`}
      >
        {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
      </button>
    </div>
  );
}
