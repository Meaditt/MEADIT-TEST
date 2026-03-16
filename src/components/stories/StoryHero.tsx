'use client';

import { motion } from 'framer-motion';
import { heroTextVariants, heroContainer } from '@/lib/design-system/animations';
import type { Story } from '@/lib/data/stories';

// ========================
// TYPES
// ========================

export interface StoryHeroProps {
  story: Story;
}

// ========================
// COMPONENT
// ========================

export function StoryHero({ story }: StoryHeroProps) {
  const gradientStyle = {
    background: story.color
      ? `linear-gradient(135deg, ${story.color}20 0%, ${story.color}05 50%, transparent 100%)`
      : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
  };

  return (
    <section className="relative overflow-hidden" style={gradientStyle}>
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-mesh opacity-50" />

      {/* Radial Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${story.color || '#8b5cf6'}15 0%, transparent 60%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl"
        >
          {/* Category Badge */}
          <motion.div variants={heroTextVariants} className="mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-bg-secondary/80 backdrop-blur-sm text-text-primary border border-white/10">
              {story.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={heroTextVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 font-display"
          >
            {story.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroTextVariants}
            className="text-xl md:text-2xl text-text-secondary mb-8"
          >
            {story.subtitle}
          </motion.p>

          {/* Key Stat - Featured */}
          <motion.div
            variants={heroTextVariants}
            className="inline-flex items-baseline gap-3 p-6 rounded-xl bg-bg-secondary/50 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-bold text-gradient font-mono">
                {story.keyStat.value}
              </span>
              <span className="text-lg text-text-secondary">
                {story.keyStat.label}
              </span>
            </div>
          </motion.div>

          {/* Pain Types */}
          <motion.div
            variants={heroTextVariants}
            className="flex flex-wrap gap-2 mt-8"
          >
            {story.painTypes.map((painType) => (
              <span
                key={painType}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/5 text-text-secondary border border-white/5"
              >
                {painType}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}

export default StoryHero;
