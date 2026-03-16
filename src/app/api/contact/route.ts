import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message, qualifierAnswers, painWallData } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the submission (in production, you'd send this to your email service, CRM, etc.)
    console.log('===== NEW CONTACT FORM SUBMISSION =====');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    if (qualifierAnswers) {
      console.log('Qualifier Answers:', JSON.stringify(qualifierAnswers, null, 2));
    }

    if (painWallData) {
      console.log('Pain Wall Data:', JSON.stringify(painWallData, null, 2));
    }

    console.log('======================================');

    // TODO: In production, integrate with:
    // - Email service (SendGrid, Mailgun, etc.)
    // - CRM (HubSpot, Salesforce, etc.)
    // - Notification service (Slack, Discord, etc.)

    // Example:
    // await sendEmail({
    //   to: 'hello@youraiagency.com',
    //   subject: `New Contact Form: ${name}`,
    //   body: `
    //     Name: ${name}
    //     Email: ${email}
    //     Message: ${message}
    //     ${qualifierAnswers ? `Qualifier: ${JSON.stringify(qualifierAnswers)}` : ''}
    //     ${painWallData ? `Pain Wall: ${JSON.stringify(painWallData)}` : ''}
    //   `,
    // });

    // Return success
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
