'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

// ========================
// TYPES
// ========================

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  hover?: boolean;
  glow?: boolean;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// ========================
// STYLES
// ========================

const paddingSizes = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

// ========================
// COMPONENT
// ========================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      hover = true,
      glow = false,
      interactive = false,
      padding = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        whileHover={hover && !shouldReduceMotion ? { y: -4 } : undefined}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        className={cn(
          // Base styles
          'bg-bg-secondary rounded-xl',
          'border border-white/[0.06]',
          // Padding
          paddingSizes[padding],
          // Shadow
          glow
            ? 'shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.2)]'
            : 'shadow-[0_1px_2px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.15)]',
          // Hover effects
          hover && [
            'hover:border-white/10',
            'hover:shadow-[0_4px_6px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.2)]',
            'transition-all duration-200',
          ],
          // Motion preference
          'motion-reduce:transition-none motion-reduce:transform-none',
          // Interactive (clickable) - includes focus styles
          interactive && [
            'cursor-pointer',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          ],
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// ========================
// FEATURE CARD
// ========================

export interface FeatureCardProps extends Omit<CardProps, 'children'> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('group', className)} {...props}>
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
          <div className="text-accent">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </Card>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

// ========================
// STAT CARD
// ========================

export interface StatCardProps extends Omit<CardProps, 'children'> {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ value, label, suffix = '', prefix = '', className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('text-center', className)} {...props}>
        <div className="font-mono text-4xl font-bold text-text-primary mb-2">
          {prefix}
          {value}
          {suffix}
        </div>
        <div className="text-text-secondary">{label}</div>
      </Card>
    );
  }
);

StatCard.displayName = 'StatCard';

// ========================
// INTERACTIVE CARD
// ========================

export interface InteractiveCardProps extends Omit<CardProps, 'interactive' | 'hover'> {
  selected?: boolean;
  onSelect?: () => void;
  'aria-label'?: string;
}

export const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ selected = false, onSelect, children, className, 'aria-label': ariaLabel, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.();
      }
    };

    return (
      <motion.div
        ref={ref}
        whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
        animate={
          selected
            ? {
                borderColor: 'rgba(139, 92, 246, 0.5)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
              }
            : {
                borderColor: 'rgba(255, 255, 255, 0.06)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15)',
              }
        }
        transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={ariaLabel}
        className={cn(
          'bg-bg-secondary rounded-xl p-6',
          'border cursor-pointer',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          'motion-reduce:transition-none motion-reduce:transform-none',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

InteractiveCard.displayName = 'InteractiveCard';

export default Card;
