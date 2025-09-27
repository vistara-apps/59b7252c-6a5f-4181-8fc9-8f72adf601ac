'use client';

import { ReactNode } from 'react';
import { Moon, Settings2, User } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showNavigation?: boolean;
}

export function AppShell({ children, title = 'SleepTune', showNavigation = true }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card mx-4 mt-4 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <Moon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
            <p className="text-xs text-text-secondary">Your AI bedtime ritual conductor</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Wallet>
            <ConnectWallet>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface hover:bg-opacity-80 transition-all duration-200">
                <Avatar className="w-6 h-6" />
                <Name className="text-sm text-text-primary" />
              </div>
            </ConnectWallet>
          </Wallet>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNavigation && (
        <nav className="fixed bottom-4 left-4 right-4 glass-card p-4">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface transition-all duration-200">
              <Moon className="w-5 h-5 text-accent" />
              <span className="text-xs text-text-secondary">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface transition-all duration-200">
              <User className="w-5 h-5 text-text-secondary" />
              <span className="text-xs text-text-secondary">Habits</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-surface transition-all duration-200">
              <Settings2 className="w-5 h-5 text-text-secondary" />
              <span className="text-xs text-text-secondary">Settings</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
