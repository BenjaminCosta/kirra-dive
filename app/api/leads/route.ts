import { google } from "googleapis";
import { NextResponse } from "next/server";

import type { LeadExperience, LeadPayload } from "@/types/lead";

export const runtime = "nodejs";

const SHEET_NAME = "Leads";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidLead = Pick<
  LeadPayload,
  "fullName" | "phone" | "email" | "preferredDate" | "experience"
>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function parseLead(value: unknown): ValidLead | null {
  if (!isRecord(value)) return null;

  const fullName = typeof value.fullName === "string" ? value.fullName.trim() : "";
  const phone = typeof value.phone === "string" ? value.phone.trim() : "";
  const email = typeof value.email === "string" ? value.email.trim() : "";
  const preferredDate =
    typeof value.preferredDate === "string" ? value.preferredDate.trim() : "";
  const experience = value.experience;

  const validExperience = experience === "none" || experience === "tried-before";
  const hasConsent = value.consent === true;

  if (
    !fullName ||
    fullName.length > 120 ||
    phone.replace(/\D/g, "").length < 6 ||
    phone.length > 40 ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    !isValidDate(preferredDate) ||
    !validExperience ||
    !hasConsent
  ) {
    return null;
  }

  return {
    fullName,
    phone,
    email,
    preferredDate,
    experience: experience as LeadExperience,
  };
}

function getGoogleConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) return null;

  return { spreadsheetId, clientEmail, privateKey };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lead = parseLead(body);
  if (!lead) {
    return NextResponse.json({ error: "Invalid lead details." }, { status: 400 });
  }

  const config = getGoogleConfig();
  if (!config) {
    console.error("Google Sheets lead capture is not configured.");
    return NextResponse.json({ error: "Lead capture is unavailable." }, { status: 503 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: config.clientEmail,
        private_key: config.privateKey,
      },
      scopes: [SHEETS_SCOPE],
    });
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            lead.fullName,
            lead.phone,
            lead.email,
            lead.preferredDate,
            lead.experience,
          ],
        ],
      },
    });
  } catch (error) {
    console.error("Unable to append Kirra Dive lead to Google Sheets.", error);
    return NextResponse.json({ error: "Could not save lead." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
