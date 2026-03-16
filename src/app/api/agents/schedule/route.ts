import { NextRequest, NextResponse } from 'next/server';
import {
  getSchedulerStatus,
  getFullDashboardData,
  getRunHistory,
  executeRun,
  startScheduler,
  stopScheduler,
  updateTargetUrls,
  updateInterval,
} from '@/lib/agents/agent-scheduler';

// ========================
// GET - Scheduler status & dashboard data
// ========================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get('view');

  try {
    if (view === 'dashboard') {
      return NextResponse.json(getFullDashboardData());
    }

    if (view === 'history') {
      return NextResponse.json({ history: getRunHistory() });
    }

    return NextResponse.json(getSchedulerStatus());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ========================
// POST - Control the scheduler
// ========================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'run': {
        // Manual trigger: run analysis now
        const urls = body.urls as string[] | undefined;
        if (!urls || urls.length === 0) {
          return NextResponse.json(
            { error: 'Provide "urls" array to analyze' },
            { status: 400 }
          );
        }
        const result = await executeRun(urls);
        return NextResponse.json({ success: true, result });
      }

      case 'start': {
        // Start the scheduler
        const urls = body.urls as string[] | undefined;
        if (!urls || urls.length === 0) {
          return NextResponse.json(
            { error: 'Provide "urls" array to monitor' },
            { status: 400 }
          );
        }
        const intervalMs = body.intervalMs as number | undefined;
        const status = startScheduler(urls, intervalMs);
        return NextResponse.json({ success: true, status });
      }

      case 'stop': {
        const status = stopScheduler();
        return NextResponse.json({ success: true, status });
      }

      case 'update-urls': {
        const urls = body.urls as string[] | undefined;
        if (!urls) {
          return NextResponse.json(
            { error: 'Provide "urls" array' },
            { status: 400 }
          );
        }
        const status = updateTargetUrls(urls);
        return NextResponse.json({ success: true, status });
      }

      case 'update-interval': {
        const intervalMs = body.intervalMs as number | undefined;
        if (!intervalMs) {
          return NextResponse.json(
            { error: 'Provide "intervalMs" number' },
            { status: 400 }
          );
        }
        const status = updateInterval(intervalMs);
        return NextResponse.json({ success: true, status });
      }

      default:
        return NextResponse.json(
          {
            error: `Unknown action: "${action}". Valid actions: run, start, stop, update-urls, update-interval`,
          },
          { status: 400 }
        );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Agent Schedule API] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
