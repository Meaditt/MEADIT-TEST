'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisResult {
  summary: string;
  painPoints: string[];
  opportunities: string[];
  recommendedAgents: string[];
  estimatedImpact: string;
}

export function NeedsAssessment() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<'input' | 'analyzing' | 'results'>('input');
  const [thinkingText, setThinkingText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url) {
      setError('Enter your website URL');
      return;
    }
    setError('');
    setStage('analyzing');
    setThinkingText('Connecting to your website...');

    try {
      const response = await fetch('/api/analyze-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.thinking) {
                  setThinkingText(parsed.thinking);
                } else if (parsed.result) {
                  setResult(parsed.result);
                  setStage('results');
                }
              } catch {
                // Continue on parse errors
              }
            }
          }
        }
      }
    } catch (err) {
      setError('Failed to analyze. Try again.');
      setStage('input');
    }
  };

  const handleGetPlan = async () => {
    if (!email) {
      setError('Enter your email');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email');
      return;
    }

    try {
      await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, result }),
      });
    } catch {
      // Silent fail
    }

    window.location.href = '/start';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-lg overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8"
          >
            {/* Compelling Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f7] rounded-full mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span className="text-xs font-medium text-[#52525b]">Free analysis</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                See what AI can do for you
              </h3>
              <p className="text-sm text-[#86868b]">
                Get a personalized automation roadmap in 30 seconds
              </p>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { num: '10+', label: 'hrs saved/week' },
                { num: '3x', label: 'faster response' },
                { num: '24/7', label: 'availability' },
              ].map((item) => (
                <div key={item.label} className="text-center py-3 bg-[#fafafa] rounded-xl">
                  <p className="text-lg font-semibold text-[#1d1d1f]">{item.num}</p>
                  <p className="text-[10px] text-[#86868b] uppercase tracking-wide">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website"
                  className="w-full px-4 py-4 bg-[#f5f5f7] border-0 rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f] pr-12"
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
              </div>
              {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              <button
                onClick={handleAnalyze}
                className="w-full py-4 bg-[#1d1d1f] text-white rounded-xl font-medium hover:bg-black transition-all hover:shadow-lg"
              >
                Analyze my business
              </button>
              <p className="text-[11px] text-center text-[#86868b]">
                No signup required
              </p>
            </div>
          </motion.div>
        )}

        {stage === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8"
          >
            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-2 border-[#e5e5e5] border-t-[#1d1d1f] rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#1d1d1f] rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-[#1d1d1f] mb-1">AI Agent Working</p>
              <p className="text-xs text-[#86868b]">Analyzing your business</p>
            </div>

            {/* Thinking text */}
            <div className="bg-[#fafafa] rounded-xl p-4">
              <motion.p
                key={thinkingText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[#52525b] text-center"
              >
                {thinkingText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-0.5 h-4 bg-[#1d1d1f] ml-1 align-middle"
                />
              </motion.p>
            </div>
          </motion.div>
        )}

        {stage === 'results' && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Impact Header */}
            <div className="bg-[#1d1d1f] p-6 text-center">
              <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Potential Impact</p>
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xl font-semibold text-white"
              >
                {result.estimatedImpact}
              </motion.p>
            </div>

            {/* Summary */}
            <div className="p-5 border-b border-[#f0f0f0]">
              <p className="text-sm text-[#52525b] leading-relaxed">{result.summary}</p>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-2 divide-x divide-[#f0f0f0]">
              {/* Pain Points */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </div>
                  <p className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wide">Issues</p>
                </div>
                <div className="space-y-2">
                  {result.painPoints.slice(0, 3).map((point, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-xs text-[#52525b] leading-relaxed"
                    >
                      {point}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  </div>
                  <p className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wide">Solutions</p>
                </div>
                <div className="space-y-2">
                  {result.opportunities.slice(0, 3).map((opp, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-xs text-[#52525b] leading-relaxed"
                    >
                      {opp}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            {/* Agents */}
            <div className="px-5 py-4 border-t border-[#f0f0f0] bg-[#fafafa]">
              <p className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wide mb-3">Recommended Agents</p>
              <div className="flex flex-wrap gap-1.5">
                {result.recommendedAgents.map((agent, i) => (
                  <motion.span
                    key={agent}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="px-2.5 py-1 bg-white border border-[#e5e5e5] rounded-md text-[11px] font-medium text-[#1d1d1f]"
                  >
                    {agent}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-5 border-t border-[#f0f0f0]">
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email for detailed report"
                  className="w-full px-4 py-3 bg-[#f5f5f7] border-0 rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]"
                  onKeyDown={(e) => e.key === 'Enter' && handleGetPlan()}
                />
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <button
                  onClick={handleGetPlan}
                  className="w-full py-3 bg-[#1d1d1f] text-white rounded-xl font-medium hover:bg-black transition-all"
                >
                  Get implementation plan
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
