'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { getAllBlogPosts, getBlogCategories, getFeaturedPosts } from '@/lib/data/blog';

// ============================================================================
// GRADIENT TEXT
// ============================================================================

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[#1d1d1f]">
      {children}
    </span>
  );
}

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
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
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
    <section className="pt-16 md:pt-24 pb-8 md:pb-12 bg-white">
      <div className="container px-4">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight mb-4"
          >
            The Build Log
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[#52525b]"
          >
            AI insights, founder playbooks, and building in public.
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
  postCounts,
}: {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
  postCounts: { [key: string]: number };
}) {
  const totalPosts = Object.values(postCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="mb-10">
      {/* Mobile: horizontal scroll */}
      <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => onSelect(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selected === null
                ? 'bg-[#1d1d1f] text-white'
                : 'bg-white text-[#1d1d1f] border border-[#d2d2d7]'
            }`}
          >
            All ({totalPosts})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selected === category
                  ? 'bg-[#1d1d1f] text-white'
                  : 'bg-white text-[#1d1d1f] border border-[#d2d2d7]'
              }`}
            >
              {category} ({postCounts[category] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: centered flex wrap */}
      <div className="hidden md:flex flex-wrap justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(null)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            selected === null
              ? 'bg-[#1d1d1f] text-white shadow-md'
              : 'bg-white text-[#52525b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] border border-[#e5e5e5]'
          }`}
        >
          All
          <span className={`ml-1.5 text-xs ${selected === null ? 'text-white/70' : 'text-[#86868b]'}`}>
            {totalPosts}
          </span>
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selected === category
                ? 'bg-[#1d1d1f] text-white shadow-md'
                : 'bg-white text-[#52525b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] border border-[#e5e5e5]'
            }`}
          >
            {category}
            <span className={`ml-1.5 text-xs ${selected === category ? 'text-white/70' : 'text-[#86868b]'}`}>
              {postCounts[category] || 0}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// FEATURED POST
// ============================================================================

function FeaturedPost({ post }: { post: ReturnType<typeof getFeaturedPosts>[0]; index?: number }) {

  return (
    <FadeIn>
      <Link href={`/blog/${post.slug}`} className="group block mb-12">
        <motion.article
          whileHover={{ y: -4 }}
          className="bg-white rounded-2xl overflow-hidden border border-[#e5e5e5] hover:shadow-xl transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-auto lg:min-h-[400px] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-[#1d1d1f] text-xs font-semibold">
                  Featured
                </span>
                <span className="px-3 py-1 bg-[#1d1d1f] rounded-full text-white text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-4 group-hover:text-[#52525b] transition-colors">
                {post.title}
              </h2>
              <p className="text-lg text-[#52525b] mb-6 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1d1d1f] flex items-center justify-center text-white font-medium">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1d1d1f]">{post.author.name}</p>
                    <p className="text-xs text-[#86868b]">{post.readTime}</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center text-[#1d1d1f] font-medium">
                  Read article
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    </FadeIn>
  );
}

// ============================================================================
// BLOG CARD - Apple Product Card Style
// ============================================================================

function BlogCard({
  post,
  index,
}: {
  post: ReturnType<typeof getAllBlogPosts>[0];
  index: number;
}) {
  // Alternating background styles like Apple's product grid
  const cardStyles = [
    { bg: 'bg-[#fbfbfd]', dark: false },
    { bg: 'bg-[#1d1d1f]', dark: true },
    { bg: 'bg-[#f5f5f7]', dark: false },
    { bg: 'bg-[#1d1d1f]', dark: true },
    { bg: 'bg-white', dark: false },
    { bg: 'bg-[#1d1d1f]', dark: true },
  ];

  const style = cardStyles[index % cardStyles.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <div className={`${style.bg} rounded-3xl overflow-hidden h-[460px] flex flex-col group`}>
        {/* Text content at top */}
        <div className="p-5 md:p-6 text-center flex flex-col justify-center overflow-hidden shrink-0" style={{ minHeight: 200 }}>
          <span className={`text-xs font-medium mb-2 block ${style.dark ? 'text-gray-400' : 'text-[#86868b]'}`}>
            {post.category}
          </span>
          <h3
            className={`text-lg md:text-xl font-semibold tracking-tight mb-2 overflow-hidden ${style.dark ? 'text-white' : 'text-[#1d1d1f]'}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
            }}
          >
            {post.title}
          </h3>
          <p
            className={`text-sm mb-3 overflow-hidden ${style.dark ? 'text-gray-300' : 'text-[#52525b]'}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
            }}
          >
            {post.excerpt}
          </p>
          <div className="flex items-center justify-center gap-3 mt-auto">
            <Link
              href={`/blog/${post.slug}`}
              className={`hover:underline text-sm font-medium ${style.dark ? 'text-[#66b3ff]' : 'text-[#0071e3]'}`}
            >
              Learn more
            </Link>
            <Link
              href={`/blog/${post.slug}`}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                style.dark
                  ? 'bg-white text-[#1d1d1f] hover:bg-gray-100'
                  : 'bg-[#1d1d1f] text-white hover:bg-[#333]'
              }`}
            >
              Read
            </Link>
          </div>
        </div>

        {/* Large image at bottom - fills remaining space */}
        <div className="flex-1 relative overflow-hidden min-h-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// NEWSLETTER CTA
// ============================================================================

function NewsletterCTA() {
  return (
    <section className="py-24 md:py-32 bg-[#1d1d1f] relative overflow-hidden">
      <div className="container px-4 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
              Stay in the loop
            </h2>
            <p className="text-xl text-[#a1a1a6] mb-8">
              Weekly drops on AI, building products, and shipping fast. No fluff.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="founder@startup.com"
                className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white rounded-2xl font-medium text-[#1d1d1f] hover:bg-[#f5f5f5] transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-sm text-[#a1a1a6] mt-4">
              Join 500+ founders. Unsubscribe anytime.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allPosts = getAllBlogPosts();
  const categories = getBlogCategories();
  const featuredPosts = getFeaturedPosts();

  // Calculate post counts per category
  const postCounts = allPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.category === selectedCategory)
    : allPosts;

  // Get featured post (first featured one) and remaining posts
  const featuredPost = selectedCategory ? null : featuredPosts[0];
  const remainingPosts = featuredPost
    ? filteredPosts.filter((post) => post.id !== featuredPost.id)
    : filteredPosts;

  return (
    <main className="bg-white overflow-x-hidden">
      <Hero />

      <section className="py-12 md:py-16 px-4 bg-[#fafafa]">
        <div className="container">
          {/* Filter */}
          <FadeIn>
            <FilterBar
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              postCounts={postCounts}
            />
          </FadeIn>

          {/* Featured post */}
          {featuredPost && <FeaturedPost post={featuredPost} />}

          {/* Blog grid */}
          {remainingPosts.length > 0 && (
            <div
              key={selectedCategory || 'all'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {remainingPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#86868b] mb-4">
                No articles found for this category.
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-[#1d1d1f] hover:underline font-medium"
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </main>
  );
}
