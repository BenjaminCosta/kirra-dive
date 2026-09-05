# Kirra Dive — PADI Open Water Diver landing page

Single-page landing built with Next.js (App Router), TypeScript and Tailwind CSS v4.
The enquiry form is validated in Vercel, saved in Google Sheets and notified to
Kirra Dive with Google Apps Script/MailApp, then offers an optional prefilled
WhatsApp chat.

## Run it

```bash
npm run dev     # http://localhost:3000
npm run lint
npm run build   # the landing page prerenders as static HTML
```

## Structure

```
app/            layout (fonts + metadata), page (section composition), globals.css (design tokens)
components/landing/   one component per section
data/           landing-content.ts (all copy, links, images), tracking.ts (event names)
types/          lead.ts (LeadPayload — shared with the phase-two API route)
lib/            cn.ts
public/images/  placeholder photography (replace with real Kirra Dive shots)
```

All copy lives in `data/landing-content.ts`. Nothing is hard-coded inside components.

## Placeholders to replace

Search for `TO CONFIRM` in `data/landing-content.ts`. In short: price, phone, email,
street address, WhatsApp link, booking link, reviews, course dates, legal pages,
production domain, and every image in `public/images/`.

## Lead capture setup

1. Bind the script in [`apps-script/Code.gs`](apps-script/Code.gs) to the **Kirra Dive —
   Leads** spreadsheet and deploy it as a Web App. Full setup details are in
   [`apps-script/README.md`](apps-script/README.md).
2. Set `LEADS_APPS_SCRIPT_URL` and `LEADS_APPS_SCRIPT_SECRET` in Vercel for both
   Preview and Production.
3. Add the real `contact.whatsappUrl` in `data/landing-content.ts` to enable the
   post-submit WhatsApp chat.

`POST /api/leads` validates the submission on the server before forwarding it to
Apps Script. The Apps Script writes the `Leads` tab as plain text, sends the internal
email and records attribution/UTM fields. No Google or mail credentials reach the client.
# kirra-dive
