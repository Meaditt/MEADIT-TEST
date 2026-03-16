'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Users } from 'lucide-react';

const trustItems = [
  {
    icon: Clock,
    title: '24-Hour Response',
    description: 'We will get back to you within one business day',
  },
  {
    icon: Shield,
    title: 'No Obligation',
    description: 'Free consultation with no pressure to commit',
  },
  {
    icon: Users,
    title: 'Tailored Solutions',
    description: 'Every agent is custom-built for your needs',
  },
];

export function TrustElements() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
