/**
 * Google Sheets Integration — Lead Tracking
 *
 * Appends booking/lead data to a Google Sheet for CRM purposes.
 * Uses the same service account as Google Calendar.
 *
 * Required env vars:
 *   GOOGLE_SHEET_ID       - The spreadsheet ID (from the URL)
 *   GOOGLE_CLIENT_EMAIL   - Service account email
 *   GOOGLE_PRIVATE_KEY    - Service account private key (PEM format)
 *
 * Sheet structure (first row = headers, auto-created if sheet is empty):
 *   A: Booking ID
 *   B: Date Submitted
 *   C: Name
 *   D: Email
 *   E: Phone
 *   F: Company
 *   G: Purpose
 *   H: Meeting Date
 *   I: Meeting Time
 *   J: Source Page
 *   K: Lead Status        (New / Contacted / Qualified / Proposal / Won / Lost)
 *   L: Calendar Event ID
 *   M: Calendar Link
 *   N: Notes              (empty — for manual CRM use)
 *   O: Assigned To        (empty — for manual CRM use)
 *   P: Follow-Up Date     (empty — for manual CRM use)
 *   Q: Deal Value         (empty — for manual CRM use)
 */

const SHEET_NAME = 'Leads';

const HEADERS = [
  'Booking ID',
  'Date Submitted',
  'Name',
  'Email',
  'Phone',
  'Company',
  'Purpose',
  'Meeting Date',
  'Meeting Time',
  'Source Page',
  'Lead Status',
  'Calendar Event ID',
  'Calendar Link',
  'Notes',
  'Assigned To',
  'Follow-Up Date',
  'Deal Value',
];

interface SheetLeadData {
  bookingId: string;
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
}

interface AppendResult {
  success: boolean;
  error?: string;
}

/**
 * Get an access token for the Google Sheets API using the service account.
 */
async function getAccessToken(): Promise<string | null> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    console.warn('[Google Sheets] Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY.');
    return null;
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const encode = (obj: object) =>
      Buffer.from(JSON.stringify(obj)).toString('base64url');

    const unsignedToken = `${encode(header)}.${encode(claimSet)}`;

    const crypto = await import('crypto');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(unsignedToken);
    const signature = sign.sign(privateKey, 'base64url');

    const jwt = `${unsignedToken}.${signature}`;

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
      console.error('[Google Sheets] Token exchange failed:', errorText);
      return null;
    }

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
  } catch (err) {
    console.error('[Google Sheets] Auth error:', err);
    return null;
  }
}

/**
 * Ensure the sheet has headers in the first row.
 * Reads row 1 — if empty, writes the header row.
 */
async function ensureHeaders(sheetId: string, accessToken: string): Promise<void> {
  const range = `${SHEET_NAME}!A1:Q1`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    // Sheet tab might not exist — try to create it
    const createUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`;
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            addSheet: {
              properties: { title: SHEET_NAME },
            },
          },
        ],
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      // Ignore "already exists" errors
      if (!errText.includes('already exists')) {
        console.error('[Google Sheets] Failed to create sheet tab:', errText);
      }
    }
  }

  // Check if headers exist
  const checkRes = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (checkRes.ok) {
    const data = await checkRes.json();
    if (data.values && data.values.length > 0 && data.values[0].length > 0) {
      return; // Headers already exist
    }
  }

  // Write headers
  const writeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;
  await fetch(writeUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range,
      majorDimension: 'ROWS',
      values: [HEADERS],
    }),
  });
}

/**
 * Append a lead row to the Google Sheet.
 */
export async function appendLeadToSheet(data: SheetLeadData): Promise<AppendResult> {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    console.warn('[Google Sheets] GOOGLE_SHEET_ID not set. Skipping.');
    return { success: false, error: 'Sheet not configured' };
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { success: false, error: 'Authentication failed' };
  }

  try {
    // Ensure headers exist on first use
    await ensureHeaders(sheetId, accessToken);

    const row = [
      data.bookingId,
      new Date().toISOString(),
      data.name,
      data.email,
      data.phone || '',
      data.company || '',
      data.purpose,
      data.meetingDate,
      data.meetingTime,
      data.sourcePage,
      'New', // Lead Status — default for fresh leads
      data.calendarEventId || '',
      data.calendarLink || '',
      '', // Notes
      '', // Assigned To
      '', // Follow-Up Date
      '', // Deal Value
    ];

    const range = `${SHEET_NAME}!A:Q`;
    // Use RAW input to prevent formula injection (=, +, -, @ prefixed values)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range,
        majorDimension: 'ROWS',
        values: [row],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Google Sheets] Append failed:', errText);
      return { success: false, error: 'Failed to write to sheet' };
    }

    console.log('[Google Sheets] Lead appended:', data.bookingId);
    return { success: true };
  } catch (err) {
    console.error('[Google Sheets] Error:', err);
    return { success: false, error: 'Sheets API error' };
  }
}
