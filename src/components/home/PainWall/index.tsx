'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePainWallStore } from '@/lib/store/painWallStore';
import { painWallStep } from '@/lib/design-system/animations';
import { ProgressIndicator } from './ProgressIndicator';
import { PainSelector } from './PainSelector';
import { NumberSliders } from './NumberSliders';
import { DamageReveal } from './DamageReveal';
import { DaySimulation } from './DaySimulation';
import { LifeBack } from './LifeBack';
import { PersonalizedCTA } from './PersonalizedCTA';

// Step names for screen reader announcements
const stepNames: Record<number, string> = {
  1: 'Select Pain Points',
  2: 'Configure Frequency',
  3: 'See Time Cost',
  4: 'Day Comparison',
  5: 'Life Activities',
  6: 'Take Action',
};

// ========================
// MAIN CONTAINER COMPONENT
// ========================

export function PainWall() {
  const { step } = usePainWallStore();
  const shouldReduceMotion = useReducedMotion();

  // Create reduced motion variants
  const accessibleStepVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : painWallStep;

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      aria-label="Interactive time assessment"
      aria-describedby="painwall-description"
    >
      {/* Screen reader description */}
      <p id="painwall-description" className="sr-only">
        A 6-step interactive tool to help you discover how much time you could save with AI automation.
        Currently on step {step} of 6: {stepNames[step]}.
      </p>

      {/* Live region for step announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Step {step} of 6: {stepNames[step]}
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary pointer-events-none" aria-hidden="true" />

      {/* Mesh Gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 10%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 20%, rgba(6, 182, 212, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 80%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)
          `,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Step Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={accessibleStepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={shouldReduceMotion ? { duration: 0 } : undefined}
            className="min-h-[600px] flex items-center justify-center"
          >
            {step === 1 && <PainSelector />}
            {step === 2 && <NumberSliders />}
            {step === 3 && <DamageReveal />}
            {step === 4 && <DaySimulation />}
            {step === 5 && <LifeBack />}
            {step === 6 && <PersonalizedCTA />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default PainWall;
