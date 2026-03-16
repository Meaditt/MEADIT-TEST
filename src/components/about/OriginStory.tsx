'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const timeline = [
  {
    year: '2023',
    title: 'The Problem',
    description: 'Watched countless businesses struggle with generic AI tools that promised everything but delivered nothing. The gap between AI hype and practical utility was massive.',
  },
  {
    year: '2024',
    title: 'The Insight',
    description: 'Realized that custom-built AI agents tailored to specific workflows could actually save hours of work—but only when built properly, with real integration.',
  },
  {
    year: '2025',
    title: 'The Mission',
    description: 'Started building bespoke AI agents for businesses that needed automation without the complexity. Focus: make it work, make it seamless, make it valuable.',
  },
  {
    year: 'Today',
    title: 'The Approach',
    description: 'We dig deep into your workflow, build agents that integrate with your tools, and deliver solutions that actually give you time back—not more complexity.',
  },
];

export function OriginStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How We Got Here
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              The journey from AI skeptic to AI builder—and why we only build
              solutions that actually solve real problems.
            </p>
          </motion.div>

          <div ref={ref} className="space-y-8 md:space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="card p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    {/* Year badge */}
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-secondary text-white font-bold text-lg glow">
                        {item.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connecting line */}
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-full w-0.5 h-12 bg-gradient-to-b from-accent/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
