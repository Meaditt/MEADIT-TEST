// ========================
// AGENT SCHEDULER
// ========================
// Manages scheduled website analysis runs with a configurable interval.
// Uses in-memory state (in production, persist to a database).

import {
  analyzeWebsite,
  getAllAnalysisHistory,
  compareAnalyses,
  getAgentMetrics,
  getInsights,
  type AnalysisResult,
  type AnalysisComparison,
} from './website-agent';

// ========================
// TYPES
// ========================

export interface SchedulerConfig {
  intervalMs: number; // Default: 48 hours
  enabled: boolean;
  targetUrls: string[];
}

export interface SchedulerStatus {
  enabled: boolean;
  lastRunAt: string | null;
  nextRunAt: string | null;
  intervalMs: number;
  intervalHuman: string;
  totalRuns: number;
  isRunning: boolean;
  targetUrls: string[];
}

export interface ScheduledRunResult {
  id: string;
  startedAt: string;
  completedAt: string;
  urls: string[];
  results: Array<{
    url: string;
    success: boolean;
    result?: AnalysisResult;
    comparison?: AnalysisComparison | null;
    error?: string;
  }>;
  durationMs: number;
}

// ========================
// SCHEDULER STATE
// ========================

const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;

const config: SchedulerConfig = {
  intervalMs: FORTY_EIGHT_HOURS,
  enabled: false,
  targetUrls: [],
};

let lastRunAt: string | null = null;
let totalRuns = 0;
let isRunning = false;
let schedulerTimer: ReturnType<typeof setTimeout> | null = null;
const runHistory: ScheduledRunResult[] = [];

// ========================
// CORE SCHEDULER
// ========================

function formatInterval(ms: number): string {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  }
  return `${hours}h`;
}

export function getSchedulerStatus(): SchedulerStatus {
  let nextRunAt: string | null = null;
  if (config.enabled && lastRunAt) {
    const nextTime = new Date(lastRunAt).getTime() + config.intervalMs;
    nextRunAt = new Date(nextTime).toISOString();
  } else if (config.enabled && !lastRunAt) {
    nextRunAt = new Date().toISOString(); // Will run immediately
  }

  return {
    enabled: config.enabled,
    lastRunAt,
    nextRunAt,
    intervalMs: config.intervalMs,
    intervalHuman: formatInterval(config.intervalMs),
    totalRuns,
    isRunning,
    targetUrls: [...config.targetUrls],
  };
}

export function getRunHistory(): ScheduledRunResult[] {
  return [...runHistory].reverse(); // Most recent first
}

export function getFullDashboardData() {
  return {
    status: getSchedulerStatus(),
    metrics: getAgentMetrics(),
    insights: getInsights(),
    recentHistory: getAllAnalysisHistory().slice(0, 20),
    runHistory: getRunHistory().slice(0, 10),
  };
}

// ========================
// RUN EXECUTION
// ========================

export async function executeRun(urls?: string[]): Promise<ScheduledRunResult> {
  if (isRunning) {
    throw new Error('A run is already in progress');
  }

  const targetUrls = urls || config.targetUrls;
  if (targetUrls.length === 0) {
    throw new Error('No target URLs configured. Add URLs to analyze.');
  }

  isRunning = true;
  const startTime = Date.now();
  const startedAt = new Date().toISOString();

  const results: ScheduledRunResult['results'] = [];

  try {
    for (const url of targetUrls) {
      try {
        console.log(`[Agent Scheduler] Analyzing: ${url}`);
        const result = await analyzeWebsite(url);
        const comparison = compareAnalyses(url);

        results.push({
          url,
          success: true,
          result,
          comparison,
        });

        console.log(`[Agent Scheduler] Completed: ${url} (score: ${result.automationScore})`);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[Agent Scheduler] Failed: ${url} - ${message}`);
        results.push({
          url,
          success: false,
          error: message,
        });
      }
    }
  } finally {
    isRunning = false;
  }

  const completedAt = new Date().toISOString();
  lastRunAt = completedAt;
  totalRuns++;

  const runResult: ScheduledRunResult = {
    id: `run_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    startedAt,
    completedAt,
    urls: targetUrls,
    results,
    durationMs: Date.now() - startTime,
  };

  // Keep last 100 runs
  runHistory.push(runResult);
  if (runHistory.length > 100) {
    runHistory.splice(0, runHistory.length - 100);
  }

  console.log(`[Agent Scheduler] Run complete. ${results.filter(r => r.success).length}/${results.length} succeeded in ${runResult.durationMs}ms`);

  // Schedule next run if enabled
  scheduleNextRun();

  return runResult;
}

// ========================
// SCHEDULE MANAGEMENT
// ========================

function scheduleNextRun(): void {
  if (schedulerTimer) {
    clearTimeout(schedulerTimer);
    schedulerTimer = null;
  }

  if (!config.enabled || config.targetUrls.length === 0) {
    return;
  }

  const delay = config.intervalMs;
  console.log(`[Agent Scheduler] Next run scheduled in ${formatInterval(delay)}`);

  schedulerTimer = setTimeout(async () => {
    try {
      await executeRun();
    } catch (error) {
      console.error('[Agent Scheduler] Scheduled run failed:', error);
      // Reschedule even on failure
      scheduleNextRun();
    }
  }, delay);
}

export function startScheduler(urls: string[], intervalMs?: number): SchedulerStatus {
  config.enabled = true;
  config.targetUrls = urls;
  if (intervalMs && intervalMs >= 60000) { // Minimum 1 minute
    config.intervalMs = intervalMs;
  }

  console.log(`[Agent Scheduler] Started with ${urls.length} URLs, interval: ${formatInterval(config.intervalMs)}`);

  // If no previous run, schedule one soon (10 seconds)
  if (!lastRunAt) {
    if (schedulerTimer) clearTimeout(schedulerTimer);
    schedulerTimer = setTimeout(async () => {
      try {
        await executeRun();
      } catch (error) {
        console.error('[Agent Scheduler] Initial run failed:', error);
        scheduleNextRun();
      }
    }, 10000);
  } else {
    scheduleNextRun();
  }

  return getSchedulerStatus();
}

export function stopScheduler(): SchedulerStatus {
  config.enabled = false;
  if (schedulerTimer) {
    clearTimeout(schedulerTimer);
    schedulerTimer = null;
  }
  console.log('[Agent Scheduler] Stopped');
  return getSchedulerStatus();
}

export function updateTargetUrls(urls: string[]): SchedulerStatus {
  config.targetUrls = urls;
  return getSchedulerStatus();
}

export function updateInterval(intervalMs: number): SchedulerStatus {
  if (intervalMs < 60000) {
    throw new Error('Interval must be at least 1 minute (60000ms)');
  }
  config.intervalMs = intervalMs;
  if (config.enabled) {
    scheduleNextRun();
  }
  return getSchedulerStatus();
}
