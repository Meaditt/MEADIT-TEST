// ========================
// FRAMER MOTION ANIMATION SYSTEM
// ========================

import type { Variants, Transition } from 'framer-motion';

// ========================
// TRANSITION PRESETS
// ========================

// Premium cubic bezier — imperceptibly smoother, registers as expensive
const EASE_PREMIUM = [0.25, 0.1, 0.25, 1] as const;

export const transitions = {
  fast: { duration: 0.105, ease: EASE_PREMIUM },
  normal: { duration: 0.175, ease: EASE_PREMIUM },
  moderate: { duration: 0.315, ease: EASE_PREMIUM },
  slow: { duration: 0.49, ease: EASE_PREMIUM },
  spring: { type: 'spring', stiffness: 260, damping: 34 },
  bounce: { type: 'spring', stiffness: 340, damping: 12 },
} as const;

// ========================
// ENTRANCE ANIMATIONS
// ========================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 7 },
};

export const fadeDown: Variants = {
  initial: { opacity: 0, y: -14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -7 },
};

export const fadeLeft: Variants = {
  initial: { opacity: 0, x: 14 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 7 },
};

export const fadeRight: Variants = {
  initial: { opacity: 0, x: -14 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -7 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -21 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 21 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export const slideInUp: Variants = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 18 },
};

// ========================
// STAGGER ANIMATIONS
// ========================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.056,
      delayChildren: 0.07,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.21, ease: EASE_PREMIUM },
  },
};

export const staggerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

export const staggerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.105,
    },
  },
};

// ========================
// SCROLL ANIMATIONS
// ========================

export const scrollReveal: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export const scrollRevealProps = {
  initial: 'initial',
  whileInView: 'animate',
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.49, ease: EASE_PREMIUM },
};

// ========================
// BUTTON ANIMATIONS
// ========================

export const buttonTap = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.07 },
};

export const buttonHover = {
  whileHover: { scale: 1.02 },
  transition: { duration: 0.14, ease: EASE_PREMIUM },
};

export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

// ========================
// GLOW PULSE ANIMATION
// ========================

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
      '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
      '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
    ],
  },
  transition: {
    duration: 1.4,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

// ========================
// CARD ANIMATIONS
// ========================

export const cardHover = {
  whileHover: { y: -3 },
  transition: { duration: 0.14, ease: EASE_PREMIUM },
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.21, ease: EASE_PREMIUM },
  },
  hover: {
    y: -3,
    transition: { duration: 0.14, ease: EASE_PREMIUM },
  },
};

// ========================
// PAGE TRANSITIONS
// ========================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
};

export const pageTransitionProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  transition: { duration: 0.21, ease: EASE_PREMIUM },
};

// ========================
// MODAL ANIMATIONS
// ========================

export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 7 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 4 },
};

// ========================
// NUMBER COUNTER CONFIG
// ========================

export const createCountUpConfig = (end: number, duration = 1.4): Transition => ({
  duration,
  ease: EASE_PREMIUM,
});

// ========================
// HERO SPECIFIC
// ========================

export const heroTextVariants: Variants = {
  initial: { opacity: 0, y: 21 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_PREMIUM },
  },
};

export const heroContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.105,
      delayChildren: 0.14,
    },
  },
};

// ========================
// PAIN WALL ANIMATIONS
// ========================

export const painWallStep: Variants = {
  initial: { opacity: 0, x: 35 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    x: -35,
    transition: { duration: 0.21, ease: EASE_PREMIUM },
  },
};

export const painCardSelect: Variants = {
  unselected: {
    scale: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  selected: {
    scale: 1.02,
    borderColor: 'rgba(139, 92, 246, 0.5)',
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
};

export const numberReveal: Variants = {
  initial: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.42, ease: EASE_PREMIUM },
  },
};

// ========================
// UTILITIES
// ========================

export const getStaggerDelay = (index: number, baseDelay = 0.056) => ({
  transition: { delay: index * baseDelay },
});

export const withReducedMotion = (variants: Variants): Variants => ({
  ...variants,
  animate: {
    ...variants.animate,
    transition: { duration: 0 },
  },
});
