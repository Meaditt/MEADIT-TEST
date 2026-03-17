import { NextResponse } from 'next/server';
import {
  createCalendarEvent,
  buildEventDescription,
  isSlotAvailable,
  withBookingLock,
  getBookedSlots,
} from '@/lib/google-calendar';
import { appendLeadToSheet } from '@/lib/google-sheets';
import { trackBooking } from '@/lib/crm';

/**
 * GET /api/booking?date=YYYY-MM-DD
 * Returns booked time slots for a given date so the client can grey them out.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Provide a valid date parameter (YYYY-MM-DD).' },
      { status: 400 }
    );
  }

  try {
    const bookedSlots = await getBookedSlots(date);

    // Convert to simple HH:MM strings for the client
    const bookedTimes = bookedSlots.map((slot) => {
      const d = new Date(slot.start);
      return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    });

    return NextResponse.json({ date, bookedTimes });
  } catch (error) {
    console.error('[Booking API] Error fetching availability:', error);
    return NextResponse.json({ date, bookedTimes: [] });
  }
}

/**
 * POST /api/booking
 * Creates a booking after checking for conflicts.
 */
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

    // Use a lock on the specific slot to prevent race conditions
    const slotKey = `${date}_${time}`;

    const result = await withBookingLock(slotKey, async () => {
      // Check availability BEFORE creating the event
      const available = await isSlotAvailable(startTime, endTime);
      if (!available) {
        return {
          conflict: true,
          response: NextResponse.json(
            { error: 'This time slot has just been booked by someone else. Please choose a different time.' },
            { status: 409 }
          ),
        };
      }

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

      // Write lead to Google Sheets (non-blocking)
      appendLeadToSheet({
        bookingId: booking.id,
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
      }).catch((err) => console.error('[Booking API] Sheets write failed:', err));

      return {
        conflict: false,
        response: NextResponse.json(
          {
            success: true,
            bookingId: booking.id,
            calendarCreated: calendarResult.success,
            message: calendarResult.success
              ? 'Your meeting has been booked! Check your email for the calendar invite.'
              : 'Your meeting request has been received! We will confirm within 24 hours.',
          },
          { status: 200 }
        ),
      };
    });

    return result.response;
  } catch (error) {
    console.error('[Booking API] Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
