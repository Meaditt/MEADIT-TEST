'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { painPoints } from '@/lib/data/painPoints';
import { usePainWallStore } from '@/lib/store/painWallStore';
import { cn } from '@/lib/utils/cn';

// ========================
// COMPONENT
// ========================

export function NumberSliders() {
  const { selectedPains, painConfigs, updatePainConfig, calculateResults, nextStep, prevStep } =
    usePainWallStore();

  // Initialize configs with default values
  useEffect(() => {
    selectedPains.forEach((painId) => {
      if (!painConfigs[painId]) {
        const pain = painPoints.find((p) => p.id === painId);
        if (pain) {
          updatePainConfig(painId, {
            frequency: pain.defaultFrequency,
            duration: pain.defaultDuration,
          });
        }
      }
    });
  }, [selectedPains, painConfigs, updatePainConfig]);

  const handleContinue = () => {
    calculateResults();
    nextStep();
  };

  // Calculate total time preview
  const totalMinutesPerDay = selectedPains.reduce((total, painId) => {
    const config = painConfigs[painId];
    if (config) {
      return total + config.frequency * config.duration;
    }
    return total;
  }, 0);

  const hoursPerDay = Math.round((totalMinutesPerDay / 60) * 10) / 10;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          How often do you do these?
        </h2>
        <p className="text-lg text-text-secondary">
          Be specific. We'll calculate exactly how much time you're losing.
        </p>
      </motion.div>

      {/* Sliders */}
      <div className="space-y-8 mb-8">
        {selectedPains.map((painId, index) => {
          const pain = painPoints.find((p) => p.id === painId);
          const config = painConfigs[painId] || {
            frequency: pain?.defaultFrequency || 1,
            duration: pain?.defaultDuration || 5,
          };

          if (!pain) return null;

          const minutesPerDay = config.frequency * config.duration;
          const hoursPerWeek = (minutesPerDay / 60) * 5;

          return (
            <motion.div
              key={painId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-6 rounded-xl bg-bg-tertiary border border-white/10"
            >
              {/* Pain Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-3xl">{pain.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {pain.title}
                  </h3>
                  <p className="text-sm text-text-secondary">{pain.subtitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">
                    {hoursPerWeek.toFixed(1)}h
                  </div>
                  <div className="text-xs text-text-muted">per week</div>
                </div>
              </div>

              {/* Frequency Slider */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-text-primary">
                    How many times per day?
                  </label>
                  <span className="text-sm font-semibold text-accent">
                    {config.frequency}x
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={config.frequency}
                  onChange={(e) =>
                    updatePainConfig(painId, {
                      ...config,
                      frequency: parseInt(e.target.value),
                    })
                  }
                  className={cn(
                    'w-full h-2 rounded-full appearance-none cursor-pointer',
                    'bg-white/10',
                    '[&::-webkit-slider-thumb]:appearance-none',
                    '[&::-webkit-slider-thumb]:w-5',
                    '[&::-webkit-slider-thumb]:h-5',
                    '[&::-webkit-slider-thumb]:rounded-full',
                    '[&::-webkit-slider-thumb]:bg-accent',
                    '[&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(139,92,246,0.5)]',
                    '[&::-webkit-slider-thumb]:cursor-pointer',
                    '[&::-moz-range-thumb]:w-5',
                    '[&::-moz-range-thumb]:h-5',
                    '[&::-moz-range-thumb]:rounded-full',
                    '[&::-moz-range-thumb]:bg-accent',
                    '[&::-moz-range-thumb]:border-0',
                    '[&::-moz-range-thumb]:shadow-[0_0_20px_rgba(139,92,246,0.5)]',
                    '[&::-moz-range-thumb]:cursor-pointer'
                  )}
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>1</span>
                  <span>50+</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-text-primary">
                    Minutes per occurrence?
                  </label>
                  <span className="text-sm font-semibold text-accent">
                    {config.duration} min
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={config.duration}
                  onChange={(e) =>
                    updatePainConfig(painId, {
                      ...config,
                      duration: parseInt(e.target.value),
                    })
                  }
                  className={cn(
                    'w-full h-2 rounded-full appearance-none cursor-pointer',
                    'bg-white/10',
                    '[&::-webkit-slider-thumb]:appearance-none',
                    '[&::-webkit-slider-thumb]:w-5',
                    '[&::-webkit-slider-thumb]:h-5',
                    '[&::-webkit-slider-thumb]:rounded-full',
                    '[&::-webkit-slider-thumb]:bg-accent',
                    '[&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(139,92,246,0.5)]',
                    '[&::-webkit-slider-thumb]:cursor-pointer',
                    '[&::-moz-range-thumb]:w-5',
                    '[&::-moz-range-thumb]:h-5',
                    '[&::-moz-range-thumb]:rounded-full',
                    '[&::-moz-range-thumb]:bg-accent',
                    '[&::-moz-range-thumb]:border-0',
                    '[&::-moz-range-thumb]:shadow-[0_0_20px_rgba(139,92,246,0.5)]',
                    '[&::-moz-range-thumb]:cursor-pointer'
                  )}
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>1 min</span>
                  <span>2 hrs</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-accent/30 mb-8"
      >
        <div className="text-center">
          <p className="text-sm text-text-secondary mb-2">Daily Total</p>
          <motion.div
            key={totalMinutesPerDay}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-bold text-accent mb-2"
          >
            {hoursPerDay} hours
          </motion.div>
          <p className="text-text-muted">
            That's{' '}
            <span className="text-text-primary font-semibold">
              {Math.round(totalMinutesPerDay)} minutes
            </span>{' '}
            every single day
          </p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={prevStep}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Button>

        <Button size="lg" onClick={handleContinue}>
          Calculate My Lost Time
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Button>
      </motion.div>
    </div>
  );
}
