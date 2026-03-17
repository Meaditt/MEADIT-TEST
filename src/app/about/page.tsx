'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

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
// HERO - PERSONAL & HONEST
// ============================================================================

function Hero() {
  return (
    <section className="pt-32 pb-16 bg-white">
      <div className="container px-4">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium text-[#86868b] mb-6"
          >
            Our Story
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.1] mb-8"
          >
            We started exactly where you are right now.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#52525b] leading-relaxed"
          >
            With an idea. A laptop. And that 2am feeling of "I think this could actually work."
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// THE REAL STORY
// ============================================================================

function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-[#1d1d1f] leading-relaxed mb-8">
                Let me tell you how this actually started.
              </p>

              <p className="text-lg text-[#52525b] leading-relaxed mb-6">
                I was building my third startup. It was 2023, and I'd just discovered that you could
                actually <em>talk</em> to AI and it would write code for you. Mind. Blown.
              </p>

              <p className="text-lg text-[#52525b] leading-relaxed mb-6">
                I spent the next 6 months in what I now call "the cave." Cursor open. Claude in another tab.
                Stack Overflow for the stuff AI couldn't figure out. I shipped more in those 6 months than
                I had in the previous 2 years combined.
              </p>

              <p className="text-lg text-[#52525b] leading-relaxed mb-6">
                But here's the thing. I kept hitting walls. The AI was great for getting started,
                but when I needed real infrastructure? When my "quick prototype" needed to handle
                actual users? When my ChatGPT wrapper needed to not fall over at 100 requests?
              </p>

              <p className="text-lg text-[#52525b] leading-relaxed mb-6">
                I was stuck. And I saw other founders stuck in the same place.
              </p>

              <p className="text-xl text-[#1d1d1f] leading-relaxed mb-6 font-medium">
                That's when I realized: there's a gap between "I built a demo" and "I built a business."
                And most founders fall right into it.
              </p>

              <p className="text-lg text-[#52525b] leading-relaxed">
                So I started helping. First friends. Then friends of friends. Then strangers who found me
                on Twitter. And before I knew it, this <em>was</em> the business.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FOUNDER INTRO - PERSONAL
// ============================================================================

function FounderIntro() {
  return (
    <section className="py-20 bg-[#f5f5f7]">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative">
                <div className="aspect-square bg-[#1d1d1f] rounded-3xl flex items-center justify-center">
                  <span className="text-8xl font-bold text-white">G</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                  <p className="text-sm font-medium text-[#1d1d1f]">Building since 2019</p>
                  <p className="text-xs text-[#86868b]">3 startups, 2 exits, 1 failed</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-4">
                  Hey, I'm Gal.
                </h2>
                <div className="space-y-4 text-[#52525b]">
                  <p>
                    I've been where you are. The excitement of a new idea. The frustration of
                    technical roadblocks. The loneliness of building alone.
                  </p>
                  <p>
                    I've shipped products that made money and products that flopped spectacularly.
                    I've worked with agencies that burned my runway and freelancers who ghosted halfway through.
                  </p>
                  <p>
                    That's why I built this differently. No mystery. No corporate speak. Just founders
                    helping founders ship faster.
                  </p>
                  <p className="font-medium text-[#1d1d1f]">
                    When you work with us, you're working with people who actually get it.
                  </p>
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
// WHAT WE ACTUALLY BELIEVE
// ============================================================================

function Beliefs() {
  const beliefs = [
    {
      title: "Your idea is probably good enough",
      text: "Most founders don't fail because of bad ideas. They fail because they got stuck in execution hell. We're here to get you unstuck.",
    },
    {
      title: "Speed is a feature",
      text: "The faster you ship, the faster you learn. We'd rather help you launch something imperfect this month than something perfect never.",
    },
    {
      title: "AI is a tool, not magic",
      text: "We love AI. We use it every day. But we also know its limits. We'll tell you when AI is the answer and when it's not.",
    },
    {
      title: "You should understand what we build",
      text: "We won't hide behind jargon or black boxes. If you want to know how it works, we'll show you. Your business, your knowledge.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-12">
              What we actually believe
            </h2>
          </FadeIn>

          <div className="space-y-10">
            {beliefs.map((belief, i) => (
              <FadeIn key={belief.title} delay={i * 0.1}>
                <div className="border-l-4 border-[#1d1d1f] pl-6">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                    {belief.title}
                  </h3>
                  <p className="text-[#52525b]">
                    {belief.text}
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
// THE TEAM - REAL PEOPLE
// ============================================================================

const team = [
  {
    name: 'Gal',
    role: 'Founder',
    story: "Started coding at 14. Built my first startup at 22. Failed. Built another. Failed better. Third time worked. Now I help others skip the painful parts.",
    funFact: "Can debug code faster after 2 cups of coffee. Dangerously overconfident after 4.",
  },
  {
    name: 'Maya',
    role: 'AI Engineer',
    story: "PhD dropout. Realized I'd rather build things people use than write papers nobody reads. Joined because Gal promised interesting problems. He wasn't wrong.",
    funFact: "Has strong opinions about prompt engineering. Will share them whether you ask or not.",
  },
  {
    name: 'Tom',
    role: 'Fullstack Dev',
    story: "Former indie hacker. Had a product hit #1 on Product Hunt, then watched it die because I couldn't handle the scale. Now I build things that don't break.",
    funFact: "Types at 140 WPM. Most of it is actually useful code.",
  },
];

function Team() {
  return (
    <section className="py-20 bg-[#f5f5f7]">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-4">
              The humans behind this
            </h2>
            <p className="text-lg text-[#52525b] mb-12">
              Small team. Big opinions. We like it that way.
            </p>
          </FadeIn>

          <div className="space-y-8">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-[#1d1d1f] rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {member.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-[#1d1d1f]">
                          {member.name}
                        </h3>
                        <span className="text-sm text-[#86868b]">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-[#52525b] mb-4">
                        {member.story}
                      </p>
                      <p className="text-sm text-[#86868b] italic">
                        "{member.funFact}"
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
// HONEST NUMBERS
// ============================================================================

function HonestNumbers() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-12">
              Some honest numbers
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeIn delay={0.1}>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#1d1d1f]">47</p>
                <p className="text-[#52525b] mt-2">Founders we've helped</p>
                <p className="text-sm text-[#86868b] mt-1">And counting</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#1d1d1f]">12</p>
                <p className="text-[#52525b] mt-2">Days avg to first ship</p>
                <p className="text-sm text-[#86868b] mt-1">Fastest was 4</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#1d1d1f]">3</p>
                <p className="text-[#52525b] mt-2">Projects we said no to</p>
                <p className="text-sm text-[#86868b] mt-1">Wrong fit happens</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#1d1d1f]">0</p>
                <p className="text-[#52525b] mt-2">Projects abandoned</p>
                <p className="text-sm text-[#86868b] mt-1">We finish what we start</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// WHAT WE WON'T DO
// ============================================================================

function WontDo() {
  const items = [
    "We won't take your project if we don't think we can help",
    "We won't hide behind corporate speak or vague timelines",
    "We won't disappear when things get hard",
    "We won't build something we wouldn't use ourselves",
    "We won't pretend AI can solve everything",
  ];

  return (
    <section className="py-20 bg-[#f5f5f7]">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-8">
              What we won't do
            </h2>
            <p className="text-lg text-[#52525b] mb-10">
              Because what you <em>don't</em> do matters as much as what you do.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 bg-white rounded-xl p-5">
                  <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-[#1d1d1f]">{item}</p>
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
// CTA - PERSONAL INVITATION
// ============================================================================

function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-6">
              Still reading? Let's actually talk.
            </h2>
            <p className="text-lg text-[#52525b] mb-8">
              No sales pitch. No pressure. Just a conversation about what you're building
              and whether we can help. 15 minutes. If it's not a fit, I'll tell you.
            </p>
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#1d1d1f] text-white rounded-full font-medium text-lg hover:bg-[#333] transition-colors"
            >
              Book a call with me
            </Link>
            <p className="mt-6 text-sm text-[#86868b]">
              Or just send us a message. We actually respond
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Hero />
      <OurStory />
      <FounderIntro />
      <Beliefs />
      <Team />
      <HonestNumbers />
      <WontDo />
      <CTA />
    </main>
  );
}
