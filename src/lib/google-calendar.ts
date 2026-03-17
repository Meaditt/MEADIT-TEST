/**
 * Google Calendar Integration
 *
 * Uses a Google service account to create calendar events.
 * Required env vars:
 *   GOOGLE_CALENDAR_ID   - The calendar ID to create events on
 *   GOOGLE_CLIENT_EMAIL  - Service account email
 *   GOOGLE_PRIVATE_KEY   - Service account private key (PEM format)
 */

interface CalendarEventInput {
  summary: string;
  description: string;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  attendeeEmail: string;
  attendeeName: string;
  location?: string;
}

interface CalendarEventResult {
  success: boolean;
  eventId?: string;
  htmlLink?: string;
  error?: string;
}

/**
 * Create a signed JWT for Google API authentication.
 * This avoids needing the full googleapis SDK.
 */
async function createServiceAccountToken(): Promise<string | null> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    console.warn(
      '[Google Calendar] Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY. Skipping calendar integration.'
    );
    return null;
  }

  try {
    // Build JWT header and claim set
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const encode = (obj: object) =>
      Buffer.from(JSON.stringify(obj))
        .toString('base64url');

    const unsignedToken = `${encode(header)}.${encode(claimSet)}`;

    // Sign with the private key using Node crypto
    const crypto = await import('crypto');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(unsignedToken);
    const signature = sign.sign(privateKey, 'base64url');

    const jwt = `${unsignedToken}.${signature}`;

    // Exchange JWT for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('[Google Calendar] Token exchange failed:', errorText);
      return null;
    }

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
  } catch (err) {
    console.error('[Google Calendar] Error creating service account token:', err);
    return null;
  }
}

/**
 * Fetch existing events in a time range to check for conflicts.
 * Returns booked time slots as ISO string pairs.
 */
export async function getBookedSlots(
  dateStr: string // YYYY-MM-DD
): Promise<{ start: string; end: string }[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) return [];

  const accessToken = await createServiceAccountToken();
  if (!accessToken) return [];

  try {
    const timeMin = `${dateStr}T00:00:00-05:00`;
    const timeMax = `${dateStr}T23:59:59-05:00`;

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(
      timeMax
    )}&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      console.error('[Google Calendar] Failed to fetch events:', await response.text());
      return [];
    }

    const data = await response.json();
    return (data.items || [])
      .filter((e: { status?: string }) => e.status !== 'cancelled')
      .map((e: { start?: { dateTime?: string }; end?: { dateTime?: string } }) => ({
        start: e.start?.dateTime || '',
        end: e.end?.dateTime || '',
      }))
      .filter((slot: { start: string; end: string }) => slot.start && slot.end);
  } catch (err) {
    console.error('[Google Calendar] Error fetching events:', err);
    return [];
  }
}

/**
 * Check if a specific time slot is available (no overlapping events).
 */
export async function isSlotAvailable(
  startTime: string,
  endTime: string
): Promise<boolean> {
  const date = startTime.split('T')[0];
  const bookedSlots = await getBookedSlots(date);

  const reqStart = new Date(startTime).getTime();
  const reqEnd = new Date(endTime).getTime();

  for (const slot of bookedSlots) {
    const slotStart = new Date(slot.start).getTime();
    const slotEnd = new Date(slot.end).getTime();

    // Overlap: reqStart < slotEnd AND reqEnd > slotStart
    if (reqStart < slotEnd && reqEnd > slotStart) {
      return false;
    }
  }

  return true;
}

// Simple in-memory lock to prevent race conditions on concurrent bookings
const bookingLocks = new Map<string, Promise<void>>();

export async function withBookingLock<T>(
  slotKey: string,
  fn: () => Promise<T>
): Promise<T> {
  // Wait for any existing lock on this slot
  const existing = bookingLocks.get(slotKey);
  if (existing) {
    await existing;
  }

  let resolve: () => void;
  const lockPromise = new Promise<void>((r) => { resolve = r; });
  bookingLocks.set(slotKey, lockPromise);

  try {
    return await fn();
  } finally {
    resolve!();
    bookingLocks.delete(slotKey);
  }
}

/**
 * Creates a Google Calendar event with attendee details.
 */
export async function createCalendarEvent(
  input: CalendarEventInput
): Promise<CalendarEventResult> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    console.warn('[Google Calendar] GOOGLE_CALENDAR_ID not set. Skipping.');
    return { success: false, error: 'Calendar not configured' };
  }

  const accessToken = await createServiceAccountToken();

  if (!accessToken) {
    return { success: false, error: 'Authentication failed' };
  }

  try {
    const event = {
      summary: input.summary,
      description: input.description,
      location: input.location || 'Google Meet (link will be provided)',
      start: {
        dateTime: input.startTime,
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: input.endTime,
        timeZone: 'America/New_York',
      },
      attendees: [{ email: input.attendeeEmail, displayName: input.attendeeName }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 15 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: `booking-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events?conferenceDataVersion=1&sendUpdates=all`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Google Calendar] Event creation failed:', errorText);
      return { success: false, error: 'Failed to create calendar event' };
    }

    const data = await response.json();
    console.log('[Google Calendar] Event created:', data.id);

    return {
      success: true,
      eventId: data.id,
      htmlLink: data.htmlLink,
    };
  } catch (err) {
    console.error('[Google Calendar] Error creating event:', err);
    return { success: false, error: 'Calendar API error' };
  }
}

/**
 * Builds the event description from booking data.
 */
export function buildEventDescription(booking: {
  name: string;
  email: string;
  phone: string;
  company: string;
  purpose: string;
}): string {
  return [
    `Meeting with ${booking.name}`,
    '',
    `Email: ${booking.email}`,
    booking.phone ? `Phone: ${booking.phone}` : null,
    booking.company ? `Company: ${booking.company}` : null,
    '',
    'Meeting Purpose:',
    booking.purpose,
    '',
    '---',
    'Booked via MeadITT website',
  ]
    .filter(Boolean)
    .join('\n');
}
