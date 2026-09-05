/**
 * Client for the Google Apps Script Web App that owns the Leads spreadsheet.
 * The script appends the row and emails Kirra Dive itself (MailApp), so this
 * app never holds a Google service-account key. See apps-script/README.md.
 */

export type AppsScriptConfig = {
  url: string;
  secret: string;
};

export function getAppsScriptConfig(): AppsScriptConfig | null {
  const url = process.env.LEADS_APPS_SCRIPT_URL?.trim();
  const secret = process.env.LEADS_APPS_SCRIPT_SECRET?.trim();

  if (!url || !secret) return null;
  return { url, secret };
}

type AppsScriptResponse =
  | { ok: true; [key: string]: unknown }
  | { ok: false; error?: string };

/**
 * Apps Script Web Apps always answer with HTTP 200 + a JSON body (an
 * exception inside doPost produces an HTML error page instead), so success
 * is read from the `ok` field, not the HTTP status.
 */
async function callAppsScript(
  config: AppsScriptConfig,
  body: Record<string, unknown>,
) {
  const response = await fetch(config.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, secret: config.secret }),
    redirect: "follow",
  });

  let data: AppsScriptResponse;
  try {
    data = (await response.json()) as AppsScriptResponse;
  } catch {
    throw new Error(`Apps Script returned a non-JSON response (status ${response.status}).`);
  }

  if (!data.ok) {
    const message = "error" in data && data.error ? data.error : `Apps Script request failed (status ${response.status}).`;
    throw new Error(message);
  }

  return data;
}

export type AppendLeadInput = {
  leadId: string;
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

export async function appendLead(config: AppsScriptConfig, lead: AppendLeadInput) {
  const data = await callAppsScript(config, { type: "lead", ...lead });
  const leadRow = typeof data.leadRow === "number" ? data.leadRow : null;
  const emailSent = data.emailSent === true;
  return { leadRow, emailSent };
}

export async function markWhatsappContinued(
  config: AppsScriptConfig,
  params: { leadId: string; leadRow: number },
) {
  await callAppsScript(config, { type: "whatsapp", ...params });
}
