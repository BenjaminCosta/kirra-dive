# Kirra Dive lead Web App

This Apps Script is bound to the **Kirra Dive — Leads** spreadsheet. It is the
only component that can write to the sheet and send the internal Gmail notice.
Vercel never needs a Google service-account key or an email provider key.

## One-time configuration

1. Open the lead spreadsheet, choose **Extensions → Apps Script**, then replace
   `Code.gs` with this directory's `Code.gs` content.
2. In **Project Settings → Script properties**, add:
   - `SHARED_SECRET`: a long random value. It must exactly match
     `LEADS_APPS_SCRIPT_SECRET` in Vercel.
   - `NOTIFY_EMAIL`: the Kirra Dive inbox that receives lead alerts.
3. Deploy as **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Authorize the requested Sheets and Mail permissions, then copy the `/exec`
   URL into Vercel as `LEADS_APPS_SCRIPT_URL`.

When changing `Code.gs`, use **Deploy → Manage deployments → Edit → New
version → Deploy**. This keeps the same `/exec` URL.

## Vercel variables

Set both values for **Preview** and **Production**:

```env
LEADS_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
LEADS_APPS_SCRIPT_SECRET=the-same-value-as-SHARED_SECRET
```

The browser never receives either value. `POST /api/leads` validates the form,
then forwards the lead server-to-server. Apps Script validates the secret,
stores the row and sends the email. The optional WhatsApp click makes a second
authenticated call to update column Q.
