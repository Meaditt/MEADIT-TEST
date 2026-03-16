'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Send } from 'lucide-react';

interface ContactFormProps {
  qualifierAnswers?: Record<string, string>;
  painWallData?: {
    selectedPains: string[];
    intensity: number;
  };
  onSuccess: () => void;
}

export function ContactForm({ qualifierAnswers, painWallData, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill message with context from Pain Wall if available
  const getDefaultMessage = () => {
    if (!painWallData) return '';

    const pains = painWallData.selectedPains.join(', ');
    const intensity = painWallData.intensity;

    return `I am experiencing these pain points: ${pains}\n\nImpact level: ${intensity}/10\n\nI would like to discuss how AI automation could help.`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your needs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          qualifierAnswers,
          painWallData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      onSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="card p-6 md:p-8 max-w-2xl mx-auto"
    >
      {/* Personalized message if Pain Wall data exists */}
      {painWallData && (
        <div className="mb-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-sm text-text-secondary">
            Based on your responses, we understand your pain points around{' '}
            <span className="text-accent font-semibold">
              {painWallData.selectedPains[0]}
            </span>
            . Let's talk about solutions.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`input ${errors.name ? 'input-error' : ''}`}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-error">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`input ${errors.email ? 'input-error' : ''}`}
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Tell us about your workflow
          </label>
          <textarea
            id="message"
            value={formData.message || getDefaultMessage()}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`input resize-none ${errors.message ? 'input-error' : ''}`}
            rows={6}
            placeholder="What tasks take up most of your time? What would you love to automate?"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-sm text-error">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit error */}
        {errors.submit && (
          <div className="p-4 rounded-lg bg-error/10 border border-error/20">
            <p className="text-sm text-error">{errors.submit}</p>
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          icon={<Send className="w-5 h-5" />}
          iconPosition="right"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </motion.div>
  );
}
