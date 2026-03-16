'use client';

import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      <div className="container section relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            We Build AI Agents That{' '}
            <span className="text-gradient">Actually Work</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto"
          >
            No fluff. No hype. Just practical AI automation that saves you time
            and integrates seamlessly with your existing workflow.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
    </section>
  );
}
