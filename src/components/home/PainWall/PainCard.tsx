'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import type { PainPoint } from '@/lib/data/painPoints';

// ========================
// TYPES
// ========================

interface PainCardProps {
  pain: PainPoint;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}

// ========================
// COMPONENT
// ========================

export function PainCard({ pain, isSelected, onToggle, index }: PainCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={onToggle}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : {
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className={cn(
        'relative group',
        'w-full p-6 rounded-xl',
        'text-left',
        'transition-all duration-200',
        'border-2',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
        'motion-reduce:transition-none motion-reduce:transform-none',
        isSelected
          ? 'border-accent bg-accent/10'
          : 'border-white/10 bg-bg-tertiary hover:border-white/20'
      )}
      aria-pressed={isSelected}
      aria-label={`${pain.title}: ${pain.subtitle}. ${isSelected ? 'Selected' : 'Not selected'}`}
      role="checkbox"
      aria-checked={isSelected}
    >
      {/* Selection Indicator */}
      <div className="absolute top-4 right-4" aria-hidden="true">
        <div
          className={cn(
            'w-6 h-6 rounded-full border-2 transition-all duration-200 motion-reduce:transition-none',
            'flex items-center justify-center',
            isSelected
              ? 'border-accent bg-accent'
              : 'border-white/30 bg-transparent group-hover:border-white/50'
          )}
        >
          {isSelected && (
            <motion.svg
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </div>
      </div>

      {/* Glow Effect - only if not reduced motion */}
      {isSelected && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15), transparent 70%)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-4xl mb-4" aria-hidden="true">{pain.icon}</div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          {pain.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-text-secondary mb-3">{pain.subtitle}</p>

        {/* Description */}
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
          {pain.description}
        </p>
      </div>

      {/* Animated border glow on selection - only if not reduced motion */}
      {isSelected && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          aria-hidden="true"
          animate={{
            boxShadow: [
              '0 0 20px rgba(139, 92, 246, 0.3)',
              '0 0 30px rgba(139, 92, 246, 0.5)',
              '0 0 20px rgba(139, 92, 246, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.button>
  );
}
