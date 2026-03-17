'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { BookingCalendar } from '@/components/booking/BookingCalendar';

// ============================================================================
// FADE IN HELPER
// ============================================================================

function FadeIn({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// HERO
// ============================================================================

function Hero() {
  return (
    <section className="pt-16 md:pt-24 pb-10 md:pb-14" style={{ background: '#fafaf8' }}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: '#f4f3ef', border: '1px solid #e2e0d8' }}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75" style={{ background: '#c9a96e' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#c9a96e' }} />
            </span>
            <span className="text-sm" style={{ color: '#1a1a18' }}>
              Typically responds within 2 hours
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-display)', color: '#1a1a18', fontWeight: 400, lineHeight: 1.1 }}
          >
            Let&apos;s talk about{' '}
            <span style={{ color: '#c9a96e' }}>your idea</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg mb-0 max-w-xl mx-auto"
            style={{ color: '#7a7a72' }}
          >
            Pick a time that works for you. 30 minutes, no pitch deck required.
            Just an honest conversation about what AI can do for your business.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN BOOKING SECTION
// ============================================================================

function BookingSection() {
  return (
    <section className="pb-16 md:pb-24" style={{ background: '#fafaf8' }}>
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <FadeIn>
              <BookingCalendar />
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                {/* What to expect */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: '#f4f3ef', border: '1px solid #e2e0d8' }}
                >
                  <h3
                    className="text-lg font-medium mb-4"
                    style={{ fontFamily: 'var(--font-display)', color: '#1a1a18' }}
                  >
                    What to expect
                  </h3>
                  <div className="space-y-4">
                    {[
                      { num: '01', text: 'We listen to your idea and goals' },
                      { num: '02', text: 'We share how AI fits your use case' },
                      { num: '03', text: 'You get a clear next step and rough timeline' },
                    ].map((item) => (
                      <div key={item.num} className="flex items-start gap-3">
                        <span
                          className="text-xs font-medium mt-0.5"
                          style={{ color: '#c9a96e', fontFamily: 'var(--font-display)' }}
                        >
                          {item.num}
                        </span>
                        <p className="text-sm" style={{ color: '#4a4a44' }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust elements */}
                <div className="space-y-3">
                  {[
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      ),
                      text: 'Your data stays private and secure',
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      text: 'Free consultation, no strings attached',
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      ),
                      text: 'Talk to actual builders, not salespeople',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span style={{ color: '#c9a96e' }}>{item.icon}</span>
                      <span className="text-sm" style={{ color: '#7a7a72' }}>{item.text}</span>
                    </div>
                  ))}
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
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
      q: 'How long is the call?',
      a: '30 minutes. Enough time to understand your idea and give you a clear picture of how we can help.',
    },
    {
      q: 'Do I need to prepare anything?',
      a: "No pitch deck required. Just come with your idea or challenge. A rough description of what you're trying to achieve is plenty.",
    },
    {
      q: 'Is the consultation really free?',
      a: 'Yes. No hidden fees, no obligation. If there is a good fit we will propose a project. If not, you walk away with free advice.',
    },
    {
      q: 'What happens after the call?',
      a: 'If there is a fit, we send you a clear proposal with scope, timeline, and pricing within 48 hours. No lengthy discovery process.',
    },
    {
      q: 'Can I reschedule?',
      a: 'Absolutely. Reply to your confirmation email or book a new slot. We are flexible.',
    },
  ];

  return (
    <section className="py-16 md:py-20" style={{ background: '#f4f3ef' }}>
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-2xl md:text-3xl text-center mb-10"
              style={{ fontFamily: 'var(--font-display)', color: '#1a1a18', fontWeight: 400 }}
            >
              Common questions
            </h2>

            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="py-5" style={{ borderBottom: '1px solid #e2e0d8' }}>
                    <h3 className="font-medium text-sm mb-1.5" style={{ color: '#1a1a18' }}>{faq.q}</h3>
                    <p className="text-sm" style={{ color: '#7a7a72', lineHeight: 1.6 }}>{faq.a}</p>
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
// ALTERNATIVE CTA
// ============================================================================

function AlternativeCTA() {
  return (
    <section className="py-16 md:py-20" style={{ background: '#1a1a18' }}>
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl md:text-3xl mb-3"
              style={{ fontFamily: 'var(--font-display)', color: '#fafaf8', fontWeight: 400 }}
            >
              Prefer to write?
            </h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(250, 250, 248, 0.6)' }}>
              Not ready for a call yet? Start with our quick assessment or drop us a message.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start"
                className="inline-flex items-center px-7 py-3 rounded-full text-sm font-medium transition-all duration-175"
                style={{ background: '#fafaf8', color: '#1a1a18' }}
              >
                Quick Assessment
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center px-7 py-3 rounded-full text-sm font-medium transition-all duration-175"
                style={{ border: '1px solid rgba(250, 250, 248, 0.2)', color: '#fafaf8' }}
              >
                Send a Message
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function BookPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <BookingSection />
      <FAQ />
      <AlternativeCTA />
    </main>
  );
}
