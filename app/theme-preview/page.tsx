'use client';

import { useState } from 'react';
import { Moon, Palette, Check } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

const themes = [
  { id: 'default', name: 'Sleep Theme', description: 'Calming blues and purples for better sleep' },
  { id: 'celo', name: 'Celo', description: 'Black background with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta highlights' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Navy background with Coinbase blue' },
];

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Theme Preview</h1>
          <p className="text-text-secondary">Choose your preferred color scheme</p>
        </div>

        {/* Theme Options */}
        <div className="space-y-3">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id as any)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                theme === themeOption.id
                  ? 'bg-accent bg-opacity-20 border-accent border-2'
                  : 'glass-card hover:bg-opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary">{themeOption.name}</h3>
                  <p className="text-sm text-text-secondary">{themeOption.description}</p>
                </div>
                {theme === themeOption.id && (
                  <Check className="w-5 h-5 text-accent" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Preview Components */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-text-primary">Preview</h2>
          
          {/* Sample Card */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Moon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Sample Habit</h3>
                <p className="text-sm text-text-secondary">This is how habits will look</p>
              </div>
            </div>
            <button className="w-full bg-gradient-to-br from-accent to-primary text-white py-2 rounded-lg font-semibold">
              Complete Habit
            </button>
          </div>

          {/* Color Swatches */}
          <div className="glass-card p-4">
            <h4 className="font-semibold text-text-primary mb-3">Color Palette</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-bg rounded-lg mx-auto mb-2 border border-gray-600"></div>
                <span className="text-xs text-text-secondary">Background</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent rounded-lg mx-auto mb-2"></div>
                <span className="text-xs text-text-secondary">Accent</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-2"></div>
                <span className="text-xs text-text-secondary">Primary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-opacity-80 transition-colors duration-200"
          >
            ← Back to App
          </a>
        </div>
      </div>
    </div>
  );
}
