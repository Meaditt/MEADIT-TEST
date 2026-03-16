import { NextResponse } from 'next/server';
import { createCalendarEvent, buildEventDescription } from '@/lib/google-calendar';
import { trackBooking } from '@/lib/crm';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, company, purpose, date, time, sourcePage } = body;

    // Validate required fields
    if (!name || !email || !purpose || !date || !time) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Validate date is in the future
    const meetingDate = new Date(`${date}T${time}:00`);
    if (isNaN(meetingDate.getTime()) || meetingDate < new Date()) {
      return NextResponse.json(
        { error: 'Please select a valid future date and time.' },
        { status: 400 }
      );
    }

    // Build calendar event times (30-minute meeting)
    const startTime = meetingDate.toISOString();
    const endTime = new Date(meetingDate.getTime() + 30 * 60 * 1000).toISOString();

    // Create Google Calendar event
    const calendarResult = await createCalendarEvent({
      summary: `MeadITT Discovery Call - ${name}`,
      description: buildEventDescription({ name, email, phone, company, purpose }),
      startTime,
      endTime,
      attendeeEmail: email,
      attendeeName: name,
    });

    // Track in CRM regardless of calendar result
    const booking = trackBooking({
      name,
      email,
      phone: phone || '',
      company: company || '',
      purpose,
      meetingDate: date,
      meetingTime: time,
      sourcePage: sourcePage || '/book',
      calendarEventId: calendarResult.eventId,
      calendarLink: calendarResult.htmlLink,
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        calendarCreated: calendarResult.success,
        message: calendarResult.success
          ? 'Your meeting has been booked! Check your email for the calendar invite.'
          : 'Your meeting request has been received! We will confirm within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Booking API] Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
