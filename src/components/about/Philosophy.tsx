'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Zap, Users, Shield } from 'lucide-react';

const beliefs = [
  {
    icon: Target,
    title: 'Practical Over Flashy',
    description: 'We build tools that solve real problems, not demos that look good in presentations. If it does not save you time or money, it does not ship.',
  },
  {
    icon: Zap,
    title: 'Integration Is Everything',
    description: 'A great AI agent is worthless if it does not work with your existing tools. We integrate deeply with your workflow, not replace it.',
  },
  {
    icon: Users,
    title: 'Built For Humans',
    description: 'Technology should adapt to people, not the other way around. We design agents that feel natural, not like you are talking to a robot.',
  },
  {
    icon: Shield,
    title: 'Transparent & Reliable',
    description: 'No black boxes. You understand what your agent does, how it works, and when something goes wrong. Trust through clarity.',
  },
];

export function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section bg-bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our Philosophy
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            The principles that guide every agent we build and every solution we deliver.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {beliefs.map((belief, index) => {
            const Icon = belief.icon;

            return (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card card-interactive p-6 lg:p-8 h-full group">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-colors duration-200">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    {belief.title}
                  </h3>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                    {belief.description}
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
