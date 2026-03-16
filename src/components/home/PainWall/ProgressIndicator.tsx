'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePainWallStore, type PainWallStep } from '@/lib/store/painWallStore';
import { cn } from '@/lib/utils/cn';

// ========================
// TYPES
// ========================

interface StepInfo {
  number: PainWallStep;
  label: string;
  shortLabel: string;
}

const steps: StepInfo[] = [
  { number: 1, label: 'Select Pain Points', shortLabel: 'Select' },
  { number: 2, label: 'Configure Frequency', shortLabel: 'Configure' },
  { number: 3, label: 'See Time Cost', shortLabel: 'Reveal' },
  { number: 4, label: 'Day Comparison', shortLabel: 'Compare' },
  { number: 5, label: 'Life Activities', shortLabel: 'Explore' },
  { number: 6, label: 'Take Action', shortLabel: 'Action' },
];

// ========================
// COMPONENT
// ========================

export function ProgressIndicator() {
  const { step, goToStep } = usePainWallStore();
  const shouldReduceMotion = useReducedMotion();

  const canNavigateToStep = (targetStep: PainWallStep): boolean => {
    // Can only go back to previous steps, not forward
    return targetStep < step;
  };

  const progressPercentage = Math.round(((step - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto mb-12" role="navigation" aria-label="Progress steps">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" aria-hidden="true" />

        {/* Active Progress Bar */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${progressPercentage}% complete`}
        />

        {/* Step Indicators */}
        {steps.map((stepInfo, index) => {
          const isActive = step === stepInfo.number;
          const isCompleted = step > stepInfo.number;
          const isClickable = canNavigateToStep(stepInfo.number);

          return (
            <button
              key={stepInfo.number}
              onClick={() => isClickable && goToStep(stepInfo.number)}
              disabled={!isClickable}
              aria-label={`Step ${stepInfo.number}: ${stepInfo.label}${isCompleted ? ', completed' : isActive ? ', current step' : ''}`}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'relative flex flex-col items-center gap-2 z-10 transition-opacity duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-lg p-2 -m-2',
                'motion-reduce:transition-none',
                isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
              )}
            >
              {/* Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive && !shouldReduceMotion ? 1.1 : 1,
                  backgroundColor: isCompleted || isActive
                    ? 'rgb(139, 92, 246)'
                    : 'rgb(26, 26, 36)',
                  borderColor: isCompleted || isActive
                    ? 'rgb(139, 92, 246)'
                    : 'rgba(255, 255, 255, 0.2)',
                }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'w-10 h-10 rounded-full border-2 flex items-center justify-center',
                  'transition-all duration-300 motion-reduce:transition-none'
                )}
                aria-hidden="true"
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      isActive ? 'text-white' : 'text-text-muted'
                    )}
                  >
                    {stepInfo.number}
                  </span>
                )}
              </motion.div>

              {/* Label */}
              <span
                className={cn(
                  'text-xs text-center whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none',
                  isActive ? 'text-text-primary font-semibold' : 'text-text-muted'
                )}
              >
                {stepInfo.label}
              </span>

              {/* Active Glow - only if not reduced motion */}
              {isActive && !shouldReduceMotion && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(139, 92, 246, 0.4)',
                      '0 0 30px rgba(139, 92, 246, 0.6)',
                      '0 0 20px rgba(139, 92, 246, 0.4)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-secondary">
            Step {step} of {steps.length}
          </span>
          <span className="text-sm font-semibold text-accent" aria-current="step">
            {steps[step - 1].label}
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className="relative h-2 bg-white/10 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round((step / steps.length) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${Math.round((step / steps.length) * 100)}% complete`}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-secondary"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / steps.length) * 100}%` }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Step Dots */}
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Steps">
          {steps.map((stepInfo) => {
            const isActive = step === stepInfo.number;
            const isCompleted = step > stepInfo.number;
            const isClickable = canNavigateToStep(stepInfo.number);

            return (
              <button
                key={stepInfo.number}
                onClick={() => isClickable && goToStep(stepInfo.number)}
                disabled={!isClickable}
                role="tab"
                aria-selected={isActive}
                aria-label={`Step ${stepInfo.number}: ${stepInfo.label}${isCompleted ? ', completed' : isActive ? ', current' : ''}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300 motion-reduce:transition-none',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
                  isActive
                    ? 'bg-accent w-8'
                    : isCompleted
                    ? 'bg-accent/50 w-2'
                    : 'bg-white/20 w-2'
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
