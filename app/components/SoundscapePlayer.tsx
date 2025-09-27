'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipForward, SkipBack } from 'lucide-react';
import { Soundscape } from '@/lib/types';
import { formatTime } from '@/lib/utils';

interface SoundscapePlayerProps {
  soundscape: Soundscape;
  variant?: 'idle' | 'playing' | 'paused';
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export function SoundscapePlayer({ 
  soundscape, 
  variant = 'idle',
  onPlayStateChange 
}: SoundscapePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(variant === 'playing');
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onPlayStateChange]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        onPlayStateChange?.(false);
      } else {
        await audio.play();
        setIsPlaying(true);
        onPlayStateChange?.(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration;
    
    audio.currentTime = newTime;
  };

  const progress = soundscape.duration > 0 ? (currentTime / soundscape.duration) * 100 : 0;

  return (
    <div className="glass-card p-6 space-y-4">
      <audio
        ref={audioRef}
        src={soundscape.audioFileUrl}
        preload="metadata"
      />
      
      {/* Soundscape Info */}
      <div className="text-center space-y-2">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center animate-pulse-slow">
          <div className="w-16 h-16 rounded-full bg-surface bg-opacity-50 flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full bg-white ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-text-primary">{soundscape.name}</h3>
        <p className="text-sm text-text-secondary">{soundscape.description}</p>
        <div className="flex items-center justify-center gap-2">
          {soundscape.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-surface rounded-full text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div
          className="w-full h-2 bg-surface rounded-full cursor-pointer overflow-hidden"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-secondary">
          <span>{formatTime(Math.floor(currentTime))}</span>
          <span>{formatTime(soundscape.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => skipTime(-30)}
          className="p-2 rounded-full hover:bg-surface transition-all duration-200"
        >
          <SkipBack className="w-5 h-5 text-text-secondary" />
        </button>
        
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center hover:scale-105 transition-all duration-200 sleep-glow"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>
        
        <button
          onClick={() => skipTime(30)}
          className="p-2 rounded-full hover:bg-surface transition-all duration-200"
        >
          <SkipForward className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <Volume2 className="w-4 h-4 text-text-secondary" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-surface rounded-full appearance-none cursor-pointer"
        />
        <span className="text-xs text-text-secondary w-8">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}
