import { NextResponse } from "next/server";

import { appendLead, getAppsScriptConfig } from "@/lib/leads-apps-script";
import type { LeadExperience, LeadPayload } from "@/types/lead";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidLead = Required<
  Pick<
    LeadPayload,
    | "fullName"
    | "phone"
    | "email"
    | "preferredDate"
    | "experience"
    | "source"
    | "campaign"
    | "utmSource"
    | "utmMedium"
    | "utmCampaign"
    | "utmContent"
    | "utmTerm"
  >
>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function parseOptionalText(value: unknown, maxLength: number) {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;

  const parsed = value.trim();
  return parsed.length <= maxLength ? parsed : null;
}

function parseLead(value: unknown): ValidLead | null {
  if (!isRecord(value)) return null;

  const fullName = typeof value.fullName === "string" ? value.fullName.trim() : "";
  const phone = typeof value.phone === "string" ? value.phone.trim() : "";
  const email = typeof value.email === "string" ? value.email.trim() : "";
  const preferredDate =
    typeof value.preferredDate === "string" ? value.preferredDate.trim() : "";
  const experience = value.experience;
  const source = parseOptionalText(value.source, 80);
  const campaign = parseOptionalText(value.campaign, 120);
  const utmSource = parseOptionalText(value.utmSource, 120);
  const utmMedium = parseOptionalText(value.utmMedium, 120);
  const utmCampaign = parseOptionalText(value.utmCampaign, 120);
  const utmContent = parseOptionalText(value.utmContent, 120);
  const utmTerm = parseOptionalText(value.utmTerm, 120);

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
    !hasConsent ||
    source === null ||
    campaign === null ||
    utmSource === null ||
    utmMedium === null ||
    utmCampaign === null ||
    utmContent === null ||
    utmTerm === null
  ) {
    return null;
  }

  return {
    fullName,
    phone,
    email,
    preferredDate,
    experience: experience as LeadExperience,
    source: source || "landing",
    campaign,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
  };
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

  const config = getAppsScriptConfig();
  if (!config) {
    console.error("Lead capture Apps Script is not configured.");
    return NextResponse.json({ error: "Lead capture is unavailable." }, { status: 503 });
  }

  const leadId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  let leadRow: number | null = null;
  let emailNotified = false;

  try {
    const result = await appendLead(config, { leadId, receivedAt, ...lead });
    leadRow = result.leadRow;
    emailNotified = result.emailSent;
  } catch (error) {
    console.error("Unable to save Kirra Dive lead via Apps Script.", error);
    return NextResponse.json({ error: "Could not save lead." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, leadId, leadRow, emailNotified }, { status: 201 });
}
