const LEADS_SHEET_NAME = "Leads";
const LEADS_COLUMN_COUNT = 18;

/**
 * Web App entry point. Vercel sends a server-to-server JSON request, so the
 * shared secret never reaches a visitor's browser.
 */
function doPost(event) {
  try {
    const request = JSON.parse(event && event.postData ? event.postData.contents : "{}");
    const properties = PropertiesService.getScriptProperties();
    const sharedSecret = properties.getProperty("SHARED_SECRET");

    if (!sharedSecret || !secureEquals(request.secret, sharedSecret)) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    if (request.action === "create_lead") {
      return createLead(request.lead, properties);
    }

    if (request.action === "mark_whatsapp_continued") {
      return markWhatsAppContinued(request);
    }

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: "Request could not be processed" });
  }
}

function createLead(lead, properties) {
  validateLead(lead);

  const sheet = getLeadsSheet();
  const row = Math.max(sheet.getLastRow() + 1, 2);
  const values = [[
    plainText(lead.id),
    plainText(lead.receivedAt),
    plainText(lead.fullName),
    plainText(lead.phone),
    plainText(lead.email),
    plainText(lead.preferredDate),
    plainText(lead.experience),
    "New",
    plainText(lead.source || "landing"),
    plainText(lead.campaign),
    plainText(lead.utmSource),
    plainText(lead.utmMedium),
    plainText(lead.utmCampaign),
    plainText(lead.utmContent),
    plainText(lead.utmTerm),
    "Yes",
    "No",
    "",
  ]];

  sheet.getRange(row, 1, 1, LEADS_COLUMN_COUNT).setValues(values);

  let emailNotified = false;
  try {
    emailNotified = notifyTeam(lead, properties);
  } catch (error) {
    // The lead is already stored. A mail problem must not lose it.
    console.error(error);
  }

  return jsonResponse({ ok: true, leadId: lead.id, leadRow: row, emailNotified });
}

function markWhatsAppContinued(request) {
  const leadId = textValue(request.leadId, 64);
  const leadRow = request.leadRow;

  if (!/^[0-9a-f-]{36}$/i.test(leadId) || !Number.isInteger(leadRow) || leadRow < 2) {
    throw new Error("Invalid tracking details");
  }

  const sheet = getLeadsSheet();
  if (sheet.getRange(leadRow, 1).getDisplayValue() !== leadId) {
    return jsonResponse({ ok: false, error: "Lead not found" });
  }

  // Column Q is "Continued to WhatsApp".
  sheet.getRange(leadRow, 17).setValue("Yes");
  return jsonResponse({ ok: true });
}

function getLeadsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet && spreadsheet.getSheetByName(LEADS_SHEET_NAME);

  if (!sheet) throw new Error(`Missing sheet: ${LEADS_SHEET_NAME}`);
  return sheet;
}

function validateLead(lead) {
  if (!lead || typeof lead !== "object") throw new Error("Invalid lead");

  const requiredFields = [
    ["id", 64],
    ["receivedAt", 40],
    ["fullName", 120],
    ["phone", 40],
    ["email", 254],
    ["preferredDate", 10],
    ["experience", 40],
  ];

  requiredFields.forEach(([field, length]) => textValue(lead[field], length));

  if (!/^[0-9a-f-]{36}$/i.test(lead.id)) throw new Error("Invalid lead ID");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lead.preferredDate)) throw new Error("Invalid date");
}

function notifyTeam(lead, properties) {
  const recipient = properties.getProperty("NOTIFY_EMAIL");
  if (!recipient) return false;

  const fields = [
    ["Name", lead.fullName],
    ["Phone / WhatsApp", lead.phone],
    ["Email", lead.email],
    ["Preferred date", lead.preferredDate],
    ["Experience", lead.experience],
    ["Source", lead.source || "landing"],
    ["Campaign", lead.campaign || "—"],
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = fields
    .map(([label, value]) => `<tr><th align="left" style="padding:8px 12px;border:1px solid #dbe5ea">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #dbe5ea">${escapeHtml(value)}</td></tr>`)
    .join("");

  MailApp.sendEmail({
    to: recipient,
    replyTo: lead.email,
    subject: `New course enquiry — ${lead.fullName}`,
    body: `New PADI Open Water enquiry\n\n${text}`,
    htmlBody: `<h1>New PADI Open Water enquiry</h1><table cellspacing="0" cellpadding="0" style="border-collapse:collapse">${htmlRows}</table>`,
  });

  return true;
}

function textValue(value, maxLength) {
  if (typeof value !== "string" || value.length > maxLength) {
    throw new Error("Invalid text value");
  }

  return value.trim();
}

// Prevent a lead value beginning with =, +, - or @ from becoming a formula.
function plainText(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function secureEquals(candidate, expected) {
  if (typeof candidate !== "string" || candidate.length !== expected.length) return false;

  let difference = 0;
  for (let index = 0; index < candidate.length; index += 1) {
    difference |= candidate.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
