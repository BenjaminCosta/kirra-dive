# Kirra Dive — PADI Open Water Diver landing page

Single-page landing built with Next.js (App Router), TypeScript and Tailwind CSS v4.
The enquiry form stores confirmed submissions in Google Sheets, optionally
notifies Kirra Dive by email, then offers an optional prefilled WhatsApp chat.

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

Leads are stored by a Google Apps Script Web App bound to the Leads spreadsheet — it
appends the row and emails Kirra Dive itself (`MailApp`), so this app never holds a
Google service-account key or a separate email provider. Full deploy steps:
[apps-script/README.md](./apps-script/README.md). Short version:

1. Paste `apps-script/Code.gs` into the Leads spreadsheet's Apps Script editor
   (Extensions → Apps Script) and set `NOTIFY_EMAIL` to the real inbox.
2. Set a `SHARED_SECRET` Script Property (a random string you generate yourself —
   never paste it into a chat).
3. Deploy → Web app → Execute as: Me → Who has access: Anyone. Copy the `.../exec` URL.
4. Set `LEADS_APPS_SCRIPT_URL` and `LEADS_APPS_SCRIPT_SECRET` in `.env.local` and in
   Vercel (same secret value as step 2).
5. Add the real `contact.whatsappUrl` in `data/landing-content.ts` to enable the
   post-submit WhatsApp chat.

`POST /api/leads` validates the submission on the server, then calls the Apps Script to
append the lead. Each lead starts as `New` and includes attribution/UTM fields. No
Google credentials reach the client or live in this repo, and the lead is stored before
email notification or WhatsApp is offered.
# kirra-dive
