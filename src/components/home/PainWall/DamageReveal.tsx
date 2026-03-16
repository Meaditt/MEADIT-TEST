'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { usePainWallStore } from '@/lib/store/painWallStore';

// ========================
// ANIMATED NUMBER COMPONENT
// ========================

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  decimals?: number;
}

function AnimatedNumber({ value, duration = 2, delay = 0, decimals = 0 }: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    return decimals === 0 ? Math.round(latest) : latest.toFixed(decimals);
  });

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });

    return controls.stop;
  }, [motionValue, value, duration, delay]);

  return <motion.span>{rounded as any}</motion.span>;
}

// ========================
// COMPONENT
// ========================

export function DamageReveal() {
  const { results, nextStep, prevStep } = usePainWallStore();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!results) {
    return (
      <div className="text-center text-text-secondary">
        No results available. Please go back and configure your pain points.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          The Real Cost
        </h2>
        <p className="text-lg text-text-secondary">
          Here's exactly how much time you're losing to manual work
        </p>
      </motion.div>

      {/* Staged Reveal */}
      <div className="space-y-8 mb-12">
        {/* Stage 1: Hours Per Week */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={
            stage >= 1
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.9, y: 20 }
          }
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="p-12 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/30">
            <div className="text-center">
              <p className="text-sm text-text-secondary uppercase tracking-wider mb-3">
                Every Week
              </p>
              <div className="text-7xl font-bold text-warning mb-3">
                {stage >= 1 && (
                  <AnimatedNumber value={results.hoursPerWeek} decimals={1} duration={1.5} />
                )}
              </div>
              <p className="text-2xl text-text-primary font-semibold">hours lost</p>
            </div>
          </div>
          {stage >= 1 && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(245, 158, 11, 0.3)',
                  '0 0 50px rgba(245, 158, 11, 0.5)',
                  '0 0 30px rgba(245, 158, 11, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>

        {/* Stage 2: Hours Per Year */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={
            stage >= 2
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.9, y: 20 }
          }
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="p-12 rounded-2xl bg-gradient-to-br from-error/20 to-error/5 border border-error/30">
            <div className="text-center">
              <p className="text-sm text-text-secondary uppercase tracking-wider mb-3">
                Every Year
              </p>
              <div className="text-7xl font-bold text-error mb-3">
                {stage >= 2 && (
                  <AnimatedNumber value={results.hoursPerYear} duration={1.5} delay={0.2} />
                )}
              </div>
              <p className="text-2xl text-text-primary font-semibold">hours wasted</p>
            </div>
          </div>
          {stage >= 2 && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(239, 68, 68, 0.3)',
                  '0 0 50px rgba(239, 68, 68, 0.5)',
                  '0 0 30px rgba(239, 68, 68, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>

        {/* Stage 3: Days of Life */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={
            stage >= 3
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.9, y: 20 }
          }
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="p-12 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 border-2 border-accent/50">
            <div className="text-center">
              <p className="text-sm text-text-secondary uppercase tracking-wider mb-3">
                That's
              </p>
              <div className="text-8xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-3">
                {stage >= 3 && (
                  <AnimatedNumber value={results.daysOfLife} decimals={1} duration={2} delay={0.3} />
                )}
              </div>
              <p className="text-3xl text-text-primary font-bold mb-2">
                full days of your life
              </p>
              <p className="text-text-secondary">
                Gone. Every single year.
              </p>
            </div>
          </div>
          {stage >= 3 && (
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(139, 92, 246, 0.4)',
                  '0 0 60px rgba(139, 92, 246, 0.6)',
                  '0 0 40px rgba(139, 92, 246, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>
      </div>

      {/* Impact Message */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xl text-text-primary mb-4">
            What could you do with{' '}
            <span className="font-bold text-accent">{results.daysOfLife} extra days</span> every
            year?
          </p>
          <p className="text-text-secondary">
            Let's visualize what your life could look like without these time drains.
          </p>
        </motion.div>
      )}

      {/* Actions */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

          <Button size="lg" onClick={nextStep}>
            Show Me What I Could Gain
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
      )}
    </div>
  );
}
