'use client';

import { motion } from 'framer-motion';

export function StartHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      <div className="container section relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Let's Build Your{' '}
            <span className="text-gradient">Custom AI Agent</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-text-secondary"
          >
            Tell us about your workflow, and we will show you how AI can give you
            your time back. No sales pitch, just a genuine conversation about what is possible.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
    </section>
  );
}
