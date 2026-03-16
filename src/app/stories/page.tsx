'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { getAllStories, getCategories } from '@/lib/data/stories';
import { getAllBlogPosts } from '@/lib/data/blog';

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
// HERO SECTION
// ============================================================================

function Hero() {
  return (
    <section className="pt-32 pb-16 bg-white">
      <div className="container px-4">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-[#86868b] mb-6"
          >
            Founder Stories
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.1] mb-8"
          >
            From idea to shipped.
            <br />
            <span className="text-[#86868b]">Real founder stories.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#52525b] leading-relaxed"
          >
            See how founders turned ideas into products. With AI that actually works.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FILTER BAR
// ============================================================================

function FilterBar({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      <button
        onClick={() => onSelect(null)}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
          selected === null
            ? 'bg-[#1d1d1f] text-white'
            : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
        }`}
      >
        All Stories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            selected === category
              ? 'bg-[#1d1d1f] text-white'
              : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// FEATURED STORY - FULL WIDTH DRAMATIC
// ============================================================================

function FeaturedStory({ story }: { story: ReturnType<typeof getAllStories>[0] }) {
  return (
    <FadeIn>
      <Link href={`/stories/${story.slug}`} className="group block mb-16">
        <div className="overflow-hidden rounded-3xl bg-[#f5f5f7] border border-[#e5e5e5] hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            {story.image && (
              <div className="relative h-64 lg:h-auto lg:min-h-[400px] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-white rounded-full text-[#1d1d1f] text-xs font-semibold">
                    Featured
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <p className="text-sm font-medium text-[#86868b] uppercase tracking-widest mb-4">
                {story.category}
              </p>

              {/* Stat */}
              <div className="mb-6">
                <span className="text-5xl md:text-6xl font-bold text-[#1d1d1f] leading-none tracking-tight">
                  {story.keyStat.value}
                </span>
                <span className="block text-lg text-[#52525b] mt-2">
                  {story.keyStat.label}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-4 group-hover:text-[#52525b] transition-colors">
                {story.title}
              </h2>

              <p className="text-[#52525b] mb-6 line-clamp-3">
                {story.hook}
              </p>

              <span className="inline-flex items-center text-[#1d1d1f] font-medium">
                Read the full story
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

// ============================================================================
// STORY CARD - VISUAL FIRST
// ============================================================================

function StoryCard({
  story,
  index,
}: {
  story: ReturnType<typeof getAllStories>[0];
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.1}>
      <Link href={`/stories/${story.slug}`} className="group block h-full">
        <div className="relative overflow-hidden rounded-2xl bg-[#f5f5f7] h-full transition-all duration-500 group-hover:shadow-2xl">
          {/* Card Image */}
          {story.image && (
            <div className="relative h-56 overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Stat overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-4xl md:text-5xl font-bold text-white leading-none">
                  {story.keyStat.value}
                </span>
                <span className="block text-sm text-white/70 mt-1">
                  {story.keyStat.label}
                </span>
              </div>
            </div>
          )}

          <div className="p-6">
            <p className="text-xs font-semibold text-[#86868b] uppercase tracking-widest mb-3">
              {story.category}
            </p>

            <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight mb-3 group-hover:text-[#0066cc] transition-colors">
              {story.title}
            </h3>

            <p className="text-[#52525b] text-sm line-clamp-2">
              {story.subtitle}
            </p>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#1d1d1f] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

// ============================================================================
// STATS BANNER
// ============================================================================

function StatsBanner() {
  const stats = [
    { value: '50+', label: 'Founders Helped' },
    { value: '2 weeks', label: 'Avg Time to Ship' },
    { value: '$2M+', label: 'Revenue Generated' },
  ];

  return (
    <section className="py-16 bg-[#f5f5f7] px-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-[#86868b] uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// HOW WE DO IT - BLOG POSTS SECTION
// ============================================================================

function HowWeDoIt({ posts }: { posts: ReturnType<typeof getAllBlogPosts> }) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <FadeIn>
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-medium text-[#86868b] mb-4">
              Behind the scenes
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
              How we do it
            </h2>
            <p className="text-lg text-[#52525b]">
              Our process, tools, and thinking. Real insights from building AI products.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayPosts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-[#f5f5f7] rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-lg transition-all">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#1d1d1f] text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight mb-3 group-hover:text-[#52525b] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#52525b] text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
                      <span className="text-xs text-[#86868b]">{post.readTime}</span>
                      <span className="text-sm font-medium text-[#1d1d1f] group-hover:underline">
                        Read more
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#1d1d1f] font-medium hover:underline"
            >
              View all articles
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allStories = getAllStories();
  const categories = getCategories();
  const blogPosts = getAllBlogPosts();

  const filteredStories = selectedCategory
    ? allStories.filter((story) => story.category === selectedCategory)
    : allStories;

  const featuredStory = filteredStories[0];
  const remainingStories = filteredStories.slice(1);

  return (
    <main id="main-content" className="overflow-x-hidden">
      <Hero />

      <section className="py-12 md:py-16 bg-white px-4">
        <div className="container">
          <FadeIn>
            <FilterBar
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </FadeIn>

          {featuredStory && <FeaturedStory story={featuredStory} />}

          {remainingStories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingStories.map((story, i) => (
                <StoryCard key={story.id} story={story} index={i} />
              ))}
            </div>
          )}

          {filteredStories.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-[#86868b] mb-4">
                No stories in this category yet.
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-[#1d1d1f] font-medium hover:underline"
              >
                View all stories
              </button>
            </div>
          )}
        </div>
      </section>

      <StatsBanner />

      <HowWeDoIt posts={blogPosts} />

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
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
                Let's talk
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
