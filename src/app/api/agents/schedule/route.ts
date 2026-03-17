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
// AUTH CHECK
// ========================

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false; // If no key is configured, block all access

  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '');
  return token === adminKey;
}

function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized. Provide a valid Bearer token.' },
    { status: 401 }
  );
}

// ========================
// GET - Scheduler status & dashboard data
// ========================

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return unauthorizedResponse();

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
  if (!isAuthorized(request)) return unauthorizedResponse();

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
