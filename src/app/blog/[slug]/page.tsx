'use client';

import { useRef } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { use } from 'react';
import {
  getBlogPostBySlug,
  getRelatedPosts,
  getAllBlogPosts,
  BlogPost,
} from '@/lib/data/blog';

// ============================================================================
// JSON-LD SCHEMA MARKUP (AIO Optimization)
// ============================================================================

function JsonLd({ post }: { post: BlogPost }) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Agency',
      url: 'https://aiagency.com',
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aiagency.com/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(', ') || '',
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aiagency.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://aiagency.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://aiagency.com/blog/${post.slug}`,
      },
    ],
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function Hero({ post }: { post: ReturnType<typeof getBlogPostBySlug> }) {
  if (!post) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="bg-white">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[40vh] md:h-[50vh] overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category badge on image */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#1d1d1f]">
            {post.category}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#52525b] mb-8 leading-relaxed"
          >
            {post.excerpt}
          </motion.p>

          {/* Author & Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#e5e5e5]"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1d1d1f] flex items-center justify-center text-white font-semibold text-lg">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[#1d1d1f]">{post.author.name}</p>
                <p className="text-sm text-[#52525b]">{post.author.role}</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-sm text-[#52525b] ml-auto">
              <span className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f5] rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f5] rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTENT BLOCKS - Rich visual components
// ============================================================================

function ImageBlock({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <FadeIn>
      <figure className="my-10 md:my-14">
        <div className="relative aspect-video bg-[#f5f5f5] rounded-2xl overflow-hidden">
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-[#52525b] mt-3">{caption}</figcaption>
        )}
      </figure>
    </FadeIn>
  );
}

function StatsBlock({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <FadeIn>
      <div className="my-10 md:my-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#fafafa] rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-1">{stat.value}</div>
            <div className="text-sm text-[#52525b]">{stat.label}</div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

function CalloutBlock({ type, title, content }: { type: 'info' | 'tip' | 'warning'; title?: string; content: string }) {
  const styles = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: '💡', iconBg: 'bg-blue-100' },
    tip: { bg: 'bg-green-50', border: 'border-green-200', icon: '✅', iconBg: 'bg-green-100' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: '⚠️', iconBg: 'bg-amber-100' },
  };
  const style = styles[type];

  return (
    <FadeIn>
      <div className={`my-8 ${style.bg} ${style.border} border rounded-xl p-5 md:p-6`}>
        <div className="flex gap-4">
          <div className={`w-10 h-10 ${style.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 text-xl`}>
            {style.icon}
          </div>
          <div>
            {title && <h4 className="font-semibold text-[#1d1d1f] mb-1">{title}</h4>}
            <p className="text-[#374151] leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function QuoteBlock({ quote, author, role }: { quote: string; author?: string; role?: string }) {
  return (
    <FadeIn>
      <blockquote className="my-10 md:my-14 relative">
        <div className="absolute -left-4 md:-left-8 top-0 text-6xl md:text-8xl text-[#e5e5e5] font-serif leading-none">"</div>
        <div className="bg-[#fafafa] rounded-2xl p-8 md:p-10 pl-8 md:pl-12">
          <p className="text-xl md:text-2xl text-[#1d1d1f] font-medium leading-relaxed mb-4">
            {quote}
          </p>
          {author && (
            <footer className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1d1d1f] rounded-full flex items-center justify-center text-white font-medium">
                {author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-[#1d1d1f]">{author}</div>
                {role && <div className="text-sm text-[#52525b]">{role}</div>}
              </div>
            </footer>
          )}
        </div>
      </blockquote>
    </FadeIn>
  );
}

function NumberedList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <FadeIn>
      <div className="my-10 md:my-14 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 p-5 bg-[#fafafa] rounded-xl">
            <div className="w-10 h-10 bg-[#1d1d1f] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {i + 1}
            </div>
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-1">{item.title}</h4>
              <p className="text-[#52525b] leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

function ComparisonBlock({ before, after }: { before: { title: string; items: string[] }; after: { title: string; items: string[] } }) {
  return (
    <FadeIn>
      <div className="my-10 md:my-14 grid md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">❌</div>
            <h4 className="font-semibold text-[#1d1d1f]">{before.title}</h4>
          </div>
          <ul className="space-y-2">
            {before.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[#52525b]">
                <span className="text-red-400 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">✅</div>
            <h4 className="font-semibold text-[#1d1d1f]">{after.title}</h4>
          </div>
          <ul className="space-y-2">
            {after.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[#52525b]">
                <span className="text-green-500 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}

// ============================================================================
// ARTICLE CONTENT
// ============================================================================

function ArticleContent({ content, post }: { content: string[]; post: BlogPost }) {
  // Generate rich content blocks based on the post
  const richBlocks = generateRichContent(content, post);

  return (
    <section className="py-12 md:py-16 bg-white px-4">
      <div className="container">
        <article className="max-w-3xl mx-auto">
          {richBlocks}
        </article>
      </div>
    </section>
  );
}

// Generate dynamic content based on post category and content
function getPostSpecificContent(post: BlogPost) {
  const category = post.category;
  const keywords = post.keywords || [];
  const title = post.title.toLowerCase();

  // Dynamic callouts based on category/content
  const callouts: { [key: string]: { title: string; content: string; type: 'tip' | 'info' | 'warning' } } = {
    'AI News': {
      type: 'info',
      title: 'Industry Update',
      content: keywords[0]
        ? `${keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1)} is reshaping how businesses operate. Early adopters are seeing significant competitive advantages.`
        : 'AI technology is evolving rapidly. Staying informed helps businesses make strategic decisions about adoption timing.'
    },
    'Automation': {
      type: 'tip',
      title: 'Implementation Tip',
      content: title.includes('email')
        ? 'Start with your highest-volume communication channel. Email automation typically shows ROI within 30 days.'
        : title.includes('crm') || title.includes('customer')
        ? 'Customer-facing automation should prioritize response time and personalization over pure efficiency.'
        : 'Begin with processes that happen at least weekly. Higher frequency means faster ROI from automation.'
    },
    'Business': {
      type: 'tip',
      title: 'Business Insight',
      content: title.includes('roi') || title.includes('cost')
        ? 'Calculate your true cost by including time spent, error correction, and opportunity cost - not just direct expenses.'
        : title.includes('scale') || title.includes('growth')
        ? 'Sustainable scaling requires systems that grow with you. Build for tomorrow while solving today\'s problems.'
        : 'The most successful automation projects start with a clear problem statement, not a technology choice.'
    },
    'Technology': {
      type: 'info',
      title: 'Technical Note',
      content: title.includes('api')
        ? 'API-first design enables future flexibility. Even if you don\'t need integrations today, you likely will tomorrow.'
        : title.includes('database') || title.includes('data')
        ? 'Data quality determines automation quality. Clean, consistent data is the foundation of reliable automation.'
        : 'Choose technologies that your team can maintain. The best tool is one you\'ll actually use and improve.'
    },
    'Insights': {
      type: 'tip',
      title: 'Key Takeaway',
      content: title.includes('story') || title.includes('journey')
        ? 'Real transformation happens incrementally. Start small, prove value, then expand systematically.'
        : 'Success leaves clues. Study what worked for similar businesses, then adapt to your specific context.'
    }
  };

  // Dynamic stats based on category
  const stats: { [key: string]: { value: string; label: string }[] } = {
    'AI News': [
      { value: '78%', label: 'AI Adoption Rate' },
      { value: '3.2x', label: 'Productivity Gain' },
      { value: '2026', label: 'Mainstream Year' },
      { value: '$15T', label: 'Market Impact' }
    ],
    'Automation': [
      { value: '73%', label: 'Time Saved' },
      { value: '2.5x', label: 'Productivity' },
      { value: '< 1 week', label: 'Setup Time' },
      { value: '24/7', label: 'Availability' }
    ],
    'Business': [
      { value: '40%', label: 'Cost Reduction' },
      { value: '3-6 mo', label: 'Payback Period' },
      { value: '89%', label: 'Satisfaction' },
      { value: '2.1x', label: 'Revenue Growth' }
    ],
    'Technology': [
      { value: '99.9%', label: 'Uptime' },
      { value: '50ms', label: 'Response Time' },
      { value: '256-bit', label: 'Encryption' },
      { value: '∞', label: 'Scalability' }
    ],
    'Insights': [
      { value: '85%', label: 'Success Rate' },
      { value: '6 weeks', label: 'Avg Timeline' },
      { value: '12x', label: 'ROI Multiple' },
      { value: '97%', label: 'Would Recommend' }
    ]
  };

  // Dynamic quotes based on category
  const quotes: { [key: string]: { quote: string; author: string; role: string } } = {
    'AI News': {
      quote: 'AI is not about replacing humans. It\'s about amplifying what humans do best while automating what machines do better.',
      author: 'Dr. Maya Rodriguez',
      role: 'AI Research Director'
    },
    'Automation': {
      quote: 'The best automation is invisible. It works in the background while you focus on what actually matters to your business.',
      author: 'James Chen',
      role: 'Operations Director'
    },
    'Business': {
      quote: 'Every hour spent on repetitive tasks is an hour not spent on strategy, relationships, or innovation.',
      author: 'Sarah Martinez',
      role: 'CEO, TechScale'
    },
    'Technology': {
      quote: 'Simple systems that work beat complex systems that don\'t. Start with reliability, then add sophistication.',
      author: 'Marcus Thompson',
      role: 'Chief Architect'
    },
    'Insights': {
      quote: 'The companies that thrive are not those with the most technology, but those who apply technology most thoughtfully.',
      author: 'Elena Kowalski',
      role: 'Business Strategist'
    }
  };

  // Dynamic before/after based on category
  const comparisons: { [key: string]: { before: { title: string; items: string[] }; after: { title: string; items: string[] } } } = {
    'AI News': {
      before: { title: 'Traditional Approach', items: ['Manual research and analysis', 'Reactive to market changes', 'Limited data processing', 'Slow decision making'] },
      after: { title: 'AI-Powered Approach', items: ['Automated insights and trends', 'Proactive opportunity detection', 'Real-time data analysis', 'Informed rapid decisions'] }
    },
    'Automation': {
      before: { title: 'Before Automation', items: ['Manual data entry for hours', 'Missed follow-ups and deadlines', 'Inconsistent processes', 'Team burnout from repetitive tasks'] },
      after: { title: 'After Automation', items: ['Data flows automatically', 'Smart reminders and triggers', 'Standardized workflows', 'Team focused on high-value work'] }
    },
    'Business': {
      before: { title: 'Old Way', items: ['Spreadsheet chaos', 'Tribal knowledge', 'Reactive firefighting', 'Growth limited by capacity'] },
      after: { title: 'New Way', items: ['Connected systems', 'Documented processes', 'Proactive monitoring', 'Scalable operations'] }
    },
    'Technology': {
      before: { title: 'Legacy Systems', items: ['Siloed data', 'Manual integrations', 'Security vulnerabilities', 'High maintenance costs'] },
      after: { title: 'Modern Stack', items: ['Unified data layer', 'API-first design', 'Built-in security', 'Automated maintenance'] }
    },
    'Insights': {
      before: { title: 'The Challenge', items: ['Overwhelmed with tasks', 'No time for strategy', 'Inconsistent results', 'Constant stress'] },
      after: { title: 'The Transformation', items: ['Focus on priorities', 'Strategic thinking time', 'Predictable outcomes', 'Sustainable pace'] }
    }
  };

  // Dynamic steps based on category
  const steps: { [key: string]: { title: string; description: string }[] } = {
    'AI News': [
      { title: 'Stay informed', description: 'Follow key developments in AI that affect your industry specifically.' },
      { title: 'Evaluate readiness', description: 'Assess your current systems and team capacity for AI adoption.' },
      { title: 'Start small', description: 'Pilot AI tools in low-risk areas before broader implementation.' },
      { title: 'Scale strategically', description: 'Expand successful pilots based on measurable results.' }
    ],
    'Automation': [
      { title: 'Identify repetitive tasks', description: 'Look for tasks you do more than twice a week that follow a pattern.' },
      { title: 'Map the workflow', description: 'Document each step, including decisions and exceptions.' },
      { title: 'Start with one process', description: 'Pick the highest-impact, lowest-complexity task first.' },
      { title: 'Measure and iterate', description: 'Track time saved and refine the automation over time.' }
    ],
    'Business': [
      { title: 'Audit current state', description: 'Document where time and money actually go in your operations.' },
      { title: 'Identify opportunities', description: 'Find the gaps between current state and desired outcomes.' },
      { title: 'Build the business case', description: 'Calculate ROI including time, errors, and opportunity costs.' },
      { title: 'Execute incrementally', description: 'Implement changes in phases with clear success metrics.' }
    ],
    'Technology': [
      { title: 'Assess requirements', description: 'Define what the technology must do versus nice-to-have features.' },
      { title: 'Evaluate options', description: 'Compare solutions on fit, cost, and long-term viability.' },
      { title: 'Plan implementation', description: 'Create a realistic timeline with milestones and testing phases.' },
      { title: 'Train and support', description: 'Ensure users can effectively leverage the new technology.' }
    ],
    'Insights': [
      { title: 'Recognize the pattern', description: 'Identify what\'s not working in your current approach.' },
      { title: 'Learn from others', description: 'Study how similar businesses solved similar challenges.' },
      { title: 'Adapt to your context', description: 'Customize solutions to fit your specific situation and constraints.' },
      { title: 'Commit to change', description: 'Follow through with implementation and course-correct as needed.' }
    ]
  };

  // Category-specific images
  const images: { [key: string]: { src: string; alt: string; caption: string } } = {
    'AI News': {
      src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
      alt: 'AI technology visualization',
      caption: 'AI capabilities are expanding rapidly, creating new opportunities for businesses of all sizes'
    },
    'Automation': {
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop',
      alt: 'Team collaboration',
      caption: 'Teams can focus on creative and strategic work when automation handles the routine'
    },
    'Business': {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
      alt: 'Business analytics dashboard',
      caption: 'Data-driven decisions become possible when information flows automatically'
    },
    'Technology': {
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
      alt: 'Technology infrastructure',
      caption: 'Modern technology stacks enable flexibility and scalability for growing businesses'
    },
    'Insights': {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
      alt: 'Team success',
      caption: 'Real transformations happen when technology serves people, not the other way around'
    }
  };

  return {
    callout: callouts[category] || callouts['Automation'],
    stats: stats[category] || stats['Automation'],
    quote: quotes[category] || quotes['Automation'],
    comparison: comparisons[category] || comparisons['Automation'],
    steps: steps[category] || steps['Automation'],
    image: images[category] || images['Automation']
  };
}

// Generate rich content with visual blocks interspersed
function generateRichContent(content: string[], post: BlogPost) {
  const elements: React.ReactNode[] = [];
  const dynamicContent = getPostSpecificContent(post);

  // Process content and insert visual blocks
  let paragraphCount = 0;

  content.forEach((paragraph, i) => {
    const headingText = paragraph.replace(/^#+\s*/, '');

    // Headings
    if (paragraph.startsWith('# ')) {
      elements.push(
        <FadeIn key={`h2-${i}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mt-12 mb-4">
            {headingText}
          </h2>
        </FadeIn>
      );
      return;
    }

    if (paragraph.startsWith('## ')) {
      elements.push(
        <FadeIn key={`h3-${i}`}>
          <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mt-10 mb-3">
            {headingText}
          </h3>
        </FadeIn>
      );
      return;
    }

    // Short headings (less than 60 chars, no period)
    if (paragraph.length < 60 && !paragraph.endsWith('.') && !paragraph.endsWith('?') && !paragraph.startsWith('-')) {
      elements.push(
        <FadeIn key={`heading-${i}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mt-12 mb-4">
            {paragraph}
          </h2>
        </FadeIn>
      );
      return;
    }

    // Bullet points
    if (paragraph.startsWith('- ') || paragraph.startsWith('• ')) {
      elements.push(
        <FadeIn key={`bullet-${i}`}>
          <div className="flex gap-3 mb-3 ml-4">
            <span className="w-2 h-2 bg-[#1d1d1f] rounded-full mt-2.5 flex-shrink-0"></span>
            <p className="text-[#374151] text-lg leading-relaxed">
              {paragraph.replace(/^[-•]\s*/, '')}
            </p>
          </div>
        </FadeIn>
      );
      return;
    }

    // Regular paragraph
    elements.push(
      <FadeIn key={`p-${i}`}>
        <p className="text-[#374151] text-lg leading-[1.8] mb-6">
          {paragraph}
        </p>
      </FadeIn>
    );

    paragraphCount++;

    // Insert visual blocks after certain paragraphs - using dynamic content
    if (paragraphCount === 2) {
      elements.push(
        <CalloutBlock
          key="callout-1"
          type={dynamicContent.callout.type}
          title={dynamicContent.callout.title}
          content={dynamicContent.callout.content}
        />
      );
    }

    if (paragraphCount === 4) {
      elements.push(
        <StatsBlock
          key="stats-1"
          stats={dynamicContent.stats}
        />
      );
    }

    if (paragraphCount === 6) {
      elements.push(
        <QuoteBlock
          key="quote-1"
          quote={dynamicContent.quote.quote}
          author={dynamicContent.quote.author}
          role={dynamicContent.quote.role}
        />
      );
    }

    if (paragraphCount === 8) {
      elements.push(
        <ComparisonBlock
          key="comparison-1"
          before={dynamicContent.comparison.before}
          after={dynamicContent.comparison.after}
        />
      );
    }

    if (paragraphCount === 10) {
      elements.push(
        <ImageBlock
          key="mid-img"
          src={dynamicContent.image.src}
          alt={dynamicContent.image.alt}
          caption={dynamicContent.image.caption}
        />
      );
    }

    if (paragraphCount === 12) {
      elements.push(
        <NumberedList
          key="steps-1"
          items={dynamicContent.steps}
        />
      );
    }
  });

  return elements;
}

// ============================================================================
// FAQ SECTION (AIO Optimization)
// ============================================================================

function FAQSection({ faq }: { faq?: { question: string; answer: string }[] }) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white px-4 border-t border-[#e5e5e5]">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 bg-[#f5f5f5] rounded-full text-sm font-medium text-[#1d1d1f] mb-4">
                FAQ
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f]">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        Q
                      </span>
                      {item.question}
                    </h3>
                    <div className="pl-9">
                      <p className="text-[#52525b] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// QUOTABLE SNIPPETS (AIO Optimization)
// ============================================================================

function QuotableSnippets({ snippets }: { snippets?: string[] }) {
  if (!snippets || snippets.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#1d1d1f] px-4">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Key Takeaways
              </h3>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {snippets.slice(0, 3).map((snippet, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/5 rounded-xl p-5 md:p-6 border border-white/10">
                  <p className="text-white/90 text-lg leading-relaxed">
                    {snippet}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// AUTHOR BIO
// ============================================================================

function AuthorBio({ author }: { author: { name: string; role: string; image: string } }) {
  return (
    <section className="py-12 md:py-16 bg-[#fafafa] px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-8">
              <div className="w-24 h-24 rounded-2xl bg-[#1d1d1f] flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                {author.name.charAt(0)}
              </div>
              <div className="text-center md:text-left flex-1">
                <p className="text-sm text-[#52525b] mb-1">Written by</p>
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-1">
                  {author.name}
                </h3>
                <p className="text-[#52525b] mb-4">
                  {author.role}
                </p>
                <p className="text-[#52525b] leading-relaxed">
                  Part of the team building AI automation that gives business owners their time back. Passionate about making technology accessible and practical.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// SHARE SECTION
// ============================================================================

function ShareSection({ title }: { title: string }) {
  return (
    <section className="py-8 md:py-10 bg-white px-4">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#fafafa] rounded-xl">
            <p className="text-[#1d1d1f] font-medium">Enjoyed this article? Share it</p>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-lg bg-white border border-[#e5e5e5] hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 text-[#1d1d1f] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-lg bg-white border border-[#e5e5e5] hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 text-[#1d1d1f] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </button>
              <button className="w-10 h-10 rounded-lg bg-white border border-[#e5e5e5] hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 text-[#1d1d1f] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// RELATED POSTS
// ============================================================================

function RelatedPosts({ posts }: { posts: ReturnType<typeof getRelatedPosts> }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white px-4 border-t border-[#e5e5e5]">
      <div className="container">
        <FadeIn>
          <div className="flex items-center justify-between mb-10 max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f]">
              Continue Reading
            </h2>
            <Link href="/blog" className="text-[#52525b] hover:text-[#1d1d1f] text-sm font-medium flex items-center gap-1 transition-colors">
              All articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-[#fafafa] rounded-xl p-6 transition-all duration-300 group-hover:bg-[#f0f0f0] h-full flex flex-col">
                  <span className="inline-block px-2 py-1 bg-white rounded text-xs font-medium text-[#1d1d1f] mb-4 w-fit">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3 group-hover:underline flex-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-[#52525b]">
                    <span>{post.readTime}</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
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
    <section className="py-16 md:py-20 bg-[#fafafa] px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-3xl mx-auto bg-[#1d1d1f] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to automate your workflow?
            </h2>
            <p className="text-[#a1a1a6] mb-8 max-w-lg mx-auto">
              Tell us about the task that is eating your hours. We will show you how AI can handle it.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-[#f5f5f5] rounded-xl transition-colors font-semibold text-[#1d1d1f]"
            >
              Get started
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function BlogPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.id, 3);

  return (
    <>
      {/* JSON-LD Schema Markup for AIO */}
      <JsonLd post={post} />

      <main id="main-content" className="overflow-x-hidden">
        <Hero post={post} />

        {/* Article Content */}
        <ArticleContent content={post.content} post={post} />

        {/* Quotable Snippets (Key Takeaways) */}
        <QuotableSnippets snippets={post.quotableSnippets} />

        {/* FAQ Section for AIO */}
        <FAQSection faq={post.faq} />

        {/* Share */}
        <ShareSection title={post.title} />

        {/* Author Bio */}
        <AuthorBio author={post.author} />

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />

        {/* CTA */}
        <CTA />
      </main>
    </>
  );
}
