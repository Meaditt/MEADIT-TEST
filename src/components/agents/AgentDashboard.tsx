'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ========================
// TYPES
// ========================

interface AgentRecommendation {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTimeSaved: string;
}

interface AnalysisResult {
  summary: string;
  businessType: string;
  painPoints: string[];
  opportunities: string[];
  recommendedAgents: AgentRecommendation[];
  estimatedImpact: string;
  automationScore: number;
  manualProcesses: string[];
  aiOpportunities: Array<{
    area: string;
    currentProcess: string;
    proposedSolution: string;
    impact: string;
  }>;
}

interface AnalysisRecord {
  id: string;
  url: string;
  timestamp: string;
  result: AnalysisResult;
  metadata: {
    responseTimeMs: number;
    contentLength: number;
    hadApiKey: boolean;
  };
}

interface RunResult {
  id: string;
  startedAt: string;
  completedAt: string;
  urls: string[];
  results: Array<{
    url: string;
    success: boolean;
    result?: AnalysisResult;
    error?: string;
  }>;
  durationMs: number;
}

interface SchedulerStatus {
  enabled: boolean;
  lastRunAt: string | null;
  nextRunAt: string | null;
  intervalMs: number;
  intervalHuman: string;
  totalRuns: number;
  isRunning: boolean;
  targetUrls: string[];
}

interface DashboardData {
  status: SchedulerStatus;
  metrics: {
    totalAnalyses: number;
    averageScore: number;
    topBusinessTypes: Array<{ type: string; count: number }>;
    topRecommendedAgents: Array<{ name: string; count: number }>;
    lastRefinedAt: string;
  };
  insights: string[];
  recentHistory: AnalysisRecord[];
  runHistory: RunResult[];
}

// ========================
// COMPONENT
// ========================

export function AgentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const [isRunningManual, setIsRunningManual] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'insights'>('overview');

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch('/api/agents/schedule?view=dashboard');
      if (!res.ok) throw new Error('Failed to fetch dashboard data');
      const dashboardData = await res.json();
      setData(dashboardData);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchDashboard]);

  const runManualAnalysis = async () => {
    if (!manualUrl.trim()) return;
    setIsRunningManual(true);
    setError('');

    try {
      const res = await fetch('/api/agents/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'run', urls: [manualUrl.trim()] }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Run failed');
      }
      setManualUrl('');
      await fetchDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Run failed');
    } finally {
      setIsRunningManual(false);
    }
  };

  const toggleScheduler = async () => {
    if (!data) return;

    try {
      if (data.status.enabled) {
        await fetch('/api/agents/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'stop' }),
        });
      } else {
        const urls = data.status.targetUrls.length > 0
          ? data.status.targetUrls
          : manualUrl ? [manualUrl] : [];
        if (urls.length === 0) {
          setError('Add at least one URL to start the scheduler');
          return;
        }
        await fetch('/api/agents/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'start', urls }),
        });
      }
      await fetchDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-2 border-[#c9a96e]/30 border-t-[#c9a96e] rounded-full"
          />
          <p className="text-sm text-[#a1a1aa]">Loading agent dashboard...</p>
        </div>
      </div>
    );
  }

  const status = data?.status;
  const metrics = data?.metrics;

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${status?.enabled ? 'bg-green-500' : 'bg-[#52525b]'}`} />
              {status?.enabled && (
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 w-3 h-3 rounded-full bg-green-500"
                />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Website Agent {status?.enabled ? 'Active' : 'Paused'}
              </h2>
              <p className="text-sm text-[#a1a1aa]">
                {status?.enabled
                  ? `Running every ${status.intervalHuman} | ${status.targetUrls.length} URL${status.targetUrls.length !== 1 ? 's' : ''} monitored`
                  : 'Enable to start automatic analysis'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleScheduler}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              status?.enabled
                ? 'bg-[#1a1a24] text-[#a1a1aa] hover:bg-red-500/10 hover:text-red-400 border border-white/10'
                : 'bg-[#c9a96e] text-[#0a0a0f] hover:bg-[#d4b87e]'
            }`}
          >
            {status?.enabled ? 'Pause Agent' : 'Activate Agent'}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <StatCard
            label="Total Analyses"
            value={String(metrics?.totalAnalyses || 0)}
          />
          <StatCard
            label="Avg Score"
            value={metrics?.averageScore ? `${metrics.averageScore}/100` : '--'}
          />
          <StatCard
            label="Last Run"
            value={status?.lastRunAt ? formatTimeAgo(status.lastRunAt) : 'Never'}
          />
          <StatCard
            label="Next Run"
            value={status?.nextRunAt ? formatTimeAgo(status.nextRunAt) : '--'}
          />
        </div>
      </div>

      {/* Manual Analysis */}
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white mb-4">Manual Analysis</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="Enter website URL to analyze..."
            className="flex-1 px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-xl text-white placeholder-[#52525b] focus:outline-none focus:border-[#c9a96e]/50 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && runManualAnalysis()}
            disabled={isRunningManual}
          />
          <button
            onClick={runManualAnalysis}
            disabled={isRunningManual || !manualUrl.trim()}
            className="px-6 py-3 bg-[#c9a96e] text-[#0a0a0f] rounded-xl text-sm font-medium hover:bg-[#d4b87e] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isRunningManual ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
        {error && (
          <p className="text-red-400 text-sm mt-3">{error}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#12121a] border border-white/10 rounded-xl p-1">
        {(['overview', 'history', 'insights'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/20'
                : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Top Recommended Agents */}
            {metrics && metrics.topRecommendedAgents.length > 0 && (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">Top Recommended Agents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {metrics.topRecommendedAgents.slice(0, 6).map((agent) => (
                    <div
                      key={agent.name}
                      className="flex items-center justify-between px-4 py-3 bg-[#1a1a24] rounded-xl border border-white/5"
                    >
                      <span className="text-sm text-white">{agent.name}</span>
                      <span className="text-xs text-[#c9a96e] font-medium">
                        {agent.count}x recommended
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Types */}
            {metrics && metrics.topBusinessTypes.length > 0 && (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">Business Types Analyzed</h3>
                <div className="flex flex-wrap gap-2">
                  {metrics.topBusinessTypes.map((bt) => (
                    <span
                      key={bt.type}
                      className="px-3 py-1.5 bg-[#1a1a24] border border-[#c9a96e]/20 rounded-lg text-sm text-[#a1a1aa]"
                    >
                      {bt.type} ({bt.count})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Monitored URLs */}
            {status && status.targetUrls.length > 0 && (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">Monitored URLs</h3>
                <div className="space-y-2">
                  {status.targetUrls.map((url) => (
                    <div
                      key={url}
                      className="flex items-center gap-3 px-4 py-3 bg-[#1a1a24] rounded-xl border border-white/5"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                      <span className="text-sm text-[#a1a1aa] truncate">{url}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {(!metrics || metrics.totalAnalyses === 0) && (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No analyses yet</h3>
                <p className="text-sm text-[#a1a1aa] max-w-md mx-auto">
                  Enter a website URL above and run your first analysis. The agent will identify automation opportunities and recommend AI solutions.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {data?.recentHistory && data.recentHistory.length > 0 ? (
              data.recentHistory.map((record) => (
                <HistoryCard key={record.id} record={record} />
              ))
            ) : (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-sm text-[#a1a1aa]">No analysis history yet. Run an analysis to get started.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {data?.insights && data.insights.length > 0 ? (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">Agent Insights</h3>
                <div className="space-y-3">
                  {data.insights.map((insight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 px-4 py-3 bg-[#1a1a24] rounded-xl border border-white/5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-2 flex-shrink-0" />
                      <p className="text-sm text-[#a1a1aa] leading-relaxed">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-sm text-[#a1a1aa]">Insights will appear after running a few analyses.</p>
              </div>
            )}

            {/* Run History */}
            {data?.runHistory && data.runHistory.length > 0 && (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">Scheduled Run History</h3>
                <div className="space-y-3">
                  {data.runHistory.map((run) => (
                    <div
                      key={run.id}
                      className="px-4 py-3 bg-[#1a1a24] rounded-xl border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white font-medium">
                          {new Date(run.completedAt).toLocaleDateString()} {new Date(run.completedAt).toLocaleTimeString()}
                        </span>
                        <span className="text-xs text-[#a1a1aa]">{run.durationMs}ms</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                        <span>{run.results.filter(r => r.success).length}/{run.results.length} succeeded</span>
                        <span className="text-[#52525b]">|</span>
                        <span>{run.urls.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ========================
// SUB-COMPONENTS
// ========================

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 bg-[#1a1a24] rounded-xl border border-white/5">
      <p className="text-xs text-[#52525b] uppercase tracking-wider mb-1">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function HistoryCard({ record }: { record: AnalysisRecord }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex-shrink-0">
            <ScoreRing score={record.result.automationScore} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{record.url}</p>
            <p className="text-xs text-[#a1a1aa]">
              {record.result.businessType} | {new Date(record.timestamp).toLocaleDateString()} {new Date(record.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[#52525b] transition-transform flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 space-y-4 border-t border-white/5 pt-4">
              {/* Summary */}
              <p className="text-sm text-[#a1a1aa] leading-relaxed">{record.result.summary}</p>

              {/* Impact */}
              <div className="px-4 py-3 bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded-xl">
                <p className="text-sm font-medium text-[#c9a96e]">{record.result.estimatedImpact}</p>
              </div>

              {/* Pain Points & Opportunities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Issues Found</p>
                  <div className="space-y-1.5">
                    {record.result.painPoints.slice(0, 4).map((p, i) => (
                      <p key={i} className="text-xs text-[#a1a1aa] leading-relaxed">{p}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Opportunities</p>
                  <div className="space-y-1.5">
                    {record.result.opportunities.slice(0, 4).map((o, i) => (
                      <p key={i} className="text-xs text-[#a1a1aa] leading-relaxed">{o}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Agents */}
              <div>
                <p className="text-xs font-semibold text-[#c9a96e] uppercase tracking-wider mb-2">Recommended Agents</p>
                <div className="flex flex-wrap gap-2">
                  {record.result.recommendedAgents.map((agent, i) => {
                    const name = typeof agent === 'string' ? agent : agent.name;
                    const priority = typeof agent === 'string' ? 'medium' : agent.priority;
                    return (
                      <span
                        key={i}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                          priority === 'high'
                            ? 'bg-[#c9a96e]/10 border-[#c9a96e]/30 text-[#c9a96e]'
                            : priority === 'medium'
                            ? 'bg-white/5 border-white/10 text-[#a1a1aa]'
                            : 'bg-white/[0.02] border-white/5 text-[#52525b]'
                        }`}
                      >
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-[#52525b] pt-2 border-t border-white/5">
                <span>{record.metadata.responseTimeMs}ms response</span>
                <span>{record.metadata.contentLength} chars analyzed</span>
                <span>{record.metadata.hadApiKey ? 'AI-powered' : 'Fallback analysis'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = score >= 70 ? '#c9a96e' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
        <circle
          cx="22" cy="22" r={radius} fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{score}</span>
      </div>
    </div>
  );
}

// ========================
// HELPERS
// ========================

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // Future dates
  if (diffMs < 0) {
    const absDiff = Math.abs(diffMs);
    const hours = Math.floor(absDiff / (60 * 60 * 1000));
    if (hours < 1) return 'in < 1h';
    if (hours < 24) return `in ${hours}h`;
    return `in ${Math.floor(hours / 24)}d`;
  }

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
