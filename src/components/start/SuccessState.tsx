'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Home } from 'lucide-react';

export function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="card p-8 md:p-12 max-w-2xl mx-auto text-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-20 h-20 rounded-full bg-success/10 border-2 border-success/50 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-success" />
      </motion.div>

      {/* Success message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Message Received!
        </h2>
        <p className="text-lg text-text-secondary mb-2">
          Thanks for reaching out. We will review your message and get back to you
          within 24 hours.
        </p>
        <p className="text-base text-text-secondary mb-8">
          In the meantime, feel free to explore our success stories or learn more
          about our approach.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/stories">
            <Button variant="primary">View Success Stories</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" icon={<Home className="w-5 h-5" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Additional info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 pt-8 border-t border-white/10"
      >
        <p className="text-sm text-text-secondary">
          Need immediate assistance? Email us at{' '}
          <a href="mailto:hello@youraiagency.com" className="text-accent hover:text-accent-light">
            hello@youraiagency.com
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}
