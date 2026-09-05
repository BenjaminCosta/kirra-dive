/**
 * Kirra Dive — Leads Apps Script
 *
 * Bound to the "Leads" Google Sheet (Extensions > Apps Script from inside the
 * spreadsheet). Deployed as a Web App, it's the only thing the Next.js app
 * talks to: it appends the row and emails Kirra Dive with MailApp, so no
 * Google service-account key ever has to exist. See README.md in this folder
 * for the full deploy steps.
 *
 * Column order (A:R) matches app/api/leads/route.ts exactly:
 *   A leadId, B receivedAt, C fullName, D phone, E email, F preferredDate,
 *   G experience, H status, I source, J campaign, K utmSource, L utmMedium,
 *   M utmCampaign, N utmContent, O utmTerm, P consent, Q continuedToWhatsapp,
 *   R notes
 */

var SHEET_NAME = "Leads";
var NOTIFY_EMAIL = "dive@kirradive.com"; // TODO CONFIRM: real inbox for lead alerts
var WHATSAPP_CONTINUED_COLUMN = 17; // Q

function doPost(e) {
  var result;
  try {
    var body = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");

    if (!secret || body.secret !== secret) {
      result = { ok: false, error: "Unauthorized" };
    } else if (body.type === "lead") {
      result = handleLead(body);
    } else if (body.type === "whatsapp") {
      result = handleWhatsapp(body);
    } else {
      result = { ok: false, error: "Unknown request type" };
    }
  } catch (error) {
    result = { ok: false, error: String(error) };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function handleLead(body) {
  if (!body.leadId || !body.fullName || !body.phone || !body.email) {
    return { ok: false, error: "Missing required lead fields" };
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  var leadRow;
  try {
    var sheet = getLeadsSheet();
    sheet.appendRow([
      body.leadId,
      body.receivedAt || new Date().toISOString(),
      body.fullName,
      body.phone,
      body.email,
      body.preferredDate || "",
      body.experience || "",
      "New",
      body.source || "landing",
      body.campaign || "",
      body.utmSource || "",
      body.utmMedium || "",
      body.utmCampaign || "",
      body.utmContent || "",
      body.utmTerm || "",
      "Yes",
      "No",
      "",
    ].map(asLiteralCellValue));
    leadRow = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  var emailSent = sendLeadNotification(body);
  return { ok: true, leadRow: leadRow, emailSent: emailSent };
}

/**
 * Sheets treats formula-like input as executable formulas. In locales where
 * `+`/`-` start formulas, that includes normal international phone numbers.
 * Prefixing with an apostrophe stores the incoming value as plain text while
 * leaving the displayed cell value unchanged. The email still uses `body`,
 * so it always contains the exact value the visitor supplied.
 */
function asLiteralCellValue(value) {
  var text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function handleWhatsapp(body) {
  var leadRow = Number(body.leadRow);
  if (!body.leadId || !Number.isFinite(leadRow) || leadRow < 2) {
    return { ok: false, error: "Invalid tracking details" };
  }

  var sheet = getLeadsSheet();
  var storedLeadId = sheet.getRange(leadRow, 1).getValue();

  if (storedLeadId !== body.leadId) {
    return { ok: false, error: "Lead not found" };
  }

  sheet.getRange(leadRow, WHATSAPP_CONTINUED_COLUMN).setValue("Yes");
  return { ok: true };
}

function getLeadsSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet tab "' + SHEET_NAME + '" not found');
  return sheet;
}

/** A failed email must never undo a lead already appended to the sheet. */
function sendLeadNotification(lead) {
  try {
    var lines = [
      "Name: " + lead.fullName,
      "Phone / WhatsApp: " + lead.phone,
      "Email: " + lead.email,
      "Preferred date: " + (lead.preferredDate || ""),
      "Experience: " + (lead.experience || ""),
      "Source: " + (lead.source || "landing"),
      "Campaign: " + (lead.campaign || "—"),
    ];

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: lead.email,
      subject: "New course enquiry — " + lead.fullName,
      body: "New PADI Open Water enquiry\n\n" + lines.join("\n"),
    });
    return true;
  } catch (error) {
    return false;
  }
}
