/**
 * CRM / Lead Tracking Module
 *
 * Tracks booking and lead data for CRM purposes.
 * Currently stores in-memory and logs to console.
 * Prepared for future integrations with HubSpot, Salesforce, etc.
 */

export interface CRMBookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  purpose: string;
  meetingDate: string;
  meetingTime: string;
  sourcePage: string;
  calendarEventId?: string;
  calendarLink?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

// In-memory store for bookings (persists for server lifetime)
const bookingRecords: CRMBookingRecord[] = [];

/**
 * Track a new booking in the CRM system.
 */
export function trackBooking(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  purpose: string;
  meetingDate: string;
  meetingTime: string;
  sourcePage?: string;
  calendarEventId?: string;
  calendarLink?: string;
}): CRMBookingRecord {
  const record: CRMBookingRecord = {
    id: `BK-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    purpose: data.purpose,
    meetingDate: data.meetingDate,
    meetingTime: data.meetingTime,
    sourcePage: data.sourcePage || '/book',
    calendarEventId: data.calendarEventId,
    calendarLink: data.calendarLink,
    createdAt: new Date().toISOString(),
    status: data.calendarEventId ? 'confirmed' : 'pending',
  };

  bookingRecords.push(record);

  // Cap in-memory store to prevent unbounded growth
  if (bookingRecords.length > 500) {
    bookingRecords.splice(0, bookingRecords.length - 500);
  }

  // Log for monitoring
  console.log('===== NEW BOOKING (CRM) =====');
  console.log('ID:', record.id);
  console.log('Name:', record.name);
  console.log('Email:', record.email);
  console.log('Phone:', record.phone);
  console.log('Company:', record.company);
  console.log('Purpose:', record.purpose);
  console.log('Meeting:', record.meetingDate, 'at', record.meetingTime);
  console.log('Source:', record.sourcePage);
  console.log('Calendar Event:', record.calendarEventId || 'N/A');
  console.log('Status:', record.status);
  console.log('Created:', record.createdAt);
  console.log('=============================');

  // TODO: Future integrations
  // sendToHubSpot(record);
  // sendToSalesforce(record);
  // sendSlackNotification(record);
  // sendConfirmationEmail(record);

  return record;
}

/**
 * Get all booking records.
 */
export function getAllBookings(): CRMBookingRecord[] {
  return [...bookingRecords];
}

/**
 * Get a booking by ID.
 */
export function getBookingById(id: string): CRMBookingRecord | undefined {
  return bookingRecords.find((r) => r.id === id);
}

/**
 * Update booking status.
 */
export function updateBookingStatus(
  id: string,
  status: CRMBookingRecord['status']
): CRMBookingRecord | undefined {
  const record = bookingRecords.find((r) => r.id === id);
  if (record) {
    record.status = status;
    console.log(`[CRM] Booking ${id} status updated to: ${status}`);
  }
  return record;
}
