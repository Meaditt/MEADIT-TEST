'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

// ========================
// INPUT COMPONENT
// ========================

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, iconPosition = 'left', className, id, required, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint && !error ? `${inputId}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            {label}
            {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            aria-required={required}
            className={cn(
              // Base styles
              'w-full px-4 py-2.5',
              'bg-bg-tertiary text-text-primary',
              'border border-white/10',
              'rounded-lg',
              'placeholder:text-text-muted',
              // Focus styles
              'focus:outline-none focus:border-accent',
              'focus:shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.2)]',
              'transition-all duration-200',
              // Motion preference
              'motion-reduce:transition-none',
              // Icon padding
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              // Error state
              error && [
                'border-error',
                'focus:border-error',
                'focus:shadow-[0_0_20px_rgba(239,68,68,0.3),0_0_40px_rgba(239,68,68,0.2)]',
              ],
              // Disabled state
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-2 text-sm text-error" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-2 text-sm text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ========================
// TEXTAREA COMPONENT
// ========================

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, rows = 4, required, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint && !error ? `${textareaId}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            {label}
            {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          aria-required={required}
          className={cn(
            // Base styles
            'w-full px-4 py-2.5',
            'bg-bg-tertiary text-text-primary',
            'border border-white/10',
            'rounded-lg',
            'placeholder:text-text-muted',
            'resize-none',
            // Focus styles
            'focus:outline-none focus:border-accent',
            'focus:shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_40px_rgba(139,92,246,0.2)]',
            'transition-all duration-200',
            // Motion preference
            'motion-reduce:transition-none',
            // Error state
            error && [
              'border-error',
              'focus:border-error',
              'focus:shadow-[0_0_20px_rgba(239,68,68,0.3),0_0_40px_rgba(239,68,68,0.2)]',
            ],
            // Disabled state
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-2 text-sm text-error" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-2 text-sm text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ========================
// FORM FIELD WRAPPER
// ========================

export interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField = ({ children, label, error, hint, required }: FormFieldProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
      {hint && !error && <p className="mt-2 text-sm text-text-muted">{hint}</p>}
    </div>
  );
};

export default Input;
