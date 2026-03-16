'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { NeedsAssessment } from '@/components/NeedsAssessment';

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

function Hero() {
  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-white px-4">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Urgency/Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-full mb-6"
          >
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-[#1d1d1f]">
              <strong>Taking on 3 new projects</strong> this month
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight mb-6"
          >
            What are you building?
            <br />
            <span className="text-[#86868b]">Let's make it real.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#52525b] mb-8 max-w-2xl mx-auto"
          >
            Tell us your idea. We'll show you how AI can turn it into a product that actually works. And ships fast.
          </motion.p>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#86868b]"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['S', 'M', 'R', 'D'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#1d1d1f] border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span>50+ founders helped</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-[#1d1d1f]">2 weeks</span>
              <span>avg time to ship</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN CONTENT SECTION
// ============================================================================

function MainContent() {
  const [selectedOption, setSelectedOption] = useState<'assessment' | 'call' | null>(null);

  return (
    <section className="py-12 md:py-16 bg-[#fafafa] px-4">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!selectedOption ? (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Two cards side by side */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Quick Assessment Card */}
                  <FadeIn>
                    <motion.button
                      onClick={() => setSelectedOption('assessment')}
                      className="w-full text-left bg-white rounded-2xl p-6 md:p-8 border border-[#e5e5e5] hover:border-[#1d1d1f] hover:shadow-lg transition-all group"
                      whileHover={{ y: -2 }}
                    >
                      {/* Most popular badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1d1d1f] flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="px-3 py-1 bg-[#1d1d1f] text-white text-xs font-medium rounded-full">
                          Quick start
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                        Quick Assessment
                      </h3>
                      <p className="text-[#52525b] mb-4">
                        4 questions. See what AI can do for your idea. Instantly.
                      </p>

                      {/* Benefits */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-[#52525b]">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Takes 30 seconds
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#52525b]">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Get ideas for your project
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#52525b]">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          No email required to start
                        </div>
                      </div>

                      <div className="flex items-center text-[#1d1d1f] font-medium group-hover:gap-3 gap-2 transition-all">
                        Start assessment
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.button>
                  </FadeIn>

                  {/* Book a Call Card */}
                  <FadeIn delay={0.1}>
                    <Link
                      href="/book"
                      className="w-full text-left bg-white rounded-2xl p-6 md:p-8 border border-[#e5e5e5] hover:border-[#1d1d1f] hover:shadow-lg transition-all group block"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>

                      <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                        Book a Call
                      </h3>
                      <p className="text-[#52525b] mb-4">
                        30-minute call. Pick a time that works. We&apos;ll show you how AI fits your idea.
                      </p>

                      {/* Benefits */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-[#52525b]">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Free. No pitch deck needed
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#52525b]">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Talk to actual builders
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#52525b]">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Instant calendar confirmation
                        </div>
                      </div>

                      <div className="flex items-center text-[#1d1d1f] font-medium group-hover:gap-3 gap-2 transition-all">
                        Pick a time
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </FadeIn>
                </div>

                {/* Trust indicators */}
                <FadeIn delay={0.2}>
                  <div className="mt-10 pt-8 border-t border-[#e5e5e5]">
                    <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#86868b]">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Your data stays private
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Response within 24 hours
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        No spam, ever
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </motion.div>
            ) : selectedOption === 'assessment' ? (
              <motion.div
                key="assessment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-lg mx-auto"
              >
                <button
                  onClick={() => setSelectedOption(null)}
                  className="flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] mb-6 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <NeedsAssessment />
              </motion.div>
            ) : (
              <motion.div
                key="call"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-xl mx-auto"
              >
                <button
                  onClick={() => setSelectedOption(null)}
                  className="flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] mb-6 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <ContactForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT FORM
// ============================================================================

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    task: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interest: 'Strategy Call Request',
        }),
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#e5e5e5] text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-2">You are on the list!</h3>
        <p className="text-[#52525b] mb-6">
          We will reach out within 24 hours to schedule your call.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center text-[#1d1d1f] font-medium hover:underline"
        >
          Read our blog while you wait
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e5e5e5]">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1">
          Let's chat
        </h3>
        <p className="text-[#86868b] text-sm">
          Quick form. We'll reach out within 24h.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#fafafa] border border-[#e5e5e5] rounded-xl text-[#1d1d1f] placeholder-[#a1a1a6] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#fafafa] border border-[#e5e5e5] rounded-xl text-[#1d1d1f] placeholder-[#a1a1a6] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] focus:border-transparent transition-all"
              placeholder="you@startup.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
            Project/Company <span className="text-[#a1a1a6] font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-[#fafafa] border border-[#e5e5e5] rounded-xl text-[#1d1d1f] placeholder-[#a1a1a6] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] focus:border-transparent transition-all"
            placeholder="What are you working on?"
          />
        </div>

        <div>
          <label htmlFor="task" className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
            What do you want to build?
          </label>
          <textarea
            id="task"
            required
            rows={3}
            value={formData.task}
            onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            className="w-full px-4 py-3 bg-[#fafafa] border border-[#e5e5e5] rounded-xl text-[#1d1d1f] placeholder-[#a1a1a6] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] focus:border-transparent transition-all resize-none"
            placeholder="An AI agent that... / A tool that automates... / An app that..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#1d1d1f] text-white rounded-xl font-medium hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : (
            'Get in touch'
          )}
        </button>
      </form>
    </div>
  );
}

// ============================================================================
// WHAT YOU GET SECTION
// ============================================================================

function WhatYouGet() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast turnaround',
      description: "We ship in weeks, not months. Your idea doesn't have time to wait.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Real AI expertise',
      description: 'Not just ChatGPT wrappers. Production-grade AI that actually scales.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Founder-friendly',
      description: 'We speak startup. No enterprise BS. Fair pricing, clear scope.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] text-center mb-10">
              Why founders choose us
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="text-center p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#f5f5f5] flex items-center justify-center mx-auto mb-4 text-[#1d1d1f]">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#52525b]">{benefit.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// TESTIMONIAL
// ============================================================================

function Testimonial() {
  return (
    <section className="py-16 md:py-20 bg-[#fafafa] px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <blockquote className="text-xl md:text-2xl text-[#1d1d1f] mb-6 leading-relaxed">
              "I came to them with a Notion doc and a Loom video. Two weeks later, I had a working AI agent handling my customer support. These guys just get it."
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1d1d1f] flex items-center justify-center text-white font-medium">
                JM
              </div>
              <div className="text-left">
                <div className="font-medium text-[#1d1d1f]">Jake Morrison</div>
                <div className="text-sm text-[#86868b]">Founder, ContentFlow AI</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ
// ============================================================================

function FAQ() {
  const faqs = [
    {
      q: 'How fast can you ship?',
      a: 'Most projects launch in 2 to 3 weeks. We work in sprints and ship iteratively. You see progress every week.',
    },
    {
      q: 'What does it cost?',
      a: "Depends on scope. Most founder projects are $5K to $15K. No $50K discovery phases. We'll give you a clear quote after our first call.",
    },
    {
      q: 'Do I need a technical cofounder?',
      a: "Nope. That's what we're here for. You bring the vision and domain expertise, we handle the AI and engineering.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] text-center mb-10">
              Questions?
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FadeIn key={index} delay={index * 0.05}>
                  <div className="border-b border-[#e5e5e5] pb-4">
                    <h3 className="font-medium text-[#1d1d1f] mb-2">{faq.q}</h3>
                    <p className="text-[#52525b] text-sm">{faq.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA
// ============================================================================

function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-[#1d1d1f] px-4">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Let's build something great.
            </h2>
            <p className="text-white/70 mb-8">
              Your idea + our AI expertise = shipped product.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-white text-[#1d1d1f] rounded-full font-medium hover:bg-[#f5f5f5] transition-all"
            >
              Start the conversation
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function StartPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <MainContent />
      <WhatYouGet />
      <Testimonial />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
