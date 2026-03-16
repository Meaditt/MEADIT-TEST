'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

export default function PrivacyPage() {
  return (
    <main id="main-content" className="overflow-x-hidden">
      <section className="py-16 md:py-24 bg-[#fbfbfd] px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-6 md:mb-8">
                Privacy Policy.
              </h1>
            </FadeIn>

            <div className="space-y-8 text-[#1d1d1f]">
              <FadeIn delay={0.1}>
                <p className="text-lg text-[#86868b]">
                  Last updated: February 2026
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Your Privacy Matters</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  At AI Agency, we believe your data belongs to you. We collect only what we need to provide our services, and we never sell your information to third parties.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">What We Collect</h2>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                  <li>Information you provide when contacting us</li>
                  <li>Usage data to improve our website experience</li>
                  <li>Business information necessary to build your automation</li>
                </ul>
              </FadeIn>

              <FadeIn delay={0.4}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">How We Use It</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We use your information solely to provide and improve our services. Your business data used in automation projects remains yours. We never train AI models on your proprietary information.
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  You can request to see, modify, or delete your data at any time. Just email us at privacy@aiagency.com.
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Contact</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  Questions about privacy? Reach out to privacy@aiagency.com and we will respond within 24 hours.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
