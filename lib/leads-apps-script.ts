const APP_SCRIPT_HOSTS = new Set(["script.google.com", "script.googleusercontent.com"]);

export type AppsScriptLead = {
  id: string;
  receivedAt: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  experience: string;
  source: string;
  campaign: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

type AppsScriptConfig = {
  url: string;
  secret: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getAppsScriptConfig(): AppsScriptConfig | null {
  const url = process.env.LEADS_APPS_SCRIPT_URL?.trim();
  const secret = process.env.LEADS_APPS_SCRIPT_SECRET?.trim();

  if (!url || !secret) return null;

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" || !APP_SCRIPT_HOSTS.has(parsedUrl.hostname)) {
      return null;
    }
  } catch {
    return null;
  }

  return { url, secret };
}

async function postToAppsScript(config: AppsScriptConfig, body: Record<string, unknown>) {
  let response: Response;

  try {
    response = await fetch(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: config.secret, ...body }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    console.error("Kirra Dive Apps Script request failed.", error);
    throw new Error("Apps Script request failed.");
  }

  const responseText = await response.text();
  let payload: unknown;

  try {
    payload = JSON.parse(responseText);
  } catch {
    throw new Error("Apps Script returned an invalid response.");
  }

  if (!response.ok || !isRecord(payload) || payload.ok !== true) {
    throw new Error("Apps Script rejected the request.");
  }

  return payload;
}

export async function submitLeadToAppsScript(lead: AppsScriptLead) {
  const config = getAppsScriptConfig();
  if (!config) return null;

  const response = await postToAppsScript(config, {
    action: "create_lead",
    lead,
  });

  const leadId = typeof response.leadId === "string" ? response.leadId : "";
  const leadRow = typeof response.leadRow === "number" ? response.leadRow : null;

  if (leadId !== lead.id) {
    throw new Error("Apps Script returned an unexpected lead ID.");
  }

  return {
    leadId,
    leadRow,
    emailNotified: response.emailNotified === true,
  };
}

export async function markWhatsAppContinuedInAppsScript(leadId: string, leadRow: number) {
  const config = getAppsScriptConfig();
  if (!config) return null;

  await postToAppsScript(config, {
    action: "mark_whatsapp_continued",
    leadId,
    leadRow,
  });

  return true;
}
