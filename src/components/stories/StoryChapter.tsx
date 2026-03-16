'use client';

import { motion } from 'framer-motion';
import { scrollReveal, scrollRevealProps } from '@/lib/design-system/animations';
import { cn } from '@/lib/utils/cn';

// ========================
// TYPES
// ========================

export interface StoryChapterProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

// ========================
// COMPONENT
// ========================

export function StoryChapter({
  title,
  content,
  icon,
  align = 'left',
  className,
}: StoryChapterProps) {
  return (
    <motion.section
      variants={scrollReveal as any}
      {...(scrollRevealProps as any)}
      className={cn(
        'py-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className={cn(
          'mb-6',
          align === 'center' ? 'flex justify-center' : 'flex'
        )}>
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            {icon}
          </div>
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-display">
        {title}
      </h2>

      {/* Content */}
      <div
        className={cn(
          'text-lg text-text-secondary leading-relaxed space-y-4',
          align === 'center' && 'max-w-3xl mx-auto'
        )}
      >
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </motion.section>
  );
}

// ========================
// CHAPTER CONTAINER
// ========================

export interface StoryChaptersProps {
  before: string;
  solution: string;
  after: string;
}

export function StoryChapters({ before, solution, after }: StoryChaptersProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Before Chapter */}
      <StoryChapter
        title="The Challenge"
        content={before}
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      />

      {/* Divider */}
      <div className="flex items-center justify-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      {/* Solution Chapter */}
      <StoryChapter
        title="The Solution"
        content={solution}
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        }
      />

      {/* Divider */}
      <div className="flex items-center justify-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      {/* After Chapter */}
      <StoryChapter
        title="The Results"
        content={after}
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        }
      />
    </div>
  );
}

export default StoryChapter;
