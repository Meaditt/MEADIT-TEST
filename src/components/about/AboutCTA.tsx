'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10 pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="card p-8 md:p-12 lg:p-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Ready to Build Something{' '}
              <span className="text-gradient">That Actually Works?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
            >
              Let us talk about your workflow, identify where AI can actually help,
              and build a custom agent that gives you your time back.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/start">
                <Button
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Start the Conversation
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
