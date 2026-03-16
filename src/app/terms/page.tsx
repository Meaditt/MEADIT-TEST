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

export default function TermsPage() {
  return (
    <main id="main-content" className="overflow-x-hidden">
      <section className="py-16 md:py-24 bg-[#fbfbfd] px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-6 md:mb-8">
                Terms of Use.
              </h1>
            </FadeIn>

            <div className="space-y-8 text-[#1d1d1f]">
              <FadeIn delay={0.1}>
                <p className="text-lg text-[#86868b]">
                  Last updated: February 2026
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Agreement</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  By using our website or services, you agree to these terms. We keep them simple and fair because that is how we do business.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Our Services</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We build custom AI automation for businesses. Each project is scoped individually with a fixed price and timeline. We provide 30 days of support after deployment, with extended support available.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Your Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                  <li>Provide accurate information about your business needs</li>
                  <li>Give timely feedback during the development process</li>
                  <li>Use our automation for lawful purposes only</li>
                </ul>
              </FadeIn>

              <FadeIn delay={0.5}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Our Guarantee</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  If the automation we build does not meet the agreed specifications, we fix it at no extra cost. If we cannot deliver what we promised, you get a full refund. No fine print.
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  You own the automation we build for you. We retain the right to use general techniques and nonproprietary code in other projects, but your specific business logic and data remain yours.
                </p>
              </FadeIn>

              <FadeIn delay={0.7}>
                <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">Questions</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  Questions about these terms? Email legal@aiagency.com.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
