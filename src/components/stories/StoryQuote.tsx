'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { scrollReveal, scrollRevealProps } from '@/lib/design-system/animations';
import type { Story } from '@/lib/data/stories';

// ========================
// TYPES
// ========================

export interface StoryQuoteProps {
  quote: Story['quote'];
}

// ========================
// COMPONENT
// ========================

export function StoryQuote({ quote }: StoryQuoteProps) {
  if (!quote) return null;

  return (
    <motion.section
      variants={scrollReveal as any}
      {...(scrollRevealProps as any)}
      className="py-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Quote Icon Background */}
          <div className="absolute -top-4 -left-4 text-accent/10">
            <Quote className="w-24 h-24" />
          </div>

          {/* Quote Card */}
          <div className="relative bg-bg-secondary rounded-2xl p-8 md:p-12 border border-white/[0.06] shadow-[0_4px_6px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.2)]">
            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed mb-6 font-display">
              "{quote.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              {/* Author Avatar Placeholder */}
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                <span className="text-accent font-bold text-lg">
                  {quote.author.charAt(0)}
                </span>
              </div>

              {/* Author Info */}
              <div>
                <cite className="not-italic font-semibold text-text-primary">
                  {quote.author}
                </cite>
              </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0_0_40px_rgba(139,92,246,0.2)]" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default StoryQuote;
