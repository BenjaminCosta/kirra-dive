import { NextResponse } from "next/server";

import { markWhatsAppContinuedInAppsScript } from "@/lib/leads-apps-script";

export const runtime = "nodejs";

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

  try {
    const tracked = await markWhatsAppContinuedInAppsScript(payload.leadId, payload.leadRow);
    if (!tracked) {
      return NextResponse.json({ error: "Lead capture is unavailable." }, { status: 503 });
    }
  } catch (error) {
    console.error("Unable to record WhatsApp continuation through Apps Script.", error);
    return NextResponse.json({ error: "Could not record WhatsApp continuation." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
