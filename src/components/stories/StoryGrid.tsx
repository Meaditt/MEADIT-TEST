'use client';

import { motion } from 'framer-motion';
import { StoryCard } from './StoryCard';
import { staggerContainer } from '@/lib/design-system/animations';
import type { Story } from '@/lib/data/stories';

// ========================
// TYPES
// ========================

export interface StoryGridProps {
  stories: Story[];
}

// ========================
// COMPONENT
// ========================

export function StoryGrid({ stories }: StoryGridProps) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary text-lg">
          No stories found matching your filters.
        </p>
        <p className="text-text-muted text-sm mt-2">
          Try adjusting your filter selection.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {stories.map((story, index) => (
        <StoryCard key={story.id} story={story} index={index} />
      ))}
    </motion.div>
  );
}

export default StoryGrid;
