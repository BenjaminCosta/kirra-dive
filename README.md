# Kirra Dive — PADI Open Water Diver landing page

Single-page landing built with Next.js (App Router), TypeScript and Tailwind CSS v4.
**Phase one: structure, design system and visual form only.** Nothing is wired to
Google Sheets, WhatsApp, checkout or analytics yet.

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

## Phase two notes

- `POST /api/leads` (route handler) receives `LeadPayload`, validates server-side and
  appends a row to Google Sheets. The browser never talks to Google directly.
- Credentials arrive through Vercel environment variables — see `.env.example`.
  No service-account file is ever committed.
- After the lead is stored, WhatsApp opens with a prefilled message. If WhatsApp
  fails to open, the lead is already saved.
- `output: "export"` is deliberately **not** set, so the serverless route can exist.
- CTAs already carry `data-event` attributes matching `data/tracking.ts`; no analytics
  library is installed yet.
# kirra-dive
