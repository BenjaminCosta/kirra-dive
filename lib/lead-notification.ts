import { Resend } from "resend";

type NotifiableLead = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  experience: string;
  source: string;
  campaign: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function notifyKirraDiveOfLead(lead: NotifiableLead) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  // A missing mail integration must never undo a lead already stored in Sheets.
  if (!apiKey || !recipient || !from) return false;

  const resend = new Resend(apiKey);
  const details = [
    ["Name", lead.fullName],
    ["Phone / WhatsApp", lead.phone],
    ["Email", lead.email],
    ["Preferred date", lead.preferredDate],
    ["Experience", lead.experience],
    ["Source", lead.source || "landing"],
    ["Campaign", lead.campaign || "—"],
  ];
  const text = details.map(([label, value]) => `${label}: ${value}`).join("\n");
  const rows = details
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border:1px solid #dbe5ea">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #dbe5ea">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const { error } = await resend.emails.send(
    {
      from,
      to: recipient,
      replyTo: lead.email,
      subject: `New course enquiry — ${lead.fullName}`,
      text: `New PADI Open Water enquiry\n\n${text}`,
      html: `<h1>New PADI Open Water enquiry</h1><table cellspacing="0" cellpadding="0" style="border-collapse:collapse">${rows}</table>`,
    },
    { headers: { "Idempotency-Key": `kirra-lead-${lead.id}` } },
  );

  if (error) throw new Error(error.message);
  return true;
}
