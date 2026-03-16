'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { usePainWallStore } from '@/lib/store/painWallStore';
import { cn } from '@/lib/utils/cn';

// ========================
// TIMELINE BLOCK COMPONENT
// ========================

interface TimeBlockProps {
  hour: number;
  type: 'work' | 'manual' | 'automated' | 'free';
  label?: string;
  index: number;
}

function TimeBlock({ hour, type, label, index }: TimeBlockProps) {
  const colors = {
    work: 'bg-blue-500/80',
    manual: 'bg-error/80',
    automated: 'bg-success/80',
    free: 'bg-accent/80',
  };

  const labels = {
    work: 'Core Work',
    manual: 'Manual Tasks',
    automated: 'AI Automated',
    free: 'Free Time',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group"
    >
      <div
        className={cn(
          'h-8 rounded transition-all duration-200',
          colors[type],
          'hover:brightness-110'
        )}
      />
      <div className="absolute left-0 right-0 -bottom-6 text-[10px] text-center text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
        {label || labels[type]}
      </div>
    </motion.div>
  );
}

// ========================
// COMPONENT
// ========================

export function DaySimulation() {
  const { results, nextStep, prevStep } = usePainWallStore();

  if (!results) {
    return (
      <div className="text-center text-text-secondary">
        No results available. Please go back and configure your pain points.
      </div>
    );
  }

  const hoursPerDay = results.hoursPerWeek / 5; // Assuming 5-day work week

  // Create timeline arrays (24 hours)
  const beforeBlocks = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    if (hour >= 9 && hour < 17) {
      // Work hours
      if (hour >= 9 && hour < 9 + Math.ceil(hoursPerDay)) {
        return { hour, type: 'manual' as const, label: 'Manual Tasks' };
      }
      return { hour, type: 'work' as const, label: 'Core Work' };
    }
    return { hour, type: 'free' as const, label: 'Personal Time' };
  });

  const afterBlocks = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    if (hour >= 9 && hour < 17) {
      // Work hours - but with automation
      if (hour >= 9 && hour < 9 + Math.ceil(hoursPerDay / 4)) {
        return { hour, type: 'automated' as const, label: 'AI Handles This' };
      }
      return { hour, type: 'work' as const, label: 'Core Work' };
    }
    if (hour >= 17 && hour < 17 + Math.ceil(hoursPerDay)) {
      return { hour, type: 'free' as const, label: 'Your Time Back' };
    }
    return { hour, type: 'free' as const, label: 'Personal Time' };
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          A Day in Your Life
        </h2>
        <p className="text-lg text-text-secondary">
          See what happens when AI handles the busywork
        </p>
      </motion.div>

      {/* Split Screen Comparison */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* BEFORE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 rounded-full bg-error/20 border border-error/30 mb-3">
              <span className="text-sm font-semibold text-error uppercase tracking-wider">
                Before
              </span>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Drowning in Manual Work
            </h3>
            <p className="text-text-secondary">
              {hoursPerDay.toFixed(1)} hours/day lost to repetitive tasks
            </p>
          </div>

          <div className="p-6 rounded-xl bg-bg-tertiary border border-white/10">
            <div className="space-y-2 mb-6">
              {beforeBlocks.map((block, index) => (
                <TimeBlock key={index} {...block} index={index} />
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-blue-500/80" />
                <span className="text-text-muted">Core Work</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-error/80" />
                <span className="text-text-muted">Manual Tasks</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 rounded-lg bg-error/10 border border-error/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-error mb-1">
                {hoursPerDay.toFixed(1)}h
              </div>
              <p className="text-sm text-text-muted">Wasted Every Day</p>
            </div>
          </div>
        </motion.div>

        {/* AFTER */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-2 rounded-full bg-success/20 border border-success/30 mb-3">
              <span className="text-sm font-semibold text-success uppercase tracking-wider">
                After
              </span>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              AI Does the Heavy Lifting
            </h3>
            <p className="text-text-secondary">
              Reclaim {hoursPerDay.toFixed(1)} hours for what matters
            </p>
          </div>

          <div className="p-6 rounded-xl bg-bg-tertiary border border-white/10">
            <div className="space-y-2 mb-6">
              {afterBlocks.map((block, index) => (
                <TimeBlock key={index} {...block} index={index} />
              ))}
            </div>

            {/* Legend */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-blue-500/80" />
                <span className="text-text-muted">Core Work</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-success/80" />
                <span className="text-text-muted">AI Automated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-accent/80" />
                <span className="text-text-muted">Time Saved</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-1">
                {hoursPerDay.toFixed(1)}h
              </div>
              <p className="text-sm text-text-muted">Reclaimed Every Day</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="p-8 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 border border-accent/30 text-center mb-12"
      >
        <p className="text-xl text-text-primary mb-2">
          That's <span className="font-bold text-accent">{results.daysOfLife} full days</span> back
          in your life every year.
        </p>
        <p className="text-text-secondary">
          Imagine what you could do with that time...
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          Show Me What I Could Do
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
