# Leads Apps Script — deploy steps

`Code.gs` in this folder is not part of the Next.js build. It's a Google Apps
Script bound to the Leads spreadsheet, deployed as a Web App. The Next.js app
only ever talks to that Web App's URL — it never touches Google Sheets or
Gmail credentials directly, so there's no service-account key to manage.

## 1. Attach the script to the spreadsheet

1. Open the Leads Google Sheet.
2. Extensions → Apps Script.
3. Delete the default `Code.gs` placeholder content and paste in this
   folder's `Code.gs`.
4. Confirm the sheet tab is literally named `Leads` (the script reads
   `SHEET_NAME = "Leads"`), and set `NOTIFY_EMAIL` to the real inbox that
   should receive enquiry alerts.

## 2. Set the shared secret

The Web App is deployed with "Anyone" access (see below) so the Next.js
server can call it without a Google login — that makes it a public URL, so a
shared secret is what stops randoms from POSTing fake leads or burning the
`MailApp` daily quota.

1. In the Apps Script editor: Project Settings (gear icon) → Script
   Properties → Add script property.
2. Key: `SHARED_SECRET`. Value: a long random string — generate one
   yourself, e.g. `openssl rand -hex 32` in a terminal. Don't paste it into
   any chat, including this one; copy it straight from your terminal into
   the Script Properties field and into Vercel.

## 3. Deploy as a Web App

1. Deploy → New deployment.
2. Type: **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone**.
5. Deploy, authorize the requested permissions (Sheets + Gmail send), and
   copy the resulting `.../exec` URL.

Redeploying after edits to `Code.gs`: Deploy → Manage deployments → edit the
existing deployment → New version → Deploy. This keeps the same URL; "New
deployment" instead would generate a different URL and break the app's env
var.

## 4. Configure the Next.js app

Set these in `.env.local` (never committed) and in Vercel (Production +
Preview):

```bash
LEADS_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
LEADS_APPS_SCRIPT_SECRET=<the same value you put in Script Properties>
```

## 5. Test end to end

1. Submit the landing form locally against the real deployed script.
2. Confirm a new row appears in the `Leads` tab with status `New`.
3. Confirm the notification email arrives at `NOTIFY_EMAIL`.
4. Click "Continue on WhatsApp" on the confirmation screen and confirm the
   `Continued to WhatsApp` column (Q) flips to `Yes` on that row.

## Notes / limits

- `MailApp` quota is 100 emails/day on a plain Gmail account (1,500/day on
  Google Workspace) — fine for enquiry volume, but worth knowing if this
  script ever gets reused for bulk sends.
- Whoever's Google account the script runs as ("Execute as: Me") is the
  identity Sheets/Gmail see — if that person's access changes, redeploy
  under the right account.
- To rotate the shared secret later: update the Script Property, update the
  Vercel env var, redeploy the Next.js app. No code change needed on either
  side.
