'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { PainCard } from './PainCard';
import { painPoints } from '@/lib/data/painPoints';
import { usePainWallStore } from '@/lib/store/painWallStore';
import { staggerContainer } from '@/lib/design-system/animations';

// ========================
// COMPONENT
// ========================

export function PainSelector() {
  const { selectedPains, togglePain, nextStep } = usePainWallStore();
  const shouldReduceMotion = useReducedMotion();

  const handleContinue = () => {
    if (selectedPains.length > 0) {
      nextStep();
    }
  };

  const selectedCount = selectedPains.length;
  const canContinue = selectedCount > 0;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Which tasks are draining your time?
        </h2>
        <p className="text-lg text-text-secondary">
          Select all that apply. Be honest - every minute counts.
        </p>
      </motion.div>

      {/* Pain Points Grid */}
      <motion.div
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        role="group"
        aria-label="Time-draining tasks selection"
      >
        {painPoints.map((pain, index) => (
          <PainCard
            key={pain.id}
            pain={pain}
            isSelected={selectedPains.includes(pain.id)}
            onToggle={() => togglePain(pain.id)}
            index={index}
          />
        ))}
      </motion.div>

      {/* Selection Counter & Continue Button */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4"
      >
        {/* Counter */}
        <div className="text-center" aria-live="polite" aria-atomic="true">
          <motion.div
            key={selectedCount}
            initial={shouldReduceMotion ? { opacity: 1 } : { scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-bold text-accent mb-2"
          >
            {selectedCount} {selectedCount === 1 ? 'task' : 'tasks'} selected
          </motion.div>
          <p className="text-sm text-text-muted" id="selection-hint">
            {canContinue
              ? "Let's see how much time you're spending"
              : 'Select at least one task to continue'}
          </p>
        </div>

        {/* Continue Button */}
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!canContinue}
          className="min-w-[200px]"
          aria-describedby="selection-hint"
        >
          Continue
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
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
