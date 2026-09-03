import { NextResponse } from "next/server";

import { createGoogleSheetsClient, getGoogleSheetsConfig } from "@/lib/google-sheets";

export const runtime = "nodejs";

const SHEET_NAME = "Leads";
const WHATSAPP_CONTINUED_COLUMN = "Q";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseTrackingPayload(value: unknown) {
  if (!isRecord(value)) return null;

  const leadId = typeof value.leadId === "string" ? value.leadId : "";
  const leadRow = typeof value.leadRow === "number" ? value.leadRow : 0;

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      leadId,
    ) ||
    !Number.isSafeInteger(leadRow) ||
    leadRow < 2 ||
    leadRow > 1_000_000
  ) {
    return null;
  }

  return { leadId, leadRow };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = parseTrackingPayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid tracking details." }, { status: 400 });
  }

  const config = getGoogleSheetsConfig();
  if (!config) {
    return NextResponse.json({ error: "Lead capture is unavailable." }, { status: 503 });
  }

  try {
    const sheets = createGoogleSheetsClient(config);
    const idCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: `${SHEET_NAME}!A${payload.leadRow}:A${payload.leadRow}`,
    });

    if (idCheck.data.values?.[0]?.[0] !== payload.leadId) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: config.spreadsheetId,
      range: `${SHEET_NAME}!${WHATSAPP_CONTINUED_COLUMN}${payload.leadRow}`,
      valueInputOption: "RAW",
      requestBody: { values: [["Yes"]] },
    });
  } catch (error) {
    console.error("Unable to record WhatsApp continuation.", error);
    return NextResponse.json({ error: "Could not record WhatsApp continuation." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
