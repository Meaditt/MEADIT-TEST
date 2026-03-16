'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, TrendingUp, Code, CheckCircle } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: '100+',
    label: 'Hours Saved',
    description: 'Average time saved per client in the first month',
  },
  {
    icon: TrendingUp,
    value: '3x',
    label: 'Productivity Gain',
    description: 'Average improvement in task completion speed',
  },
  {
    icon: Code,
    value: '20+',
    label: 'Integrations',
    description: 'Different tools and platforms we connect with',
  },
  {
    icon: CheckCircle,
    value: '100%',
    label: 'Custom Built',
    description: 'Every solution tailored to your specific needs',
  },
];

export function ProofPoints() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Results That Matter
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Real metrics from real implementations. No vanity numbers, just outcomes.
          </p>
        </motion.div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card p-6 text-center h-full group">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 group-hover:border-accent/40 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-lg font-semibold mb-2">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
