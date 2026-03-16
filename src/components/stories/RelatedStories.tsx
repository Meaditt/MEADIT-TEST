'use client';

import { motion } from 'framer-motion';
import { StoryCard } from './StoryCard';
import { scrollReveal, scrollRevealProps } from '@/lib/design-system/animations';
import type { Story } from '@/lib/data/stories';

// ========================
// TYPES
// ========================

export interface RelatedStoriesProps {
  stories: Story[];
}

// ========================
// COMPONENT
// ========================

export function RelatedStories({ stories }: RelatedStoriesProps) {
  if (stories.length === 0) {
    return null;
  }

  return (
    <motion.section
      variants={scrollReveal as any}
      {...(scrollRevealProps as any)}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
            More Success Stories
          </h2>
          <p className="text-lg text-text-secondary">
            See how other businesses transformed their workflows
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default RelatedStories;
