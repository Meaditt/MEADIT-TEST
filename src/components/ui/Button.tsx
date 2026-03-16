'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

// ========================
// TYPES
// ========================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

// ========================
// STYLES
// ========================

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-accent text-white
    hover:bg-accent-light
    shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.2)]
    hover:shadow-[0_0_30px_rgba(139,92,246,0.5),0_0_60px_rgba(139,92,246,0.3)]
    border border-transparent
  `,
  secondary: `
    bg-bg-tertiary text-text-primary
    hover:bg-white/10
    border border-white/10 hover:border-white/20
  `,
  ghost: `
    bg-transparent text-text-secondary
    hover:text-text-primary hover:bg-white/5
    border border-transparent
  `,
  outline: `
    bg-transparent text-accent
    hover:bg-accent/10
    border border-accent/50 hover:border-accent
  `,
  danger: `
    bg-error text-white
    hover:bg-error-light
    shadow-[0_0_20px_rgba(239,68,68,0.3),0_0_40px_rgba(239,68,68,0.2)]
    border border-transparent
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
};

// ========================
// LOADING SPINNER
// ========================

const LoadingSpinner = () => (
  <svg
    className="w-4 h-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// ========================
// COMPONENT
// ========================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled || shouldReduceMotion ? undefined : { scale: 1.02 }}
        whileTap={isDisabled || shouldReduceMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        aria-label={isLoading && ariaLabel ? `${ariaLabel}, loading` : ariaLabel}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'font-medium rounded-lg',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          // Motion preference styles
          'motion-reduce:transition-none motion-reduce:transform-none',
          // Variant styles
          variants[variant],
          // Size styles
          sizes[size],
          // Full width
          fullWidth && 'w-full',
          // Custom className
          className
        )}
        {...props}
      >
        {isLoading && (
          <>
            <LoadingSpinner />
            <span className="sr-only">Loading</span>
          </>
        )}
        {!isLoading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
        )}
        <span>{children as any}</span>
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// ========================
// ICON BUTTON VARIANT
// ========================

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    const iconSizes: Record<ButtonSize, string> = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    return (
      <Button
        ref={ref}
        size={size}
        className={cn('!p-0', iconSizes[size], className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default Button;
