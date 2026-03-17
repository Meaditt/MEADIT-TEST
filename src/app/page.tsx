'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { NeedsAssessment } from '@/components/NeedsAssessment';
import { getAllBlogPosts } from '@/lib/data/blog';

// ============================================================================
// FADE IN
// ============================================================================

// Premium cubic bezier — subtle but registers as expensive-feeling
const EASE = [0.25, 0.1, 0.25, 1] as const;

function FadeIn({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// HERO - 53 agents all connecting to center (where text is)
// ============================================================================

function Hero() {
  // Center point - where the text is
  const center = { x: 50, y: 50 };

  // Agents - all dots at edges only (x < 12 or x > 88, y < 12 or y > 88)
  const agents = [
    // Top edge only
    { id: 0, x: 5, y: 4, name: 'Lead Finder' },
    { id: 1, x: 20, y: 5 },
    { id: 2, x: 35, y: 4, name: 'Outreach' },
    { id: 3, x: 50, y: 5 },
    { id: 4, x: 65, y: 4, name: 'Email' },
    { id: 5, x: 80, y: 5 },
    { id: 6, x: 95, y: 4, name: 'Marketing' },

    // Right edge only
    { id: 7, x: 96, y: 12, name: 'Content' },
    { id: 8, x: 95, y: 25 },
    { id: 9, x: 96, y: 38, name: 'SEO' },
    { id: 10, x: 95, y: 50 },
    { id: 11, x: 96, y: 62, name: 'Support' },
    { id: 12, x: 95, y: 75 },
    { id: 13, x: 96, y: 88, name: 'CRM' },

    // Bottom edge only
    { id: 14, x: 90, y: 96, name: 'Analytics' },
    { id: 15, x: 75, y: 95 },
    { id: 16, x: 60, y: 96, name: 'Tech' },
    { id: 17, x: 45, y: 95 },
    { id: 18, x: 30, y: 96, name: 'Backend' },
    { id: 19, x: 15, y: 95 },
    { id: 20, x: 5, y: 96, name: 'DevOps' },

    // Left edge only
    { id: 21, x: 4, y: 88, name: 'Data' },
    { id: 22, x: 5, y: 75 },
    { id: 23, x: 4, y: 62, name: 'Finance' },
    { id: 24, x: 5, y: 50 },
    { id: 25, x: 4, y: 38, name: 'Ops' },
    { id: 26, x: 5, y: 25 },
    { id: 27, x: 4, y: 12, name: 'QA' },

    // Corner areas (still at edges, just slightly inward)
    { id: 28, x: 10, y: 8, name: 'Workflow' },
    { id: 29, x: 90, y: 8, name: 'Success' },
    { id: 30, x: 10, y: 92, name: 'Onboarding' },
    { id: 31, x: 90, y: 92, name: 'Check-in' },
    { id: 32, x: 8, y: 18, name: 'Nurture' },
    { id: 33, x: 92, y: 18, name: 'Scheduler' },
    { id: 34, x: 8, y: 82 },
    { id: 35, x: 92, y: 82 },
  ];

  // Workflow - random agents from different edges each step
  const workflowSteps = [
    [2, 10, 18, 25],           // Random mix
    [5, 13, 21, 28],           // Random mix
    [0, 8, 16, 24],            // Random mix
    [6, 11, 19, 27],           // Random mix
    [3, 9, 17, 23],            // Random mix
    [4, 12, 20, 26],           // Random mix
    [1, 7, 15, 22, 29],        // Random mix
    [0, 10, 18, 25, 32],       // Random mix
    [5, 13, 21, 28, 34],       // Random mix
    [2, 8, 16, 24, 30],        // Random mix
  ];

  const [currentStep, setCurrentStep] = useState(0);

  // Cycle every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % workflowSteps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const activeAgents = workflowSteps[currentStep];

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden" style={{ background: '#fafaf8' }}>
      {/* Network SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
        {/* ALL lines from agents to center - warm grey */}
        {agents.map((agent) => (
          <line
            key={`line-${agent.id}`}
            x1={`${agent.x}%`}
            y1={`${agent.y}%`}
            x2={`${center.x}%`}
            y2={`${center.y}%`}
            stroke="#d4cfc4"
            strokeWidth="0.75"
            opacity="0.7"
            className="hidden md:block"
          />
        ))}

        {/* All agent dots */}
        {agents.map((agent) => {
          const isActive = activeAgents.includes(agent.id);
          const showName = isActive && agent.name;

          // Position labels INWARD so they're always visible
          let labelX = agent.x;
          let labelY = agent.y;
          let anchor: 'start' | 'middle' | 'end' = 'middle';

          // Left edge - label to the RIGHT (inward)
          if (agent.x < 15) {
            labelX = agent.x + 3;
            anchor = 'start';
          }
          // Right edge - label to the LEFT (inward)
          else if (agent.x > 85) {
            labelX = agent.x - 3;
            anchor = 'end';
          }

          // Top edge - label BELOW (inward)
          if (agent.y < 15) {
            labelY = agent.y + 4;
          }
          // Bottom edge - label ABOVE (inward)
          else if (agent.y > 85) {
            labelY = agent.y - 2;
          }

          return (
            <g key={`agent-${agent.id}`} className="hidden md:block">
              <motion.circle
                cx={`${agent.x}%`}
                cy={`${agent.y}%`}
                r={3}
                fill={isActive ? '#22c55e' : '#d4cfc4'}
                animate={{
                  r: showName ? 6 : isActive ? 4 : 3,
                  fill: isActive ? '#22c55e' : '#d4cfc4',
                }}
                transition={{ duration: 0.2 }}
              />
              {showName && (
                <motion.text
                  x={`${labelX}%`}
                  y={`${labelY}%`}
                  textAnchor={anchor}
                  fill="#22c55e"
                  fontSize="10"
                  fontWeight="500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {agent.name}
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Mobile: simplified */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden md:hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={`mobile-dot-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-gray-300"
            style={{
              top: `${8 + (i * 5.5) % 84}%`,
              left: `${6 + (i * 5.8) % 88}%`,
            }}
          />
        ))}
      </div>

      {/* Central Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Pre-headline label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-sm font-medium uppercase tracking-[0.2em] mb-8"
          style={{ color: '#c9a96e' }}
        >
          AI Agency for Founders
        </motion.p>

        {/* Word-stagger headline — line 1 */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.05] mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#1a1a18',
          }}
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            >
              {'You build the vision.'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.08, ease: EASE }}
                  style={{ marginRight: '0.25em' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </span>

          {/* Line 2 — italic, staggered after line 1 */}
          <span className="block overflow-hidden">
            <em style={{ color: '#7a7a72', fontStyle: 'italic', fontWeight: 300 }}>
              {'We build the AI.'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.45 + i * 0.08, ease: EASE }}
                  style={{ marginRight: '0.25em' }}
                >
                  {word}
                </motion.span>
              ))}
            </em>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
          className="text-xl md:text-2xl mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: '#7a7a72' }}
        >
          Turn your ideas into working automation. Ship in weeks, not months.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          <Link
            href="/start"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{ background: '#1a1a18', color: '#fafaf8', letterSpacing: '0.01em' }}
          >
            Start your project
          </Link>
          <Link
            href="/stories"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium transition-all duration-200 hover:opacity-70"
            style={{ color: '#1a1a18', letterSpacing: '0.01em' }}
          >
            See our work →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}


// ============================================================================
// AGENTS SHOWCASE - 6 Unique Mini Network Visualizations
// ============================================================================

function AgentsShowcase() {
  return (
    <section className="py-28 overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="container px-4">
        <FadeIn>
          <div className="text-center mb-20">
            <p className="text-sm font-medium uppercase tracking-[0.2em] mb-6" style={{ color: '#c9a96e' }}>
              What we build
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                letterSpacing: '-0.025em',
                color: '#1a1a18',
              }}
            >
              AI agents that
              <br /><em style={{ color: '#7a7a72', fontStyle: 'italic' }}>actually work.</em>
            </h2>
            <p className="text-xl max-w-xl mx-auto" style={{ color: '#7a7a72' }}>
              Not chatbots. Not toys. Real agents that do real work.
            </p>
          </div>
        </FadeIn>

        {/* 6 Unique Agent Visualizations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1. Sales Agent - Funnel/Pipeline visualization */}
          <FadeIn delay={0.1}>
            <div className="rounded-3xl p-6 min-h-[320px] relative overflow-hidden group transition-all duration-500" style={{ background: '#f4f3ef' }} onMouseEnter={e => (e.currentTarget.style.background = '#1a1a18')} onMouseLeave={e => (e.currentTarget.style.background = '#f4f3ef')}>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-1 transition-colors text-[#1a1a18] group-hover:text-[#c9a96e]" style={{ fontFamily: 'var(--font-display)' }}>Sales Agent</h3>
                <p className="text-base transition-colors text-[#7a7a72] group-hover:text-[#c9a96e]/70">Qualifies leads, books meetings</p>
              </div>
              {/* Funnel visualization */}
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <svg width="160" height="150" viewBox="0 0 200 180">
                  {/* Funnel shapes */}
                  <motion.path
                    d="M40,20 L160,20 L130,80 L70,80 Z"
                    fill="none"
                    strokeWidth="3"
                    className="stroke-[#0071e3]/40 group-hover:stroke-[#0071e3] transition-colors"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.path
                    d="M70,85 L130,85 L115,130 L85,130 Z"
                    fill="none"
                    strokeWidth="3"
                    className="stroke-[#0071e3]/50 group-hover:stroke-[#0071e3] transition-colors"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                  />
                  <motion.path
                    d="M85,135 L115,135 L105,160 L95,160 Z"
                    fill="none"
                    strokeWidth="3"
                    className="stroke-[#22c55e]/50 group-hover:stroke-[#22c55e] transition-colors"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
                  />
                  {/* Animated dots falling through funnel */}
                  <motion.circle r="6"
                    className="fill-[#22c55e]/60 group-hover:fill-[#22c55e] transition-colors"
                    animate={{ cy: [10, 170], opacity: [1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeIn" }}
                    cx="100"
                  />
                  <motion.circle r="5"
                    className="fill-[#0071e3]/50 group-hover:fill-[#0071e3] transition-colors"
                    animate={{ cy: [10, 170], opacity: [1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeIn", delay: 0.8 }}
                    cx="85"
                  />
                  <motion.circle r="5"
                    className="fill-[#0071e3]/50 group-hover:fill-[#0071e3] transition-colors"
                    animate={{ cy: [10, 170], opacity: [1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeIn", delay: 1.6 }}
                    cx="115"
                  />
                </svg>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <Link href="/start" className="text-sm font-medium hover:underline" style={{ color: '#c9a96e' }}>Learn more →</Link>
              </div>
            </div>
          </FadeIn>

          {/* 2. Support Agent - Chat bubbles visualization */}
          <FadeIn delay={0.15}>
            <div className="rounded-3xl p-6 min-h-[320px] relative overflow-hidden group transition-all duration-500" style={{ background: '#f4f3ef' }} onMouseEnter={e => (e.currentTarget.style.background = '#1a1a18')} onMouseLeave={e => (e.currentTarget.style.background = '#f4f3ef')}>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-1 transition-colors text-[#1a1a18] group-hover:text-[#c9a96e]" style={{ fontFamily: 'var(--font-display)' }}>Support Agent</h3>
                <p className="text-base transition-colors text-[#7a7a72] group-hover:text-[#c9a96e]/70">24/7 customer assistance</p>
              </div>
              {/* Chat bubbles visualization */}
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <div className="relative w-48 h-36 flex flex-col items-center justify-center gap-3">
                  {/* Chat bubbles - centered */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-28 h-10 bg-[#0071e3]/40 group-hover:bg-[#0071e3] rounded-2xl rounded-bl-sm transition-colors"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="w-32 h-10 bg-[#22c55e]/40 group-hover:bg-[#22c55e] rounded-2xl rounded-br-sm transition-colors"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="w-24 h-10 bg-[#0071e3]/40 group-hover:bg-[#0071e3] rounded-2xl rounded-bl-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    {/* Typing indicator inside bubble */}
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 bg-white/60 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      className="w-2 h-2 bg-white/60 rounded-full" />
                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      className="w-2 h-2 bg-white/60 rounded-full" />
                  </motion.div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <Link href="/start" className="text-sm font-medium hover:underline" style={{ color: '#c9a96e' }}>Learn more →</Link>
              </div>
            </div>
          </FadeIn>

          {/* 3. Content Agent - Document/Writing visualization */}
          <FadeIn delay={0.2}>
            <div className="rounded-3xl p-6 min-h-[320px] relative overflow-hidden group transition-all duration-500" style={{ background: '#f4f3ef' }} onMouseEnter={e => (e.currentTarget.style.background = '#1a1a18')} onMouseLeave={e => (e.currentTarget.style.background = '#f4f3ef')}>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-1 transition-colors text-[#1a1a18] group-hover:text-[#c9a96e]" style={{ fontFamily: 'var(--font-display)' }}>Content Agent</h3>
                <p className="text-base transition-colors text-[#7a7a72] group-hover:text-[#c9a96e]/70">Creates & schedules content</p>
              </div>
              {/* Writing/document visualization */}
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <div className="relative w-40 h-44">
                  {/* Document shape */}
                  <div className="bg-white/60 group-hover:bg-white/20 rounded-xl shadow-sm transition-colors w-full h-full">
                    {/* Animated text lines */}
                    <div className="p-4 space-y-3">
                      <motion.div
                        animate={{ width: ['0%', '85%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className="h-3 bg-[#a855f7]/50 group-hover:bg-[#a855f7] rounded transition-colors"
                      />
                      <motion.div
                        animate={{ width: ['0%', '65%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
                        className="h-3 bg-[#a855f7]/40 group-hover:bg-[#a855f7]/80 rounded transition-colors"
                      />
                      <motion.div
                        animate={{ width: ['0%', '90%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: 0.4 }}
                        className="h-3 bg-[#a855f7]/50 group-hover:bg-[#a855f7] rounded transition-colors"
                      />
                      <motion.div
                        animate={{ width: ['0%', '50%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
                        className="h-3 bg-[#a855f7]/40 group-hover:bg-[#a855f7]/80 rounded transition-colors"
                      />
                    </div>
                  </div>
                  {/* Cursor blink */}
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute bottom-12 left-8 w-1 h-5 bg-[#a855f7]/60 group-hover:bg-[#a855f7] transition-colors"
                  />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <Link href="/start" className="text-sm font-medium hover:underline" style={{ color: '#c9a96e' }}>Learn more →</Link>
              </div>
            </div>
          </FadeIn>

          {/* 4. Data Agent - Charts/Analytics visualization */}
          <FadeIn delay={0.25}>
            <div className="rounded-3xl p-6 min-h-[320px] relative overflow-hidden group transition-all duration-500" style={{ background: '#f4f3ef' }} onMouseEnter={e => (e.currentTarget.style.background = '#1a1a18')} onMouseLeave={e => (e.currentTarget.style.background = '#f4f3ef')}>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-1 transition-colors text-[#1a1a18] group-hover:text-[#c9a96e]" style={{ fontFamily: 'var(--font-display)' }}>Data Agent</h3>
                <p className="text-base transition-colors text-[#7a7a72] group-hover:text-[#c9a96e]/70">Analyzes & reports insights</p>
              </div>
              {/* Bar chart visualization */}
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <div className="flex items-end gap-3 h-32">
                  <motion.div
                    animate={{ height: ['20%', '60%', '40%', '80%', '20%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-7 bg-[#22c55e]/50 group-hover:bg-[#22c55e] rounded-t transition-colors"
                  />
                  <motion.div
                    animate={{ height: ['50%', '30%', '70%', '40%', '50%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                    className="w-7 bg-[#0071e3]/50 group-hover:bg-[#0071e3] rounded-t transition-colors"
                  />
                  <motion.div
                    animate={{ height: ['30%', '80%', '50%', '60%', '30%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                    className="w-7 bg-[#22c55e]/50 group-hover:bg-[#22c55e] rounded-t transition-colors"
                  />
                  <motion.div
                    animate={{ height: ['70%', '40%', '90%', '30%', '70%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}
                    className="w-7 bg-[#0071e3]/50 group-hover:bg-[#0071e3] rounded-t transition-colors"
                  />
                  <motion.div
                    animate={{ height: ['45%', '65%', '35%', '75%', '45%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
                    className="w-7 bg-[#22c55e]/50 group-hover:bg-[#22c55e] rounded-t transition-colors"
                  />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <Link href="/start" className="text-sm font-medium hover:underline" style={{ color: '#c9a96e' }}>Learn more →</Link>
              </div>
            </div>
          </FadeIn>

          {/* 5. Ops Agent - Connected nodes/workflow visualization */}
          <FadeIn delay={0.3}>
            <div className="rounded-3xl p-6 min-h-[320px] relative overflow-hidden group transition-all duration-500" style={{ background: '#f4f3ef' }} onMouseEnter={e => (e.currentTarget.style.background = '#1a1a18')} onMouseLeave={e => (e.currentTarget.style.background = '#f4f3ef')}>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-1 transition-colors text-[#1a1a18] group-hover:text-[#c9a96e]" style={{ fontFamily: 'var(--font-display)' }}>Ops Agent</h3>
                <p className="text-base transition-colors text-[#7a7a72] group-hover:text-[#c9a96e]/70">Connects tools & workflows</p>
              </div>
              {/* Network nodes visualization */}
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <svg width="180" height="140" viewBox="0 0 200 160">
                  {/* Connection lines */}
                  <motion.line x1="30" y1="80" x2="100" y2="45" strokeWidth="3"
                    className="stroke-[#0071e3]/50 group-hover:stroke-[#0071e3] transition-colors"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }} />
                  <motion.line x1="30" y1="80" x2="100" y2="115" strokeWidth="3"
                    className="stroke-[#0071e3]/50 group-hover:stroke-[#0071e3] transition-colors"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.2 }} />
                  <motion.line x1="100" y1="45" x2="170" y2="80" strokeWidth="3"
                    className="stroke-[#22c55e]/50 group-hover:stroke-[#22c55e] transition-colors"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.4 }} />
                  <motion.line x1="100" y1="115" x2="170" y2="80" strokeWidth="3"
                    className="stroke-[#22c55e]/50 group-hover:stroke-[#22c55e] transition-colors"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.6 }} />
                  {/* Nodes */}
                  <motion.circle cx="30" cy="80" r="16"
                    className="fill-[#0071e3]/50 group-hover:fill-[#0071e3] transition-colors"
                    animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.circle cx="100" cy="45" r="14"
                    className="fill-[#0071e3]/40 group-hover:fill-[#0071e3]/80 transition-colors"
                    animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
                  <motion.circle cx="100" cy="115" r="14"
                    className="fill-[#0071e3]/40 group-hover:fill-[#0071e3]/80 transition-colors"
                    animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
                  <motion.circle cx="170" cy="80" r="16"
                    className="fill-[#22c55e]/50 group-hover:fill-[#22c55e] transition-colors"
                    animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.9 }} />
                </svg>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <Link href="/start" className="text-sm font-medium hover:underline" style={{ color: '#c9a96e' }}>Learn more →</Link>
              </div>
            </div>
          </FadeIn>

          {/* 6. Outreach Agent - Email/messages spreading visualization */}
          <FadeIn delay={0.35}>
            <div className="rounded-3xl p-6 min-h-[320px] relative overflow-hidden group transition-all duration-500" style={{ background: '#f4f3ef' }} onMouseEnter={e => (e.currentTarget.style.background = '#1a1a18')} onMouseLeave={e => (e.currentTarget.style.background = '#f4f3ef')}>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-1 transition-colors text-[#1a1a18] group-hover:text-[#c9a96e]" style={{ fontFamily: 'var(--font-display)' }}>Outreach Agent</h3>
                <p className="text-base transition-colors text-[#7a7a72] group-hover:text-[#c9a96e]/70">Personalized email sequences</p>
              </div>
              {/* Email spreading visualization */}
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <div className="relative w-48 h-36">
                  {/* Central email */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-10 bg-[#0071e3]/50 group-hover:bg-[#0071e3] rounded-lg transition-colors"
                  />
                  {/* Spreading emails */}
                  <motion.div
                    animate={{ x: [-18, -55], y: [-8, -28], opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute left-1/2 top-1/2 w-9 h-7 bg-[#22c55e]/50 group-hover:bg-[#22c55e] rounded transition-colors"
                  />
                  <motion.div
                    animate={{ x: [18, 55], y: [-8, -28], opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    className="absolute left-1/2 top-1/2 w-9 h-7 bg-[#22c55e]/50 group-hover:bg-[#22c55e] rounded transition-colors"
                  />
                  <motion.div
                    animate={{ x: [-18, -50], y: [8, 30], opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    className="absolute left-1/2 top-1/2 w-9 h-7 bg-[#22c55e]/50 group-hover:bg-[#22c55e] rounded transition-colors"
                  />
                  <motion.div
                    animate={{ x: [18, 50], y: [8, 30], opacity: [0, 1, 0], scale: [0.5, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                    className="absolute left-1/2 top-1/2 w-9 h-7 bg-[#22c55e]/50 group-hover:bg-[#22c55e] rounded transition-colors"
                  />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <Link href="/start" className="text-sm font-medium hover:underline" style={{ color: '#c9a96e' }}>Learn more →</Link>
              </div>
            </div>
          </FadeIn>

        </div>

        <FadeIn delay={0.5}>
          <div className="mt-20 text-center">
            <p className="text-base mb-6" style={{ color: '#7a7a72' }}>
              Need something custom?
            </p>
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
              style={{ background: '#1a1a18', color: '#fafaf8', letterSpacing: '0.01em' }}
            >
              Tell us what you're building
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// WHY US
// ============================================================================

function WhyUs() {
  const reasons = [
    {
      title: 'We ship in weeks, not months',
      description: 'Most projects go live in 2 to 3 weeks. We know what works. No experimenting on your dime.',
    },
    {
      title: 'We speak founder, not enterprise',
      description: 'No SOWs, no change requests, no 47 page proposals. You tell us what you need. We build it.',
    },
    {
      title: 'We use what we build',
      description: 'Our own business runs on AI automation. If it is not good enough for us, it is not good enough for you.',
    },
  ];

  return (
    <section className="py-28" style={{ background: '#f4f3ef' }}>
      <div className="container px-4">
        {/* Asymmetric layout — headline anchored left, reasons right */}
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start max-w-5xl mx-auto">
          {/* Left: sticky headline block */}
          <FadeIn>
            <div className="md:sticky md:top-28">
              <p className="text-sm font-medium uppercase tracking-[0.2em] mb-6" style={{ color: '#c9a96e' }}>
                Why work with us
              </p>
              <h2
                className="text-4xl md:text-5xl"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  color: '#1a1a18',
                  lineHeight: 1.1,
                }}
              >
                We're not
                <br />a dev shop.
                <br /><em style={{ fontStyle: 'italic', color: '#7a7a72' }}>We're founders
                <br />who code.</em>
              </h2>
            </div>
          </FadeIn>

          {/* Right: reasons stacked */}
          <div className="flex flex-col gap-12 pt-2">
            {reasons.map((reason, i) => (
              <FadeIn key={reason.title} delay={i * 0.12}>
                <div style={{ borderTop: '1px solid #e2e0d8', paddingTop: '2rem' }}>
                  <div className="w-8 h-px mb-6" style={{ background: '#c9a96e' }} />
                  <h3
                    className="text-xl mb-4"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: '#1a1a18', letterSpacing: '-0.01em' }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#7a7a72' }}>
                    {reason.description}
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
// FEATURED STORIES
// ============================================================================

function FeaturedStories() {
  const stories = [
    {
      number: '01',
      title: 'From Side Project to SaaS',
      description: 'A solo founder turned a weekend hack into $10K MRR with AI automation.',
      outcome: '$10K MRR in 60 days',
      slug: 'real-estate-listing-automation',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80',
    },
    {
      number: '02',
      title: 'The One Person Agency',
      description: 'How one founder runs a full marketing agency with zero employees using AI agents.',
      outcome: '0 hires. Full agency output.',
      slug: 'ecommerce-customer-support',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80',
    },
    {
      number: '03',
      title: 'Shipped in 10 Days',
      description: 'An AI support agent that handles 500+ tickets daily. Built and deployed in under 2 weeks.',
      outcome: '500+ tickets/day. 10 days to ship.',
      slug: 'healthcare-appointment-scheduling',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80',
    },
  ];

  return (
    <section className="py-28" style={{ background: '#ffffff' }}>
      <div className="container px-4">
        <FadeIn>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] mb-5" style={{ color: '#c9a96e' }}>Case Studies</p>
              <h2
                className="text-4xl md:text-5xl"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, letterSpacing: '-0.025em', color: '#1a1a18' }}
              >
                Founders who shipped
              </h2>
            </div>
            <Link
              href="/stories"
              className="hidden md:inline-flex text-sm font-medium hover:underline transition-opacity hover:opacity-70"
              style={{ color: '#1a1a18', letterSpacing: '0.01em' }}
            >
              View all →
            </Link>
          </div>
        </FadeIn>

        {/* Editorial numbered list — full-width entries */}
        <div className="flex flex-col">
          {stories.map((story, i) => (
            <FadeIn key={story.slug} delay={i * 0.1}>
              <Link
                href={`/stories/${story.slug}`}
                className="group block py-10"
                style={{ borderTop: '1px solid #e2e0d8' }}
              >
                <div className="grid md:grid-cols-[80px_1fr_auto] gap-6 md:gap-12 items-center">
                  {/* Number */}
                  <span
                    className="text-5xl md:text-6xl font-light"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: '#e2e0d8',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    {story.number}
                  </span>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                    <div className="flex-1">
                      <h3
                        className="text-2xl md:text-3xl mb-2 group-hover:opacity-70 transition-opacity duration-300"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 300, letterSpacing: '-0.02em', color: '#1a1a18' }}
                      >
                        {story.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: '#7a7a72', maxWidth: 420 }}>
                        {story.description}
                      </p>
                    </div>
                    {/* Outcome metric — the key trust signal */}
                    <div
                      className="md:text-right shrink-0"
                    >
                      <span
                        className="text-sm font-medium"
                        style={{ color: '#c9a96e', letterSpacing: '0.02em' }}
                      >
                        {story.outcome}
                      </span>
                    </div>
                  </div>

                  {/* Image — bleeds off right edge */}
                  <div
                    className="hidden md:block w-36 h-24 overflow-hidden rounded-xl shrink-0"
                    style={{
                      transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    }}
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
          <div style={{ borderTop: '1px solid #e2e0d8' }} />
        </div>

        <FadeIn>
          <div className="mt-10 md:hidden">
            <Link href="/stories" className="text-sm font-medium hover:underline" style={{ color: '#c9a96e' }}>
              View all stories →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// TESTIMONIALS
// ============================================================================

function Testimonials() {
  const testimonials = [
    {
      quote: "I built my MVP with Cursor in a weekend. They built the AI agent that turned it into a real business.",
      author: "Y.M.",
      role: "Founder, SaaS Startup",
    },
    {
      quote: "I was copy pasting between ChatGPT and spreadsheets for hours. Now it just runs. I focus on growth.",
      author: "R.K.",
      role: "Solo Founder, Data Platform",
    },
    {
      quote: "They get it. I said I need an AI that does X and two weeks later, it existed. No BS, just shipped.",
      author: "D.L.",
      role: "Founder, Review Platform",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28" style={{ background: '#fafaf8' }}>
      <div className="container px-4">
        <FadeIn>
          {/* Glassmorphism testimonial card — surgical use of the effect */}
          <div
            className="max-w-3xl mx-auto text-center rounded-3xl px-8 py-16 md:px-16"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(201, 169, 110, 0.15)',
              boxShadow: '0 8px 48px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="text-4xl mb-8" style={{ color: '#c9a96e', fontFamily: 'var(--font-display)', lineHeight: 1 }}>"</div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="text-2xl md:text-3xl leading-snug mb-10"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#1a1a18',
                  letterSpacing: '-0.02em',
                }}
              >
                {testimonials[active].quote}
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="text-sm font-medium tracking-wide" style={{ color: '#1a1a18' }}>
                  {testimonials[active].author}
                </p>
                <p className="text-sm mt-1" style={{ color: '#7a7a72' }}>
                  {testimonials[active].role}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-px rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 32 : 8,
                    background: i === active ? '#c9a96e' : '#d4cfc4',
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// HOW WE DO IT - Apple Product Card Style
// ============================================================================

function HowWeDoIt() {
  const posts = getAllBlogPosts().slice(0, 4);

  // Define background colors for cards
  const cardStyles = [
    { bg: 'bg-[#fafaf8]', dark: false },
    { bg: 'bg-[#1a1a18]', dark: true },
    { bg: 'bg-[#eeede8]', dark: false },
    { bg: 'bg-[#1a1a18]', dark: true },
  ];

  return (
    <section className="py-20" style={{ background: '#f4f3ef' }}>
      <div className="container px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.2em] mb-5" style={{ color: '#c9a96e' }}>
              The Build Log
            </p>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, letterSpacing: '-0.025em', color: '#1a1a18' }}
            >
              How we do it
            </h2>
          </div>
        </FadeIn>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post, i) => {
            const style = cardStyles[i % cardStyles.length];
            return (
              <FadeIn key={post.id} delay={i * 0.1}>
                <div className={`${style.bg} overflow-hidden rounded-2xl`}>
                  {/* Text content at top */}
                  <div className="p-6 md:p-8 text-center overflow-hidden">
                    <p className={`text-sm font-medium uppercase tracking-[0.15em] mb-4 ${style.dark ? 'text-[#c9a96e]' : 'text-[#c9a96e]'}`}>
                      {post.category}
                    </p>
                    <h3
                      className="text-xl md:text-2xl mb-3 overflow-hidden"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        color: style.dark ? '#fafaf8' : '#1a1a18',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className={`text-base mb-6 max-w-md mx-auto leading-relaxed overflow-hidden ${style.dark ? 'text-gray-400' : 'text-[#7a7a72]'}`}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#c9a96e' }}
                      >
                        Learn more
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90"
                        style={{
                          background: style.dark ? '#fafaf8' : '#1a1a18',
                          color: style.dark ? '#1a1a18' : '#fafaf8',
                        }}
                      >
                        Read article
                      </Link>
                    </div>
                  </div>

                  {/* Image at bottom - fixed height */}
                  <div className="h-[280px] md:h-[320px] relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-base font-medium hover:underline transition-opacity hover:opacity-70"
              style={{ color: '#c9a96e' }}
            >
              View all articles →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================================================
// CTA SECTION - Clean and minimal
// ============================================================================

function CTASection() {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'an AI that qualifies my leads...',
    'automation for customer support...',
    'a content engine that runs itself...',
    'workflows that save me 20 hours...',
    'an agent that handles bookings...',
  ];

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentPhraseIndex]);

  return (
    <section className="py-28 md:py-36" style={{ background: '#fafaf8' }}>
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header with typing effect */}
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-medium uppercase tracking-[0.2em] mb-6" style={{ color: '#c9a96e' }}>Start here</p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl mb-6"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, letterSpacing: '-0.03em', color: '#1a1a18' }}
              >
                Ready to build?
              </h2>
              <div className="text-xl md:text-2xl h-8 md:h-10" style={{ color: '#7a7a72' }}>
                <span>I need </span>
                <span style={{ color: '#1a1a18' }}>{typedText}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 md:h-7 ml-1 align-middle"
                  style={{ background: '#c9a96e' }}
                />
              </div>
            </div>
          </FadeIn>

          {/* Assessment Form - centered */}
          <FadeIn delay={0.1}>
            <div className="max-w-lg mx-auto">
              <NeedsAssessment />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA
// ============================================================================

function FinalCTA() {
  return (
    <section className="py-28" style={{ background: '#ffffff' }}>
      <div className="container px-4">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-12 h-px mx-auto mb-10" style={{ background: '#c9a96e' }} />
            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, letterSpacing: '-0.025em', color: '#1a1a18' }}
            >
              Let's build something.
            </h2>
            <p className="text-xl mb-12" style={{ color: '#7a7a72' }}>
              15 minute call. No pitch deck needed.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full font-medium text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
              style={{ background: '#1a1a18', color: '#fafaf8', letterSpacing: '0.01em' }}
            >
              Start a conversation
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

export default function Home() {
  return (
    <main style={{ background: '#fafaf8' }}>
      <Hero />
      <AgentsShowcase />
      <WhyUs />
      <CTASection />
      <HowWeDoIt />
      <Testimonials />
      <FeaturedStories />
      <FinalCTA />
    </main>
  );
}
