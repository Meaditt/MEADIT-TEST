'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { scrollReveal, scrollRevealProps } from '@/lib/design-system/animations';
import { cn } from '@/lib/utils/cn';
import type { Story } from '@/lib/data/stories';

// ========================
// TYPES
// ========================

export interface ResultsBlockProps {
  results: Story['results'];
}

// ========================
// COMPONENT
// ========================

export function ResultsBlock({ results }: ResultsBlockProps) {
  return (
    <motion.section
      variants={scrollReveal as any}
      {...(scrollRevealProps as any)}
      className="py-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
            The Numbers Don't Lie
          </h2>
          <p className="text-lg text-text-secondary">
            Real results from real implementation
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((result, index) => (
            <ResultCard key={result.label} result={result} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ========================
// RESULT CARD SUB-COMPONENT
// ========================

interface ResultCardProps {
  result: Story['results'][0];
  index: number;
}

function ResultCard({ result, index }: ResultCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'relative p-6 rounded-xl',
        'bg-bg-secondary border border-white/[0.06]',
        'hover:border-white/10',
        'shadow-[0_1px_2px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.15)]',
        'transition-all duration-200'
      )}
    >
      {/* Label */}
      <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
        {result.label}
      </h3>

      {/* Before → After Comparison */}
      <div className="flex items-center gap-4 mb-4">
        {/* Before */}
        <div className="flex-1">
          <div className="text-xs text-text-muted mb-1">Before</div>
          <div className="text-2xl font-bold text-text-secondary font-mono">
            {result.before}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <ArrowRight className="w-5 h-5 text-accent" />
        </div>

        {/* After */}
        <div className="flex-1">
          <div className="text-xs text-text-muted mb-1">After</div>
          <div className="text-2xl font-bold text-accent font-mono">
            {result.after}
          </div>
        </div>
      </div>

      {/* Improvement Badge */}
      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
        <span className="text-sm font-semibold text-accent">
          {result.improvement}
        </span>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
    </motion.div>
  );
}

// ========================
// ANIMATED NUMBER (Optional Enhancement)
// ========================

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 2,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref} className={className}>0</span>;
}

export default ResultsBlock;
