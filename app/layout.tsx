import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SleepTune - Your AI Bedtime Ritual Conductor',
  description: 'Orchestrates your bedtime routine with AI-driven soundscapes and habit guidance for better sleep.',
  keywords: ['sleep', 'bedtime', 'habits', 'soundscapes', 'AI', 'wellness'],
  authors: [{ name: 'SleepTune Team' }],
  openGraph: {
    title: 'SleepTune - Your AI Bedtime Ritual Conductor',
    description: 'Orchestrates your bedtime routine with AI-driven soundscapes and habit guidance for better sleep.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SleepTune - Your AI Bedtime Ritual Conductor',
    description: 'Orchestrates your bedtime routine with AI-driven soundscapes and habit guidance for better sleep.',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
