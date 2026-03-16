'use client';

import { useRef } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { use } from 'react';
import {
  getStoryBySlug,
  getRelatedStories,
  type Story,
} from '@/lib/data/stories';

// ============================================================================
// FADE IN COMPONENT
// ============================================================================

function FadeIn({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// CINEMATIC HERO
// ============================================================================

function StoryHero({ story }: { story: Story }) {
  return (
    <section className="pt-32 pb-16 bg-white">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm mb-8"
          >
            <Link href="/stories" className="text-[#86868b] hover:text-[#1d1d1f] transition-colors">
              Success Stories
            </Link>
            <span className="text-[#d2d2d7]">/</span>
            <span className="text-[#86868b]">{story.category}</span>
          </motion.div>

          {/* Big Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="text-6xl md:text-8xl font-bold text-[#1d1d1f] leading-none tracking-tight">
              {story.keyStat.value}
            </span>
            <span className="block text-lg text-[#52525b] mt-2">
              {story.keyStat.label}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.1] mb-8"
          >
            {story.title}
          </motion.h1>

          {/* Image */}
          {story.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// THE HOOK - OPENING SCENE
// ============================================================================

function TheHook({ story }: { story: Story }) {
  return (
    <section className="py-20 md:py-32 bg-white px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl lg:text-4xl text-[#1d1d1f] leading-relaxed font-light">
              <span className="font-semibold">{story.hook.split('.')[0]}.</span>
              {story.hook.split('.').slice(1).join('.')}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// BEFORE/AFTER TRANSFORMATION
// ============================================================================

function Transformation({ story }: { story: Story }) {
  return (
    <section className="py-16 md:py-24 bg-[#f5f5f7] px-4">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* The Challenge */}
          <FadeIn>
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">1</span>
                </div>
                <h2 className="text-sm font-semibold text-[#1d1d1f] uppercase tracking-widest">
                  The Challenge
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-[#1d1d1f] leading-relaxed pl-16">
                {story.chapters.before}
              </p>
            </div>
          </FadeIn>

          {/* The Solution */}
          <FadeIn delay={0.1}>
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">2</span>
                </div>
                <h2 className="text-sm font-semibold text-[#1d1d1f] uppercase tracking-widest">
                  The Solution
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-[#1d1d1f] leading-relaxed pl-16">
                {story.chapters.solution}
              </p>
            </div>
          </FadeIn>

          {/* The Outcome */}
          <FadeIn delay={0.2}>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">3</span>
                </div>
                <h2 className="text-sm font-semibold text-[#1d1d1f] uppercase tracking-widest">
                  The Outcome
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-[#1d1d1f] leading-relaxed pl-16">
                {story.chapters.after}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// RESULTS SHOWCASE - DRAMATIC NUMBERS
// ============================================================================

function ResultsShowcase({ results }: { results: Story['results'] }) {
  if (!results) return null;

  return (
    <section className="py-20 bg-[#f5f5f7]">
      <div className="container px-4">
        <FadeIn>
          <h2 className="text-center text-sm font-semibold text-[#86868b] uppercase tracking-widest mb-12">
            The Impact
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {results.map((result, i) => (
            <FadeIn key={result.label} delay={i * 0.1}>
              <div className="text-center p-8 bg-white rounded-2xl border border-[#e5e5e5]">
                <p className="text-xs text-[#86868b] uppercase tracking-widest mb-4">
                  {result.label}
                </p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-lg text-[#86868b] line-through">{result.before}</span>
                  <svg className="w-5 h-5 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-4xl md:text-5xl font-bold text-[#1d1d1f]">{result.after}</span>
                </div>
                <p className="text-sm font-medium text-green-600">{result.improvement}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PULL QUOTE
// ============================================================================

function PullQuote({ quote }: { quote?: { text: string; author: string } }) {
  if (!quote) return null;

  return (
    <section className="py-20 md:py-32 bg-white px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <svg className="w-16 h-16 text-[#1d1d1f] mx-auto mb-10 opacity-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#1d1d1f] tracking-tight leading-tight mb-10">
              "{quote.text}"
            </blockquote>
            <p className="text-lg text-[#86868b] font-medium">{quote.author}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// ONE LINER TAKEAWAY
// ============================================================================

function Takeaway({ text }: { text: string }) {
  return (
    <section className="py-16 bg-[#f5f5f7] px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-[#86868b] uppercase tracking-widest mb-4">
              The Bottom Line
            </p>
            <p className="text-xl md:text-2xl font-medium text-[#1d1d1f]">{text}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED STORIES
// ============================================================================

function RelatedStories({ stories }: { stories: ReturnType<typeof getRelatedStories> }) {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white px-4">
      <div className="container">
        <FadeIn>
          <h2 className="text-sm font-semibold text-[#86868b] uppercase tracking-widest text-center mb-12">
            More Success Stories
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stories.map((story, i) => (
            <FadeIn key={story.id} delay={i * 0.1}>
              <Link href={`/stories/${story.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-[#f5f5f7] transition-all duration-500 group-hover:shadow-xl">
                  {story.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-4xl font-bold text-white">{story.keyStat.value}</p>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs font-medium text-[#86868b] uppercase tracking-wide mb-2">
                      {story.category}
                    </p>
                    <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight group-hover:text-[#0066cc] transition-colors">
                      {story.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================

function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-6">
              Your turn to ship.
            </h2>
            <p className="text-lg text-[#52525b] mb-8">
              What are you building? Let's make it real.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1d1d1f] text-white rounded-full font-medium text-lg hover:bg-[#333] transition-colors"
            >
              Let's build it
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function StoryDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const story = getStoryBySlug(resolvedParams.slug);

  if (!story) {
    notFound();
  }

  const relatedStories = getRelatedStories(story.id, 3);

  return (
    <main id="main-content" className="overflow-x-hidden">
      <StoryHero story={story} />
      <TheHook story={story} />
      <Transformation story={story} />
      <ResultsShowcase results={story.results} />
      <PullQuote quote={story.quote} />
      <Takeaway text={story.oneLiner} />
      <RelatedStories stories={relatedStories} />
      <CTA />
    </main>
  );
}
