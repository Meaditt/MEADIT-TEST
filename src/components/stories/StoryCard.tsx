'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Story } from '@/lib/data/stories';

// ========================
// TYPES
// ========================

export interface StoryCardProps {
  story: Story;
  index?: number;
}

// ========================
// COMPONENT
// ========================

export function StoryCard({ story, index = 0 }: StoryCardProps) {
  // Generate gradient background based on story color
  const gradientStyle = story.color
    ? {
        background: `linear-gradient(135deg, ${story.color}15 0%, ${story.color}05 100%)`,
      }
    : {
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.02) 100%)',
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/stories/${story.slug}`}>
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'group relative h-full',
            'bg-bg-secondary rounded-xl',
            'border border-white/[0.06]',
            'overflow-hidden',
            'hover:border-white/10',
            'shadow-[0_1px_2px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.15)]',
            'hover:shadow-[0_8px_16px_rgba(0,0,0,0.4),0_4px_8px_rgba(0,0,0,0.3)]',
            'transition-all duration-200'
          )}
        >
          {/* Gradient Header */}
          <div
            className="h-32 relative overflow-hidden"
            style={gradientStyle}
          >
            {/* Animated Glow Effect on Hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${story.color || '#8b5cf6'}40 0%, transparent 70%)`,
              }}
            />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-bg-primary/80 backdrop-blur-sm text-text-primary border border-white/10">
                {story.category}
              </span>
            </div>

            {/* Key Stat */}
            <div className="absolute bottom-4 right-4 text-right">
              <div className="text-3xl font-bold text-text-primary font-mono">
                {story.keyStat.value}
              </div>
              <div className="text-xs text-text-secondary">
                {story.keyStat.label}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-gradient transition-all">
              {story.title}
            </h3>

            {/* Subtitle */}
            <p className="text-text-secondary mb-4 line-clamp-2">
              {story.subtitle}
            </p>

            {/* Hook */}
            <p className="text-sm text-text-muted mb-4 line-clamp-3">
              {story.hook}
            </p>

            {/* Pain Types */}
            <div className="flex flex-wrap gap-2 mb-4">
              {story.painTypes.slice(0, 2).map((painType) => (
                <span
                  key={painType}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-white/5 text-text-secondary border border-white/5"
                >
                  {painType}
                </span>
              ))}
              {story.painTypes.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs text-text-muted">
                  +{story.painTypes.length - 2} more
                </span>
              )}
            </div>

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
              <span className="text-sm font-medium">Read Story</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Hover Glow Border Effect */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: `0 0 20px ${story.color || '#8b5cf6'}30, 0 0 40px ${story.color || '#8b5cf6'}20`,
            }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}

export default StoryCard;
