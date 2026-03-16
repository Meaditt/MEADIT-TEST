import { NextResponse } from 'next/server';

interface LeadData {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  messages?: Array<{ role: string; content: string }>;
}

export async function POST(request: Request) {
  try {
    const body: LeadData = await request.json();

    const { name, email, phone, company, interest, messages } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Extract key info from conversation
    const conversationSummary = messages
      ?.filter((m) => m.role === 'user')
      .map((m) => m.content)
      .join(' | ') || '';

    // Log the lead (in production, send to CRM, email service, etc.)
    console.log('===== NEW CHAT LEAD =====');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Name:', name || 'Not provided');
    console.log('Email:', email);
    console.log('Phone:', phone || 'Not provided');
    console.log('Company:', company || 'Not provided');
    console.log('Interest:', interest || 'General inquiry');
    console.log('Conversation:', conversationSummary.substring(0, 500));
    console.log('==========================');

    // TODO: In production, integrate with:
    // - CRM (HubSpot, Salesforce, Pipedrive, etc.)
    // - Email service (send notification to team)
    // - Slack/Discord notification
    // - Add to email marketing list

    // Example HubSpot integration:
    // await createHubSpotContact({
    //   email,
    //   firstname: name,
    //   phone,
    //   company,
    //   lead_source: 'Chat Widget',
    //   notes: conversationSummary,
    // });

    // Example email notification:
    // await sendEmail({
    //   to: 'sales@youraiagency.com',
    //   subject: `New Chat Lead: ${name || email}`,
    //   body: `
    //     New lead from chat widget!
    //
    //     Name: ${name}
    //     Email: ${email}
    //     Phone: ${phone}
    //     Company: ${company}
    //
    //     Conversation:
    //     ${conversationSummary}
    //   `,
    // });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
