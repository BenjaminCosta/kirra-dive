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

1. Create a Google Cloud service account, enable the Google Sheets API and download its
   JSON key.
2. Share the lead spreadsheet with the service-account email as an Editor.
3. Set `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` and
   `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` in `.env.local` and in Vercel. In Vercel, keep
   the private key on one line using literal `\n` characters.
4. Connect Resend in Vercel and set `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL` and
   `LEAD_NOTIFICATION_FROM` to receive a notification after the lead is stored.
5. Add the real `contact.whatsappUrl` in `data/landing-content.ts` to enable the
   post-submit WhatsApp chat.

`POST /api/leads` validates the submission on the server and appends the lead to the
`Leads` tab with `RAW` values, so browser input cannot become a spreadsheet formula.
Each lead starts as `New` and includes attribution/UTM fields. No credentials reach the
client, and the lead is stored before email notification or WhatsApp is offered.
# kirra-dive
