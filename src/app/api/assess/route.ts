import { NextResponse } from 'next/server';

interface AssessmentData {
  industry: string;
  painPoint: string;
  hoursWasted: string;
  email: string;
}

const INDUSTRY_LABELS: Record<string, string> = {
  restaurant: 'Restaurant / Food Service',
  ecommerce: 'E-commerce / Retail',
  healthcare: 'Healthcare / Medical',
  professional: 'Professional Services',
  realestate: 'Real Estate',
  other: 'Other',
};

const PAIN_POINT_LABELS: Record<string, string> = {
  reviews: 'Responding to reviews',
  emails: 'Email management',
  data: 'Data entry & processing',
  scheduling: 'Scheduling & appointments',
  support: 'Customer support',
  other: 'General tasks',
};

export async function POST(request: Request) {
  try {
    const body: AssessmentData = await request.json();
    const { industry, painPoint, hoursWasted, email } = body;

    // Validate required fields
    if (!industry || !painPoint || !hoursWasted || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Log lead
    console.log('===== NEW ASSESSMENT LEAD =====');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Email:', email);
    console.log('Industry:', INDUSTRY_LABELS[industry] || industry);
    console.log('Pain Point:', PAIN_POINT_LABELS[painPoint] || painPoint);
    console.log('Hours Wasted:', hoursWasted);
    console.log('================================');

    // Generate recommendations using LLM or fallback
    let recommendations;

    if (process.env.ANTHROPIC_API_KEY) {
      recommendations = await generateWithClaude(industry, painPoint, hoursWasted);
    } else {
      recommendations = generateFallbackRecommendations(industry, painPoint, hoursWasted);
    }

    return NextResponse.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error('Assessment error:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    );
  }
}

async function generateWithClaude(industry: string, painPoint: string, hoursWasted: string) {
  const prompt = `You are an AI automation consultant. Based on this business assessment, provide exactly 3 specific automation recommendations.

Business Info:
- Industry: ${INDUSTRY_LABELS[industry] || industry}
- Main Pain Point: ${PAIN_POINT_LABELS[painPoint] || painPoint}
- Time Spent Weekly: ${hoursWasted}

Respond in this exact JSON format, nothing else:
{
  "recommendations": [
    {
      "title": "Short title (3-5 words)",
      "description": "One sentence describing the automation and its benefit",
      "savings": "X hrs/week"
    }
  ]
}

Make recommendations specific to their industry and pain point. Be realistic with savings estimates based on ${hoursWasted} hours/week input.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        messages: [
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.recommendations;
    }
  } catch (error) {
    console.error('Claude API error:', error);
  }

  // Fallback if Claude fails
  return generateFallbackRecommendations(industry, painPoint, hoursWasted);
}

function generateFallbackRecommendations(industry: string, painPoint: string, hoursWasted: string) {
  const hoursNum = parseInt(hoursWasted.split('-')[0]) || 5;

  const recommendations: Record<string, Record<string, Array<{
    title: string;
    description: string;
    savings: string;
  }>>> = {
    restaurant: {
      reviews: [
        { title: 'AI Review Responder', description: 'Automatically respond to Google and Yelp reviews in your brand voice within hours, not days.', savings: `${Math.ceil(hoursNum * 0.7)} hrs/week` },
        { title: 'Sentiment Dashboard', description: 'Track customer satisfaction trends and get alerts for negative reviews instantly.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
        { title: 'Review Request Automation', description: 'Automatically send review requests to happy customers after their visit.', savings: `${Math.ceil(hoursNum * 0.1)} hrs/week` },
      ],
      scheduling: [
        { title: 'Smart Reservation System', description: 'AI-powered booking that optimizes table turnover and sends automatic confirmations.', savings: `${Math.ceil(hoursNum * 0.6)} hrs/week` },
        { title: 'No-Show Prevention', description: 'Automated reminders via SMS and email reduce no-shows by up to 50%.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Waitlist Management', description: 'Smart waitlist that notifies guests when tables open up.', savings: `${Math.ceil(hoursNum * 0.1)} hrs/week` },
      ],
      default: [
        { title: 'Order Processing Bot', description: 'Automate online order confirmations, updates, and delivery notifications.', savings: `${Math.ceil(hoursNum * 0.5)} hrs/week` },
        { title: 'Inventory Alerts', description: 'Get automatic alerts when stock runs low on key ingredients.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Staff Scheduling AI', description: 'Optimize shift scheduling based on predicted demand.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
    },
    ecommerce: {
      emails: [
        { title: 'Smart Email Triage', description: 'AI categorizes incoming emails and drafts responses for common questions.', savings: `${Math.ceil(hoursNum * 0.6)} hrs/week` },
        { title: 'Order Status Automation', description: 'Automatic updates for shipping, delivery, and returns.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Abandoned Cart Recovery', description: 'Personalized follow-up emails that recover lost sales.', savings: `${Math.ceil(hoursNum * 0.1)} hrs/week` },
      ],
      support: [
        { title: 'AI Customer Support', description: 'Handle 70% of support tickets automatically with intelligent responses.', savings: `${Math.ceil(hoursNum * 0.7)} hrs/week` },
        { title: 'Returns Processing', description: 'Streamline return requests with automated approval workflows.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
        { title: 'FAQ Chatbot', description: 'Answer common questions instantly, 24/7.', savings: `${Math.ceil(hoursNum * 0.1)} hrs/week` },
      ],
      default: [
        { title: 'Order Fulfillment Bot', description: 'Automate order processing from payment to shipping label generation.', savings: `${Math.ceil(hoursNum * 0.5)} hrs/week` },
        { title: 'Inventory Sync', description: 'Keep stock levels synchronized across all sales channels.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Review Management', description: 'Automatically request and respond to product reviews.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
    },
    healthcare: {
      scheduling: [
        { title: 'Smart Appointment Booking', description: 'Let patients self-schedule with automatic insurance verification.', savings: `${Math.ceil(hoursNum * 0.5)} hrs/week` },
        { title: 'Reminder System', description: 'Multi-channel appointment reminders reduce no-shows by 40%.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Waitlist Management', description: 'Fill cancelled slots automatically from your waitlist.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
      data: [
        { title: 'Document Processing', description: 'Extract data from forms and faxes into your EHR automatically.', savings: `${Math.ceil(hoursNum * 0.6)} hrs/week` },
        { title: 'Insurance Verification', description: 'Automate eligibility checks before appointments.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Referral Tracking', description: 'Track and follow up on referrals automatically.', savings: `${Math.ceil(hoursNum * 0.1)} hrs/week` },
      ],
      default: [
        { title: 'Patient Intake Forms', description: 'Digital forms that populate directly into your system.', savings: `${Math.ceil(hoursNum * 0.4)} hrs/week` },
        { title: 'Follow-Up Automation', description: 'Automated post-visit instructions and check-ins.', savings: `${Math.ceil(hoursNum * 0.4)} hrs/week` },
        { title: 'Prescription Reminders', description: 'Help patients stay on track with medication reminders.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
    },
    default: {
      reviews: [
        { title: 'AI Review Responder', description: 'Respond to all reviews professionally within hours, automatically.', savings: `${Math.ceil(hoursNum * 0.7)} hrs/week` },
        { title: 'Reputation Monitoring', description: 'Track mentions across platforms and get instant alerts.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
        { title: 'Review Generation', description: 'Automated campaigns to collect more positive reviews.', savings: `${Math.ceil(hoursNum * 0.1)} hrs/week` },
      ],
      emails: [
        { title: 'Email Auto-Categorization', description: 'AI sorts incoming emails by priority and type.', savings: `${Math.ceil(hoursNum * 0.4)} hrs/week` },
        { title: 'Smart Response Drafts', description: 'Get AI-drafted replies for routine inquiries.', savings: `${Math.ceil(hoursNum * 0.4)} hrs/week` },
        { title: 'Follow-Up Reminders', description: 'Never miss a follow-up with automated tracking.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
      data: [
        { title: 'Document Processing', description: 'Extract data from PDFs, invoices, and forms automatically.', savings: `${Math.ceil(hoursNum * 0.5)} hrs/week` },
        { title: 'Data Entry Automation', description: 'Eliminate manual data entry between systems.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Report Generation', description: 'Automatic reports compiled from multiple sources.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
      scheduling: [
        { title: 'Smart Booking System', description: 'Let clients self-schedule with automatic confirmations.', savings: `${Math.ceil(hoursNum * 0.5)} hrs/week` },
        { title: 'Calendar Coordination', description: 'Sync team calendars and find optimal meeting times.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Reminder Automation', description: 'Reduce no-shows with multi-channel reminders.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
      support: [
        { title: 'AI Support Agent', description: 'Handle routine inquiries 24/7 with intelligent responses.', savings: `${Math.ceil(hoursNum * 0.6)} hrs/week` },
        { title: 'Ticket Routing', description: 'Automatically categorize and route support requests.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
        { title: 'Knowledge Base Bot', description: 'Instant answers from your documentation.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
      default: [
        { title: 'Workflow Automation', description: 'Connect your tools and eliminate repetitive tasks.', savings: `${Math.ceil(hoursNum * 0.5)} hrs/week` },
        { title: 'Smart Notifications', description: 'Get alerts for important events across all platforms.', savings: `${Math.ceil(hoursNum * 0.3)} hrs/week` },
        { title: 'Report Automation', description: 'Automatic daily/weekly reports compiled for you.', savings: `${Math.ceil(hoursNum * 0.2)} hrs/week` },
      ],
    },
  };

  const industryRecs = recommendations[industry] || recommendations.default;
  const recs = industryRecs[painPoint] || industryRecs.default;

  return recs;
}
