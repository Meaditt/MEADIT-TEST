'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentRecommendation {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTimeSaved: string;
}

interface AIOpportunity {
  area: string;
  currentProcess: string;
  proposedSolution: string;
  impact: 'high' | 'medium' | 'low';
}

interface CategoryScore {
  name: string;
  score: number;
  label: string;
}

interface SiteDetection {
  detectedFeatures: string[];
  missingFeatures: string[];
}

interface AnalysisResult {
  summary: string;
  businessType: string;
  painPoints: string[];
  opportunities: string[];
  recommendedAgents: AgentRecommendation[] | string[];
  estimatedImpact: string;
  automationScore: number;
  categoryScores?: CategoryScore[];
  manualProcesses: string[];
  aiOpportunities?: AIOpportunity[];
  siteDetection?: SiteDetection;
}

const priorityColor = {
  high: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  low: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
};

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score <= 40 ? '#ef4444' : score <= 65 ? '#f59e0b' : '#22c55e';
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-[#1d1d1f]">{label}</span>
        <span className="text-xs font-semibold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export function NeedsAssessment() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<'input' | 'analyzing' | 'results'>('input');
  const [thinkingText, setThinkingText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'opportunities'>('overview');

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
                if (parsed.error) {
                  setError(parsed.error);
                  setStage('input');
                } else if (parsed.thinking) {
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
    } catch {
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

  const handleReset = () => {
    setStage('input');
    setResult(null);
    setUrl('');
    setEmail('');
    setError('');
    setActiveTab('overview');
  };

  // Normalize agents - handle both legacy string[] and rich object[] formats
  const getAgents = (): AgentRecommendation[] => {
    if (!result) return [];
    return result.recommendedAgents.map(a =>
      typeof a === 'string'
        ? { name: a, description: '', priority: 'medium' as const, estimatedTimeSaved: '' }
        : a
    );
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
            {/* Header */}
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
              <p className="text-xs text-[#86868b]">Scanning your website for AI opportunities</p>
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
            {/* Impact Header with Score */}
            <div className="bg-[#1d1d1f] p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Automation Potential</p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-lg font-semibold text-white"
                  >
                    {result.estimatedImpact}
                  </motion.p>
                </div>
                <div className="text-right">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center"
                  >
                    <span className="text-xl font-bold text-white">{result.automationScore}</span>
                  </motion.div>
                  <p className="text-[9px] text-white/40 mt-1 uppercase">Score</p>
                </div>
              </div>
              {result.businessType && (
                <span className="inline-block px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/60">
                  {result.businessType}
                </span>
              )}
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[#f0f0f0]">
              {(['overview', 'agents', 'opportunities'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs font-medium uppercase tracking-wide transition-colors ${
                    activeTab === tab
                      ? 'text-[#1d1d1f] border-b-2 border-[#1d1d1f]'
                      : 'text-[#86868b] hover:text-[#52525b]'
                  }`}
                >
                  {tab === 'overview' ? 'Overview' : tab === 'agents' ? 'AI Agents' : 'Before / After'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Summary */}
                  <div className="p-5 border-b border-[#f0f0f0]">
                    <p className="text-sm text-[#52525b] leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Category Scores */}
                  {result.categoryScores && result.categoryScores.length > 0 && (
                    <div className="p-5 border-b border-[#f0f0f0]">
                      <p className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wide mb-3">Readiness Scores</p>
                      <div className="space-y-3">
                        {result.categoryScores.map((cs, i) => (
                          <motion.div
                            key={cs.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <ScoreBar score={cs.score} label={cs.name} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Site Detection */}
                  {result.siteDetection && (
                    <div className="p-5 border-b border-[#f0f0f0]">
                      <p className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wide mb-3">Site Scan Results</p>
                      <div className="grid grid-cols-2 gap-2">
                        {result.siteDetection.detectedFeatures.map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-green-700">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                        {result.siteDetection.missingFeatures.map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-red-600">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Issues & Solutions */}
                  <div className="grid grid-cols-2 divide-x divide-[#f0f0f0]">
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        </div>
                        <p className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wide">Issues</p>
                      </div>
                      <div className="space-y-2">
                        {result.painPoints.map((point, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="text-xs text-[#52525b] leading-relaxed"
                          >
                            {point}
                          </motion.p>
                        ))}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        </div>
                        <p className="text-xs font-semibold text-[#1d1d1f] uppercase tracking-wide">Solutions</p>
                      </div>
                      <div className="space-y-2">
                        {result.opportunities.map((opp, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.08 }}
                            className="text-xs text-[#52525b] leading-relaxed"
                          >
                            {opp}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'agents' && (
                <motion.div key="agents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5">
                  <div className="space-y-3">
                    {getAgents().map((agent, i) => {
                      const colors = priorityColor[agent.priority] || priorityColor.medium;
                      return (
                        <motion.div
                          key={agent.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="border border-[#e5e5e5] rounded-xl p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-semibold text-[#1d1d1f]">{agent.name}</h4>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text}`}>
                              <span className={`w-1 h-1 rounded-full ${colors.dot}`} />
                              {agent.priority}
                            </span>
                          </div>
                          {agent.description && (
                            <p className="text-xs text-[#52525b] leading-relaxed mb-2">{agent.description}</p>
                          )}
                          {agent.estimatedTimeSaved && (
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-[11px] font-medium text-green-700">Saves {agent.estimatedTimeSaved}</span>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'opportunities' && (
                <motion.div key="opportunities" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5">
                  {result.aiOpportunities && result.aiOpportunities.length > 0 ? (
                    <div className="space-y-4">
                      {result.aiOpportunities.map((opp, i) => (
                        <motion.div
                          key={opp.area}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.12 }}
                          className="border border-[#e5e5e5] rounded-xl overflow-hidden"
                        >
                          <div className="px-4 py-2.5 bg-[#fafafa] flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#1d1d1f]">{opp.area}</span>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                              opp.impact === 'high' ? 'bg-red-50 text-red-700' :
                              opp.impact === 'medium' ? 'bg-amber-50 text-amber-700' :
                              'bg-blue-50 text-blue-700'
                            }`}>
                              {opp.impact} impact
                            </span>
                          </div>
                          <div className="p-4 grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-[10px] font-medium text-red-500 uppercase tracking-wide mb-1">Now</p>
                              <p className="text-xs text-[#52525b] leading-relaxed">{opp.currentProcess}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-green-600 uppercase tracking-wide mb-1">With AI</p>
                              <p className="text-xs text-[#52525b] leading-relaxed">{opp.proposedSolution}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#86868b] text-center py-8">No detailed opportunities available</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

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
                <button
                  onClick={handleReset}
                  className="w-full py-2 text-xs text-[#86868b] hover:text-[#52525b] transition-colors"
                >
                  Analyze another website
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
