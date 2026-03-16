'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { scrollReveal, scrollRevealProps } from '@/lib/design-system/animations';

// ========================
// COMPONENT
// ========================

export function StoryCTA() {
  return (
    <motion.section
      variants={scrollReveal as any}
      {...(scrollRevealProps as any)}
      className="relative py-16 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />

      {/* Animated Mesh Background */}
      <div className="absolute inset-0 bg-mesh opacity-30" />

      {/* Glow Effects */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 1,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/30 mb-6"
        >
          <Sparkles className="w-8 h-8 text-accent" />
        </motion.div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 font-display">
          Ready to Write Your Success Story?
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Let us discuss how custom AI agents can transform your business and give you back hours every day.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/start">
            <Button size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="secondary">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Trust Indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sm text-text-muted mt-6"
        >
          Join dozens of businesses already saving 10+ hours per week
        </motion.p>
      </div>
    </motion.section>
  );
}

export default StoryCTA;
