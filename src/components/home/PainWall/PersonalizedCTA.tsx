'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { usePainWallStore } from '@/lib/store/painWallStore';
import { fadeIn, fadeUp, staggerContainer, staggerItem } from '@/lib/design-system/animations';

// ========================
// BENEFIT CARD COMPONENT
// ========================

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="flex items-start gap-4 p-6 rounded-xl bg-bg-tertiary border border-white/10 hover:border-accent/30 transition-colors duration-300 group"
    >
      <div className="flex-shrink-0 text-4xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </motion.div>
  );
}

// ========================
// COMPONENT
// ========================

export function PersonalizedCTA() {
  const { results, reset } = usePainWallStore();

  if (!results) {
    return (
      <div className="text-center text-text-secondary">
        No results available. Please start over.
      </div>
    );
  }

  const benefits = [
    {
      icon: '⚡',
      title: 'Instant ROI',
      description: `Start saving ${results.hoursPerWeek}h/week from day one. No learning curve, no waiting.`,
    },
    {
      icon: '🎯',
      title: 'Custom Built for You',
      description: 'Not a template. Not a generic tool. AI agents designed specifically for your business.',
    },
    {
      icon: '🔄',
      title: 'Continuous Improvement',
      description: 'Your AI agents learn and adapt as your business grows. They get smarter over time.',
    },
    {
      icon: '🛡️',
      title: 'Risk-Free Start',
      description: 'We build a proof-of-concept first. See the results before committing fully.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        {/* Main Headline */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Reclaim{' '}
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              {results.daysOfLife} days
            </span>{' '}
            of your life this year
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            You've seen the numbers. You know what you're losing.{' '}
            <span className="text-text-primary font-semibold">
              Now it's time to get it back.
            </span>
          </p>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
        >
          <div className="p-4 rounded-xl bg-bg-tertiary border border-white/10">
            <div className="text-3xl font-bold text-accent mb-1">
              {results.hoursPerWeek}h
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider">Per Week</div>
          </div>
          <div className="p-4 rounded-xl bg-bg-tertiary border border-white/10">
            <div className="text-3xl font-bold text-accent mb-1">
              {results.hoursPerYear}h
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider">Per Year</div>
          </div>
          <div className="p-4 rounded-xl bg-bg-tertiary border border-white/10">
            <div className="text-3xl font-bold text-accent mb-1">
              {results.daysOfLife}
            </div>
            <div className="text-xs text-text-muted uppercase tracking-wider">Full Days</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid md:grid-cols-2 gap-4 mb-12"
      >
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="p-10 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 border-2 border-accent/30 text-center mb-8"
      >
        <h3 className="text-3xl font-bold text-text-primary mb-4">
          Let's build your AI workforce
        </h3>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
          Book a free 30-minute strategy call. We'll analyze your workflow, identify automation
          opportunities, and show you exactly how AI can transform your business.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-4 min-w-[250px]"
            onClick={() => {
              // Navigate to booking page
              window.location.href = '/start';
            }}
          >
            Book Free Strategy Call
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 min-w-[250px]"
            onClick={() => {
              // Navigate to case studies
              window.location.href = '/stories';
            }}
          >
            See Success Stories
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>30-minute free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Custom solution for your business</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Start Over */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <Button
          variant="ghost"
          onClick={() => {
            reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Start Over
        </Button>
      </motion.div>
    </div>
  );
}
