import { NextRequest } from 'next/server';
import {
  analyzeWebsite,
  generateFallbackAnalysis,
  type AnalysisResult,
} from '@/lib/agents/website-agent';

// Thinking steps streamed to the client during analysis
const thinkingSteps = [
  "Connecting to your website...",
  "Scanning page structure and content...",
  "Detecting existing tools and integrations...",
  "Checking for chatbots, forms, and booking systems...",
  "Analyzing your business model...",
  "Identifying manual processes and gaps...",
  "Mapping AI agent opportunities...",
  "Scoring automation readiness...",
  "Calculating efficiency gains...",
  "Preparing personalized recommendations...",
];

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  // Parse body before creating stream
  let url: string;
  try {
    const body = await request.json();
    url = body.url;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body. Send JSON with a "url" field.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!url || typeof url !== 'string') {
    return new Response(
      JSON.stringify({ error: 'A valid "url" string is required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Basic URL validation
  const trimmedUrl = url.trim();
  if (trimmedUrl.length < 3 || trimmedUrl.length > 2048) {
    return new Response(
      JSON.stringify({ error: 'URL must be between 3 and 2048 characters.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      try {
        // Stream thinking steps with delays
        for (let i = 0; i < thinkingSteps.length; i++) {
          send(JSON.stringify({ thinking: thinkingSteps[i] }));
          await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 400));
        }

        send(JSON.stringify({ thinking: "Running AI analysis..." }));

        // Use the website agent for analysis
        let result: AnalysisResult;
        try {
          result = await analyzeWebsite(trimmedUrl);
        } catch (error) {
          const msg = error instanceof Error ? error.message : '';
          // If the site couldn't be reached, tell the user — don't fake results
          if (msg === 'SITE_UNREACHABLE' || msg.startsWith('SITE_ERROR_')) {
            send(JSON.stringify({ error: "We couldn't reach that website. Please check the URL and try again." }));
            controller.close();
            return;
          }
          console.error('Website agent analysis failed:', error);
          result = generateFallbackAnalysis(trimmedUrl);
        }

        send(JSON.stringify({ thinking: "Finalizing your report..." }));
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Send full rich result
        send(JSON.stringify({ result }));
        send('[DONE]');
        controller.close();
      } catch (error) {
        console.error('Analysis stream error:', error);
        const message = error instanceof Error ? error.message : 'Analysis failed unexpectedly';
        send(JSON.stringify({ error: message }));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
